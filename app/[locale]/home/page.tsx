import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { buildAlternates } from '@/lib/metadata';
import { Footer } from '@/components/Footer';
import { Mission } from './components/Mission/Mission';
import { HowWeHelp } from './components/HowWeHelp/HowWeHelp';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('home.title');
  const description = t('home.description');
  const imageUrl = '/og/home.svg';

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/home'),
    openGraph: {
      title,
      description,
      url: `/${locale}/home`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('home.ogAlt'),
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

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={`${styles.title} type-hero color-text`}>{t('title')}</h1>
        </div>
        <Image src="/img/hero-bg.webp" alt="Product demo" className={styles.heroImage} width={1444} height={860} />
      </div>
      <HowWeHelp />
      <Mission />
      <Footer />
    </>
  );
}
