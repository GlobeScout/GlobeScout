import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase
const supabase = createClient(
  'https://nvjgrewshdpwbebbkmiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52amdyZXdzaGRwd2JlYmJrbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjI0NjgsImV4cCI6MjA2Mjc5ODQ2OH0.uUVy7mC9EmSeDVqLdmWwTV0FouLZj97_fdbq8yAMufM'   // verkürzt
)

// ⚙️ Länder‑Daten (Mini‑Dataset)
const COUNTRIES = [
  // Europa
  { name:'Portugal',      cost: 75, safety: 70, surf:true,  climate:'warm',      lang:['portuguese','english'] },
  { name:'Spanien',       cost: 80, safety: 70, surf:true,  climate:'warm',      lang:['spanish','english'] },
  { name:'Griechenland',  cost: 65, safety: 65, surf:true,  climate:'warm',      lang:['greek','english'] },
  { name:'Italien',       cost: 90, safety: 75, surf:true,  climate:'warm',      lang:['italian','english'] },
  { name:'Frankreich',    cost: 95, safety: 80, surf:true,  climate:'temperate', lang:['french','english'] },
  { name:'Deutschland',   cost:100, safety: 85, surf:false, climate:'temperate', lang:['german','english'] },
  { name:'Niederlande',   cost: 95, safety: 85, surf:false, climate:'temperate', lang:['dutch','english'] },
  { name:'Dänemark',      cost:110, safety: 90, surf:false, climate:'cold',      lang:['danish','english'] },
  { name:'Norwegen',      cost:115, safety: 92, surf:false, climate:'cold',      lang:['norwegian','english'] },
  { name:'Schweiz',       cost:120, safety: 95, surf:false, climate:'cold',      lang:['german','french','italian'] },
  { name:'Österreich',    cost:105, safety: 90, surf:false, climate:'cold',      lang:['german','english'] },
  { name:'Irland',        cost: 95, safety: 80, surf:true,  climate:'temperate', lang:['english','irish'] },
  { name:'Türkei',        cost: 55, safety: 60, surf:true,  climate:'warm',      lang:['turkish','english'] },

  // Nord‑ & Mittelamerika
  { name:'Kanada',        cost: 85, safety: 90, surf:false, climate:'cold',      lang:['english','french'] },
  { name:'USA',           cost:100, safety: 75, surf:true,  climate:'temperate', lang:['english','spanish'] },
  { name:'Mexiko',        cost: 60, safety: 45, surf:true,  climate:'hot',       lang:['spanish','english'] },
  { name:'Costa Rica',    cost: 65, safety: 70, surf:true,  climate:'tropical',  lang:['spanish','english'] },
  { name:'Kolumbien',     cost: 55, safety: 50, surf:true,  climate:'tropical',  lang:['spanish'] },

  // Südamerika
  { name:'Brasilien',     cost: 60, safety: 50, surf:true,  climate:'tropical',  lang:['portuguese'] },
  { name:'Argentinien',   cost: 50, safety: 55, surf:false, climate:'temperate', lang:['spanish'] },
  { name:'Chile',         cost: 70, safety: 70, surf:true,  climate:'temperate', lang:['spanish'] },

  // Afrika / Nahost
  { name:'Südafrika',     cost: 55, safety: 40, surf:true,  climate:'warm',      lang:['english','afrikaans'] },
  { name:'Marokko',       cost: 50, safety: 55, surf:true,  climate:'warm',      lang:['arabic','french'] },
  { name:'Ägypten',       cost: 45, safety: 50, surf:true,  climate:'hot',       lang:['arabic','english'] },
  { name:'VAE',           cost:100, safety: 80, surf:true,  climate:'hot',       lang:['arabic','english'] },

  // Asien
  { name:'Thailand',      cost: 50, safety: 60, surf:true,  climate:'hot',       lang:['thai','english'] },
  { name:'Vietnam',       cost: 40, safety: 55, surf:true,  climate:'hot',       lang:['vietnamese','english'] },
  { name:'Indonesien',    cost: 45, safety: 55, surf:true,  climate:'tropical',  lang:['indonesian','english'] },
  { name:'Philippinen',   cost: 45, safety: 55, surf:true,  climate:'tropical',  lang:['english','filipino'] },
  { name:'Malaysia',      cost: 55, safety: 65, surf:true,  climate:'tropical',  lang:['malay','english'] },
  { name:'Japan',         cost:100, safety: 88, surf:true,  climate:'temperate', lang:['japanese','english'] },
  { name:'Südkorea',      cost: 90, safety: 85, surf:false, climate:'temperate', lang:['korean','english'] },
  { name:'Indien',        cost: 35, safety: 45, surf:true,  climate:'hot',       lang:['hindi','english'] },
  { name:'Sri Lanka',     cost: 40, safety: 55, surf:true,  climate:'hot',       lang:['sinhala','tamil','english'] },
  { name:'Nepal',         cost: 30, safety: 50, surf:false, climate:'cold',      lang:['nepali','english'] },
  { name:'China',         cost: 70, safety: 60, surf:false, climate:'temperate', lang:['mandarin'] },
  { name:'Singapur',      cost:110, safety: 92, surf:false, climate:'tropical',  lang:['english','mandarin','malay','tamil'] },

  // Ozeanien
  { name:'Australien',    cost:110, safety: 80, surf:true,  climate:'hot',       lang:['english'] },
  { name:'Neuseeland',    cost:100, safety: 85, surf:true,  climate:'temperate', lang:['english','maori'] }
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
