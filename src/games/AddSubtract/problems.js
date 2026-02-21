function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function easyProblem() {
  const op = Math.random() < 0.5 ? '+' : '-'
  const a = rand(10, 99)
  const b = op === '+' ? rand(1, 100 - a) : rand(1, a)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}

function hardProblem() {
  const op = Math.random() < 0.5 ? '+' : '-'
  const a = rand(100, 900)
  const b = op === '+' ? rand(10, 1000 - a) : rand(10, a - 1)
  return { a, b, op, answer: op === '+' ? a + b : a - b }
}

export function generateProblem(difficulty) {
  return difficulty === 'easy' ? easyProblem() : hardProblem()
}

// Break a number into hundreds, tens, ones for the hint visual
export function placeValues(n) {
  return {
    hundreds: Math.floor(n / 100),
    tens: Math.floor((n % 100) / 10),
    ones: n % 10,
  }
}
