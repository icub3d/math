import { useUser } from '../context/UserContext.jsx'

export default function Layout({ title, gameId, children }) {
  const { stars } = useUser()
  const gameStars = gameId ? (stars[gameId] ?? 0) : null

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col">
      <header className="bg-sky-500 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <a
          href="/"
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 rounded-xl px-3 py-1 text-sm font-bold transition-colors"
          aria-label="Back to menu"
        >
          ← Menu
        </a>
        <h1 className="text-xl font-extrabold">{title}</h1>
        {gameStars != null ? (
          <div className="bg-sky-600 rounded-xl px-3 py-1 text-sm font-bold">
            ⭐ {gameStars}
          </div>
        ) : (
          <div className="w-16" />
        )}
      </header>
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {children}
      </main>
    </div>
  )
}
