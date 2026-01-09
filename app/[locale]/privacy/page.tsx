import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('privacy.title');
  const description = t('privacy.description');
  const imageUrl = '/og/privacy.svg';

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/privacy'),
    openGraph: {
      title,
      description,
      url: `/${locale}/privacy`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('privacy.ogAlt'),
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

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <p className={styles.lastUpdated}>
            {t('lastUpdated', { date: currentDate })}
          </p>
        </header>

        <div className={styles.intro}>
          <p>{t('intro')}</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataCollection')}</h2>
            <p className={styles.sectionText}>{t('dataCollectionText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataUsage')}</h2>
            <p className={styles.sectionText}>{t('dataUsageText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('dataSecurity')}</h2>
            <p className={styles.sectionText}>{t('dataSecurityText')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
