'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button/Button';
import styles from './Mission.module.css';

export function Mission() {
  const t = useTranslations('mission');
  const router = useRouter();

  return (
    <section className={`${styles.section} container-md`} aria-labelledby="mission-title">
      <div className={`${styles.inner} container-rg`}>
        <div className={styles.content}>
          <p className={`${styles.kicker} type-title`}>{t('title')}</p>
          <h2 id="mission-title" className={`${styles.title} type-display`}>
            {t('subtitle')}
          </h2>
          <p className={`${styles.description} type-title`}>{t('description')}</p>
          <Button
            type="button"
            variant="outline"
            size="huge"
            onClick={() => router.push('/manifest')}
            className={styles.button}
          >
            {t('button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
