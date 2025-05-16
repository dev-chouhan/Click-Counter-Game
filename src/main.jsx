import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Add global styles directly in the entry point
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  :root {
    /* Purple theme with shades */
    --primary: #6200ea;
    --primary-light: #9d46ff;
    --primary-dark: #0a00b6;
    --text-color: #ffffff;
    --bg-color: #121212;
  }
  
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Press Start 2P', cursive;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  #root {
    max-width: 80%;
    margin: 0 auto;
    width: 100%;
  }
  
  * {
    box-sizing: border-box;
  }
  
  /* Custom scrollbar for the game feel */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--bg-color);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }
  
  /* Focus styles for accessibility */
  button:focus, input:focus, select:focus {
    outline: 3px solid var(--primary-light);
  }
`;

createRoot(document.getElementById('root')).render(
  <>
    {/* Add global styles */}
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    
    <StrictMode>
      <App />
    </StrictMode>
  </>,
);