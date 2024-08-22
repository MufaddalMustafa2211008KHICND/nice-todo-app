import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './globals.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { ItemProvider } from '@/contexts/crudContext/useItems'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ItemProvider>
        <App />
      </ItemProvider>
    </Router>
  </StrictMode>
)
