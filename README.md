# Click Counter Game

A simple React-based click counting game where players try to click as many times as possible within a set time limit. The game supports pause/resume functionality and saves game results locally in the browser's localStorage with a live leaderboard.

---

## Features

- Set a time limit for each game (default 10 seconds).
- Enter player name before starting.
- Start, pause, resume, and finish game controls.
- Countdown timer with millisecond accuracy.
- Tracks clicks and pause count during gameplay.
- Saves game results (player name, time limit, clicks, pause count, timestamp) to localStorage.
- Leaderboard updates immediately on saving new results.
- Displays current date and time.

---

## How It Works

- When the player starts the game, the countdown timer begins from the chosen time limit.
- The game tracks clicks and pauses, freezing the timer during pauses.
- When the countdown reaches zero, the game stops automatically, alerts the player, and saves the results to localStorage.
- A custom browser event (`gameResultSaved`) triggers the leaderboard to refresh without needing a page reload.
- Players can reset the game at any time, which clears the current session without saving.

---

## Tech Stack & Usage

### React.js

- Used for building the interactive UI using functional components and hooks.
- State (`useState`) manages game status: countdown, clicks, pause state, and player info.
- Side effects (`useEffect`) manage timers and update the UI in real time.
- `useRef` keeps references to state values to ensure correct closure values inside intervals.
- Components (`GameHeader`, `GameControls`, `Leaderboard`) structure the app for clarity and reuse.

### JavaScript (ES6+)

- Implements game logic, timer calculations, event handling, and data manipulation.
- Uses modern features such as arrow functions, destructuring, and template literals.
- Utilizes `Date.now()` and `new Date()` for timestamp management.
- Dispatches and listens for custom events on the `window` object for component communication.

### Browser LocalStorage

- Persists game results across page reloads without a backend.
- Saves results as a JSON array under the key `"clickGameResults"`.
- Enables leaderboard retrieval and display of historical game data.

### HTML & CSS

- Structure and style UI components (header, controls, leaderboard).
- Responsive UI updates according to game state (e.g., enabling/disabling buttons).

### Custom Events (Browser API)

- Lightweight publish-subscribe model using native browser event dispatching.
- On saving game results, the app dispatches `"gameResultSaved"`, which the leaderboard listens for to update immediately.

### Timer Handling & Logic

- Uses `setInterval` within `useEffect` for accurate countdown updates (every 50ms).
- Tracks the absolute end time (`endTime`) in milliseconds.
- Pausing works by tracking pause start time and extending `endTime` by pause duration to freeze the timer.
- When countdown reaches zero, triggers alert, stops timer, saves game data, and dispatches update event.

---

## Potential Issues & Considerations

- **Timer Accuracy:** JavaScript timers may be slightly delayed due to browser throttling or CPU load, but 50ms intervals keep it reasonably smooth.
- **LocalStorage Limits:** Results storage depends on browser capacity; clearing old data may be needed if many games played.
- **UI Responsiveness:** Large leaderboard data might slow rendering; pagination or virtualization can improve performance.
- **Pause/Resume Edge Cases:** Rapid pause/resume toggles may cause minor timing inaccuracies; user experience should be tested.
- **Input Validation:** Player name is trimmed and checked for emptiness before starting the game; consider more validation if extended.
- **Accessibility:** Buttons and alerts should be accessible; consider ARIA labels and keyboard controls for improved usability.

---

## Running the Project

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app locally.
4. Open `http://localhost:5173` in your browser.

---

## Future Improvements

- Add sound effects for clicks and game start/end.
- Allow customizing leaderboard display with sorting and filtering.
- Enable exporting game results to CSV.
- Enhance UI with animations and transitions.
- Add mobile responsiveness and touch support.
- Implement user authentication and backend data storage.

---

Feel free to contribute or raise issues!

---

**Developed by Dev Chouhan**
