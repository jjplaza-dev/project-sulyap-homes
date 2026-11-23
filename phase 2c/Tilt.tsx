'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { QUERY } from '@/lib/motion';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Keep it subtle. */
  max?: number;
}

/**
 * Gentle 3D tilt following the pointer, for featured property cards.
 * Mouse/trackpad only; off for touch and reduced motion.
 */
export function Tilt({ children, className, max = 4 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(QUERY.hoverFineMotion, () => {
      gsap.set(el, { transformPerspective: 900, transformOrigin: 'center center' });
      const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * max * 2);
        rotateX(-py * max * 2);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => mm.revert();
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
