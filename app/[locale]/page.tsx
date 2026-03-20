import { useLocale, useTranslations } from 'next-intl';
import { StructuredData } from '@/components/StructuredData/StructuredData';
import { buildWebPageSchema } from '@/lib/schema';
import { HomeContent, buildHomeMetadata } from './home/HomePage';

export { buildHomeMetadata as generateMetadata };

export default function RootPage() {
  const locale = useLocale();
  const t = useTranslations('seo');

  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          locale,
          path: '/',
          title: t('home.title'),
          description: t('home.description'),
        })}
      />
      <HomeContent />
    </>
  );
}
