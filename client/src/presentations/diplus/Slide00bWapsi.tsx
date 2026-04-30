import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: '03 · Wapsi · Gestión de ventilación',
    section: 'Sección 0 · Plataforma',
    pretitle: 'El aire también es operación',
    headline1: 'Wapsi respira',
    headline2: 'con la mina.',
    desc:
      'Sistema de gestión de ventilación para mina subterránea. Wapsi modula caudales por frente y galería en tiempo real — combinando lecturas de gases, temperatura, presencia de equipos y planificación de turno.',
    agentLabel: 'Agente · gunjopClaw / Vent',
    agentTitle: 'Detecta zonas de baja demanda',
    agentDesc:
      'Un agente Wapsi cruza ocupación, ciclos de carga y plan de turno para identificar tramos donde la ventilación corre por defecto sin demanda real. Reduce caudal donde no se necesita; mantiene seguridad donde sí.',
    statLabel: 'Ahorro energético',
    statSub: 'auditado · 30 días',
    statRange: '5 – 8%',
    statFootA: 'kWh / mes',
    statFootB: '−12 a −18%',
    statFootBSub: 'pico de demanda',
    findingsLabel: 'Hallazgos del agente',
    findings: [
      ['Galería 7 · Norte', 'Caudal 100% en horas sin equipo activo'],
      ['Rampa principal', 'Sobre-ventilación durante cambio de turno'],
      ['Frente 12-B', 'Ventilador secundario operando post-voladura sin necesidad'],
      ['Cuello de retorno', 'Sub-ventilado en pico — corrección al alza'],
    ] as const,
    legendOk: 'demanda alta',
    legendLow: 'baja demanda detectada',
    foot: 'Wapsi · Ventilation Management · gunjopClaw / Vent',
    footRight: '↳ Continúa con la portada DiPlus',
  },
  en: {
    eyebrow: '03 · Wapsi · Ventilation Management',
    section: 'Section 0 · Platform',
    pretitle: 'Air is also an operation',
    headline1: 'Wapsi breathes',
    headline2: 'with the mine.',
    desc:
      'Ventilation management system for underground mines. Wapsi modulates airflow per face and drift in real time — combining gas readings, temperature, equipment presence and shift plan.',
    agentLabel: 'Agent · gunjopClaw / Vent',
    agentTitle: 'Spots low-demand zones',
    agentDesc:
      'A Wapsi agent cross-references occupancy, load cycles and shift plan to find segments where ventilation runs by default without real demand. It throttles airflow where it is not needed — and keeps it where it is.',
    statLabel: 'Energy savings',
    statSub: 'audited · 30 days',
    statRange: '5 – 8%',
    statFootA: 'kWh / month',
    statFootB: '−12 to −18%',
    statFootBSub: 'demand peak',
    findingsLabel: 'Agent findings',
    findings: [
      ['Drift 7 · North', '100% airflow in hours with no active equipment'],
      ['Main ramp', 'Over-ventilation during shift change'],
      ['Face 12-B', 'Secondary fan running post-blast without need'],
      ['Return bottleneck', 'Under-ventilated at peak — corrected upward'],
    ] as const,
    legendOk: 'high demand',
    legendLow: 'low demand detected',
    foot: 'Wapsi · Ventilation Management · gunjopClaw / Vent',
    footRight: '↳ Continues with the DiPlus cover',
  },
}

