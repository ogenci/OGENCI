import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: './api/.env' })

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkTables() {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .limit(1)
  
  if (error) {
    console.error('Error fetching bookings:', error.message)
    if (error.message.includes('not find the table')) {
      console.log('CRITICAL: The "bookings" table is missing from your Supabase database.')
    }
  } else {
    console.log('SUCCESS: "bookings" table found.')
  }
}

checkTables()
