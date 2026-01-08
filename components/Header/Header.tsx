'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/home">{t('appName')}</Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/home" className={styles.navLink}>
            {tNav('home')}
          </Link>
          <Link href="/about" className={styles.navLink}>
            {tNav('about')}
          </Link>
          <Link href="/privacy" className={styles.navLink}>
            {tNav('privacy')}
          </Link>
        </nav>

        <div className={styles.languageSwitcher}>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`${styles.langButton} ${locale === 'en' ? styles.active : ''}`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('de')}
            className={`${styles.langButton} ${locale === 'de' ? styles.active : ''}`}
            aria-label="Wechseln zu Deutsch"
          >
            DE
          </button>
          <button
            onClick={() => handleLanguageChange('pl')}
            className={`${styles.langButton} ${locale === 'pl' ? styles.active : ''}`}
            aria-label="Przełącz na polski"
          >
            PL
          </button>
        </div>
      </div>
    </header>
  );
}
