import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { Footer } from '@/components/Footer';
import { Hero } from './components/Hero/Hero';
import { Mission } from './components/Mission/Mission';
import { HowWeHelp } from './components/HowWeHelp/HowWeHelp';
import { WhatYouGet } from './components/WhatYouGet/WhatYouGet';
import { BuiltWithAndFor } from './components/BuiltWithAndFor/BuiltWithAndFor';
import { Features } from './components/Features/Features';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { PowerUp } from './components/PowerUp/PowerUp';
import { FooterNanoAccessButton } from './components/FooterNanoAccessButton/FooterNanoAccessButton';
import { FooterNano } from '@/components/FooterNano/FooterNano';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('home.title');
  const description = t('home.description');
  const imageUrl = '/og/ruby-care.jpg';
  const ogAlt = t('defaultOgAlt');

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

export default async function HomePage() {
  return (
    <>
      <Hero />
      <PowerUp />
      <Features />
      <BuiltWithAndFor />
      <HowItWorks />
      <WhatYouGet />
      <HowWeHelp />
      <Mission />
      <Footer />
      <FooterNano alwaysVisible action={<FooterNanoAccessButton />} />
    </>
  );
}
