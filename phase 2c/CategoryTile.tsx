import Link from 'next/link';
import type { PropertyCategory } from '@/domain';
import { categoryPluralLabels } from '@/data/fixtures/labels';
import { CategoryGlyph } from '@/components/brand/Botanical';
import { pluralize } from '@/lib/format';

interface CategoryTileProps {
  category: PropertyCategory;
  /** Number of available listings of this type. */
  count: number;
  href: string;
}

export function CategoryTile({ category, count, href }: CategoryTileProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-36 flex-col justify-between gap-6 rounded-lg border border-pine-evergreen/12 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <CategoryGlyph category={category} className="size-12 text-pine-evergreen transition-colors group-hover:text-berry-deep" />
      <span>
        <span className="block font-display text-xl text-pine-evergreen">{categoryPluralLabels[category]}</span>
        <span className="numeric-tabular block text-sm text-pine-soft">{pluralize(count, 'listing')} available</span>
      </span>
    </Link>
  );
}
