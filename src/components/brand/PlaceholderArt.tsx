/**
 * Original SVG placeholder art that stands in for photography in Phase 2.
 *
 * Every `PlaceholderArtKey` has its own scene: ridges, window, the five
 * category buildings, four interiors, garden terrace, street frontage, two
 * floor plans, neighborhood streetscape, agent portrait and the logo.
 * Compositions keep their subject near the centre because containers crop with
 * `slice`. Adding a key to the union means adding a scene here.
 */
import { useId, type ReactNode } from 'react';
import type { PlaceholderArtKey } from '@/domain';
import { cx } from '@/lib/cx';
import { LogoHorizontal } from '@/components/brand/Logo';

const v = (token: string) => `var(--${token})`;

function Sky({ id, tone, width = 300, height = 200 }: { id: string; tone: 'dawn' | 'day' | 'mist'; width?: number; height?: number }) {
  const bottom = tone === 'dawn' ? 'sunflower-soft' : tone === 'mist' ? 'cloud-mist' : 'surface';
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: v('moss-tint') }} />
          <stop offset="1" style={{ stopColor: v(bottom) }} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={`url(#${id}-sky)`} />
    </>
  );
}

function Ridges({ front = true }: { front?: boolean }) {
  return (
    <>
      <path d="M0 120C40 96 80 108 120 90S200 78 240 96S280 90 300 84V200H0Z" style={{ fill: v('highland-moss'), opacity: 0.45 }} />
      <path d="M0 140C50 118 90 132 140 116S220 104 260 122S290 120 300 114V200H0Z" style={{ fill: v('highland-moss'), opacity: 0.8 }} />
      {front ? <path d="M0 162C60 146 110 158 170 144S250 138 300 150V200H0Z" style={{ fill: v('pine-evergreen') }} /> : null}
    </>
  );
}

function Pine({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g style={{ fill: v('pine-evergreen') }}>
      <path d={`M${x} ${y - 30 * s}L${x - 8 * s} ${y - 14 * s}H${x + 8 * s}Z`} />
      <path d={`M${x} ${y - 20 * s}L${x - 11 * s} ${y - 2 * s}H${x + 11 * s}Z`} />
      <rect x={x - 1.5 * s} y={y - 2 * s} width={3 * s} height={6 * s} />
    </g>
  );
}

const body = (fill: string) => ({ fill: v(fill), stroke: v('pine-evergreen'), strokeWidth: 1.4 });
const win = { fill: v('sunflower-soft'), stroke: v('pine-evergreen'), strokeWidth: 1 };

/** Blueprint-style paper with a faint grid, shared by both floor-plan scenes. */
function PlanBase({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" style={{ stroke: 'rgb(40 72 59 / 0.07)', strokeWidth: 1 }} />
        </pattern>
      </defs>
      <rect width="280" height="200" style={{ fill: v('surface') }} />
      <rect width="280" height="200" fill={`url(#${id}-grid)`} />
    </>
  );
}

function PlanLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      style={{
        fill: v('pine-evergreen'),
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        fontSize: 9,
        fontWeight: 600,
      }}
    >
      {text}
    </text>
  );
}

interface Scene {
  viewBox: string;
  node: ReactNode;
}

