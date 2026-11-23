'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QUERY } from '@/lib/motion';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the element's pass through the viewport. */
  distance?: number;
}

/**
 * Drifts its child vertically as the page scrolls (transform only).
 * Removed entirely for reduced motion. Place it inside an `overflow-hidden`
 * frame and oversize the child slightly so edges never show.
 */
export function Parallax({ children, className, distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(QUERY.noPreference, () => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
