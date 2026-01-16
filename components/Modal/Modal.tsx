'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/components/Icon';
import styles from './Modal.module.css';
import { Button } from '../Button';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalRenderProps = {
  close: () => void;
};

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ((props: ModalRenderProps) => ReactNode);
  size?: 'small' | 'medium';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  customClass?: string;
  overlayClassName?: string;
};

type ModalWithCloseButton = BaseModalProps & {
  showCloseButton?: true;
  closeLabel: string;
};

type ModalWithoutCloseButton = BaseModalProps & {
  showCloseButton: false;
  closeLabel?: never;
};

export type ModalProps = ModalWithCloseButton | ModalWithoutCloseButton;

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'medium',
  closeLabel,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  ariaLabel,
  ariaLabelledBy,
  className = '',
  customClass = '',
  overlayClassName = '',
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef<string>('');
  const shouldRestoreRef = useRef(false);
  const pendingCloseRef = useRef(false);

  const requestClose = useCallback(() => {
    if (!isVisible || pendingCloseRef.current) {
      return;
    }
    pendingCloseRef.current = true;
    setIsVisible(false);
  }, [isVisible]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      pendingCloseRef.current = false;
      setIsVisible(true);
      return;
    }

    pendingCloseRef.current = false;
    setIsVisible(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    previouslyFocusedRef.current =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    shouldRestoreRef.current = true;

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (shouldRestoreRef.current) {
        shouldRestoreRef.current = false;
        document.body.style.overflow = previousOverflowRef.current;
        previouslyFocusedRef.current?.focus?.();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, isVisible, requestClose]);

  if (showCloseButton && !closeLabel) {
    throw new Error('Modal closeLabel is required when showCloseButton is true.');
  }

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      requestClose();
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }

    const container = dialogRef.current;
    if (!container) {
      return;
    }

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true'
    );

    if (focusable.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (active === first || active === container) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const content =
    typeof children === 'function'
      ? (children as (props: ModalRenderProps) => ReactNode)({
          close: requestClose,
        })
      : children;

  const overlayClasses = overlayClassName
    ? `${styles.overlay} ${overlayClassName}`
    : styles.overlay;
  const sizeClass = size === 'small' ? styles.sizeSmall : styles.sizeMedium;
  const dialogClasses = `${styles.dialog} ${sizeClass} ${className} ${customClass}`.trim();

  const overlayTransition = {
    duration: shouldReduceMotion ? 0 : 0.5,
    ease: [0.22, 0.61, 0.36, 1],
  } as const;
  const dialogTransition = {
    duration: shouldReduceMotion ? 0 : 0.5,
    ease: [0.23, 1, 0.32, 1],
  } as const;
  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  } as const;
  const dialogVariants = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: 20, scale: 0.98 },
  } as const;

  if (!mounted) {
    return null;
  }

  const handleExitComplete = () => {
    if (!shouldRestoreRef.current) {
      return;
    }
    shouldRestoreRef.current = false;
    document.body.style.overflow = previousOverflowRef.current;
    previouslyFocusedRef.current?.focus?.();
    if (pendingCloseRef.current) {
      pendingCloseRef.current = false;
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible ? (
        <motion.div
          className={overlayClasses}
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={overlayTransition}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={dialogClasses}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            tabIndex={-1}
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleKeyDown}
            variants={dialogVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={dialogTransition}
          >
            {showCloseButton ? (
              <Button
                type="button"
                content="icon"
                size="medium"
                variant="ghostOnDark"
                className={styles.closeButton}
                onClick={requestClose}
                aria-label={closeLabel}
              >
                <CloseIcon/>
              </Button>
            ) : null}
            {content}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
