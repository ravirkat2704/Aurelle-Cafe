// Layered café-counter composition drawn in SVG (no external assets). Overlaps the footer's top edge.
export default function FooterArt() {
  const beans = [[300, 244, 14], [322, 248, 10], [590, 246, 12], [612, 249, 9], [770, 247, 11], [150, 249, 9]];
  return (
    <svg viewBox="0 0 900 260" className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fa-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E6C892" /><stop offset="1" stopColor="#8A6A3C" /></linearGradient>
        <linearGradient id="fa-dark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3A271E" /><stop offset="1" stopColor="#1A100C" /></linearGradient>
        <radialGradient id="fa-glow"><stop offset="0" stopColor="#E9C98E" stopOpacity="0.65" /><stop offset="1" stopColor="#E9C98E" stopOpacity="0" /></radialGradient>
        <filter id="fa-blur"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* pendant lamps */}
      {[170, 450, 730].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="44" stroke="#302019" strokeWidth="2" />
          <circle cx={x} cy="66" r="46" fill="url(#fa-glow)" />
          <path d={`M${x - 22} 62a22 22 0 0 1 44 0z`} fill="url(#fa-gold)" />
          <circle cx={x} cy="64" r="5" fill="#FFF3D6" />
        </g>
      ))}

      {/* ground shadows */}
      <ellipse cx="180" cy="252" rx="130" ry="8" fill="#000" opacity="0.4" filter="url(#fa-blur)" />
      <ellipse cx="450" cy="252" rx="100" ry="8" fill="#000" opacity="0.4" filter="url(#fa-blur)" />
      <ellipse cx="730" cy="252" rx="105" ry="8" fill="#000" opacity="0.4" filter="url(#fa-blur)" />

      {/* espresso machine silhouette */}
      <g>
        <rect x="70" y="104" width="220" height="146" rx="8" fill="url(#fa-dark)" />
        <rect x="62" y="92" width="236" height="20" rx="6" fill="#26170F" />
        <rect x="70" y="112" width="220" height="2" fill="#C5A16A" opacity="0.7" />
        <circle cx="116" cy="146" r="17" fill="#1A100C" stroke="#C5A16A" strokeWidth="2" />
        <line x1="116" y1="146" x2="124" y2="137" stroke="#C5A16A" strokeWidth="2" />
        <circle cx="244" cy="146" r="17" fill="#1A100C" stroke="#C5A16A" strokeWidth="2" />
        <line x1="244" y1="146" x2="236" y2="137" stroke="#C5A16A" strokeWidth="2" />
        <rect x="152" y="132" width="56" height="26" rx="4" fill="#120A07" />
        <rect x="168" y="158" width="24" height="22" fill="#2E1D14" />
        <rect x="150" y="176" width="60" height="6" rx="3" fill="#C5A16A" />
        <rect x="160" y="204" width="40" height="46" rx="3" fill="#120A07" />
        <path d="M150 112V72a30 30 0 0 1 60 0v40" fill="none" stroke="#302019" strokeWidth="14" strokeLinecap="round" />
        <rect x="90" y="236" width="180" height="6" fill="#C5A16A" opacity="0.5" />
      </g>

      {/* cup & saucer with steam */}
      <g>
        <path d="M430 150c-6-10 8-16 0-28M452 154c-6-10 8-16 0-30M474 150c-6-10 8-16 0-28" fill="none" stroke="#C5A16A" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="452" cy="244" rx="86" ry="12" fill="url(#fa-gold)" />
        <ellipse cx="452" cy="240" rx="62" ry="8" fill="#5B4126" opacity="0.5" />
        <path d="M392 182h120c0 46-26 62-60 62s-60-16-60-62z" fill="url(#fa-gold)" />
        <ellipse cx="452" cy="182" rx="60" ry="9" fill="#3A1F12" />
        <ellipse cx="452" cy="182" rx="50" ry="6" fill="#6B3E22" />
        <path d="M512 192c28-4 34 26 4 34" fill="none" stroke="url(#fa-gold)" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* dessert on a plate with dome */}
      <g>
        <ellipse cx="730" cy="244" rx="96" ry="12" fill="#EFE5D8" />
        <ellipse cx="730" cy="241" rx="70" ry="8" fill="#CBBDA9" />
        <path d="M690 238l56-58 22 58z" fill="#503629" />
        <path d="M697 226l52-14 12 26-64 0z" fill="#EFE5D8" opacity="0.9" />
        <path d="M690 238l56-58 4 8-52 50z" fill="#6B4A38" />
        <circle cx="744" cy="176" r="8" fill="#8F2D2A" />
        <path d="M744 168c2-8 8-10 12-10" stroke="#3E5B2E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M636 238c0-60 40-110 94-110s94 50 94 110" fill="#F7F1E8" fillOpacity="0.1" stroke="#C5A16A" strokeOpacity="0.75" strokeWidth="2" />
        <circle cx="730" cy="124" r="6" fill="#C5A16A" />
      </g>

      {/* scattered coffee beans */}
      {beans.map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${i * 37} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.62} fill="#503629" />
          <path d={`M${x - r * 0.8} ${y}q${r * 0.8} ${-r * 0.4} ${r * 1.6} 0`} stroke="#1A100C" strokeWidth="1.6" fill="none" />
        </g>
      ))}
      <rect x="0" y="248" width="900" height="12" fill="#211713" />
    </svg>
  );
}
