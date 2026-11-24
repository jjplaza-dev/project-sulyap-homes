'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaImage } from '@/domain';
import { MediaView } from '@/components/brand/MediaView';
import { cx } from '@/lib/cx';

interface LightboxProps {
  images: ReadonlyArray<MediaImage>;
  /** Index of the open image, or `null` when closed. */
  index: number | null;
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const navButton =
  'inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-cloud-mist/40 text-cloud-mist transition-colors hover:bg-cloud-mist/10';

/**
 * Full-screen photo viewer on the browser's native modal <dialog>: focus is
 * trapped, Esc closes it, and the page behind is inert. Left/Right arrows move
 * between photos.
 */
export function Lightbox({ images, index, title, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + count) % count);
  };

  const current = index === null ? null : images[index];

  return (
    <dialog
      ref={ref}
      aria-label={`${title}: photographs`}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          go(1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          go(-1);
        }
      }}
      className="on-pine fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-pine-evergreen/95 p-0 text-cloud-mist backdrop:bg-transparent"
    >
      {current && index !== null ? (
        <div className="flex h-full flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="numeric-tabular text-sm" aria-live="polite">
              Photo {index + 1} of {count}
            </p>
            <button type="button" onClick={onClose} autoFocus className={navButton} aria-label="Close photo viewer">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-3">
            <button type="button" onClick={() => go(-1)} className={navButton} aria-label="Previous photo">
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <div
              className="h-full max-h-[64dvh] min-w-0 max-w-full overflow-hidden rounded-lg"
              style={{ aspectRatio: `${current.width} / ${current.height}` }}
            >
              <MediaView image={current} />
            </div>
            <button type="button" onClick={() => go(1)} className={navButton} aria-label="Next photo">
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </div>

          <p className="mx-auto max-w-3xl text-center text-sm text-cloud-mist/85">{current.caption ?? current.alt}</p>

          <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Photo thumbnails">
            {images.map((image, i) => (
              <li key={image.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                  className={cx(
                    'block h-14 aspect-[3/2] overflow-hidden rounded-md border-2 transition-opacity',
                    i === index ? 'border-panagbenga-sunflower' : 'border-transparent opacity-70 hover:opacity-100',
                  )}
                >
                  <MediaView image={image} alt="" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </dialog>
  );
}
