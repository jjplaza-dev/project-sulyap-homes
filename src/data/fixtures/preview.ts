/**
 * Static preview data for surfaces that become functional later:
 * the booking panel (Cal.com, Phase 6) and `/favorites` (Phase 4).
 * Dates are fixed sample values and never reflect real availability.
 */
import type {
  FavoritesPreview,
  FavoritesPreviewVariant,
  IsoDateString,
  TimeOfDayString,
  TourSlot,
} from '@/domain';

const slot = (date: IsoDateString, time: TimeOfDayString, isAvailable = true): TourSlot => ({
  id: `slot-${date}-${time.replace(':', '')}`,
  date,
  startTime: time,
  isAvailable,
});

export const sampleTourSlots: ReadonlyArray<TourSlot> = [
  slot('2026-11-19', '09:00'),
  slot('2026-11-19', '10:30'),
  slot('2026-11-19', '14:00', false),
  slot('2026-11-19', '15:30'),
  slot('2026-11-20', '09:00', false),
  slot('2026-11-20', '11:00'),
  slot('2026-11-20', '14:00'),
  slot('2026-11-21', '10:00'),
  slot('2026-11-21', '13:30'),
  slot('2026-11-21', '16:00', false),
  slot('2026-11-23', '09:30'),
  slot('2026-11-23', '11:00'),
  slot('2026-11-23', '15:00'),
  slot('2026-11-24', '10:00'),
  slot('2026-11-24', '14:30'),
];

export const favoritesPreviews: Record<FavoritesPreviewVariant, FavoritesPreview> = {
  saved: { variant: 'saved', propertyIds: ['prop-s01', 'prop-s05', 'prop-r01', 'prop-r03'] },
  empty: { variant: 'empty', propertyIds: [] },
};
