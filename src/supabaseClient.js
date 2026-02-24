import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
// Using environment variables for deployment flexibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please create a .env file based on .env.example'
  )
}

// Log environment check (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase configured successfully')
  console.log('Project URL:', supabaseUrl)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
