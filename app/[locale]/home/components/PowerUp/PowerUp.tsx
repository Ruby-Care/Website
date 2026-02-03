'use client';

import { useEffect, useId, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import styles from './PowerUp.module.css';

export function PowerUp() {
  const t = useTranslations('powerUp');
  const router = useRouter();
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      video.play().catch(() => {});
    };

    document.addEventListener('pointerdown', handleInteraction, { once: true });
    return () => {
      document.removeEventListener('pointerdown', handleInteraction);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={`${styles.inner} container-md`}>
        <div className={styles.card}>
          <div className={styles.background} aria-hidden="true">
            <video
              ref={videoRef}
              className={styles.backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/vid/rc-bg.mp4" type="video/mp4" />
              <source src="/vid/rc-bg.webm" type="video/webm" />
            </video>
          </div>
          <div className={styles.content}>
            <h2 id={titleId} className={`${styles.title} type-display`}>
              {t('title')}
            </h2>
            {/* <div className={styles.actions}>
              <Button
                type="button"
                variant="cta"
                size="huge"
                onClick={() => router.push('/access')}
              >
                {t('button')}
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
