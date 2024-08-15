/* eslint-disable import/no-extraneous-dependencies */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './globals.css'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey:'AIzaSyDKe6SGEliK_wPKIua1_eO5VMXNDRG8iro',
  authDomain: 'authentication-84483.firebaseapp.com',
  projectId: 'authentication-84483',
  storageBucket: 'authentication-84483.appspot.com',
  messagingSenderId: '1001387320653',
  appId: '1:1001387320653:web:f3fb70908b2f9f51f3c304',
}

// Initialize Firebase
initializeApp(firebaseConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)

// export const database= getAuth(firebaseConfig)
