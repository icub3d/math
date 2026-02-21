import { Routes, Route, Link } from 'react-router-dom'
import './index.css'
import { useStars } from './context/StarsContext.jsx'
import AddSubtract from './games/AddSubtract/index.jsx'
import WordProblems from './games/WordProblems/index.jsx'
import TellTime from './games/TellTime/index.jsx'
import Polygons from './games/Polygons/index.jsx'
import EqualParts from './games/EqualParts/index.jsx'

const GAMES = [
  { id: 'addition-subtraction', path: '/addition-subtraction', label: '➕➖ Add & Subtract', description: 'Practice adding and subtracting numbers up to 1000', color: 'bg-yellow-300 hover:bg-yellow-400', ready: true },
  { id: 'word-problems',        path: '/word-problems',        label: '📖 Word Problems',   description: 'Solve fun one and two-step story problems',          color: 'bg-green-300 hover:bg-green-400',  ready: true },
  { id: 'polygons',             path: '/polygons',             label: '🔷 Polygons',        description: 'Identify shapes with 3, 4, 5, and 6 sides',          color: 'bg-blue-300 hover:bg-blue-400',    ready: true },
  { id: 'equal-parts',          path: '/equal-parts',          label: '🍕 Equal Parts',     description: 'Divide circles and rectangles into equal parts',     color: 'bg-pink-300 hover:bg-pink-400',    ready: true },
  { id: 'tell-time',            path: '/tell-time',            label: '🕐 Tell Time',       description: 'Read analog and digital clocks',                    color: 'bg-purple-300 hover:bg-purple-400', ready: true },
]

function Menu() {
  const { totalStars, stars } = useStars()
  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-extrabold text-sky-700 mb-2">🌟 Math Fun! 🌟</h1>
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl">⭐</span>
        <span className="text-3xl font-extrabold text-yellow-500">{totalStars}</span>
        <span className="text-lg text-gray-500 font-semibold">total stars earned</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {GAMES.map((game) => (
          <Link
            key={game.id}
            to={game.path}
            className={`${game.color} rounded-2xl p-6 text-left shadow-md transition-transform hover:scale-105`}
            aria-label={game.label}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-2xl font-bold text-gray-800">{game.label}</div>
              {(stars[game.id] ?? 0) > 0 && (
                <div className="flex items-center gap-1 bg-white bg-opacity-60 rounded-full px-2 py-0.5">
                  <span className="text-sm">⭐</span>
                  <span className="text-sm font-bold text-gray-700">{stars[game.id]}</span>
                </div>
              )}
            </div>
            <div className="text-gray-700">{game.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/addition-subtraction" element={<AddSubtract />} />
      <Route path="/word-problems" element={<WordProblems />} />
      <Route path="/tell-time" element={<TellTime />} />
      <Route path="/polygons" element={<Polygons />} />
      <Route path="/equal-parts" element={<EqualParts />} />
    </Routes>
  )
}
