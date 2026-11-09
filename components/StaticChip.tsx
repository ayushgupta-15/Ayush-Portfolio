export default function StaticChip() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of a silicon chip connected to a network of nodes" className="static-chip">
      <g fill="none" stroke="#22C7E8" strokeWidth="1.5" opacity="0.7">
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i}>
            <path d={`M${120 + i * 20} 120 V70 L${100 + i * 25} 40`} />
            <path d={`M${120 + i * 20} 280 V330 L${100 + i * 25} 360`} />
            <path d={`M120 ${120 + i * 20} H70 L40 ${100 + i * 25}`} />
            <path d={`M280 ${120 + i * 20} H330 L360 ${100 + i * 25}`} />
          </g>
        ))}
      </g>
      <rect x="120" y="120" width="160" height="160" rx="6" fill="#16213A" stroke="#22C7E8" strokeWidth="2" />
      <rect x="152" y="152" width="96" height="96" rx="3" fill="#0B1B2E" stroke="#8B5CF6" strokeWidth="2" />
      <g stroke="#22C7E8" strokeWidth="1" fill="none" opacity="0.7">
        {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={163 + c * 28} y={163 + r * 28} width="20" height="20" />))}
      </g>
    </svg>
  );
}
