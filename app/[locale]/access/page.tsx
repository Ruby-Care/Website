import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { EmailSignup } from '@/components/EmailSignup';
import styles from './page.module.css';
import { RightChevronIcon } from '@/components/Icon/icons/RightChevronIcon';
import { CheckmarkIcon, LeftChevronIcon } from '@/components/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('access.title');
  const description = t('access.description');
  const imageUrl = '/og/home.svg';

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/access'),
    openGraph: {
      title,
      description,
      url: `/${locale}/access`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('access.ogAlt'),
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

export default function AccessPage() {
  const t = useTranslations('accessPage');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={`${styles.title} font-heading color-text`}>{t('title')}</h1>
          <p className={`${styles.subtitle} font-body color-text-muted`}>{t('subtitle')}</p>
        </header>
        <EmailSignup />

        <div className={styles.features}>
          <h2 className={`${styles.heading} font-title color-text fw-bold`}>{t('features.heading')}</h2>
          <div className={styles.feature}>
            <CheckmarkIcon />
            <div>
              <h4 className={`${styles.featureTitle} font-body fw-bold color-text`}>{t('features.items.workflow.title')}</h4>
              <p className="font-small color-text-muted">{t('features.items.workflow.description')}</p>
            </div>
          </div>
          <div className={styles.feature}>
            <CheckmarkIcon />
            <div>
              <h4 className={`${styles.featureTitle} font-body fw-bold color-text`}>{t('features.items.admin.title')}</h4>
              <p className="font-small color-text-muted">{t('features.items.admin.description')}</p>
            </div>
          </div>
          <div className={styles.feature}>
            <CheckmarkIcon />
            <div>
              <h4 className={`${styles.featureTitle} font-body fw-bold color-text`}>{t('features.items.care.title')}</h4>
              <p className="font-small color-text-muted">{t('features.items.care.description')}</p>
            </div>
          </div>
          <div className={styles.feature}>
            <CheckmarkIcon />
            <div>
              <h4 className={`${styles.featureTitle} font-body fw-bold color-text`}>{t('features.items.influence.title')}</h4>
              <p className="font-small color-text-muted">{t('features.items.influence.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
