// Supabase importieren
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔧 Supabase-Projekt konfigurieren (ersetzen!)
const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

console.log('✅ Supabase verbunden:', supabase)

// 🔐 LOGIN-FORMULAR
const loginForm = document.getElementById('login-form')
const loginMessage = document.getElementById('login-message')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value

  loginMessage.textContent = '⏳ Anmeldung läuft...'
  loginMessage.style.color = 'gray'

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    loginMessage.textContent = '❌ Fehler: ' + error.message
    loginMessage.style.color = 'red'
    return
  }

  loginMessage.textContent = '✅ Login erfolgreich!'
  loginMessage.style.color = 'green'
  console.log('👤 Angemeldet als:', data.user)
})


// 🆕 REGISTRIERUNGS-FORMULAR
const signupForm = document.getElementById('signup-form')
const signupMessage = document.getElementById('signup-message')

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('signup-email').value
  const password = document.getElementById('signup-password').value

  signupMessage.textContent = '⏳ Registrierung läuft...'
  signupMessage.style.color = 'gray'

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    signupMessage.textContent = '❌ Fehler: ' + error.message
    signupMessage.style.color = 'red'
    return
  }

  signupMessage.textContent = '✅ Registriert! Bitte E-Mail bestätigen.'
  signupMessage.style.color = 'green'
  console.log('👤 Registrierter Benutzer:', data.user)
})
// Nach erfolgreichem Login
loginMessage.textContent = '✅ Login erfolgreich!'
loginMessage.style.color = 'green'

// Login/Signup-Formulare ausblenden
document.getElementById('login-form').style.display = 'none'
document.getElementById('signup-form').style.display = 'none'
document.querySelector('.tabs').style.display = 'none'

// Willkommensansicht anzeigen
document.getElementById('welcome-view').style.display = 'block'
