import { getTranslations } from 'next-intl/server';
import styles from './Features.module.css';
import { FeaturesTicker } from './FeaturesTicker.client';

const tickerImages = [
  '/img/ticker/Frame 1291.svg',
  '/img/ticker/Frame 1347.svg',
  '/img/ticker/Frame 1348.svg',
  '/img/ticker/Frame 1349.svg',
  '/img/ticker/Frame 1350.svg',
  '/img/ticker/Frame 1351.svg',
];

export async function Features() {
  const t = await getTranslations('features');
  const tickerItems = tickerImages.map((src) => ({
    id: src,
    src,
  }));

  return (
    <section className={styles.section} aria-labelledby="features-title">
      <div className={`${styles.inner} container-md`}>
        <h2 id="features-title" className={`${styles.title} type-display`}>
          {t('title')}
        </h2>
        <div className={styles.grid}>
          <div className={`${styles.column} ${styles.firstColumn}`}>
            <article className={styles.tile}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.structuredIntake.title')}</h3>
              <div className={styles.media}>
                <div
                  className={`${styles.image} ${styles.imageRecap}`}
                  role="presentation"
                  aria-hidden="true"
                />
                <span className={styles.srOnly}>{t('tiles.structuredIntake.imageAlt')}</span>
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.structuredIntake.description')}
              </p>
            </article>
            <article className={`${styles.tile} ${styles.stretched}`}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.plusMore.title')}</h3>
              <div className={styles.ticker}>
                {/* <div
                  className={`${styles.image} ${styles.imageAllFeatures}`}
                  role="presentation"
                  aria-hidden="true"
                /> */}
                <FeaturesTicker items={tickerItems} />
                <span className={styles.srOnly}>{t('tiles.plusMore.imageAlt')}</span>
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
                <div
                  className={`${styles.image} ${styles.imagePlan}`}
                  role="presentation"
                  aria-hidden="true"
                />
                <span className={styles.srOnly}>{t('tiles.supportPlan.imageAlt')}</span>
              </div>
              <p className={`${styles.tileDescription} type-body-regular`}>
                {t('tiles.supportPlan.description')}
              </p>
            </article>
            <article className={styles.tile}>
              <h3 className={`${styles.tileTitle} type-title`}>{t('tiles.careMonitoring.title')}</h3>
              <div className={styles.media}>
                <div
                  className={`${styles.image} ${styles.imageCheck}`}
                  role="presentation"
                  aria-hidden="true"
                />
                <span className={styles.srOnly}>{t('tiles.careMonitoring.imageAlt')}</span>
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
