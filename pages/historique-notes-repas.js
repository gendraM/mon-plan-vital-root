import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function HistoriqueNotesRepas() {
  const [repasNotes, setRepasNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepasNotes() {
      const { data, error } = await supabase
        .from("repas_reels")
        .select("*")
        .order("date", { ascending: false });
      if (!error && Array.isArray(data)) {
        setRepasNotes(data.filter(r => r.note && r.note.trim().length > 0));
      } else {
        setRepasNotes([]);
      }
      setLoading(false);
    }
    fetchRepasNotes();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 12px", fontFamily: "system-ui, Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontWeight: 800, fontSize: 32, color: "#ff9800", marginBottom: 24 }}>
        Historique des notes repas
      </h1>
      {loading ? (
        <div style={{ textAlign: "center", margin: "48px 0" }}>
          <span style={{ fontSize: 24 }}>⏳</span>
          <div>Chargement en cours…</div>
        </div>
      ) : (
        repasNotes.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center", marginTop: 32 }}>
            Aucun repas avec note enregistré.
          </div>
        ) : (
          <ul style={{ marginTop: 8, paddingLeft: 0 }}>
            {repasNotes.map((r, i) => (
              <li key={i} style={{ marginBottom: 18, listStyle: "none", borderBottom: "1px solid #e0e0e0", paddingBottom: 12 }}>
                <div><b>Date :</b> {r.date} <b>Type :</b> {r.type}</div>
                <div><b>Aliment :</b> {r.aliment} <b>Catégorie :</b> {r.categorie}</div>
                <div><b>Quantité :</b> {r.quantite} <b>Kcal :</b> {r.kcal}</div>
                <div><b>Note :</b> {r.note}</div>
                {r.ressenti && <div><b>Ressenti :</b> {r.ressenti}</div>}
                {r.pourquoi && <div><b>Pourquoi :</b> {r.pourquoi}</div>}
                {r.details_signaux && r.details_signaux.length > 0 && (
                  <div><b>Signaux ignorés :</b> {Array.isArray(r.details_signaux) ? r.details_signaux.join(', ') : r.details_signaux}</div>
                )}
                {r.est_extra && <div style={{ color: '#b71c1c' }}><b>Extra</b></div>}
                {(r.isFastFood || r.fastFoodType) && <div style={{ color: '#b71c1c' }}><b>Fast food</b></div>}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
