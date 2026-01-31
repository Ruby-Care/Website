import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import styles from './page.module.css';
import CallToAction from './components/CallToAction/CallToAction';
import { FooterSmall } from '@/components/FooterSmall';

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
  const t = useTranslations('about');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          </div>
          <p className={styles.heroDescription}>{t('hero.description')}</p>
        </div>

        {/* Why Ruby Care Section */}
        <div className={styles.whyRubyCareSection}>
          <div>
            <h2 className={styles.sectionTitle}>{t('whyRubyCare.title')}</h2>
          </div>
          <p className={styles.sectionDescription}>{t('whyRubyCare.description')}</p>

          {/* Reality Stats */}
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
        </div>

        {/* What We Believe Section */}
        <div className={styles.beliefsSection}>
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
        </div>

        {/* Approach Section */}
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
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.teamTitleContainer}>
            <h2 className={styles.teamTitle}>{t('team.title')}</h2>
            <p className={styles.teamSubtitle}>{t('team.subtitle')}</p>
            <div className={styles.teamMembersContainer}>
              <div className={styles.teamMember}>
                <img 
                  src="http://localhost:3845/assets/30e2f322aec2f941a7aca4554080ab2baf7adf5c.png"
                  alt={t('team.members.chiefExecutive.name')}
                  className={styles.teamMemberImage}
                />
                <div className={styles.teamMemberInfo}>
                  <p className={styles.teamMemberName}>
                    {t('team.members.chiefExecutive.name')}
                  </p>
                  <p className={styles.teamMemberRole}>
                    {t('team.members.chiefExecutive.role')}
                  </p>
                </div>
              </div>
              <div className={styles.teamMember}>
                <img 
                  src="http://localhost:3845/assets/b4c84c44fdb1d609526b3210f57d896beb33cb1e.png"
                  alt={t('team.members.chiefProduct.name')}
                  className={styles.teamMemberImage}
                />
                <div className={styles.teamMemberInfo}>
                  <p className={styles.teamMemberName}>
                    {t('team.members.chiefProduct.name')}
                  </p>
                  <p className={styles.teamMemberRole}>
                    {t('team.members.chiefProduct.role')}
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.teamDescription}>{t('team.description')}</p>
              
          </div>
        </div>

        
      </div>
      <CallToAction />
      <FooterSmall />
    </div>
  );
}
