import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: '01 · Plataforma Undis',
    section: 'Sección 0',
    pretitle: 'Una plataforma · MMXXVI',
    headline1: 'Una sola flota.',
    headline2: 'Cielo y socavón.',
    desc:
      'Undis es el sistema de gestión de flota para operaciones mineras de superficie y subterráneas. Telemetría continua, despacho, productividad y seguridad bajo un mismo lente editorial.',
    surfaceLabel: 'i. Mina superficial',
    surfaceTitle: 'Open pit',
    surfaceDesc:
      'Camiones, palas y perforadoras con GPS de alta frecuencia. Rutas, ciclos y mapas de calor por zona.',
    undergroundLabel: 'ii. Mina subterránea',
    undergroundTitle: 'Underground',
    undergroundDesc:
      'Galerías y rampas. Posicionamiento por nodos, ventilación inteligente y rastreo en vivo bajo tierra.',
    aiLabel: 'iii. Capa de agentes',
    aiTitle: 'gunjopClaw · agentes especialistas',
    aiDesc:
      'Cada módulo Undis lleva un agente gunjopClaw afinado al tipo de trabajo. Los especialistas reportan a un agente principal que sintetiza la operación completa.',
    aiNodes: [
      ['Fuel', 'gal/h · anomalías'],
      ['Dispatch', 'asignación · ETAs'],
      ['Maint.', 'desgaste · fallas'],
      ['Safety', 'fatiga · proximidad'],
    ] as const,
    aiCore: 'Agente principal',
    aiCoreDesc: 'Sintetiza · decide · escala',
    modulesLabel: 'Módulos',
    modules: [
      ['Despacho', 'Asignación viva de equipos'],
      ['Tracking', 'Posición y estado · sup / sub'],
      ['DiPlus', 'Telemetría diferencial'],
      ['Productividad', 'Ciclos · OEE'],
      ['Seguridad', 'Fatiga · geocercas'],
    ] as const,
    diplusTagPre: 'Este memo cubre',
    diplusTag: 'DiPlus',
    diplusTagPost: 'el módulo de combustible diferencial.',
    foot: 'Undis · Fleet Management · gunjopClaw AI',
    footRight: '↳ Continúa con la portada DiPlus',
  },
  en: {
    eyebrow: '01 · Undis Platform',
    section: 'Section 0',
    pretitle: 'A platform · MMXXVI',
    headline1: 'One fleet.',
    headline2: 'Surface and underground.',
    desc:
      'Undis is the fleet management system for surface and underground mining operations. Continuous telemetry, dispatch, productivity and safety under a single editorial lens.',
    surfaceLabel: 'i. Surface mine',
    surfaceTitle: 'Open pit',
    surfaceDesc:
      'Haul trucks, shovels and drills with high-frequency GPS. Routes, cycles and heat maps by zone.',
    undergroundLabel: 'ii. Underground mine',
    undergroundTitle: 'Underground',
    undergroundDesc:
      'Drifts and ramps. Node-based positioning, smart ventilation and live tracking below ground.',
    aiLabel: 'iii. Agent layer',
    aiTitle: 'gunjopClaw · specialist agents',
    aiDesc:
      'Each Undis module ships with a gunjopClaw agent tuned to the type of work. Specialists report to a main agent that synthesizes the whole operation.',
    aiNodes: [
      ['Fuel', 'gal/h · anomalies'],
      ['Dispatch', 'assignment · ETAs'],
      ['Maint.', 'wear · failures'],
      ['Safety', 'fatigue · proximity'],
    ] as const,
    aiCore: 'Main agent',
    aiCoreDesc: 'Synthesizes · decides · escalates',
    modulesLabel: 'Modules',
    modules: [
      ['Dispatch', 'Live equipment assignment'],
      ['Tracking', 'Position & state · surf / under'],
      ['DiPlus', 'Differential telemetry'],
      ['Productivity', 'Cycles · OEE'],
      ['Safety', 'Fatigue · geofences'],
    ] as const,
    diplusTagPre: 'This memo covers',
    diplusTag: 'DiPlus',
    diplusTagPost: 'the differential fuel module.',
    foot: 'Undis · Fleet Management · gunjopClaw AI',
    footRight: '↳ Continues with the DiPlus cover',
  },
}

