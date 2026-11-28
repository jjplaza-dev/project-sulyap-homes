import { defineQuery } from 'next-sanity';

/**
 * Every query reads PUBLISHED documents only (drafts have ids under `drafts.`).
 * The projections return exactly the fields the mappers need; nothing is
 * interpolated into a query string.
 */

const IMAGE = `{
  _key, alt, caption, asset, crop, hotspot,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

export const PROPERTIES_QUERY = defineQuery(`
*[_type == "property" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  title, purpose, category, status, featured, isSample, publishedAt,
  overview, description, amenities, priceAmount, pricingNotes,
  leaseTerms,
  documents[]{ _key, title, description, "href": file.asset->url },
  specs,
  location,
  images[]${IMAGE},
  floorPlans[]${IMAGE},
  "neighborhoodId": neighborhood._ref,
  "agentId": agent._ref,
  backupKind,
  "backupAgentId": backupAgent._ref
}`);

export const AGENTS_QUERY = defineQuery(`
*[_type == "agent" && defined(slug.current) && !(_id in path("drafts.**"))] | order(name asc) {
  _id,
  "slug": slug.current,
  name, isActive, bio, email, phone, calBookingLink, calEventType, backupBookingLink,
  "photo": photo{ alt, asset, crop, hotspot,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height },
  "serviceAreaIds": serviceAreas[]._ref
}`);

export const NEIGHBORHOODS_QUERY = defineQuery(`
*[_type == "neighborhood" && defined(slug.current) && !(_id in path("drafts.**"))] | order(name asc) {
  _id,
  "slug": slug.current,
  name, summary, lifestyle, generalLocation, publicMapLat, publicMapLng,
  photos[]${IMAGE},
  landmarks[]{ _key, name, note },
  establishments[]{ _key, name, type, note },
  transport[]{ _key, mode, description }
}`);

export const SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings" && _id == "siteSettings"][0]{
  businessName, tagline, serviceArea,
  contactEmail, contactPhone, contactAddress, contactHours,
  social[]{ _key, label, url },
  "homepageFeaturedIds": homepageFeatured[]._ref,
  footerAbout, footerCopyright, sampleDataNotice
}`);
