/**
 * SAMPLE EDITORIAL CONTENT: page copy, FAQ, privacy draft, brand values.
 *
 * The FAQ topics were drafted from the plan because the original
 * configuration file was not available to the author; confirm them with Sulyap.
 * No testimonials, awards, certifications or statistics are invented.
 */
import type { EditorialBlock, FaqItem, LegalSection, ValueItem } from '@/domain';

// ------------------------------------------------------------------ FAQ

export const faqItems: ReadonlyArray<FaqItem> = [
  {
    id: 'faq-book-tour',
    question: 'How do I book an in-person tour?',
    body: ['Open any property, choose Book an In-Person Tour, and pick a time with the property’s assigned agent. You only need to give your name and email.'],
    order: 1,
  },
  {
    id: 'faq-account',
    question: 'Do I need an account?',
    body: ['No. You can browse, save favorites and book a tour as a guest. There are no passwords and no payments on this site.'],
    order: 2,
  },
  {
    id: 'faq-duration',
    question: 'How long is a tour, and which time zone is used?',
    body: ['Tours last 30 minutes and take place in person at the property. All times are shown in Philippine time (Asia/Manila).'],
    order: 3,
  },
  {
    id: 'faq-notice',
    question: 'How much notice do I need to give?',
    body: ['Tours can be booked at least 24 hours ahead. A short buffer is kept between appointments so your agent can arrive on time.'],
    order: 4,
  },
  {
    id: 'faq-change',
    question: 'Can I cancel or reschedule?',
    body: ['Yes. You can cancel or reschedule up to 12 hours before your tour using the link in your confirmation.'],
    order: 5,
  },
  {
    id: 'faq-who',
    question: 'Who will I meet at the viewing?',
    body: ['Each listing has an assigned agent. That agent answers your questions beforehand and meets you at the property.'],
    order: 6,
  },
  {
    id: 'faq-backup',
    question: 'What if the assigned agent has no available times?',
    body: ['If a backup agent is listed for the property, you can use their calendar. Otherwise you can contact us and we will help you find a time. We never switch agents without telling you.'],
    order: 7,
  },
  {
    id: 'faq-map',
    question: 'Why are map markers only approximate?',
    body: ['The full address appears in the listing details. Map markers are placed deliberately near, not on, the property so a public map never pinpoints a home. Your tour confirmation includes the exact meeting address.'],
    order: 8,
  },
  {
    id: 'faq-real',
    question: 'Are the listings and photographs real?',
    body: ['On the live site, listings are selected by Sulyap and shown with authentic photographs. In this design preview, every listing and image is a fictional sample.'],
    order: 9,
  },
  {
    id: 'faq-favorites',
    question: 'How do favorites work?',
    body: ['Tap the heart to save a listing. Saved homes are stored only in this browser, so they will not follow you to another device.'],
    order: 10,
  },
  {
    id: 'faq-areas',
    question: 'Which areas do you cover?',
    body: ['Baguio City and selected nearby communities in Benguet.'],
    order: 11,
  },
  {
    id: 'faq-question',
    question: 'Can I ask a question without booking a tour?',
    body: ['Yes. Use Contact Agent on any listing to message its assigned agent, or reach us through the Contact page.'],
    order: 12,
  },
  {
    id: 'faq-privacy',
    question: 'How is my personal information used?',
    body: ['We use your details only to respond to your inquiry or confirm your tour. The Privacy Notice explains this in more detail.'],
    order: 13,
  },
];

// -------------------------------------------------------- Privacy notice (DRAFT)

export const legalSections: ReadonlyArray<LegalSection> = [
  {
    id: 'legal-about',
    title: 'About this notice',
    body: [
      'This is a draft privacy notice prepared for the design preview. It must be reviewed by Sulyap and a qualified legal professional before anyone relies on it.',
      'It describes how a site like this one is intended to handle personal information. It makes no claim of compliance with any law or standard.',
    ],
    order: 1,
  },
  {
    id: 'legal-collect',
    title: 'Information we collect',
    body: [
      'When you book a tour or send an inquiry, we collect your name and email address, and a phone number and message if you choose to provide them.',
      'We also record which property your request relates to.',
    ],
    order: 2,
  },
  {
    id: 'legal-use',
    title: 'How we use your information',
    body: ['We use your details to respond to your inquiry, schedule and confirm your tour, notify the assigned agent, and keep a record of the conversation.'],
    order: 3,
  },
  {
    id: 'legal-share',
    title: 'Who receives your information',
    body: ['Your request is shared with the assigned agent and Sulyap’s administrator. Service providers that handle scheduling, email delivery, spam protection and data storage may process it on our behalf.'],
    order: 4,
  },
  {
    id: 'legal-storage',
    title: 'Browser storage and favorites',
    body: ['Saved favorites are kept only in your own browser. They are not linked to your name or email and are not sent to us. Clearing your browser data removes them.'],
    order: 5,
  },
  {
    id: 'legal-retention',
    title: 'How long we keep information',
    body: ['Retention periods are to be confirmed by Sulyap before launch.'],
    order: 6,
  },
  {
    id: 'legal-choices',
    title: 'Your choices',
    body: ['You may ask to see, correct or delete the information you have given us by contacting the address below.'],
    order: 7,
  },
  {
    id: 'legal-contact',
    title: 'Contact us about privacy',
    body: ['Write to hello@sulyaphomes.example with “Privacy” in the subject line. This address is a placeholder until Sulyap confirms its own.'],
    order: 8,
  },
];

