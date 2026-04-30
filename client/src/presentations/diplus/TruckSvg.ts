// Top-down dump truck SVG. Points NORTH by default.
// viewBox cropped to truck content (translate of inner g baked into coordinates).
// Inline styles stripped (fill/stroke attributes carry the styling).

export const TRUCK_SVG = `
<svg viewBox="176 14 326 906" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyMain" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d4920a"/>
      <stop offset="15%" stop-color="#f5a623"/>
      <stop offset="50%" stop-color="#ffb833"/>
      <stop offset="85%" stop-color="#f5a623"/>
      <stop offset="100%" stop-color="#d4920a"/>
    </linearGradient>
    <linearGradient id="cabinTop" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#cc8a08"/>
      <stop offset="20%" stop-color="#e8a020"/>
      <stop offset="50%" stop-color="#f5b030"/>
      <stop offset="80%" stop-color="#e8a020"/>
      <stop offset="100%" stop-color="#cc8a08"/>
    </linearGradient>
    <linearGradient id="windshieldG" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#555"/>
      <stop offset="30%" stop-color="#2a2a2a"/>
      <stop offset="60%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#333"/>
    </linearGradient>
    <linearGradient id="windReflect" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#888" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#aaa" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#666" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="tolvaOuter" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c48508"/>
      <stop offset="10%" stop-color="#e09a18"/>
      <stop offset="50%" stop-color="#eeaa28"/>
      <stop offset="90%" stop-color="#e09a18"/>
      <stop offset="100%" stop-color="#c48508"/>
    </linearGradient>
    <linearGradient id="wallLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a87508"/>
      <stop offset="100%" stop-color="#c89010"/>
    </linearGradient>
    <linearGradient id="wallRight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d8a418"/>
      <stop offset="100%" stop-color="#b88a0c"/>
    </linearGradient>
    <linearGradient id="wallTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b08008"/>
      <stop offset="100%" stop-color="#c89815"/>
    </linearGradient>
    <linearGradient id="wallBottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d4a018"/>
      <stop offset="100%" stop-color="#b88a0c"/>
    </linearGradient>
    <linearGradient id="tolvaFloor" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b08010"/>
      <stop offset="40%" stop-color="#c49418"/>
      <stop offset="100%" stop-color="#aa7a0a"/>
    </linearGradient>
    <linearGradient id="tireG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#222"/>
      <stop offset="20%" stop-color="#3a3a3a"/>
      <stop offset="50%" stop-color="#444"/>
      <stop offset="80%" stop-color="#3a3a3a"/>
      <stop offset="100%" stop-color="#222"/>
    </linearGradient>
  </defs>

  <g transform="translate(190, 20)">
    <!-- TOLVA -->
    <rect x="18" y="348" width="264" height="540" rx="12" fill="rgba(0,0,0,0.094)"/>
    <rect x="12" y="340" width="276" height="540" rx="14" fill="url(#tolvaOuter)" stroke="#b07808" stroke-width="1.5"/>
    <polygon points="30,370 50,400 50,830 30,860" fill="url(#wallLeft)"/>
    <polygon points="270,370 250,400 250,830 270,860" fill="url(#wallRight)"/>
    <polygon points="30,370 270,370 250,400 50,400" fill="url(#wallTop)"/>
    <polygon points="30,860 270,860 250,830 50,830" fill="url(#wallBottom)"/>
    <rect x="50" y="400" width="200" height="430" rx="4" fill="url(#tolvaFloor)"/>
    <line x1="100" y1="400" x2="100" y2="830" stroke="#a07a0a" stroke-width="0.5" opacity="0.3"/>
    <line x1="150" y1="400" x2="150" y2="830" stroke="#a07a0a" stroke-width="0.5" opacity="0.3"/>
    <line x1="200" y1="400" x2="200" y2="830" stroke="#a07a0a" stroke-width="0.5" opacity="0.3"/>
    <rect x="12" y="340" width="276" height="6" rx="3" fill="#ddb030" opacity="0.6"/>
    <line x1="30" y1="370" x2="50" y2="400" stroke="#9a7008" stroke-width="1.2" opacity="0.6"/>
    <line x1="270" y1="370" x2="250" y2="400" stroke="#c8a018" stroke-width="1.2" opacity="0.6"/>
    <line x1="30" y1="860" x2="50" y2="830" stroke="#9a7008" stroke-width="1.2" opacity="0.6"/>
    <line x1="270" y1="860" x2="250" y2="830" stroke="#c8a018" stroke-width="1.2" opacity="0.6"/>

    <!-- CABINA -->
    <path d="M22,325 L22,90 Q22,14 78,14 L222,14 Q278,14 278,90 L278,325 Z" fill="url(#bodyMain)" stroke="#b58010" stroke-width="1.2"/>
    <rect x="10" y="200" width="14" height="120" rx="4" fill="#c08a0a" stroke="#a87508" stroke-width="0.8"/>
    <rect x="276" y="200" width="14" height="120" rx="4" fill="#c08a0a" stroke="#a87508" stroke-width="0.8"/>
    <rect x="48" y="8" width="204" height="12" rx="6" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="0.8"/>
    <rect x="52" y="10" width="24" height="8" rx="4" fill="#f0e050" opacity="0.9"/>
    <rect x="224" y="10" width="24" height="8" rx="4" fill="#f0e050" opacity="0.9"/>
    <path d="M55,30 L55,100 Q55,120 80,125 L220,125 Q245,120 245,100 L245,30 Q245,22 220,20 L80,20 Q55,22 55,30 Z" fill="url(#cabinTop)" stroke="#b88a10" stroke-width="0.8"/>
    <line x1="150" y1="22" x2="150" y2="120" stroke="#daa520" stroke-width="1.5" opacity="0.4"/>

    <!-- PARABRISAS -->
    <path d="M52,130 Q52,98 95,95 L205,95 Q248,98 248,130 L248,190 Q150,200 52,190 Z" fill="url(#windshieldG)" stroke="#333" stroke-width="1.2"/>
    <path d="M70,108 Q70,100 105,98 L180,98 Q200,100 200,108 L200,140 Q140,148 70,140 Z" fill="url(#windReflect)"/>
    <path d="M80,130 L120,105 L140,105 L90,140 Z" fill="#888" opacity="0.12"/>
    <path d="M52,130 Q52,98 95,95 L205,95 Q248,98 248,130 L248,190 Q150,200 52,190 Z" fill="none" stroke="#444" stroke-width="2"/>

    <!-- TECHO -->
    <rect x="72" y="210" width="156" height="90" rx="14" fill="url(#cabinTop)" stroke="#c89014" stroke-width="0.8"/>
    <rect x="95" y="218" width="110" height="26" rx="8" fill="#daa520" stroke="#c89014" stroke-width="0.5"/>
    <line x1="150" y1="210" x2="150" y2="300" stroke="#c89014" stroke-width="1" opacity="0.3"/>

    <!-- ESPEJOS -->
    <path d="M8,128 Q-4,125 -6,135 L-6,158 Q-4,168 8,165 L22,160 L22,133 Z" fill="#e09a18" stroke="#b07808" stroke-width="1"/>
    <rect x="-2" y="133" width="16" height="22" rx="3" fill="#2a2a2a"/>
    <path d="M292,128 Q304,125 306,135 L306,158 Q304,168 292,165 L278,160 L278,133 Z" fill="#e09a18" stroke="#b07808" stroke-width="1"/>
    <rect x="286" y="133" width="16" height="22" rx="3" fill="#2a2a2a"/>

    <!-- RUEDAS DELANTERAS -->
    <rect x="-8" y="180" width="30" height="70" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="-4" y1="188" x2="18" y2="188" stroke="#555" stroke-width="0.8"/>
    <line x1="-4" y1="195" x2="18" y2="195" stroke="#555" stroke-width="0.8"/>
    <line x1="-4" y1="202" x2="18" y2="202" stroke="#555" stroke-width="0.8"/>
    <line x1="-4" y1="230" x2="18" y2="230" stroke="#555" stroke-width="0.8"/>
    <line x1="-4" y1="237" x2="18" y2="237" stroke="#555" stroke-width="0.8"/>
    <line x1="-4" y1="244" x2="18" y2="244" stroke="#555" stroke-width="0.8"/>
    <rect x="278" y="180" width="30" height="70" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="282" y1="188" x2="304" y2="188" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="195" x2="304" y2="195" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="202" x2="304" y2="202" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="230" x2="304" y2="230" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="237" x2="304" y2="237" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="244" x2="304" y2="244" stroke="#555" stroke-width="0.8"/>

    <!-- RUEDAS TRASERAS -->
    <rect x="-10" y="750" width="32" height="68" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="-6" y1="758" x2="18" y2="758" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="765" x2="18" y2="765" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="772" x2="18" y2="772" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="800" x2="18" y2="800" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="807" x2="18" y2="807" stroke="#555" stroke-width="0.8"/>
    <rect x="278" y="750" width="32" height="68" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="282" y1="758" x2="306" y2="758" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="765" x2="306" y2="765" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="772" x2="306" y2="772" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="800" x2="306" y2="800" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="807" x2="306" y2="807" stroke="#555" stroke-width="0.8"/>
    <rect x="-10" y="826" width="32" height="68" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="-6" y1="834" x2="18" y2="834" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="841" x2="18" y2="841" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="876" x2="18" y2="876" stroke="#555" stroke-width="0.8"/>
    <line x1="-6" y1="883" x2="18" y2="883" stroke="#555" stroke-width="0.8"/>
    <rect x="278" y="826" width="32" height="68" rx="8" fill="url(#tireG)" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="282" y1="834" x2="306" y2="834" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="841" x2="306" y2="841" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="876" x2="306" y2="876" stroke="#555" stroke-width="0.8"/>
    <line x1="282" y1="883" x2="306" y2="883" stroke="#555" stroke-width="0.8"/>
  </g>
</svg>
`.trim()
