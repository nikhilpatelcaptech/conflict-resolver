Neo Conflict Resolver - Standalone
=================================

This is a minimal standalone React + Webpack project that renders the
Conflict Resolver UI. It uses simple Webpack and Babel setup, no Vite.

Structure:
- package.json
- webpack.config.js
- .babelrc
- public/
  - index.html
- src/
  - index.js
  - App.js
  - ConflictResolver/
    - index.js
    - ConflictResolver.js
    - useConflictResolver.js
    - ScalarConflictView.js
    - ObjectConflictView.js
    - ScriptConflictView.js
    - mockData.js

How to run:

1. Install dependencies

   npm install

2. Start dev server

   npm start

   This runs `webpack serve` on http://localhost:3000 by default and opens
   the browser.

3. Build for production

   npm run build

What it does:

- Loads a mock conflict API response from `src/ConflictResolver/mockData.js`.
- Renders a two-pane Conflict Resolver UI:
  - Left pane: list of conflicts with status (Resolved / kind).
  - Right pane: detailed view for selected conflict:
    - scalar: simple current vs incoming values with buttons.
    - object: JSON diff using `react-diff-viewer-continued`.
    - script: Monaco diff viewer + editable merged script textarea.
- Once all conflicts are resolved, the "Apply & Log Merged Object" button
  becomes enabled. Clicking it logs the final merged `workingDraft` and
  sessionId to the browser console.

To integrate with your real API:

- Replace the mock object in `mockData.js` with your actual API response.
- Update `App.js` and/or `ConflictResolver/index.js` to fetch data instead
  of importing the mock.
- In `ConflictResolver.js`, replace `handleApply` with a call to your
  backend (e.g. `fetch` or `axios`) to submit the merged object.
