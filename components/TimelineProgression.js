import React from "react";

export default function TimelineProgression({ history }) {
  // Filtrer les semaines validées
  const validatedWeeks = history.filter(week => week.validee);
  // Trouver l’index de la semaine actuelle (isCurrent)
  const currentIndex = validatedWeeks.findIndex(week => week.isCurrent);
  // Glissement sur 4 semaines autour de la semaine actuelle
  let start = Math.max(0, currentIndex - 3);
  let end = Math.min(validatedWeeks.length, currentIndex + 1);
  const visibleWeeks = validatedWeeks.slice(start, end);
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: 24,
      overflowX: "auto",
      padding: "16px 0 8px 0",
      marginBottom: 32,
      scrollSnapType: "x mandatory"
    }}>
      {visibleWeeks.map((week, i) => (
        <div
          key={i}
          style={{
            minWidth: 220,
            maxWidth: 350,
            background: week.count <= 1
              ? "linear-gradient(135deg,#43a047 60%,#e8f5e9 100%)"
              : "linear-gradient(135deg,#ffe082 60%,#fffde7 100%)",
            borderRadius: 18,
            boxShadow: "0 4px 18px #1976d233",
            padding: "18px 16px 14px 16px",
            color: week.count <= 1 ? "#fff" : "#1a237e",
            fontWeight: 700,
            fontSize: 16,
            textAlign: "center",
            position: "relative",
            transition: "transform 0.3s, box-shadow 0.3s",
            scrollSnapAlign: "center",
            border: week.isCurrent ? "3px solid #1976d2" : "2px solid #eee",
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: week.count > 1 ? 36 : 28, marginBottom: 4 }}>
            {week.count <= 1 ? "🏅" : <span style={{fontSize:36,verticalAlign:'middle'}}>⚠️</span>}
          </div>
          <div style={{ fontSize: 14, marginBottom: 4, color: week.count <= 1 ? "#fff" : "#1a237e", fontWeight: 500, maxWidth: 300, lineHeight: 1.2, textAlign: 'center', whiteSpace: 'pre-line' }}>
            {(() => {
              // Format français sur deux lignes : Semaine du 01 septembre\nau 07 septembre 2025
              const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
              const start = new Date(week.weekStart);
              // Calculer le lundi de la semaine
              const dayOfWeek = start.getDay();
              const lundi = new Date(start);
              lundi.setDate(start.getDate() - ((dayOfWeek + 6) % 7));
              // Calculer le dimanche de la semaine
              const dimanche = new Date(lundi);
              dimanche.setDate(lundi.getDate() + 6);
              return `Semaine du ${lundi.getDate().toString().padStart(2,'0')} ${mois[lundi.getMonth()]}\nau ${dimanche.getDate().toString().padStart(2,'0')} ${mois[dimanche.getMonth()]} ${dimanche.getFullYear()}`;
            })()}
          </div>
          <div style={{ fontSize: 32, margin: '8px 0 0 0', color: week.count <= 1 ? "#fff" : "#1a237e", fontWeight: 900, letterSpacing:1 }}>
            {week.count} extra{week.count > 1 ? "s" : ""}
          </div>
          {week.isCurrent && (
            <div style={{
              position: "absolute",
              top: 10,
              right: 14,
              background: "#1976d2",
              color: "#fff",
              borderRadius: 12,
              padding: "2px 10px",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 1px 6px #1976d233"
            }}>
              Semaine en cours
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
