🎯 COMBO – Définition dans Mon Plan Vital
Un combo est un outil d’apprentissage alimentaire et de renforcement comportemental.
Il s’agit d’une combinaison d’aliments ou d’actions culinaires simples, utilisées pour :
ancrer une règle nutritionnelle (ex : réduire les graisses cachées)


tester un petit changement concret (ex : remplacer la crème fraîche)


déclencher un défi à réaliser dans un délai donné (ex : 10 jours)


créer un moment elearning dans l’app avec un message explicatif et motivant


valider une intégration comportementale réelle et visible dans les stats


Chaque combo comprend :
une règle nutritionnelle ou comportementale associée


une action à tester concrètement


une durée de validation (ex : 10 jours)


un message de bénéfice long terme


une récompense symbolique (badge, phrase valorisante, boost score, etc.)



🧠 EXEMPLE DE COMBO
Nom : Ma crème fraîche repensée
Action : Remplacer la crème par du skyr ou de la purée de légumes
Délai : 10 jours pour tester
Règle apprise : “Limiter les graisses cachées = digestion plus légère + moins d’appels au sucre”
Validation : coche “combo validé” dans /combo.js
Retour : “Badge de lucidité culinaire” + 1 point vers l’alimentation intuitive

🍽️ UTILISATION DU RÉFÉRENTIEL DANS L’APP
1. DANS 
/suivi.js
 (formulaire de repas)
Autocomplétion des aliments depuis la table referentiel_aliments (via Supabase)


Affichage automatique :


Portion recommandée


Kcal


Fréquence


Pas de règle affichée ici (car l’aliment a déjà été consommé)


Option : pré-remplir les grammes/kcal en fonction de la portion max


2. DANS 
/plan.js
 (préparation de repas)
L’utilisateur choisit ses aliments


L’app va chercher automatiquement :


Portion max


Équivalent kcal


Règle comportementale


Affiche un bloc de conseil lisible et motivant


Possibilité d’activer un combo lié à cet aliment







— Cahier des charges 
🧩 CONTEXTE : LOGIQUE DES REPAS DANS MON PLAN VITAL
📌 Objectif
Créer une logique cohérente, intelligente et évolutive autour :
des repas planifiés (préparés à l’avance)


des repas réellement consommés


de la notion de combo équilibré


du référentiel comportemental


des statistiques de progression alimentaire



✅ Règles validées :
🥗 Qu’est-ce qu’un combo ?
Ce n’est pas un plat figé : l’utilisateur compose lui-même son assiette avec plusieurs aliments.


L’appli analyse automatiquement s’il s’agit d’un combo “équilibré” en se basant sur :


les types d’aliments (protéine + légume + féculent)


la fréquence de consommation (via référentiel)


la portion (respectée ou non)


la satiété (optionnelle, mais traçable)


les règles comportementales (ex : éviter en soirée, éviter après un extra, etc.)



🔁 Logique globale (fonctionnelle)
1. 
Planification
Dans /planning.js, l’utilisateur choisit ses repas à l’avance.


Lorsqu’il ajoute un aliment, les données du référentiel Supabase remplissent automatiquement :


portion max


équivalent kcal


fréquence autorisée


règles comportementales (affichées dans le plan uniquement)


Option : proposer des quantités par défaut intelligentes (pré-remplissage auto).


2. 
Saisie réelle du repas
 (
/suivi.js
)
L’utilisateur confirme ou non avoir respecté le repas prévu.


Il peut modifier ce qu’il a réellement consommé.


À ce moment-là, l’appli évalue :


si le repas est aligné au plan (→ score discipline)


si le repas est équilibré selon combo ou règles du référentiel (→ score combo)


3. 
Calcul des scores
🟦 Score discipline = % de repas planifiés et respectés


🟩 Score combo = % de repas composés intelligemment (combo ou règles respectées)


Le score combo peut s’appliquer même sans planification → l’utilisateur est valorisé s’il a bien mangé, même en improvisant.


4. 
Enregistrement des comportements
Chaque saisie réelle peut générer un enregistrement dans la table stats_comportementales :


Est-ce que la portion était correcte ?


Est-ce que la satiété a été respectée ?


Est-ce qu’un combo connu a été utilisé ?


Est-ce que les règles du référentiel ont été respectées ?


etc.



🔧 À faire dans le code :
🔹 Frontend – Formulaires
Lors de la saisie d’un aliment :


Auto-complétion par référentiel Supabase


Pré-remplissage kcal, portion, etc.


Affichage de la règle comportementale (uniquement dans la planification)


🔹 Backend / Logique
Créer une fonction de validation combo, côté JS ou Supabase, qui :


vérifie la composition des aliments


renvoie combo_valide = true/false


Ajouter ce booléen dans :


repas_planifies pour les repas futurs


stats_comportementales pour les repas réels


🔹 Statistiques
Dans /statistiques.js, ajouter :


Score discipline (% repas conformes au plan)


Score combo (% repas équilibrés réalisés)


Score global combiné (pondération possible)


Historique par semaine



🧠 Bonus à terme :
L’IA pourra détecter des combos personnalisés efficaces (ceux qui génèrent :


moins d’extras


meilleure satiété


ressenti positif)


L’IA pourra en proposer automatiquement dans /planning.js (« Mona te recommande une assiette qui te réussit bien : [combo] »)





📊 SUIVI STATISTIQUE – Satiété et quantité respectée
Objectif : évaluer l’alignement de l’utilisateur avec son plan alimentaire
Données à suivre :
Portion respectée (vs portion max du référentiel)


Satiété ressentie (champ à cocher : oui / non)


Règle respectée (ex : ne pas avoir mangé un aliment “à éviter le soir”)


Combo utilisé (oui / non, et lequel)
