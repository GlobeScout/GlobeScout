// Importiere Supabase-Client (ESM-Modul)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔧 Supabase-Konfiguration – HIER ERSETZEN!
const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co'        // <-- DEINE URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'                // <-- DEIN API-KEY

// Supabase-Client initialisieren
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Login-Formular & Nachrichtenelement referenzieren
const form = document.getElementById('login-form')
const message = document.getElementById('message')

// Event Listener für Login
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // Login mit E-Mail & Passwort
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    message.style.color = 'red'
    message.textContent = '❌ Fehler: ' + error.message
    return
  }

  message.style.color = 'green'
  message.textContent = '✅ Erfolgreich eingeloggt!'

  // Optional: Profildaten auslesen (falls Tabelle "profiles" existiert)
  const user = data.user
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.warn('⚠️ Kein Profil gefunden:', profileError.message)
    } else {
      console.log('👤 Benutzerprofil:', profile)
      // Optional: Profil anzeigen, redirect etc.
    }
  }
})
