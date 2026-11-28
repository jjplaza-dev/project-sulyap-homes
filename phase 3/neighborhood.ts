import { defineArrayMember, defineField, defineType } from 'sanity';
import { latitudeField, longitudeField, photoMember } from './shared';

export const neighborhood = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required().max(60) }),
    defineField({
      name: 'slug',
      title: 'Web address (slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(300) }),
    defineField({ name: 'lifestyle', title: 'Daily life', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(400) }),
    defineField({
      name: 'generalLocation',
      title: 'General location',
      type: 'string',
      description: 'Where it sits in or around Baguio City, in plain words.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [photoMember],
      description: 'Streetscape, surroundings, residential scenes. The first photo is the cover.',
    }),
    latitudeField(),
    longitudeField(),
    defineField({
      name: 'landmarks',
      title: 'Landmarks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'landmark',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'note', title: 'Note', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'note' } },
        }),
      ],
    }),
    defineField({
      name: 'establishments',
      title: 'Nearby places',
      type: 'array',
      description: 'Schools, clinics, shops, restaurants and cafés. Use real names only once confirmed.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'establishment',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'School', value: 'school' },
                  { title: 'Hospital or clinic', value: 'hospital' },
                  { title: 'Shopping', value: 'shopping' },
                  { title: 'Restaurant', value: 'restaurant' },
                  { title: 'Café', value: 'cafe' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'note', title: 'Note', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'type' } },
        }),
      ],
    }),
    defineField({
      name: 'transport',
      title: 'Getting around',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'transportEntry',
          fields: [
            defineField({
              name: 'mode',
              title: 'Mode',
              type: 'string',
              options: {
                list: [
                  { title: 'On foot', value: 'walking' },
                  { title: 'Jeepney', value: 'jeepney' },
                  { title: 'Taxi', value: 'taxi' },
                  { title: 'Bus', value: 'bus' },
                  { title: 'Private vehicle', value: 'private-vehicle' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'mode', subtitle: 'description' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'generalLocation', media: 'photos.0' },
  },
});
