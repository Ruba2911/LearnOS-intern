/**
 * Logout utility function
 * Handles user session termination
 */

import { createClient } from './client'

export async function logout() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Logout exception:', err)
    return { success: false, error: 'An error occurred during logout' }
  }
}
