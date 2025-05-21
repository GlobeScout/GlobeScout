import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase
const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'
)

// ⚙️ Länder‑Daten (Erweitert mit mehr Aktivitäten)
const COUNTRIES = [
  {
    name: 'Portugal',
    cost: 75,
    safety: 70,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'warm',
    lang: ['portuguese', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 4,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Spanien',
    cost: 80,
    safety: 70,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'warm',
    lang: ['spanish', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 4,
    nature: 5,
    nightlife: 5,
    lgbtFriendly: 4
  },
  {
    name: 'Griechenland',
    cost: 65,
    safety: 65,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'warm',
    lang: ['greek', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Italien',
    cost: 90,
    safety: 75,
    surf: true,
    hiking: true,
    skiing: true,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'warm',
    lang: ['italian', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 4,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 3
  },
  {
    name: 'Frankreich',
    cost: 95,
    safety: 80,
    surf: true,
    hiking: true,
    skiing: true,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'temperate',
    lang: ['french', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 4,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Deutschland',
    cost: 100,
    safety: 85,
    surf: false,
    hiking: true,
    skiing: true,
    diving: false,
    climbing: true,
    cityLife: true,
    climate: 'temperate',
    lang: ['german', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 4,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Niederlande',
    cost: 95,
    safety: 85,
    surf: false,
    hiking: true,
    skiing: false,
    diving: false,
    climbing: false,
    cityLife: true,
    climate: 'temperate',
    lang: ['dutch', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 3,
    nightlife: 4,
    lgbtFriendly: 5
  },
  {
    name: 'Dänemark',
    cost: 110,
    safety: 90,
    surf: false,
    hiking: true,
    skiing: false,
    diving: false,
    climbing: false,
    cityLife: true,
    climate: 'cold',
    lang: ['danish', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 5
  },
  {
    name: 'Norwegen',
    cost: 115,
    safety: 92,
    surf: false,
    hiking: true,
    skiing: true,
    diving: false,
    climbing: true,
    cityLife: true,
    climate: 'cold',
    lang: ['norwegian', 'english'],
    remoteFriendly: true,
    visaEase: 2,
    healthcare: 5,
    nature: 5,
    nightlife: 2,
    lgbtFriendly: 5
  },
  {
    name: 'Schweiz',
    cost: 120,
    safety: 95,
    surf: false,
    hiking: true,
    skiing: true,
    diving: false,
    climbing: true,
    cityLife: true,
    climate: 'cold',
    lang: ['german', 'french', 'italian'],
    remoteFriendly: true,
    visaEase: 2,
    healthcare: 5,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 4
  },
  {
    name: 'Österreich',
    cost: 105,
    safety: 90,
    surf: false,
    hiking: true,
    skiing: true,
    diving: false,
    climbing: true,
    cityLife: true,
    climate: 'cold',
    lang: ['german', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 4
  },
  {
    name: 'Irland',
    cost: 95,
    safety: 80,
    surf: true,
    hiking: true,
    skiing: false,
    diving: false,
    climbing: false,
    cityLife: true,
    climate: 'temperate',
    lang: ['english', 'irish'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 4,
    nature: 4,
    nightlife: 4,
    lgbtFriendly: 5
  },
  {
    name: 'Türkei',
    cost: 55,
    safety: 60,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'warm',
    lang: ['turkish', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 2
  },

  // Nord‑ & Mittelamerika
  {
    name: 'Kanada',
    cost: 85,
    safety: 90,
    surf: false,
    hiking: true,
    skiing: true,
    diving: false,
    climbing: true,
    cityLife: true,
    climate: 'cold',
    lang: ['english', 'french'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 5
  },
  {
    name: 'USA',
    cost: 100,
    safety: 75,
    surf: true,
    hiking: true,
    skiing: true,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'temperate',
    lang: ['english', 'spanish'],
    remoteFriendly: true,
    visaEase: 2,
    healthcare: 2,
    nature: 5,
    nightlife: 5,
    lgbtFriendly: 5
  },
  {
    name: 'Mexiko',
    cost: 60,
    safety: 45,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'hot',
    lang: ['spanish', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 4,
    nightlife: 4,
    lgbtFriendly: 3
  },
  {
    name: 'Costa Rica',
    cost: 65,
    safety: 70,
    surf: true,
    hiking: true,
    skiing: false,
    diving: true,
    climbing: true,
    cityLife: true,
    climate: 'hot',
    lang: ['spanish', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 4
  }
]

// ⚙️ Bewertung der Länder basierend auf Nutzereingaben
export async function scoreCountries(formData) {
  const {
    budget,
    income,
    remoteWork,
    preferredClimate,
    preferredLang,
    hobbies,
    safetyImportance,
    natureImportance,
    nightlifeImportance,
    lgbtImportance,
    healthcareImportance,
    visaEaseImportance,
    importanceIncome // neu, als Gewichtung
  } = formData

  const scores = COUNTRIES.map(country => {
    let score = 0

    // Kostenbewertung (Kosten ≤ Budget geben mehr Punkte)
    score += Math.max(0, (budget - country.cost)) * 2

    // Wichtigkeit vom Einkommen: weniger dominant (25% Gewicht)
    if (income) {
      score += (income / country.cost) * 10 * (importanceIncome || 0.25)
    }

    // Remote-Arbeit möglich
    if (remoteWork && country.remoteFriendly) {
      score += 10
    }

    // Klima (z.B. warm, cold, temperate)
    if (preferredClimate && country.climate === preferredClimate) {
      score += 10
    }

    // Sprache
    if (preferredLang && country.lang.includes(preferredLang.toLowerCase())) {
      score += 10
    }

    // Hobbies & Aktivitäten
    if (hobbies) {
      if (hobbies.includes('surf') && country.surf) score += 8
      if (hobbies.includes('hiking') && country.hiking) score += 8
      if (hobbies.includes('skiing') && country.skiing) score += 8
      if (hobbies.includes('diving') && country.diving) score += 8
      if (hobbies.includes('climbing') && country.climbing) score += 8
      if (hobbies.includes('cityLife') && country.cityLife) score += 8
    }

    // Sicherheit
    if (safetyImportance) {
      score += country.safety * (safetyImportance / 10)
    }

    // Natur
    if (natureImportance) {
      score += country.nature * (natureImportance / 10)
    }

    // Nachtleben
    if (nightlifeImportance) {
      score += country.nightlife * (nightlifeImportance / 10)
    }

    // LGBT-Freundlichkeit
    if (lgbtImportance) {
      score += country.lgbtFriendly * (lgbtImportance / 10)
    }

    // Gesundheitsversorgung
    if (healthcareImportance) {
      score += country.healthcare * (healthcareImportance / 10)
    }

    // Visafreundlichkeit
    if (visaEaseImportance) {
      score += country.visaEase * (visaEaseImportance / 10)
    }

    return { country: country.name, score: Math.round(score) }
  })

  // Sortiere Länder nach Score absteigend
  scores.sort((a, b) => b.score - a.score)

  return scores
}


      if (!best) best = COUNTRIES[0]                 // Fallback
      const resultText = `🏆 Dein perfektes Land: <strong>${best.name}</strong>`

      // → UI
      document.getElementById('recommendation').innerHTML = resultText

      // --- E‑MAIL via Edge Function
      await fetch('https://nvjgrewshdpwbebbkmiq.functions.supabase.co/send-email', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          to      : email,
          country : best.name,
          cost    : best.cost,
          safety  : best.safety
        })
      })
      .then(() => alert('Empfehlung wurde gemailt!'))
      .catch(err => console.error('Mail‑Fehler:', err))
    })

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
