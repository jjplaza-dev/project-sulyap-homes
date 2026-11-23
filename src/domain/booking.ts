import type {
  BookingTimezone,
  EntityId,
  IsoDateString,
  TimeOfDayString,
} from './common';
import type { BackupKind, BookingPreviewState } from './enums';

/**
 * Fallback offered when the assigned agent has no availability.
 * Never silently swaps agents: the visitor always sees who the alternative is.
 */
export interface AgentBackupContact {
  readonly kind: 'agent';
  readonly agentId: EntityId;
  /** The backup agent's booking link, when one is configured. */
  readonly bookingLink?: string;
  /** Direct contact route (e.g. `mailto:` link) if no booking link exists. */
  readonly contactHref: string;
}

export interface CentralBackupContact {
  readonly kind: 'central';
  /** Central agency contact route (e.g. `/contact` or a `mailto:` link). */
  readonly contactHref: string;
}

export type BackupContact = AgentBackupContact | CentralBackupContact;

/**
 * What the booking panel needs to know about one property: its title and,
 * if any, where to send visitors when the assigned agent has no availability.
 * Built by `getBookableProperty`.
 */
export interface BookableProperty {
  readonly id: EntityId;
  readonly title: string;
  readonly backup?: {
    readonly kind: BackupKind;
    /** Present for `agent` backups. */
    readonly agentName?: string;
    readonly contactHref: string;
  };
}

/** One sample time slot in the static booking panel (Phase 2 only). */
export interface TourSlot {
  readonly id: EntityId;
  readonly date: IsoDateString;
  readonly startTime: TimeOfDayString;
  readonly isAvailable: boolean;
}

/**
 * Static stand-in for the Cal.com embed. Replaced in Phase 6.
 * Tours are always 30 minutes, in person, in Philippine time.
 */
export interface TourBookingPreview {
  readonly propertyId: EntityId;
  readonly agentId: EntityId;
  readonly durationMinutes: 30;
  readonly timezone: BookingTimezone;
  readonly sampleSlots: ReadonlyArray<TourSlot>;
  readonly previewState: BookingPreviewState;
}
