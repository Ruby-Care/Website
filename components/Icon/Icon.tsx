import { cloneElement } from 'react';
import type { ReactElement, SVGProps } from 'react';
import styles from './Icon.module.css';

type IconSize = 'small' | 'medium' | 'large';

export type IconProps = {
  size?: IconSize;
  title?: string;
  className?: string;
  children: ReactElement<SVGProps<SVGSVGElement>>;
};

export function Icon({
  size = 'medium',
  title,
  className = '',
  children,
}: IconProps) {
  const sizeClass = styles[`size${size[0].toUpperCase()}${size.slice(1)}`];
  const isDecorative = !title;
  const svg = cloneElement(children, {
    'aria-hidden': isDecorative || undefined,
    'aria-label': title,
    role: isDecorative ? undefined : 'img',
    focusable: 'false',
  } satisfies SVGProps<SVGSVGElement>);

  return (
    <span
      className={`${styles.icon} ${sizeClass} ${className}`.trim()}
    >
      {svg}
    </span>
  );
}
