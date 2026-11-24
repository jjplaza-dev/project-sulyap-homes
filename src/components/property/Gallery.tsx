'use client';

import { useState } from 'react';
import { Images } from 'lucide-react';
import type { MediaImage } from '@/domain';
import { MediaView } from '@/components/brand/MediaView';
import { buttonClasses } from '@/components/layout/button-styles';
import { cx } from '@/lib/cx';
import { Lightbox } from '../motion/Lightbox';

/**
 * Primary-plus-grid photo mosaic. Every tile is a button that opens the
 * lightbox at that photo. On small screens the primary photo leads and the
 * "View all photos" button opens the rest.
 */
export function Gallery({ images, title }: { images: ReadonlyArray<MediaImage>; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [primary, ...rest] = images;
  const tiles = rest.slice(0, 4);

  const tile = (image: MediaImage, i: number, className?: string) => (
    <button
      key={image.id}
      type="button"
      onClick={() => setIndex(i)}
      aria-label={`Open photo ${i + 1} of ${images.length}`}
      className={cx('group relative block overflow-hidden rounded-lg bg-moss-tint', className)}
    >
      <MediaView
        image={image}
        alt=""
        className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </button>
  );

  if (!primary) return null;

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
        {tile(primary, 0, 'aspect-[3/2] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[22rem]')}
        {tiles.map((image, i) => tile(image, i + 1, 'hidden aspect-[3/2] sm:block'))}
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={() => setIndex(0)} className={buttonClasses({ variant: 'outline' })}>
          <Images className="size-5" aria-hidden="true" />
          View all {images.length} photos
        </button>
      </div>
      <Lightbox images={images} index={index} title={title} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </div>
  );
}
