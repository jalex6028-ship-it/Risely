// ============================================================================
// SUPABASE CLIENT INITIALIZATION
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// DATABASE OPERATIONS - MEMBERS
// ============================================================================

export const db = {
  // MEMBERS
  async getMembers() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('total_xp', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getMemberById(id) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createMember(member) {
    const { data, error } = await supabase
      .from('members')
      .insert([member])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateMember(id, updates) {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // QUESTS
  async getQuests() {
    const { data, error } = await supabase
      .from('quests')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createQuest(quest) {
    const { data, error } = await supabase
      .from('quests')
      .insert([quest])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async completeQuest(questId, memberId) {
    const { data, error } = await supabase
      .from('quest_completions')
      .insert([{ quest_id: questId, member_id: memberId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getQuestCompletions(memberId) {
    const { data, error } = await supabase
      .from('quest_completions')
      .select('quest_id')
      .eq('member_id', memberId);
    if (error) throw error;
    return data?.map(c => c.quest_id) || [];
  },

  // CHALLENGES
  async getChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createChallenge(challenge) {
    const { data, error } = await supabase
      .from('challenges')
      .insert([challenge])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async completeChallenge(challengeId, memberId) {
    const { data, error } = await supabase
      .from('challenge_completions')
      .insert([{ challenge_id: challengeId, member_id: memberId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // DAILY TASKS
  async getDailyTasks() {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;
    return data || [];
  },

  async createDailyTask(task) {
    const { data, error } = await supabase
      .from('daily_tasks')
      .insert([task])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async completeDailyTask(taskId, memberId, date = new Date().toISOString().split('T')[0]) {
    const { data, error } = await supabase
      .from('daily_completions')
      .insert([{ daily_id: taskId, member_id: memberId, completion_date: date }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getDailyCompletions(memberId, date = new Date().toISOString().split('T')[0]) {
    const { data, error } = await supabase
      .from('daily_completions')
      .select('daily_id')
      .eq('member_id', memberId)
      .eq('completion_date', date);
    if (error) throw error;
    return data?.map(c => c.daily_id) || [];
  },

  // EVENTS
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async createEvent(event) {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async rsvpEvent(eventId, memberId, status = 'attending') {
    const { data, error } = await supabase
      .from('event_rsvps')
      .upsert([{ event_id: eventId, member_id: memberId, rsvp_status: status }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // REWARDS
  async getRewards() {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;
    return data || [];
  },

  async createReward(reward) {
    const { data, error } = await supabase
      .from('rewards')
      .insert([reward])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async redeemReward(rewardId, memberId) {
    const { data, error } = await supabase
      .from('reward_redemptions')
      .insert([{ reward_id: rewardId, member_id: memberId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // FEED
  async getFeedPosts(limit = 50) {
    const { data, error } = await supabase
      .from('feed_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  async createFeedPost(post) {
    const { data, error } = await supabase
      .from('feed_posts')
      .insert([post])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async addReaction(postId, memberId, emoji) {
    const { data, error } = await supabase
      .from('post_reactions')
      .upsert([{ post_id: postId, member_id: memberId, emoji }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getPostReactions(postId) {
    const { data, error } = await supabase
      .from('post_reactions')
      .select('*')
      .eq('post_id', postId);
    if (error) throw error;
    return data || [];
  },

  // POLLS
  async getPolls() {
    const { data, error } = await supabase
      .from('polls')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;
    return data || [];
  },

  async createPoll(poll) {
    const { data, error } = await supabase
      .from('polls')
      .insert([poll])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async votePoll(pollId, memberId, optionIndex) {
    const { data, error } = await supabase
      .from('poll_votes')
      .upsert([{ poll_id: pollId, member_id: memberId, option_index: optionIndex }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // BADGES
  async getBadges() {
    const { data, error } = await supabase
      .from('badges')
      .select('*');
    if (error) throw error;
    return data || [];
  },

  async getMemberBadges(memberId) {
    const { data, error } = await supabase
      .from('member_badges')
      .select('badge_id')
      .eq('member_id', memberId);
    if (error) throw error;
    return data?.map(b => b.badge_id) || [];
  },

  async awardBadge(memberId, badgeId) {
    const { data, error } = await supabase
      .from('member_badges')
      .insert([{ member_id: memberId, badge_id: badgeId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // SEASONS
  async getSeasons() {
    const { data, error } = await supabase
      .from('seasons')
      .select('*')
      .order('month', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getCurrentSeason() {
    const month = new Date().toISOString().slice(0, 7);
    const { data, error } = await supabase
      .from('seasons')
      .select('*')
      .eq('month', month)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // NOTIFICATIONS
  async getNotifications(memberId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return data || [];
  },

  async createNotification(notification) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notification])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async markNotificationRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // ACTIVITY LOG
  async logActivity(activity) {
    const { data, error } = await supabase
      .from('activity_log')
      .insert([activity])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // AWARD XP
  async awardXP(memberId, amount, actionType, entityType = null, entityId = null) {
    const { data, error } = await supabase
      .rpc('award_xp', {
        p_member_id: memberId,
        p_amount: amount,
        p_action_type: actionType,
        p_entity_type: entityType,
        p_entity_id: entityId
      });
    if (error) throw error;
    return data;
  }
};

export default supabase;
