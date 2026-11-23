import Link from 'next/link';
import type { Neighborhood } from '@/domain';
import { MediaView } from '@/components/brand/MediaView';
import { cx } from '@/lib/cx';
import { pluralize } from '@/lib/format';

const shapes = {
  default: 'aspect-[4/3]',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/9]',
} as const;

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
  listingCount: number;
  /** Lets an asymmetric grid mix proportions. */
  shape?: keyof typeof shapes;
  className?: string;
}

/** Image-led card; the text sits on a solid Pine base so it always reads. */
export function NeighborhoodCard({
  neighborhood,
  listingCount,
  shape = 'default',
  className,
}: NeighborhoodCardProps) {
  const cover = neighborhood.photos[0];

  return (
    <article
      className={cx(
        'group relative isolate overflow-hidden rounded-lg bg-pine-evergreen shadow-sm',
        shapes[shape],
        className,
      )}
    >
      {cover ? (
        <MediaView
          image={cover}
          alt=""
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-pine-evergreen via-pine-evergreen/70 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 grid gap-1 p-5 text-cloud-mist">
        <h3 className="text-2xl !text-cloud-mist">
          <Link
            href={`/areas/${neighborhood.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {neighborhood.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-cloud-mist/85">{neighborhood.lifestyle}</p>
        <p className="numeric-tabular text-sm font-medium text-panagbenga-sunflower">
          {pluralize(listingCount, 'listing')}
        </p>
      </div>
    </article>
  );
}
