/**
 * Restrained botanical and architectural details. All strokes use
 * `currentColor`, so color them with a text utility. Decorative: aria-hidden.
 */
import type { ReactNode } from 'react';
import type { PropertyCategory } from '@/domain';
import { cx } from '@/lib/cx';

type Point = readonly [number, number];

/** A pine branch drawn as a curved stem with paired needles. */
export function PineBranch({ className }: { className?: string }) {
  const p0: Point = [4, 60];
  const p1: Point = [120, 58];
  const p2: Point = [236, 20];

  const at = (t: number): Point => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
  ];
  const tangent = (t: number): Point => {
    const x = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const y = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const length = Math.hypot(x, y);
    return [x / length, y / length];
  };

  const needles: string[] = [];
  for (let i = 1; i <= 11; i += 1) {
    const t = i / 12;
    const [x, y] = at(t);
    const [tx, ty] = tangent(t);
    const nx = -ty;
    const ny = tx;
    const length = 16 - 7 * t;
    for (const side of [1, -1]) {
      const ex = x + (tx * 0.55 + nx * 0.85 * side) * length;
      const ey = y + (ty * 0.55 + ny * 0.85 * side) * length;
      needles.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`);
    }
  }

  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 60Q120 58 236 20" />
      <path d={needles.join('')} />
    </svg>
  );
}

/** A single simplified petal. */
export function Petal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 4C34 12 36 30 20 44C4 30 6 12 20 4Z" />
      <path d="M20 12V36" />
    </svg>
  );
}

const glyphs: Record<PropertyCategory, ReactNode> = {
  house: <path d="M8 22L24 9L40 22M12 20V38H36V20M21 38V28H27V38" />,
  condominium: (
    <path d="M15 40V8H33V40M10 40H38M20 14H22M26 14H28M20 20H22M26 20H28M20 26H22M26 26H28M22 40V33H26V40" />
  ),
  apartment: (
    <path d="M6 40V14H42V40M4 40H44M12 20H16M22 20H26M32 20H36M12 28H16M22 28H26M32 28H36M21 40V34H27V40" />
  ),
  townhouse: <path d="M4 40V24L11 17L18 24V40M18 24L25 17L32 24V40M32 24L39 17L46 24V40M2 40H48" />,
  lot: (
    <>
      <path d="M8 34L24 26L40 34L24 42Z" strokeDasharray="3 3" />
      <path d="M24 12V26M24 12L32 15L24 18" />
    </>
  ),
};

/** Line-art glyph for each property category. */
export function CategoryGlyph({
  category,
  className,
}: {
  category: PropertyCategory;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {glyphs[category]}
    </svg>
  );
}

/**
 * The "window" motif: an arch-topped frame with a fine offset frame line.
 * Use sparingly (hero and one or two feature images).
 */
export function WindowFrame({
  children,
  className,
  frame = true,
}: {
  children: ReactNode;
  className?: string;
  frame?: boolean;
}) {
  return (
    <div className={cx('relative', className)}>
      {frame ? (
        <div
          aria-hidden="true"
          className="rounded-arch absolute inset-0 translate-x-3 translate-y-3 border border-pine-evergreen/30"
        />
      ) : null}
      <div className="rounded-arch relative h-full w-full overflow-hidden bg-moss-tint">{children}</div>
    </div>
  );
}
