import { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/Layout.jsx'
import NumberPad from '../../components/NumberPad.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import PlaceValueHint from './PlaceValueHint.jsx'
import { generateProblem } from './problems.js'

export default function AddSubtract() {
  const [difficulty, setDifficulty] = useState('easy')
  const [problem, setProblem] = useState(() => generateProblem('easy'))
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [celebrate, setCelebrate] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const nextProblem = useCallback((diff = difficulty) => {
    setProblem(generateProblem(diff))
    setInput('')
    setShowHint(false)
    setFeedback(null)
  }, [difficulty])

  function changeDifficulty(d) {
    setDifficulty(d)
    nextProblem(d)
  }

  function submit() {
    if (!input) return
    const guess = parseInt(input, 10)
    if (guess === problem.answer) {
      setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }))
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => {
        setCelebrate(false)
        nextProblem()
      }, 1500)
    } else {
      setScore((s) => ({ ...s, total: s.total + 1 }))
      setFeedback('wrong')
      setInput('')
    }
  }

  // Allow keyboard entry
  useEffect(() => {
    function onKey(e) {
      if (feedback === 'correct') return
      if (e.key >= '0' && e.key <= '9') setInput((v) => (v.length < 4 ? v + e.key : v))
      if (e.key === 'Backspace') setInput((v) => v.slice(0, -1))
      if (e.key === 'Enter') submit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <Layout title="➕➖ Add & Subtract" score={score}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      {/* Problem display */}
      <div className="bg-white rounded-3xl shadow-lg px-10 py-8 mb-6 text-center">
        <div className="text-6xl font-extrabold text-gray-800 tracking-wide">
          {problem.a} {problem.op} {problem.b} = ?
        </div>
      </div>

      {/* Answer input display */}
      <div className={`text-5xl font-bold mb-4 h-14 flex items-center justify-center rounded-2xl w-48 border-4 transition-colors
        ${feedback === 'wrong' ? 'border-red-400 bg-red-50 text-red-500' : 'border-sky-300 bg-white text-gray-800'}`}>
        {input || <span className="text-gray-300">_ _ _ _</span>}
      </div>

      {feedback === 'wrong' && (
        <p className="text-red-500 font-bold text-lg mb-4">Not quite — try again! 💪</p>
      )}

      <NumberPad value={input} onChange={setInput} onSubmit={submit} />

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
