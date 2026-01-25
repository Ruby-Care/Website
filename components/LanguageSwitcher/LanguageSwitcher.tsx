'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link, routing, usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { GlobeIcon } from '@/components/Icon';
import styles from './LanguageSwitcher.module.css';

const locales = routing.locales;

type LanguageSwitcherProps = {
  simple?: boolean;
};

export function LanguageSwitcher({ simple = false }: LanguageSwitcherProps) {
  if (simple) {
    return <LanguageSwitcherSimple />;
  }

  return <LanguageSwitcherMenu />;
}

function LanguageSwitcherSimple() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (localeOption: (typeof locales)[number]) => {
    if (localeOption === locale) {
      return;
    }
    router.replace(pathname, { locale: localeOption });
  };

  return (
    <div className={`${styles.switcher} ${styles.simple}`.trim()}>
      <span className={styles.label}>{t('label')}</span>
      <div className={styles.simpleList} role="group" aria-label={t('label')}>
        {locales.map((localeOption) => {
          const isActive = localeOption === locale;
          return (
            <Button
              key={localeOption}
              type="button"
              className={styles.simpleItem}
              content='icon'
              variant={isActive ? 'secondary' : 'ghost'}
              aria-pressed={isActive}
              onClick={() => handleLocaleChange(localeOption)}
            >
              {t(`short.${localeOption}`)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function LanguageSwitcherMenu() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
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

  return (
    <div className={styles.switcher}>
      <label className={styles.label} htmlFor="language-switcher">
        {t('label')}
      </label>
      <Button
        ref={buttonRef}
        id="language-switcher"
        type="button"
        content="icon"
        size="medium"
        variant="ghost"
        className={styles.button}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-switcher-menu"
      >
        {/* <span className={styles.value} aria-hidden="true">
          {t(`short.${locale}`)}
        </span> */}
        <GlobeIcon size="medium" />
      </Button>
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
                    <Link
                      key={localeOption}
                      href={pathname}
                      locale={localeOption}
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={styles.item}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(`options.${localeOption}`)}
                    </Link>
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
