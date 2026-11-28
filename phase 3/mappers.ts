/**
 * Sanity documents → the canonical types in `@/domain`.
 *
 * Mappers are defensive: Studio validation should prevent bad data, but the
 * website must never crash on a half-finished document. A property that lacks
 * a neighborhood or an agent is skipped (and reported by the caller).
 */
import type {
  Agent,
  BackupContact,
  EstablishmentType,
  FloorPlan,
  FurnishingLevel,
  LeaseTerms,
  MediaImage,
  Neighborhood,
  NearbyEstablishment,
  Property,
  PropertyCategory,
  PropertyCondition,
  SiteSettings,
  TransportInfo,
  TransportMode,
} from '@/domain';
import { placeholderImage, propertyGallery } from '@/data/fixtures/media';
import { siteSettings as fallbackSettings } from '@/data/fixtures/site-settings';
import { sanityImageUrl, type RawSanityImage } from './image';

// ------------------------------------------------------------------ raw shapes

interface RawImage extends RawSanityImage {
  _key?: string;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface RawProperty {
  _id: string;
  slug: string;
  title?: string | null;
  purpose?: 'sale' | 'rent' | null;
  category?: PropertyCategory | null;
  status?: string | null;
  featured?: boolean | null;
  isSample?: boolean | null;
  publishedAt?: string | null;
  overview?: string | null;
  description?: string | null;
  amenities?: string[] | null;
  priceAmount?: number | null;
  pricingNotes?: string | null;
  leaseTerms?: {
    minimumLeaseMonths?: number | null;
    securityDepositMonths?: number | null;
    advanceRentMonths?: number | null;
    furnishing?: FurnishingLevel | null;
    petsAllowed?: boolean | null;
    utilitiesNote?: string | null;
    availableFrom?: string | null;
  } | null;
  documents?: Array<{ _key: string; title?: string | null; description?: string | null; href?: string | null }> | null;
  specs?: {
    bedrooms?: number | null;
    bathrooms?: number | null;
    floorAreaSqm?: number | null;
    lotAreaSqm?: number | null;
    floors?: number | null;
    parkingSpaces?: number | null;
    condition?: PropertyCondition | null;
  } | null;
  location?: {
    exactAddress?: string | null;
    barangay?: string | null;
    city?: string | null;
    province?: string | null;
    publicMapLat?: number | null;
    publicMapLng?: number | null;
  } | null;
  images?: RawImage[] | null;
  floorPlans?: RawImage[] | null;
  neighborhoodId?: string | null;
  agentId?: string | null;
  backupKind?: 'none' | 'agent' | 'central' | null;
  backupAgentId?: string | null;
}

export interface RawAgent {
  _id: string;
  slug: string;
  name?: string | null;
  isActive?: boolean | null;
  bio?: string | null;
  email?: string | null;
  phone?: string | null;
  calBookingLink?: string | null;
  calEventType?: string | null;
  backupBookingLink?: string | null;
  photo?: RawImage | null;
  serviceAreaIds?: string[] | null;
}

export interface RawNeighborhood {
  _id: string;
  slug: string;
  name?: string | null;
  summary?: string | null;
  lifestyle?: string | null;
  generalLocation?: string | null;
  publicMapLat?: number | null;
  publicMapLng?: number | null;
  photos?: RawImage[] | null;
  landmarks?: Array<{ _key: string; name?: string | null; note?: string | null }> | null;
  establishments?: Array<{ _key: string; name?: string | null; type?: EstablishmentType | null; note?: string | null }> | null;
  transport?: Array<{ _key: string; mode?: TransportMode | null; description?: string | null }> | null;
}

export interface RawSettings {
  businessName?: string | null;
  tagline?: string | null;
  serviceArea?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactAddress?: string | null;
  contactHours?: string | null;
  social?: Array<{ _key: string; label?: string | null; url?: string | null }> | null;
  homepageFeaturedIds?: string[] | null;
  footerAbout?: string | null;
  footerCopyright?: string | null;
  sampleDataNotice?: string | null;
}

// -------------------------------------------------------------------- helpers

/** A real photo when uploaded, otherwise an honestly labelled placeholder. */
function mapImage(raw: RawImage, id: string, fallbackAlt: string): MediaImage | null {
  const src = sanityImageUrl(raw);
  if (!src) return null;
  return {
    id,
    kind: 'photo',
    src,
    alt: raw.alt || fallbackAlt,
    width: raw.width ?? 1600,
    height: raw.height ?? 1067,
    ...(raw.caption ? { caption: raw.caption } : {}),
  };
}

function mapImages(raw: RawImage[] | null | undefined, idPrefix: string, fallbackAlt: string): MediaImage[] {
  return (raw ?? []).flatMap((item, index) => {
    const image = mapImage(item, `${idPrefix}-${item._key ?? index}`, fallbackAlt);
    return image ? [image] : [];
  });
}

// ------------------------------------------------------------------- mappers

export function mapNeighborhood(raw: RawNeighborhood): Neighborhood {
  const name = raw.name ?? 'Neighborhood';
  const photos = mapImages(raw.photos, raw._id, `${name} neighborhood`);

  const establishments: NearbyEstablishment[] = (raw.establishments ?? []).flatMap((item) =>
    item.name && item.type
      ? [{ id: item._key, name: item.name, type: item.type, ...(item.note ? { note: item.note } : {}) }]
      : [],
  );
  const transport: TransportInfo[] = (raw.transport ?? []).flatMap((item) =>
    item.mode && item.description ? [{ id: item._key, mode: item.mode, description: item.description }] : [],
  );

  return {
    id: raw._id,
    slug: raw.slug,
    name,
    summary: raw.summary ?? '',
    lifestyle: raw.lifestyle ?? '',
    generalLocation: raw.generalLocation ?? '',
    photos:
      photos.length > 0
        ? photos
        : [placeholderImage(`${raw._id}-placeholder`, 'neighborhood-streetscape', `${name} neighborhood`)],
    publicMap: { lat: raw.publicMapLat ?? 16.4023, lng: raw.publicMapLng ?? 120.596 },
    landmarks: (raw.landmarks ?? []).flatMap((item) =>
      item.name
        ? [{ id: item._key, name: item.name, type: 'landmark' as const, ...(item.note ? { note: item.note } : {}) }]
        : [],
    ),
    establishments,
    transport,
  };
}

export function mapAgent(raw: RawAgent): Agent {
  const name = raw.name ?? 'Agent';
  return {
    id: raw._id,
    slug: raw.slug,
    name,
    photo:
      (raw.photo ? mapImage(raw.photo, `${raw._id}-photo`, `Portrait of ${name}`) : null) ??
      placeholderImage(`${raw._id}-photo`, 'agent-portrait', name),
    bio: raw.bio ?? '',
    email: raw.email ?? '',
    ...(raw.phone ? { phone: raw.phone } : {}),
    serviceAreaIds: raw.serviceAreaIds ?? [],
    calBookingLink: raw.calBookingLink ?? '',
    calEventType: raw.calEventType ?? 'in-person-viewing',
    ...(raw.backupBookingLink ? { backupBookingLink: raw.backupBookingLink } : {}),
    isActive: raw.isActive !== false,
  };
}

interface PropertyContext {
  neighborhoods: ReadonlyMap<string, Neighborhood>;
  agents: ReadonlyMap<string, Agent>;
}

/** Returns `null` when a required relationship is missing. */
export function mapProperty(raw: RawProperty, context: PropertyContext): Property | null {
  const neighborhood = raw.neighborhoodId ? context.neighborhoods.get(raw.neighborhoodId) : undefined;
  if (!neighborhood || !raw.agentId || !raw.purpose || !raw.category) return null;

  const title = raw.title ?? 'Property';
  const location = raw.location ?? {};

  const images = mapImages(raw.images, raw._id, title);
  const floorPlans: FloorPlan[] = (raw.floorPlans ?? []).flatMap((item, index) => {
    const image = mapImage(item, `${raw._id}-plan-${item._key ?? index}`, `Floor plan, ${title}`);
    return image ? [{ ...image, kind: 'floor-plan' as const } as FloorPlan] : [];
  });

  let backup: BackupContact | undefined;
  if (raw.backupKind === 'central') {
    backup = { kind: 'central', contactHref: '/contact' };
  } else if (raw.backupKind === 'agent' && raw.backupAgentId) {
    const backupAgent = context.agents.get(raw.backupAgentId);
    if (backupAgent?.isActive) {
      backup = {
        kind: 'agent',
        agentId: backupAgent.id,
        bookingLink: backupAgent.calBookingLink,
        contactHref: `mailto:${backupAgent.email}`,
      };
    }
  }

  const documents = (raw.documents ?? []).flatMap((doc) =>
    doc.title
      ? [{ id: doc._key, title: doc.title, ...(doc.description ? { description: doc.description } : {}), ...(doc.href ? { href: doc.href } : {}) }]
      : [],
  );

  const specs = raw.specs ?? {};
  const base = {
    id: raw._id,
    slug: raw.slug,
    title,
    category: raw.category,
    featured: raw.featured === true,
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    overview: raw.overview ?? '',
    description: raw.description ?? '',
    amenities: raw.amenities ?? [],
    ...(raw.pricingNotes ? { pricingNotes: raw.pricingNotes } : {}),
    ...(documents.length > 0 ? { documents } : {}),
    ...(raw.isSample ? { isSample: true } : {}),
    specs: {
      ...(specs.bedrooms != null ? { bedrooms: specs.bedrooms } : {}),
      ...(specs.bathrooms != null ? { bathrooms: specs.bathrooms } : {}),
      ...(specs.floorAreaSqm != null ? { floorAreaSqm: specs.floorAreaSqm } : {}),
      ...(specs.lotAreaSqm != null ? { lotAreaSqm: specs.lotAreaSqm } : {}),
      ...(specs.floors != null ? { floors: specs.floors } : {}),
      ...(specs.parkingSpaces != null ? { parkingSpaces: specs.parkingSpaces } : {}),
      ...(specs.condition ? { condition: specs.condition } : {}),
    },
    location: {
      exactAddress: location.exactAddress ?? '',
      barangay: location.barangay ?? '',
      neighborhoodName: neighborhood.name,
      city: location.city ?? 'Baguio City',
      province: location.province ?? 'Benguet',
      publicMap: { lat: location.publicMapLat ?? neighborhood.publicMap.lat, lng: location.publicMapLng ?? neighborhood.publicMap.lng },
    },
    // No uploaded photos yet: labelled placeholder art keeps the page whole.
    images: images.length > 0 ? images : propertyGallery(raw._id, raw.category, title, 4),
    floorPlans,
    neighborhoodId: neighborhood.id,
    agentId: raw.agentId,
    ...(backup ? { backup } : {}),
  };

  const amount = raw.priceAmount ?? 0;

  if (raw.purpose === 'sale') {
    return {
      ...base,
      purpose: 'sale',
      status: raw.status === 'reserved' || raw.status === 'sold' ? raw.status : 'available',
      price: { amount, currency: 'PHP', period: 'total' },
    };
  }

  const lease = raw.leaseTerms;
  const leaseTerms: LeaseTerms | undefined = lease
    ? {
        ...(lease.minimumLeaseMonths != null ? { minimumLeaseMonths: lease.minimumLeaseMonths } : {}),
        ...(lease.securityDepositMonths != null ? { securityDepositMonths: lease.securityDepositMonths } : {}),
        ...(lease.advanceRentMonths != null ? { advanceRentMonths: lease.advanceRentMonths } : {}),
        ...(lease.furnishing ? { furnishing: lease.furnishing } : {}),
        ...(lease.petsAllowed != null ? { petsAllowed: lease.petsAllowed } : {}),
        ...(lease.utilitiesNote ? { utilitiesNote: lease.utilitiesNote } : {}),
        ...(lease.availableFrom ? { availableFrom: lease.availableFrom } : {}),
      }
    : undefined;

  return {
    ...base,
    purpose: 'rent',
    status: raw.status === 'reserved' || raw.status === 'rented' ? raw.status : 'available',
    price: { amount, currency: 'PHP', period: 'month' },
    ...(leaseTerms ? { leaseTerms } : {}),
  };
}

/**
 * Site settings. Navigation and footer link groups are structural, so they stay
 * in code; text and contact details come from Sanity. The administrator email
 * is read from a server-only environment variable, never from the dataset.
 */
export function mapSettings(raw: RawSettings | null): SiteSettings {
  const base = fallbackSettings;
  const adminEmail = process.env.CENTRAL_ADMIN_EMAIL || base.centralAdminEmail;

  if (!raw) return { ...base, centralAdminEmail: adminEmail };

  return {
    ...base,
    businessName: raw.businessName || base.businessName,
    tagline: raw.tagline || base.tagline,
    serviceArea: raw.serviceArea || base.serviceArea,
    contact: {
      email: raw.contactEmail || base.contact.email,
      ...(raw.contactPhone ? { phone: raw.contactPhone } : {}),
      ...(raw.contactAddress ? { address: raw.contactAddress } : {}),
      ...(raw.contactHours ? { hours: raw.contactHours } : {}),
    },
    social: (raw.social ?? []).flatMap((link) =>
      link.label && link.url ? [{ label: link.label, href: link.url, external: true }] : [],
    ),
    homepageFeaturedIds: raw.homepageFeaturedIds ?? [],
    footer: {
      ...base.footer,
      about: raw.footerAbout || base.footer.about,
      copyright: raw.footerCopyright || base.footer.copyright,
      sampleDataNotice: raw.sampleDataNotice || undefined,
    },
    centralAdminEmail: adminEmail,
  };
}
