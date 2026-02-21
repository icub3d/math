function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateAsteroidProblem(score, difficulty = '2nd-easy') {
  // If 1st grade, always stay very simple regardless of score (or scale much slower)
  if (difficulty === '1st') {
    const op = Math.random() < 0.7 ? '+' : '-'
    const max = score < 20 ? 10 : 20
    const a = rand(1, max - 1)
    const b = op === '+' ? rand(1, max - a) : rand(1, a)
    return { a, b, op, answer: op === '+' ? a + b : a - b }
  }

  // 2nd Grade logic (original scaling)
  
  // Score 0-10: Very easy (addition/subtraction within 20)
  if (score < 10) {
    const op = Math.random() < 0.6 ? '+' : '-'
    const a = rand(1, 15)
    const b = op === '+' ? rand(1, 20 - a) : rand(1, a)
    return { a, b, op, answer: op === '+' ? a + b : a - b }
  }
  
  // Score 10-30: Easy (addition/subtraction within 50)
  if (score < 30) {
    const op = Math.random() < 0.5 ? '+' : '-'
    const a = rand(10, 40)
    const b = op === '+' ? rand(1, 50 - a) : rand(1, a)
    return { a, b, op, answer: op === '+' ? a + b : a - b }
  }
  
  // Score 30-50: Medium (addition/subtraction within 100)
  if (score < 50) {
    const op = Math.random() < 0.5 ? '+' : '-'
    const a = rand(20, 80)
    const b = op === '+' ? rand(10, 100 - a) : rand(10, a)
    return { a, b, op, answer: op === '+' ? a + b : a - b }
  }
  
  // Score 50+: Hard (Within 200+)
  const op = Math.random() < 0.5 ? '+' : '-'
  const a = rand(50, 150)
  const b = op === '+' ? rand(10, 250 - a) : rand(10, a)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}
