'use client';

import { useId, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import type { PropertyFilterOptions, SearchCriteria } from '@/domain';
import { cx } from '@/lib/cx';
import { formatPeso } from '@/lib/format';
import { ChoiceGroup, NumberField, SelectField } from '@/components/search/fields';

/** How many filters are currently set. */
export function countActiveFilters(criteria: SearchCriteria): number {
  return (
    criteria.categories.length +
    criteria.neighborhoodIds.length +
    (criteria.priceMin !== undefined || criteria.priceMax !== undefined ? 1 : 0) +
    (criteria.bedroomsMin ? 1 : 0) +
    (criteria.bathroomsMin ? 1 : 0) +
    (criteria.floorAreaSqm?.min !== undefined || criteria.floorAreaSqm?.max !== undefined ? 1 : 0) +
    (criteria.lotAreaSqm?.min !== undefined || criteria.lotAreaSqm?.max !== undefined ? 1 : 0)
  );
}

interface PanelProps {
  options: PropertyFilterOptions;
  criteria: SearchCriteria;
  onChange: (next: SearchCriteria) => void;
}

/**
 * PHASE 2 PREVIEW filter panel. Controls show selected states, but the
 * listing grid below does not change: real filtering arrives in Phase 4.
 */
export function SearchPanel({ options, criteria, onChange, className }: PanelProps & { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const [expanded, setExpanded] = useState(false);
  const patch = (changes: Partial<SearchCriteria>) => onChange({ ...criteria, ...changes });

  const { min, max, step } = options.price;
  const low = criteria.priceMin ?? min;
  const high = criteria.priceMax ?? max;
  const budgetLabel = options.purpose === 'rent' ? 'Monthly budget' : 'Budget';

  const toggleCategory = (value: (typeof criteria.categories)[number]) =>
    patch({
      categories: criteria.categories.includes(value)
        ? criteria.categories.filter((c) => c !== value)
        : [...criteria.categories, value],
    });

  return (
    <div className={cx('grid gap-6 rounded-lg border border-pine-evergreen/12 bg-surface p-5 shadow-sm sm:p-6', className)}>
      <fieldset>
        <legend className="mb-2 text-[0.95rem] font-medium text-pine-evergreen">Property type</legend>
        <div className="flex flex-wrap gap-2">
          {options.categories.map((option) => {
            const selected = criteria.categories.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCategory(option.value)}
                className={cx(
                  'min-h-11 rounded-md border px-4 text-sm font-medium transition-colors',
                  selected
                    ? 'border-panagbenga-sunflower bg-panagbenga-sunflower text-pine-evergreen'
                    : 'border-moss-deep bg-surface text-pine-evergreen hover:bg-moss-tint',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField
          id={`${uid}-area`}
          label="Neighborhood"
          value={criteria.neighborhoodIds[0] ?? ''}
          onChange={(value) => patch({ neighborhoodIds: value ? [value] : [] })}
        >
          <option value="">Any neighborhood</option>
          {options.neighborhoods.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <fieldset className="grid gap-2">
          <legend className="text-[0.95rem] font-medium text-pine-evergreen">{budgetLabel}</legend>
          <p className="numeric-tabular text-sm text-pine-ink" aria-live="polite">
            {formatPeso(low)} – {formatPeso(high)}
          </p>
          <div className="grid gap-1">
            <input
              type="range"
              aria-label={`Minimum ${budgetLabel.toLowerCase()}`}
              min={min}
              max={max}
              step={step}
              value={low}
              onChange={(event) => patch({ priceMin: Math.min(Number(event.target.value), high) })}
              className="h-11 w-full accent-pine-evergreen"
            />
            <input
              type="range"
              aria-label={`Maximum ${budgetLabel.toLowerCase()}`}
              min={min}
              max={max}
              step={step}
              value={high}
              onChange={(event) => patch({ priceMax: Math.max(Number(event.target.value), low) })}
              className="h-11 w-full accent-pine-evergreen"
            />
          </div>
        </fieldset>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChoiceGroup
          legend="Bedrooms"
          options={[{ value: 0, label: 'Any' }, ...options.bedrooms.map((n) => ({ value: n, label: `${n}+` }))]}
          value={criteria.bedroomsMin ?? 0}
          onChange={(value) => patch({ bedroomsMin: value === 0 ? undefined : value })}
        />
        <ChoiceGroup
          legend="Bathrooms"
          options={[{ value: 0, label: 'Any' }, ...options.bathrooms.map((n) => ({ value: n, label: `${n}+` }))]}
          value={criteria.bathroomsMin ?? 0}
          onChange={(value) => patch({ bathroomsMin: value === 0 ? undefined : value })}
        />
      </div>

      <div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${uid}-more`}
          onClick={() => setExpanded((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 font-medium text-pine-evergreen underline-offset-4 hover:underline"
        >
          {expanded ? 'Fewer filters' : 'More filters'}
          <ChevronDown
            className={cx('size-4 transition-transform duration-300 motion-reduce:transition-none', expanded && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        <div
          id={`${uid}-more`}
          className={cx(
            'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden" {...(expanded ? {} : { inert: true })}>
            <div className="grid gap-6 pt-4 md:grid-cols-2">
              <fieldset className="grid grid-cols-2 gap-3">
                <legend className="mb-2 text-[0.95rem] font-medium text-pine-evergreen">Floor area (sqm)</legend>
                <NumberField
                  id={`${uid}-floor-min`}
                  label="Min"
                  placeholder={String(options.floorAreaSqm.min)}
                  value={criteria.floorAreaSqm?.min}
                  onChange={(v) => patch({ floorAreaSqm: { ...criteria.floorAreaSqm, min: v } })}
                />
                <NumberField
                  id={`${uid}-floor-max`}
                  label="Max"
                  placeholder={String(options.floorAreaSqm.max)}
                  value={criteria.floorAreaSqm?.max}
                  onChange={(v) => patch({ floorAreaSqm: { ...criteria.floorAreaSqm, max: v } })}
                />
              </fieldset>
              <fieldset className="grid grid-cols-2 gap-3">
                <legend className="mb-2 text-[0.95rem] font-medium text-pine-evergreen">Lot area (sqm)</legend>
                <NumberField
                  id={`${uid}-lot-min`}
                  label="Min"
                  placeholder={String(options.lotAreaSqm.min)}
                  value={criteria.lotAreaSqm?.min}
                  onChange={(v) => patch({ lotAreaSqm: { ...criteria.lotAreaSqm, min: v } })}
                />
                <NumberField
                  id={`${uid}-lot-max`}
                  label="Max"
                  placeholder={String(options.lotAreaSqm.max)}
                  value={criteria.lotAreaSqm?.max}
                  onChange={(v) => patch({ lotAreaSqm: { ...criteria.lotAreaSqm, max: v } })}
                />
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Removable chips for every active filter, plus "Clear all". */
export function FilterChips({
  options,
  criteria,
  onChange,
  onClear,
}: PanelProps & { onClear: () => void }) {
  const chips: Array<{ key: string; label: string; remove: () => void }> = [];
  const patch = (changes: Partial<SearchCriteria>) => onChange({ ...criteria, ...changes });

  for (const category of criteria.categories) {
    const label = options.categories.find((o) => o.value === category)?.label ?? category;
    chips.push({ key: `cat-${category}`, label, remove: () => patch({ categories: criteria.categories.filter((c) => c !== category) }) });
  }
  for (const id of criteria.neighborhoodIds) {
    const label = options.neighborhoods.find((o) => o.value === id)?.label ?? id;
    chips.push({ key: `nb-${id}`, label, remove: () => patch({ neighborhoodIds: criteria.neighborhoodIds.filter((n) => n !== id) }) });
  }
  if (criteria.priceMin !== undefined || criteria.priceMax !== undefined) {
    chips.push({
      key: 'price',
      label: `${formatPeso(criteria.priceMin ?? options.price.min)} – ${formatPeso(criteria.priceMax ?? options.price.max)}`,
      remove: () => patch({ priceMin: undefined, priceMax: undefined }),
    });
  }
  if (criteria.bedroomsMin) chips.push({ key: 'beds', label: `${criteria.bedroomsMin}+ bedrooms`, remove: () => patch({ bedroomsMin: undefined }) });
  if (criteria.bathroomsMin) chips.push({ key: 'baths', label: `${criteria.bathroomsMin}+ bathrooms`, remove: () => patch({ bathroomsMin: undefined }) });
  if (criteria.floorAreaSqm?.min !== undefined || criteria.floorAreaSqm?.max !== undefined) {
    chips.push({ key: 'floor', label: 'Floor area set', remove: () => patch({ floorAreaSqm: undefined }) });
  }
  if (criteria.lotAreaSqm?.min !== undefined || criteria.lotAreaSqm?.max !== undefined) {
    chips.push({ key: 'lot', label: 'Lot area set', remove: () => patch({ lotAreaSqm: undefined }) });
  }

  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.remove}
            aria-label={`Remove filter: ${chip.label}`}
            className="numeric-tabular inline-flex min-h-11 items-center gap-2 rounded-sm bg-sunflower-soft px-3 text-sm font-medium text-pine-evergreen transition-colors hover:bg-panagbenga-sunflower/60"
          >
            {chip.label}
            <X className="size-4" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-pine-evergreen underline underline-offset-4"
        >
          Clear all
        </button>
      </li>
    </ul>
  );
}
