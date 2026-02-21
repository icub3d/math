import { useState, useCallback, useEffect } from 'react'
import Layout from '../../components/Layout.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import Celebration from '../../components/Celebration.jsx'
import { DividedCircle, DividedRect } from './Shapes.jsx'
import { useStars } from '../../context/StarsContext.jsx'

const GAME_ID = 'equal-parts'

const PARTS_1ST = [2, 4]
const PARTS_2ND = [2, 3, 4]
const PART_NAMES = { 2: 'halves', 3: 'thirds', 4: 'fourths' }
const FRACTION_LABELS = { 2: '1/2', 3: '1/3', 4: '1/4' }

function randomQuestion(difficulty) {
  const partOptions = difficulty === '1st' ? PARTS_1ST : PARTS_2ND
  const parts = partOptions[Math.floor(Math.random() * partOptions.length)]
  const shape = Math.random() < 0.5 ? 'circle' : 'rectangle'
  return { parts, shape, key: Math.random() }
}

// Build 4 answer choices for "how many equal parts?" mode
function countChoices(correct) {
  const all = [2, 3, 4, 6]
  const others = all.filter((n) => n !== correct)
  const picks = others.sort(() => Math.random() - 0.5).slice(0, 3)
  return [correct, ...picks].sort(() => Math.random() - 0.5).map(String)
}

// Build 4 shape options for "which shape shows 1/n?" mode
// Returns array of {parts, shape} with one correct
function shapeChoices(correctParts, correctShape, difficulty) {
  const partOptions = difficulty === '1st' ? PARTS_1ST : PARTS_2ND
  const shapes = ['circle', 'rectangle']
  const options = new Map()
  const correctKey = `${correctParts}-${correctShape}`
  options.set(correctKey, { parts: correctParts, shape: correctShape })
  while (options.size < 4) {
    const p = partOptions[Math.floor(Math.random() * partOptions.length)]
    const s = shapes[Math.floor(Math.random() * shapes.length)]
    const k = `${p}-${s}`
    if (!options.has(k)) options.set(k, { parts: p, shape: s })
  }
  return [...options.values()].sort(() => Math.random() - 0.5)
}

export default function EqualParts() {
  const { addStar } = useStars()
  const [difficulty, setDifficulty] = useState('2nd-easy')
  // 1st & 2nd-easy = "how many parts?", 2nd-hard = "which shape shows 1/n?"
  const [question, setQuestion] = useState(() => randomQuestion('2nd-easy'))
  const [choices, setChoices] = useState(() => {
    const q = randomQuestion('2nd-easy')
    return countChoices(q.parts)
  })
  const [shapeOpts, setShapeOpts] = useState(() => {
    const q = randomQuestion('2nd-easy')
    return shapeChoices(q.parts, q.shape, '2nd-easy')
  })

  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [celebrate, setCelebrate] = useState(false)

  const next = useCallback((diff = difficulty) => {
    const q = randomQuestion(diff)
    setQuestion(q)
    setChoices(countChoices(q.parts))
    setShapeOpts(shapeChoices(q.parts, q.shape, diff))
    setSelected(null)
    setFeedback(null)
  }, [difficulty])

  function changeDifficulty(d) {
    setDifficulty(d)
    next(d)
  }

  // Easy mode: show divided shape, ask count
  const handleCountGuess = useCallback((opt) => {
    if (feedback === 'correct') return
    setSelected(opt)
    if (parseInt(opt) === question.parts) {
      addStar(GAME_ID)
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => { setCelebrate(false); next() }, 1800)
    } else {
      setFeedback('wrong')
    }
  }, [feedback, next, question.parts, addStar])

  // Hard mode: show fraction label, ask which shape matches
  const handleShapeGuess = useCallback((opt) => {
    if (feedback === 'correct') return
    setSelected(opt)
    if (opt === `${question.parts}-${question.shape}`) {
      addStar(GAME_ID)
      setFeedback('correct')
      setCelebrate(true)
      setTimeout(() => { setCelebrate(false); next() }, 1800)
    } else {
      setFeedback('wrong')
    }
  }, [feedback, next, question.parts, question.shape, addStar])

  useEffect(() => {
    function onKeyDown(e) {
      if (feedback === 'correct') return
      // 1-4 for either mode
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1
        if (difficulty !== '2nd-hard') {
          if (choices[idx]) handleCountGuess(choices[idx])
        } else {
          const opt = shapeOpts[idx]
          if (opt) handleShapeGuess(`${opt.parts}-${opt.shape}`)
        }
      }
      // Also allow direct digit for easy mode
      if (difficulty !== '2nd-hard' && choices.includes(e.key)) {
        handleCountGuess(e.key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [choices, difficulty, feedback, handleCountGuess, handleShapeGuess, shapeOpts])

  const ShapeComponent = question.shape === 'circle' ? DividedCircle : DividedRect

  return (
    <Layout title="🍕 Equal Parts" gameId={GAME_ID}>
      <Celebration show={celebrate} />
      <DifficultyToggle difficulty={difficulty} onChange={changeDifficulty} />

      {difficulty !== '2nd-hard' ? (
        <>
          <p className="text-xl font-semibold text-gray-600 mb-6">
            How many equal parts does this shape have?
          </p>
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 flex items-center justify-center">
            <ShapeComponent parts={question.parts} size={200} />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {choices.map((opt) => {
              let style = 'bg-white border-2 border-sky-300 text-gray-800 hover:bg-sky-50'
              if (selected && opt === String(question.parts)) style = 'bg-green-400 border-green-400 text-white'
              else if (opt === selected && feedback === 'wrong') style = 'bg-red-300 border-red-300 text-white'
              return (
                <button key={opt} onClick={() => handleCountGuess(opt)}
                  className={`${style} rounded-2xl py-3 text-2xl font-bold shadow transition-transform active:scale-95`}>
                  {opt}
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold text-gray-600 mb-2">
            Which shape is divided into <strong className="text-sky-600">{PART_NAMES[question.parts]}</strong>?
          </p>
          <p className="text-4xl font-extrabold text-sky-700 mb-6">{FRACTION_LABELS[question.parts]}</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {shapeOpts.map(({ parts, shape }) => {
              const key = `${parts}-${shape}`
              const correctKey = `${question.parts}-${question.shape}`
              const Comp = shape === 'circle' ? DividedCircle : DividedRect
              let border = 'border-2 border-sky-200 hover:border-sky-400'
              if (selected && key === correctKey) border = 'border-4 border-green-400 bg-green-50'
              else if (key === selected && feedback === 'wrong') border = 'border-4 border-red-400 bg-red-50'
              return (
                <button key={key} onClick={() => handleShapeGuess(key)}
                  className={`${border} rounded-2xl p-3 bg-white shadow transition-transform active:scale-95 flex flex-col items-center`}>
                  <Comp parts={parts} size={120} />
                  <span className="text-xs text-gray-400 mt-1">{parts} {PART_NAMES[parts]}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {feedback === 'wrong' && (
        <p className="text-red-500 font-bold text-lg mt-4">Not quite — try again! 💪</p>
      )}
    </Layout>
  )
}
