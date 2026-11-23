'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { FormPreviewState } from '@/domain';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { buttonClasses } from '@/components/layout/button-styles';
import { PreviewNote, SuccessState } from '@/components/states/StatusMessages';
import { cx } from '@/lib/cx';
import { FormField, describedBy } from './FormField';

const PREVIEW_STATES: ReadonlyArray<{ value: FormPreviewState; label: string }> = [
  { value: 'idle', label: 'Ready' },
  { value: 'error-preview', label: 'Errors' },
  { value: 'success-preview', label: 'Success' },
  { value: 'disabled', label: 'Disabled' },
];

const controlClass = 'min-h-11 bg-surface text-base text-pine-ink';

/**
 * STATIC PREVIEW of the general inquiry form (R16). Submitting does nothing:
 * no message is validated, stored or sent until Phase 5. The state switch is
 * a design-review aid and is removed before launch.
 */
export function ContactForm({ initialState = 'idle' }: { initialState?: FormPreviewState }) {
  const [state, setState] = useState<FormPreviewState>(initialState);
  const [attempted, setAttempted] = useState(false);

  const showErrors = state === 'error-preview';
  const disabled = state === 'disabled';

  const errors = {
    name: showErrors ? 'Please enter your name.' : undefined,
    email: showErrors ? 'Enter an email address like name@example.com.' : undefined,
    message: showErrors ? 'Please write a short message.' : undefined,
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
  }

  return (
    <div className="grid gap-6">
      <div
        role="group"
        aria-label="Design review only: choose the form state to preview"
        className="grid gap-2 rounded-md border border-dashed border-petal-berry/60 bg-surface p-3"
      >
        <p className="text-sm font-medium text-berry-deep">Design review only: preview a state</p>
        <div className="flex flex-wrap gap-2">
          {PREVIEW_STATES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={state === option.value}
              onClick={() => {
                setState(option.value);
                setAttempted(false);
              }}
              className={cx(
                'min-h-11 rounded-sm border px-4 text-sm font-medium transition-colors',
                state === option.value
                  ? 'border-pine-evergreen bg-pine-evergreen text-cloud-mist'
                  : 'border-moss-deep text-pine-evergreen hover:bg-moss-tint',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {state === 'success-preview' ? (
        <SuccessState
          title="Preview of the success message"
          body="On the live site, a confirmation like this appears after your message is sent. In this preview, nothing was sent."
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="General inquiry (preview)">
          {showErrors ? (
            <div role="alert" className="rounded-md border border-danger/40 bg-surface p-4 text-sm text-pine-evergreen">
              <p className="font-semibold">There are 3 things to fix before this can be sent.</p>
            </div>
          ) : null}

          <FormField id="contact-name" label="Your name" error={errors.name}>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              disabled={disabled}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('contact-name', { error: Boolean(errors.name) })}
              className={controlClass}
            />
          </FormField>

          <FormField id="contact-email" label="Email address" error={errors.email}>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={disabled}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('contact-email', { error: Boolean(errors.email) })}
              className={controlClass}
            />
          </FormField>

          <FormField
            id="contact-phone"
            label="Phone number"
            optional
            hint="Only if you would like us to call you back."
          >
            <Input
              id="contact-phone"
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              disabled={disabled}
              aria-describedby={describedBy('contact-phone', { hint: true })}
              className={controlClass}
            />
          </FormField>

          <FormField id="contact-message" label="Your message" error={errors.message}>
            <Textarea
              id="contact-message"
              name="message"
              rows={5}
              disabled={disabled}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy('contact-message', { error: Boolean(errors.message) })}
              className="min-h-32 bg-surface text-base text-pine-ink"
            />
          </FormField>

          <div className="rounded-md border border-dashed border-moss-deep p-3 text-sm text-pine-soft">
            Spam protection (Cloudflare Turnstile) appears here once it is connected in Phase 5.
          </div>

          <div className="grid gap-3">
            <button type="submit" disabled={disabled} className={buttonClasses({ size: 'lg', className: 'w-full sm:w-fit' })}>
              Send message
            </button>
            {disabled ? (
              <p className="text-sm text-pine-soft">The form is disabled while a message is being sent.</p>
            ) : null}
            {attempted ? (
              <PreviewNote>
                <span role="status">Preview only: nothing was sent.</span>
              </PreviewNote>
            ) : null}
            <p className="text-sm text-pine-soft">
              Your details are used only to reply to you. Read the{' '}
              <Link href="/privacy" className="font-medium text-pine-evergreen underline">
                Privacy Notice
              </Link>
              .
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