function scene(art: PlaceholderArtKey, id: string): Scene {
  const landscape = '0 0 300 200';

  switch (art) {
    case 'ridge-dawn':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="dawn" />
            <circle cx="214" cy="84" r="24" style={{ fill: v('panagbenga-sunflower'), opacity: 0.9 }} />
            <Ridges />
            <Pine x={44} y={162} s={1.2} />
            <Pine x={262} y={158} />
            <Pine x={280} y={168} s={1.3} />
          </>
        ),
      };

    case 'category-house':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            <rect x="86" y="150" width="128" height="5" style={{ fill: v('highland-moss') }} />
            <rect x="112" y="112" width="76" height="40" style={body('surface')} />
            <path d="M103 114L150 84L197 114Z" style={{ fill: v('pine-evergreen') }} />
            <rect x="171" y="88" width="8" height="16" style={{ fill: v('pine-evergreen') }} />
            <rect x="143" y="128" width="14" height="24" rx="1" style={{ fill: v('petal-berry') }} />
            <rect x="120" y="124" width="14" height="14" style={win} />
            <rect x="166" y="124" width="14" height="14" style={win} />
            <Pine x={92} y={158} s={1.2} />
            <Pine x={212} y={160} />
          </>
        ),
      };

    case 'category-condominium':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            <rect x="86" y="92" width="34" height="60" style={body('moss-tint')} />
            <rect x="122" y="42" width="56" height="110" style={body('surface')} />
            <rect x="118" y="38" width="64" height="6" style={{ fill: v('pine-evergreen') }} />
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={130 + col * 15}
                  y={52 + row * 18}
                  width="9"
                  height="11"
                  style={{ fill: v((row + col) % 4 === 0 ? 'panagbenga-sunflower' : 'sunflower-soft') }}
                />
              )),
            )}
            <rect x="141" y="136" width="18" height="16" style={{ fill: v('petal-berry') }} />
            <Pine x={206} y={160} s={1.1} />
          </>
        ),
      };

    case 'category-apartment':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            <rect x="86" y="84" width="128" height="68" style={body('surface')} />
            <rect x="82" y="80" width="136" height="6" style={{ fill: v('pine-evergreen') }} />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <g key={`${row}-${col}`}>
                  <rect x={96 + col * 22} y={92 + row * 19} width="10" height="11" style={win} />
                  <path d={`M${94 + col * 22} ${105 + row * 19}H${108 + col * 22}`} style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
                </g>
              )),
            )}
            <rect x="141" y="136" width="18" height="16" style={{ fill: v('petal-berry') }} />
            <Pine x={68} y={162} />
            <Pine x={236} y={160} s={1.2} />
          </>
        ),
      };

    case 'category-townhouse':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            {[
              { x: 78, fill: 'moss-tint', roof: 'pine-evergreen' },
              { x: 122, fill: 'surface', roof: 'berry-deep' },
              { x: 166, fill: 'sunflower-soft', roof: 'pine-evergreen' },
            ].map((unit) => (
              <g key={unit.x}>
                <rect x={unit.x} y="110" width="44" height="42" style={body(unit.fill)} />
                <path d={`M${unit.x - 3} 112L${unit.x + 22} 90L${unit.x + 47} 112Z`} style={{ fill: v(unit.roof) }} />
                <rect x={unit.x + 17} y="132" width="10" height="20" style={{ fill: v('petal-berry') }} />
                <rect x={unit.x + 6} y="121" width="9" height="9" style={win} />
                <rect x={unit.x + 29} y="121" width="9" height="9" style={win} />
              </g>
            ))}
            <Pine x={58} y={160} s={1.1} />
            <Pine x={230} y={162} />
          </>
        ),
      };

    case 'category-lot':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="dawn" />
            <circle cx="222" cy="78" r="20" style={{ fill: v('panagbenga-sunflower'), opacity: 0.9 }} />
            <Ridges front={false} />
            <path d="M0 150C60 138 120 150 180 140S260 136 300 144V200H0Z" style={{ fill: v('pine-evergreen') }} />
            <path d="M70 168L150 140L240 156L170 186Z" style={{ fill: v('highland-moss'), opacity: 0.7, stroke: v('pine-evergreen'), strokeWidth: 1.4, strokeDasharray: '5 4' }} />
            {[
              [70, 168],
              [150, 140],
              [240, 156],
              [170, 186],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x - 1.5} y={y - 10} width="3" height="12" style={{ fill: v('cloud-mist') }} />
                <rect x={x - 1.5} y={y - 12} width="3" height="3" style={{ fill: v('panagbenga-sunflower') }} />
              </g>
            ))}
            <Pine x={34} y={160} s={1.2} />
            <Pine x={272} y={152} />
          </>
        ),
      };

    case 'neighborhood-streetscape':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            {[
              { x: 30, w: 44, h: 34, c: 'surface', r: 'pine-evergreen' },
              { x: 84, w: 38, h: 40, c: 'moss-tint', r: 'berry-deep' },
              { x: 196, w: 46, h: 36, c: 'sunflower-soft', r: 'pine-evergreen' },
              { x: 250, w: 36, h: 32, c: 'surface', r: 'berry-deep' },
            ].map((h) => (
              <g key={h.x}>
                <rect x={h.x} y={152 - h.h} width={h.w} height={h.h} style={body(h.c)} />
                <path d={`M${h.x - 3} ${154 - h.h}L${h.x + h.w / 2} ${130 - h.h}L${h.x + h.w + 3} ${154 - h.h}Z`} style={{ fill: v(h.r) }} />
                <rect x={h.x + h.w / 2 - 4} y={152 - 16} width="8" height="16" style={{ fill: v('petal-berry') }} />
              </g>
            ))}
            <Pine x={140} y={156} s={1.4} />
            <Pine x={170} y={158} s={1.1} />
            <path d="M0 168H300V200H0Z" style={{ fill: v('pine-soft'), opacity: 0.85 }} />
            <path d="M0 184H300" style={{ stroke: v('cloud-mist'), strokeWidth: 2, strokeDasharray: '16 12' }} />
          </>
        ),
      };

    case 'window-arch':
      return {
        viewBox: '0 0 200 250',
        node: (
          <>
            <Sky id={id} tone="dawn" width={200} height={250} />
            <circle cx="128" cy="124" r="13" style={{ fill: v('panagbenga-sunflower') }} />
            <path d="M40 176C70 156 100 170 130 150S150 146 160 144V224H40Z" style={{ fill: v('highland-moss') }} />
            <path d="M40 196C80 182 120 196 160 178V224H40Z" style={{ fill: v('pine-evergreen') }} />
            <path d="M100 56V224M40 146H160" style={{ stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <path d="M40 224V114A60 60 0 0 1 160 114V224Z" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 8 }} />
          </>
        ),
      };

    case 'agent-portrait':
      return {
        viewBox: '0 0 200 250',
        node: (
          <>
            <rect width="200" height="250" style={{ fill: v('moss-tint') }} />
            <path d="M44 250V110A56 56 0 0 1 156 110V250Z" style={{ fill: v('sunflower-soft') }} />
            <path d="M0 196C50 176 90 186 140 166S190 170 200 166V250H0Z" style={{ fill: v('highland-moss'), opacity: 0.5 }} />
            <circle cx="100" cy="104" r="32" style={{ fill: v('highland-moss') }} />
            <path d="M38 250C38 190 162 190 162 250Z" style={{ fill: v('pine-evergreen') }} />
            <path d="M84 200L100 224L116 200Z" style={{ fill: v('cloud-mist') }} />
          </>
        ),
      };

    case 'interior-living':
      return {
        viewBox: landscape,
        node: (
          <>
            <rect width="300" height="200" style={{ fill: v('surface') }} />
            <rect y="148" width="300" height="52" style={{ fill: v('moss-tint') }} />
            <path d="M96 148V70A40 40 0 0 1 176 70V148Z" style={{ fill: v('sunflower-soft') }} />
            <path d="M96 128C116 114 136 124 156 110S170 108 176 106V148H96Z" style={{ fill: v('highland-moss'), opacity: 0.8 }} />
            <path d="M96 140C120 130 150 140 176 128V148H96Z" style={{ fill: v('pine-evergreen') }} />
            <path d="M136 30V148M96 92H176" style={{ stroke: v('pine-evergreen'), strokeWidth: 2 }} />
            <path d="M96 148V70A40 40 0 0 1 176 70V148Z" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 4 }} />
            <ellipse cx="125" cy="174" rx="82" ry="12" style={{ fill: v('sunflower-soft') }} />
            <rect x="60" y="106" width="130" height="46" rx="8" style={{ fill: v('highland-moss') }} />
            <rect x="72" y="118" width="50" height="26" rx="6" style={{ fill: v('moss-deep') }} />
            <rect x="128" y="118" width="50" height="26" rx="6" style={{ fill: v('moss-deep') }} />
            <path d="M236 150V98" style={{ stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <path d="M222 98H250L244 78H228Z" style={{ fill: v('panagbenga-sunflower') }} />
            <rect x="226" y="148" width="20" height="4" style={{ fill: v('pine-evergreen') }} />
            <ellipse cx="270" cy="126" rx="8" ry="16" style={{ fill: v('highland-moss') }} />
            <rect x="264" y="138" width="12" height="14" style={{ fill: v('petal-berry') }} />
          </>
        ),
      };

    case 'interior-kitchen':
      return {
        viewBox: landscape,
        node: (
          <>
            <rect width="300" height="200" style={{ fill: v('surface') }} />
            <rect y="150" width="300" height="50" style={{ fill: v('moss-tint') }} />
            <rect x="14" y="24" width="104" height="46" style={body('moss-tint')} />
            <path d="M66 24V70M58 50H62M70 50H74" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
            <path d="M140 102V62A25 25 0 0 1 190 62V102Z" style={{ fill: v('sunflower-soft'), stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <path d="M140 92C154 84 168 90 190 80V102H140Z" style={{ fill: v('highland-moss'), opacity: 0.8 }} />
            <rect x="10" y="104" width="196" height="6" style={{ fill: v('pine-evergreen') }} />
            <rect x="14" y="110" width="188" height="42" style={body('highland-moss')} />
            <path d="M62 110V152M110 110V152M158 110V152" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
            <rect x="170" y="128" width="104" height="6" style={{ fill: v('pine-evergreen') }} />
            <rect x="176" y="134" width="92" height="34" style={body('surface')} />
            {[196, 222, 248].map((x) => (
              <g key={x}>
                <circle cx={x} cy="180" r="8" style={{ fill: v('petal-berry') }} />
                <path d={`M${x} 188V198`} style={{ stroke: v('pine-evergreen'), strokeWidth: 2 }} />
              </g>
            ))}
            {[212, 244].map((x) => (
              <g key={x}>
                <path d={`M${x} 0V92`} style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
                <path d={`M${x - 12} 106A12 12 0 0 1 ${x + 12} 106Z`} style={{ fill: v('panagbenga-sunflower') }} transform="translate(0 -14)" />
              </g>
            ))}
          </>
        ),
      };

    case 'interior-bedroom':
      return {
        viewBox: '0 0 200 250',
        node: (
          <>
            <rect width="200" height="250" style={{ fill: v('surface') }} />
            <rect y="206" width="200" height="44" style={{ fill: v('moss-tint') }} />
            <path d="M70 112V62A30 30 0 0 1 130 62V112Z" style={{ fill: v('sunflower-soft') }} />
            <path d="M70 100C84 92 100 98 114 88S126 86 130 84V112H70Z" style={{ fill: v('highland-moss'), opacity: 0.8 }} />
            <path d="M100 32V112" style={{ stroke: v('pine-evergreen'), strokeWidth: 2 }} />
            <path d="M70 112V62A30 30 0 0 1 130 62V112Z" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 4 }} />
            <rect x="38" y="112" width="124" height="46" rx="6" style={{ fill: v('pine-evergreen') }} />
            <rect x="42" y="148" width="116" height="58" rx="6" style={body('surface')} />
            <rect x="42" y="176" width="116" height="30" rx="4" style={{ fill: v('highland-moss') }} />
            <rect x="52" y="134" width="42" height="22" rx="8" style={body('sunflower-soft')} />
            <rect x="106" y="134" width="42" height="22" rx="8" style={body('sunflower-soft')} />
            {[12, 164].map((x) => (
              <g key={x}>
                <rect x={x} y="176" width="24" height="30" style={{ fill: v('moss-deep') }} />
                <path d={`M${x + 12} 176V162`} style={{ stroke: v('pine-evergreen'), strokeWidth: 2 }} />
                <path d={`M${x + 4} 162H${x + 20}L${x + 17} 150H${x + 7}Z`} style={{ fill: v('panagbenga-sunflower') }} />
              </g>
            ))}
          </>
        ),
      };

    case 'interior-bath':
      return {
        viewBox: '0 0 200 250',
        node: (
          <>
            <rect width="200" height="250" style={{ fill: v('surface') }} />
            <path
              d="M0 40H200M0 80H200M0 120H200M0 160H200M0 200H200M40 0V212M80 0V212M120 0V212M160 0V212"
              style={{ stroke: 'rgb(40 72 59 / 0.1)', strokeWidth: 1 }}
            />
            <rect y="212" width="200" height="38" style={{ fill: v('moss-tint') }} />
            <ellipse cx="100" cy="70" rx="34" ry="44" style={{ fill: v('sunflower-soft') }} />
            <path d="M72 84C86 74 102 82 128 72V96C110 106 88 106 72 96Z" style={{ fill: v('highland-moss'), opacity: 0.8 }} />
            <ellipse cx="100" cy="70" rx="34" ry="44" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 4 }} />
            <rect x="36" y="140" width="128" height="12" style={{ fill: v('pine-evergreen') }} />
            <rect x="44" y="152" width="112" height="60" style={body('highland-moss')} />
            <path d="M100 152V212" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
            <circle cx="92" cy="182" r="2.5" style={{ fill: v('pine-evergreen') }} />
            <circle cx="108" cy="182" r="2.5" style={{ fill: v('pine-evergreen') }} />
            <ellipse cx="100" cy="140" rx="28" ry="8" style={body('surface')} />
            <path d="M100 140V122H110" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 3, strokeLinecap: 'round' }} />
            <rect x="14" y="96" width="30" height="3" style={{ fill: v('pine-evergreen') }} />
            <rect x="18" y="99" width="22" height="36" style={{ fill: v('petal-berry') }} />
          </>
        ),
      };

    case 'garden-terrace':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges front={false} />
            <rect y="150" width="300" height="50" style={{ fill: v('pine-soft'), opacity: 0.9 }} />
            <path d="M0 164H300M0 180H300" style={{ stroke: v('cloud-mist'), strokeWidth: 1, opacity: 0.4 }} />
            <path d="M0 126H300M0 138H300" style={{ stroke: v('pine-evergreen'), strokeWidth: 2.5 }} />
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} x={i * 30} y="120" width="4" height="30" style={{ fill: v('pine-evergreen') }} />
            ))}
            {[60, 200].map((x) => (
              <g key={x}>
                <rect x={x} y="112" width="44" height="12" style={{ fill: v('pine-evergreen') }} />
                {[6, 16, 26, 36].map((dx) => (
                  <circle key={dx} cx={x + dx} cy={106 - (dx % 12)} r="5" style={{ fill: v('petal-berry') }} />
                ))}
              </g>
            ))}
            <ellipse cx="150" cy="160" rx="30" ry="6" style={body('surface')} />
            <path d="M150 166V190" style={{ stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <rect x="108" y="152" width="14" height="30" rx="3" style={{ fill: v('highland-moss') }} />
            <rect x="178" y="152" width="14" height="30" rx="3" style={{ fill: v('highland-moss') }} />
          </>
        ),
      };

    case 'street-frontage':
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="day" />
            <Ridges />
            <rect x="110" y="92" width="80" height="40" style={body('moss-tint')} />
            <path d="M102 94L150 68L198 94Z" style={{ fill: v('pine-evergreen') }} />
            <rect x="142" y="106" width="16" height="26" style={{ fill: v('petal-berry') }} />
            <Pine x={44} y={152} s={1.3} />
            <Pine x={262} y={150} s={1.2} />
            <rect y="124" width="300" height="34" style={body('surface')} />
            <rect x="128" y="110" width="10" height="48" style={{ fill: v('pine-evergreen') }} />
            <rect x="162" y="110" width="10" height="48" style={{ fill: v('pine-evergreen') }} />
            <rect x="138" y="132" width="24" height="26" style={{ fill: v('pine-soft') }} />
            <rect y="158" width="300" height="42" style={{ fill: v('pine-soft'), opacity: 0.85 }} />
            <path d="M0 180H300" style={{ stroke: v('cloud-mist'), strokeWidth: 2, strokeDasharray: '16 12' }} />
          </>
        ),
      };

    case 'floor-plan-compact':
      return {
        viewBox: '0 0 280 200',
        node: (
          <>
            <PlanBase id={id} />
            <rect x="30" y="26" width="220" height="148" style={{ fill: v('moss-tint'), fillOpacity: 0.45, stroke: v('pine-evergreen'), strokeWidth: 4 }} />
            <path d="M150 26V104H250M150 104V174M204 104V174" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <path d="M150 112A14 14 0 0 1 164 98M204 148A14 14 0 0 0 190 134M30 100H60" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.2 }} />
            <PlanLabel x={90} y={104} text="Living" />
            <PlanLabel x={200} y={68} text="Bedroom" />
            <PlanLabel x={177} y={144} text="Bath" />
            <PlanLabel x={228} y={144} text="Closet" />
            <path d="M30 188H250M30 184V192M250 184V192" style={{ stroke: v('pine-soft'), strokeWidth: 1 }} />
          </>
        ),
      };

    case 'floor-plan-multilevel':
      return {
        viewBox: '0 0 280 200',
        node: (
          <>
            <PlanBase id={id} />
            <rect x="34" y="30" width="212" height="140" style={{ fill: v('moss-tint'), fillOpacity: 0.45, stroke: v('pine-evergreen'), strokeWidth: 4 }} />
            <path d="M78 30V104H246M140 104V170M34 104H78" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 3 }} />
            <path d="M34 42H78M34 54H78M34 66H78M34 78H78M34 90H78" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.4 }} />
            <path d="M78 116A14 14 0 0 1 92 102M140 150A14 14 0 0 0 126 136" fill="none" style={{ stroke: v('pine-evergreen'), strokeWidth: 1.2 }} />
            <PlanLabel x={56} y={124} text="Stairs" />
            <PlanLabel x={162} y={68} text="Bedroom" />
            <PlanLabel x={90} y={142} text="Bedroom" />
            <PlanLabel x={193} y={142} text="Bath" />
            <PlanLabel x={110} y={100} text="Hall" />
          </>
        ),
      };

    // Misty ridge: used for `ridge-mist` and as the fallback for any new key.
    default:
      return {
        viewBox: landscape,
        node: (
          <>
            <Sky id={id} tone="mist" />
            <Ridges />
            <rect y="108" width="300" height="14" style={{ fill: v('cloud-mist'), opacity: 0.5 }} />
            <rect y="130" width="300" height="12" style={{ fill: v('cloud-mist'), opacity: 0.4 }} />
            <Pine x={52} y={164} s={1.2} />
            <Pine x={252} y={160} />
          </>
        ),
      };
  }
}

interface PlaceholderArtProps {
  art: PlaceholderArtKey;
  /** Empty string (or omitted) marks the art decorative. */
  alt?: string;
  className?: string;
}

export function PlaceholderArt({ art, alt, className }: PlaceholderArtProps) {
  const id = `art-${useId().replace(/:/g, '')}`;

  if (art === 'brand-logo') {
    return <LogoHorizontal className={cx('h-full w-full', className)} title={alt || undefined} />;
  }

  const { viewBox, node } = scene(art, id);
  const a11y = alt ? ({ role: 'img', 'aria-label': alt } as const) : ({ 'aria-hidden': true } as const);

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={cx('block h-full w-full', className)}
      {...a11y}
    >
      {node}
    </svg>
  );
}
