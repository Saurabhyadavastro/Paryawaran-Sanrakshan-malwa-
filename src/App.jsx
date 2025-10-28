import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import SubmissionForm from './pages/SubmissionForm'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

// Debug logging
console.log('App.jsx loaded')

// ProtectedRoute component to guard routes that require authentication
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  console.log('ProtectedRoute check:', { user: !!user, loading })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-xl text-green-700">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

// Custom component to handle /index.html redirects intelligently
function IndexHtmlRedirect() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if user was trying to access admin
    const intendedPath = sessionStorage.getItem('intendedPath')
    
    if (intendedPath) {
      sessionStorage.removeItem('intendedPath')
      navigate(intendedPath, { replace: true })
    } else {
      // Default to homepage
      navigate('/', { replace: true })
    }
  }, [navigate])
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-xl text-green-700">Redirecting...</div>
    </div>
  )
}

function App() {
  console.log('App component rendering')
  
  // Check if URL has /admin in it (for Render's broken redirect)
  const shouldShowAdmin = window.location.pathname === '/index.html' && 
                          (window.location.hash.includes('admin') || 
                           sessionStorage.getItem('intendedPath') === '/admin')
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/index.html" element={shouldShowAdmin ? <AdminLogin /> : <Navigate to="/" replace />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <SubmissionForm />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
