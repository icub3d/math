import './index.css'

const GAMES = [
  { id: 'addition-subtraction', label: '➕➖ Add & Subtract', description: 'Practice adding and subtracting numbers up to 1000', color: 'bg-yellow-300 hover:bg-yellow-400' },
  { id: 'word-problems',        label: '📖 Word Problems',   description: 'Solve fun one and two-step story problems',          color: 'bg-green-300 hover:bg-green-400' },
  { id: 'polygons',             label: '🔷 Polygons',        description: 'Identify shapes with 3, 4, 5, and 6 sides',          color: 'bg-blue-300 hover:bg-blue-400' },
  { id: 'equal-parts',          label: '🍕 Equal Parts',     description: 'Divide circles and rectangles into equal parts',     color: 'bg-pink-300 hover:bg-pink-400' },
  { id: 'tell-time',            label: '🕐 Tell Time',       description: 'Read analog and digital clocks',                    color: 'bg-purple-300 hover:bg-purple-400' },
]

function App() {
  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-extrabold text-sky-700 mb-2">🌟 Math Fun! 🌟</h1>
      <p className="text-xl text-sky-600 mb-10">Pick a game to play!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {GAMES.map((game) => (
          <button
            key={game.id}
            className={`${game.color} rounded-2xl p-6 text-left shadow-md transition-transform hover:scale-105 cursor-pointer`}
            aria-label={game.label}
          >
            <div className="text-2xl font-bold text-gray-800 mb-1">{game.label}</div>
            <div className="text-gray-700">{game.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
