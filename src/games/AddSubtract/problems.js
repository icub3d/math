function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function firstGradeProblem() {
  const op = Math.random() < 0.6 ? '+' : '-'
  // Simple numbers within 10
  const a = rand(1, 10)
  const b = op === '+' ? rand(1, 10 - a) : rand(1, a)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}

function secondGradeEasyProblem() {
  const op = Math.random() < 0.5 ? '+' : '-'
  // Simple numbers within 100, no multi-digit carrying/regrouping often
  const a = rand(10, 89)
  const b = op === '+' ? rand(1, 99 - a) : rand(1, a)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}

function secondGradeHardProblem() {
  const op = Math.random() < 0.5 ? '+' : '-'
  // Within 1000, multi-digit carrying/regrouping
  const a = rand(100, 899)
  const b = op === '+' ? rand(10, 999 - a) : rand(10, a - 1)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}

export function generateProblem(difficulty) {
  if (difficulty === '1st') return firstGradeProblem()
  if (difficulty === '2nd-easy') return secondGradeEasyProblem()
  return secondGradeHardProblem()
}

// Break a number into hundreds, tens, ones for the hint visual
export function placeValues(n) {
  return {
    hundreds: Math.floor(n / 100),
    tens: Math.floor((n % 100) / 10),
    ones: n % 10,
  }
}
