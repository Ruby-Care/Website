'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import styles from './WhatYouGet.module.css';
import { CloseIcon } from '@/components/Icon';

export function WhatYouGet() {
  const t = useTranslations('whatYouGet');
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const leftTitleId = useId();
  const rightTitleId = useId();

  return (
    <section className={styles.section} aria-labelledby={leftTitleId}>
      <div className={`${styles.inner} container-md`}>
        <div className={`${styles.column} ${styles.specialist}`}>
          <h2 id={leftTitleId} className={`${styles.title} type-title`}>
            {t('left.title')}
          </h2>
          <Button
            type="button"
            variant="primaryOnDark"
            size="huge"
            onClick={() => setLeftOpen(true)}
          >
            {t('left.button')}
          </Button>
          <Modal
            isOpen={leftOpen}
            onClose={() => setLeftOpen(false)}
            showCloseButton={false}
            className={styles.infoModal}
            ariaLabelledBy={`${leftTitleId}-modal`}
          >
            {({ close }) => (
              <div className={styles.modalContent}>
                <h3 id={`${leftTitleId}-modal`} className={`${styles.modalTitle} type-title`}>
                  {t('left.modalTitle')}
                </h3>
                <p className={`${styles.modalDescription} type-body-regular`}>
                  {t('left.modalDescription')}
                </p>
                <div className={styles.modalActions}>
                  <Button type="button" variant="secondary" size="large" onClick={close}>
                    {t('modal.closeLabel')}
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </div>

        <div className={`${styles.column} ${styles.patient}`}>
          <h2 id={rightTitleId} className={`${styles.title} type-title`}>
            {t('right.title')}
          </h2>
          <Button
            type="button"
            variant="primaryOnDark"
            size="huge"
            onClick={() => setRightOpen(true)}
          >
            {t('right.button')}
          </Button>
          <Modal
            showCloseButton={false}
            isOpen={rightOpen}
            onClose={() => setRightOpen(false)}
            className={styles.infoModal}
            ariaLabelledBy={`${rightTitleId}-modal`}
          >
            {({ close }) => (
              <div className={styles.modalContent}>
                <h3 id={`${rightTitleId}-modal`} className={`${styles.modalTitle} type-title`}>
                  {t('right.modalTitle')}
                </h3>
                <p className={`${styles.modalDescription} type-body-regular`}>
                  {t('right.modalDescription')}
                </p>
                <div className={styles.modalActions}>
                  <Button type="button" content='icon' variant="secondary" size="huge" onClick={close}>
                    {/* {t('modal.closeLabel')} */}
                    <CloseIcon />
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </section>
  );
}
