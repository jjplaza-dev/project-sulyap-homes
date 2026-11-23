import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder with the same proportions as `PropertyCard`. */
export function PropertyCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-lg border border-pine-evergreen/10 bg-surface"
      role="status"
      aria-label="Loading property"
    >
      <Skeleton className="aspect-[3/2] w-full rounded-none" />
      <div className="grid gap-3 p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}

/** Loading placeholder for the property gallery mosaic. */
export function GallerySkeleton() {
  return (
    <div
      className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2"
      role="status"
      aria-label="Loading photographs"
    >
      <Skeleton className="aspect-[3/2] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-80" />
      <Skeleton className="aspect-[3/2]" />
      <Skeleton className="aspect-[3/2]" />
      <Skeleton className="aspect-[3/2]" />
      <Skeleton className="aspect-[3/2]" />
    </div>
  );
}
