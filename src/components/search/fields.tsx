'use client';

import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

const controlClass =
  'min-h-11 w-full rounded-md border border-moss-deep bg-surface px-3 text-base text-pine-ink';

const labelClass = 'text-[0.95rem] font-medium text-pine-evergreen';

/** Native <select>: reliable keyboard and screen-reader behavior everywhere. */
export function SelectField({
  id,
  label,
  value,
  onChange,
  children,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('grid gap-2', className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={controlClass}>
        {children}
      </select>
    </div>
  );
}

export function NumberField({
  id,
  label,
  value,
  placeholder,
  onChange,
  className,
}: {
  id: string;
  label: string;
  value: number | undefined;
  placeholder?: string;
  onChange: (value: number | undefined) => void;
  className?: string;
}) {
  return (
    <div className={cx('grid gap-2', className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value === '' ? undefined : Number(event.target.value))}
        className={cx(controlClass, 'numeric-tabular')}
      />
    </div>
  );
}

/** A labelled set of mutually exclusive choices (e.g. minimum bedrooms). */
export function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: ReadonlyArray<{ value: number; label: string }>;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className={cx(labelClass, 'mb-2')}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cx(
              'min-h-11 min-w-11 rounded-md border px-4 text-sm font-medium transition-colors',
              value === option.value
                ? 'border-pine-evergreen bg-pine-evergreen text-cloud-mist'
                : 'border-moss-deep bg-surface text-pine-evergreen hover:bg-moss-tint',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
