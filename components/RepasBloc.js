import { useState, useEffect } from 'react'
import FlipNumbers from 'react-flip-numbers'
// import FlipNumbers from 'react-flip-numbers'

// Référentiel d'aliments de base
const referentielAliments = [
  { nom: "Poulet", categorie: "protéine", kcal: 120 },
  { nom: "Haricots verts", categorie: "légume", kcal: 30 },
  { nom: "Riz", categorie: "féculent", kcal: 110 },
  { nom: "Banane", categorie: "fruit", kcal: 90 },
  { nom: "Chocolat", categorie: "extra", kcal: 150 }
]

// Règles de feedback
const rules = [
  {
    check: ({ estExtra, extrasRestants }) => estExtra && extrasRestants <= 0,
    type: "challenge",
    message: "Tu as dépassé ton quota d'extras cette semaine. Prends un instant pour te demander : est-ce le bon moment pour ce plaisir ? Tu pourrais le planifier pour un autre moment, pour le savourer pleinement et sans culpabilité."
  },
  {
    check: ({ satiete }) => satiete === "non",
    type: "defi",
    message: "Défi : Essaie d'écouter ta satiété sur le prochain repas."
  },
  {
    check: ({ categorie, planCategorie }) => categorie !== planCategorie && categorie && planCategorie,
    type: "suggestion",
    message: "Tu as adapté ton repas, pense à garder l’équilibre des catégories."
  },
  {
    check: ({ routineCount }) => routineCount >= 3,
    type: "feedback",
    message: "Bravo, tu ancre ta routine !"
  }
]

// Baromètre d'état alimentaire
const etatsAlimentaires = [
  { label: "Léger", value: "léger", icon: "🌱", color: "#a5d6a7" },
  { label: "Satisfait", value: "satisfait", icon: "😊", color: "#ffe082" },
  { label: "Lourd", value: "lourd", icon: "😑", color: "#ffcc80" },
  { label: "Ballonné", value: "ballonné", icon: "🤢", color: "#ef9a9a" },
  { label: "Je regrette", value: "je regrette", icon: "😔", color: "#b0bec5" },
  { label: "Je culpabilise", value: "je culpabilise", icon: "😟", color: "#b39ddb" },
  { label: "J’assume", value: "j’assume", icon: "💪", color: "#80cbc4" }
]

// Liste des signaux de satiété
const signauxSatieteList = [
  "Ventre qui se resserre",
  "Perte d’envie de manger",
  "Sensation de lourdeur",
  "Difficulté à avaler",
  "Autre"
]

