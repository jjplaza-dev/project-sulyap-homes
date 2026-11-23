'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Property } from '@/domain';
import { Tilt } from '@/components/motion/Tilt';
import { PropertyCard } from '@/components/property/PropertyCard';

/**
 * Horizontal track with native CSS scroll-snap. The scroller is a labelled,
 * keyboard-focusable region (arrow keys scroll it); the buttons are a
 * convenience for pointer users.
 */
export function FeaturedTrack({ properties }: { properties: ReadonlyArray<Property> }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const arrowClass =
    'inline-flex size-11 items-center justify-center rounded-md border border-pine-evergreen text-pine-evergreen transition-colors hover:bg-pine-evergreen hover:text-cloud-mist';

  return (
    <div>
      <div className="mb-6 hidden justify-end gap-2 sm:flex">
        <button type="button" className={arrowClass} onClick={() => scrollByPage(-1)} aria-label="Previous featured properties">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" className={arrowClass} onClick={() => scrollByPage(1)} aria-label="Next featured properties">
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Featured properties, scrolls horizontally"
        tabIndex={0}
        className="-mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
      >
        <ul className="flex gap-6">
          {properties.map((property) => (
            <li key={property.id} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
              <Tilt className="h-full">
                <PropertyCard property={property} className="h-full" />
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
