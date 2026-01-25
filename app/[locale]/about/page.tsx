import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import styles from './page.module.css';
import { Button } from '@/components/Button';
import { RubyIcon } from '@/components/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('about.title');
  const description = t('about.description');
  const imageUrl = '/og/about.svg';

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/about'),
    openGraph: {
      title,
      description,
      url: `/${locale}/about`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('about.ogAlt'),
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

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
       

        <div className={styles.description}>
          <p>{t('description')}</p>
        </div>

        {/* <div className={styles.sections}>
          <Button size='small' variant="primary">
            Test
          </Button>
          <Button size="medium" variant="primary">
            Test
          </Button>
          <Button size='large' variant="primary">
            Test
          </Button>
          <Button size='huge' variant="primary">
            Test
          </Button>
        </div>

        <div className={styles.sections}>
          <Button size='small' content='icon' variant="secondary">
            <RubyIcon />
          </Button>
          <Button size="medium" content='icon' variant="secondary">
            <RubyIcon />
          </Button>
          <Button size='large' content='icon' variant="secondary">
            <RubyIcon />
          </Button>
          <Button size='huge' content='icon' variant="secondary">
            <RubyIcon />
          </Button>
        </div> */}
        
      </div>
    </div>
  );
}
