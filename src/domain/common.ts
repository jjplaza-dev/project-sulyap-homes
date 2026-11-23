/**
 * Sulyap Homes & Leasing — shared domain primitives.
 *
 * Types only. No runtime code, no UI, no I/O.
 * Canonical source of truth for naming across fixtures, selectors, components,
 * and (from Phase 3) Sanity mappers. Never create a competing model elsewhere.
 */

/** Stable identifier for any entity (e.g. `prop-baguio-001`). */
export type EntityId = string;

/** URL-safe identifier used in routes (e.g. `sunrise-townhouse-aurora-hill`). */
export type Slug = string;

/** Calendar date, `YYYY-MM-DD`. */
export type IsoDateString = string;

/** Full ISO 8601 timestamp, e.g. `2026-10-14T08:30:00+08:00`. */
export type IsoDateTimeString = string;

/** 24-hour clock time in the booking timezone, `HH:mm`. */
export type TimeOfDayString = string;

/** The site prices everything in Philippine pesos. */
export type CurrencyCode = 'PHP';

/** All tour scheduling is expressed in Philippine time. */
export type BookingTimezone = 'Asia/Manila';

/**
 * A latitude/longitude pair.
 *
 * For `PropertyLocation.publicMap` this is a MANUALLY ENTERED, DELIBERATELY
 * APPROXIMATE point. It is never derived from the exact address and the
 * exact address must never be encoded here.
 */
export interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

/** Inclusive numeric range; either end may be open. */
export interface NumberRange {
  readonly min?: number;
  readonly max?: number;
}

/** Slider/field bounds for a numeric filter. */
export interface NumericBounds {
  readonly min: number;
  readonly max: number;
  readonly step: number;
}

/** A labelled link (navigation, footer, social, calls to action). */
export interface ActionLink {
  readonly label: string;
  readonly href: string;
  /** Opens a different site; consumers add `rel` and an accessible hint. */
  readonly external?: boolean;
}
