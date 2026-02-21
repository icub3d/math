import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'math-fun-stars'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const StarsContext = createContext(null)

export function StarsProvider({ children }) {
  const [stars, setStars] = useState(load)

  const addStar = useCallback((gameId) => {
    setStars((prev) => {
      const next = { ...prev, [gameId]: (prev[gameId] ?? 0) + 1 }
      save(next)
      return next
    })
  }, [])

  const totalStars = Object.values(stars).reduce((sum, n) => sum + n, 0)

  return (
    <StarsContext.Provider value={{ stars, addStar, totalStars }}>
      {children}
    </StarsContext.Provider>
  )
}

export function useStars() {
  return useContext(StarsContext)
}
