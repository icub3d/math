import { Routes, Route, Link } from 'react-router-dom'
import './index.css'
import AddSubtract from './games/AddSubtract/index.jsx'
import WordProblems from './games/WordProblems/index.jsx'
import TellTime from './games/TellTime/index.jsx'

const GAMES = [
  { id: 'addition-subtraction', path: '/addition-subtraction', label: '➕➖ Add & Subtract', description: 'Practice adding and subtracting numbers up to 1000', color: 'bg-yellow-300 hover:bg-yellow-400', ready: true },
  { id: 'word-problems',        path: '/word-problems',        label: '📖 Word Problems',   description: 'Solve fun one and two-step story problems',          color: 'bg-green-300 hover:bg-green-400',  ready: true },
  { id: 'polygons',             path: '/polygons',             label: '🔷 Polygons',        description: 'Identify shapes with 3, 4, 5, and 6 sides',          color: 'bg-blue-200',                      ready: false },
  { id: 'equal-parts',          path: '/equal-parts',          label: '🍕 Equal Parts',     description: 'Divide circles and rectangles into equal parts',     color: 'bg-pink-200',                      ready: false },
  { id: 'tell-time',            path: '/tell-time',            label: '🕐 Tell Time',       description: 'Read analog and digital clocks',                    color: 'bg-purple-300 hover:bg-purple-400', ready: true },
]

function Menu() {
  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-extrabold text-sky-700 mb-2">🌟 Math Fun! 🌟</h1>
      <p className="text-xl text-sky-600 mb-10">Pick a game to play!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {GAMES.map((game) =>
          game.ready ? (
            <Link
              key={game.id}
              to={game.path}
              className={`${game.color} rounded-2xl p-6 text-left shadow-md transition-transform hover:scale-105`}
              aria-label={game.label}
            >
              <div className="text-2xl font-bold text-gray-800 mb-1">{game.label}</div>
              <div className="text-gray-700">{game.description}</div>
            </Link>
          ) : (
            <div
              key={game.id}
              className={`${game.color} rounded-2xl p-6 text-left shadow-md opacity-60 relative`}
              aria-label={`${game.label} — coming soon`}
            >
              <div className="text-2xl font-bold text-gray-500 mb-1">{game.label}</div>
              <div className="text-gray-500">{game.description}</div>
              <span className="absolute top-3 right-3 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full">Coming Soon</span>
            </div>
          )
        )}
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
    </Routes>
  )
}
