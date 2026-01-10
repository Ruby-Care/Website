'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'cookie-consent';
const CHOICES_COOKIE_KEY = 'cookie-consent-choices';
const COOKIE_MAX_AGE_DAYS = 180;

type ConsentState = 'accepted' | 'rejected' | 'custom' | null;
type ConsentChoices = {
  essential: boolean;
  marketing: boolean;
};

function setConsentCookie(value: Exclude<ConsentState, null>) {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${STORAGE_KEY}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
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
  return value === 'accepted' || value === 'rejected' || value === 'custom'
    ? value
    : null;
}

function setChoicesCookie(choices: ConsentChoices) {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const encoded = encodeURIComponent(JSON.stringify(choices));
  document.cookie = `${CHOICES_COOKIE_KEY}=${encoded}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
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
      typeof parsed?.essential === 'boolean' &&
      typeof parsed?.marketing === 'boolean'
    ) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function persistChoices(
  choices: ConsentChoices,
  state: Exclude<ConsentState, null>
) {
  setConsentCookie(state);
  setChoicesCookie(choices);
}

export function CookieBanner() {
  const t = useTranslations('cookie');
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({
    essential: true,
    marketing: true,
  });

  useEffect(() => {
    const consentValue = readConsentCookie();

    if (consentValue) {
      setConsent(consentValue);
      setIsVisible(false);
      const storedChoices = readChoicesCookie();
      if (storedChoices) {
        setChoices(storedChoices);
      }
      // TODO: If consent === 'accepted', initialize analytics scripts here.
    }
    setIsReady(true);
  }, []);

  const handleAccept = () => {
    const nextChoices = { essential: true, marketing: true };
    setChoices(nextChoices);
    setConsent('accepted');
    setIsVisible(false);
    persistChoices(nextChoices, 'accepted');
    // TODO: Add analytics/marketing script loading here once approved.
  };

  const handleConfirm = () => {
    const nextChoices = {
      essential: true,
      marketing: choices.marketing,
    };
    const state: ConsentState =
      nextChoices.essential && nextChoices.marketing ? 'accepted' : 'custom';
    setChoices(nextChoices);
    setConsent(state);
    setIsVisible(false);
    persistChoices(nextChoices, state);
    // TODO: Initialize scripts based on choices once approved.
  };

  if (!isReady || !isVisible || consent) {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label={t('label')}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>
          {t('description')}
        </p>
        <div className={styles.options}>
          <label className={styles.option}>
            <input
              type="checkbox"
              checked={choices.essential}
              disabled
            />
            <span>{t('essential')}</span>
          </label>
          <span className={styles.optionNote}>{t('essentialNote')}</span>
          <label className={styles.option}>
            <input
              type="checkbox"
              checked={choices.marketing}
              onChange={() =>
                setChoices((prev) => ({
                  ...prev,
                  marketing: !prev.marketing,
                }))
              }
            />
            <span>{t('marketing')}</span>
          </label>
        </div>
        <Link href="/privacy" className={styles.link}>
          {t('privacyLink')}
        </Link>
      </div>
      <div className={styles.actions}>
        <Button type="button" size='small' variant="outline" onClick={handleConfirm}>
          {t('confirm')}
        </Button>
        <Button type="button" size='small' variant="primary" onClick={handleAccept}>
          {t('acceptAll')}
        </Button>
      </div>
    </div>
  );
}
