'use client';

import { ChangeEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

const locales = routing.locales;
type LocaleOption = (typeof locales)[number];

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as LocaleOption;

    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className={styles.switcher}>
      <label className={styles.label} htmlFor="language-switcher">
        {t('label')}
      </label>
      <div className={styles.control}>
        <select
          id="language-switcher"
          className={styles.select}
          value={locale}
          onChange={handleChange}
        >
          {locales.map((localeOption) => (
            <option key={localeOption} value={localeOption}>
              {t(`options.${localeOption}`)}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true" />
      </div>
    </div>
  );
}
