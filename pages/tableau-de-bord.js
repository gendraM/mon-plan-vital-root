import { useState, useEffect } from "react";
import { getFastFoodRewards } from "../lib/fastFoodRewards";
import { supabase } from "../lib/supabaseClient";
import { Line, Pie, Doughnut } from "react-chartjs-2";
import TimelineProgression from "../components/TimelineProgression";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const COLORS = [
  "#43a047", // vert
  "#1976d2", // bleu
  "#ffa726", // orange
  "#e53935", // rouge
  "#9c27b0", // violet
];

function getMotivationMessage({ progression, extras, humeurCounts, tauxSatiete }) {
  if (progression.badge) {
    return `🏆 ${progression.badge} : ${progression.message}`;
  }
  if (extras > 0 && extras <= progression.quota) {
    return "💪 Tu respectes ton quota d'extras : continue comme ça !";
  }
  if (tauxSatiete > 70) {
    return "🥗 Tu manges majoritairement par faim réelle, c'est top !";
  }
  if (humeurCounts["En forme"] > humeurCounts["Fragile"]) {
    return "😄 Ton humeur est globalement positive, tu gères bien ta semaine !";
  }
  return "🚀 Chaque petite action compte : recommence, progresse, bats tes records !";
}

export default function TableauDeBord() {
  // Hook pour afficher/masquer l’historique des notes repas (diagnostic)
  const [showNotesHistory, setShowNotesHistory] = useState(false);
  // Ajout pour la validation des semaines (fast food et extras)
  const [semainesValidees, setSemainesValidees] = useState([]);
  // Ajout : données d’évolution extras et poids
  const [evolutionExtras, setEvolutionExtras] = useState([]);
  const [evolutionPoids, setEvolutionPoids] = useState([]);
  // Ajout fast food
  const [fastFoodHistory, setFastFoodHistory] = useState([]);
  // Ajout badges fast food
  const [badgesFastFood, setBadgesFastFood] = useState([]);
  const [fastFoodCount, setFastFoodCount] = useState(0);
  const [nextFastFoodDate, setNextFastFoodDate] = useState(null);
  const [fastFoodDelay, setFastFoodDelay] = useState(0);
  // Ajout : gestion de la période sélectionnée
  const [periode, setPeriode] = useState('semaine'); // 'semaine', 'mois', 'annee'
  const [periodeLabel, setPeriodeLabel] = useState('');

  // Calcul des bornes de période
  function getPeriodeDates() {
    const now = new Date();
    let debut, fin;
    if (periode === 'semaine') {
      debut = new Date(now);
  debut = new Date(now);
  debut.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      debut.setHours(0,0,0,0);
      fin = new Date(debut);
  fin = new Date(debut);
  fin.setDate(debut.getDate() + 6);
    } else if (periode === 'mois') {
      debut = new Date(now.getFullYear(), now.getMonth(), 1);
      fin = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (periode === 'annee') {
      debut = new Date(now.getFullYear(), 0, 1);
      fin = new Date(now.getFullYear(), 11, 31);
    }
    return { debut, fin };
  }

  useEffect(() => {
    // Récupérer la liste des semaines validées
    (async () => {
      const { data: semaines } = await supabase
        .from('semaines_validees')
        .select('*');
      setSemainesValidees(semaines || []);
    })();
    const { debut, fin } = getPeriodeDates();
    let label = '';
    if (periode === 'semaine') {
      label = `Semaine du ${debut.toLocaleDateString('fr-FR')} au ${fin.toLocaleDateString('fr-FR')}`;
    } else if (periode === 'mois') {
      label = `Mois de ${debut.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
    } else if (periode === 'annee') {
      label = `Année ${debut.getFullYear()}`;
    }
    setPeriodeLabel(label);
  }, [periode]);
  // Fonction de refresh manuel
  const handleRefresh = async () => {
  const { debut, fin } = getPeriodeDates();
    // Rafraîchir l’historique fast food à chaque refresh manuel
    const { data: ffData } = await supabase
      .from('fast_food_history')
      .select('*')
      .gte('date', debut.toISOString().slice(0,10))
      .lte('date', fin.toISOString().slice(0,10))
      .order('date', { ascending: false });
    setFastFoodHistory(ffData || []);
    setFastFoodCount(ffData?.length || 0);
    if (ffData && ffData.length > 0) {
      const lastDate = new Date(ffData[0].date);
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + 45);
      setNextFastFoodDate(nextDate);
      const today = new Date();
      const delay = Math.max(0, Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24)));
      setFastFoodDelay(delay);
    } else {
      setNextFastFoodDate(null);
      setFastFoodDelay(0);
    }
    // Récupération locale des bornes de période
    // --- Calcul évolution extras ---
    let evoExtras = [];
    if (periode === 'semaine') {
      // Extras par jour
      for (let i = 0; i < 7; i++) {
        const d = new Date(debut);
        d.setDate(d.getDate() + i);
        const label = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        const count = repasReels?.filter(r => r.est_extra && r.date === d.toISOString().slice(0,10)).length || 0;
        evoExtras.push({ label, count });
      }
    } else if (periode === 'mois') {
      // Extras par semaine du mois
      let current = new Date(debut);
      let week = 1;
      while (current <= fin) {
        const weekStart = new Date(current);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const label = `Sem. ${week}`;
        const count = repasReels?.filter(r => r.est_extra && r.date >= weekStart.toISOString().slice(0,10) && r.date <= weekEnd.toISOString().slice(0,10)).length || 0;
        evoExtras.push({ label, count });
        current.setDate(current.getDate() + 7);
        week++;
      }
    } else if (periode === 'annee') {
      // Extras par mois
      for (let m = 0; m < 12; m++) {
        const monthStart = new Date(debut.getFullYear(), m, 1);
        const monthEnd = new Date(debut.getFullYear(), m + 1, 0);
        const label = monthStart.toLocaleDateString('fr-FR', { month: 'short' });
        const count = repasReels?.filter(r => r.est_extra && r.date >= monthStart.toISOString().slice(0,10) && r.date <= monthEnd.toISOString().slice(0,10)).length || 0;
        evoExtras.push({ label, count });
      }
    }
    setEvolutionExtras(evoExtras);

    // --- Calcul évolution poids ---
    let evoPoids = [];
    if (periode === 'semaine') {
      for (let i = 0; i < 7; i++) {
        const d = new Date(debut);
        d.setDate(d.getDate() + i);
        const label = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        const poids = poidsData?.find(p => p.date === d.toISOString().slice(0,10))?.poids || null;
        evoPoids.push({ label, poids });
      }
    } else if (periode === 'mois') {
      let current = new Date(debut);
      let week = 1;
      while (current <= fin) {
        const weekStart = new Date(current);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const label = `Sem. ${week}`;
        // Moyenne du poids sur la semaine
        const poidsValues = poidsData?.filter(p => p.date >= weekStart.toISOString().slice(0,10) && p.date <= weekEnd.toISOString().slice(0,10)).map(p => p.poids) || [];
        const poids = poidsValues.length ? (poidsValues.reduce((a,b)=>a+b,0)/poidsValues.length).toFixed(1) : null;
        evoPoids.push({ label, poids });
        current.setDate(current.getDate() + 7);
        week++;
      }
    } else if (periode === 'annee') {
      for (let m = 0; m < 12; m++) {
        const monthStart = new Date(debut.getFullYear(), m, 1);
        const monthEnd = new Date(debut.getFullYear(), m + 1, 0);
        const label = monthStart.toLocaleDateString('fr-FR', { month: 'short' });
        const poidsValues = poidsData?.filter(p => p.date >= monthStart.toISOString().slice(0,10) && p.date <= monthEnd.toISOString().slice(0,10)).map(p => p.poids) || [];
        const poids = poidsValues.length ? (poidsValues.reduce((a,b)=>a+b,0)/poidsValues.length).toFixed(1) : null;
        evoPoids.push({ label, poids });
      }
    }
    setEvolutionPoids(evoPoids);
    setLoading(true);
    // 1. Historique poids
    const { data: poidsHistory } = await supabase
      .from("historique_poids")
      .select("date, poids")
      .gte("date", debut.toISOString().slice(0,10))
      .lte("date", fin.toISOString().slice(0,10))
      .order("date", { ascending: true });
    setPoidsData(poidsHistory || []);
    // 2. Humeurs sur la période
    const { data: humeurs } = await supabase
      .from("humeur_checkin")
      .select("humeur")
      .gte("date", debut.toISOString().slice(0,10))
      .lte("date", fin.toISOString().slice(0,10));
    setHumeurData(humeurs || []);
    // 3. Satiété (repas pris par faim)
    const { data: repasReelsData, count: totalRepas } = await supabase
      .from("repas_reels")
      .select("*", { count: "exact" })
      .gte("date", debut.toISOString().slice(0,10))
      .lte("date", fin.toISOString().slice(0,10));
    setRepasReels(repasReelsData || []);
    const repasParFaim =
      repasReelsData?.filter((r) => r.raison_manger === "J'avais faim").length || 0;
    setSatieteData({ faim: repasParFaim, total: totalRepas || 0 });
    // 4. Extras sur la période
    const { data: extrasPeriod } = await supabase
      .from("repas_reels")
      .select("est_extra")
      .gte("date", debut.toISOString().slice(0,10))
      .lte("date", fin.toISOString().slice(0,10));
    let quota = 3;
    const { data: profil } = await supabase
      .from("profil")
      .select("delai")
      .order("created_at", { ascending: false })
      .limit(1);
    if (profil?.[0]?.delai) {
      quota = Math.max(1, Math.round(3 - profil[0].delai / 2));
    }
    setExtrasData({
      current: extrasPeriod?.filter((r) => r.est_extra)?.length || 0,
      quota,
    });
    // 5. Badges/défis
    const { data: badgesList } = await supabase
      .from("badges")
      .select("*");
    setBadges(badgesList || []);
    // 6. Progression/gamification
    let badge = null,
      message = "";
    const extrasCount = extrasPeriod?.filter((r) => r.est_extra).length || 0;
    if (extrasCount === 0) {
      badge = periode === 'semaine' ? "Semaine parfaite" : periode === 'mois' ? "Mois parfait" : "Année parfaite";
      message =
        periode === 'semaine'
          ? "Tu n'as pris aucun extra cette semaine. C'est la discipline maximale !"
          : periode === 'mois'
          ? "Aucun extra ce mois-ci, discipline exemplaire !"
          : "Aucun extra cette année, record absolu !";
    } else if (extrasCount <= quota && extrasCount > 0) {
      badge = periode === 'semaine' ? "Semaine dans le quota" : periode === 'mois' ? "Mois dans le quota" : "Année dans le quota";
      message =
        periode === 'semaine'
          ? "Tu as respecté ton quota d'extras, continue ainsi pour progresser !"
          : periode === 'mois'
          ? "Quota d'extras respecté ce mois-ci, continue ainsi !"
          : "Quota d'extras respecté cette année, bravo !";
    }
    setProgression({ badge, message, quota });
    setLoading(false);
  };
  const [poidsData, setPoidsData] = useState([]);
  const [humeurData, setHumeurData] = useState([]);
  const [satieteData, setSatieteData] = useState({ faim: 0, total: 0 });
  const [extrasData, setExtrasData] = useState({ current: 0, quota: 3 });
  const [badges, setBadges] = useState([]);
  const [repasReels, setRepasReels] = useState([]);
  const [loading, setLoading] = useState(true);

    // Historique des extras validés (récupéré depuis la logique du suivi)
    const [weeklyHistory, setWeeklyHistory] = useState([]);
    useEffect(() => {
      // On récupère les repas de la période et on construit l'historique
      if (Array.isArray(repasReels) && repasReels.length > 0) {
        // Utilitaire pour calculer l'historique des extras par semaine
        function getWeeklyExtrasHistory(repas, nbWeeks = 16) {
          let today = new Date();
          let weeks = [];
          let calcMonday = (d) => {
            let date = new Date(d);
            let day = date.getDay();
            let monday = new Date(date);
            monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));
            monday.setHours(0,0,0,0);
            return monday;
          };
          let monday = calcMonday(today);
          for(let i=0; i<nbWeeks; i++) {
            let weekStart = new Date(monday);
            weekStart.setDate(monday.getDate() - (i*7));
            weekStart.setHours(0,0,0,0);
            let weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
            // Récupérer la validation depuis l’état local semainesValidees
            let semaineValidee = semainesValidees?.find(sv => sv.weekStart === weekStart.toISOString().slice(0,10) && sv.validee === true);
            let count = repas.filter(r => {
              let d = new Date(r.date);
              d.setHours(0,0,0,0);
              return d >= weekStart && d <= weekEnd && r.est_extra;
            }).length;
            weeks.push({
              weekStart: weekStart.toISOString().slice(0,10),
              count,
              isCurrent: (i === 0),
              validee: !!semaineValidee
            });
          }
          return weeks;
        }
  setWeeklyHistory(getWeeklyExtrasHistory(repasReels, 16));
      }
    }, [repasReels]);

  // Progression badge/message
  const [progression, setProgression] = useState({
    badge: null,
    message: "",
    quota: 3,
  });

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line
  }, [periode]);

  // Graphiques
  const poidsChartData = {
    labels: poidsData.map((p) =>
      new Date(p.date).toLocaleDateString("fr-FR")
    ),
    datasets: [
      {
        label: "Évolution du poids (kg)",
        data: poidsData.map((p) => p.poids),
        fill: false,
        borderColor: COLORS[1],
        backgroundColor: COLORS[1],
        tension: 0.2,
        pointRadius: 5,
        pointBackgroundColor: COLORS[3],
      },
    ],
  };

  // Humeurs
  const humeurCounts = humeurData.reduce((acc, curr) => {
    acc[curr.humeur] = (acc[curr.humeur] || 0) + 1;
    return acc;
  }, {});
  const humeurChartData = {
    labels: Object.keys(humeurCounts),
    datasets: [
      {
        label: "Répartition des humeurs",
        data: Object.values(humeurCounts),
        backgroundColor: Object.keys(humeurCounts).map(
          (_, i) => COLORS[i % COLORS.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  // Satiété
  const tauxSatiete =
    satieteData.total > 0
      ? ((satieteData.faim / satieteData.total) * 100).toFixed(0)
      : 0;
  const satieteChartData = {
    labels: ["Par faim réelle", "Autres raisons"],
    datasets: [
      {
        data: [
          satieteData.faim,
          Math.max(0, satieteData.total - satieteData.faim),
        ],
        backgroundColor: [COLORS[0], COLORS[2]],
      },
    ],
  };

  // Dopamine/Feedback
  const motivation = getMotivationMessage({
    progression,
    extras: extrasData.current,
    humeurCounts,
    tauxSatiete,
  });

  // Affichage
  if (loading) {
    return (
      <div style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{textAlign:'center', fontSize:'1.4rem', color:'#1976d2', marginTop:'3rem'}}>
          Chargement de vos statistiques...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2.2rem",
          color: "#1976d2",
          fontWeight: 800,
          fontSize: "2.7rem",
          letterSpacing: "0.5px",
        }}
      >
        Tableau de Bord
      </h1>
      {/* Sélecteur de période + affichage période */}
      <div style={{textAlign:'center', marginBottom:'1rem', fontSize:'1.15rem', color:'#888', fontWeight:500}}>
        <span style={{marginRight:12}}>Période affichée :</span>
        <select value={periode} onChange={e => setPeriode(e.target.value)} style={{fontSize:'1rem', padding:'4px 10px', borderRadius:6, border:'1px solid #ccc', fontWeight:600}}>
          <option value="semaine">Semaine</option>
          <option value="mois">Mois</option>
          <option value="annee">Année</option>
        </select>
        <span style={{marginLeft:16}}>{periodeLabel}</span>
      </div>
      <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
        <button onClick={handleRefresh} style={{
          background:'#1976d2', color:'#fff', border:'none', borderRadius:8, padding:'8px 22px', fontWeight:600, fontSize:16, cursor:'pointer'
        }}>🔄 Rafraîchir les statistiques</button>
      </div>


      {/* --- Récapitulatif synthétique --- */}
      <div style={{display:'flex', gap:'2rem', justifyContent:'center', margin:'2rem 0'}}>
        {/* Carte repas */}
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 8px #e0e0e0', padding:'1.2rem 2rem', minWidth:170, textAlign:'center'}}>
          <div style={{fontSize:'2.1rem', fontWeight:700, color:'#1976d2'}}>
            🍽️ {Array.isArray(repasReels) ? repasReels.length : 0}
          </div>
          <div style={{color:'#888', fontWeight:600, fontSize:'1.08rem'}}>Repas sur la période</div>
        </div>
        {/* Carte extras */}
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 8px #e0e0e0', padding:'1.2rem 2rem', minWidth:170, textAlign:'center'}}>
          <div style={{fontSize:'2.1rem', fontWeight:700, color:'#e65100'}}>
            🍔 {fastFoodCount}
          </div>
          <div style={{color:'#888', fontWeight:600, fontSize:'1.08rem'}}>Fast food sur la période</div>
          {nextFastFoodDate && (
            <div style={{marginTop:8, fontSize:'0.98rem', color:'#1976d2'}}>
              Prochain créneau disponible : <b>{nextFastFoodDate.toLocaleDateString('fr-FR')}</b><br/>
              Délai restant : <b>{fastFoodDelay} jour{fastFoodDelay>1?'s':''}</b>
            </div>
          )}
          {!nextFastFoodDate && (
            <div style={{marginTop:8, fontSize:'0.98rem', color:'#43a047'}}>
              Aucun fast food consommé sur la période.<br/>Tu es libre d’en planifier un !
            </div>
          )}
            {/* Message dynamique et astuce/suggestion fast food */}
            {(() => {
              const rewards = getFastFoodRewards(fastFoodHistory);
              let astuce = null;
              if (fastFoodHistory.length > 0 && nextFastFoodDate) {
                const today = new Date();
                const diffDays = Math.max(0, Math.ceil((nextFastFoodDate - today) / (1000 * 60 * 60 * 24)));
                if (diffDays === 0) {
                  astuce = <><br /><span style={{ fontWeight: 500 }}>Astuce : note la date du prochain créneau dans ton agenda pour maximiser ta récompense !</span></>;
                } else {
                  astuce = <><br /><span style={{ fontWeight: 500 }}>Suggestion : planifie le prochain fast food dans {diffDays} jours.</span></>;
                }
              }
              return (
                <div style={{ background: rewards.confettis ? '#e8f5e9' : '#e3f2fd', color: rewards.confettis ? '#388e3c' : '#1976d2', padding: 10, borderRadius: 8, marginTop: 12 }}>
                  {rewards.message}
                  {astuce}
                  {rewards.confettis && <div style={{marginTop:8}}>🎉 Confettis ! Tu as débloqué le badge spécial Fast Food !</div>}
                </div>
              );
            })()}
            <button
              style={{marginTop:12, padding:'7px 18px', background:'#e65100', color:'#fff', border:'none', borderRadius:8, fontWeight:600, cursor:'pointer'}}
              onClick={()=>window.location.href='/historique-fast-food'}
            >
              En savoir plus
            </button>
        </div>
        {/* Carte satiété */}
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 8px #e0e0e0', padding:'1.2rem 2rem', minWidth:170, textAlign:'center'}}>
          <div style={{fontSize:'2.1rem', fontWeight:700, color:'#2980b9'}}>
            {typeof tauxSatiete === 'string' || typeof tauxSatiete === 'number' ? tauxSatiete : 0}%
          </div>
          <div style={{color:'#888', fontWeight:600, fontSize:'1.08rem'}}>Taux de satiété</div>
        </div>
        {/* Carte humeur dominante */}
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 8px #e0e0e0', padding:'1.2rem 2rem', minWidth:170, textAlign:'center'}}>
          <div style={{fontSize:'2.1rem', fontWeight:700, color:'#9c27b0'}}>
            {humeurCounts && Object.keys(humeurCounts).length > 0 ? Object.entries(humeurCounts).sort((a,b)=>b[1]-a[1])[0][0] : '—'}
          </div>
          <div style={{color:'#888', fontWeight:600, fontSize:'1.08rem'}}>Humeur dominante</div>
        </div>
        {/* Carte poids moyen */}
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 8px #e0e0e0', padding:'1.2rem 2rem', minWidth:170, textAlign:'center'}}>
          <div style={{fontSize:'2.1rem', fontWeight:700, color:'#ffa726'}}>
            {Array.isArray(poidsData) && poidsData.length > 0 ? (poidsData.reduce((acc,p)=>acc+p.poids,0)/poidsData.length).toFixed(1) : '—'}
          </div>
          <div style={{color:'#888', fontWeight:600, fontSize:'1.08rem'}}>Poids moyen</div>
        </div>
      </div>

      {/* --- Graphique évolution Extras --- */}
      <div style={{padding:'1.5rem', background:'#fafafa', borderRadius:'15px', boxShadow:'0 2px 8px #e0e0e0', textAlign:'center', marginBottom:'2rem'}}>
        <h2 style={{marginTop:0, color:COLORS[2]}}>Évolution des Extras</h2>
        <Line
          data={{
            labels: evolutionExtras.map(e => e.label),
            datasets: [{
              label: 'Extras',
              data: evolutionExtras.map(e => e.count),
              borderColor: COLORS[2],
              backgroundColor: COLORS[2],
              fill: false,
              tension: 0.2,
              pointRadius: 5,
              pointBackgroundColor: COLORS[3],
            }],
          }}
        />
      </div>

      {/* --- Graphique évolution Poids --- */}
      <div style={{padding:'1.5rem', background:'#fafafa', borderRadius:'15px', boxShadow:'0 2px 8px #e0e0e0', textAlign:'center', marginBottom:'2rem'}}>
        <h2 style={{marginTop:0, color:COLORS[1]}}>Évolution du Poids</h2>
        <Line
          data={{
            labels: evolutionPoids.map(e => e.label),
            datasets: [{
              label: 'Poids (kg)',
              data: evolutionPoids.map(e => e.poids),
              borderColor: COLORS[1],
              backgroundColor: COLORS[1],
              fill: false,
              tension: 0.2,
              pointRadius: 5,
              pointBackgroundColor: COLORS[3],
            }],
          }}
        />
      </div>

      {/* Dopamine / encouragement */}
      <div
        style={{
          background: "#e3f2fd",
          borderRadius: "15px",
          padding: "1.4rem",
          boxShadow: "0 2px 12px #e0e0e0",
          marginBottom: "2rem",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#1976d2",
          fontWeight: 600,
        }}
      >
        {motivation}
      </div>

      {/* ...le reste du tableau de bord... */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* --- Indicateur de Satiété --- */}
        <div
          style={{
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: "15px",
            boxShadow: "0 2px 8px #e0e0e0",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0, color: COLORS[0] }}>Taux de Satiété</h2>
          <Doughnut data={satieteChartData} />
          <p
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              color: "#2980b9",
              margin: "1.1rem 0 0.2rem 0",
            }}
          >
            {tauxSatiete}%
          </p>
          <p style={{ color: "#555" }}>
            des repas ont été pris par faim réelle.
          </p>
          {/* Bouton et historique des notes repas (diagnostic) */}
          <div style={{marginTop:24}}>
            <div style={{
              display: 'inline-block',
              border: '3px solid #ff9800',
              borderRadius: '14px',
              boxShadow: '0 4px 18px #ff980055',
              background: '#fff3e0',
              padding: '18px 28px',
              margin: '12px 0',
            }}>
              <button
                type="button"
                onClick={() => window.location.href='/historique-notes-repas'}
                style={{
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '12px 24px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #ff980055',
                  letterSpacing: '1px',
                  outline: '2px solid #fff',
                }}
              >
                Consulter l'historique des notes repas
              </button>
              <div style={{fontSize:14, color:'#ff9800', fontWeight:600, marginTop:8}}>
                Historique des notes repas (diagnostic)
              </div>
            </div>
          </div>
        </div>

        {/* --- Extras de la semaine --- */}
        <div
          style={{
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: "15px",
            boxShadow: "0 2px 8px #e0e0e0",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0, color: COLORS[2] }}>Extras de la semaine</h2>
          <p
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              color:
                extrasData.current <= extrasData.quota
                  ? "#43a047"
                  : "#e53935",
              margin: "1.1rem 0 0.2rem 0",
            }}
          >
            {extrasData.current} / {extrasData.quota}
          </p>
          <p>
            {extrasData.current <= extrasData.quota
              ? "Bravo, tu es dans le quota !"
              : "Attention, quota dépassé..."}
          </p>
        </div>

        {/* --- Graphique de Poids --- */}
        <div
          style={{
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: "15px",
            boxShadow: "0 2px 8px #e0e0e0",
            gridColumn: "1 / -1",
          }}
        >
          <h2 style={{ marginTop: 0, color: COLORS[1] }}>
            Évolution du Poids
          </h2>
          <Line data={poidsChartData} />
        </div>

        {/* --- Graphique d'Humeurs --- */}
        <div
          style={{
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: "15px",
            boxShadow: "0 2px 8px #e0e0e0",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0, color: COLORS[4] }}>
            Répartition des Humeurs (30 derniers jours)
          </h2>
          <Pie data={humeurChartData} />
        </div>

        {/* --- Section Succès / Badges --- */}
      {/* --- Timeline visuelle façon Instagram/TikTok --- */}
      <TimelineProgression history={weeklyHistory} />
        <div
          style={{
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: "15px",
            boxShadow: "0 2px 8px #e0e0e0",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0, color: COLORS[3] }}>Mes Succès & Badges</h2>
            {badges.length === 0 && badgesFastFood.length === 0 ? (
              <p style={{ color: "#666" }}>Aucun badge débloqué pour le moment.</p>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "1.12rem",
                  color: "#444",
                  fontWeight: 600,
                }}
              >
                {badges.map((badge, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    🏅 <span>{badge.nom}</span>
                    <span style={{ color: "#888", fontSize: "0.95rem", marginLeft: 4 }}>
                      {badge.description || ""}
                    </span>
                  </li>
                ))}
                {badgesFastFood && badgesFastFood.map((badge, i) => (
                  <li key={"ff-"+i} style={{ marginBottom: "0.5rem" }}>
                    🍔 <span>{badge.nom}</span>
                    <span style={{ color: "#e65100", fontSize: "0.95rem", marginLeft: 4 }}>
                      {badge.description || ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </div>
        {/* Section dédiée Badges Fast Food */}
        <div style={{padding:'1.5rem', background:'#fffbe6', borderRadius:'15px', boxShadow:'0 2px 8px #ffe0b2', textAlign:'center', margin:'2rem 0'}}>
          <h2 style={{marginTop:0, color:'#e65100'}}>Badges Fast Food</h2>
          {badgesFastFood.length === 0 ? (
            <p style={{color:'#e65100'}}>Aucun badge fast food débloqué pour le moment.</p>
          ) : (
            <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'1.12rem', color:'#e65100', fontWeight:600}}>
              {badgesFastFood.map((badge, i) => (
                <li key={i} style={{marginBottom:'0.5rem'}}>
                  🍔 <span>{badge.nom}</span>
                  <span style={{color:'#888', fontSize:'0.95rem', marginLeft:4}}>{badge.description || ''}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* --- Actions rapides/navigation --- */}
      <div
        style={{
          textAlign: "center",
          marginTop: "3.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.2rem",
        }}
      >
        <Link href="/suivi">
          <button
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 1px 6px #e0e0e0",
            }}
          >
            🥗 Voir mon suivi
          </button>
        </Link>
        <Link href="/plan">
          <button
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 1px 6px #e0e0e0",
            }}
          >
            📅 Planifier mes repas
          </button>
        </Link>
        <Link href="/tableau-de-bord">
          <button
            style={{
              background: "#ffa726",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 1px 6px #e0e0e0",
            }}
          >
            🏠 Retour au tableau de bord
          </button>
        </Link>
        <Link href="/profil">
          <button
            style={{
              background: "#9c27b0",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 1px 6px #e0e0e0",
            }}
          >
            👤 Voir mon profil
          </button>
        </Link>
      </div>
    </div>
  );
}