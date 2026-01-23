'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import styles from './Footer.module.css';
import { Button } from '../Button';

export function Footer() {
  const router = useRouter();
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
              <div className={styles.signatureRow}>
                <Image
                  src="/r-signature-mono.svg"
                  className={styles.signature}
                  alt={tFooterSmall('logoAlt')}
                  width={32}
                  height={32}
                />
              </div>
              <address className={styles.address}>
                <span>{tFooterSmall('companyName')}</span>
                <span>{tFooterSmall('address.line1')}</span>
                <span>{tFooterSmall('address.line2')}</span>
                <span>{tFooterSmall('address.line3')}</span>
              </address>
            </div>

            <nav className={`${styles.nav} type-body-medium`} aria-label={tFooterSmall('linksLabel')}>
              <ul className={styles.linkList}>
                <li>
                  <Link className={styles.link} href="/articles">
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
            <p className={`${styles.ctaText} type-title`}>{tFooter('cta.title')}</p>
            
            <Button variant='cta' size='huge' content='text' onClick={() => router.push('/access')} aria-label={tFooter('cta.button')}>
              {tFooter('cta.button')}
            </Button>
          </div>
        </div>
        <p className={`${styles.copy} type-small-regular`}>
          &copy; {currentDate} <span>{tFooterSmall('companyName')}</span>
        </p>
      </div>
    </footer>
  );
}
