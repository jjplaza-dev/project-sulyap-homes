import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, isSanityConfigured, projectId } from '../../../sanity/env';

/** Minimal shape of an image field as returned by the queries in `queries.ts`. */
export interface RawSanityImage {
  asset?: { _ref: string };
  crop?: unknown;
  hotspot?: unknown;
}

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Sanity CDN address for an image field, respecting the editor's crop and
 * hotspot. Returns `undefined` when there is no image or Sanity is not configured.
 * Smaller sizes are requested at render time (see `MediaView`).
 */
export function sanityImageUrl(image: RawSanityImage | null | undefined, width = 1600): string | undefined {
  if (!builder || !image?.asset) return undefined;
  // The query projection matches what the builder reads (asset ref, crop, hotspot).
  return builder
    .image(image as unknown as SanityImageSource)
    .width(width)
    .fit('max')
    .auto('format')
    .url();
}
