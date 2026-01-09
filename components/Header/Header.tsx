'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LinearBlur } from 'progressive-blur';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SiteMenu } from '../SiteMenu';
import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    setShowBlur(true);
  }, []);

  return (
    <header className={styles.header}>
      {showBlur ? (
        <LinearBlur
          side="top"
          steps={10}
          strength={100}
          falloffPercentage={100}
          tint="rgba(255, 255, 255, 0.55)"
          className={styles.headerBlur}
          aria-hidden="true"
        />
      ) : (
        <div className={styles.headerBlur} aria-hidden="true" />
      )}
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/home">{t('appName')}</Link>
        </div>

        <div className={styles.menuSlot}>
          <SiteMenu />
          <LanguageSwitcher />
        </div>

        
      </div>
    </header>
  );
}
