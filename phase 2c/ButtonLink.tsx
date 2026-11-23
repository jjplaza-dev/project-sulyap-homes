import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { buttonClasses, type ButtonSize, type ButtonTone, type ButtonVariant } from './button-styles';

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  href: string;
  /** Opens another site in a new tab with safe `rel` values. */
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}

/** A navigation link that looks like a button. */
export function ButtonLink({
  href,
  external,
  variant,
  size,
  tone,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, tone, className });

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
