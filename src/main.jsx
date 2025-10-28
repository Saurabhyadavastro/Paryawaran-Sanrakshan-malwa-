import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Debug logging
console.log('Main.jsx loaded')
console.log('Environment check:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
})

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
} else {
  console.log('Root element found, rendering app...')
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
  console.log('App rendered successfully')
}

