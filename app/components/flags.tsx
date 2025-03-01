interface FlagProps {
  className?: string
}

export function FlagBrazil({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#009c3b" />
        <path d="M50,15 L85,50 L50,85 L15,50 Z" fill="#ffdf00" />
        <circle cx="50" cy="50" r="17" fill="#002776" />
      </svg>
    </div>
  )
}

export function FlagCanada({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="100" fill="#f00" x="0" />
        <rect width="40" height="100" fill="#fff" x="30" />
        <rect width="30" height="100" fill="#f00" x="70" />
        <path d="M50,35 L53,45 L63,45 L55,51 L58,61 L50,55 L42,61 L45,51 L37,45 L47,45 Z" fill="#f00" />
      </svg>
    </div>
  )
}

export function FlagGermany({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="33.33" fill="#000" y="0" />
        <rect width="100" height="33.33" fill="#ff0000" y="33.33" />
        <rect width="100" height="33.33" fill="#ffcc00" y="66.66" />
      </svg>
    </div>
  )
}

export function FlagSpain({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="25" fill="#aa151b" y="0" />
        <rect width="100" height="50" fill="#f1bf00" y="25" />
        <rect width="100" height="25" fill="#aa151b" y="75" />
      </svg>
    </div>
  )
}

export function FlagGreece({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#0d5eaf" />
        <rect width="100" height="11.11" fill="#fff" y="11.11" />
        <rect width="100" height="11.11" fill="#fff" y="33.33" />
        <rect width="100" height="11.11" fill="#fff" y="55.55" />
        <rect width="100" height="11.11" fill="#fff" y="77.77" />
        <rect width="33.33" height="55.55" fill="#fff" x="0" y="0" />
        <rect width="11.11" height="55.55" fill="#0d5eaf" x="11.11" y="0" />
        <rect width="33.33" height="11.11" fill="#0d5eaf" x="0" y="22.22" />
      </svg>
    </div>
  )
}

export function FlagUK({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#012169" />
        <path d="M0,0 L100,100 M100,0 L0,100" stroke="#fff" strokeWidth="10" />
        <path d="M50,0 L50,100 M0,50 L100,50" stroke="#fff" strokeWidth="16" />
        <path d="M50,0 L50,100 M0,50 L100,50" stroke="#c8102e" strokeWidth="10" />
        <path d="M0,0 L100,100 M100,0 L0,100" stroke="#c8102e" strokeWidth="6" />
      </svg>
    </div>
  )
}

export function FlagMexico({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="33.33" height="100" fill="#006847" x="0" />
        <rect width="33.33" height="100" fill="#fff" x="33.33" />
        <rect width="33.33" height="100" fill="#ce1126" x="66.66" />
        <circle cx="50" cy="50" r="10" fill="#6c3b2a" />
      </svg>
    </div>
  )
}

export function FlagIndonesia({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="50" fill="#ff0000" y="0" />
        <rect width="100" height="50" fill="#ffffff" y="50" />
      </svg>
    </div>
  )
}

export function FlagIreland({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="33.33" height="100" fill="#009B48" x="0" />
        <rect width="33.33" height="100" fill="#fff" x="33.33" />
        <rect width="33.33" height="100" fill="#FF7900" x="66.66" />
      </svg>
    </div>
  )
}

export function FlagIndia({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="33.33" fill="#FF9933" y="0" />
        <rect width="100" height="33.33" fill="#fff" y="33.33" />
        <rect width="100" height="33.33" fill="#138808" y="66.66" />
        <circle cx="50" cy="50" r="10" fill="#000080" />
      </svg>
    </div>
  )
}

export function FlagItaly({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="33.33" height="100" fill="#009246" x="0" />
        <rect width="33.33" height="100" fill="#fff" x="33.33" />
        <rect width="33.33" height="100" fill="#CE2B37" x="66.66" />
      </svg>
    </div>
  )
}

export function FlagJapan({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#fff" />
        <circle cx="50" cy="50" r="30" fill="#BC002D" />
      </svg>
    </div>
  )
}

export function FlagKorea({ className }: FlagProps) {
  return (
    <div className={`rounded-full overflow-hidden aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#fff" />
        <circle cx="50" cy="50" r="24" fill="#CD2E3A" />
        <path d="M50,26 A24,24 0 0 1 74,50" fill="#0047A0" />
        <path d="M50,74 A24,24 0 0 1 26,50" fill="#0047A0" />
      </svg>
    </div>
  )
}

