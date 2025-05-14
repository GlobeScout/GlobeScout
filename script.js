// Supabase client importieren (über CDN mit ESM-Support)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🟩 Deine Supabase-Konfiguration (ersetzen durch deine echten Werte)
const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co'       // z.B. https://xyzcompany.supabase.co
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'      // anon key, kein service_role!

// 🔧 Supabase Client initialisieren
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// 🔍 Referenzen zu HTML-Elementen
const form = document.getElementById('login-form')
const message = document.getElementById('message')

// 🧪 Optional: Konsole debuggen
console.log('Supabase verbunden:', supabase)

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // E-Mail und Passwort aus dem Formular
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  message.textContent = '⏳ Anmeldung läuft...'
  message.style.color = 'gray'

  // 🔐 Login bei Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  // Fehlerbehandlung
  if (error) {
    console.error('Login-Fehler:', error.message)
    message.textContent = '❌ Fehler: ' + error.message
    message.style.color = 'red'
    return
  }

  // Erfolg
  message.textContent = '✅ Erfolgreich eingeloggt!'
  message.style.color = 'green'

  const user = data.user
  console.log('👤 Angemeldeter Nutzer:', user)

  // 🔍 Optional: Lade Profil aus "profiles"-Tabelle
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.warn('⚠️ Kein Profil gefunden oder Fehler:', profileError.message)
  } else {
    console.log('👤 Profil geladen:', profile)
  }

  // ✅ Hier kannst du z.B. weiterleiten
  // window.location.href = "/dashboard.html"
})
