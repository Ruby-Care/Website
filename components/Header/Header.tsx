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
    <header className={`${styles.header}`}>
      {showBlur ? (
        <LinearBlur
          side="top"
          steps={24}
          strength={32}
          falloffPercentage={100}
          tint="rgba(255, 255, 255, 0.1)"
          className={styles.headerBlur}
          aria-hidden="true"
        />
      ) : (
        <div className={styles.headerBlur} aria-hidden="true" />
      )}
      <div className={`${styles.container} container-md`}>
        
        <div className={styles.menuSlot}>
          <Image src="/r-signature.svg" className={styles.signature} alt="Ruby" width={32} height={32} />
          <Link href="/home" className={styles.logo}>
            <Image src="/r-wordmark.svg" alt="Ruby" width={116} height={30} />
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
