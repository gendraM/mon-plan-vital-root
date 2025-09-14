// Calcul dynamique des récompenses fast food
// Entrée : tableau d’historique fast food (trié par date croissante)
// Sortie : { nbDelaisRespectes, badgeSpecial, confettis, message, badgesFastFood }

export function getFastFoodRewards(history = []) {
  if (!Array.isArray(history) || history.length < 2) {
    return {
      nbDelaisRespectes: 0,
      badgeSpecial: false,
      confettis: false,
      message: "Premier fast food enregistré. Commence à espacer pour débloquer tes récompenses !",
      badgesFastFood: []
    };
  }
  let nbDelaisRespectes = 0;
  let badgesFastFood = [];
  let successStreak = 0;
  let maxStreak = 0;
  for (let i = 1; i < history.length; i++) {
    const prev = new Date(history[i - 1].date);
    const curr = new Date(history[i].date);
    const diff = Math.floor((curr - prev) / (1000 * 60 * 60 * 24));
    if (diff >= 45) {
      nbDelaisRespectes++;
      successStreak++;
      badgesFastFood.push({
        nom: 'Délai respecté',
        description: `45 jours respectés entre le ${prev.toLocaleDateString('fr-FR')} et le ${curr.toLocaleDateString('fr-FR')}`
      });
    } else {
      successStreak = 0;
    }
    if (successStreak > maxStreak) maxStreak = successStreak;
  }
  const badgeSpecial = maxStreak >= 3;
  if (badgeSpecial) {
    badgesFastFood.push({
      nom: 'Badge Spécial Fast Food',
      description: '3 délais de 45 jours respectés consécutivement !'
    });
  }
  const confettis = badgeSpecial;
  let message = '';
  if (badgeSpecial) {
    message = "🎉 Bravo ! Tu as débloqué le badge spécial Fast Food grâce à ta discipline !";
  } else if (nbDelaisRespectes > 0) {
    message = `Tu as respecté ${nbDelaisRespectes} délai(s) de 45 jours. Continue pour débloquer le badge spécial !`;
  } else {
    message = "Pense à espacer tes fast food pour débloquer tes récompenses.";
  }
  return {
    nbDelaisRespectes,
    badgeSpecial,
    confettis,
    message,
    badgesFastFood
  };
}
