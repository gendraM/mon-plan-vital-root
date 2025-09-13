import React, { useState, useEffect } from "react";
import TimelineProgression from "../components/TimelineProgression";
import { supabase } from "../lib/supabaseClient";

export default function HistoriqueExtras() {
  const [repasReels, setRepasReels] = useState([]);
  const [weeklyHistory, setWeeklyHistory] = useState([]);
  useEffect(() => {
    async function fetchHistory() {
      // Récupérer tous les repas
      const { data: repas, error } = await supabase
        .from("repas_reels")
        .select("*");
      if (!error && Array.isArray(repas)) {
        setRepasReels(repas);
        // Récupérer les semaines validées
        const { data: semainesValidees } = await supabase
          .from("semaines_validees")
          .select("weekStart, validee");
        // Calculer l’historique
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
            let count = repas.filter(r => {
              let d = new Date(r.date);
              d.setHours(0,0,0,0);
              return d >= weekStart && d <= weekEnd && r.est_extra;
            }).length;
            // Fusionner avec la table de validation
            const valid = semainesValidees?.find(s => s.weekStart === weekStart.toISOString().slice(0,10))?.validee === true;
            weeks.push({
              weekStart: weekStart.toISOString().slice(0,10),
              count,
              isCurrent: (i === 0),
              validee: valid
            });
          }
          return weeks;
        }
        setWeeklyHistory(getWeeklyExtrasHistory(repas, 16));
      }
    }
    fetchHistory();
  }, []);
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"32px 8px 64px",fontFamily:"system-ui,Arial,sans-serif"}}>
      <h1 style={{textAlign:"center",marginBottom:24,fontWeight:800,fontSize:32,letterSpacing:"0.5px",color:"#1976d2"}}>
        🏅 Historique des Extras Validés
      </h1>
      <TimelineProgression history={weeklyHistory} />
      <div style={{textAlign:"center",marginTop:32}}>
        <a href="/tableau-de-bord" style={{color:"#1976d2",fontWeight:700,fontSize:18,textDecoration:"none"}}>← Retour au tableau de bord</a>
      </div>
    </div>
  );
}
