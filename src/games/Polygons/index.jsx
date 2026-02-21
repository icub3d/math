import { useState, useCallback } from 'react'
import Layout from '../../components/Layout.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import { useStars } from '../../context/StarsContext.jsx'

const GAME_ID = 'polygons'

const SHAPES = [
  { sides: 3, name: 'Triangle' },
  { sides: 4, name: 'Quadrilateral' },
  { sides: 5, name: 'Pentagon' },
  { sides: 6, name: 'Hexagon' },
]

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#c084fc', '#f472b6']

// Generate vertices of a polygon with n sides, optionally irregular (hard mode)
function polygonPoints(cx, cy, r, n, rotation, irregular) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n + rotation
    const radius = irregular ? r * (0.75 + Math.random() * 0.5) : r
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  })
}

function pointsToSVG(pts) {
  return pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')
}

function randomShape(difficulty) {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const rotation = Math.random() * Math.PI * 2
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const irregular = difficulty === 'hard'
  return { ...shape, rotation, color, irregular, key: Math.random() }
}

function buildChoices(correctSides, difficulty) {
  if (difficulty === 'easy') {
    // Name choices
    return SHAPES.map((s) => s.name).sort(() => Math.random() - 0.5)
  } else {
    // Side-count choices: correct + 3 distractors from the set
    return SHAPES.map((s) => String(s.sides)).sort(() => Math.random() - 0.5)
  }
}

export default function Polygons() {
  const { addStar } = useStars()
  const [difficulty, setDifficulty] = useState('easy')
  const [shape, setShape] = useState(() => randomShape('easy'))
  const [choices, setChoices] = useState(() => buildChoices(randomShape('easy').sides, 'easy'))
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [celebrate, setCelebrate] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const next = useCallback((diff = difficulty) => {
    const s = randomShape(diff)
    setShape(s)
    setChoices(buildChoices(s.sides, diff))
    setSelected(null)
    setFeedback(null)
    setShowHint(false)
  }, [difficulty])

  function changeDifficulty(d) {
    setDifficulty(d)
    next(d)
  }

  function guess(option) {
    if (feedback === 'correct') return
    const correct = difficulty === 'easy' ? shape.name : String(shape.sides)
    setSelected(option)
    if (option === correct) {
      addStar(GAME_ID)
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => {
        setCelebrate(false)
        next()
      }, 1800)
    } else {
      setFeedback('wrong')
    }
  }

  const cx = 110, cy = 110, r = 75
  const pts = polygonPoints(cx, cy, r, shape.sides, shape.rotation, shape.irregular)
  const correct = difficulty === 'easy' ? shape.name : String(shape.sides)

  return (
    <Layout title="🔷 Polygons" gameId={GAME_ID}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      <p className="text-xl font-semibold text-gray-600 mb-4">
        {difficulty === 'easy' ? 'What shape is this?' : 'How many sides does this shape have?'}
      </p>

      {/* Shape display */}
      <div className="bg-white rounded-3xl shadow-lg p-4 mb-6">
        <svg width={220} height={220} aria-label={`A ${shape.name.toLowerCase()} shape`}>
          <polygon
            points={pointsToSVG(pts)}
            fill={shape.color}
            fillOpacity="0.35"
            stroke={shape.color}
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-4">
        {choices.map((opt) => {
          let style = 'bg-white border-2 border-sky-300 text-gray-800 hover:bg-sky-50'
          if (selected && opt === correct) style = 'bg-green-400 border-green-400 text-white'
          else if (opt === selected && feedback === 'wrong') style = 'bg-red-300 border-red-300 text-white'
          return (
            <button
              key={opt}
              onClick={() => guess(opt)}
              className={`${style} rounded-2xl py-3 text-xl font-bold shadow transition-transform active:scale-95`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {feedback === 'wrong' && (
        <p className="text-red-500 font-bold text-lg mb-2">Try again! Count the sides 🔢</p>
      )}

      {/* Hint: draw dots on vertices */}
      <button
        onClick={() => setShowHint((h) => !h)}
        className="text-sky-600 underline text-sm font-semibold mt-1"
      >
        {showHint ? 'Hide hint' : '💡 Show side count hint'}
      </button>

      {showHint && (
        <div className="mt-3 bg-white rounded-2xl p-4 shadow text-center">
          <svg width={220} height={220}>
            <polygon
              points={pointsToSVG(pts)}
              fill={shape.color}
              fillOpacity="0.25"
              stroke={shape.color}
              strokeWidth="3"
            />
            {pts.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={10} fill="#1e293b" />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={10} fill="white" fontWeight="bold">{i + 1}</text>
              </g>
            ))}
          </svg>
          <p className="text-gray-600 font-semibold mt-1">This shape has <strong>{shape.sides}</strong> sides</p>
        </div>
      )}
    </Layout>
  )
}
