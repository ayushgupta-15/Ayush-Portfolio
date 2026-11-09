type Props = { size?: number; className?: string };

/** Faceless head-and-shoulders mark: the head is a chip die with a glowing core. */
export default function Avatar({ size = 34, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Ayush Gupta"
      className={className}
    >
      <defs>
        <clipPath id="av-clip">
          <circle cx="32" cy="32" r="31" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#08111F" />
      <g clipPath="url(#av-clip)">
        {/* shoulders */}
        <path d="M6 66 C6 50 18 45 32 45 C46 45 58 50 58 66 Z" fill="#12294A" stroke="#22C7E8" strokeOpacity=".55" strokeWidth="1" />
        <path d="M24 45 L32 53 L40 45" fill="none" stroke="#22C7E8" strokeOpacity=".5" strokeWidth="1" />
        {/* neck */}
        <rect x="28" y="38" width="8" height="8" fill="#0E2238" />
        {/* pins */}
        <g stroke="#22C7E8" strokeWidth="1.4" strokeLinecap="round">
          <path d="M16 18h4M16 24h4M16 30h4" />
          <path d="M44 18h4M44 24h4M44 30h4" />
          <path d="M26 8v4M32 8v4M38 8v4" />
        </g>
        {/* head / die */}
        <rect x="20" y="12" width="24" height="26" rx="4" fill="#0E2238" stroke="#22C7E8" strokeWidth="1.5" />
        {/* traces */}
        <path d="M32 29v5M26 22h-3M38 22h3" stroke="#22C7E8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* core */}
        <rect x="27" y="17" width="10" height="10" rx="1.5" fill="#BFEFFF" />
      </g>
      <circle cx="32" cy="32" r="31" fill="none" stroke="#22C7E8" strokeOpacity=".8" strokeWidth="1.2" />
    </svg>
  );
}