export function Slide00Undis() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 px-12 lg:px-20 py-8 flex flex-col">
      {/* Top index strip */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      {/* TOP GRID — wordmark / cross-section */}
      <div className="grid grid-cols-12 gap-8 mt-6">
        {/* LEFT — Wordmark + intro */}
        <div className="col-span-12 md:col-span-7 flex flex-col relative">
          <div className="smallcaps text-[12px] text-[var(--color-vermilion)] mb-2">
            {c.pretitle}
          </div>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(56px, 8.5vw, 124px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            Un<span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>dis</span>
          </h1>

          <h2
            className="display mt-3"
            style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.05, letterSpacing: '-0.012em' }}
          >
            {c.headline1}{' '}
            <span className="display-italic" style={{ color: 'var(--color-sage)' }}>
              {c.headline2}
            </span>
          </h2>

          <p className="mt-3 max-w-[58ch] text-[13.5px] leading-[1.55] text-[var(--color-ink-soft)]">
            {c.desc}
          </p>
        </div>

        {/* RIGHT — Surface / Underground diagram + descriptions */}
        <div className="col-span-12 md:col-span-5 flex flex-col">
          {/* Cross-section illustration */}
          <div className="relative border border-[var(--color-ink)]/15 cover-frame" style={{ height: 150 }}>
            <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <rect x="0" y="0" width="400" height="92" fill="var(--color-paper-deep)" />
              <g stroke="var(--color-ink)" strokeWidth="0.7" fill="none" opacity="0.7">
                <path d="M 30 92 L 90 92 L 110 80 L 170 80 L 188 68 L 240 68 L 256 56 L 300 56 L 312 92 L 30 92 Z" />
                <path d="M 90 92 L 110 80 L 170 80" />
                <path d="M 170 80 L 188 68 L 240 68" />
                <path d="M 240 68 L 256 56 L 300 56" />
              </g>
              <g fill="var(--color-vermilion)" opacity="0.85">
                <rect x="115" y="76" width="6" height="4" />
                <rect x="195" y="64" width="6" height="4" />
                <rect x="262" y="52" width="6" height="4" />
              </g>
              <line x1="0" y1="92" x2="400" y2="92" stroke="var(--color-ink)" strokeWidth="1" />
              <g stroke="var(--color-ink)" strokeWidth="0.4" opacity="0.25">
                {Array.from({ length: 28 }).map((_, i) => (
                  <line key={`s${i}`} x1={i * 14} y1="0" x2={i * 14 + 8} y2="14" />
                ))}
              </g>
              <rect x="0" y="92" width="400" height="128" fill="var(--color-ink)" opacity="0.06" />
              <g stroke="var(--color-ink)" strokeWidth="0.9" fill="none">
                <path d="M 312 92 Q 320 110 340 120 L 380 120" opacity="0.7" />
                <path d="M 30 92 Q 50 110 60 130 L 60 180" opacity="0.7" />
                <path d="M 60 150 L 140 150 L 180 170 L 260 170" opacity="0.7" />
                <path d="M 140 150 L 140 200" opacity="0.5" />
                <path d="M 220 170 L 220 210" opacity="0.5" />
              </g>
              <g fill="var(--color-sage)">
                <circle cx="60" cy="170" r="2.4" />
                <circle cx="180" cy="170" r="2.4" />
                <circle cx="220" cy="195" r="2.4" />
                <circle cx="350" cy="120" r="2.4" />
              </g>
              <g stroke="var(--color-ink)" strokeWidth="0.3" opacity="0.18">
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`u${i}`} x1={i * 24} y1="220" x2={i * 24 + 14} y2="200" />
                ))}
              </g>
            </svg>

            <div className="absolute top-1.5 left-2 font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--color-ink-soft)]">
              ↑ Sup.
            </div>
            <div className="absolute bottom-1.5 left-2 font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--color-ink-soft)]">
              ↓ Sub.
            </div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="smallcaps text-[10px] text-[var(--color-mute)] mb-0.5">
                {c.surfaceLabel}
              </div>
              <div className="display text-[15px] leading-tight">{c.surfaceTitle}</div>
              <p className="mt-1 text-[11px] leading-[1.45] text-[var(--color-ink-soft)]">
                {c.surfaceDesc}
              </p>
            </div>
            <div>
              <div className="smallcaps text-[10px] text-[var(--color-sage)] mb-0.5">
                {c.undergroundLabel}
              </div>
              <div className="display text-[15px] leading-tight">{c.undergroundTitle}</div>
              <p className="mt-1 text-[11px] leading-[1.45] text-[var(--color-ink-soft)]">
                {c.undergroundDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* gunjopClaw — agent layer */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="smallcaps text-[11px] text-[var(--color-sage)]">{c.aiLabel}</div>
          <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--color-mute)]">
            AI · 04→01
          </div>
        </div>
        <div className="rule" />

        <div className="grid grid-cols-12 gap-6 items-center py-4">
          {/* Specialist agents — left column */}
          <div className="col-span-12 md:col-span-3 grid grid-cols-2 gap-2">
            {c.aiNodes.map(([name, desc], i) => (
              <div
                key={i}
                className="border border-[var(--color-ink)]/20 px-2.5 py-1.5 bg-[var(--color-paper-deep)]"
              >
                <div className="flex items-baseline justify-between">
                  <div className="display text-[13px] leading-tight">{name}</div>
                  <div className="font-mono text-[8px] tracking-[0.18em] text-[var(--color-mute)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-[10px] leading-[1.35] text-[var(--color-ink-soft)] mt-0.5">
                  {desc}
                </div>
              </div>
            ))}
          </div>

          {/* Fan-in connector */}
          <div className="col-span-12 md:col-span-4 relative" style={{ height: 110 }}>
            <svg viewBox="0 0 240 110" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {/* Lines from 4 specialists (left) converging to main agent (right) */}
              <g stroke="var(--color-ink)" strokeWidth="0.8" fill="none" opacity="0.55">
                <path d="M 0 18  C 90 18,  130 55, 224 55" />
                <path d="M 0 42  C 90 42,  130 55, 224 55" />
                <path d="M 0 68  C 90 68,  130 55, 224 55" />
                <path d="M 0 92  C 90 92,  130 55, 224 55" />
              </g>
              {/* Source dots */}
              <g fill="var(--color-sage)">
                <circle cx="0" cy="18" r="2.4" />
                <circle cx="0" cy="42" r="2.4" />
                <circle cx="0" cy="68" r="2.4" />
                <circle cx="0" cy="92" r="2.4" />
              </g>
              {/* Arrow head into main agent */}
              <g fill="var(--color-vermilion)">
                <path d="M 220 51 L 232 55 L 220 59 Z" />
              </g>
              {/* Tick marks (data flow) */}
              <g fill="var(--color-vermilion)" opacity="0.7">
                <circle cx="60" cy="35" r="1.4" />
                <circle cx="100" cy="48" r="1.4" />
                <circle cx="140" cy="55" r="1.4" />
                <circle cx="180" cy="55" r="1.4" />
              </g>
            </svg>

            {/* Caption above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.24em] uppercase text-[var(--color-mute)]">
              report ↗
            </div>
          </div>

          {/* Main agent — right */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative border border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="smallcaps text-[10px] text-[var(--color-vermilion)]">
                    {c.aiTitle}
                  </div>
                  <div
                    className="display mt-1"
                    style={{ fontSize: '22px', lineHeight: 1.05, letterSpacing: '-0.012em' }}
                  >
                    {c.aiCore}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-soft)] mt-1">
                    {c.aiCoreDesc}
                  </div>
                </div>
                {/* Hub mark */}
                <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
                  <circle cx="22" cy="22" r="20" fill="none" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.4" />
                  <circle cx="22" cy="22" r="14" fill="none" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.55" />
                  <circle cx="22" cy="22" r="8" fill="var(--color-vermilion)" opacity="0.18" />
                  <circle cx="22" cy="22" r="3" fill="var(--color-vermilion)" />
                </svg>
              </div>
              <p className="text-[11.5px] leading-[1.5] text-[var(--color-ink-soft)] mt-2 max-w-[40ch]">
                {c.aiDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules row */}
      <div className="mt-2">
        <div className="flex items-baseline justify-between mb-2">
          <div className="smallcaps text-[11px] text-[var(--color-mute)]">{c.modulesLabel}</div>
          <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--color-mute)]">
            05
          </div>
        </div>
        <div className="rule" />
        <div className="grid grid-cols-5 gap-0">
          {c.modules.map(([name, desc], i) => {
            const isDiPlus = name === 'DiPlus'
            return (
              <div
                key={i}
                className={`px-3 py-2.5 border-r border-[var(--color-ink)]/15 last:border-r-0 ${
                  isDiPlus ? 'bg-[var(--color-vermilion)]/8' : ''
                }`}
              >
                <div className="font-mono text-[9px] tracking-[0.24em] text-[var(--color-mute)]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  className={`display mt-0.5 text-[15px] leading-tight ${
                    isDiPlus ? 'text-[var(--color-vermilion)]' : ''
                  }`}
                >
                  {name}
                </div>
                <div className="text-[10.5px] mt-0.5 leading-[1.4] text-[var(--color-ink-soft)]">
                  {desc}
                </div>
              </div>
            )
          })}
        </div>
        <div className="rule" />
      </div>

      {/* DiPlus tag + Footer */}
      <div className="mt-auto pt-3 flex items-baseline justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
        <div className="flex items-baseline gap-2">
          <span>{c.diplusTagPre}</span>
          <span className="text-[var(--color-vermilion)] font-semibold tracking-[0.26em]">
            {c.diplusTag}
          </span>
          <span>·</span>
          <span className="text-[var(--color-ink-soft)] normal-case tracking-[0.04em] font-sans italic">
            {c.diplusTagPost}
          </span>
        </div>
        <span>{c.footRight}</span>
      </div>
      <div className="mt-1 font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
        {c.foot}
      </div>
    </section>
  )
}
