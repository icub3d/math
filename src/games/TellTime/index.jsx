import { useState, useCallback, useEffect } from 'react'
import Layout from '../../components/Layout.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import AnalogClock from './AnalogClock.jsx'
import { useStars } from '../../context/StarsContext.jsx'

const GAME_ID = 'tell-time'

// Valid minutes per difficulty
const MINUTES = { '1st': [0], '2nd-easy': [0, 30], '2nd-hard': [0, 15, 30, 45] }

function randomTime(difficulty) {
  const mins = MINUTES[difficulty]
  return {
    hour: Math.floor(Math.random() * 12) + 1,
    minute: mins[Math.floor(Math.random() * mins.length)],
  }
}

function formatTime(h, m) {
  return `${h}:${String(m).padStart(2, '0')}`
}

// Build answer choices: correct + 3 distractors
function buildChoices(hour, minute, difficulty) {
  const mins = MINUTES[difficulty]
  const correct = formatTime(hour, minute)
  const options = new Set([correct])
  while (options.size < 4) {
    const h = Math.floor(Math.random() * 12) + 1
    const m = mins[Math.floor(Math.random() * mins.length)]
    options.add(formatTime(h, m))
  }
  return [...options].sort(() => Math.random() - 0.5)
}

export default function TellTime() {
  const { addStar } = useStars()
  const [difficulty, setDifficulty] = useState('2nd-easy')
  const [choices, setChoices] = useState(() => {
    const t = randomTime('2nd-easy')
    return { time: t, options: buildChoices(t.hour, t.minute, '2nd-easy') }
  })
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [celebrate, setCelebrate] = useState(false)

  const next = useCallback((diff = difficulty) => {
    const t = randomTime(diff)
    setChoices({ time: t, options: buildChoices(t.hour, t.minute, diff) })
    setSelected(null)
    setFeedback(null)
  }, [difficulty])

  function changeDifficulty(d) {
    setDifficulty(d)
    next(d)
  }

  const guess = useCallback((option) => {
    if (feedback === 'correct') return
    const correct = formatTime(choices.time.hour, choices.time.minute)
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
  }, [choices.time.hour, choices.time.minute, feedback, addStar, next])

  useEffect(() => {
    function onKeyDown(e) {
      if (feedback === 'correct') return
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1
        if (choices.options[idx]) guess(choices.options[idx])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [choices.options, feedback, guess])

  const correctAnswer = formatTime(choices.time.hour, choices.time.minute)

  return (
    <Layout title="🕐 Tell Time" gameId={GAME_ID}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      <p className="text-xl font-semibold text-gray-600 mb-6">What time does this clock show?</p>

      {/* Clock */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <AnalogClock hour={choices.time.hour} minute={choices.time.minute} size={220} />
      </div>

      {/* Multiple choice buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {choices.options.map((opt) => {
          let style = 'bg-white border-2 border-sky-300 text-gray-800 hover:bg-sky-50'
          if (selected && opt === correctAnswer) style = 'bg-green-400 border-green-400 text-white'
          else if (opt === selected && feedback === 'wrong') style = 'bg-red-300 border-red-300 text-white'
          return (
            <button
              key={opt}
              onClick={() => guess(opt)}
              aria-label={`Choose ${opt}`}
              className={`${style} rounded-2xl py-4 text-3xl font-extrabold shadow transition-transform active:scale-95`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {feedback === 'wrong' && (
        <div className="mt-4 text-center">
          <p className="text-red-500 font-bold text-lg">Try again! 💪</p>
          <button
            onClick={() => { setSelected(null); setFeedback(null) }}
            className="mt-2 bg-sky-400 hover:bg-sky-500 text-white font-bold rounded-xl px-5 py-2 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </Layout>
  )
}
