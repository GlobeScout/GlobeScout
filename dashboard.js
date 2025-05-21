import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase
const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
)

let COUNTRIES = []

// DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (!user || userError) return (window.location.href = 'index.html')

  const email = user.email

  // Länder laden
  const { data: countriesData, error: countriesError } = await supabase
  .from('countries')
  .select('*')

console.log("Supabase DATA:", countriesData)
console.log("Supabase ERROR:", countriesError)


  if (countriesError) {
    console.error('Fehler beim Laden der Länder:', countriesError)
    return
  }

  COUNTRIES = countriesData

  // Logout
  document.getElementById('logout-button')
    .addEventListener('click', async () => {
      await supabase.auth.signOut()
      location.href = 'index.html'
    })

  // Formular-Verarbeitung
  document.getElementById('profile-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault()

      const hobbies = document.getElementById('hobbies').value.toLowerCase()
      const income  = +document.getElementById('income').value
      const taxPref = +document.getElementById('taxPref').value
      const prefs   = document.getElementById('preferences').value.toLowerCase()

      let best = null
      let bestPt = -Infinity

      COUNTRIES.forEach(c => {
        let pts = 0

        // Einkommen
        pts -= Math.abs(c.cost - income / 50)

        // Steuerpräferenz
        if (c.taxRate !== null) {
          pts -= Math.abs(c.taxRate - taxPref) / 2
        }

        // Sicherheit
        if (prefs.includes('sicherheit')) pts += c.safety / 10

        // Klima
        if (prefs.includes('warm') && c.climate === 'warm') pts += 5
        if (prefs.includes('kalt') && c.climate === 'cold') pts += 5
        if (prefs.includes('hot') && c.climate === 'hot') pts += 5
        if (prefs.includes('tropisch') && c.climate === 'tropical') pts += 5
        if (prefs.includes('temperiert') && c.climate === 'temperate') pts += 5

        // Sprache
        if (prefs.includes('englisch') && c.lang.includes('english')) pts += 5
        if (prefs.includes('deutsch') && c.lang.includes('german')) pts += 5

        // Hobbys
        if (hobbies.includes('surfen') && c.surf) pts += 7
        if (hobbies.includes('ski') && c.climate === 'cold') pts += 4

        // Aktivitäten
        if (c.activities && Array.isArray(c.activities)) {
          c.activities.forEach(act => {
            if (hobbies.includes(act.toLowerCase())) pts += 3
          })
        }

        // Natur
        if (prefs.includes('natur')) pts += c.nature

        // LGBT
        if (prefs.includes('lgbt')) pts += c.lgbtFriendly

        // Nachtleben
        if (prefs.includes('nachtleben')) pts += c.nightlife

        // Best Match aktualisieren
        if (pts > bestPt) {
          bestPt = pts
          best = c
        }
      })

      if (!best) best = COUNTRIES[0]

      const resultText = `🏆 Dein perfektes Land: <strong>${best.name}</strong>`
      document.getElementById('recommendation').innerHTML = resultText
    })

  // ⭐ Bewertung
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', async () => {
      const v = +star.dataset.value
      // UI aktualisieren
      document.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('selected', +s.dataset.value <= v)
      })
      // In Supabase speichern
      await supabase.from('feedback').insert([{ email, stars: v }])
    })
  })
})
