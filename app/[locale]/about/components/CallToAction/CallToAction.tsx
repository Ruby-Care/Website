'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import styles from './CallToAction.module.css';

type CallToActionLink = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

export default function CallToAction() {
  const locale = useLocale();
  const t = useTranslations('about');
  const links: CallToActionLink[] = [
    {
      href: 'https://google.com',
      label: t('team.cta.bookCall'),
      target: '_blank',
      rel: 'noreferrer noopener',
    },
    {
      href: 'mailto:contact@useruby.care',
      label: t('team.cta.getInTouch'),
      target: '_blank',
      rel: 'noreferrer noopener',
    },
    {
      href: 'https://www.linkedin.com/company/ruby-care-health/',
      label: t('team.cta.followUs'),
      target: '_blank',
      rel: 'noreferrer noopener',
    },
    {
      href: `/${locale}/imprint`,
      label: t('team.cta.imprint'),
    },
  ];

  const rows: CallToActionLink[][] = [];
  for (let i = 0; i < links.length; i += 2) {
    rows.push(links.slice(i, i + 2));
  }

  return (
    <div className={styles.cta} >
      <div className={`${styles.container} container-rg`}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row}>
            {row.map((link, linkIndex) => (
              <Link
                key={`${link.label}-${rowIndex}-${linkIndex}`}
                href={link.href}
                className={`${styles.link} type-body-medium`}
                target={link.target}
                rel={link.rel}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
