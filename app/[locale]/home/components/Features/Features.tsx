import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import styles from './Features.module.css';

export async function Features() {
  const t = await getTranslations('features');

  return (
    <section className={styles.section} aria-labelledby="features-title">
      <div className={`${styles.inner} container-md`}>
        <h2 id="features-title" className={`${styles.title} type-display`}>
          {t('title')}
        </h2>
        <div className={styles.grid}>
          <div className={styles.column}>
            <article className={styles.tile}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.structuredIntake.title')}</h3>
              <div className={styles.media}>
                <Image
                  src="/recap.svg"
                  alt={t('tiles.structuredIntake.imageAlt')}
                  className={styles.image}
                  width={360}
                  height={577}
                />
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.structuredIntake.description')}
              </p>
            </article>
            <article className={`${styles.tile} ${styles.stretched}`}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.plusMore.title')}</h3>
              <div className={styles.media}>
                <Image
                  src="/allfeatures.svg"
                  alt={t('tiles.plusMore.imageAlt')}
                  className={styles.image}
                  width={587}
                  height={180}
                />
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.plusMore.description')}
              </p>
            </article>
          </div>
          <div className={styles.column}>
            <article className={styles.tile}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.supportPlan.title')}</h3>
              <div className={styles.media}>
                <Image
                  src="/plan.svg"
                  alt={t('tiles.supportPlan.imageAlt')}
                  className={styles.image}
                  width={360}
                  height={396}
                />
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.supportPlan.description')}
              </p>
            </article>
            <article className={styles.tile}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.careMonitoring.title')}</h3>
              <div className={styles.media}>
                <Image
                  src="/check.svg"
                  alt={t('tiles.careMonitoring.imageAlt')}
                  className={styles.image}
                  width={360}
                  height={373}
                />
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.careMonitoring.description')}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
