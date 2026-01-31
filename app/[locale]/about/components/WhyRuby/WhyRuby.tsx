'use client';

import { useTranslations } from 'next-intl';
import styles from './WhyRuby.module.css';

export default function WhyRuby() {
  const t = useTranslations('about');

  return (
    <section className={`${styles.why} container-md`} aria-labelledby="approach-title">
        <div className={`${styles.content} container-rg`}>

          <div className={`${styles.header}`}>
            <h2 className={`${styles.title} type-display`} >{t('whyRubyCare.title')}</h2>
            <p className={`${styles.description} type-subtitle`} >{t('whyRubyCare.description')}</p>
          </div>

          <h3 className='type-title'>{t('reality.title')}</h3>

          <div className={styles.grid}>
            <div className={`${styles.stat}`}>
              <div className={`${styles.no} type-display`}>
                {t('reality.stats.survivorship.value')}
              </div>
              <p className={`${styles.description} type-subtitle`}>
                {t('reality.stats.survivorship.description')}
              </p>
            </div>
            <div className={`${styles.stat}`}>
              <div className={`${styles.no} type-display`}>
                {t('reality.stats.supportAccess.value')}
              </div>
              <p className={`${styles.description} type-subtitle`}>
                {t('reality.stats.supportAccess.description')}
              </p>
            </div>
            <div className={`${styles.stat}`}>
              <div className={`${styles.no} type-display`}>
                {t('reality.stats.cases2030.value')}
              </div>
              <p className={`${styles.description} type-subtitle`}>
                {t('reality.stats.cases2030.description')}
              </p>
            </div>
            <div className={`${styles.stat}`}>
              <div className={`${styles.no} type-display`}>
                {t('reality.stats.youngDiagnoses.value')}
              </div>
              <p className={`${styles.description} type-subtitle`}>
                {t('reality.stats.youngDiagnoses.description')}
              </p>
            </div>
          </div>
         <div className={`${styles.foot} type-subtitle`}>{t('reality.footer')}</div>
        </div>
    </section>
  );
}
