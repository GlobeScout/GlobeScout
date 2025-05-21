import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase
const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'   // verkürzt
)

// ⚙️ Länder‑Daten (Erweitert)
const COUNTRIES = [
  {
    name: 'Portugal',
    cost: 75,
    safety: 70,
    surf: true,
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
    climate: 'tropical',
    lang: ['spanish', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 4,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 4
  },
  {
    name: 'Kolumbien',
    cost: 55,
    safety: 50,
    surf: true,
    climate: 'tropical',
    lang: ['spanish'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 2
  },


  // Südamerika
    {
    name: 'Brasilien',
    cost: 60,
    safety: 50,
    surf: true,
    climate: 'tropical',
    lang: ['portuguese'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 5,
    nightlife: 5,
    lgbtFriendly: 4
  },
  {
    name: 'Argentinien',
    cost: 50,
    safety: 55,
    surf: false,
    climate: 'temperate',
    lang: ['spanish'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 3
  },
  {
    name: 'Chile',
    cost: 70,
    safety: 70,
    surf: true,
    climate: 'temperate',
    lang: ['spanish'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 4,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },


  // Afrika / Nahost
    {
    name: 'Südafrika',
    cost: 55,
    safety: 40,
    surf: true,
    climate: 'warm',
    lang: ['english', 'afrikaans'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 2
  },
  {
    name: 'Marokko',
    cost: 50,
    safety: 55,
    surf: true,
    climate: 'warm',
    lang: ['arabic', 'french'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 2
  },
  {
    name: 'Ägypten',
    cost: 45,
    safety: 50,
    surf: true,
    climate: 'hot',
    lang: ['arabic', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 3,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 2
  },
  {
    name: 'VAE',
    cost: 100,
    safety: 80,
    surf: true,
    climate: 'hot',
    lang: ['arabic', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 5,
    nature: 3,
    nightlife: 4,
    lgbtFriendly: 3
  },


  // Asien
   {
    name: 'Thailand',
    cost: 50,
    safety: 60,
    surf: true,
    climate: 'hot',
    lang: ['thai', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 3
  },
  {
    name: 'Vietnam',
    cost: 40,
    safety: 55,
    surf: true,
    climate: 'hot',
    lang: ['vietnamese', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Indonesien',
    cost: 45,
    safety: 55,
    surf: true,
    climate: 'tropical',
    lang: ['indonesian', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Philippinen',
    cost: 45,
    safety: 55,
    surf: true,
    climate: 'tropical',
    lang: ['english', 'filipino'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Malaysia',
    cost: 55,
    safety: 65,
    surf: true,
    climate: 'tropical',
    lang: ['malay', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 4,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Japan',
    cost: 100,
    safety: 88,
    surf: true,
    climate: 'temperate',
    lang: ['japanese', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 4,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Südkorea',
    cost: 90,
    safety: 85,
    surf: false,
    climate: 'temperate',
    lang: ['korean', 'english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 3,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Indien',
    cost: 35,
    safety: 45,
    surf: true,
    climate: 'hot',
    lang: ['hindi', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 2,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 2
  },
  {
    name: 'Sri Lanka',
    cost: 40,
    safety: 55,
    surf: true,
    climate: 'hot',
    lang: ['sinhala', 'tamil', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 3,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 3
  },
  {
    name: 'Nepal',
    cost: 30,
    safety: 50,
    surf: false,
    climate: 'cold',
    lang: ['nepali', 'english'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 2,
    nature: 5,
    nightlife: 2,
    lgbtFriendly: 2
  },
  {
    name: 'China',
    cost: 70,
    safety: 60,
    surf: false,
    climate: 'temperate',
    lang: ['mandarin'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 4,
    nature: 4,
    nightlife: 3,
    lgbtFriendly: 2
  },
  {
    name: 'Singapur',
    cost: 110,
    safety: 92,
    surf: false,
    climate: 'tropical',
    lang: ['english', 'mandarin', 'malay', 'tamil'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 3,
    nightlife: 4,
    lgbtFriendly: 5
  },


    {
    name: 'Australien',
    cost: 110,
    safety: 80,
    surf: true,
    climate: 'hot',
    lang: ['english'],
    remoteFriendly: true,
    visaEase: 3,
    healthcare: 5,
    nature: 5,
    nightlife: 4,
    lgbtFriendly: 4
  },
  {
    name: 'Neuseeland',
    cost: 100,
    safety: 85,
    surf: true,
    climate: 'temperate',
    lang: ['english', 'maori'],
    remoteFriendly: true,
    visaEase: 4,
    healthcare: 5,
    nature: 5,
    nightlife: 3,
    lgbtFriendly: 5
  }
]


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
