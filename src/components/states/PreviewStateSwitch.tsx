'use client';

import { cx } from '@/lib/cx';

interface PreviewStateSwitchProps<T extends string> {
  /** Describes what is being previewed, e.g. "booking panel state". */
  label: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}

/**
 * Design-review aid: lets a reviewer flip a static preview between its states
 * (success, error, empty, ...). Removed before launch.
 */
export function PreviewStateSwitch<T extends string>({
  label,
  options,
  value,
  onChange,
}: PreviewStateSwitchProps<T>) {
  return (
    <div
      role="group"
      aria-label={`Design review only: choose the ${label} to preview`}
      className="grid gap-2 rounded-md border border-dashed border-petal-berry/60 bg-surface p-3"
    >
      <p className="text-sm font-medium text-berry-deep">Design review only: preview the {label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cx(
              'min-h-11 rounded-sm border px-4 text-sm font-medium transition-colors',
              value === option.value
                ? 'border-pine-evergreen bg-pine-evergreen text-cloud-mist'
                : 'border-moss-deep text-pine-evergreen hover:bg-moss-tint',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