// ---------------------------------------------------------------- Values

export const valueItems: ReadonlyArray<ValueItem> = [
  {
    id: 'value-transparent',
    title: 'Plain, transparent information',
    body: ['Prices, terms and addresses are written out clearly, so you can judge a place before you visit.'],
    order: 1,
  },
  {
    id: 'value-authentic',
    title: 'Authentic photographs',
    body: ['Listings are shown as they are. We would rather show fewer homes, honestly, than many that are polished beyond recognition.'],
    order: 2,
  },
  {
    id: 'value-local',
    title: 'Rooted in Baguio',
    body: ['We care about the pines, the weather and the character of each neighborhood, and we describe them as locals would.'],
    order: 3,
  },
  {
    id: 'value-direct',
    title: 'One agent, direct communication',
    body: ['Every listing has an assigned agent you can speak with directly, from your first question to the day of the tour.'],
    order: 4,
  },
];

// ------------------------------------------------------ Editorial blocks

export const editorialBlocks = {
  'header-cta': {
    id: 'header-cta',
    heading: 'Schedule a Viewing',
    body: [],
    primaryAction: { label: 'Schedule a Viewing', href: '/agents' },
  },
  'home-hero': {
    id: 'home-hero',
    eyebrow: 'Baguio City and nearby Benguet',
    heading: 'Find a place that feels like yours.',
    body: ['Explore thoughtfully selected homes and residential properties in Baguio City and nearby communities. Discover your next place and arrange a personal viewing.'],
    primaryAction: { label: 'Explore Properties', href: '/buy' },
    secondaryAction: { label: 'Schedule a Viewing', href: '/agents' },
  },
  'home-buy-entry': {
    id: 'home-buy-entry',
    eyebrow: 'Buy',
    heading: 'Homes and lots for sale',
    body: ['Houses, condominiums, townhouses and residential lots, each with clear pricing and a described neighborhood.'],
    primaryAction: { label: 'Browse homes for sale', href: '/buy' },
  },
  'home-rent-entry': {
    id: 'home-rent-entry',
    eyebrow: 'Rent',
    heading: 'Places to lease',
    body: ['Monthly prices and lease terms up front, from studio condominiums to family houses.'],
    primaryAction: { label: 'Browse places to rent', href: '/rent' },
  },
  'home-categories': {
    id: 'home-categories',
    eyebrow: 'Browse by type',
    heading: 'Start with the kind of place you have in mind',
    body: ['Houses, condominiums, apartments, townhouses and residential lots. Choose a type, then narrow by neighborhood and budget.'],
  },
  'home-featured': {
    id: 'home-featured',
    eyebrow: 'Featured',
    heading: 'A few places we would show you first',
    body: ['Each one is selected for its setting, its layout and its straightforward pricing.'],
    primaryAction: { label: 'See all properties', href: '/buy' },
  },
  'home-recent': {
    id: 'home-recent',
    eyebrow: 'Recently added',
    heading: 'New to Sulyap',
    body: ['The newest listings to join our selection.'],
  },
  'home-neighborhoods': {
    id: 'home-neighborhoods',
    eyebrow: 'Explore the areas',
    heading: 'Know the neighborhood before you visit',
    body: ['Each area page covers schools, clinics, shops, cafés and how people get around, so you can picture daily life.'],
    primaryAction: { label: 'All areas', href: '/areas' },
  },
  'home-intro': {
    id: 'home-intro',
    eyebrow: 'Why Sulyap',
    heading: 'A closer look, not an overwhelming marketplace',
    body: [
      'We keep our selection small on purpose. Every listing comes with clear photographs, honest pricing and useful information about the area around it.',
      'You deal directly with an assigned agent, and you can see a place in person without creating an account.',
    ],
    primaryAction: { label: 'About Sulyap', href: '/about' },
  },
  'home-agent': {
    id: 'home-agent',
    eyebrow: 'Your agent',
    heading: 'One agent, from first message to tour day',
    body: ['Each listing has an assigned agent who answers your questions and meets you at the viewing.'],
    primaryAction: { label: 'Meet the agents', href: '/agents' },
  },
  'home-viewing-cta': {
    id: 'home-viewing-cta',
    eyebrow: 'See it in person',
    heading: 'Choose a place. Pick a time. Come take a look.',
    body: ['Book a 30-minute in-person tour with the property’s assigned agent. No account needed.'],
    primaryAction: { label: 'Explore Properties', href: '/buy' },
    secondaryAction: { label: 'Meet the agents', href: '/agents' },
  },
  'buy-intro': {
    id: 'buy-intro',
    eyebrow: 'For sale',
    heading: 'Homes and lots for sale',
    body: ['Residential properties for sale in Baguio City and nearby communities in Benguet.'],
  },
  'rent-intro': {
    id: 'rent-intro',
    eyebrow: 'For rent',
    heading: 'Places to rent',
    body: ['Houses, condominiums, apartments and townhouses available to lease, with monthly prices and lease terms shown up front.'],
  },
  'areas-intro': {
    id: 'areas-intro',
    eyebrow: 'Areas and neighborhoods',
    heading: 'Where you could belong',
    body: ['Baguio and its neighbors each have their own rhythm. Explore the areas we cover, and see the listings available in each.'],
  },
  'agents-intro': {
    id: 'agents-intro',
    eyebrow: 'Our agents',
    heading: 'The people who will show you around',
    body: ['Meet the agents behind our listings. Pick one to see their properties, or book a viewing directly.'],
  },
  'favorites-intro': {
    id: 'favorites-intro',
    eyebrow: 'Favorites',
    heading: 'Your saved places',
    body: ['Saved homes are stored only in this browser. No account is needed, and they will not follow you to another device.'],
  },
  'favorites-empty': {
    id: 'favorites-empty',
    heading: 'No saved places yet',
    body: ['Tap the heart on any listing to keep it here for later.'],
    primaryAction: { label: 'Explore Properties', href: '/buy' },
  },
  'about-intro': {
    id: 'about-intro',
    eyebrow: 'About Sulyap',
    heading: 'A locally managed agency, built around a closer look',
    body: ['Sulyap Homes & Leasing helps individuals, couples and families find residential spaces in Baguio City and nearby communities in Benguet.'],
  },
  'about-background': {
    id: 'about-background',
    eyebrow: 'Our background',
    heading: 'Local, and proud of it',
    body: [
      'Sulyap is managed locally and grounded in an appreciation for Baguio’s natural surroundings and residential character.',
      'This section will be completed by Sulyap with the agency’s own story.',
    ],
  },
  'about-approach': {
    id: 'about-approach',
    eyebrow: 'Mission and approach',
    heading: 'Fewer listings, better looked after',
    body: ['We choose each property carefully, photograph it honestly and describe the neighborhood around it, so that a viewing confirms what you already expect.'],
  },
  'about-values': {
    id: 'about-values',
    eyebrow: 'What we stand for',
    heading: 'Four things we do the same way every time',
    body: [],
  },
  'about-help': {
    id: 'about-help',
    eyebrow: 'How we help',
    heading: 'From first search to front door',
    body: ['Search from the homepage, read the details, save what you like, then book a tour with the agent who looks after that listing. If you would rather ask first, send a message.'],
  },
  'about-cta': {
    id: 'about-cta',
    heading: 'Ready for a closer look?',
    body: ['Explore the current selection or get in touch with a question.'],
    primaryAction: { label: 'Explore Properties', href: '/buy' },
    secondaryAction: { label: 'Contact us', href: '/contact' },
  },
  'contact-intro': {
    id: 'contact-intro',
    eyebrow: 'Contact',
    heading: 'Ask us anything',
    body: ['Send a general question, or reach us directly using the details below. For questions about a specific property, use Contact Agent on its page.'],
  },
  'faq-intro': {
    id: 'faq-intro',
    eyebrow: 'FAQ',
    heading: 'Questions, answered',
    body: ['How tours, favorites, listings and privacy work at Sulyap.'],
  },
  'faq-cta': {
    id: 'faq-cta',
    heading: 'Still have a question?',
    body: ['Send us a message and we will get back to you.'],
    primaryAction: { label: 'Contact us', href: '/contact' },
  },
  'privacy-intro': {
    id: 'privacy-intro',
    eyebrow: 'Privacy Notice',
    heading: 'How we handle your information',
    body: ['Draft for review. This notice has not been reviewed by Sulyap or a legal professional.'],
  },
} satisfies Record<string, EditorialBlock>;

/** Every editorial block key. Selectors accept only these. */
export type EditorialBlockId = keyof typeof editorialBlocks;
