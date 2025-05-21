import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase-Client
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
// ⚙️ Länder bewerten basierend auf Nutzereingaben
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
    importanceIncome
  } = formData

  const scores = COUNTRIES.map(country => {
    let score = 0

    // Kostenbewertung
    score += Math.max(0, (budget - country.cost)) * 2

    // Einkommen mit reduzierter Wichtigkeit
    if (income) {
      score += (income / country.cost) * 10 * (importanceIncome || 0.25)
    }

    // Remote Work
    if (remoteWork && country.remoteFriendly) {
      score += 10
    }

    // Klima
    if (preferredClimate && country.climate === preferredClimate) {
      score += 10
    }

    // Sprache
    if (preferredLang && country.lang.includes(preferredLang.toLowerCase())) {
      score += 10
    }

    // Hobbies und Aktivitäten
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

    // Visa-Ease
    if (visaEaseImportance) {
      score += country.visaEase * (visaEaseImportance / 10)
    }

    return { country: country.name, score: Math.round(score) }
  })

  // Sortiere absteigend
  scores.sort((a, b) => b.score - a.score)

  return scores
}

// ⚙️ Feedback speichern
export async function saveFeedback(feedbackData) {
  // feedbackData z.B. { userId, country, rating, comment }
  const { data, error } = await supabase
    .from('feedback')
    .insert([feedbackData])

  if (error) {
    console.error('Fehler beim Speichern des Feedbacks:', error)
    throw error
  }

  return data
}

// ⚙️ Feedback abfragen (optional, z.B. für Anzeige)
export async function getFeedbackForCountry(countryName) {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('country', countryName)

  if (error) {
    console.error('Fehler beim Abrufen des Feedbacks:', error)
    throw error
  }

  return data
}
