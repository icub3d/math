function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateAsteroidProblem(score) {
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
  
  // Score 30-50: Medium (addition/subtraction within 100, no carries/regrouping maybe?)
  // Let's just make them harder
  if (score < 50) {
    const op = Math.random() < 0.5 ? '+' : '-'
    const a = rand(20, 80)
    const b = op === '+' ? rand(10, 100 - a) : rand(10, a)
    return { a, b, op, answer: op === '+' ? a + b : a - b }
  }
  
  // Score 50+: Hard (Within 200)
  const op = Math.random() < 0.5 ? '+' : '-'
  const a = rand(50, 150)
  const b = op === '+' ? rand(10, 200 - a) : rand(10, a)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}
