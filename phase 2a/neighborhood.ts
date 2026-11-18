import type { EntityId, GeoPoint, Slug } from './common';
import type { EstablishmentType, TransportMode } from './enums';
import type { MediaImage } from './media';

/** A nearby school, hospital, shop, restaurant, café, or landmark. */
export interface NearbyEstablishment {
  readonly id: EntityId;
  readonly name: string;
  readonly type: EstablishmentType;
  readonly note?: string;
}

/** A `NearbyEstablishment` that is specifically a landmark. */
export type Landmark = NearbyEstablishment & { readonly type: 'landmark' };

/** How people get around this neighborhood. */
export interface TransportInfo {
  /** Stable key for lists (a neighborhood may describe one mode more than once). */
  readonly id: EntityId;
  readonly mode: TransportMode;
  readonly description: string;
}

export interface Neighborhood {
  readonly id: EntityId;
  readonly slug: Slug;
  readonly name: string;
  readonly summary: string;
  readonly lifestyle: string;
  /** Where it sits in or around Baguio City, in plain words. */
  readonly generalLocation: string;
  readonly photos: ReadonlyArray<MediaImage>;
  /** Approximate area-level map point (manual; not a property location). */
  readonly publicMap: GeoPoint;
  /** Editorial landmark list shown on `/areas/[slug]`. */
  readonly landmarks: ReadonlyArray<Landmark>;
  /** Schools, hospitals, shopping, restaurants and cafés (non-landmark types by convention). */
  readonly establishments: ReadonlyArray<NearbyEstablishment>;
  readonly transport: ReadonlyArray<TransportInfo>;
}
