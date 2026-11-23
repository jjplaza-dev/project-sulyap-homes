import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** Page container: about 1280px wide, generous gutters. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10', className)}>{children}</div>;
}

type Tone = 'mist' | 'tint' | 'soft' | 'pine';

const tones: Record<Tone, string> = {
  mist: '',
  tint: 'bg-moss-tint',
  soft: 'bg-sunflower-soft',
  pine: 'on-pine bg-pine-evergreen text-cloud-mist',
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  /** Id of the heading that names this section (creates a labelled region). */
  labelledBy?: string;
  /** Adds fine architectural grid lines behind the content. */
  grid?: boolean;
}

/** Vertical rhythm: ~64–80px on mobile, ~112–128px on desktop. */
export function Section({ children, tone = 'mist', className, id, labelledBy, grid }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx('relative py-16 sm:py-20 lg:py-28 xl:py-32', tones[tone], className)}
    >
      {grid ? (
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute inset-0',
            tone === 'pine' ? 'bg-grid-lines-light' : 'bg-grid-lines',
          )}
        />
      ) : null}
      <Container className="relative">{children}</Container>
    </section>
  );
}
