import type { ReactNode } from 'react';
import { Bath, BedDouble, Ruler, Trees } from 'lucide-react';
import type { Property } from '@/domain';
import { categoryLabels, conditionLabels } from '@/data/fixtures/labels';
import { formatArea } from '@/lib/format';

/** Up to four headline facts, shown as tiles. Lots show their area only. */
export function KeyFacts({ property }: { property: Property }) {
  const { bedrooms, bathrooms, floorAreaSqm, lotAreaSqm } = property.specs;
  const facts: Array<{ icon: ReactNode; label: string; value: string }> = [];

  if (bedrooms !== undefined) {
    facts.push({ icon: <BedDouble className="size-6" />, label: 'Bedrooms', value: bedrooms === 0 ? 'Studio' : String(bedrooms) });
  }
  if (bathrooms !== undefined) {
    facts.push({ icon: <Bath className="size-6" />, label: 'Bathrooms', value: String(bathrooms) });
  }
  if (floorAreaSqm !== undefined) {
    facts.push({ icon: <Ruler className="size-6" />, label: 'Floor area', value: formatArea(floorAreaSqm) });
  }
  if (lotAreaSqm !== undefined) {
    facts.push({ icon: <Trees className="size-6" />, label: 'Lot area', value: formatArea(lotAreaSqm) });
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {facts.map((fact) => (
        <li key={fact.label} className="flex flex-col gap-2 rounded-lg border border-pine-evergreen/12 bg-surface p-4">
          <span className="text-berry-deep" aria-hidden="true">
            {fact.icon}
          </span>
          <span className="numeric-tabular font-display text-2xl text-pine-evergreen">{fact.value}</span>
          <span className="text-sm text-pine-soft">{fact.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Full specification list. Only fields the listing has are shown. */
export function SpecList({ property }: { property: Property }) {
  const { bedrooms, bathrooms, floorAreaSqm, lotAreaSqm, floors, parkingSpaces, condition } = property.specs;
  const rows: Array<[string, string]> = [['Property type', categoryLabels[property.category]]];

  if (bedrooms !== undefined) rows.push(['Bedrooms', bedrooms === 0 ? 'Studio' : String(bedrooms)]);
  if (bathrooms !== undefined) rows.push(['Bathrooms', String(bathrooms)]);
  if (floorAreaSqm !== undefined) rows.push(['Floor area', formatArea(floorAreaSqm)]);
  if (lotAreaSqm !== undefined) rows.push(['Lot area', formatArea(lotAreaSqm)]);
  if (floors !== undefined) rows.push(['Floors', String(floors)]);
  if (parkingSpaces !== undefined) rows.push(['Parking', parkingSpaces === 0 ? 'None' : `${parkingSpaces} ${parkingSpaces === 1 ? 'space' : 'spaces'}`]);
  if (condition) rows.push(['Condition', conditionLabels[condition]]);

  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border border-pine-evergreen/12 bg-pine-evergreen/12 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-baseline justify-between gap-4 bg-surface px-4 py-3">
          <dt className="text-pine-soft">{label}</dt>
          <dd className="numeric-tabular font-medium text-pine-evergreen">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
