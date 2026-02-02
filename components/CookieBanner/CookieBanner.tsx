'use client';

import { useEffect, useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { MoreIcon } from '@/components/Icon';

import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'cookie-consent';
const CHOICES_COOKIE_KEY = 'cookie-consent-choices';
const COOKIE_MAX_AGE_DAYS = 180;

type ConsentState = 'accepted' | null;

type ConsentChoices = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
};

const DEFAULT_CHOICES: ConsentChoices = {
  essential: true,
  functional: true,
  analytics: true,
  advertising: true,
};

const SCRIPT_SOURCES: {
  functional: string | null;
  analytics: string | null;
  advertising: string | null;
} = {
  functional: null,
  analytics: null,
  advertising: null,
};

const POSTHOG_API_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? 'phc_P3OckPNcTXHBAazBB3qbfTU8Hlmbn6BmWv7B8CDusgt';
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';
const POSTHOG_OPTIONS: PosthogOptions = {
  api_host: POSTHOG_HOST,
  defaults: '2025-11-30',
  person_profiles: 'identified_only',
};

const POSTHOG_SCRIPT_HOST = POSTHOG_OPTIONS.api_host
  .replace('.i.posthog.com', '-assets.i.posthog.com')
  .concat('/static/array.js');

let posthogLoadPromise: Promise<void> | null = null;

function setConsentCookie(value: Exclude<ConsentState, null>) {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${STORAGE_KEY}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

function setChoicesCookie(choices: ConsentChoices) {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const encoded = encodeURIComponent(JSON.stringify(choices));
  document.cookie = `${CHOICES_COOKIE_KEY}=${encoded}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

function readCookie(key: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${key}=`));
  if (!match) {
    return null;
  }

  return match.split('=')[1];
}

function readConsentCookie(): ConsentState {
  const value = readCookie(STORAGE_KEY) as ConsentState;
  return value === 'accepted' ? value : null;
}

