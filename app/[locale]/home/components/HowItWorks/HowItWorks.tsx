'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/Button';
import styles from './HowItWorks.module.css';

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
  });
  const [progress, setProgress] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const steps = useMemo(
    () => [
      {
        label: t('steps.step1.label'),
        title: t('steps.step1.title'),
        description: t('steps.step1.description'),
      },
      {
        label: t('steps.step2.label'),
        title: t('steps.step2.title'),
        description: t('steps.step2.description'),
      },
      {
        label: t('steps.step3.label'),
        title: t('steps.step3.title'),
        description: t('steps.step3.description'),
      },
      {
        label: t('steps.step4.label'),
        title: t('steps.step4.title'),
        description: t('steps.step4.description'),
      },
      {
        label: t('steps.step5.label'),
        title: t('steps.step5.title'),
        description: t('steps.step5.description'),
      },
      {
        label: t('steps.step6.label'),
        title: t('steps.step6.title'),
        description: t('steps.step6.description'),
      },
    ],
    [t]
  );

  const updateProgress = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const nextProgress = Math.min(1, Math.max(0, emblaApi.scrollProgress()));
    setProgress(nextProgress);
    setCanScrollNext(emblaApi.canGoToNext());
    setCanScrollPrev(emblaApi.canGoToPrev());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateProgress();
    emblaApi.on('scroll', updateProgress);
    emblaApi.on('reinit', updateProgress);
    emblaApi.on('select', updateProgress);

    return () => {
      emblaApi.off('scroll', updateProgress);
      emblaApi.off('reinit', updateProgress);
      emblaApi.off('select', updateProgress);
    };
  }, [emblaApi, updateProgress]);

  const handleNext = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.goToNext();
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.goToPrev();
  }, [emblaApi]);

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={`${styles.inner} container-md`}>
        <div className={styles.embla} aria-label={t('ariaLabel')} aria-roledescription="carousel">
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
              <div className={styles.slide} role="group" aria-roledescription="slide">
                <article className={`${styles.slideInner} ${styles.introCard}`}>
                  <h2 id={titleId} className={`${styles.introTitle} type-display`}>
                    {t('intro.title')}
                  </h2>
                  <p className={`${styles.introDescription} type-body-regular`}>{t('intro.description')}</p>
                </article>
              </div>

              {steps.map((step) => (
                <div key={step.title} className={styles.slide} role="group" aria-roledescription="slide">
                  <article className={styles.slideInner}>
                    <p className={`${styles.stepLabel} type-subtitle`}>{step.label}</p>
                    <h3 className={`${styles.stepTitle} type-headline`}>{step.title}</h3>
                    <p className={`${styles.stepDescription} type-body-regular`}>{step.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.controls}>
            <div
              className={styles.progress}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${8 + progress * 100}%`}} />
              </div>
            </div>
            <div className={styles.buttons}>
              <AnimatePresence initial={false}>
                {canScrollPrev ? (
                  <motion.div
                    key="prev-button"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      size="huge"
                      onClick={handlePrev}
                      aria-label={t('controls.prev')}
                    >
                      {t('controls.prev')}
                    </Button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <Button
                type="button"
                variant="secondary"
                size="huge"
                onClick={handleNext}
                disabled={!canScrollNext}
                aria-label={t('controls.next')}
              >
                {t('controls.next')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
