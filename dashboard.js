import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
)

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (!user || userError) return (window.location.href = 'index.html')
  const email = user.email

  const { data: countriesData, error: countriesError } = await supabase
    .from('countries')
    .select('*')

  if (countriesError || !countriesData) {
    console.error('Fehler beim Laden der Länder:', countriesError)
    return
  }

  const COUNTRIES = countriesData

  document.getElementById('logout-button')
    .addEventListener('click', async () => {
      await supabase.auth.signOut()
      location.href = 'index.html'
    })

  document.getElementById('profile-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault()

      const hobbies = document.getElementById('hobbies').value.toLowerCase()
      const income = +document.getElementById('income').value
      const taxPref = +document.getElementById('taxPref').value
      const prefs = document.getElementById('preferences').value.toLowerCase()

      let best = null
      let bestPt = -Infinity

      COUNTRIES.forEach(c => {
        let pts = 0
        pts -= Math.abs(c.cost - income / 50)
        if (c.taxRate !== null) {
          pts -= Math.abs(c.taxRate - taxPref) / 2
        }

        if (prefs.includes('sicherheit')) pts += c.safety / 10
        if (prefs.includes('warm') && c.climate === 'warm') pts += 5
        if (prefs.includes('kalt') && c.climate === 'cold') pts += 5
        if (prefs.includes('hot') && c.climate === 'hot') pts += 5
        if (prefs.includes('tropisch') && c.climate === 'tropical') pts += 5
        if (prefs.includes('temperiert') && c.climate === 'temperate') pts += 5

        if (prefs.includes('englisch') && c.lang.includes('english')) pts += 5
        if (prefs.includes('deutsch') && c.lang.includes('german')) pts += 5

        if (hobbies.includes('surfen') && c.surf) pts += 7
        if (hobbies.includes('ski') && c.climate === 'cold') pts += 4

        if (c.activities && Array.isArray(c.activities)) {
          c.activities.forEach(act => {
            if (hobbies.includes(act.toLowerCase())) pts += 3
          })
        }

        if (prefs.includes('natur')) pts += c.nature
        if (prefs.includes('lgbt')) pts += c.lgbtFriendly
        if (prefs.includes('nachtleben')) pts += c.nightlife

        if (pts > bestPt) {
          bestPt = pts
          best = c
        }
      })

      if (!best) best = COUNTRIES[0]

      const resultText = `🏆 Dein perfektes Land: <strong>${best.name}</strong>`
      document.getElementById('recommendation').innerHTML = resultText
    })

  const stars = document.querySelectorAll('.star')
  const feedbackDiv = document.getElementById('feedback')
  let selectedValue = 0

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = +star.dataset.value
      stars.forEach(s => {
        s.classList.toggle('hover', +s.dataset.value <= val)
      })
    })

    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hover'))
    })

    star.addEventListener('click', async () => {
      const v = +star.dataset.value
      selectedValue = v
      stars.forEach(s => {
        s.classList.toggle('selected', +s.dataset.value <= v)
      })
      await supabase.from('feedback').insert([{ email, stars: v }])

      // Dankesnachricht anzeigen (nur einmal)
      if (!document.querySelector('.feedback-msg')) {
        const msg = document.createElement('p')
        msg.textContent = '🎉 Danke für dein Feedback!'
        msg.classList.add('feedback-msg')
        msg.style.color = 'green'
        msg.style.marginTop = '1rem'
        feedbackDiv.appendChild(msg)
      }
    })
  })
})
