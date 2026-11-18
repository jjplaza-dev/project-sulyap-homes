import type { ActionLink, EntityId } from './common';

/**
 * Body copy is stored as paragraphs (plain strings) so pages can render it
 * without a markdown or portable-text renderer. Phase 3 mappers split Sanity
 * text fields on blank lines.
 */
export type Paragraphs = ReadonlyArray<string>;

export interface FaqItem {
  readonly id: EntityId;
  readonly question: string;
  readonly body: Paragraphs;
  readonly order: number;
}

/** A section of the privacy notice. Draft: requires business/legal review. */
export interface LegalSection {
  readonly id: EntityId;
  readonly title: string;
  readonly body: Paragraphs;
  readonly order: number;
}

/** A brand value shown on `/about`. */
export interface ValueItem {
  readonly id: EntityId;
  readonly title: string;
  readonly body: Paragraphs;
  readonly order: number;
}

/**
 * [PROPOSED] A reusable block of editorial page copy (hero, intros, About
 * sections, call-to-action bands) so copy lives in fixtures, not components.
 */
export interface EditorialBlock {
  readonly id: EntityId;
  readonly eyebrow?: string;
  readonly heading: string;
  readonly body: Paragraphs;
  readonly primaryAction?: ActionLink;
  readonly secondaryAction?: ActionLink;
}
