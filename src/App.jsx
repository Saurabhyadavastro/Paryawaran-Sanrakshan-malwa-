import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
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

function App() {
  console.log('App component rendering')
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
