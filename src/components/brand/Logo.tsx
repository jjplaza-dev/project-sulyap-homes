/**
 * The Highland Window — Sulyap Homes & Leasing logo family (original artwork).
 *
 * An arched window/doorway, a flowing highland ridge, a negative-space "S"
 * cut through the window, and one small petal. Four variants:
 *   LogoSymbol      standalone mark
 *   LogoHorizontal  mark + "Sulyap" wordmark (primary logo)
 *   LogoSquare      compact square, for social profiles
 *   LogoMono        horizontal logo in a single color (`currentColor`)
 * The favicon is the static file `src/app/icon.svg`.
 *
 * Provide `title` when the logo is the only label of its context; omit it
 * (the default) inside a link that already carries an `aria-label`.
 */
import { useId } from 'react';

// Glyph geometry, 64 × 64 design grid.
const WINDOW = 'M12 56V28A20 20 0 0 1 52 28V56Z';
const S_CUT = 'M41 19C33 14 22 19 26 27C30 34 43 36 40 45C38 51 28 51 23 47';
const RIDGE_FILL = 'M12 47C19 41 24 43 30 39S41 33 46 37S50 38 52 36V56H12Z';
const RIDGE_LINE = 'M12 47C19 41 24 43 30 39S41 33 46 37S50 38 52 36';
const PETAL = 'M47 7C51 2 58 4 57 10C53 13 47 12 47 7Z';

interface GlyphProps {
  maskId: string;
  windowFill: string;
  petalFill: string;
  /** Omit for the single-color variant. */
  ridgeFill?: string;
}

function Glyph({ maskId, windowFill, petalFill, ridgeFill }: GlyphProps) {
  const mono = ridgeFill === undefined;
  return (
    <>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <path d={S_CUT} fill="none" stroke="#000" strokeWidth="3.6" strokeLinecap="round" />
          {mono ? (
            <path d={RIDGE_LINE} fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
          ) : null}
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <path d={WINDOW} style={{ fill: windowFill }} />
        {ridgeFill ? <path d={RIDGE_FILL} style={{ fill: ridgeFill }} /> : null}
      </g>
      <path d={PETAL} style={{ fill: petalFill }} />
    </>
  );
}

type Variant = 'color' | 'mono';

interface LogoProps {
  className?: string;
  /** Accessible name. Omit when decorative or inside a labelled link. */
  title?: string;
  variant?: Variant;
}

function useMaskId(): string {
  return `sulyap-mask-${useId().replace(/:/g, '')}`;
}

const colors = {
  color: {
    window: 'var(--pine-evergreen)',
    ridge: 'var(--highland-moss)',
    petal: 'var(--petal-berry)',
    text: 'var(--pine-evergreen)',
  },
  mono: {
    window: 'currentColor',
    ridge: undefined,
    petal: 'currentColor',
    text: 'currentColor',
  },
} as const;

function a11y(title?: string) {
  return title ? ({ role: 'img', 'aria-label': title } as const) : ({ 'aria-hidden': true } as const);
}

/** Standalone mark. */
export function LogoSymbol({ className, title, variant = 'color' }: LogoProps) {
  const maskId = useMaskId();
  const c = colors[variant];
  return (
    <svg viewBox="10 0 52 58" className={className} {...a11y(title)}>
      <Glyph maskId={maskId} windowFill={c.window} ridgeFill={c.ridge} petalFill={c.petal} />
    </svg>
  );
}

/** Primary horizontal logo: mark + "Sulyap" wordmark + descriptor. */
export function LogoHorizontal({ className, title, variant = 'color' }: LogoProps) {
  const maskId = useMaskId();
  const c = colors[variant];
  return (
    <svg viewBox="0 0 190 58" className={className} {...a11y(title)}>
      <g transform="translate(-8 0)">
        <Glyph maskId={maskId} windowFill={c.window} ridgeFill={c.ridge} petalFill={c.petal} />
      </g>
      <text
        x="62"
        y="34"
        fontSize="34"
        fontWeight="500"
        letterSpacing="-0.4"
        style={{ fill: c.text, fontFamily: 'var(--font-fraunces), Georgia, serif' }}
      >
        Sulyap
      </text>
      <text
        x="63"
        y="50"
        fontSize="9"
        fontWeight="600"
        letterSpacing="2.2"
        style={{ fill: c.text, fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
      >
        HOMES &amp; LEASING
      </text>
    </svg>
  );
}

/** Single-color horizontal logo; inherits `color` from its parent. */
export function LogoMono(props: Omit<LogoProps, 'variant'>) {
  return <LogoHorizontal {...props} variant="mono" />;
}

/** Compact square logo for social profiles and app icons. */
export function LogoSquare({ className, title }: Omit<LogoProps, 'variant'>) {
  const maskId = useMaskId();
  return (
    <svg viewBox="0 0 96 96" className={className} {...a11y(title)}>
      <rect width="96" height="96" rx="22" style={{ fill: 'var(--pine-evergreen)' }} />
      <g transform="translate(5.4 12.6) scale(1.2)">
        <Glyph
          maskId={maskId}
          windowFill="var(--cloud-mist)"
          ridgeFill="var(--highland-moss)"
          petalFill="var(--panagbenga-sunflower)"
        />
      </g>
    </svg>
  );
}
