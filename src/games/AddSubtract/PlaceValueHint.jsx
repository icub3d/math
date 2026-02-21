import { placeValues } from './problems'

function Block({ color, label }) {
  return (
    <div className={`${color} rounded text-center text-xs font-bold text-white px-1 py-0.5`}>
      {label}
    </div>
  )
}

export default function PlaceValueHint({ number }) {
  const { hundreds, tens, ones } = placeValues(number)
  return (
    <div className="flex gap-4 items-end justify-center flex-wrap">
      {hundreds > 0 && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap gap-0.5 max-w-24 justify-center">
            {Array.from({ length: hundreds }).map((_, i) => (
              <div key={i} className="bg-blue-500 rounded w-8 h-8 text-white text-xs flex items-center justify-center font-bold">100</div>
            ))}
          </div>
          <span className="text-xs text-gray-500">{hundreds} hundred{hundreds !== 1 ? 's' : ''}</span>
        </div>
      )}
      {tens > 0 && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: tens }).map((_, i) => (
              <div key={i} className="bg-green-500 rounded w-8 h-4 text-white text-xs flex items-center justify-center font-bold">10</div>
            ))}
          </div>
          <span className="text-xs text-gray-500">{tens} ten{tens !== 1 ? 's' : ''}</span>
        </div>
      )}
      {ones > 0 && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap gap-0.5 max-w-20 justify-center">
            {Array.from({ length: ones }).map((_, i) => (
              <div key={i} className="bg-yellow-400 rounded-full w-6 h-6 text-white text-xs flex items-center justify-center font-bold">1</div>
            ))}
          </div>
          <span className="text-xs text-gray-500">{ones} one{ones !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  )
}
