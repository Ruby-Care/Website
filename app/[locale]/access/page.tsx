import type { Metadata } from 'next';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { EmailSignup } from '@/components/EmailSignup';
import { FooterNano } from '@/components/FooterNano';
import { CheckmarkSingleIcon } from '@/components/Icon';
import { StructuredData } from '@/components/StructuredData/StructuredData';
import { buildAlternates } from '@/lib/metadata';
import { buildWebPageSchema } from '@/lib/schema';
import { WhatYouGet } from '../home/components/WhatYouGet/WhatYouGet';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('access.title');
  const description = t('access.description');
  const imageUrl = '/og/ruby-care.jpg';
  const ogAlt = t('defaultOgAlt');

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
          alt: ogAlt,
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
  const locale = useLocale();
  const t = useTranslations('accessPage');
  const tSeo = useTranslations('seo');

  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          locale,
          path: '/access',
          title: tSeo('access.title'),
          description: tSeo('access.description'),
        })}
      />

      <div className={`${styles.topContainer} container-sm`}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={`${styles.title} type-display color-text`}>
              {t.rich('title', {
                br: () => <br />,
              })}
            </h1>
            <p className={`${styles.subtitle} type-subtitle color-text-muted`}>
              {t('subtitle')}
            </p>
          </header>
          <EmailSignup />
        </div>
      </div>

      <WhatYouGet />

      <div className={`${styles.container} container-sm`}>
        <div className={styles.features}>
          <h2 className={`${styles.heading} type-title`}>
            {t.rich('features.heading', {
              br: () => <br />,
            })}
          </h2>
          <div className={styles.list}>
            <div className={styles.feature}>
              <CheckmarkSingleIcon />
              <div>
                <h4 className={`${styles.featureTitle} type-body-medium`}>
                  {t('features.items.workflow.title')}
                </h4>
                <p className="type-body-regular">
                  {t('features.items.workflow.description')}
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <CheckmarkSingleIcon />
              <div>
                <h4 className={`${styles.featureTitle} type-body-medium`}>
                  {t('features.items.admin.title')}
                </h4>
                <p className="type-body-regular">
                  {t('features.items.admin.description')}
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <CheckmarkSingleIcon />
              <div>
                <h4 className={`${styles.featureTitle} type-body-medium`}>
                  {t('features.items.care.title')}
                </h4>
                <p className="type-body-regular">
                  {t('features.items.care.description')}
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <CheckmarkSingleIcon />
              <div>
                <h4 className={`${styles.featureTitle} type-body-medium`}>
                  {t('features.items.influence.title')}
                </h4>
                <p className="type-body-regular">
                  {t('features.items.influence.description')}
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/r-signature-mono.svg"
            className={styles.signature}
            alt="Ruby"
            width={32}
            height={32}
          />
        </div>
      </div>

      <FooterNano />
    </>
  );
}
