// Each problem: { question, answer, explanation, steps, difficulty }
// difficulty: 'easy' (one-step) | 'hard' (two-step)

const wordProblems = [
  // --- EASY (one-step) ---
  {
    difficulty: 'easy',
    question: 'Jake has 24 apples. He gives 9 to his friend. How many apples does Jake have now?',
    answer: 15,
    explanation: 'Jake started with 24 apples and gave away 9, so we subtract: 24 − 9 = 15.',
    steps: ['Start with 24', 'Subtract 9', '24 − 9 = 15'],
  },
  {
    difficulty: 'easy',
    question: 'There are 38 birds sitting on a fence. 15 more birds land on the fence. How many birds are there now?',
    answer: 53,
    explanation: 'We add the new birds to the ones already there: 38 + 15 = 53.',
    steps: ['Start with 38', 'Add 15 more', '38 + 15 = 53'],
  },
  {
    difficulty: 'easy',
    question: 'A store has 120 toys. They sell 47 toys. How many toys are left?',
    answer: 73,
    explanation: 'We subtract the toys sold: 120 − 47 = 73.',
    steps: ['Start with 120', 'Subtract 47', '120 − 47 = 73'],
  },
  {
    difficulty: 'easy',
    question: 'Maria saved 56 stickers. Her mom gave her 34 more. How many stickers does Maria have?',
    answer: 90,
    explanation: 'Add the stickers together: 56 + 34 = 90.',
    steps: ['Start with 56', 'Add 34', '56 + 34 = 90'],
  },
  {
    difficulty: 'easy',
    question: 'There are 200 pages in a book. Sam has read 135 pages. How many pages are left to read?',
    answer: 65,
    explanation: 'Subtract the pages already read: 200 − 135 = 65.',
    steps: ['Total pages: 200', 'Already read: 135', '200 − 135 = 65'],
  },
  {
    difficulty: 'easy',
    question: 'A bus has 48 passengers. At the stop, 19 get off. How many passengers are still on the bus?',
    answer: 29,
    explanation: 'Subtract the passengers who left: 48 − 19 = 29.',
    steps: ['Start with 48', 'Subtract 19', '48 − 19 = 29'],
  },
  {
    difficulty: 'easy',
    question: 'Leo has 75 trading cards. He gets 28 more for his birthday. How many cards does he have now?',
    answer: 103,
    explanation: 'Add the new cards: 75 + 28 = 103.',
    steps: ['Start with 75', 'Add 28', '75 + 28 = 103'],
  },
  {
    difficulty: 'easy',
    question: 'A farmer picked 362 strawberries. She ate 18. How many are left?',
    answer: 344,
    explanation: 'Subtract the ones she ate: 362 − 18 = 344.',
    steps: ['Start with 362', 'Subtract 18', '362 − 18 = 344'],
  },
  // --- HARD (two-step) ---
  {
    difficulty: 'hard',
    question: 'Emma has 45 candies. She buys 30 more, then gives 20 to her friends. How many candies does Emma have now?',
    answer: 55,
    explanation: 'First add the new candies: 45 + 30 = 75. Then subtract the ones she gave away: 75 − 20 = 55.',
    steps: ['Step 1: 45 + 30 = 75', 'Step 2: 75 − 20 = 55'],
  },
  {
    difficulty: 'hard',
    question: 'A bakery made 150 muffins in the morning and 80 more in the afternoon. By evening they had sold 115. How many muffins are left?',
    answer: 115,
    explanation: 'First add all muffins made: 150 + 80 = 230. Then subtract the ones sold: 230 − 115 = 115.',
    steps: ['Step 1: 150 + 80 = 230', 'Step 2: 230 − 115 = 115'],
  },
  {
    difficulty: 'hard',
    question: 'A library had 520 books. They donated 75 books and then received 40 new books. How many books does the library have now?',
    answer: 485,
    explanation: 'First subtract the donated books: 520 − 75 = 445. Then add the new ones: 445 + 40 = 485.',
    steps: ['Step 1: 520 − 75 = 445', 'Step 2: 445 + 40 = 485'],
  },
  {
    difficulty: 'hard',
    question: 'Tom scored 38 points in the first game and 47 in the second game. His friend scored 60 points total. How many more points did Tom score than his friend?',
    answer: 25,
    explanation: "First add Tom's points: 38 + 47 = 85. Then subtract his friend's score: 85 − 60 = 25.",
    steps: ["Step 1: 38 + 47 = 85 (Tom's total)", 'Step 2: 85 − 60 = 25'],
  },
  {
    difficulty: 'hard',
    question: 'A garden has 200 flowers. In spring, 85 new flowers bloom. In summer, 120 flowers wilt. How many flowers are there now?',
    answer: 165,
    explanation: 'First add the new flowers: 200 + 85 = 285. Then subtract the ones that wilted: 285 − 120 = 165.',
    steps: ['Step 1: 200 + 85 = 285', 'Step 2: 285 − 120 = 165'],
  },
  {
    difficulty: 'hard',
    question: 'A school collected 340 cans on Monday and 215 cans on Tuesday. They gave 180 cans to a food bank. How many cans do they have left?',
    answer: 375,
    explanation: 'First add all the cans: 340 + 215 = 555. Then subtract the ones given away: 555 − 180 = 375.',
    steps: ['Step 1: 340 + 215 = 555', 'Step 2: 555 − 180 = 375'],
  },
]

export default wordProblems
