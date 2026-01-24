'use client';

import { useId } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button';
import styles from './PowerUp.module.css';

export function PowerUp() {
  const t = useTranslations('powerUp');
  const router = useRouter();
  const titleId = useId();

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={`${styles.inner} container-md`}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 id={titleId} className={`${styles.title} type-display`}>
              {t('title')}
            </h2>
            <div className={styles.actions}>
              <Button
                type="button"
                variant="cta"
                size="huge"
                onClick={() => router.push('/access')}
              >
                {t('button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
