// Supabase importieren
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://nvjgrewshdpwbebbkmiq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

console.log('✅ Dashboard geladen')

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-button')
  const form = document.getElementById('profile-form')
  const recommendationDiv = document.getElementById('recommendation')
  const stars = document.querySelectorAll('.star')

  // 🔐 Nutzer holen
  const { data: { user } } = await supabase.auth.getUser()
  const userEmail = user?.email

  if (!userEmail) {
    alert('Nicht eingeloggt – Weiterleitung zur Startseite.')
    window.location.href = 'index.html'
    return
  }

  // 🚪 Logout
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.href = 'index.html'
  })

  // 🧠 Länder-Empfehlungs-Logik
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const hobbies = document.getElementById('hobbies').value.toLowerCase()
    const income = parseInt(document.getElementById('income').value)
    const prefs = document.getElementById('preferences').value.toLowerCase()

    let country = 'Kanada'

    if (income < 1500) {
      country = 'Thailand'
    } else if (income > 3000 && prefs.includes('sicherheit')) {
      country = 'Schweiz'
    } else if (hobbies.includes('surfen') || prefs.includes('warm')) {
      country = 'Portugal'
    } else if (prefs.includes('sprache') && prefs.includes('englisch')) {
      country = 'Irland'
    }

    const message = `📬 Empfohlenes Land: ${country}`
    recommendationDiv.textContent = message

    // 📧 E-Mail senden über Supabase Edge Function oder DB (Simulation hier)
    const { error } = await supabase
      .from('emails')
      .insert([{ to: userEmail, message }])

    if (!error) {
      alert('Empfehlung wurde an deine E-Mail geschickt!')
    } else {
      console.error('Fehler beim E-Mail-Versand:', error.message)
    }
  })

  // ⭐ Feedback
  stars.forEach(star => {
    star.addEventListener('click', async () => {
      const value = parseInt(star.dataset.value)

      stars.forEach(s => s.classList.remove('selected'))
      for (let i = 0; i < value; i++) {
        stars[i].classList.add('selected')
      }

      console.log(`🌟 Feedback: ${value} Sterne`)

      // Feedback speichern
      await supabase
        .from('feedback')
        .insert([{ email: userEmail, stars: value }])
    })
  })
})
