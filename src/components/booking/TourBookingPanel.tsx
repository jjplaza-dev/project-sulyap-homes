'use client';

import { useMemo, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import type { BookableProperty, BookingPreviewState, TourBookingPreview, TourSlot } from '@/domain';
import { buttonClasses, type ButtonSize, type ButtonTone, type ButtonVariant } from '@/components/layout/button-styles';
import { ButtonLink } from '@/components/layout/ButtonLink';
import { FormField, describedBy } from '@/components/forms/FormField';
import { SelectField } from '@/components/search/fields';
import { PreviewStateSwitch } from '@/components/states/PreviewStateSwitch';
import { ErrorState, PreviewNote, SuccessState } from '@/components/states/StatusMessages';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cx } from '@/lib/cx';
import { formatSlotDate, formatTime } from '@/lib/format';

const STATES: ReadonlyArray<{ value: BookingPreviewState; label: string }> = [
  { value: 'slots', label: 'Choose a time' },
  { value: 'success', label: 'Success' },
  { value: 'failure', label: 'Error' },
  { value: 'backup', label: 'No availability' },
];

interface TourBookingPanelProps {
  preview: TourBookingPreview;
  /** The ASSIGNED agent. Tours are always booked with this person. */
  agentName: string;
  /** One property (listing page) or several (agent page: the visitor picks). */
  properties: ReadonlyArray<BookableProperty>;
  triggerLabel?: string;
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  triggerTone?: ButtonTone;
  triggerClassName?: string;
}

/**
 * STATIC PREVIEW of the in-person tour booking panel (R09). No time is
 * reserved, nothing is sent and no calendar is read: scheduling through
 * Cal.com connects in Phase 6. The state switch is a design-review aid.
 */
export function TourBookingPanel({
  preview,
  agentName,
  properties,
  triggerLabel = 'Book an In-Person Tour',
  triggerVariant = 'primary',
  triggerSize = 'lg',
  triggerTone,
  triggerClassName,
}: TourBookingPanelProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<BookingPreviewState>(preview.previewState);
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? '');
  const [slotId, setSlotId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const property = properties.find((p) => p.id === propertyId) ?? properties[0];
  const slot = preview.sampleSlots.find((s) => s.id === slotId) ?? preview.sampleSlots.find((s) => s.isAvailable);

  const days = useMemo(() => {
    const grouped = new Map<string, TourSlot[]>();
    for (const item of preview.sampleSlots) {
      grouped.set(item.date, [...(grouped.get(item.date) ?? []), item]);
    }
    return [...grouped.entries()];
  }, [preview.sampleSlots]);

  const slotLabel = slot ? `${formatSlotDate(slot.date)}, ${formatTime(slot.startTime)}` : 'the time you choose';
  const backup = property?.backup;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={buttonClasses({ variant: triggerVariant, size: triggerSize, tone: triggerTone, className: triggerClassName })}
      >
        <CalendarClock className="size-5" aria-hidden="true" />
        {triggerLabel}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Book an in-person tour</SheetTitle>
            <SheetDescription>
              {property ? property.title : 'Choose a property'} · with {agentName}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-5 px-4 pb-8">
            <PreviewNote>Preview — scheduling via Cal.com connects in Phase 6. Nothing here books a tour.</PreviewNote>
            <PreviewStateSwitch
              label="booking panel state"
              options={STATES}
              value={state}
              onChange={(next) => {
                setState(next);
                setConfirmed(false);
              }}
            />

            <p className="text-sm text-pine-ink">
              {preview.durationMinutes}-minute tour in person · times shown in Philippine time ({preview.timezone})
            </p>

            {state === 'slots' ? (
              <>
                {properties.length > 1 ? (
                  <SelectField id="booking-property" label="Which property?" value={propertyId} onChange={setPropertyId}>
                    {properties.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </SelectField>
                ) : null}

                <div className="grid gap-4">
                  {days.map(([date, slots]) => (
                    <fieldset key={date}>
                      <legend className="mb-2 text-[0.95rem] font-semibold text-pine-evergreen">{formatSlotDate(date)}</legend>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            disabled={!item.isAvailable}
                            aria-pressed={slotId === item.id}
                            onClick={() => {
                              setSlotId(item.id);
                              setConfirmed(false);
                            }}
                            className={cx(
                              'numeric-tabular min-h-11 rounded-md border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-pine-evergreen/15 disabled:text-pine-soft disabled:line-through',
                              slotId === item.id
                                ? 'border-pine-evergreen bg-pine-evergreen text-cloud-mist'
                                : 'border-moss-deep bg-surface text-pine-evergreen hover:bg-moss-tint',
                            )}
                          >
                            {formatTime(item.startTime)}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>

                <div className="grid gap-4">
                  <FormField id="booking-name" label="Your name">
                    <Input id="booking-name" name="name" autoComplete="name" className="min-h-11 bg-surface text-base" />
                  </FormField>
                  <FormField id="booking-email" label="Email address" hint="We use only your name and email to confirm the tour.">
                    <Input
                      id="booking-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-describedby={describedBy('booking-email', { hint: true })}
                      className="min-h-11 bg-surface text-base"
                    />
                  </FormField>
                </div>

                <button
                  type="button"
                  disabled={!slotId}
                  onClick={() => setConfirmed(true)}
                  className={buttonClasses({ size: 'lg', className: 'w-full' })}
                >
                  Confirm tour
                </button>
                {!slotId ? <p className="text-sm text-pine-soft">Choose a time to continue.</p> : null}
                {confirmed ? (
                  <PreviewNote>
                    <span role="status">Preview only: nothing was booked.</span>
                  </PreviewNote>
                ) : null}
              </>
            ) : null}

            {state === 'success' ? (
              <SuccessState
                title="Preview of the confirmation"
                body={`On the live site, you would see your tour with ${agentName} on ${slotLabel}, and a confirmation email would arrive. In this preview, nothing was booked.`}
              />
            ) : null}

            {state === 'failure' ? (
              <ErrorState
                title="Preview of an error message"
                body="On the live site, a message like this appears if a time can no longer be reserved. In this preview, nothing went wrong."
                action={
                  <button
                    type="button"
                    onClick={() => setState('slots')}
                    className={buttonClasses({ variant: 'outline' })}
                  >
                    Choose another time
                  </button>
                }
              />
            ) : null}

            {state === 'backup' ? (
              <div className="grid gap-4 rounded-lg border border-pine-evergreen/12 bg-surface p-5">
                <h3 className="text-xl">{agentName} has no times available</h3>
                {backup?.kind === 'agent' ? (
                  <>
                    <p>
                      You can try{' '}
                      <span className="font-semibold text-pine-evergreen">{backup.agentName ?? 'another agent'}</span>’s
                      calendar instead. We never switch agents without telling you.
                    </p>
                    <button type="button" onClick={() => setConfirmed(true)} className={buttonClasses({ variant: 'outline' })}>
                      See {backup.agentName ?? 'their'} times
                    </button>
                    {confirmed ? (
                      <PreviewNote>
                        <span role="status">Preview only: the backup calendar is not connected yet.</span>
                      </PreviewNote>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p>Contact our team and we will help you find a time that works.</p>
                    <ButtonLink href={backup?.contactHref ?? '/contact'} variant="outline">
                      Contact our team
                    </ButtonLink>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
