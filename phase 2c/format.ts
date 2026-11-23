import type { IsoDateString, IsoDateTimeString, Price, Property, TimeOfDayString } from '@/domain';

const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-PH');

const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'Asia/Manila',
});

const weekdayDateFormatter = new Intl.DateTimeFormat('en-PH', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'Asia/Manila',
});

/** `₱15,000` */
export function formatPeso(amount: number): string {
  return pesoFormatter.format(amount);
}

/** `₱12,800,000` for a sale, `₱15,000 / month` for a rental. */
export function formatPrice(price: Price): string {
  const base = formatPeso(price.amount);
  return price.period === 'month' ? `${base} / month` : base;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** `210 sqm` */
export function formatArea(sqm: number): string {
  return `${numberFormatter.format(sqm)} sqm`;
}

/** `4 beds · 3 baths · 210 sqm`; lots read `2,400 sqm lot`. */
export function formatSpecsSummary(property: Property): string {
  const { bedrooms, bathrooms, floorAreaSqm, lotAreaSqm } = property.specs;
  const parts: string[] = [];
  if (bedrooms !== undefined) {
    parts.push(bedrooms === 0 ? 'Studio' : `${bedrooms} ${bedrooms === 1 ? 'bed' : 'beds'}`);
  }
  if (bathrooms !== undefined) {
    parts.push(`${bathrooms} ${bathrooms === 1 ? 'bath' : 'baths'}`);
  }
  if (floorAreaSqm !== undefined) {
    parts.push(formatArea(floorAreaSqm));
  } else if (lotAreaSqm !== undefined) {
    parts.push(`${formatArea(lotAreaSqm)} lot`);
  }
  return parts.join(' · ');
}

/** `November 10, 2026` (Philippine time). */
export function formatDate(value: IsoDateTimeString | IsoDateString): string {
  return dateFormatter.format(new Date(value));
}

/** `Thu, Nov 19` for a `YYYY-MM-DD` slot date. */
export function formatSlotDate(date: IsoDateString): string {
  return weekdayDateFormatter.format(new Date(`${date}T00:00:00+08:00`));
}

/** `14:30` → `2:30 PM` */
export function formatTime(time: TimeOfDayString): string {
  const [hourPart = '0', minutePart = '00'] = time.split(':');
  const hour = Number(hourPart);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour}:${minutePart} ${suffix}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`;
}
