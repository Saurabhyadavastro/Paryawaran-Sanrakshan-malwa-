import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://nzmfziglisspjqgddwtd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bWZ6aWdsaXNzcGpxZ2Rkd3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjgxODgsImV4cCI6MjA3NzIwNDE4OH0.CaxP8bPwSua6YCbhGRcnaSqxXLEsxZFIq1BU--e5vaQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
