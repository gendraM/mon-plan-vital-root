// Initialisation des 10 mini-défis pour un utilisateur donné
// Respecte le cahier des charges et la checklist du README
// Aucun doublon, aucune suppression, aucune altération des données existantes

import { supabase } from './supabaseClient'
import { defisReferentiel } from './defisReferentiel'

/**
 * Initialise les 10 mini-défis pour un utilisateur si non présents
 * @param {string} user_id - UUID de l'utilisateur
 * @returns {Promise<{ inserted: number, skipped: number, errors: any[] }>}
 */
export async function initDefisUser(user_id) {
  let inserted = 0
  let skipped = 0
  let errors = []

  for (const defi of defisReferentiel) {
    // Vérifier si le défi existe déjà pour cet utilisateur
    const { data: existing, error: errorSelect } = await supabase
      .from('defis')
      .select('id')
      .eq('user_id', user_id)
      .eq('description', defi.description)
      .limit(1)
    if (errorSelect) {
      errors.push(errorSelect)
      continue
    }
    if (existing && existing.length > 0) {
      skipped++
      continue
    }
    // Insérer le défi pour l'utilisateur
    const { error: errorInsert } = await supabase
      .from('defis')
      .insert({
        user_id,
        type: defi.type,
        description: defi.description,
        progress: 0,
        status: 'en attente',
        created_at: new Date().toISOString()
      })
    if (errorInsert) {
      errors.push(errorInsert)
      continue
    }
    inserted++
  }
  return { inserted, skipped, errors }
}
