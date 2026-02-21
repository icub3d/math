# Math Practice - Copilot Instructions

## Project Purpose
This is an interactive math practice web app for a 2nd grader. The goal is to make
**fun, engaging games** that help a child practice specific math skills. Keep the UI
colorful, encouraging, and age-appropriate. Celebrate correct answers with animations
or fun messages. Never make the child feel bad for wrong answers — use gentle, positive
feedback.

## Tech Stack
- **React** (Vite scaffold) — component-based UI
- **Tailwind CSS** — utility-first styling; prefer Tailwind classes over custom CSS
- **Hosted on Kubernetes** — keep the app stateless; no backend required; all state
  lives in React (localStorage is fine for progress/scores)

## Project Structure
```
src/
  components/    # Reusable UI components (buttons, progress bars, etc.)
  games/         # One directory per game module
  App.jsx        # Top-level router / game selector menu
  main.jsx
```

## Skill Areas & Game Ideas
Each of the following skill areas should have at least one dedicated game. Build them
as self-contained modules under `src/games/`.

### 1. Add & Subtract Within 1000
- Show a math problem (e.g. `347 + 285 = ?`) with a number input or on-screen keypad.
- Include a "place value" visual aid (hundreds/tens/ones blocks) as an optional hint.
- Vary difficulty: single-digit carries → multi-digit with regrouping.

### 2. One & Two-Step Word Problems
- Display a short, fun story problem (e.g. "Jake has 24 apples. He gives away 9. How many
  does he have left?").
- Accept a typed or tapped numeric answer.
- After answering, briefly explain the solution in simple language.
- Rotate a bank of age-appropriate word problems; allow adding new ones via a JSON config.

### 3. Identify Polygons (3–6 sides)
- Show an SVG shape and ask the child to name it (triangle, quadrilateral, pentagon,
  hexagon) or pick from multiple-choice buttons.
- Vary shape orientation and scale so children learn to identify by side count, not
  appearance alone.
- Include the side count as a hint the child can reveal.

### 4. Divide Circles & Rectangles Into Equal Parts
- Display a shape and ask the child to choose how many equal parts it is divided into,
  OR show a fraction and ask them to tap/click the correct divided shape.
- Animate the division lines appearing on the shape.
- Cover halves, thirds, and fourths.

### 5. Tell & Write Time
- Show an analog clock face (SVG with rotating hands) and ask what time it is.
- Alternatively show a digital time and ask the child to set the analog clock.
- Practice times to the hour, half-hour, and quarter-hour.

## Coding Guidelines
- **Component naming**: PascalCase for components, camelCase for utilities.
- **File naming**: Match component name (`GameMenu.jsx`, `AnalogClock.jsx`).
- **Tailwind**: Use responsive classes (`sm:`, `md:`) so the app works on tablets.
  Prefer a bright, cheerful color palette (yellows, blues, greens — avoid dark themes).
- **Accessibility**: Add `aria-label` to interactive elements; use sufficient color
  contrast for young readers.
- **Feedback**: Every game should track a session score (correct / total) visible on
  screen. Show a star or confetti animation on correct answers.
- **No external game libraries** unless truly necessary — keep the bundle small for k8s.
- **SVG shapes**: Draw shapes inline with React SVG elements, not image files.
- **Word problem bank**: Store problems in `src/data/wordProblems.js` as a plain array
  of objects `{ question, answer, explanation }`.
- **Difficulty levels**: Each game should support at least `easy` and `hard` modes,
  selectable from the game screen.

## Kubernetes Deployment Notes
- The app is served as a static build (`npm run build` → `dist/`).
- Use a lightweight image like `nginx:alpine` to serve `dist/`.
- The container should listen on port **8080** (non-root nginx config).
- A `Dockerfile` and basic `k8s/` manifests (Deployment + Service) should live at the
  repo root.
- No environment variables are required for the frontend; if any are ever needed, inject
  them at build time via Vite's `VITE_` prefix convention.
