'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './SiteMenu.module.css';

export function SiteMenu() {
  const t = useTranslations('menu');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuState, setMenuState] = useState<'closed' | 'open' | 'closing'>(
    'closed'
  );
  const isVisible = menuState !== 'closed';
  const isOpen = menuState === 'open';

  useEffect(() => {
    setMenuState('closed');
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        buttonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (menuState === 'open') {
      handleClose();
      return;
    }
    setMenuState('open');
  };

  const handleClose = () => {
    if (menuState !== 'open') {
      return;
    }
    setMenuState('closing');
    window.setTimeout(() => {
      setMenuState('closed');
      buttonRef.current?.focus();
    }, 640);
  };

  return (
    <div className={styles.c}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu-panel"
      >
        <div className={styles.hamburger}></div>
      </button>
      {isVisible ? (
        <>
          <div
            className={styles.backdrop}
            data-state={menuState}
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            id="site-menu-panel"
            className={styles.menu}
            role="dialog"
            aria-modal="true"
            aria-label={t('label')}
            data-state={menuState}
          >
            <nav className={styles.nav} aria-label={t('label')}>
              <Link href="/home" className={styles.link} onClick={handleClose}>
                {tNav('home')}
              </Link>
              <Link href="/about" className={styles.link} onClick={handleClose}>
                {tNav('about')}
              </Link>
              <Link href="/privacy" className={styles.link} onClick={handleClose}>
                {tNav('privacy')}
              </Link>
              <Link href="/signin" className={styles.link} onClick={handleClose}>
                {tNav('signIn')}
              </Link>
              <Link href="/terms" className={styles.link} onClick={handleClose}>
                {tNav('terms')}
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
