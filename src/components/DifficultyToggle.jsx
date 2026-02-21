export default function DifficultyToggle({ difficulty, onChange }) {
  const levels = [
    { id: '1st', label: '🎒 1st Grade' },
    { id: '2nd-easy', label: '😊 2nd - Easy' },
    { id: '2nd-hard', label: '🔥 2nd - Hard' },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {levels.map((lvl) => (
        <button
          key={lvl.id}
          onClick={() => onChange(lvl.id)}
          className={`px-5 py-2 rounded-full font-bold transition-colors
            ${difficulty === lvl.id
              ? 'bg-sky-500 text-white shadow'
              : 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-50'}`}
        >
          {lvl.label}
        </button>
      ))}
    </div>
  )
}
