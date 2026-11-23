import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { Label } from '@/components/ui/label';

/** Builds the `aria-describedby` value for a field's hint and error ids. */
export function describedBy(id: string, parts: { hint?: boolean; error?: boolean }): string | undefined {
  const ids = [parts.hint ? `${id}-hint` : null, parts.error ? `${id}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

interface FormFieldProps {
  /** Must equal the `id` of the control passed as children. */
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

/**
 * Label, control, helper text and error message. Wire the control with
 * `id`, `aria-invalid={Boolean(error)}` and `aria-describedby={describedBy(...)}`.
 */
export function FormField({ id, label, optional, hint, error, children }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.95rem] font-medium text-pine-evergreen">
        {label}
        {optional ? <span className="font-normal text-pine-soft"> (optional)</span> : null}
      </Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-pine-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
