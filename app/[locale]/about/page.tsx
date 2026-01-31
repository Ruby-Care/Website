import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { FooterSmall } from '@/components/FooterSmall';
import CallToAction from './components/CallToAction/CallToAction';
import Team from './components/Team/Team';
import OurApproach from './components/OurApproach/OurApproach';
import styles from './page.module.css';
import WeBelieve from './components/WeBelieve/WeBelieve';
import WhyRuby from './components/WhyRuby/WhyRuby';
import Header from './components/Header/Header';

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

     

     
        

        
      </div>

      <Header />
      <WhyRuby />
      <WeBelieve />
      <OurApproach />
      <Team />
      <CallToAction />
      <FooterSmall />
    </div>
  );
}
