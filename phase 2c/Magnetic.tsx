'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { QUERY } from '@/lib/motion';
import { cx } from '@/lib/cx';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the element follows (0–1). */
  strength?: number;
}

/**
 * Pulls its child slightly toward the pointer. Mouse/trackpad only, and never
 * when the visitor prefers reduced motion; on touch it renders as a plain wrapper.
 */
export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(QUERY.hoverFineMotion, () => {
      const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
        moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <span ref={ref} className={cx('inline-block', className)}>
      {children}
    </span>
  );
}
