'use client';

import { useTranslations } from 'next-intl';
import styles from './OurApproach.module.css';

export default function OurApproach() {
  const t = useTranslations('about');

  return (
    <section className={`${styles.approach}`} aria-labelledby="approach-title">
      <div className={`${styles.inner} container-md`}>
        <div className={`${styles.content} container-rg`}>
          <h2 className={`${styles.title} type-display`}>
            {t('approach.title')}
          </h2>
          <p className={`${styles.description} type-title`}>{t('approach.description.primary')}</p>
          <p className={`${styles.description} type-title`}>{t('approach.description.secondary')}</p>
        </div>
      </div>
    </section>
  );
}
