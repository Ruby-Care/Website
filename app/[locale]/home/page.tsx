import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { Footer } from '@/components/Footer';
import { Hero } from './components/Hero/Hero';
import { Mission } from './components/Mission/Mission';
import { HowWeHelp } from './components/HowWeHelp/HowWeHelp';
import { WhatYouGet } from './components/WhatYouGet/WhatYouGet';
import { BuiltWithAndFor } from './components/BuiltWithAndFor/BuiltWithAndFor';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { PowerUp } from './components/PowerUp/PowerUp';

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
  return (
    <>
      <Hero />
      <PowerUp />
      <BuiltWithAndFor />
      <HowItWorks />
      <WhatYouGet />
      
      <HowWeHelp />
      <Mission />
      <Footer />
    </>
  );
}
