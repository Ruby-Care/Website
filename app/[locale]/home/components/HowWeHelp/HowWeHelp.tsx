'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/Button/Button';
import styles from './HowWeHelp.module.css';

export function HowWeHelp() {
  const t = useTranslations('howWeHelp');
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);

  const videoSrc = locale === 'de' ? '/vid/rc-demo-de.mp4' : '/vid/rc-demo.mp4';

  const handleToggle = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (!hasUserStarted || video.paused) {
      try {
        video.currentTime = 0;
        video.muted = false;
        setHasUserStarted(true);
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <section className={styles.section} aria-labelledby="how-we-help-title">
      <div className={`${styles.inner} container-md`}>
        <div className={styles.media}>
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            preload="metadata"
            autoPlay
            playsInline
            loop
            muted
            onPlay={() => {
              if (hasUserStarted) {
                setIsPlaying(true);
              }
            }}
            onPause={() => {
              if (hasUserStarted) {
                setIsPlaying(false);
              }
            }}
            onEnded={() => {
              if (hasUserStarted) {
                setIsPlaying(false);
              }
            }}
          />
        </div>
        <div className={styles.content}>
          <h2 id="how-we-help-title" className={`${styles.title} type-display`}>
            {t('title')}
          </h2>
          <p className={`${styles.description} type-title`}>{t('description')}</p>
          <Button type="button" variant="outline" size="huge" onClick={handleToggle}>
            {isPlaying ? t('pause') : t('play')}
          </Button>
        </div>
      </div>
    </section>
  );
}
