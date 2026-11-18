import type { EntityId } from './common';
import type { MediaKind, PlaceholderArtKey } from './enums';

/**
 * An image must be renderable: it has either a real source (`src`, from
 * Phase 3 onward) or a placeholder art key (Phase 2). This union makes an
 * "empty image box" a type error.
 */
export type MediaSource =
  | {
      readonly src: string;
      /** Optional fallback art while the real image loads or is missing. */
      readonly placeholder?: PlaceholderArtKey;
    }
  | {
      readonly src?: undefined;
      readonly placeholder: PlaceholderArtKey;
    };

export interface MediaImageBase {
  readonly id: EntityId;
  readonly kind: MediaKind;
  /**
   * Meaningful alt text. For Phase 2 placeholder art, include the words
   * "Illustrative placeholder".
   */
  readonly alt: string;
  /** Intrinsic dimensions: define the aspect ratio real photos will use. */
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
}

/** Photograph, portrait, logo, or floor-plan image. */
export type MediaImage = MediaImageBase & MediaSource;

/** A `MediaImage` whose kind is fixed to `floor-plan`. */
export type FloorPlan = MediaImage & { readonly kind: 'floor-plan' };
