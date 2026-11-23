import { getNeighborhoods, getPropertiesByNeighborhood } from '@/data/selectors';
import { NeighborhoodCard } from '@/components/areas/NeighborhoodCard';
import { Reveal } from '@/components/motion/Reveal';

/** Column spans and shapes that give the grid an editorial, uneven rhythm on large screens. */
const rhythm = [
  { span: 'lg:col-span-5', shape: 'tall' },
  { span: 'lg:col-span-4', shape: 'default' },
  { span: 'lg:col-span-3', shape: 'tall' },
  { span: 'lg:col-span-3', shape: 'default' },
  { span: 'lg:col-span-4', shape: 'tall' },
  { span: 'lg:col-span-5', shape: 'default' },
] as const;

export function NeighborhoodGrid() {
  const neighborhoods = getNeighborhoods();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
      {neighborhoods.map((neighborhood, index) => {
        const slot = rhythm[index % rhythm.length];
        return (
          <li key={neighborhood.id} className={slot.span}>
            <Reveal delay={(index % 3) * 0.08}>
              <NeighborhoodCard
                neighborhood={neighborhood}
                listingCount={getPropertiesByNeighborhood(neighborhood.id).length}
                shape={slot.shape}
              />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
