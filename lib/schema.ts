import { routing } from '@/i18n/routing';
import { metadataBase } from '@/lib/metadata';

type SchemaPageType = 'AboutPage' | 'WebPage';

type WebsiteSchemaInput = {
  locale: string;
  siteName: string;
  description: string;
};

type WebPageSchemaInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: SchemaPageType;
  dateModified?: string;
};

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

function getLanguageTag(locale: string) {
  switch (locale) {
    case 'de':
      return 'de-DE';
    case 'pl':
      return 'pl-PL';
    default:
      return 'en-US';
  }
}

function getLocalizedPath(locale: string, path: string) {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

function getWebsiteId(locale: string) {
  return buildUrl(`${getLocalizedPath(locale, '/')}#website`);
}

function getOrganizationId() {
  return buildUrl('/#organization');
}

export function buildSiteSchema({
  locale,
  siteName,
  description,
}: WebsiteSchemaInput) {
  const organizationId = getOrganizationId();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Ruby Care GmbH',
        url: buildUrl(`/${routing.defaultLocale}`),
        email: 'hello@ruby.care',
        founder: {
          '@type': 'Person',
          name: 'Lukasz Siemaszko',
        },
        logo: {
          '@type': 'ImageObject',
          url: buildUrl('/r-wordmark.svg'),
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Friedrichstr. 68',
          addressLocality: 'Berlin',
          postalCode: '10117',
          addressCountry: 'DE',
        },
      },
      {
        '@type': 'WebSite',
        '@id': getWebsiteId(locale),
        url: buildUrl(getLocalizedPath(locale, '/')),
        name: siteName,
        description,
        inLanguage: getLanguageTag(locale),
        publisher: {
          '@id': organizationId,
        },
      },
    ],
  };
}

export function buildWebPageSchema({
  locale,
  path,
  title,
  description,
  type = 'WebPage',
  dateModified,
}: WebPageSchemaInput) {
  const localizedPath = getLocalizedPath(locale, path);
  const organizationId = getOrganizationId();

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': buildUrl(`${localizedPath}#webpage`),
    url: buildUrl(localizedPath),
    name: title,
    description,
    inLanguage: getLanguageTag(locale),
    isPartOf: {
      '@id': getWebsiteId(locale),
    },
    about: {
      '@id': organizationId,
    },
    publisher: {
      '@id': organizationId,
    },
    ...(dateModified ? { dateModified } : {}),
  };
}
