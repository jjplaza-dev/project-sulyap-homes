/**
 * SAMPLE NEIGHBORHOODS.
 *
 * Real Baguio / Benguet area names are used ONLY as location labels. All
 * descriptive copy is generic editorial placeholder text, and every school,
 * clinic, shop, restaurant, café and landmark is a FICTIONAL name. Map points
 * are rough, area-level sample values.
 */
import type {
  EntityId,
  EstablishmentType,
  Landmark,
  NearbyEstablishment,
  Neighborhood,
  TransportInfo,
  TransportMode,
} from '@/domain';
import { placeholderImage } from './media';

export const neighborhoodIds = {
  auroraHill: 'nb-aurora-hill',
  camp7: 'nb-camp-7',
  loakan: 'nb-loakan',
  pacdal: 'nb-pacdal',
  quezonHill: 'nb-quezon-hill',
  laTrinidad: 'nb-la-trinidad',
} as const;

const SAMPLE_NOTE = 'Sample entry — a fictional place for the design preview.';

const est = (
  id: EntityId,
  name: string,
  type: EstablishmentType,
  note: string = SAMPLE_NOTE,
): NearbyEstablishment => ({ id, name, type, note });

const landmark = (id: EntityId, name: string, note: string = SAMPLE_NOTE): Landmark => ({
  id,
  name,
  type: 'landmark',
  note,
});

const transit = (id: EntityId, mode: TransportMode, description: string): TransportInfo => ({
  id,
  mode,
  description,
});

const photos = (slug: string, name: string) => [
  placeholderImage(`${slug}-photo-1`, 'neighborhood-streetscape', `${name} neighborhood`),
  placeholderImage(`${slug}-photo-2`, 'ridge-mist', `${name} surroundings`),
  placeholderImage(`${slug}-photo-3`, 'garden-terrace', `a residential garden in ${name}`),
];

const PLACEHOLDER_LOCATION = 'editorial placeholder, to be confirmed by Sulyap.';

