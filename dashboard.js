// Supabase importieren
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase-Daten
const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

console.log('✅ Dashboard geladen')

// 🕙 Code erst ausführen, wenn das DOM bereit ist
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-button')

  if (!logoutBtn) {
    console.error('❌ Logout-Button nicht gefunden.')
    return
  }

  logoutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('Fehler beim Logout: ' + error.message)
      return
    }
    console.log('👋 Abgemeldet')
    window.location.href = 'index.html'
  })
})
