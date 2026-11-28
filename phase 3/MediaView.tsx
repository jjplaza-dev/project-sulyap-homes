import type { MediaImage } from '@/domain';
import { cx } from '@/lib/cx';
import { PlaceholderArt } from './PlaceholderArt';

const WIDTHS = [480, 800, 1200, 1600] as const;

/** Sanity's image CDN resizes on request: set the `w` parameter. */
function withWidth(src: string, width: number): string {
  try {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    return url.toString();
  } catch {
    return src;
  }
}

interface MediaViewProps {
  image: MediaImage;
  /** Display size hint for responsive loading, e.g. `(min-width: 1024px) 33vw, 100vw`. */
  sizes?: string;
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
export function MediaView({ image, alt, sizes = '(min-width: 1024px) 33vw, 100vw', className }: MediaViewProps) {
  const label = alt ?? image.alt;
  const source = image.src;

  if (source) {
    return (
      // Plain <img>: real photo hosting and next/image arrive with Sanity (Phase 3).
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={source}
        srcSet={WIDTHS.map((w) => `${withWidth(source, w)} ${w}w`).join(', ')}
        sizes={sizes}
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
