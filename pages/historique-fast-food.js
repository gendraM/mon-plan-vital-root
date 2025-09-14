import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HistoriqueFastFood() {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistorique() {
      setLoading(true);
      const { data, error } = await supabase
        .from('fast_food_history')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data) setHistorique(data);
      setLoading(false);
    }
    fetchHistorique();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Historique des Fast Food</h2>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Restaurant</th>
              <th>Aliments</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {historique.map((item) => (
              <tr key={item.id || item.date}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.restaurant}</td>
                <td>
                  {Array.isArray(item.aliments)
                    ? item.aliments.map((a, i) => (
                        <span key={i}>{a.nom} ({a.quantite})<br /></span>
                      ))
                    : '-'}
                </td>
                <td>
                  {Array.isArray(item.aliments)
                    ? item.aliments.reduce((sum, a) => sum + (parseInt(a.kcal) || 0), 0)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
