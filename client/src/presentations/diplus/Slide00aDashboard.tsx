import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: '02 · Dashboard · Mando único Undis',
    section: 'Sección 0 · Plataforma',
    pretitle: 'Una vista, toda la mina',
    headline1: 'Centro de control',
    headline2: 'en tiempo real.',
    desc:
      'Telemetría, posición y eventos de superficie y subterráneo en un solo dashboard. Cada operación con su lente — la mina, en una mirada.',
    appName: 'Undis · OS',
    appPath: '/operations/live',
    appUser: 'osmar.p',
    appTime: '09:42 · GMT-5',
    statusLive: 'live',
    kpis: [
      ['Flota activa',     '22',     'de 24 · 91.7%'],
      ['Combustible 24h',  '8,420',  'gal · ↘ −3.2%'],
      ['Ciclos hoy',       '142',    'en curso · 12'],
      ['OEE',              '78%',    'objetivo 80%'],
      ['Alertas',          '3',      'abiertas · 1 crit.'],
    ] as const,
    mapLabel: 'i. Mina superficial',
    mapTitle: 'Pit · vista aérea',
    mapSub: '24 unidades · Apurímac',
    underLabel: 'ii. Mina subterránea',
    underTitle: 'Galerías · niveles 1–3',
    underSub: '14 nodos · 8 equipos activos',
    alertsLabel: 'Eventos en vivo',
    alerts: [
      ['09:41', 'crit', 'CAT 793F-12 · gal/h +18%',     'Rampa Oeste · T3'],
      ['09:38', 'warn', 'Cola surtidor · ETA 4 min',    'Pit · descarga'],
      ['09:32', 'info', 'F-04 · caudal −22%',           'Galería 7 · N'],
      ['09:25', 'good', 'R. Quispe · −2.4% sobre base', 'Rampa principal'],
    ] as const,
    sevLabel: { crit: 'Crítico', warn: 'Aviso', info: 'Info', good: 'OK' } as const,
    chartLabel: 'gal/h · ventana 24 h',
    foot: 'Undis · Live operations console',
    footRight: '↳ Continúa con Wapsi',
  },
  en: {
    eyebrow: '02 · Dashboard · Undis single pane',
    section: 'Section 0 · Platform',
    pretitle: 'One view, the whole mine',
    headline1: 'Real-time',
    headline2: 'control room.',
    desc:
      'Telemetry, position and events for surface and underground in a single dashboard. Each operation with its lens — the mine, at a glance.',
    appName: 'Undis · OS',
    appPath: '/operations/live',
    appUser: 'osmar.p',
    appTime: '09:42 · GMT-5',
    statusLive: 'live',
    kpis: [
      ['Active fleet',  '22',     'of 24 · 91.7%'],
      ['Fuel 24h',      '8,420',  'gal · ↘ −3.2%'],
      ['Cycles today',  '142',    'in flight · 12'],
      ['OEE',           '78%',    'target 80%'],
      ['Alerts',        '3',      'open · 1 crit.'],
    ] as const,
    mapLabel: 'i. Surface mine',
    mapTitle: 'Pit · aerial view',
    mapSub: '24 units · Apurímac',
    underLabel: 'ii. Underground mine',
    underTitle: 'Drifts · levels 1–3',
    underSub: '14 nodes · 8 active rigs',
    alertsLabel: 'Live events',
    alerts: [
      ['09:41', 'crit', 'CAT 793F-12 · gal/h +18%',    'West Ramp · T3'],
      ['09:38', 'warn', 'Pump queue · ETA 4 min',      'Pit · discharge'],
      ['09:32', 'info', 'F-04 · airflow −22%',         'Drift 7 · N'],
      ['09:25', 'good', 'R. Quispe · −2.4% vs base',   'Main ramp'],
    ] as const,
    sevLabel: { crit: 'Crit', warn: 'Warn', info: 'Info', good: 'OK' } as const,
    chartLabel: 'gal/h · 24 h window',
    foot: 'Undis · Live operations console',
    footRight: '↳ Continues with Wapsi',
  },
}

type Severity = 'crit' | 'warn' | 'info' | 'good'

const sevColor = (s: Severity) =>
  s === 'crit' ? 'var(--color-vermilion)' :
  s === 'warn' ? 'var(--color-ochre)' :
  s === 'good' ? 'var(--color-sage)' :
  'var(--color-mute)'

