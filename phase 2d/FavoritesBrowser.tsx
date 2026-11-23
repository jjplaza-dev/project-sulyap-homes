'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { EditorialBlock, FavoritesPreviewVariant, Property } from '@/domain';
import { ButtonLink } from '@/components/layout/ButtonLink';
import { EmptyState, PreviewNote } from '@/components/states/StatusMessages';
import { cx } from '@/lib/cx';
import { PropertyCard } from './PropertyCard';

const variants: ReadonlyArray<{ value: FavoritesPreviewVariant; label: string }> = [
  { value: 'saved', label: 'Sample saved homes' },
  { value: 'empty', label: 'Empty state' },
];

/**
 * PHASE 2 PREVIEW of `/favorites`. The "saved" set is fixed sample data and the
 * switch is a design-review aid. Nothing is stored; real, browser-only
 * favorites arrive in Phase 4.
 */
export function FavoritesBrowser({
  saved,
  emptyBlock,
}: {
  saved: ReadonlyArray<Property>;
  emptyBlock: EditorialBlock;
}) {
  const [variant, setVariant] = useState<FavoritesPreviewVariant>('saved');

  return (
    <div className="grid gap-6">
      <div
        role="group"
        aria-label="Design review only: choose the favorites state to preview"
        className="flex flex-wrap items-center gap-3 rounded-md border border-dashed border-petal-berry/60 bg-surface p-3"
      >
        <p className="text-sm font-medium text-berry-deep">Design review only:</p>
        {variants.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={variant === option.value}
            onClick={() => setVariant(option.value)}
            className={cx(
              'min-h-11 rounded-sm border px-4 text-sm font-medium transition-colors',
              variant === option.value
                ? 'border-pine-evergreen bg-pine-evergreen text-cloud-mist'
                : 'border-moss-deep text-pine-evergreen hover:bg-moss-tint',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {variant === 'saved' ? (
        <>
          <PreviewNote>Sample set for the design preview. Nothing here was saved by you.</PreviewNote>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} className="h-full" />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          icon={<Heart className="size-10" aria-hidden="true" />}
          title={emptyBlock.heading}
          body={emptyBlock.body[0]}
          action={
            emptyBlock.primaryAction ? (
              <ButtonLink href={emptyBlock.primaryAction.href} size="lg">
                {emptyBlock.primaryAction.label}
              </ButtonLink>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
