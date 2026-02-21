import { useState, useCallback, useRef, useEffect } from 'react'
import Layout from '../../components/Layout.jsx'
import NumberPad from '../../components/NumberPad.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import PlaceValueHint from './PlaceValueHint.jsx'
import { generateProblem } from './problems.js'
import { useUser } from '../../context/UserContext.jsx'

const GAME_ID = 'addition-subtraction'

export default function AddSubtract() {
  const { addStar, difficulty, setDifficulty } = useUser()
  const [problem, setProblem] = useState(() => generateProblem(difficulty))
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [celebrate, setCelebrate] = useState(false)
  const inputRef = useRef(null)

  const nextProblem = useCallback((diff = difficulty) => {
    setProblem(generateProblem(diff))
    setInput('')
    setShowHint(false)
    setFeedback(null)
  }, [difficulty])

  // Sync with global difficulty
  useEffect(() => {
    nextProblem(difficulty)
  }, [difficulty, nextProblem])

  function changeDifficulty(d) {
    setDifficulty(d)
  }

  function submit() {
    if (!input) return
    const guess = parseInt(input, 10)
    if (guess === problem.answer) {
      addStar(GAME_ID)
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => {
        setCelebrate(false)
        nextProblem()
      }, 1500)
    } else {
      setFeedback('wrong')
      setInput('')
    }
  }

  return (
    <Layout title="➕➖ Add & Subtract" gameId={GAME_ID}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      {/* Problem display */}
      <div className="bg-white rounded-3xl shadow-lg px-10 py-8 mb-6 text-center">
        <div className="text-6xl font-extrabold text-gray-800 tracking-wide">
          {problem.a} {problem.op} {problem.b} = ?
        </div>
      </div>

      {/* Answer input display */}
      <div className="relative mb-4">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={input}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
            if (feedback !== 'correct') setInput(val)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && feedback !== 'correct') submit()
          }}
          placeholder="_ _ _ _"
          className={`text-5xl font-bold h-20 w-48 text-center rounded-2xl border-4 transition-colors outline-none
            ${feedback === 'wrong' ? 'border-red-400 bg-red-50 text-red-500' : 'border-sky-300 bg-white text-gray-800 focus:border-sky-500 shadow-inner'}`}
        />
        {/* Visual cue for focus if needed */}
      </div>

      {feedback === 'wrong' && (
        <p className="text-red-500 font-bold text-lg mb-4">Not quite — try again! 💪</p>
      )}

      <NumberPad
        value={input}
        onChange={feedback === 'correct' ? () => {} : setInput}
        onSubmit={feedback === 'correct' ? () => {} : submit}
      />

      {/* Hint toggle */}
      <button
        onClick={() => setShowHint((h) => !h)}
        className="mt-6 text-sky-600 underline text-sm font-semibold"
        aria-label="Toggle place value hint"
      >
        {showHint ? 'Hide hint' : '💡 Show place value hint'}
      </button>

      {showHint && (
        <div className="mt-4 bg-white rounded-2xl p-6 shadow w-full max-w-sm">
          <p className="text-center text-gray-500 text-sm font-semibold mb-3">Place value blocks</p>
          <div className="mb-3">
            <p className="text-center text-gray-600 font-bold mb-2">{problem.a}</p>
            <PlaceValueHint number={problem.a} />
          </div>
          <div className="border-t my-3" />
          <div>
            <p className="text-center text-gray-600 font-bold mb-2">{problem.b}</p>
            <PlaceValueHint number={problem.b} />
          </div>
        </div>
      )}
    </Layout>
  )
}