// ── Top-down open-pit map ────────────────────────────────────────────────
function PitMap() {
  return (
    <svg viewBox="0 0 480 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Faint grid */}
      <g stroke="var(--color-ink)" strokeWidth="0.3" opacity="0.08">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`gx${i}`} x1={i * 40} y1="0" x2={i * 40} y2="280" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`gy${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} />
        ))}
      </g>

      {/* Heat zone (subtle) */}
      <radialGradient id="heat" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="var(--color-vermilion)" stopOpacity="0.45" />
        <stop offset="100%" stopColor="var(--color-vermilion)" stopOpacity="0" />
      </radialGradient>
      <ellipse cx="338" cy="118" rx="62" ry="42" fill="url(#heat)" />

      {/* Pit benches — concentric ovals */}
      <g fill="none" stroke="var(--color-ink)" strokeWidth="0.7" opacity="0.55">
        <ellipse cx="240" cy="142" rx="190" ry="110" />
        <ellipse cx="244" cy="146" rx="158" ry="90" />
        <ellipse cx="248" cy="148" rx="124" ry="72" />
        <ellipse cx="252" cy="150" rx="92" ry="54" />
        <ellipse cx="256" cy="152" rx="60" ry="36" />
        <ellipse cx="258" cy="154" rx="32" ry="20" />
      </g>

      {/* Haul road (curved dashed) */}
      <g fill="none" stroke="var(--color-ochre)" strokeWidth="1" strokeDasharray="3,3" opacity="0.7">
        <path d="M 60 250 C 140 220, 180 200, 230 160 S 300 110, 340 100" />
        <path d="M 420 240 C 380 220, 350 200, 320 170" />
      </g>

      {/* North marker */}
      <g>
        <circle cx="436" cy="36" r="14" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="0.7" />
        <text x="436" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-ink)" letterSpacing="0.1em">N</text>
        <path d="M 436 24 L 432 32 L 440 32 Z" fill="var(--color-vermilion)" />
      </g>

      {/* Trucks */}
      {[
        { x: 88,  y: 240, c: 'sage',      id: 'A12' },
        { x: 162, y: 200, c: 'sage',      id: 'A07' },
        { x: 220, y: 168, c: 'ink',       id: 'B03' },
        { x: 286, y: 138, c: 'ink',       id: 'B11' },
        { x: 320, y: 168, c: 'ochre',     id: 'C04' },
        { x: 354, y: 110, c: 'vermilion', id: '12' },
        { x: 250, y: 96,  c: 'sage',      id: 'A19' },
        { x: 184, y: 132, c: 'ink',       id: 'B22' },
        { x: 380, y: 196, c: 'sage',      id: 'A02' },
      ].map((t, i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="3.6" fill={`var(--color-${t.c})`} stroke="var(--color-paper)" strokeWidth="1" />
          {t.c === 'vermilion' && (
            <circle cx={t.x} cy={t.y} r="9" fill="none" stroke="var(--color-vermilion)" strokeWidth="0.7" opacity="0.7">
              <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}

      {/* Pump / fuel station */}
      <g>
        <rect x="48" y="58" width="22" height="12" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="0.7" />
        <text x="76" y="67" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-ink-soft)" letterSpacing="0.14em">PUMP</text>
      </g>

      {/* Crusher */}
      <g>
        <rect x="404" y="232" width="22" height="12" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="0.7" />
        <text x="402" y="241" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-ink-soft)" letterSpacing="0.14em">CRUSH</text>
      </g>

      {/* Heat zone label */}
      <g>
        <line x1="338" y1="118" x2="380" y2="76" stroke="var(--color-vermilion)" strokeWidth="0.7" />
        <circle cx="338" cy="118" r="2" fill="var(--color-vermilion)" />
        <text x="384" y="74" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-vermilion)" letterSpacing="0.16em">+18% Δ</text>
      </g>

      {/* Scale */}
      <g>
        <line x1="32" y1="262" x2="92" y2="262" stroke="var(--color-ink)" strokeWidth="1" />
        <line x1="32" y1="258" x2="32" y2="266" stroke="var(--color-ink)" strokeWidth="1" />
        <line x1="62" y1="259" x2="62" y2="265" stroke="var(--color-ink)" strokeWidth="0.6" />
        <line x1="92" y1="258" x2="92" y2="266" stroke="var(--color-ink)" strokeWidth="1" />
        <text x="32" y="276" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-ink-soft)" letterSpacing="0.1em">0</text>
        <text x="92" y="276" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-ink-soft)" letterSpacing="0.1em">500 m</text>
      </g>
    </svg>
  )
}

// ── Underground network ─────────────────────────────────────────────────
function UnderMap() {
  return (
    <svg viewBox="0 0 280 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="280" height="200" fill="var(--color-ink)" opacity="0.04" />

      {/* Hatching */}
      <g stroke="var(--color-ink)" strokeWidth="0.3" opacity="0.18">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`h${i}`} x1={i * 22} y1="200" x2={i * 22 + 12} y2="186" />
        ))}
      </g>

      {/* Levels label */}
      <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-mute)" letterSpacing="0.18em">
        <text x="6" y="40">N1</text>
        <text x="6" y="100">N2</text>
        <text x="6" y="160">N3</text>
      </g>

      {/* Tunnels */}
      <g stroke="var(--color-ink)" strokeWidth="1" fill="none" opacity="0.65">
        <line x1="20" y1="40" x2="260" y2="40" />
        <line x1="20" y1="100" x2="260" y2="100" />
        <line x1="20" y1="160" x2="260" y2="160" />
        <line x1="80" y1="40" x2="80" y2="160" />
        <line x1="160" y1="40" x2="160" y2="160" />
        <line x1="220" y1="40" x2="220" y2="160" />
        <line x1="120" y1="40" x2="120" y2="100" />
        <line x1="200" y1="100" x2="200" y2="160" />
      </g>

      {/* Return airway (top) */}
      <line x1="20" y1="20" x2="260" y2="20" stroke="var(--color-vermilion)" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.55" />
      <line x1="20" y1="40" x2="20" y2="20" stroke="var(--color-vermilion)" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.55" />
      <line x1="260" y1="40" x2="260" y2="20" stroke="var(--color-vermilion)" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.55" />

      {/* Nodes (intersections) */}
      <g fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="0.7">
        {[
          [20,40],[80,40],[120,40],[160,40],[220,40],[260,40],
          [20,100],[80,100],[120,100],[160,100],[200,100],[220,100],[260,100],
          [20,160],[80,160],[160,160],[200,160],[220,160],[260,160],
        ].map(([x,y], i) => <circle key={i} cx={x} cy={y} r="2.4" />)}
      </g>

      {/* Active equipment (sage) */}
      <g fill="var(--color-sage)">
        <circle cx="100" cy="40" r="3.2" />
        <circle cx="190" cy="100" r="3.2" />
        <circle cx="50" cy="100" r="3.2" />
        <circle cx="135" cy="160" r="3.2" />
      </g>

      {/* Idle / moving (ochre) */}
      <g fill="var(--color-ochre)">
        <circle cx="240" cy="100" r="3.2" />
        <circle cx="240" cy="160" r="3.2" />
      </g>

      {/* Alert */}
      <g>
        <circle cx="180" cy="160" r="3.6" fill="var(--color-vermilion)" />
        <circle cx="180" cy="160" r="9" fill="none" stroke="var(--color-vermilion)" strokeWidth="0.7" opacity="0.7">
          <animate attributeName="r" values="5;13;5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Fans */}
      <g>
        <circle cx="20" cy="20" r="5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="0.8" />
        <text x="30" y="23" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-ink-soft)" letterSpacing="0.14em">F-01</text>
        <circle cx="160" cy="100" r="4" fill="var(--color-paper)" stroke="var(--color-ochre)" strokeWidth="0.8" />
      </g>

      {/* Compass */}
      <g>
        <text x="266" y="14" textAnchor="end" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-mute)" letterSpacing="0.18em">↗ DEPTH</text>
      </g>
    </svg>
  )
}

export function Slide00aDashboard() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 px-10 lg:px-16 py-7 flex flex-col">
      {/* Top index strip */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      {/* Pretitle / headline */}
      <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="smallcaps text-[11px] text-[var(--color-vermilion)] mb-1">
            {c.pretitle}
          </div>
          <h1
            className="display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.02, letterSpacing: '-0.014em' }}
          >
            {c.headline1}{' '}
            <span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>
              {c.headline2}
            </span>
          </h1>
        </div>
        <p className="max-w-[44ch] text-[12.5px] leading-[1.55] text-[var(--color-ink-soft)]">
          {c.desc}
        </p>
      </div>

      {/* Dashboard window */}
      <div className="mt-4 border border-[var(--color-ink)]/30 bg-[var(--color-paper-deep)] flex-1 min-h-0 flex flex-col shadow-[0_18px_40px_-30px_rgba(0,0,0,0.55)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--color-ink)]/20 bg-[var(--color-paper)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-vermilion)]/70" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-ochre)]/70" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-sage)]/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="display-italic text-[14px] leading-none">{c.appName}</span>
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                {c.appPath}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
            <span className="flex items-center gap-1.5">
              <span className="dot" style={{ background: 'var(--color-vermilion)' }} />
              {c.statusLive}
            </span>
            <span className="text-[var(--color-mute-soft)]">·</span>
            <span>{c.appTime}</span>
            <span className="text-[var(--color-mute-soft)]">·</span>
            <span>{c.appUser}</span>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-5 border-b border-[var(--color-ink)]/15 bg-[var(--color-paper)]">
          {c.kpis.map(([label, val, sub], i) => (
            <div
              key={i}
              className={`px-4 py-2.5 ${i < c.kpis.length - 1 ? 'border-r border-[var(--color-ink)]/10' : ''}`}
            >
              <div className="font-mono text-[8.5px] tracking-[0.24em] uppercase text-[var(--color-mute)]">
                {label}
              </div>
              <div
                className="display mt-0.5"
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  lineHeight: 1,
                  letterSpacing: '-0.012em',
                  color: i === 4 ? 'var(--color-vermilion)' : 'var(--color-ink)',
                }}
              >
                {val}
              </div>
              <div className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-ink-soft)] mt-1">
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Body — map + underground + alerts */}
        <div className="grid grid-cols-12 gap-0 flex-1 min-h-0">
          {/* Surface map */}
          <div className="col-span-7 border-r border-[var(--color-ink)]/15 flex flex-col">
            <div className="px-3 py-2 flex items-baseline justify-between border-b border-[var(--color-ink)]/10">
              <div>
                <div className="smallcaps text-[10px] text-[var(--color-mute)] leading-tight">
                  {c.mapLabel}
                </div>
                <div className="display text-[14px] leading-tight">{c.mapTitle}</div>
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
                {c.mapSub}
              </div>
            </div>
            <div className="relative flex-1 min-h-0 cover-frame">
              <PitMap />
            </div>
          </div>

          {/* Right column — underground + alerts */}
          <div className="col-span-5 flex flex-col">
            {/* Underground */}
            <div className="flex flex-col" style={{ flex: '1 1 50%', minHeight: 0 }}>
              <div className="px-3 py-2 flex items-baseline justify-between border-b border-[var(--color-ink)]/10">
                <div>
                  <div className="smallcaps text-[10px] text-[var(--color-sage)] leading-tight">
                    {c.underLabel}
                  </div>
                  <div className="display text-[14px] leading-tight">{c.underTitle}</div>
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
                  {c.underSub}
                </div>
              </div>
              <div className="relative flex-1 min-h-0 cover-frame">
                <UnderMap />
              </div>
            </div>

            {/* Alerts */}
            <div className="border-t border-[var(--color-ink)]/15 flex flex-col" style={{ flex: '1 1 50%', minHeight: 0 }}>
              <div className="px-3 py-2 flex items-baseline justify-between border-b border-[var(--color-ink)]/10 bg-[var(--color-paper)]">
                <div className="smallcaps text-[10px] text-[var(--color-vermilion)] leading-tight">
                  {c.alertsLabel}
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                  04
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden bg-[var(--color-paper)]">
                {c.alerts.map(([time, sev, msg, loc], i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 flex items-start gap-2.5 ${
                      i < c.alerts.length - 1 ? 'border-b border-[var(--color-ink)]/10' : ''
                    }`}
                  >
                    <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-mute)] mt-0.5 shrink-0">
                      {time}
                    </span>
                    <span
                      className="dot mt-1.5 shrink-0"
                      style={{ background: sevColor(sev as Severity) }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11.5px] leading-tight text-[var(--color-ink)]">
                        {msg}
                      </div>
                      <div className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-ink-soft)] mt-0.5">
                        {loc}
                      </div>
                    </div>
                    <span
                      className="font-mono text-[8.5px] tracking-[0.22em] uppercase shrink-0 px-1.5 py-[1px] border"
                      style={{
                        color: sevColor(sev as Severity),
                        borderColor: sevColor(sev as Severity),
                      }}
                    >
                      {c.sevLabel[sev as Severity]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom mini chart */}
        <div className="border-t border-[var(--color-ink)]/15 bg-[var(--color-paper)] px-3 py-2 flex items-center gap-3">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)] shrink-0">
            {c.chartLabel}
          </div>
          <svg viewBox="0 0 600 32" className="flex-1 h-7" preserveAspectRatio="none">
            <g stroke="var(--color-ink)" strokeWidth="0.4" opacity="0.18">
              <line x1="0" y1="16" x2="600" y2="16" />
            </g>
            <path
              d="M 0 22 L 30 18 L 60 20 L 90 14 L 120 16 L 150 12 L 180 14 L 210 8 L 240 10 L 270 6 L 300 12 L 330 9 L 360 14 L 390 8 L 420 10 L 450 16 L 480 12 L 510 14 L 540 10 L 570 12 L 600 8"
              fill="none"
              stroke="var(--color-vermilion)"
              strokeWidth="1.2"
            />
            <path
              d="M 0 22 L 30 18 L 60 20 L 90 14 L 120 16 L 150 12 L 180 14 L 210 8 L 240 10 L 270 6 L 300 12 L 330 9 L 360 14 L 390 8 L 420 10 L 450 16 L 480 12 L 510 14 L 540 10 L 570 12 L 600 8 L 600 32 L 0 32 Z"
              fill="var(--color-vermilion)"
              opacity="0.1"
            />
            <circle cx="600" cy="8" r="2.4" fill="var(--color-vermilion)" />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
        <span>{c.foot}</span>
        <span>{c.footRight}</span>
      </div>
    </section>
  )
}
