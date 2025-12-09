import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 🚨 Swallow Monaco's "TextModel got disposed..." error to avoid WDS red overlay
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      if (
        event.message &&
        event.message.includes(
          'TextModel got disposed before DiffEditorWidget model got reset'
        )
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
