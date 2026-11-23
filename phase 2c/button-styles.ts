import { cx } from '@/lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'md' | 'lg';
/** `onPine` for buttons sitting on Pine Evergreen surfaces. */
export type ButtonTone = 'default' | 'onPine';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  md: 'px-5 text-[0.95rem]',
  lg: 'px-6 text-base',
};

const variants: Record<ButtonTone, Record<ButtonVariant, string>> = {
  default: {
    primary: 'bg-pine-evergreen text-cloud-mist hover:bg-pine-evergreen/90',
    secondary: 'bg-panagbenga-sunflower text-pine-evergreen hover:bg-panagbenga-sunflower/85',
    outline: 'border border-pine-evergreen text-pine-evergreen hover:bg-moss-tint',
    ghost: 'text-pine-evergreen hover:bg-moss-tint',
  },
  onPine: {
    primary: 'bg-panagbenga-sunflower text-pine-evergreen hover:bg-panagbenga-sunflower/90',
    secondary: 'bg-cloud-mist text-pine-evergreen hover:bg-surface',
    outline: 'border border-cloud-mist/60 text-cloud-mist hover:bg-cloud-mist/10',
    ghost: 'text-cloud-mist hover:bg-cloud-mist/10',
  },
};

export function buttonClasses(options: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  className?: string;
} = {}): string {
  const { variant = 'primary', size = 'md', tone = 'default', className } = options;
  return cx(base, sizes[size], variants[tone][variant], className);
}
