import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { CookieBanner } from '@/components/CookieBanner';
import { PageTransition } from '@/components/PageTransition';
import { LenisProvider } from '@/components/LenisProvider';
import { metadataBase } from '@/lib/metadata';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const ogImageUrl = new URL('/og/ruby-care.jpg', metadataBase).toString();
  const defaultOgAlt = t('defaultOgAlt');

  return {
    metadataBase,
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate', { page: '%s' }),
    },
    description: t('defaultDescription'),
    icons: {
      icon: [
        {
          url: new URL('/favicon.png', metadataBase).toString(),
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      siteName: t('siteName'),
      locale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          alt: defaultOgAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImageUrl],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Header />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <CookieBanner />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
