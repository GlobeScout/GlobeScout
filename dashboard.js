import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
)

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (!user || userError) return (window.location.href = 'index.html')
  const email = user.email

  const { data: COUNTRIES, error: countriesError } = await supabase
    .from('countries')
    .select('*')

  if (countriesError || !COUNTRIES) {
    console.error('Fehler beim Laden der Länder:', countriesError)
    return
  }

  // Logout
  document.getElementById('logout-button').addEventListener('click', async () => {
    await supabase.auth.signOut()
    location.href = 'index.html'
  })

  // Matching-Algorithmus
  function findBestMatch(hobbies, income, taxPref, prefs) {
    let best = null
    let bestScore = -Infinity

    COUNTRIES.forEach(c => {
      let score = 0

      const targetCost = income / 50
      score -= Math.abs(c.cost - targetCost) * 1.5

      if (c.taxRate !== null) {
        score -= Math.abs(c.taxRate - taxPref) * 0.8
      }

      if (prefs.includes('sicherheit')) score += (c.safety || 0) * 0.4

      if (prefs.includes('warm') && c.climate === 'warm') score += 5
      if (prefs.includes('kalt') && c.climate === 'cold') score += 5
      if (prefs.includes('hot') && c.climate === 'hot') score += 5
      if (prefs.includes('tropisch') && c.climate === 'tropical') score += 5
      if (prefs.includes('temperiert') && c.climate === 'temperate') score += 5

      if (prefs.includes('englisch') && c.lang?.includes('english')) score += 5
      if (prefs.includes('deutsch') && c.lang?.includes('german')) score += 5

      if (prefs.includes('natur')) score += (c.nature || 0) * 1
      if (prefs.includes('lgbt')) score += (c.lgbtFriendly || 0) * 1
      if (prefs.includes('nachtleben')) score += (c.nightlife || 0) * 1

      if (hobbies.includes('surfen') && c.surf) score += 8
      if (hobbies.includes('ski') && c.climate === 'cold') score += 5

      if (Array.isArray(c.activities)) {
        c.activities.forEach(act => {
          if (hobbies.includes(act.toLowerCase())) score += 3
        })
      }

      if (score > bestScore) {
        bestScore = score
        best = c
      }
    })

    return best
  }

  // Formular
  document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const hobbies = document.getElementById('hobbies').value.toLowerCase()
    const income = +document.getElementById('income').value || 50000
    const taxPref = +document.getElementById('taxPref').value || 25
    const prefs = document.getElementById('preferences').value.toLowerCase()

    const best = findBestMatch(hobbies, income, taxPref, prefs)

    const resultText = `🏆 Dein perfektes Land: <strong>${best.name}</strong>`
    document.getElementById('recommendation').innerHTML = resultText
  })

  // ⭐ Feedback
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
