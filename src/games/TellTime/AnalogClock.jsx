// SVG analog clock face. hour: 1-12, minute: 0-59
export default function AnalogClock({ hour, minute, size = 220 }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 8

  // Angles in degrees, 0 = 12 o'clock
  const minuteDeg = minute * 6               // 360/60
  const hourDeg = (hour % 12) * 30 + minute * 0.5 // 360/12 + drift

  function handEnd(deg, length) {
    const rad = ((deg - 90) * Math.PI) / 180
    return {
      x: cx + length * Math.cos(rad),
      y: cy + length * Math.sin(rad),
    }
  }

  const hourEnd = handEnd(hourDeg, r * 0.55)
  const minuteEnd = handEnd(minuteDeg, r * 0.78)

  // Tick marks
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isMajor = i % 5 === 0
    const deg = i * 6
    const rad = ((deg - 90) * Math.PI) / 180
    const inner = isMajor ? r * 0.82 : r * 0.90
    return {
      x1: cx + inner * Math.cos(rad),
      y1: cy + inner * Math.sin(rad),
      x2: cx + r * Math.cos(rad),
      y2: cy + r * Math.sin(rad),
      isMajor,
    }
  })

  // Hour number positions
  const hourLabels = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1
    const deg = num * 30
    const rad = ((deg - 90) * Math.PI) / 180
    return {
      num,
      x: cx + r * 0.70 * Math.cos(rad),
      y: cy + r * 0.70 * Math.sin(rad),
    }
  })

  return (
    <svg width={size} height={size} aria-label={`Clock showing ${hour}:${String(minute).padStart(2, '0')}`}>
      {/* Face */}
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#cbd5e1" strokeWidth="3" />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isMajor ? '#475569' : '#94a3b8'}
          strokeWidth={t.isMajor ? 2.5 : 1}
        />
      ))}

      {/* Hour labels */}
      {hourLabels.map(({ num, x, y }) => (
        <text
          key={num}
          x={x} y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.07}
          fontWeight="bold"
          fill="#1e293b"
        >
          {num}
        </text>
      ))}

      {/* Hour hand */}
      <line
        x1={cx} y1={cy}
        x2={hourEnd.x} y2={hourEnd.y}
        stroke="#1e293b" strokeWidth={size * 0.03} strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={cx} y1={cy}
        x2={minuteEnd.x} y2={minuteEnd.y}
        stroke="#3b82f6" strokeWidth={size * 0.018} strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.03} fill="#1e293b" />
    </svg>
  )
}
