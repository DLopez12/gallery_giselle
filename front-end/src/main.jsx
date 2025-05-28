import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Font: Hanken-Grotesk
import '@fontsource/hanken-grotesk/300.css'; // Light weight 300
import '@fontsource/hanken-grotesk'; // Default weight 400
import '@fontsource/hanken-grotesk/400-italic.css'; // Italic weight 400
import '@fontsource/hanken-grotesk/500.css'; // Medium weight 500 
import '@fontsource/hanken-grotesk/600.css'; // Semi Bold weight 600
import '@fontsource/hanken-grotesk/700.css'; // Bold weight 700
import '@fontsource/hanken-grotesk/800.css'; // Extra Bold weight 800

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
