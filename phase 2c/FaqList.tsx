import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/domain';

/**
 * Accordion built on native <details>/<summary>: keyboard operable, announced
 * correctly by screen readers, and independent of any component library.
 */
export function FaqList({ items }: { items: ReadonlyArray<FaqItem> }) {
  return (
    <div className="divide-y divide-pine-evergreen/15 border-y border-pine-evergreen/15">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-xl text-pine-evergreen marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              className="size-5 shrink-0 text-berry-deep transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="reading-width pb-6 text-pine-ink">
            {item.body.map((paragraph) => (
              <p key={paragraph} className="mt-2 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
