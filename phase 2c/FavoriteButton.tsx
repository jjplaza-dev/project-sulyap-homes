'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cx } from '@/lib/cx';

/**
 * Heart toggle. PHASE 2 PREVIEW: the pressed state lives in this component
 * only. Nothing is stored, so a reload forgets it. Real, browser-stored
 * favorites arrive in Phase 4.
 */
export function FavoriteButton({ title, className }: { title: string; className?: string }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={`Save ${title} to favorites`}
      onClick={() => setPressed((value) => !value)}
      className={cx(
        'inline-flex size-11 items-center justify-center rounded-md bg-surface/95 text-pine-evergreen shadow-sm transition-colors hover:bg-surface',
        className,
      )}
    >
      <Heart
        className={cx('size-5 transition-colors', pressed && 'text-petal-berry')}
        fill={pressed ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
    </button>
  );
}
