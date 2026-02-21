// SVG divided circle
export function DividedCircle({ parts, size = 180, color = '#60a5fa' }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 8
  const lines = Array.from({ length: parts }, (_, i) => {
    const angle = ((2 * Math.PI * i) / parts) - Math.PI / 2
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  })
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="3" />
      {lines.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke={color} strokeWidth="2.5" />
      ))}
    </svg>
  )
}

// SVG divided rectangle
export function DividedRect({ parts, size = 180, color = '#f472b6' }) {
  const w = size, h = size * 0.6
  const dividers = Array.from({ length: parts - 1 }, (_, i) => {
    const x = (w / parts) * (i + 1)
    return { x }
  })
  return (
    <svg width={w} height={h}>
      <rect x={2} y={2} width={w - 4} height={h - 4} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="3" rx="8" />
      {dividers.map(({ x }, i) => (
        <line key={i} x1={x} y1={2} x2={x} y2={h - 2} stroke={color} strokeWidth="2.5" />
      ))}
    </svg>
  )
}
