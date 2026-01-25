'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button';
import styles from './FooterNano.module.css';

interface FooterNanoProps {
  action?: ReactNode;
  alwaysVisible?: boolean;
}

export function FooterNano({ action, alwaysVisible = false }: FooterNanoProps) {
  const t = useTranslations('manifest');
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldExpand = alwaysVisible && isAtBottom;
  const expandedWidth = '100%';
  const collapsedWidth = '15.5rem';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isTicking = false;

    const updatePosition = () => {
      isTicking = false;
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const nextIsAtBottom = Math.ceil(scrollPosition) >= pageHeight - 240;

      setIsAtBottom(nextIsAtBottom);
    };

    const handleScroll = () => {
      if (isTicking) {
        return;
      }
      isTicking = true;
      window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isVisible = alwaysVisible || isAtBottom;
  const content = action ?? (
    <Button
      type="button"
      variant="secondary"
      size="large"
      onClick={() => router.push('/')}
    >
      {t('footer.back')}
    </Button>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    <footer className={styles.footer}>
      <div className={`${styles.inner} container-sm ${alwaysVisible && isAtBottom ? styles.innerAtBottom : ''}`}>
        <div className={styles.slot}>
          <AnimatePresence>
            {isVisible ? (
              <motion.div
                className={`${styles.buttonWrap} ${alwaysVisible ? styles.buttonWrapAlwaysVisible : styles.popupButton}`}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 32,
                  ...(alwaysVisible ? { width: collapsedWidth } : {}),
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  ...(alwaysVisible ? { width: shouldExpand ? expandedWidth : collapsedWidth } : {}),
                }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 0.5,
                        opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        width: alwaysVisible
                          ? { type: 'spring', stiffness: 220, damping: 18 }
                          : { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      }
                }
              >
                {content}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </footer>,
    document.body
  );
}
