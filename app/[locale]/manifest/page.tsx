import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { FooterNano } from '@/components/FooterNano';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('manifest.title');
  const description = t('manifest.description');
  const imageUrl = '/og/ruby-care.jpg';
  const ogAlt = t('defaultOgAlt');

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/manifest'),
    openGraph: {
      title,
      description,
      url: `/${locale}/manifest`,
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

export default function ManifestPage() {
  const t = useTranslations('manifest');

  return (
    <div className={styles.container} >
      <div className={`${styles.content} container-sm`}>
        <h1 className={`type-display ${styles.title}`} >
          {t.rich('title', {
            br: () => <br />,
          })}
        </h1>
        <div className={`${styles.description} type-title`}>
          <p>{t('intro')}</p>
          <p>{t('craft')}</p>
          <p>{t('quality')}</p>
          <p>{t('standard')}</p>
          <p>{t('complexity')}</p>
          <p className={styles.signature}>{t('signature')}</p>
        </div>
      </div>
      <FooterNano />
    </div>
  );
}
