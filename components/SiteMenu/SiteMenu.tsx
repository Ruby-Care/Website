'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';
import styles from './SiteMenu.module.css';

export function SiteMenu() {
  const t = useTranslations('menu');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuOffset = isMobile ? 48 : -16;
  const menuExitOffset = isMobile ? 96 : -16;

  useEffect(() => {
    setIsOpen(false);
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

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.c}>
      <Button
        ref={buttonRef}
        type="button"
        content="icon"
        size="medium"
        variant="ghost"
        className={`${styles.button} ${isOpen ? styles.xbuttonOpen : ''}`.trim()}
        onClick={handleToggle}
        aria-label={t('button')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu-panel"
      >
        <PlusIcon size="medium" className={styles.menuIcon} />
      </Button>
      <AnimatePresence onExitComplete={() => buttonRef.current?.focus()}>
        {isOpen ? (
          <>
            <motion.div
              className={styles.backdrop}
              onClick={handleClose}
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
              id="site-menu-panel"
              className={styles.menu}
              role="dialog"
              aria-modal="true"
              aria-label={t('label')}
              initial={{ opacity: 0, y: menuOffset }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: menuExitOffset }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.23, 1, 0.32, 1],
              }}
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
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
