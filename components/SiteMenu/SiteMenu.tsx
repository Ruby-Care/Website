'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './SiteMenu.module.css';

export function SiteMenu() {
  const t = useTranslations('menu');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuState, setMenuState] = useState<'closed' | 'open' | 'closing'>(
    'closed'
  );
  const isOpen = menuState !== 'closed';
  const isClosing = menuState === 'closing';
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const getSpacingPx = (value: string, fallback: number) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }

    if (trimmed.endsWith('rem')) {
      const root = parseFloat(
        getComputedStyle(document.documentElement).fontSize || '16'
      );
      return parseFloat(trimmed) * root;
    }

    if (trimmed.endsWith('px')) {
      return parseFloat(trimmed);
    }

    const numeric = Number.parseFloat(trimmed);
    return Number.isNaN(numeric) ? fallback : numeric;
  };

  const positionDialog = () => {
    const dialog = dialogRef.current;
    const button = buttonRef.current;
    if (!dialog || !button) {
      return;
    }

    const rootStyles = getComputedStyle(document.documentElement);
    const gap = getSpacingPx(rootStyles.getPropertyValue('--space-2'), 8);
    const edge = getSpacingPx(rootStyles.getPropertyValue('--space-3'), 12);

    const buttonRect = button.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const maxLeft = Math.max(edge, window.innerWidth - dialogRect.width - edge);

    const top = Math.min(
      buttonRect.bottom + gap,
      window.innerHeight - dialogRect.height - edge
    );
    const left = Math.min(Math.max(buttonRect.left, edge), maxLeft);

    dialog.style.setProperty('--menu-top', `${Math.max(edge, top)}px`);
    dialog.style.setProperty('--menu-left', `${left}px`);
  };

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
    setMenuState('open');
    requestAnimationFrame(positionDialog);
  };

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || isClosing) {
      return;
    }

    if (reduceMotion) {
      dialog.close();
      return;
    }

    setMenuState('closing');
    window.setTimeout(() => {
      dialog.close();
    }, 160);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    positionDialog();
    const handleReflow = () => positionDialog();
    window.addEventListener('resize', handleReflow);
    window.addEventListener('scroll', handleReflow, true);

    return () => {
      window.removeEventListener('resize', handleReflow);
      window.removeEventListener('scroll', handleReflow, true);
    };
  }, [isOpen]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeMenu();
    }
  };

  const handleDialogCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeMenu();
  };

  const handleDialogClose = () => {
    setMenuState('closed');
    buttonRef.current?.focus();
  };

  return (
    <div className={styles.c}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu-dialog"
      >
        {t('button')}
      </button>
      <dialog
        id="site-menu-dialog"
        ref={dialogRef}
        className={styles.dialog}
        data-state={menuState}
        aria-labelledby={titleId}
        onClick={handleDialogClick}
        onCancel={handleDialogCancel}
        onClose={handleDialogClose}
      >
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {t('title')}
            </h2>
            <button
              type="button"
              className={styles.close}
              onClick={closeMenu}
              autoFocus
            >
              {t('close')}
            </button>
          </div>
          <nav className={styles.nav} aria-label={t('label')}>
            <Link href="/home" className={styles.link} onClick={closeMenu}>
              {tNav('home')}
            </Link>
            <Link href="/about" className={styles.link} onClick={closeMenu}>
              {tNav('about')}
            </Link>
            <Link href="/privacy" className={styles.link} onClick={closeMenu}>
              {tNav('privacy')}
            </Link>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
