'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button/Button';

export function FooterNanoAccessButton() {
  const t = useTranslations('home');
  const router = useRouter();

  return (
    <Button size="huge" variant="cta" onClick={() => router.push('/access')}>
      {t('footerNanoButton')}
    </Button>
  );
}
