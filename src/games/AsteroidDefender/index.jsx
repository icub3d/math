import { useState, useEffect, useRef, useCallback } from 'react'
import Layout from '../../components/Layout.jsx'
import Celebration from '../../components/Celebration.jsx'
import DifficultyToggle from '../../components/DifficultyToggle.jsx'
import { useStars } from '../../context/StarsContext.jsx'
import { generateAsteroidProblem } from './problems.js'

const GAME_ID = 'asteroid-defender'
const SPAWN_INTERVAL_BASE = 4000 
const SPEED_BASE = 0.06 // 0.06% per frame = ~16 seconds to cross screen

const STARS = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
}))

export default function AsteroidDefender() {
  const { addStar } = useStars()
  const [gameState, setGameState] = useState('menu')
  const [difficulty, setDifficulty] = useState('2nd-easy')
  const [score, setScore] = useState(0)
  const [asteroids, setAsteroids] = useState([])
  const [input, setInput] = useState('')
  const [celebrate, setCelebrate] = useState(false)
  const [lastShot, setLastShot] = useState(null)

  const inputRef = useRef(null)
  const scoreRef = useRef(0)
  const asteroidsRef = useRef([])
  const lastSpawnTime = useRef(0)
  const nextIdRef = useRef(1)

  const createAsteroid = useCallback((s, diff = difficulty) => {
    const prob = generateAsteroidProblem(s, diff)
    return {
      id: nextIdRef.current++,
      x: Math.random() * 80 + 10,
      y: 10, // Start clearly visible
      problem: `${prob.a}${prob.op}${prob.b}`,
      answer: prob.answer,
      size: 90,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
    }
  }, [difficulty])

  const endGame = useCallback(() => {
    setGameState('gameOver')
  }, [])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    scoreRef.current = 0
    nextIdRef.current = 1
    const first = createAsteroid(0, difficulty)
    asteroidsRef.current = [first]
    setAsteroids([first])
    setLastShot(null)
    setInput('')
    lastSpawnTime.current = Date.now()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(input, 10)
      const targetIdx = asteroidsRef.current.findIndex(a => a.answer === val)
      
      if (targetIdx !== -1) {
        const target = asteroidsRef.current[targetIdx]
        setLastShot({ x: target.x, y: target.y })
        setTimeout(() => setLastShot(null), 200)
        
        const nextAsteroids = asteroidsRef.current.filter((_, i) => i !== targetIdx)
        asteroidsRef.current = nextAsteroids
        setAsteroids(nextAsteroids)

        const newScore = scoreRef.current + 1
        scoreRef.current = newScore
        setScore(newScore)
        
        // Award a star for every 10 points
        if (newScore > 0 && newScore % 10 === 0) {
          addStar(GAME_ID)
          setCelebrate(true)
          setTimeout(() => setCelebrate(false), 1500)
        }
      }
      setInput('')
    }
  }

  // Stable Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return

    const interval = setInterval(() => {
      const currentScore = scoreRef.current
      const speedMult = 1 + (currentScore / 25)
      const spawnMult = Math.max(0.5, 1 - (currentScore / 100))
      
      // Move
      let next = asteroidsRef.current.map(a => ({
        ...a,
        y: a.y + SPEED_BASE * speedMult,
        rotation: a.rotation + a.rotSpeed
      }))

      // Check Collision
      if (next.some(a => a.y > 88)) {
        clearInterval(interval)
        endGame()
        return
      }

      // Spawn
      const now = Date.now()
      if (now - lastSpawnTime.current > SPAWN_INTERVAL_BASE * spawnMult) {
        lastSpawnTime.current = now
        next.push(createAsteroid(currentScore, difficulty))
      }

      asteroidsRef.current = next
      setAsteroids(next)
    }, 16) // ~60 FPS

    return () => clearInterval(interval)
  }, [gameState, endGame, createAsteroid, difficulty])

  useEffect(() => {
    if (gameState === 'playing') inputRef.current?.focus()
  }, [gameState, asteroids.length])

  return (
    <Layout title="🚀 Asteroid Defender" gameId={GAME_ID}>
      <Celebration show={celebrate} />
      
      <div className="relative w-full max-w-2xl h-[600px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {STARS.map((s) => (
            <div key={s.id} className="absolute bg-white rounded-full w-1 h-1" 
                 style={{ left: `${s.left}%`, top: `${s.top}%` }} />
          ))}
        </div>

        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-20">
            <h2 className="text-5xl font-black text-yellow-400 mb-6 uppercase italic tracking-tighter">Asteroid Defender</h2>
            
            <div className="mb-8">
              <DifficultyToggle difficulty={difficulty} onChange={setDifficulty} />
            </div>

            <p className="text-blue-100 mb-10 text-center px-12 text-xl leading-relaxed">
              Solve the problems to blast the asteroids!<br/>
              Type the answer and press <span className="text-yellow-400 font-bold">ENTER</span>.
            </p>
            <button onClick={startGame} className="bg-blue-600 hover:bg-blue-500 text-white text-3xl font-black py-5 px-12 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-transform hover:scale-105 active:scale-95">
              START MISSION
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/95 z-20">
            <h2 className="text-6xl font-black text-white mb-4">GAME OVER</h2>
            <p className="text-3xl font-bold text-yellow-400 mb-12">Final Score: {score}</p>
            <button onClick={startGame} className="bg-white text-red-700 text-2xl font-black py-4 px-10 rounded-2xl shadow-xl hover:bg-gray-100 transition-transform hover:scale-105">
              TRY AGAIN
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-2xl px-6 py-3 border-2 border-blue-500/50 z-10">
              <span className="text-blue-400 font-black text-3xl">{score}</span>
            </div>

            {asteroids.map(a => (
              <div 
                key={a.id}
                className="absolute flex items-center justify-center"
                style={{ 
                  left: `${a.x}%`, 
                  top: `${a.y}%`, 
                  width: `${a.size}px`, 
                  height: `${a.size}px`,
                  transform: `translate(-50%, -50%) rotate(${a.rotation}deg)`
                }}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
                  <path d="M50 5 L80 15 L95 45 L85 80 L50 95 L15 85 L5 50 L20 15 Z" fill="#475569" stroke="#facc15" strokeWidth="3" />
                  <circle cx="30" cy="35" r="6" fill="#334155" />
                  <circle cx="70" cy="60" r="10" fill="#334155" />
                </svg>
                <div className="relative z-10 text-white font-black text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ transform: `rotate(${-a.rotation}deg)` }}>
                  {a.problem}
                </div>
              </div>
            ))}

            {lastShot && (
              <svg className="absolute inset-0 pointer-events-none z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="78" x2={lastShot.x} y2={lastShot.y} stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                <line x1="50" y1="78" x2={lastShot.x} y2={lastShot.y} stroke="#fff" strokeWidth="0.5" strokeLinecap="round" />
              </svg>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-t-full border-4 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.6)]" />
              <div className="w-36 h-8 bg-slate-800 rounded-full border-b-4 border-slate-950" />
            </div>

            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <input
                ref={inputRef}
                autoFocus
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                onKeyDown={handleKeyDown}
                className="bg-black/80 border-4 border-blue-500 text-white text-5xl font-black w-40 h-24 text-center rounded-3xl outline-none pointer-events-auto shadow-[0_0_20px_rgba(59,130,246,0.4)] focus:border-yellow-400 transition-colors"
                placeholder="?"
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
