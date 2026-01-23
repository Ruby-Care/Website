import { getTranslations } from 'next-intl/server';
import { Button } from '../Button';
import styles from './Mission.module.css';

export async function Mission() {
  const t = await getTranslations('mission');

  return (
    <section className={`${styles.section} container-md`} aria-labelledby="mission-title">
      <div className={`${styles.inner} container-rg`}>
        <div className={styles.content}>
          <p className={`${styles.kicker} type-title`}>{t('title')}</p>
          <h2 id="mission-title" className={`${styles.title} type-display`}>
            {t('subtitle')}
          </h2>
          <p className={`${styles.description} type-title`}>{t('description')}</p>
            <Button href="/manifest" variant="outline" size="huge" className={styles.button}>
            {t('button')}
            </Button>
        </div>
      </div>
    </section>
  );
}