// Schematic ventilation network — fans, tunnels, demand zones
function VentSchematic() {
  return (
    <svg viewBox="0 0 420 240" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      {/* Background — underground tint */}
      <rect x="0" y="0" width="420" height="240" fill="var(--color-ink)" opacity="0.04" />

      {/* Hatching */}
      <g stroke="var(--color-ink)" strokeWidth="0.3" opacity="0.18">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1={i * 22} y1="240" x2={i * 22 + 14} y2="220" />
        ))}
      </g>

      {/* Main shaft (intake) */}
      <g stroke="var(--color-ink)" strokeWidth="1.2" fill="none" opacity="0.65">
        <line x1="40" y1="20" x2="40" y2="200" />
        <line x1="40" y1="200" x2="380" y2="200" />
      </g>

      {/* Tunnels — lateral drifts */}
      <g stroke="var(--color-ink)" strokeWidth="0.9" fill="none" opacity="0.65">
        <line x1="40" y1="60" x2="220" y2="60" />
        <line x1="220" y1="60" x2="220" y2="120" />
        <line x1="220" y1="120" x2="320" y2="120" />
        <line x1="40" y1="100" x2="160" y2="100" />
        <line x1="160" y1="100" x2="160" y2="160" />
        <line x1="160" y1="160" x2="280" y2="160" />
        <line x1="40" y1="140" x2="120" y2="140" />
        <line x1="280" y1="160" x2="280" y2="200" />
        <line x1="320" y1="120" x2="320" y2="200" />
      </g>

      {/* Return airway (top) */}
      <g stroke="var(--color-vermilion)" strokeWidth="0.7" fill="none" opacity="0.5" strokeDasharray="3,3">
        <line x1="40" y1="20" x2="380" y2="20" />
        <line x1="380" y1="20" x2="380" y2="200" />
      </g>

      {/* Demand zones — high (sage) */}
      <g fill="var(--color-sage)" opacity="0.18">
        <rect x="200" y="50" width="40" height="20" />
        <rect x="300" y="110" width="40" height="20" />
      </g>

      {/* Demand zones — low (ochre, agent finding) */}
      <g fill="var(--color-ochre)" opacity="0.22" stroke="var(--color-ochre)" strokeWidth="0.8" strokeDasharray="2,2">
        <rect x="60" y="50" width="120" height="20" />
        <rect x="60" y="130" width="60" height="20" />
        <rect x="180" y="150" width="100" height="20" />
      </g>

      {/* Fans — circles with airflow arcs */}
      <g>
        <circle cx="40" cy="40" r="9" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1" />
        <path d="M 36 40 L 44 40 M 40 36 L 40 44" stroke="var(--color-ink)" strokeWidth="0.8" />
        <text x="54" y="44" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-ink-soft)" letterSpacing="0.1em">
          F-01 · main
        </text>
      </g>
      <g>
        <circle cx="220" cy="100" r="6" fill="var(--color-paper)" stroke="var(--color-ochre)" strokeWidth="1" />
        <text x="232" y="103" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-ochre)" letterSpacing="0.1em">
          F-04 · ↓ baja
        </text>
      </g>
      <g>
        <circle cx="160" cy="160" r="6" fill="var(--color-paper)" stroke="var(--color-ochre)" strokeWidth="1" />
        <text x="172" y="163" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-ochre)" letterSpacing="0.1em">
          F-07 · ↓ baja
        </text>
      </g>
      <g>
        <circle cx="320" cy="160" r="6" fill="var(--color-paper)" stroke="var(--color-sage)" strokeWidth="1" />
        <text x="332" y="163" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-sage)" letterSpacing="0.1em">
          F-09 · alta
        </text>
      </g>

      {/* Equipment dots — active */}
      <g fill="var(--color-vermilion)">
        <circle cx="220" cy="60" r="2.4" />
        <circle cx="320" cy="120" r="2.4" />
      </g>

      {/* Direction arrows on intake */}
      <g fill="var(--color-ink-soft)" opacity="0.55">
        <path d="M 40 78 L 36 70 L 44 70 Z" />
        <path d="M 40 130 L 36 122 L 44 122 Z" />
        <path d="M 40 180 L 36 172 L 44 172 Z" />
      </g>
    </svg>
  )
}

