'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { QUERY } from '@/lib/motion';
import { cx } from '@/lib/cx';

/**
 * A soft ring that follows the pointer inside this zone. The native cursor is
 * NEVER hidden or replaced, so text fields, links and selections behave
 * normally. Mouse/trackpad only; off for touch and reduced motion.
 */
export function CursorZone({ children, className }: { children: ReactNode; className?: string }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const ring = ringRef.current;
    if (!zone || !ring) return;

    const mm = gsap.matchMedia();
    mm.add(QUERY.hoverFineMotion, () => {
      const moveX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
      const moveY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        const rect = zone.getBoundingClientRect();
        moveX(event.clientX - rect.left);
        moveY(event.clientY - rect.top);
        const interactive = (event.target as Element | null)?.closest('a, button, input, select, textarea');
        gsap.to(ring, { scale: interactive ? 1.6 : 1, duration: 0.2, overwrite: 'auto' });
      };
      const onEnter = () => gsap.to(ring, { opacity: 1, duration: 0.2 });
      const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.2 });

      zone.addEventListener('pointermove', onMove);
      zone.addEventListener('pointerenter', onEnter);
      zone.addEventListener('pointerleave', onLeave);
      return () => {
        zone.removeEventListener('pointermove', onMove);
        zone.removeEventListener('pointerenter', onEnter);
        zone.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={zoneRef} className={cx('relative', className)}>
      {children}
      <span
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 -ml-6 -mt-6 size-12 rounded-full border border-panagbenga-sunflower/80 opacity-0"
      />
    </div>
  );
}
