import type { MetadataRoute } from 'next';
import { metadataBase } from '@/lib/metadata';

function buildUrl(path: string) {
  return new URL(path, metadataBase).toString();
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: buildUrl('/sitemap.xml'),
    host: metadataBase.toString().replace(/\/$/, ''),
  };
}
