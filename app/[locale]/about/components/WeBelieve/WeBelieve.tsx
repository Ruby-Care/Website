'use client';

import { useTranslations } from 'next-intl';
import styles from './WeBelieve.module.css';

export default function WeBelieve() {
  const t = useTranslations('about');

  return (
    <section className={`${styles.beliefs} container-rg`} aria-labelledby="beliefs-title">
      <h2 className={`${styles.title} type-display`} >{t('beliefs.title')}</h2>
      <div className={styles.grid}>
        <div className={styles.tile}>
          <div className={`${styles.no} type-title`}>1</div>
          <p className={`${styles.text} type-title`}>{t('beliefs.items.continuous')}</p>
        </div>
        <div className={styles.tile}>
          <div className={`${styles.no} type-title`}>2</div>
          <p className={`${styles.text} type-title`}>{t('beliefs.items.structured')}</p>
        </div>
        <div className={styles.tile}>
          <div className={`${styles.no} type-title`}>3</div>
          <p className={`${styles.text} type-title`}>{t('beliefs.items.personalized')}</p>
        </div>
        <div className={styles.tile}>
          <div className={`${styles.no} type-title`}>4</div>
          <p className={`${styles.text} type-title`}>{t('beliefs.items.collaborative')}</p>
        </div>
      </div>
    </section>
  );
}
