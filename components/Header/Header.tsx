'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LinearBlur } from 'progressive-blur';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SiteMenu } from '../SiteMenu';
import { RubyIcon } from '../Icon';
import Image from 'next/image';
import buttonStyles from '../Button/Button.module.css';
import styles from './Header.module.css';

export function Header() {
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
        
        <div className={styles.menuSlot}>
          <Link
            href="/about"
            aria-label={tNav('about')}
            className={[
              buttonStyles.button,
              buttonStyles.ghost,
              buttonStyles.medium,
              buttonStyles.icon,
              buttonStyles.iconMedium,
            ].join(' ')}
          >
            <RubyIcon size="medium" className={styles.menuIcon} />
          </Link>
          <Link href="/home" className={styles.logo}>
            <Image src="/r-for-specialists.svg" alt="Ruby" width={111} height={45} />
          </Link>
          <div className='row gap-025'>
            <LanguageSwitcher />
            <SiteMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
