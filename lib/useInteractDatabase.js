import { useEffect, useState } from 'react';
import { db, supabase } from './supabase';

// Local storage key for caching
const CACHE_KEY = 'interact_app_data';
const SESSION_KEY = 'interact_user_id';

/**
 * Hook to manage Interact app data with Supabase persistence
 * Falls back to localStorage for offline/faster access
 */
export function useInteractDatabase() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user and load data on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get or create user ID from sessionStorage
        let id = sessionStorage.getItem(SESSION_KEY);
        if (!id) {
          id = `user_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem(SESSION_KEY, id);
        }
        setUserId(id);

        // Try to load from Supabase first
        try {
          const member = await db.getMemberById(id);
          if (member) {
            // Cache the data locally
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              member,
              timestamp: Date.now()
            }));
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.log('Supabase load failed, using cache:', err.message);
        }

        // Fall back to localStorage if Supabase fails or member not found
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          console.log('Using cached data');
          setIsLoading(false);
          return;
        }

        // If no cached data and no Supabase member, create new member
        const newMember = await db.createMember({
          id,
          name: `Player ${id.substring(5, 9)}`,
          total_xp: 0,
          monthly_xp: 0,
          badges: [],
          quests_completed: [],
          streak: 0
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          member: newMember,
          timestamp: Date.now()
        }));
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize app:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  /**
   * Save member progress to both localStorage and Supabase
   */
  const saveMemberProgress = async (member) => {
    try {
      // Save to localStorage immediately for instant persistence
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        member,
        timestamp: Date.now()
      }));

      // Try to sync to Supabase in background (don't wait)
      if (userId) {
        db.updateMember(userId, {
          total_xp: member.totalXP || 0,
          monthly_xp: member.monthlyXP || 0,
          diamonds: member.diamonds || 0,
          badges: member.badges || [],
          streak: member.loginStreak || 0
        }).catch(err => console.log('Supabase sync failed (non-critical):', err.message));
      }
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  /**
   * Save quest completion
   */
  const saveQuestCompletion = async (questId) => {
    try {
      if (userId) {
        await db.completeQuest(questId, userId);
      }
    } catch (err) {
      console.error('Failed to save quest:', err);
    }
  };

  /**
   * Save daily task completion
   */
  const saveDailyCompletion = async (dailyTaskId) => {
    try {
      if (userId) {
        await db.completeDailyTask(dailyTaskId, userId);
      }
    } catch (err) {
      console.error('Failed to save daily task:', err);
    }
  };

  /**
   * Save badge earned
   */
  const saveBadge = async (badgeId) => {
    try {
      if (userId) {
        await db.earnBadge(badgeId, userId);
      }
    } catch (err) {
      console.error('Failed to save badge:', err);
    }
  };

  return {
    userId,
    isLoading,
    error,
    saveMemberProgress,
    saveQuestCompletion,
    saveDailyCompletion,
    saveBadge,
    getFromLocalStorage: () => {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    }
  };
}

/**
 * Save state to localStorage on change
 * Call this in useEffect dependencies to auto-save
 */
export function useSaveToStorage(key, value) {
  useEffect(() => {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
}
