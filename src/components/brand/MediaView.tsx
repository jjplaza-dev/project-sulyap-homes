import type { MediaImage } from '@/domain';
import { cx } from '@/lib/cx';
import { PlaceholderArt } from './PlaceholderArt';

interface MediaViewProps {
  image: MediaImage;
  /**
   * Overrides the image's own alt text. Pass `""` when the image only repeats
   * adjacent text (for example a card thumbnail inside a titled link).
   */
  alt?: string;
  className?: string;
}

/**
 * Renders a domain `MediaImage`: a real image once `src` exists (Phase 3+),
 * otherwise the original SVG placeholder. Fills its parent; the parent sets
 * the aspect ratio.
 */
export function MediaView({ image, alt, className }: MediaViewProps) {
  const label = alt ?? image.alt;

  if (image.src) {
    return (
      // Plain <img>: real photo hosting and next/image arrive with Sanity (Phase 3).
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
        alt={label}
        width={image.width}
        height={image.height}
        loading="lazy"
        className={cx('block h-full w-full object-cover', className)}
      />
    );
  }

  return <PlaceholderArt art={image.placeholder ?? 'ridge-mist'} alt={label} className={className} />;
}
