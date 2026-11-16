interface MqLogoProps {
  width?: number;
  height?: number;
}

export function MqLogo({ width = 52, height = 28 }: MqLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 212 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 block"
    >
      <circle cx="147" cy="55" r="35" fill="none" stroke="var(--logo-q)" strokeWidth="18" />
      <polygon
        points="146,55 146,103 204,103"
        fill="#e5006c"
        stroke="var(--bg)"
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <line x1="16" y1="18" x2="20" y2="92" stroke="#28b8d5" strokeWidth="24" strokeLinecap="round" />
      <line x1="88" y1="18" x2="90" y2="92" stroke="#2aa8e3" strokeWidth="24" strokeLinecap="round" />
      <line x1="16" y1="18" x2="50" y2="80" stroke="#6d31b8" strokeWidth="24" strokeLinecap="round" />
      <line x1="50" y1="80" x2="88" y2="18" stroke="#ea4335" strokeWidth="24" strokeLinecap="round" />
      <circle cx="16" cy="18" r="4.6" fill="var(--bg)" stroke="var(--logo-hole-ring)" strokeWidth="2.2" />
      <circle cx="20" cy="92" r="4.6" fill="var(--bg)" stroke="var(--logo-hole-ring)" strokeWidth="2.2" />
      <circle cx="50" cy="80" r="4.6" fill="var(--bg)" stroke="var(--logo-hole-ring)" strokeWidth="2.2" />
      <circle cx="88" cy="18" r="4.6" fill="var(--bg)" stroke="var(--logo-hole-ring)" strokeWidth="2.2" />
      <circle cx="90" cy="92" r="4.6" fill="var(--bg)" stroke="var(--logo-hole-ring)" strokeWidth="2.2" />
    </svg>
  );
}
