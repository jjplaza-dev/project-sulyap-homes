import type { ListingStatus } from '@/domain';
import { statusLabels } from '@/data/fixtures/labels';
import { cx } from '@/lib/cx';

const statusStyles: Record<ListingStatus, string> = {
  available: 'bg-moss-tint text-pine-evergreen',
  reserved: 'bg-panagbenga-sunflower text-pine-evergreen',
  sold: 'bg-pine-evergreen text-cloud-mist',
  rented: 'bg-pine-evergreen text-cloud-mist',
};

/** Availability label for a listing. */
export function StatusBadge({ status, className }: { status: ListingStatus; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-sm px-2 py-1 text-xs font-semibold',
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

/** Marks a listing as fictional design-preview content. */
export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex w-fit items-center rounded-sm border border-dashed border-petal-berry/60 bg-surface px-2 py-1 text-xs font-medium text-berry-deep',
        className,
      )}
    >
      Sample listing — design preview
    </span>
  );
}
