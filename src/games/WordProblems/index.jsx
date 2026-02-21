import { useState, useMemo } from 'react'
import Layout from '../../components/Layout.jsx'
import NumberPad from '../../components/NumberPad.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import allProblems from '../../data/wordProblems.js'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function WordProblems() {
  const [difficulty, setDifficulty] = useState('easy')
  const [input, setInput] = useState('')
  const [tries, setTries] = useState(0)          // wrong attempts on current problem
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong' | 'hint'
  const [celebrate, setCelebrate] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const pool = useMemo(
    () => shuffle(allProblems.filter((p) => p.difficulty === difficulty)),
    [difficulty]
  )
  const [index, setIndex] = useState(0)
  const problem = pool[index % pool.length]

  function advance() {
    setIndex((i) => i + 1)
    setInput('')
    setTries(0)
    setRevealed(false)
    setFeedback(null)
  }

  function changeDifficulty(d) {
    setDifficulty(d)
    setIndex(0)
    setInput('')
    setTries(0)
    setRevealed(false)
    setFeedback(null)
  }

  function submit() {
    if (!input || revealed) return
    const guess = parseInt(input, 10)
    if (guess === problem.answer) {
      setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }))
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => {
        setCelebrate(false)
        advance()
      }, 2000)
    } else {
      const newTries = tries + 1
      setTries(newTries)
      setInput('')
      if (newTries >= 2) {
        // Reveal answer after 2 wrong attempts
        setScore((s) => ({ ...s, total: s.total + 1 }))
        setRevealed(true)
        setFeedback('revealed')
      } else {
        setFeedback('wrong')
      }
    }
  }

  return (
    <Layout title="📖 Word Problems" score={score}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      {/* Question card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 max-w-lg w-full">
        <p className="text-2xl font-semibold text-gray-800 leading-relaxed">{problem.question}</p>
      </div>

      {/* Feedback / revealed state */}
      {feedback === 'wrong' && (
        <p className="text-red-500 font-bold text-lg mb-3">
          Not quite! Try #{tries + 1} 💪
        </p>
      )}

      {revealed ? (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5 max-w-lg w-full mb-4">
          <p className="text-yellow-700 font-bold text-lg mb-2">The answer is {problem.answer}.</p>
          <p className="text-gray-700 mb-3">{problem.explanation}</p>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            {problem.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <button
            onClick={advance}
            className="mt-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-xl px-6 py-2 transition-colors"
          >
            Next Problem →
          </button>
        </div>
      ) : (
        <>
          {/* Input display */}
          <div className={`text-5xl font-bold mb-4 h-14 flex items-center justify-center rounded-2xl w-48 border-4 transition-colors
            ${feedback === 'wrong' ? 'border-red-400 bg-red-50 text-red-500' : 'border-sky-300 bg-white text-gray-800'}`}>
            {input || <span className="text-gray-300">_ _ _ _</span>}
          </div>
          <NumberPad value={input} onChange={setInput} onSubmit={submit} />
          <p className="text-gray-400 text-sm mt-4">
            {tries === 0 ? 'You have 2 chances!' : `1 chance left!`}
          </p>
        </>
      )}
    </Layout>
  )
}