export const neighborhoods: ReadonlyArray<Neighborhood> = [
  {
    id: neighborhoodIds.auroraHill,
    slug: 'aurora-hill',
    name: 'Aurora Hill',
    summary:
      'A residential hillside with pine-lined streets and homes that look out over the surrounding ridges.',
    lifestyle:
      'Mornings start slowly here. Neighbors know each other, daily errands are close by, and the evenings are cool and quiet.',
    generalLocation: `Within Baguio City, Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('aurora-hill', 'Aurora Hill'),
    publicMap: { lat: 16.4118, lng: 120.6045 },
    landmarks: [landmark('lm-aurora-1', 'Aurora Lookout Steps')],
    establishments: [
      est('est-aurora-1', 'Pinecrest Learning Hub', 'school'),
      est('est-aurora-2', 'Highland Family Clinic', 'hospital'),
      est('est-aurora-3', 'Hillside Market Arcade', 'shopping'),
      est('est-aurora-4', 'Burol Table', 'restaurant'),
      est('est-aurora-5', 'Morning Mist Coffee Bar', 'cafe'),
    ],
    transport: [
      transit('tr-aurora-1', 'walking', 'Short walks connect most homes to nearby shops and the main road. Sample description.'),
      transit('tr-aurora-2', 'jeepney', 'Jeepney routes pass along the main road toward the city center. Sample description.'),
      transit('tr-aurora-3', 'taxi', 'Taxis are easy to flag down near the market. Sample description.'),
    ],
  },
  {
    id: neighborhoodIds.camp7,
    slug: 'camp-7',
    name: 'Camp 7',
    summary:
      'A ridge-side community where garden lots, small cottages and family houses sit among tall pines.',
    lifestyle:
      'Residents trade a few extra minutes of travel for space, greenery and views. Weekends tend to be spent outdoors.',
    generalLocation: `Within Baguio City, Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('camp-7', 'Camp 7'),
    publicMap: { lat: 16.388, lng: 120.579 },
    landmarks: [landmark('lm-camp7-1', 'Pine Ridge Viewpoint')],
    establishments: [
      est('est-camp7-1', 'Ridgeview Primary School', 'school'),
      est('est-camp7-2', 'Camp Seven Health Post', 'hospital'),
      est('est-camp7-3', 'Roadside Fresh Market', 'shopping'),
      est('est-camp7-4', 'Hillcrest Grill', 'restaurant'),
    ],
    transport: [
      transit('tr-camp7-1', 'jeepney', 'Regular jeepney service runs along the main road. Sample description.'),
      transit('tr-camp7-2', 'private-vehicle', 'Many households rely on a car for hillside streets. Sample description.'),
    ],
  },
  {
    id: neighborhoodIds.loakan,
    slug: 'loakan',
    name: 'Loakan',
    summary:
      'An open, airy part of the city with wide skies, newer townhouse rows and larger parcels of land.',
    lifestyle:
      'A calm pace and room to grow. Good for households who want a quieter base without leaving the city.',
    generalLocation: `Within Baguio City, Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('loakan', 'Loakan'),
    publicMap: { lat: 16.3765, lng: 120.612 },
    landmarks: [landmark('lm-loakan-1', 'Loakan Pine Grove')],
    establishments: [
      est('est-loakan-1', 'Meadowlark Academy', 'school'),
      est('est-loakan-2', 'Loakan Care Clinic', 'hospital'),
      est('est-loakan-3', 'Valley Road Grocer', 'shopping'),
      est('est-loakan-4', 'Terraced Kitchen', 'restaurant'),
      est('est-loakan-5', 'Fogline Coffee', 'cafe'),
    ],
    transport: [
      transit('tr-loakan-1', 'jeepney', 'Jeepneys connect the area with the city center. Sample description.'),
      transit('tr-loakan-2', 'taxi', 'Taxis can be booked by phone or hailed on the main road. Sample description.'),
      transit('tr-loakan-3', 'private-vehicle', 'Parking is usually available on or near the property. Sample description.'),
    ],
  },
  {
    id: neighborhoodIds.pacdal,
    slug: 'pacdal',
    name: 'Pacdal',
    summary:
      'A lively residential area with condominiums, rental homes and cafés within an easy walk.',
    lifestyle:
      'Convenient and social. Popular with young professionals, couples and anyone who likes having cafés and shops close by.',
    generalLocation: `Within Baguio City, Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('pacdal', 'Pacdal'),
    publicMap: { lat: 16.4005, lng: 120.6165 },
    landmarks: [landmark('lm-pacdal-1', 'Pacdal Garden Walk')],
    establishments: [
      est('est-pacdal-1', 'Orchid Learning Center', 'school'),
      est('est-pacdal-2', 'Pacdal Wellness Clinic', 'hospital'),
      est('est-pacdal-3', 'Pacdal Corner Mart', 'shopping'),
      est('est-pacdal-4', 'Brasa & Fern', 'restaurant'),
      est('est-pacdal-5', 'Petal & Press Café', 'cafe'),
    ],
    transport: [
      transit('tr-pacdal-1', 'walking', 'Most daily needs are within walking distance. Sample description.'),
      transit('tr-pacdal-2', 'jeepney', 'Frequent jeepney routes pass nearby. Sample description.'),
      transit('tr-pacdal-3', 'bus', 'Buses to other cities can be boarded a short ride away. Sample description.'),
    ],
  },
  {
    id: neighborhoodIds.quezonHill,
    slug: 'quezon-hill',
    name: 'Quezon Hill',
    summary:
      'A sloping neighborhood of established homes and small condominium buildings with wide views of the valley.',
    lifestyle:
      'Settled and green, with long-time neighbors and a steady, residential feel.',
    generalLocation: `Within Baguio City, Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('quezon-hill', 'Quezon Hill'),
    publicMap: { lat: 16.4062, lng: 120.5875 },
    landmarks: [landmark('lm-quezon-1', 'Quezon Hill Overlook')],
    establishments: [
      est('est-quezon-1', 'Summit Park School', 'school'),
      est('est-quezon-2', 'Quezon Hill Medical Annex', 'hospital'),
      est('est-quezon-3', 'Slope Street Market', 'shopping'),
      est('est-quezon-4', 'Hillside Noodle House', 'restaurant'),
      est('est-quezon-5', 'Cloudline Coffee', 'cafe'),
    ],
    transport: [
      transit('tr-quezon-1', 'jeepney', 'Jeepneys run along the main road and into the city center. Sample description.'),
      transit('tr-quezon-2', 'taxi', 'Taxis are available from the nearby stand. Sample description.'),
    ],
  },
  {
    id: neighborhoodIds.laTrinidad,
    slug: 'la-trinidad',
    name: 'La Trinidad',
    summary:
      'A nearby community in Benguet with terraced surroundings, a town-center feel and more affordable lots and apartments.',
    lifestyle:
      'A little further out, with a small-town rhythm, open views and everyday needs close at hand.',
    generalLocation: `A nearby community in Benguet — ${PLACEHOLDER_LOCATION}`,
    photos: photos('la-trinidad', 'La Trinidad'),
    publicMap: { lat: 16.456, lng: 120.589 },
    landmarks: [landmark('lm-latrinidad-1', 'Valley Terrace Walk')],
    establishments: [
      est('est-latrinidad-1', 'Valley View Elementary', 'school'),
      est('est-latrinidad-2', 'Trinidad Community Clinic', 'hospital'),
      est('est-latrinidad-3', 'Terrace Market Hall', 'shopping'),
      est('est-latrinidad-4', 'Harvest Table', 'restaurant'),
      est('est-latrinidad-5', 'Terrace Brew', 'cafe'),
    ],
    transport: [
      transit('tr-latrinidad-1', 'jeepney', 'Jeepney routes link the town center with Baguio City. Sample description.'),
      transit('tr-latrinidad-2', 'bus', 'Buses stop along the main highway. Sample description.'),
      transit('tr-latrinidad-3', 'private-vehicle', 'A vehicle makes it easier to reach hillside homes. Sample description.'),
    ],
  },
];
