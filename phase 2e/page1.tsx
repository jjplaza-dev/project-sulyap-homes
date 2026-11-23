import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, MapPin } from 'lucide-react';
import {
  getAgentById,
  getAllProperties,
  getBookableProperty,
  getBookingPreview,
  getNeighborhoodById,
  getPropertyBySlug,
  getSimilarProperties,
} from '@/data/selectors';
import { categoryLabels, establishmentTypeLabels, furnishingLabels, purposeLabels } from '@/data/fixtures/labels';
import { MediaView } from '@/components/brand/MediaView';
import { TourBookingPanel } from '@/components/booking/TourBookingPanel';
import { PropertyInquiryForm } from '@/components/forms/PropertyInquiryForm';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { buttonClasses } from '@/components/layout/button-styles';
import { Section } from '@/components/layout/Container';
import { ApproxMap } from '@/components/map/ApproxMap';
import { Reveal } from '@/components/motion/Reveal';
import { SampleTag, StatusBadge } from '@/components/property/Badges';
import { FavoriteButton } from '@/components/property/FavoriteButton';
import { Gallery } from '@/components/property/Gallery';
import { PropertyCard } from '@/components/property/PropertyCard';
import { KeyFacts, SpecList } from '@/components/property/SpecList';
import { formatDate, formatPrice } from '@/lib/format';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  return property
    ? { title: property.title, description: property.overview }
    : { title: 'Property not found' };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const neighborhood = getNeighborhoodById(property.neighborhoodId);
  const similar = getSimilarProperties(property);
  const bookable = getBookableProperty(property);
  const preview = getBookingPreview(property.id);
  const closed = property.status === 'sold' || property.status === 'rented';
  const listPath = property.purpose === 'sale' ? '/buy' : '/rent';
  const lease = property.purpose === 'rent' ? property.leaseTerms : undefined;
  const nearby = neighborhood?.establishments.slice(0, 5) ?? [];

  return (
    <>
      {/* Header and gallery */}
      <Section labelledBy="property-title">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: purposeLabels[property.purpose], href: listPath },
            { label: property.title },
          ]}
        />

        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-sm bg-moss-tint px-2 py-1 text-xs font-semibold text-pine-evergreen">
                {purposeLabels[property.purpose]}
              </span>
              <span className="inline-flex items-center rounded-sm bg-moss-tint px-2 py-1 text-xs font-semibold text-pine-evergreen">
                {categoryLabels[property.category]}
              </span>
              <StatusBadge status={property.status} />
            </div>
            <h1 id="property-title" className="text-display-lg mt-4 max-w-3xl">
              {property.title}
            </h1>
            <p className="mt-4 flex items-start gap-2 text-lg">
              <MapPin className="mt-1 size-5 shrink-0 text-berry-deep" aria-hidden="true" />
              <span>
                <span className="sr-only">Address: </span>
                {property.location.exactAddress}
              </span>
            </p>
            <SampleTag className="mt-4" />
          </div>
          <div className="sm:text-right">
            <p className="numeric-tabular font-display text-4xl text-pine-evergreen">{formatPrice(property.price)}</p>
            {property.pricingNotes ? <p className="mt-1 max-w-xs text-sm text-pine-soft">{property.pricingNotes}</p> : null}
          </div>
        </div>

        <div className="mt-10">
          <Gallery images={property.images} title={property.title} />
        </div>
      </Section>

      {/* Details and action rail */}
      <Section tone="tint">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="grid gap-14 lg:col-span-8">
            <Reveal>
              <h2 className="text-display-md">Overview</h2>
              <p className="reading-width mt-4 text-lg">{property.overview}</p>
              <div className="mt-6">
                <KeyFacts property={property} />
              </div>
              {property.description.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="reading-width mt-5">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {property.amenities.length > 0 ? (
              <Reveal>
                <h2 className="text-display-md">Amenities</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-3">
                      <Check className="mt-1 size-5 shrink-0 text-success" aria-hidden="true" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal>
              <h2 className="text-display-md">Specifications</h2>
              <div className="mt-5">
                <SpecList property={property} />
              </div>
            </Reveal>

            {lease ? (
              <Reveal>
                <h2 className="text-display-md">Lease terms</h2>
                <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-pine-evergreen/12 bg-pine-evergreen/12 sm:grid-cols-2">
                  {[
                    lease.minimumLeaseMonths ? ['Minimum lease', `${lease.minimumLeaseMonths} months`] : null,
                    lease.securityDepositMonths ? ['Security deposit', `${lease.securityDepositMonths} months`] : null,
                    lease.advanceRentMonths ? ['Advance rent', `${lease.advanceRentMonths} month${lease.advanceRentMonths > 1 ? 's' : ''}`] : null,
                    lease.furnishing ? ['Furnishing', furnishingLabels[lease.furnishing]] : null,
                    lease.petsAllowed !== undefined ? ['Pets', lease.petsAllowed ? 'Allowed' : 'Not allowed'] : null,
                    lease.availableFrom ? ['Available from', formatDate(lease.availableFrom)] : null,
                  ]
                    .filter((row): row is string[] => row !== null)
                    .map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 bg-surface px-4 py-3">
                        <dt className="text-pine-soft">{label}</dt>
                        <dd className="font-medium text-pine-evergreen">{value}</dd>
                      </div>
                    ))}
                </dl>
                {lease.utilitiesNote ? <p className="mt-3 text-sm text-pine-soft">{lease.utilitiesNote}</p> : null}
              </Reveal>
            ) : null}

            {property.documents && property.documents.length > 0 ? (
              <Reveal>
                <h2 className="text-display-md">Documents</h2>
                <ul className="mt-5 grid gap-3">
                  {property.documents.map((doc) => (
                    <li key={doc.id} className="rounded-lg border border-pine-evergreen/12 bg-surface p-4">
                      <p className="font-semibold text-pine-evergreen">{doc.title}</p>
                      {doc.description ? <p className="text-sm text-pine-soft">{doc.description}</p> : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {property.floorPlans.length > 0 ? (
              <Reveal>
                <h2 className="text-display-md">Floor plan{property.floorPlans.length > 1 ? 's' : ''}</h2>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {property.floorPlans.map((plan) => (
                    <li key={plan.id} className="rounded-lg border border-pine-evergreen/12 bg-surface p-3">
                      <div className="aspect-[7/5] overflow-hidden rounded-md">
                        <MediaView image={plan} />
                      </div>
                      {plan.caption ? <p className="mt-2 text-center text-sm text-pine-soft">{plan.caption}</p> : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal>
              <h2 className="text-display-md">Location</h2>
              <p className="reading-width mt-4">
                {property.location.exactAddress}. The map below shows an approximate area only, so it is not the
                exact address.
              </p>
              <div className="mt-5">
                <ApproxMap
                  markers={[
                    {
                      id: property.id,
                      label: property.title,
                      lat: property.location.publicMap.lat,
                      lng: property.location.publicMap.lng,
                    },
                  ]}
                  areas={
                    neighborhood
                      ? [{ id: neighborhood.id, name: neighborhood.name, lat: neighborhood.publicMap.lat, lng: neighborhood.publicMap.lng }]
                      : []
                  }
                  selectedId={property.id}
                  ariaLabel={`Approximate map preview near ${property.location.neighborhoodName ?? property.location.city}`}
                />
              </div>
            </Reveal>

            {neighborhood ? (
              <Reveal>
                <h2 className="text-display-md">About {neighborhood.name}</h2>
                <p className="reading-width mt-4">{neighborhood.summary}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {nearby.map((place) => (
                    <li key={place.id} className="rounded-lg border border-pine-evergreen/12 bg-surface p-4">
                      <p className="text-sm text-pine-soft">{establishmentTypeLabels[place.type]}</p>
                      <p className="font-medium text-pine-evergreen">{place.name}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/areas/${neighborhood.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center font-semibold text-pine-evergreen underline underline-offset-4"
                >
                  Read the {neighborhood.name} area guide
                </Link>
              </Reveal>
            ) : null}
          </div>

          {/* Sticky action rail */}
          <aside aria-label="Tour and contact options" className="lg:col-span-4">
            <div className="grid gap-5 rounded-lg border border-pine-evergreen/12 bg-surface p-6 shadow-md lg:sticky lg:top-28">
              <p className="numeric-tabular font-display text-3xl text-pine-evergreen">{formatPrice(property.price)}</p>

              {agent ? (
                <div className="flex items-center gap-4">
                  <div className="aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-md">
                    <MediaView image={agent.photo} alt="" />
                  </div>
                  <div>
                    <p className="text-sm text-pine-soft">Your agent</p>
                    <Link
                      href={`/agents/${agent.slug}`}
                      className="font-display text-xl text-pine-evergreen underline-offset-4 hover:underline"
                    >
                      {agent.name}
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-pine-ink">Contact our team to arrange a viewing.</p>
              )}

              {closed ? (
                <p className="rounded-md bg-moss-tint p-4 text-pine-evergreen">
                  This property is no longer available. You can still message {agent?.name ?? 'us'}, or browse the
                  similar properties below.
                </p>
              ) : agent && preview ? (
                <TourBookingPanel preview={preview} agentName={agent.name} properties={[bookable]} triggerClassName="w-full" />
              ) : null}

              <a href="#contact-agent" className={buttonClasses({ variant: 'outline', size: 'lg', className: 'w-full' })}>
                Contact Agent
              </a>

              <div className="flex items-center gap-3">
                <FavoriteButton title={property.title} className="border border-moss-deep" />
                <span className="text-sm text-pine-ink">Save to favorites</span>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Inquiry */}
      <Section id="contact-agent" labelledBy="inquiry-title" className="scroll-mt-[72px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="inquiry-title" className="text-display-md">
              Ask {agent?.name ?? 'us'} a question
            </h2>
            <p className="mt-4">
              Prefer to write first? Send a message about this property. {agent ? `${agent.name} will reply.` : ''}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-lg border border-pine-evergreen/12 bg-surface p-6 shadow-sm sm:p-8">
              <PropertyInquiryForm propertyId={property.id} propertyTitle={property.title} agentName={agent?.name} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Similar properties */}
      {similar.length > 0 ? (
        <Section tone="tint" labelledBy="similar-title">
          <h2 id="similar-title" className="text-display-md">
            Similar properties
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((item) => (
              <li key={item.id}>
                <PropertyCard property={item} className="h-full" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
