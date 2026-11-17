import React from 'react';

/**
 * Fondo vectorial de alta definición (SVG) que recrea el diseño institucional de Catastro Coatzacoalcos:
 * - Color vino guinda institucional en gradiente profundo
 * - Capa cartográfica catastral vectorial (manzanas, predios, calles) en líneas doradas nítidas
 * - Anillos ornamentales concéntricos ampliados para alojar el emblema C más grande
 * - Corte angular blanco inferior derecho
 */
export default function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#741333] via-[#610d27] to-[#450516] flex flex-col">
      {/* Capa SVG Vectorial - Resolución infinita sin pixelado */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="goldLines" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#e5c158" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c59b4c" stopOpacity="0.25" />
          </linearGradient>

          <filter id="cutoutShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="-4" dy="-4" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Anillos concéntricos ornamentales alrededor del emblema C (ampliados) */}
        <g stroke="#d4af37" strokeWidth="1" strokeOpacity="0.14" fill="none">
          <circle cx="240" cy="450" r="170" />
          <circle cx="240" cy="450" r="210" strokeDasharray="5 7" />
          <circle cx="240" cy="450" r="250" strokeWidth="0.9" />
          <circle cx="240" cy="450" r="300" strokeDasharray="3 9" />
          <circle cx="240" cy="450" r="350" strokeOpacity="0.08" />
        </g>

        {/* 2. Patrón geométrico prehispánico en esquina inferior izquierda */}
        <g transform="translate(-20, 750)" stroke="#e5c158" strokeWidth="1.2" strokeOpacity="0.16" fill="none">
          <circle cx="90" cy="90" r="200" />
          <circle cx="90" cy="90" r="165" strokeDasharray="6 6" />
          <circle cx="90" cy="90" r="130" />
          <circle cx="90" cy="90" r="95" strokeDasharray="3 3" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 90 + 130 * Math.cos(angle);
            const y1 = 90 + 130 * Math.sin(angle);
            const x2 = 90 + 195 * Math.cos(angle);
            const y2 = 90 + 195 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* 3. Trazado Cartográfico Catastral Vectorial (Manzanas y Lotes) */}
        <g stroke="url(#goldLines)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas diagonales */}
          <path d="M 520,0 L 610,210 L 710,480 L 820,750 L 890,900" strokeWidth="2.2" strokeOpacity="0.45" />
          <path d="M 545,0 L 635,210 L 735,480 L 845,750 L 915,900" strokeWidth="1.2" strokeOpacity="0.25" />

          {/* Manzana Norte 1 */}
          <polygon points="630,30 760,20 740,140 645,130" strokeWidth="1.4" />
          <line x1="660" y1="28" x2="668" y2="132" />
          <line x1="695" y1="25" x2="695" y2="135" />
          <line x1="728" y1="22" x2="718" y2="138" />

          {/* Manzana Norte 2 */}
          <polygon points="780,18 890,10 870,130 760,135" strokeWidth="1.4" />
          <line x1="815" y1="15" x2="795" y2="133" />
          <line x1="850" y1="12" x2="830" y2="131" />

          {/* Manzana Centro 1 */}
          <polygon points="655,160 830,150 805,330 680,315" strokeWidth="1.6" />
          <line x1="695" y1="158" x2="710" y2="318" />
          <line x1="740" y1="155" x2="745" y2="322" />
          <line x1="785" y1="152" x2="775" y2="326" />
          <line x1="655" y1="240" x2="815" y2="235" strokeDasharray="3 3" strokeWidth="0.9" />

          {/* Manzana Centro 2 */}
          <polygon points="850,148 970,140 945,310 825,325" strokeWidth="1.4" />
          <line x1="890" y1="145" x2="865" y2="315" />
          <line x1="930" y1="142" x2="905" y2="312" />

          {/* Manzana Este */}
          <polygon points="700,345 850,335 825,510 730,490" strokeWidth="1.5" />
          <line x1="740" y1="342" x2="755" y2="495" />
          <line x1="780" y1="339" x2="790" y2="502" />
          <line x1="815" y1="336" x2="810" y2="508" />

          {/* Manzana Sur */}
          <polygon points="750,520 890,510 860,720 780,680" strokeWidth="1.6" />
          <line x1="790" y1="517" x2="810" y2="695" />
          <line x1="840" y1="513" x2="835" y2="705" />

          {/* Retícula urbana extendida */}
          <polygon points="800,710 930,700 900,890 830,880" strokeWidth="1.5" />
          <line x1="845" y1="707" x2="855" y2="883" />
          <line x1="890" y1="703" x2="880" y2="886" />

          {/* Calles secundarias de conexión */}
          <path d="M 400,120 L 520,120 L 640,140" strokeOpacity="0.4" />
          <path d="M 430,310 L 580,310 L 675,320" strokeOpacity="0.4" />
          <path d="M 500,480 L 640,480 L 725,490" strokeOpacity="0.4" />
          <path d="M 580,660 L 710,660 L 775,675" strokeOpacity="0.4" />
        </g>

        {/* 4. Corte Angular Blanco en Esquina Inferior Derecha */}
        <polygon
          points="1440,560 1440,900 1060,900"
          fill="#fbfbfb"
          filter="url(#cutoutShadow)"
        />
        <line
          x1="1060"
          y1="900"
          x2="1440"
          y2="560"
          stroke="#e8e8e8"
          strokeWidth="1.5"
        />
      </svg>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
