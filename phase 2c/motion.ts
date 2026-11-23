/**
 * Motion vocabulary shared by every GSAP wrapper in `components/motion/*`.
 *
 * This module imports no animation library, so server components may import
 * the constants. GSAP is registered inside the client wrappers.
 *
 * Rules: transform/opacity only; no scroll hijacking; every effect is wrapped
 * in `gsap.matchMedia()` using the queries below, so reduced-motion and
 * touch devices never receive parallax, tilt, magnetic or cursor effects.
 */
import { useEffect, useLayoutEffect } from 'react';

/** Durations in seconds. */
export const MOTION = {
  micro: 0.18,
  standard: 0.42,
  reveal: 0.8,
} as const;

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  /** Gentle overshoot, drawers only. */
  drawer: 'back.out(1.2)',
} as const;

export const QUERY = {
  noPreference: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  /** Mouse/trackpad only, and only when motion is welcome. */
  hoverFineMotion:
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const;

/** `useLayoutEffect` in the browser, `useEffect` during SSR (avoids warnings). */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
