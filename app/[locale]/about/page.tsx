import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { FooterSmall } from '@/components/FooterSmall';
import CallToAction from './components/CallToAction/CallToAction';
import Team from './components/Team/Team';
import OurApproach from './components/OurApproach/OurApproach';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('about.title');
  const description = t('about.description');
  const imageUrl = '/og/about.svg';

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/about'),
    openGraph: {
      title,
      description,
      url: `/${locale}/about`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('about.ogAlt'),
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>


{/* 
        <div className={styles.heroSection}>
          <div>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          </div>
          <p className={styles.heroDescription}>{t('hero.description')}</p>
        </div> */}
{/* 
        <div className={styles.whyRubyCareSection}>
          <div>
            <h2 className={styles.sectionTitle}>{t('whyRubyCare.title')}</h2>
          </div>
          <p className={styles.sectionDescription}>{t('whyRubyCare.description')}</p>

          <div className={styles.realityContainer}>
            <h3 className={styles.realityTitle}>{t('reality.title')}</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>
                  {t('reality.stats.survivorship.value')}
                </div>
                <p className={styles.statDescription}>
                  {t('reality.stats.survivorship.description')}
                </p>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>
                  {t('reality.stats.supportAccess.value')}
                </div>
                <p className={styles.statDescription}>
                  {t('reality.stats.supportAccess.description')}
                </p>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>
                  {t('reality.stats.cases2030.value')}
                </div>
                <p className={styles.statDescription}>
                  {t('reality.stats.cases2030.description')}
                </p>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>
                  {t('reality.stats.youngDiagnoses.value')}
                </div>
                <p className={styles.statDescription}>
                  {t('reality.stats.youngDiagnoses.description')}
                </p>
              </div>
            </div>
            <p className={styles.realityFooter}>{t('reality.footer')}</p>
          </div>
        </div> */}

        {/* <div className={styles.beliefsSection}>
          <h2 className={styles.beliefsBelieve}>{t('beliefs.title')}</h2>
          <div className={styles.beliefsGrid}>
            <div className={styles.beliefCard}>
              <div className={styles.beliefNumber}>1</div>
              <p className={styles.beliefText}>{t('beliefs.items.continuous')}</p>
            </div>
            <div className={styles.beliefCard}>
              <div className={styles.beliefNumber}>2</div>
              <p className={styles.beliefText}>{t('beliefs.items.structured')}</p>
            </div>
            <div className={styles.beliefCard}>
              <div className={styles.beliefNumber}>3</div>
              <p className={styles.beliefText}>{t('beliefs.items.personalized')}</p>
            </div>
            <div className={styles.beliefCard}>
              <div className={styles.beliefNumber}>4</div>
              <p className={styles.beliefText}>{t('beliefs.items.collaborative')}</p>
            </div>
          </div>
        </div> */}
{/* 
        <div className={styles.approachSection}>
          <div className={styles.approachContent}>
            <h2 className={styles.approachTitle}>{t('approach.title')}</h2>
            <p className={styles.approachDescription}>
              {t('approach.description.primary')}
            </p>
            <p className={styles.approachDescription}>
              {t('approach.description.secondary')}
            </p>
          </div>
        </div> */}

     
        

        
      </div>

      <OurApproach />
      <Team />
      <CallToAction />
      <FooterSmall />
    </div>
  );
}
