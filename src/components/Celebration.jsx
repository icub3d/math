import { useState, useEffect } from 'react'

export default function Celebration({ show }) {
  const [stars] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 0.3,
      size: Math.random() * 20 + 16,
    }))
  )

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute animate-bounce"
          style={{
            left: `${s.left}%`,
            top: '-10px',
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: '0.6s',
          }}
        >
          ⭐
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-yellow-300 text-yellow-900 text-4xl font-extrabold rounded-3xl px-10 py-6 shadow-2xl animate-bounce">
          🎉 Correct! 🎉
        </div>
      </div>
    </div>
  )
}
