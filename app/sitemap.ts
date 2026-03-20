import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { metadataBase } from '@/lib/metadata';

const sitemapPaths = [
  '/',
  '/about',
  '/manifest',
  '/access',
  '/privacy',
  '/terms',
  '/imprint',
] as const;

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.flatMap((path) =>
    routing.locales.map((locale) => {
      const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`;

      return {
        url: buildUrl(localizedPath),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((localeOption) => [
              localeOption,
              buildUrl(
                path === '/' ? `/${localeOption}` : `/${localeOption}${path}`
              ),
            ])
          ),
        },
      };
    })
  );
}
