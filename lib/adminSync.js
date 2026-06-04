/**
 * Admin Content Management with Supabase Sync
 * Saves quests, challenges, daily tasks, events, and rewards to the database
 */

import { db, supabase } from './supabase';

export const adminSync = {
  /**
   * Save quests to Supabase
   */
  async saveQuests(quests) {
    try {
      // Clear existing and insert new
      await supabase.from('quests').delete().neq('id', 'null');

      for (const quest of quests) {
        await db.createQuest({
          id: quest.id,
          title: quest.title,
          description: quest.desc,
          xp_reward: quest.xp,
          icon: quest.icon,
          category: quest.category,
          is_active: quest.active !== false
        });
      }
      console.log('✓ Quests synced to Supabase');
    } catch (err) {
      console.error('Failed to sync quests:', err.message);
    }
  },

  /**
   * Save challenges to Supabase
   */
  async saveChallenges(challenges) {
    try {
      for (const challenge of challenges) {
        await db.createChallenge({
          id: challenge.id,
          title: challenge.title,
          description: challenge.desc,
          xp_reward: challenge.xp,
          duration_days: challenge.days,
          icon: challenge.icon,
          is_active: challenge.active !== false
        });
      }
      console.log('✓ Challenges synced to Supabase');
    } catch (err) {
      console.error('Failed to sync challenges:', err.message);
    }
  },

  /**
   * Save daily tasks to Supabase
   */
  async saveDailyTasks(dailyTasks) {
    try {
      for (const task of dailyTasks) {
        await db.createDailyTask({
          id: task.id,
          title: task.title,
          description: task.desc,
          xp_reward: task.xp,
          is_active: task.active !== false
        });
      }
      console.log('✓ Daily tasks synced to Supabase');
    } catch (err) {
      console.error('Failed to sync daily tasks:', err.message);
    }
  },

  /**
   * Save events to Supabase
   */
  async saveEvents(events) {
    try {
      for (const event of events) {
        await db.createEvent({
          id: event.id,
          title: event.title,
          description: event.desc,
          event_date: event.date,
          event_time: event.time,
          location: event.location,
          icon: event.icon,
          is_active: event.active !== false
        });
      }
      console.log('✓ Events synced to Supabase');
    } catch (err) {
      console.error('Failed to sync events:', err.message);
    }
  },

  /**
   * Save rewards/shop to Supabase
   */
  async saveRewards(rewards) {
    try {
      for (const reward of rewards) {
        const { data, error } = await supabase
          .from('rewards')
          .upsert({
            id: reward.id,
            title: reward.title,
            description: reward.desc,
            cost: reward.cost,
            icon: reward.icon,
            stock: reward.stock,
            is_active: reward.active !== false
          });
        if (error) throw error;
      }
      console.log('✓ Rewards synced to Supabase');
    } catch (err) {
      console.error('Failed to sync rewards:', err.message);
    }
  }
};