function readChoicesCookie(): ConsentChoices | null {
  const value = readCookie(CHOICES_COOKIE_KEY);
  if (!value) {
    return null;
  }
  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded) as ConsentChoices;
    if (
      parsed?.essential === true &&
      typeof parsed?.functional === 'boolean' &&
      typeof parsed?.analytics === 'boolean' &&
      typeof parsed?.advertising === 'boolean'
    ) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function loadScript(src: string | null, category: keyof typeof SCRIPT_SOURCES) {
  if (!src) {
    return;
  }

  if (document.querySelector(`script[data-cookie-category="${category}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.dataset.cookieCategory = category;
  document.head.appendChild(script);
}

function loadPosthog() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (!POSTHOG_API_KEY) {
    return;
  }

  if (window.posthog?.__SV) {
    window.posthog.init(POSTHOG_API_KEY, POSTHOG_OPTIONS);
    return;
  }

  if (posthogLoadPromise) {
    posthogLoadPromise.then(() => {
      window.posthog?.init(POSTHOG_API_KEY, POSTHOG_OPTIONS);
    });
    return;
  }

  const existingScript = document.querySelector(
    'script[data-cookie-category="posthog"]'
  ) as HTMLScriptElement | null;

  posthogLoadPromise = new Promise<void>((resolve, reject) => {
    const resolveAfterLoad = () => resolve();
    const rejectAfterError = () => reject(new Error('PostHog script failed to load'));

    if (existingScript) {
      existingScript.addEventListener('load', resolveAfterLoad, { once: true });
      existingScript.addEventListener('error', rejectAfterError, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = POSTHOG_SCRIPT_HOST;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.cookieCategory = 'posthog';
    script.onload = resolveAfterLoad;
    script.onerror = rejectAfterError;
    document.head.appendChild(script);
  });

  posthogLoadPromise
    .then(() => {
      window.posthog?.init(POSTHOG_API_KEY, POSTHOG_OPTIONS);
    })
    .catch(() => {
      posthogLoadPromise = null;
    });
}

function applyConsent(choices: ConsentChoices) {
  // Functional scripts (only if allowed).
  if (choices.functional) {
    loadScript(SCRIPT_SOURCES.functional, 'functional');
  }

  // Analytics scripts (only if allowed).
  if (choices.analytics) {
    loadPosthog();
  }

  // Advertising scripts (only if allowed).
  if (choices.advertising) {
    loadScript(SCRIPT_SOURCES.advertising, 'advertising');
  }
}

export function CookieBanner() {
  const t = useTranslations('cookie');
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(DEFAULT_CHOICES);
  const titleId = useId();

  useEffect(() => {
    const consentValue = readConsentCookie();
    const storedChoices = readChoicesCookie();

    if (storedChoices) {
      setChoices(storedChoices);
    }

    if (consentValue === 'accepted') {
      setHasAccepted(true);
      setIsVisible(false);
      if (storedChoices) {
        applyConsent(storedChoices);
      }
    }
    setIsReady(true);
  }, []);

  const handleAcceptAll = () => {
    const nextChoices = { ...DEFAULT_CHOICES };
    setChoices(nextChoices);

    if (!hasAccepted) {
      setHasAccepted(true);
      setConsentCookie('accepted');
      setChoicesCookie(nextChoices);
      applyConsent(nextChoices);
      setIsVisible(false);
    }
    setIsModalOpen(false);
  };

  const handleMore = () => {
    setIsModalOpen(true);
  };

  const handleSaveSelection = (close: () => void) => {
    const nextChoices = { ...choices, essential: true };
    setChoices(nextChoices);

    if (!hasAccepted) {
      setHasAccepted(true);
    }
    setConsentCookie('accepted');
    setChoicesCookie(nextChoices);
    applyConsent(nextChoices);
    setIsVisible(false);
    close();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {isVisible ? (
        <div className={styles.banner} role="region" aria-label={t('label')}>
          <p className={`${styles.message} type-body-regular`}>{t('message')}</p>
          <div className={styles.actions}>
            <Button
              type="button"
              size="large"
              variant="primary"
              onClick={handleAcceptAll}
            >
              {t('acceptAll')}
            </Button>
            <Button
              type="button"
              content="icon"
              size="medium"
              variant="ghost"
              onClick={handleMore}
              aria-label={t('more')}
            >
              <MoreIcon size="medium" />
            </Button>
          </div>
        </div>
      ) : null}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="small"
        customClass={styles.cookieModal}
        closeLabel={t('closeLabel')}
        ariaLabelledBy={titleId}
      >
        {({ close }) => (
          <div className={styles.modalContent}>
            <h2 id={titleId} className={`${styles.modalTitle} type-title`}>
              {t('modalTitle')}
            </h2>
            <p className={`${styles.modalDescription} type-body-regular color-text-on-surface-muted`}>
              {t.rich('modalDescription', {
                privacy: (chunks) => (
                  <Link href="/privacy" className={styles.modalLink}>
                    {chunks}
                  </Link>
                ),
                terms: (chunks) => (
                  <Link href="/terms" className={styles.modalLink}>
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className={styles.optionGroup}>
              <label className={styles.option}>
                <input type="checkbox" checked disabled />
                <span>{t('modalEssential')}</span>
              </label>
              <label className={`${styles.option} type-body-medium`}>
                <input
                  type="checkbox"
                  checked={choices.functional}
                  onChange={(event) =>
                    setChoices((prev) => ({
                      ...prev,
                      functional: event.target.checked,
                    }))
                  }
                />
                <span>{t('modalFunctional')}</span>
              </label>
              <label className={`${styles.option} type-body-medium`}>
                <input
                  type="checkbox"
                  checked={choices.analytics}
                  onChange={(event) =>
                    setChoices((prev) => ({
                      ...prev,
                      analytics: event.target.checked,
                    }))
                  }
                />
                <span>{t('modalAnalytics')}</span>
              </label>
              <label className={`${styles.option} type-body-medium`}>
                <input
                  type="checkbox"
                  checked={choices.advertising}
                  onChange={(event) =>
                    setChoices((prev) => ({
                      ...prev,
                      advertising: event.target.checked,
                    }))
                  }
                />
                <span>{t('modalAdvertising')}</span>
              </label>
            </div>
            <div className={styles.modalActions}>
              <Button type="button" fullWidth={true} size="large" variant="primaryOnDark" content="text" onClick={() => handleSaveSelection(close)}>
                {t('modalSave')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
