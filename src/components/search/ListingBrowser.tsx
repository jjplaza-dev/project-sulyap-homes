'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { LayoutGrid, MapPin, SlidersHorizontal } from 'lucide-react';
import type { Property, PropertyFilterOptions, SearchCriteria, SortOption } from '@/domain';
import { MediaView } from '@/components/brand/MediaView';
import { ApproxMap, type MapAreaLabel } from '@/components/map/ApproxMap';
import { buttonClasses } from '@/components/layout/button-styles';
import { PropertyCard } from '@/components/property/PropertyCard';
import { StatusBadge } from '@/components/property/Badges';
import { PreviewNote } from '@/components/states/StatusMessages';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cx } from '@/lib/cx';
import { formatPrice, pluralize } from '@/lib/format';
import { FilterChips, SearchPanel, countActiveFilters } from './SearchPanel';
import { SelectField } from './fields';

interface ListingBrowserProps {
  purpose: 'sale' | 'rent';
  /** The fixed sample result set. It is never filtered or reordered in Phase 2. */
  properties: ReadonlyArray<Property>;
  options: PropertyFilterOptions;
  defaults: SearchCriteria;
  sample: SearchCriteria;
  areas: ReadonlyArray<MapAreaLabel>;
}

type View = 'list' | 'map';

/**
 * PHASE 2 PREVIEW of `/buy` and `/rent`. Filters, chips, sort and the
 * List/Map toggle respond visually; the result set stays fixed until Phase 4.
 */
export function ListingBrowser({ purpose, properties, options, defaults, sample, areas }: ListingBrowserProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(defaults);
  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<string | null>(properties[0]?.id ?? null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeCount = countActiveFilters(criteria);
  const selected = properties.find((p) => p.id === selectedId) ?? null;

  const viewButton = (value: View, label: string, icon: ReactNode) => (
    <button
      type="button"
      aria-pressed={view === value}
      onClick={() => setView(value)}
      className={cx(
        'inline-flex min-h-11 items-center gap-2 rounded-sm px-4 text-sm font-semibold transition-colors',
        view === value ? 'bg-pine-evergreen text-cloud-mist' : 'text-pine-evergreen hover:bg-moss-tint',
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="grid gap-6">
      <PreviewNote>
        Design preview: filters, sorting and the map toggle show how this page will behave. The listings below
        stay the same until live search arrives in Phase 4.
      </PreviewNote>

      {/* Desktop: inline panel. Mobile: the same controls in a sheet. */}
      <div className="hidden md:block">
        <SearchPanel options={options} criteria={criteria} onChange={setCriteria} />
      </div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          className={buttonClasses({ variant: 'outline', size: 'lg', className: 'w-full' })}
        >
          <SlidersHorizontal className="size-5" aria-hidden="true" />
          Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow by type, area, budget and size.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-4 pb-6">
              <SearchPanel options={options} criteria={criteria} onChange={setCriteria} className="border-0 p-0 shadow-none" />
              <button type="button" onClick={() => setSheetOpen(false)} className={buttonClasses({ size: 'lg' })}>
                Show {pluralize(properties.length, 'property', 'properties')}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <FilterChips options={options} criteria={criteria} onChange={setCriteria} onClear={() => setCriteria(defaults)} />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="numeric-tabular font-display text-xl text-pine-evergreen" aria-live="polite">
          {pluralize(properties.length, 'property', 'properties')}
        </p>
        <div className="flex flex-wrap items-end gap-4">
          <SelectField
            id={`${purpose}-sort`}
            label="Sort by"
            value={criteria.sort}
            onChange={(value) => setCriteria({ ...criteria, sort: value as SortOption })}
            className="min-w-48"
          >
            {options.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <div role="group" aria-label="Results view" className="inline-flex rounded-md border border-moss-deep p-1">
            {viewButton('list', 'List', <LayoutGrid className="size-4" aria-hidden="true" />)}
            {viewButton('map', 'Map', <MapPin className="size-4" aria-hidden="true" />)}
          </div>
          <button
            type="button"
            onClick={() => setCriteria(sample)}
            className="min-h-11 rounded-sm border border-dashed border-petal-berry/60 px-3 text-sm font-medium text-berry-deep"
          >
            Design review: load sample selections
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} className="h-full" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="grid gap-4 lg:col-span-7">
            <ApproxMap
              markers={properties.map((p) => ({
                id: p.id,
                label: p.title,
                lat: p.location.publicMap.lat,
                lng: p.location.publicMap.lng,
              }))}
              areas={areas}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            {selected ? (
              <article className="flex gap-4 rounded-lg border border-pine-evergreen/12 bg-surface p-4 shadow-sm" aria-live="polite">
                <div className="aspect-[3/2] w-32 shrink-0 overflow-hidden rounded-md sm:w-44">
                  {selected.images[0] ? <MediaView image={selected.images[0]} alt="" /> : null}
                </div>
                <div className="grid content-start gap-1">
                  <StatusBadge status={selected.status} className="w-fit" />
                  <h3 className="text-lg leading-snug">{selected.title}</h3>
                  <p className="numeric-tabular font-semibold text-pine-evergreen">{formatPrice(selected.price)}</p>
                  <Link href={`/properties/${selected.slug}`} className="inline-flex min-h-11 items-center font-medium text-pine-evergreen underline">
                    View details
                  </Link>
                </div>
              </article>
            ) : null}
          </div>

          <ul className="grid content-start gap-2 lg:col-span-5 lg:max-h-[680px] lg:overflow-y-auto lg:pr-1" aria-label="Listings on the map">
            {properties.map((property) => {
              const active = property.id === selectedId;
              return (
                <li key={property.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(property.id)}
                    className={cx(
                      'flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors',
                      active
                        ? 'border-pine-evergreen bg-sunflower-soft'
                        : 'border-pine-evergreen/12 bg-surface hover:bg-moss-tint',
                    )}
                  >
                    <span className="font-medium text-pine-evergreen">{property.title}</span>
                    <span className="numeric-tabular shrink-0 text-sm text-pine-ink">{formatPrice(property.price)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="text-center text-sm text-pine-soft">
        All {pluralize(properties.length, 'sample listing')} are shown. “Load more” arrives with live search in Phase 4.
      </p>
    </div>
  );
}
