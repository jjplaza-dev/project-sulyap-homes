'use client';

import { cx } from '@/lib/cx';

export interface MapMarker {
  id: string;
  /** Listing title. Never an address. */
  label: string;
  lat: number;
  lng: number;
}

export interface MapAreaLabel {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface ApproxMapProps {
  markers: ReadonlyArray<MapMarker>;
  areas?: ReadonlyArray<MapAreaLabel>;
  selectedId?: string | null;
  /** When omitted the map is a non-interactive illustration. */
  onSelect?: (id: string) => void;
  /** Accessible description, used when the map is non-interactive. */
  ariaLabel?: string;
  className?: string;
}

/**
 * PHASE 2 PREVIEW MAP: an original stylized illustration, NOT Google Maps.
 * Marker positions come from the manually entered, deliberately approximate
 * `publicMap` points only; the map never receives an address.
 */
export function ApproxMap({ markers, areas = [], selectedId, onSelect, ariaLabel, className }: ApproxMapProps) {
  const points = [...markers, ...areas];
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat0 = points.length ? Math.min(...lats) : 16.38;
  const maxLat0 = points.length ? Math.max(...lats) : 16.46;
  const minLng0 = points.length ? Math.min(...lngs) : 120.57;
  const maxLng0 = points.length ? Math.max(...lngs) : 120.63;
  const padLat = Math.max((maxLat0 - minLat0) * 0.14, 0.006);
  const padLng = Math.max((maxLng0 - minLng0) * 0.14, 0.006);
  const minLat = minLat0 - padLat;
  const maxLat = maxLat0 + padLat;
  const minLng = minLng0 - padLng;
  const maxLng = maxLng0 + padLng;

  const place = (lat: number, lng: number) => ({
    left: `${((lng - minLng) / (maxLng - minLng)) * 100}%`,
    top: `${((maxLat - lat) / (maxLat - minLat)) * 100}%`,
  });

  const interactive = Boolean(onSelect);

  return (
    <div
      className={cx('relative aspect-[6/5] w-full overflow-hidden rounded-lg border border-pine-evergreen/12 bg-moss-tint', className)}
      {...(interactive ? {} : { role: 'img', 'aria-label': ariaLabel ?? 'Approximate map preview' })}
    >
      <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 size-full">
        <rect width="600" height="500" style={{ fill: 'var(--moss-tint)' }} />
        <path d="M0 400C90 360 170 410 260 380S430 330 600 380V500H0Z" style={{ fill: 'var(--highland-moss)', opacity: 0.28 }} />
        <path d="M0 110C110 60 200 130 320 90S520 40 600 100V0H0Z" style={{ fill: 'var(--highland-moss)', opacity: 0.2 }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-20 ${70 + i * 80}C120 ${20 + i * 80} 220 ${120 + i * 80} 330 ${60 + i * 80}S520 ${20 + i * 80} 640 ${80 + i * 80}`}
            fill="none"
            style={{ stroke: 'rgb(40 72 59 / 0.1)', strokeWidth: 1.5 }}
          />
        ))}
        <path d="M0 330C120 300 200 360 320 320S500 250 600 280" fill="none" style={{ stroke: 'var(--cloud-mist)', strokeWidth: 9, strokeLinecap: 'round' }} />
        <path d="M180 0C215 120 150 240 250 340S335 460 300 500" fill="none" style={{ stroke: 'var(--cloud-mist)', strokeWidth: 7, strokeLinecap: 'round' }} />
        <path d="M430 0C400 90 470 170 430 260S520 400 540 500" fill="none" style={{ stroke: 'var(--cloud-mist)', strokeWidth: 5, strokeLinecap: 'round' }} />
      </svg>

      <span className="absolute left-3 top-3 z-10 rounded-sm border border-dashed border-petal-berry/60 bg-surface px-2 py-1 text-xs font-medium text-berry-deep">
        Approximate locations — preview
      </span>

      {areas.map((area) => (
        <span
          key={area.id}
          aria-hidden="true"
          style={place(area.lat, area.lng)}
          className="pointer-events-none absolute -translate-x-1/2 translate-y-4 text-xs font-medium tracking-wide text-pine-soft"
        >
          {area.name}
        </span>
      ))}

      {markers.map((marker) => {
        const selected = marker.id === selectedId;
        const dot = (
          <span
            className={cx(
              'block rounded-full border-2 shadow-sm transition-all duration-200 motion-reduce:transition-none',
              selected
                ? 'size-6 border-pine-evergreen bg-panagbenga-sunflower'
                : 'size-4 border-cloud-mist bg-pine-evergreen',
            )}
          />
        );

        return interactive ? (
          <button
            key={marker.id}
            type="button"
            aria-pressed={selected}
            aria-label={`${marker.label}, approximate location`}
            onClick={() => onSelect?.(marker.id)}
            style={place(marker.lat, marker.lng)}
            className={cx(
              'absolute inline-flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md',
              selected ? 'z-10' : 'z-[5]',
            )}
          >
            {dot}
          </button>
        ) : (
          <span
            key={marker.id}
            aria-hidden="true"
            style={place(marker.lat, marker.lng)}
            className="absolute z-[5] -translate-x-1/2 -translate-y-1/2"
          >
            {dot}
          </span>
        );
      })}
    </div>
  );
}
