'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'cookie-consent';
const STORAGE_CHOICES_KEY = 'cookie-consent-choices';
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

function persistChoices(choices: ConsentChoices, state: Exclude<ConsentState, null>) {
  window.localStorage.setItem(STORAGE_CHOICES_KEY, JSON.stringify(choices));
  window.localStorage.setItem(STORAGE_KEY, state);
  setConsentCookie(state);
}

export function CookieBanner() {
  const t = useTranslations('cookie');
  const [consent, setConsent] = useState<ConsentState>(null);
  const [choices, setChoices] = useState<ConsentChoices>({
    essential: true,
    marketing: true,
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (stored === 'accepted' || stored === 'rejected' || stored === 'custom') {
      setConsent(stored);
      const storedChoices = window.localStorage.getItem(STORAGE_CHOICES_KEY);
      if (storedChoices) {
        try {
          const parsed = JSON.parse(storedChoices) as ConsentChoices;
          if (
            typeof parsed?.essential === 'boolean' &&
            typeof parsed?.marketing === 'boolean'
          ) {
            setChoices(parsed);
          }
        } catch {
          // Ignore malformed localStorage values.
        }
      }
      // TODO: If consent === 'accepted', initialize analytics scripts here.
    }
  }, []);

  const handleAccept = () => {
    const nextChoices = { essential: true, marketing: true };
    setChoices(nextChoices);
    setConsent('accepted');
    persistChoices(nextChoices, 'accepted');
    // TODO: Add analytics/marketing script loading here once approved.
  };

  const handleConfirm = () => {
    const state: ConsentState =
      choices.essential && choices.marketing ? 'accepted' : 'custom';
    setConsent(state);
    persistChoices(choices, state);
    // TODO: Initialize scripts based on choices once approved.
  };

  if (consent) {
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
              onChange={() =>
                setChoices((prev) => ({
                  ...prev,
                  essential: !prev.essential,
                }))
              }
            />
            <span>{t('essential')}</span>
          </label>
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