export function Slide00bWapsi() {
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

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-8 mt-6 flex-1 min-h-0">
        {/* LEFT — Wordmark + agent */}
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <div className="smallcaps text-[12px] text-[var(--color-ochre)] mb-2">
            {c.pretitle}
          </div>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(64px, 9.5vw, 144px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            Wap<span className="display-italic" style={{ color: 'var(--color-ochre)' }}>si</span>
          </h1>

          <h2
            className="display mt-3"
            style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: 1.05, letterSpacing: '-0.012em' }}
          >
            {c.headline1}{' '}
            <span className="display-italic" style={{ color: 'var(--color-sage)' }}>
              {c.headline2}
            </span>
          </h2>

          <p className="mt-3 max-w-[58ch] text-[13.5px] leading-[1.55] text-[var(--color-ink-soft)]">
            {c.desc}
          </p>

          {/* Agent block */}
          <div className="mt-5 border-l-2 border-[var(--color-ochre)] pl-4">
            <div className="smallcaps text-[10px] text-[var(--color-ochre)] mb-1">
              {c.agentLabel}
            </div>
            <div
              className="display-italic"
              style={{ fontSize: '20px', lineHeight: 1.15 }}
            >
              {c.agentTitle}
            </div>
            <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--color-ink-soft)] max-w-[52ch]">
              {c.agentDesc}
            </p>
          </div>
        </div>

        {/* RIGHT — Hero stat + schematic */}
        <div className="col-span-12 md:col-span-6 flex flex-col">
          {/* Hero stat */}
          <div className="border-t border-b border-[var(--color-ink)]/30 py-4 px-2 flex items-center gap-6">
            <div className="flex-1">
              <div className="smallcaps text-[10px] text-[var(--color-mute)]">
                {c.statLabel}
              </div>
              <div
                className="display-italic leading-none mt-1"
                style={{
                  fontSize: 'clamp(72px, 9vw, 128px)',
                  color: 'var(--color-vermilion)',
                  letterSpacing: '-0.02em',
                }}
              >
                {c.statRange}
              </div>
              <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--color-ink-soft)] mt-2">
                {c.statSub}
              </div>
            </div>
            <div className="border-l border-[var(--color-ink)]/20 pl-5 self-stretch flex flex-col justify-center min-w-[140px]">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                {c.statFootA}
              </div>
              <div
                className="display-italic mt-1"
                style={{ fontSize: '26px', color: 'var(--color-sage)', lineHeight: 1 }}
              >
                {c.statFootB}
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)] mt-1">
                {c.statFootBSub}
              </div>
            </div>
          </div>

          {/* Schematic */}
          <div className="relative border border-[var(--color-ink)]/15 cover-frame mt-4 flex-1 min-h-[160px]">
            <VentSchematic />
            {/* Legend */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 bg-[var(--color-paper)]/85 px-2 py-1.5 border border-[var(--color-ink)]/15">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-ink-soft)]">
                <span className="inline-block w-3 h-2" style={{ background: 'var(--color-sage)', opacity: 0.35 }} />
                <span>{c.legendOk}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-ochre)]">
                <span className="inline-block w-3 h-2 border border-[var(--color-ochre)]" style={{ background: 'var(--color-ochre)', opacity: 0.4 }} />
                <span>{c.legendLow}</span>
              </div>
            </div>
            <div className="absolute bottom-1.5 left-2 font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--color-ink-soft)]">
              ↓ Underground · ventilation network
            </div>
          </div>
        </div>
      </div>

      {/* Findings */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="smallcaps text-[11px] text-[var(--color-ochre)]">{c.findingsLabel}</div>
          <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--color-mute)]">
            04 · agent
          </div>
        </div>
        <div className="rule" />
        <div className="grid grid-cols-4 gap-0">
          {c.findings.map(([place, finding], i) => (
            <div
              key={i}
              className="px-3 py-2.5 border-r border-[var(--color-ink)]/15 last:border-r-0"
            >
              <div className="font-mono text-[9px] tracking-[0.24em] text-[var(--color-mute)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="display mt-0.5 text-[14px] leading-tight">{place}</div>
              <div className="text-[10.5px] mt-1 leading-[1.4] text-[var(--color-ink-soft)]">
                {finding}
              </div>
            </div>
          ))}
        </div>
        <div className="rule" />
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
        <span>{c.foot}</span>
        <span>{c.footRight}</span>
      </div>
    </section>
  )
}
