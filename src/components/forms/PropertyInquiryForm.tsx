'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { EntityId, FormPreviewState } from '@/domain';
import { buttonClasses } from '@/components/layout/button-styles';
import { PreviewStateSwitch } from '@/components/states/PreviewStateSwitch';
import { PreviewNote, SuccessState } from '@/components/states/StatusMessages';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, describedBy } from './FormField';

const STATES: ReadonlyArray<{ value: FormPreviewState; label: string }> = [
  { value: 'idle', label: 'Ready' },
  { value: 'error-preview', label: 'Errors' },
  { value: 'success-preview', label: 'Success' },
  { value: 'disabled', label: 'Disabled' },
];

const controlClass = 'min-h-11 bg-surface text-base text-pine-ink';

interface PropertyInquiryFormProps {
  propertyId: EntityId;
  propertyTitle: string;
  agentName?: string;
}

/**
 * STATIC PREVIEW of the property inquiry forms (R10). Nothing is validated,
 * stored or sent until Phase 5. `propertyId` is carried for the future
 * endpoint but is never transmitted from this preview.
 */
export function PropertyInquiryForm({ propertyId, propertyTitle, agentName }: PropertyInquiryFormProps) {
  const [state, setState] = useState<FormPreviewState>('idle');
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
      <PreviewStateSwitch
        label="inquiry form state"
        options={STATES}
        value={state}
        onChange={(next) => {
          setState(next);
          setAttempted(false);
        }}
      />

      {state === 'success-preview' ? (
        <SuccessState
          title="Preview of the success message"
          body={`On the live site, ${agentName ?? 'the assigned agent'} would receive your message about ${propertyTitle}. In this preview, nothing was sent.`}
        />
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="grid gap-5"
          aria-label={`Inquiry about ${propertyTitle} (preview)`}
          data-property-id={propertyId}
        >
          {showErrors ? (
            <div role="alert" className="rounded-md border border-danger/40 bg-surface p-4 text-sm font-semibold text-pine-evergreen">
              There are 3 things to fix before this can be sent.
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="inquiry-name" label="Your name" error={errors.name}>
              <Input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                disabled={disabled}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy('inquiry-name', { error: Boolean(errors.name) })}
                className={controlClass}
              />
            </FormField>
            <FormField id="inquiry-email" label="Email address" error={errors.email}>
              <Input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                disabled={disabled}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy('inquiry-email', { error: Boolean(errors.email) })}
                className={controlClass}
              />
            </FormField>
          </div>

          <FormField id="inquiry-phone" label="Phone number" optional>
            <Input
              id="inquiry-phone"
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              disabled={disabled}
              className={controlClass}
            />
          </FormField>

          <FormField id="inquiry-message" label="Your message" error={errors.message}>
            <Textarea
              id="inquiry-message"
              name="message"
              rows={5}
              disabled={disabled}
              placeholder={`I’d like to know more about ${propertyTitle}.`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy('inquiry-message', { error: Boolean(errors.message) })}
              className="min-h-32 bg-surface text-base text-pine-ink"
            />
          </FormField>

          <div className="rounded-md border border-dashed border-moss-deep p-3 text-sm text-pine-soft">
            Spam protection (Cloudflare Turnstile) appears here once it is connected in Phase 5.
          </div>

          <div className="grid gap-3">
            <button type="submit" disabled={disabled} className={buttonClasses({ size: 'lg', className: 'w-full sm:w-fit' })}>
              Send message{agentName ? ` to ${agentName}` : ''}
            </button>
            {disabled ? <p className="text-sm text-pine-soft">The form is disabled while a message is being sent.</p> : null}
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
