'use client';

import Image from 'next/image';   
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import styles from './Footer.module.css';

export function Footer() {
  const tFooter = useTranslations('footer');
  const tFooterSmall = useTranslations('footerSmall');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
  });

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container-md`}>
        <div className={styles.columns}>
          <div className={styles.columns}>
            <div className={`${styles.company} type-body-medium`}>
              <address className={styles.address}>
                <span>{tFooterSmall('companyName')}</span>
                <span>{tFooterSmall('address.line1')}</span>
                <span>{tFooterSmall('address.line2')}</span>
                <span>{tFooterSmall('address.line3')}</span>
                <span>{tFooterSmall('address.line4')}</span>
              </address>
            </div>

            <nav className={`${styles.nav} type-body-medium`} aria-label={tFooterSmall('linksLabel')}>
              <ul className={styles.linkList}>
                <li>
                  <Link className={styles.link} href="https://articles.useruby.care">
                    {tFooterSmall('links.articles')}
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href="/about">
                    {tFooterSmall('links.about')}
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href="/manifest">
                    {tFooterSmall('links.manifesto')}
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href="/privacy">
                    {tFooterSmall('links.privacy')}
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href="/terms">
                    {tFooterSmall('links.terms')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.cta}>
            <p className={`${styles.ctaText} type-headline`}>{tFooter('cta.title')}</p>
          </div>
        </div>
        <p className={`${styles.copy} type-small-regular`}>
          &copy; {currentDate} <span>{tFooterSmall('companyName')}</span>
        </p>
      </div>
    </footer>
  );
}
