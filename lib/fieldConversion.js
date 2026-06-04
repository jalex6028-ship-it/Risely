/**
 * Field conversion utilities for Supabase ↔ In-Memory data mapping
 *
 * Supabase uses snake_case (total_xp, monthly_xp, etc.)
 * In-memory app uses camelCase (xp, monthlyXP, etc.)
 * This file handles the conversion between the two formats.
 */

/**
 * Convert a Supabase member object to in-memory format
 * Maps snake_case Supabase fields to camelCase in-memory fields
 */
export function convertSupabaseToMemory(member) {
  if (!member) return member;
  return {
    ...member,
    // Field mapping from Supabase (snake_case) to in-memory (camelCase)
    // XP fields
    xp: member.total_xp || 0,
    monthlyXP: member.monthly_xp || 0,
    allTimeXP: member.all_time_xp || 0,
    spentXP: member.spent_xp || 0,
    // Login tracking
    loginStreak: member.login_streak || 0,
    lastLoginDate: member.last_login_date || null,
    loginHistory: member.login_history || [],
    // History & tracking
    xpHistory: member.xp_history || [],
    questsDone: member.quests_done || [],
    challengesDone: member.challenges_done || [],
    // Game data
    badges: member.badges || [],
    dailyCompletions: member.daily_completions || {},
    gemHiScore: member.gem_hi_score || 0,
    // Auth
    auth_id: member.auth_id,
  };
}

/**
 * Convert multiple Supabase members to in-memory format
 */
export function convertMultipleSupabaseToMemory(members) {
  if (!Array.isArray(members)) return members;
  return members.map(convertSupabaseToMemory);
}
