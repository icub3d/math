export default function NumberPad({ value, onChange, onSubmit }) {
  function press(char) {
    if (char === '⌫') {
      onChange(value.slice(0, -1))
    } else if (char === 'OK') {
      onSubmit()
    } else if (value.length < 4) {
      onChange(value + char)
    }
  }

  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '⌫', '0', 'OK']

  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => press(k)}
          aria-label={k === '⌫' ? 'backspace' : k === 'OK' ? 'submit' : k}
          className={`rounded-xl py-3 text-xl font-bold shadow transition-transform active:scale-95
            ${k === 'OK' ? 'bg-green-400 hover:bg-green-500 text-white' :
              k === '⌫' ? 'bg-red-300 hover:bg-red-400 text-white' :
              'bg-white hover:bg-sky-100 text-gray-800 border border-gray-200'}`}
        >
          {k}
        </button>
      ))}
    </div>
  )
}
