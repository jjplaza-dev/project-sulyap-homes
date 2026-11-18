/**
 * Sample media for the Phase 2 design preview.
 *
 * Every image here is an ORIGINAL SVG/CSS placeholder referenced by an art key
 * (see `PlaceholderArtKey`). Nothing is photography; nothing is downloaded.
 * Alt text always begins "Illustrative placeholder".
 */
import type {
  EntityId,
  FloorPlan,
  MediaImage,
  MediaKind,
  PlaceholderArtKey,
  PropertyCategory,
} from '@/domain';

interface ArtSpec {
  /** What the artwork depicts, used to build alt text. */
  readonly view: string;
  readonly kind: MediaKind;
  /** Aspect ratio real photos in this slot will use. */
  readonly width: number;
  readonly height: number;
}

const ART: Record<PlaceholderArtKey, ArtSpec> = {
  'ridge-dawn': { view: 'highland ridge at dawn', kind: 'photo', width: 1600, height: 1067 },
  'ridge-mist': { view: 'misty pine ridge', kind: 'photo', width: 1600, height: 1067 },
  'window-arch': { view: 'arched window view', kind: 'photo', width: 1200, height: 1500 },
  'category-house': { view: 'front of the house', kind: 'photo', width: 1600, height: 1067 },
  'category-condominium': { view: 'condominium building exterior', kind: 'photo', width: 1600, height: 1067 },
  'category-apartment': { view: 'apartment building exterior', kind: 'photo', width: 1600, height: 1067 },
  'category-townhouse': { view: 'townhouse row exterior', kind: 'photo', width: 1600, height: 1067 },
  'category-lot': { view: 'lot with boundary markers', kind: 'photo', width: 1600, height: 1067 },
  'interior-living': { view: 'living area', kind: 'photo', width: 1200, height: 800 },
  'interior-kitchen': { view: 'kitchen and dining area', kind: 'photo', width: 1200, height: 800 },
  'interior-bedroom': { view: 'bedroom', kind: 'photo', width: 1000, height: 1250 },
  'interior-bath': { view: 'bathroom', kind: 'photo', width: 1000, height: 1250 },
  'garden-terrace': { view: 'garden terrace', kind: 'photo', width: 1200, height: 800 },
  'street-frontage': { view: 'street frontage', kind: 'photo', width: 1200, height: 800 },
  'floor-plan-compact': { view: 'floor plan', kind: 'floor-plan', width: 1400, height: 1000 },
  'floor-plan-multilevel': { view: 'floor plan', kind: 'floor-plan', width: 1400, height: 1000 },
  'agent-portrait': { view: 'portrait', kind: 'portrait', width: 800, height: 1000 },
  'neighborhood-streetscape': { view: 'neighborhood streetscape', kind: 'photo', width: 1600, height: 1067 },
  'brand-logo': { view: 'logo mark', kind: 'logo', width: 640, height: 192 },
};

/** Gallery order per category. Longest sequence = the most images a listing can show. */
const GALLERY_SEQUENCES: Record<PropertyCategory, ReadonlyArray<PlaceholderArtKey>> = {
  house: [
    'category-house',
    'street-frontage',
    'interior-living',
    'interior-kitchen',
    'interior-bedroom',
    'interior-bath',
    'garden-terrace',
    'ridge-mist',
  ],
  condominium: [
    'category-condominium',
    'interior-living',
    'interior-kitchen',
    'interior-bedroom',
    'interior-bath',
    'ridge-dawn',
    'window-arch',
  ],
  apartment: [
    'category-apartment',
    'interior-living',
    'interior-kitchen',
    'interior-bedroom',
    'interior-bath',
    'street-frontage',
  ],
  townhouse: [
    'category-townhouse',
    'street-frontage',
    'interior-living',
    'interior-kitchen',
    'interior-bedroom',
    'interior-bath',
    'garden-terrace',
  ],
  lot: [
    'category-lot',
    'ridge-dawn',
    'street-frontage',
    'ridge-mist',
    'garden-terrace',
  ],
};

/** One placeholder image. `subject` completes the alt text. */
export function placeholderImage(
  id: EntityId,
  art: PlaceholderArtKey,
  subject: string,
  caption?: string,
): MediaImage {
  const spec = ART[art];
  return {
    id,
    kind: spec.kind,
    placeholder: art,
    alt: `Illustrative placeholder: ${spec.view}, ${subject}`,
    width: spec.width,
    height: spec.height,
    ...(caption ? { caption } : {}),
  };
}

/** 4–8 gallery images for a listing, in a sensible viewing order. */
export function propertyGallery(
  propertyId: EntityId,
  category: PropertyCategory,
  subject: string,
  count: number,
): MediaImage[] {
  return GALLERY_SEQUENCES[category].slice(0, count).map((art, index) =>
    placeholderImage(`${propertyId}-img-${String(index + 1).padStart(2, '0')}`, art, subject),
  );
}

const LEVEL_CAPTIONS = ['Ground floor', 'Upper floor', 'Top floor'] as const;

/** One floor plan for a single level, or one per level (max 3) for multi-storey listings. */
export function propertyFloorPlans(
  propertyId: EntityId,
  subject: string,
  levels: 1 | 2 | 3,
): FloorPlan[] {
  const plans: FloorPlan[] = [];
  for (let level = 0; level < levels; level += 1) {
    const art: PlaceholderArtKey = levels === 1 ? 'floor-plan-compact' : 'floor-plan-multilevel';
    const spec = ART[art];
    plans.push({
      id: `${propertyId}-plan-${level + 1}`,
      kind: 'floor-plan',
      placeholder: art,
      alt: `Illustrative placeholder: ${spec.view}, ${subject}`,
      width: spec.width,
      height: spec.height,
      caption: levels === 1 ? 'Floor plan' : LEVEL_CAPTIONS[level],
    });
  }
  return plans;
}
