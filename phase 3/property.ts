import { defineArrayMember, defineField, defineType } from 'sanity';
import { latitudeField, longitudeField, photoMember } from './shared';

/** Hides a field unless the listing is for rent. */
const hideUnlessRent = ({ document }: { document?: { purpose?: string } }) => document?.purpose !== 'rent';

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'pricing', title: 'Price and lease' },
    { name: 'specs', title: 'Specifications' },
    { name: 'location', title: 'Location' },
    { name: 'media', title: 'Photos and plans' },
    { name: 'people', title: 'Area and agent' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basics',
      description: 'A short, descriptive name. Do not include the price or the full address.',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'Web address (slug)',
      type: 'slug',
      group: 'basics',
      description: 'Used in the page URL. Must be unique. Click Generate.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'For sale or for rent',
      type: 'string',
      group: 'basics',
      options: {
        layout: 'radio',
        list: [
          { title: 'For sale', value: 'sale' },
          { title: 'For rent', value: 'rent' },
        ],
      },
      initialValue: 'sale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Property type',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Condominium', value: 'condominium' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Residential lot', value: 'lot' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      group: 'basics',
      description: 'To hide a listing completely, unpublish it instead.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold (for sale only)', value: 'sold' },
          { title: 'Rented (for rent only)', value: 'rented' },
        ],
      },
      initialValue: 'available',
      validation: (Rule) =>
        Rule.required().custom((status, context) => {
          const purpose = (context.document as { purpose?: string } | undefined)?.purpose;
          if (purpose === 'sale' && status === 'rented') return 'A listing for sale cannot be marked Rented. Use Sold.';
          if (purpose === 'rent' && status === 'sold') return 'A listing for rent cannot be marked Sold. Use Rented.';
          return true;
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on the homepage',
      type: 'boolean',
      group: 'basics',
      initialValue: false,
    }),
    defineField({
      name: 'isSample',
      title: 'Sample listing (design preview)',
      type: 'boolean',
      group: 'basics',
      description: 'Turn on only for fictional listings. Shows a “Sample listing” tag. Leave off for real listings.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Listed on',
      type: 'datetime',
      group: 'basics',
      description: 'Controls “recently added” ordering.',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 2,
      group: 'basics',
      description: 'One or two sentences shown on cards and at the top of the page.',
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'text',
      rows: 8,
      group: 'basics',
      description: 'Plain text. Separate paragraphs with a blank line.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      group: 'basics',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Short phrases, for example “Garden terrace”.',
    }),

    // Price and lease
    defineField({
      name: 'priceAmount',
      title: 'Price (₱)',
      type: 'number',
      group: 'pricing',
      description: 'In Philippine pesos. For rentals, enter the MONTHLY rent. Numbers only.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'pricingNotes',
      title: 'Pricing notes',
      type: 'text',
      rows: 2,
      group: 'pricing',
      description: 'Anything a buyer or renter should know about the price (for example, what is not included).',
    }),
    defineField({
      name: 'leaseTerms',
      title: 'Lease terms',
      type: 'object',
      group: 'pricing',
      hidden: hideUnlessRent,
      fields: [
        defineField({ name: 'minimumLeaseMonths', title: 'Minimum lease (months)', type: 'number', validation: (Rule) => Rule.min(1).integer() }),
        defineField({ name: 'securityDepositMonths', title: 'Security deposit (months of rent)', type: 'number', validation: (Rule) => Rule.min(0) }),
        defineField({ name: 'advanceRentMonths', title: 'Advance rent (months)', type: 'number', validation: (Rule) => Rule.min(0) }),
        defineField({
          name: 'furnishing',
          title: 'Furnishing',
          type: 'string',
          options: {
            list: [
              { title: 'Unfurnished', value: 'unfurnished' },
              { title: 'Semi-furnished', value: 'semi-furnished' },
              { title: 'Fully furnished', value: 'fully-furnished' },
            ],
          },
        }),
        defineField({ name: 'petsAllowed', title: 'Pets allowed', type: 'boolean' }),
        defineField({ name: 'utilitiesNote', title: 'Utilities note', type: 'string' }),
        defineField({ name: 'availableFrom', title: 'Available from', type: 'date' }),
      ],
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      group: 'pricing',
      description: 'Optional files or notes a buyer can request, such as a survey summary.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'propertyDocument',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'file', title: 'File (optional)', type: 'file' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    // Specifications
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      group: 'specs',
      description: 'Fill in only what applies. Residential lots usually need only the lot area.',
      fields: [
        defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'number', description: 'Enter 0 for a studio.', validation: (Rule) => Rule.min(0).integer() }),
        defineField({ name: 'bathrooms', title: 'Bathrooms', type: 'number', validation: (Rule) => Rule.min(0) }),
        defineField({ name: 'floorAreaSqm', title: 'Floor area (sqm)', type: 'number', validation: (Rule) => Rule.min(1) }),
        defineField({ name: 'lotAreaSqm', title: 'Lot area (sqm)', type: 'number', validation: (Rule) => Rule.min(1) }),
        defineField({ name: 'floors', title: 'Floors', type: 'number', validation: (Rule) => Rule.min(1).integer() }),
        defineField({ name: 'parkingSpaces', title: 'Parking spaces', type: 'number', validation: (Rule) => Rule.min(0).integer() }),
        defineField({
          name: 'condition',
          title: 'Condition',
          type: 'string',
          options: {
            list: [
              { title: 'Brand new', value: 'brand-new' },
              { title: 'Excellent', value: 'excellent' },
              { title: 'Good', value: 'good' },
              { title: 'Fair', value: 'fair' },
              { title: 'Needs renovation', value: 'needs-renovation' },
            ],
          },
        }),
      ],
    }),

    // Location
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'location',
      fields: [
        defineField({
          name: 'exactAddress',
          title: 'Exact address',
          type: 'string',
          description: 'Shown as text on the property page only. It is never used on the map.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'barangay', title: 'Barangay', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'city', title: 'City or municipality', type: 'string', initialValue: 'Baguio City', validation: (Rule) => Rule.required() }),
        defineField({ name: 'province', title: 'Province', type: 'string', initialValue: 'Benguet', validation: (Rule) => Rule.required() }),
        latitudeField(),
        longitudeField(),
      ],
    }),

    // Photos and plans
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      group: 'media',
      description: 'Use authentic photographs of this property. The first photo is the cover. Aim for 4–8.',
      of: [photoMember],
      validation: (Rule) => Rule.max(12).warning('More than 12 photos is hard to browse.'),
    }),
    defineField({
      name: 'floorPlans',
      title: 'Floor plans',
      type: 'array',
      group: 'media',
      description: 'One image per level, in order. Put the level in the caption, for example “Ground floor”.',
      of: [photoMember],
    }),

    // Relationships
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'reference',
      to: [{ type: 'neighborhood' }],
      group: 'people',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'agent',
      title: 'Assigned agent',
      type: 'reference',
      to: [{ type: 'agent' }],
      group: 'people',
      description: 'Required to publish. Tours and messages for this property go to this agent.',
      options: { filter: 'isActive == true' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backupKind',
      title: 'If the agent has no availability',
      type: 'string',
      group: 'people',
      options: {
        layout: 'radio',
        list: [
          { title: 'No backup', value: 'none' },
          { title: 'Offer a backup agent', value: 'agent' },
          { title: 'Send visitors to the central contact page', value: 'central' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backupAgent',
      title: 'Backup agent',
      type: 'reference',
      to: [{ type: 'agent' }],
      group: 'people',
      options: { filter: 'isActive == true' },
      hidden: ({ document }) => document?.backupKind !== 'agent',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const kind = (context.document as { backupKind?: string } | undefined)?.backupKind;
          return kind === 'agent' && !value ? 'Choose the backup agent.' : true;
        }),
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', purpose: 'purpose', status: 'status', media: 'images.0' },
    prepare: ({ title, purpose, status, media }) => ({
      title,
      subtitle: `${purpose === 'rent' ? 'For rent' : 'For sale'} · ${status ?? 'available'}`,
      media,
    }),
  },
});