export default function RepasBloc({ type, date, planCategorie, routineCount = 0, onSave, repasSemaine = [], extrasRestants }) {
  // Validation stricte des props
  extrasRestants = typeof extrasRestants === 'number' && !isNaN(extrasRestants) ? extrasRestants : 0;
  const [aliment, setAliment] = useState('');
  const [categorie, setCategorie] = useState('');
  const [quantite, setQuantite] = useState('');
  const [kcal, setKcal] = useState('');
  const [estExtra, setEstExtra] = useState(false);
  const [satiete, setSatiete] = useState('');
  const [pourquoi, setPourquoi] = useState('');
  const [ressenti, setRessenti] = useState('');
  const [detailsSignaux, setDetailsSignaux] = useState([]);
  const [reactBloc, setReactBloc] = useState([]);
  const [showDefi, setShowDefi] = useState(false);
  const [loadingKcal, setLoadingKcal] = useState(false);
  // Ajout pour gestion validation semaine
  const [semaineValidee, setSemaineValidee] = useState(false);
  const semaineCouranteDate = date; // à adapter si besoin (date du dimanche)
  // Charger l'état de validation de la semaine
  useEffect(() => {
    async function fetchValidation() {
      // Remplacer par l'appel réel à Supabase
      // Exemple :
      // const { data } = await supabase.from('semaines_validees').select('validee').eq('weekStart', semaineCouranteDate).single();
      // setSemaineValidee(data?.validee === true);
      // Pour démo, on laisse à false
    }
    fetchValidation();
  }, [semaineCouranteDate]);
  // Handler pour dévalider
  async function handleDevalider() {
    // Remplacer par l'appel réel à Supabase
    // await supabase.from('semaines_validees').update({ validee: false }).eq('weekStart', semaineCouranteDate);
    setSemaineValidee(false);
    // Rafraîchir la liste ou l’état local si besoin
  }
  // Handler pour valider
  async function handleValider() {
    // Remplacer par l'appel réel à Supabase
    // await supabase.from('semaines_validees').upsert({ weekStart: semaineCouranteDate, validee: true });
    setSemaineValidee(true);
    // Rafraîchir la liste ou l’état local si besoin
  }
  // ...existing code...

  // Suggestion automatique de catégorie et kcal selon l'aliment choisi (référentiel)
  // Remplissage automatique de la catégorie selon l'aliment saisi (référentiel local uniquement)
  useEffect(() => {
    const found = referentielAliments.find(a => a.nom.toLowerCase() === aliment.toLowerCase())
    if (found) {
      setCategorie(found.categorie)
    }
  }, [aliment])

  // Calcul automatique des kcal selon la quantité et l'aliment (référentiel)
  useEffect(() => {
    const found = referentielAliments.find(a => a.nom.toLowerCase() === aliment.toLowerCase())
    if (found && quantite) {
      const quantiteNum = parseFloat(quantite)
      setKcal((quantiteNum * found.kcal).toFixed(0))
    } else if (!found) {
      setKcal('')
    }
  }, [aliment, quantite])



  // ...existing code...

  useEffect(() => {
    const context = { estExtra, satiete, categorie, planCategorie, routineCount, extrasRestants }
    const blocs = rules.filter(rule => rule.check(context))
    setReactBloc(blocs)
  }, [estExtra, satiete, categorie, planCategorie, routineCount, extrasRestants])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave && onSave({
      type, date, aliment, categorie, quantite, kcal,
      est_extra: estExtra,
      satiete, pourquoi, ressenti,
      details_signaux: detailsSignaux
    })
    setAliment('')
    setCategorie('')
    setQuantite('')
    setKcal('')
    setEstExtra(false)
    setSatiete('')
    setPourquoi('')
    setRessenti('')
    setDetailsSignaux([])
    // setSuggestions([])
  }

  const handleAccepteDefi = () => {
    setShowDefi(false)
    // Logique pour accepter le défi
  }

  // Sélection d'un état alimentaire dans le baromètre
  const handleSelectEtat = (value) => {
    setRessenti(value)
  }

  // Gestion des signaux de satiété ignorés
  const handleCheckSignal = (signal) => {
    if (detailsSignaux.includes(signal)) {
      setDetailsSignaux(detailsSignaux.filter(s => s !== signal))
    } else {
      setDetailsSignaux([...detailsSignaux, signal])
    }
  }

  return (
    <div>
      {/* Compteur flipboard stylisé pour extras restants */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Extras restants</span>
        <FlipNumbers
          height={40}
          width={30}
          color={extrasRestants > 0 ? "#1976d2" : "#b71c1c"}
          background="#fff"
          play
          numbers={`${extrasRestants}`}
        />
      </div>

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h3>{type} du {date}</h3>
        <label>Aliment mangé</label>
        <input
          value={aliment}
          onChange={e => setAliment(e.target.value)}
          placeholder="Saisissez un aliment"
          autoComplete="off"
          required
          style={{ marginBottom: 0 }}
        />
        {/* ...existing code... */}

        <label>Catégorie</label>
        <input
          list="categories"
          value={categorie}
          onChange={e => setCategorie(e.target.value)}
          required
        />
        <datalist id="categories">
          <option value="féculent" />
          <option value="protéines" />
          <option value="légumes" />
          <option value="fruit" />
          <option value="extra" />
          <option value="poisson" />
          <option value="volaille" />
          <option value="viande" />
          <option value="boisson" />
          <option value="produit laitier" />
        </datalist>

        <label>Quantité</label>
        <input value={quantite} onChange={e => setQuantite(e.target.value)} required />

        <label>Kcal {loadingKcal && "(recherche...)"}</label>
  <input value={kcal} onChange={e => setKcal(e.target.value)} />

        {/* Message d'aide si kcal non trouvées automatiquement */}
        {aliment && quantite && !kcal && (
          <div style={{ color: "#b71c1c", marginBottom: 8 }}>
            Calories non trouvées dans le référentiel. Merci de les saisir manuellement.
          </div>
        )}

        <label>
          <input type="checkbox" checked={estExtra} onChange={e => setEstExtra(e.target.checked)} />
          Cet aliment est-il un extra ?
        </label>

        <label>Satiété respectée ?</label>
        <select value={satiete} onChange={e => setSatiete(e.target.value)} required>
          <option value="">Choisir…</option>
          <option value="oui">Oui, j’ai respecté ma satiété</option>
          <option value="non">Non, j’ai dépassé ma satiété</option>
          <option value="pas de faim">Je n’ai pas mangé par faim</option>
        </select>

        {/* Suite logique si NON */}
        {satiete === "non" && (
          <>
            <label>Quels signaux de satiété as-tu ignorés ?</label>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 8 }}>
              {signauxSatieteList.map(signal => (
                <label key={signal} style={{ fontWeight: "normal" }}>
                  <input
                    type="checkbox"
                    checked={detailsSignaux.includes(signal)}
                    onChange={() => handleCheckSignal(signal)}
                  />
                  {signal}
                </label>
              ))}
            </div>
            <label>Pourquoi as-tu continué à manger ?</label>
            <input
              value={pourquoi}
              onChange={e => setPourquoi(e.target.value)}
              placeholder="Ex : gourmandise, stress, habitude…"
            />
          </>
        )}

        {/* Suite logique si PAS DE FAIM */}
        {satiete === "pas de faim" && (
          <>
            <label>Pourquoi as-tu mangé ?</label>
            <input
              value={pourquoi}
              onChange={e => setPourquoi(e.target.value)}
              placeholder="Ex : stress, habitude, social…"
            />
          </>
        )}

        {/* Baromètre d'état alimentaire */}
        <label style={{ marginTop: 16, display: "block" }}>Ressenti physique après le repas</label>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {etatsAlimentaires.map(etat => (
            <button
              key={etat.value}
              type="button"
              onClick={() => handleSelectEtat(etat.value)}
              style={{
                background: ressenti === etat.value ? etat.color : "#f5f5f5",
                border: ressenti === etat.value ? "2px solid #1976d2" : "1px solid #ccc",
                borderRadius: "50%",
                width: 56,
                height: 56,
                fontSize: "2rem",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.2s"
              }}
              aria-label={etat.label}
              title={etat.label}
            >
              {etat.icon}
            </button>
          ))}
        </div>
        {ressenti && (
          <div style={{ marginBottom: 16, color: "#1976d2" }}>
            Ton ressenti : <b>{etatsAlimentaires.find(e => e.value === ressenti)?.label}</b>
          </div>
        )}

        {/* Affichage dynamique des feedbacks/challenges/défis */}
        {reactBloc.map((bloc, i) => (
          <div key={i} style={{
            background: bloc.type === "challenge" ? "#ffe0b2" :
                        bloc.type === "defi" ? "#e1f5fe" :
                        bloc.type === "feedback" ? "#e8f5e9" : "#f3e5f5",
            color: "#222", borderRadius: 8, padding: 10, margin: "12px 0"
          }}>
            {bloc.message}
          </div>
        ))}

        {showDefi && (
          <div style={{ background: "#e1f5fe", borderRadius: 8, padding: 10, margin: "12px 0" }}>
            Défi : Essaie d'écouter ta satiété sur les 3 prochains repas.
            <button onClick={handleAccepteDefi} style={{ marginLeft: 10 }}>Accepter le défi</button>
          </div>
        )}

        <button type="submit" style={{ marginTop: 16 }}>Enregistrer ce repas</button>
      </form>
    </div>
  )
}