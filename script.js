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
 // Weiterleitung nach erfolgreichem Login
setTimeout(() => {
  console.log('🔁 Weiterleitung zu dashboard.html ...')
  window.location.href = 'dashboard.html'
}, 1000)  // 1 Sekunde Warten für die Erfolgsmeldung

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
// Jeder Block unabhängig: Toggle mit CSS-Klasse
document.querySelectorAll('.block-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling
    content.classList.toggle('show')
  })
})

    // Sichtbarkeit umschalten
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } else {
      content.style.display = 'block'
    }
  })
})
