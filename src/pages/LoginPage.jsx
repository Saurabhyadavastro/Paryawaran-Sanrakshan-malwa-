import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

// 3D Leaf component
function Leaf() {
  return (
    <mesh rotation={[0, 0, 0]}>
      {/* Leaf shape using a custom geometry */}
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#22c55e" wireframe opacity={0.6} transparent />
    </mesh>
  )
}

// Animated Plant component
function Plant() {
  return (
    <group>
      {/* Stem */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      
      {/* Leaves at different positions */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[0, 0, -0.5]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      
      <mesh position={[0.8, 1, 0]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  )
}

// Rotating plant scene
function RotatingPlant() {
  return (
    <mesh rotation-y={0}>
      <Plant />
    </mesh>
  )
}

function LoginPage() {
  const { user, signIn, signUp, loading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/form')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsAuthenticating(true)

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsAuthenticating(false)
      return
    }

    if (isSignUp) {
      // Sign Up
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setIsAuthenticating(false)
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        setIsAuthenticating(false)
        return
      }

      const { error } = await signUp(email, password)
      
      if (error) {
        setError(error.message)
        setIsAuthenticating(false)
      } else {
        setError(null)
        alert('Account created! Please check your email to verify your account, then sign in.')
        setIsSignUp(false)
        setPassword('')
        setConfirmPassword('')
        setIsAuthenticating(false)
      }
    } else {
      // Sign In
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
        setIsAuthenticating(false)
      }
      // If successful, useEffect will redirect to /form
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
          <p className="mt-4 text-green-800 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
          <Plant />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-4 drop-shadow-lg">
            पर्यावरण संरक्षण गतिविधि
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-green-700 drop-shadow-md">
            Environment Conservation Activities
          </h2>
          <p className="mt-4 text-lg md:text-xl text-green-600 max-w-2xl mx-auto">
            Join us in documenting and celebrating environmental conservation efforts across Malwa region
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg max-w-md"
          >
            <p className="font-semibold">⚠️ {error}</p>
          </motion.div>
        )}

        {/* Email/Password Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                required
                disabled={isAuthenticating}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                disabled={isAuthenticating}
              />
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isAuthenticating}
                />
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isAuthenticating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </motion.button>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setPassword('')
                  setConfirmPassword('')
                }}
                className="text-green-600 hover:text-green-700 font-medium text-sm underline"
                disabled={isAuthenticating}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </motion.div>

        <p className="mt-6 text-green-700 text-sm max-w-md text-center">
          🌱 Sign in to submit your environmental conservation activities and track your contributions
        </p>
      </motion.div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-400 to-transparent opacity-50"></div>
    </motion.div>
  )
}

export default LoginPage
