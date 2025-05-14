import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://your-project.supabase.co' // <-- Hier ersetzen
const SUPABASE_KEY = 'your-public-anon-key' // <-- Hier ersetzen

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const form = document.getElementById('login-form')
const message = document.getElementById('message')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    message.textContent = 'Fehler: ' + error.message
  } else {
    message.style.color = 'green'
    message.textContent = 'Erfolgreich eingeloggt!'
    // Weiterleitung oder Daten anzeigen...
  }
})
