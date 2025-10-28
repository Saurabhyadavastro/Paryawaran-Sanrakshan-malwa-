import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
// Using environment variables for deployment flexibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nzmfziglisspjqgddwtd.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bWZ6aWdsaXNzcGpxZ2Rkd3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjgxODgsImV4cCI6MjA3NzIwNDE4OH0.CaxP8bPwSua6YCbhGRcnaSqxXLEsxZFIq1BU--e5vaQ'

// Log environment check (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Environment variables loaded:', {
    hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
    hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
  })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
