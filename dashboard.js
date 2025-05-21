import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase
const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'   // verkürzt
)

let COUNTRIES = []

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (!user || userError) return (window.location.href = 'index.html')

  const email = user.email

  // 🔄 Länder laden
  const { data: countriesData, error: countriesError } = await supabase
    .from('countries')
    .select('*')

  if (countriesError) {
    console.error('Fehler beim Laden der Länder:', countriesError)
    return
  }

  COUNTRIES = countriesData

  // Formular-Logik und Events wie bisher ...
})



// 🔐 User‑Check + DOM‑Ready
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return (window.location.href = 'index.html')
  const email = user.email

  // --- Logout
  document.getElementById('logout-button')
    .addEventListener('click', async () => {
      await supabase.auth.signOut()
      location.href = 'index.html'
    })

  // --- Formular
  document.getElementById('profile-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault()

      const hobbies = document.getElementById('hobbies').value.toLowerCase()
      const income  = +document.getElementById('income').value
      const prefs   = document.getElementById('preferences').value.toLowerCase()

      // 🧮  SIMPLE  SCORING
      let best   = null
      let bestPt = -Infinity

      COUNTRIES.forEach(c => {
        let pts = 0
        // Einkommen – je höher Budget, desto eher hochpreisige Länder
        pts -= Math.abs(c.cost - income / 50)         // grobe Normierung

        // Sicherheit
        if (prefs.includes('sicherheit')) pts += c.safety / 10

        // Klima‑Vorlieben
        if (prefs.includes('warm')  && c.climate === 'warm')  pts += 5
        if (prefs.includes('kalt')  && c.climate === 'cold')  pts += 5
        if (prefs.includes('hot')   && c.climate === 'hot')   pts += 5

        // Sprache
        if (prefs.includes('englisch') && c.lang.includes('english')) pts += 5
        if (prefs.includes('german')   && c.lang.includes('german'))  pts += 5

        // Surf / Outdoor
        if (hobbies.includes('surfen') && c.surf) pts += 7
        if (hobbies.includes('ski')    && c.climate === 'cold') pts += 4

        // Update best
        if (pts > bestPt) { bestPt = pts; best = c }
      })

      if (!best) best = COUNTRIES[0]                 // Fallback
      const resultText = `🏆 Dein perfektes Land: <strong>${best.name}</strong>`

      // → UI
      document.getElementById('recommendation').innerHTML = resultText

    
  // ⭐ Feedback (1–5)
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', async () => {
      const v = +star.dataset.value
      // UI
      document.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('selected', +s.dataset.value <= v)
      })
      // DB
      await supabase.from('feedback').insert([{ email, stars: v }])
    })
  })
})
