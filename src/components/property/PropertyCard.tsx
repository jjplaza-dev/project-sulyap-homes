import Link from 'next/link';
import type { Property } from '@/domain';
import { categoryLabels, furnishingLabels, purposeLabels } from '@/data/fixtures/labels';
import { MediaView } from '@/components/brand/MediaView';
import { cx } from '@/lib/cx';
import { formatPrice, formatSpecsSummary } from '@/lib/format';
import { FavoriteButton } from './FavoriteButton';
import { SampleTag, StatusBadge } from './Badges';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

/**
 * Listing card: cover image, purpose and availability labels, heart, title,
 * price and key specifications. The whole card is one link (via the title);
 * the heart sits above it.
 */
export function PropertyCard({ property, className }: PropertyCardProps) {
  const cover = property.images[0];
  const place = property.location.neighborhoodName ?? property.location.city;
  const closed = property.status === 'sold' || property.status === 'rented';

  return (
    <article
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-lg border border-pine-evergreen/12 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md',
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-moss-tint">
        {cover ? (
          <MediaView
            image={cover}
            alt=""
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : null}
        {closed ? <div aria-hidden="true" className="absolute inset-0 bg-pine-evergreen/25" /> : null}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-sm bg-surface/95 px-2 py-1 text-xs font-semibold text-pine-evergreen">
            {purposeLabels[property.purpose]}
          </span>
          {property.status !== 'available' ? <StatusBadge status={property.status} /> : null}
        </div>

        <FavoriteButton title={property.title} className="absolute right-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-pine-soft">
          {categoryLabels[property.category]} · {place}
        </p>
        <h3 className="text-xl leading-snug">
          <Link
            href={`/properties/${property.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {property.title}
          </Link>
        </h3>
        <p className="numeric-tabular text-lg font-semibold text-pine-evergreen">{formatPrice(property.price)}</p>
        <p className="numeric-tabular text-sm text-pine-ink">{formatSpecsSummary(property)}</p>
        {property.purpose === 'rent' && property.leaseTerms ? (
          <p className="text-sm text-pine-soft">
            {[
              property.leaseTerms.minimumLeaseMonths
                ? `Min. lease ${property.leaseTerms.minimumLeaseMonths} months`
                : null,
              property.leaseTerms.furnishing ? furnishingLabels[property.leaseTerms.furnishing] : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        ) : null}
        <SampleTag className="mt-auto" />
      </div>
    </article>
  );
}
