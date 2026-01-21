import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'cta' | 'primary'  | 'primaryOnDark' | 'secondary' | 'outline' | 'ghost' | 'ghostOnDark';
  size?: 'small' | 'medium' | 'large' | 'huge';
  content?: 'text' | 'icon';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'medium',
    content = 'text',
    fullWidth = false,
    className = '',
    ...props
  },
  ref
) {
  const isIcon = content === 'icon';
  const iconSizeClass = isIcon ? styles[`icon${size[0].toUpperCase()}${size.slice(1)}`] : '';
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    isIcon ? styles.icon : '',
    fullWidth ? styles.fullWidth : '',
    iconSizeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={`type-body-medium ${buttonClassName}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
