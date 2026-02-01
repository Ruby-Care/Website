import { routing } from '@/i18n/routing';

const fallbackSiteUrl = 'https://useruby.care';
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = rawSiteUrl
  ? rawSiteUrl.startsWith('http')
    ? rawSiteUrl
    : `https://${rawSiteUrl}`
  : fallbackSiteUrl;

export const metadataBase = new URL(siteUrl);

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((localeOption) => [
        localeOption,
        `/${localeOption}${path}`,
      ])
    ),
  };
}
