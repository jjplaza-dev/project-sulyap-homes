'use client';

import { useId, useState } from 'react';
import type { PropertyFilterOptions, PropertyPurpose } from '@/domain';
import { ButtonLink } from '@/components/layout/ButtonLink';
import { cx } from '@/lib/cx';
import { SelectField } from '@/components/search/fields';

interface HeroSearchProps {
  options: Record<PropertyPurpose, PropertyFilterOptions>;
}

const purposes: ReadonlyArray<{ value: PropertyPurpose; label: string; href: string }> = [
  { value: 'sale', label: 'Buy', href: '/buy' },
  { value: 'rent', label: 'Rent', href: '/rent' },
];

/**
 * PHASE 2 PREVIEW: the Buy/Rent choice decides which listing page opens, but
 * the type and neighborhood choices do not carry over until Phase 4.
 */
export function HeroSearch({ options }: HeroSearchProps) {
  const uid = useId().replace(/:/g, '');
  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [category, setCategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const current = options[purpose];
  const target = purposes.find((p) => p.value === purpose) ?? purposes[0];

  return (
    <div role="search" aria-label="Search properties" className="grid gap-5 rounded-lg border border-pine-evergreen/12 bg-surface p-5 shadow-md sm:p-6">
      <div role="group" aria-label="Buy or rent" className="inline-flex w-fit rounded-md border border-moss-deep p-1">
        {purposes.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={purpose === option.value}
            onClick={() => {
              setPurpose(option.value);
              setCategory('');
            }}
            className={cx(
              'min-h-11 min-w-20 rounded-sm px-5 text-sm font-semibold transition-colors',
              purpose === option.value ? 'bg-pine-evergreen text-cloud-mist' : 'text-pine-evergreen hover:bg-moss-tint',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id={`${uid}-type`} label="Property type" value={category} onChange={setCategory}>
          <option value="">Any type</option>
          {current.categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
        <SelectField id={`${uid}-area`} label="Neighborhood" value={neighborhood} onChange={setNeighborhood}>
          <option value="">Anywhere we work</option>
          {current.neighborhoods.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>

      <ButtonLink href={target.href} size="lg" className="w-full sm:w-fit">
        Search properties
      </ButtonLink>
    </div>
  );
}
