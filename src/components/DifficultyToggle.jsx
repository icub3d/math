export default function DifficultyToggle({ difficulty, onChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {['easy', 'hard'].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`px-5 py-2 rounded-full font-bold capitalize transition-colors
            ${difficulty === d
              ? 'bg-sky-500 text-white shadow'
              : 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-50'}`}
        >
          {d === 'easy' ? '😊 Easy' : '🔥 Hard'}
        </button>
      ))}
    </div>
  )
}
