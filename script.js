import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co' // <-- Hier ersetzen
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM' // <-- Hier ersetzen

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
