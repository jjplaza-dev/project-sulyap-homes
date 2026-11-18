import type { ActionLink, EntityId } from './common';
import type { MediaImage } from './media';

export type NavLink = ActionLink;
export type SocialLink = ActionLink;

export interface SiteContact {
  readonly email: string;
  readonly phone?: string;
  /** Office address, if the agency has a public office. */
  readonly address?: string;
  /** Plain-text business hours. Phase 2 uses an explicit "to be confirmed by Sulyap" placeholder. */
  readonly hours?: string;
}

export interface FooterLinkGroup {
  readonly id: EntityId;
  readonly heading: string;
  readonly links: ReadonlyArray<NavLink>;
}

export interface SiteFooter {
  readonly about: string;
  readonly linkGroups: ReadonlyArray<FooterLinkGroup>;
  readonly copyright: string;
  /** Global "sample data" notice. Removed in Phase 7 once real content replaces fixtures. */
  readonly sampleDataNotice?: string;
}

/** Singleton site-wide settings. */
export interface SiteSettings {
  readonly businessName: string;
  readonly tagline: string;
  readonly logo: MediaImage;
  readonly nav: ReadonlyArray<NavLink>;
  readonly contact: SiteContact;
  readonly social: ReadonlyArray<SocialLink>;
  /** Human-readable service area, e.g. "Baguio City and nearby communities in Benguet". */
  readonly serviceArea: string;
  /** Property IDs featured on the homepage, in display order. */
  readonly homepageFeaturedIds: ReadonlyArray<EntityId>;
  readonly footer: SiteFooter;
  /**
   * Central administrator email. SERVER-ONLY from Phase 3 onward:
   * components must accept `PublicSiteSettings`, never this field.
   */
  readonly centralAdminEmail: string;
}

/** Everything safe to pass to client components. */
export type PublicSiteSettings = Omit<SiteSettings, 'centralAdminEmail'>;
