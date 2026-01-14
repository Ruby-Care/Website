'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

const locales = routing.locales;
type LocaleOption = (typeof locales)[number];

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuOffset = isMobile ? 48 : -16;
  const menuExitOffset = isMobile ? 96 : -16;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateMatch = () => setIsMobile(mediaQuery.matches);

    updateMatch();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    }
    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const handleSelect = (nextLocale: LocaleOption) => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.switcher}>
      <label className={styles.label} htmlFor="language-switcher">
        {t('label')}
      </label>
      <button
        ref={buttonRef}
        id="language-switcher"
        type="button"
        className={styles.button}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-switcher-menu"
      >
        <span className={styles.value} aria-hidden="true">
          {t(`short.${locale}`)}
        </span>
      </button>
      <AnimatePresence onExitComplete={() => buttonRef.current?.focus()}>
        {isOpen ? (
          <>
            <motion.div
              className={styles.backdrop}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />
            <motion.div
              id="language-switcher-menu"
              className={styles.menu}
              role="menu"
              aria-label={t('label')}
              initial={{ opacity: 0, y: menuOffset }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: menuExitOffset }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className={styles.list}>
                {locales.map((localeOption) => {
                  const isActive = localeOption === locale;
                  return (
                    <button
                      key={localeOption}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={styles.item}
                      onClick={() => handleSelect(localeOption)}
                    >
                      {t(`options.${localeOption}`)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
