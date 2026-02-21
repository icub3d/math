import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STARS_KEY = 'math-fun-stars'
const DIFF_KEY = 'math-fun-difficulty'

function loadStars() {
  try {
    return JSON.parse(localStorage.getItem(STARS_KEY)) ?? {}
  } catch {
    return {}
  }
}

function loadDiff() {
  return localStorage.getItem(DIFF_KEY) ?? '2nd-easy'
}

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [stars, setStars] = useState(loadStars)
  const [difficulty, setDiffState] = useState(loadDiff)

  const addStar = useCallback((gameId) => {
    setStars((prev) => {
      const next = { ...prev, [gameId]: (prev[gameId] ?? 0) + 1 }
      localStorage.setItem(STARS_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const setDifficulty = useCallback((newDiff) => {
    setDiffState(newDiff)
    localStorage.setItem(DIFF_KEY, newDiff)
  }, [])

  const totalStars = Object.values(stars).reduce((sum, n) => sum + n, 0)

  return (
    <UserContext.Provider value={{ stars, addStar, totalStars, difficulty, setDifficulty }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
