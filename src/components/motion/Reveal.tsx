'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, MOTION, QUERY, useIsomorphicLayoutEffect } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small steps (0.08) to stagger siblings. */
  delay?: number;
  /** Start offset in px for the rise. */
  y?: number;
}

/**
 * Fades and lifts its children into view once, as they enter the viewport.
 * Reduced motion: a plain fade, no movement. Without JavaScript the content
 * is shown immediately (see the <noscript> rule in the root layout).
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const scrollTrigger = { trigger: el, start: 'top 90%', once: true } as const;

    mm.add(QUERY.noPreference, () => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.reveal,
          delay,
          ease: EASE.out,
          clearProps: 'transform',
          scrollTrigger,
        },
      );
    });

    mm.add(QUERY.reduce, () => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: MOTION.standard, delay, ease: 'none', scrollTrigger },
      );
    });

    // GSAP now owns the starting state; drop the CSS "pending" hide.
    el.removeAttribute('data-reveal');

    return () => mm.revert();
  }, [delay, y]);

  return (
    <div ref={ref} data-reveal="pending" className={className}>
      {children}
    </div>
  );
}
