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
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
       

        <div className={styles.description}>
          <p>{t('description')}</p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('mission')}</h2>
            <p className={styles.sectionText}>{t('missionText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('values')}</h2>
            <p className={styles.sectionText}>{t('valuesText')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
