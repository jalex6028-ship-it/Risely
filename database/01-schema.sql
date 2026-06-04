-- ============================================================================
-- RISELY SUPABASE DATABASE SCHEMA
-- Complete schema for gamification platform with members, quests, events, etc.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- AUTHENTICATION & USERS
-- ============================================================================

CREATE TABLE auth_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- MEMBERS/PROFILES
-- ============================================================================

CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  photo TEXT,
  bio TEXT DEFAULT '',
  total_xp INT DEFAULT 0,
  monthly_xp INT DEFAULT 0,
  spent_xp INT DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  current_month TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_total_xp ON members(total_xp DESC);
CREATE INDEX idx_members_monthly_xp ON members(monthly_xp DESC);

-- ============================================================================
-- QUESTS (One-time tasks)
-- ============================================================================

CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INT DEFAULT 50,
  icon TEXT DEFAULT 'bolt',
  category TEXT DEFAULT 'General',
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quest_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(quest_id, member_id)
);

CREATE INDEX idx_quest_completions_member ON quest_completions(member_id);
CREATE INDEX idx_quest_completions_quest ON quest_completions(quest_id);

-- ============================================================================
-- CHALLENGES (Long-term goals, 7+ days)
-- ============================================================================

CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INT DEFAULT 100,
  icon TEXT DEFAULT 'target',
  duration_days INT DEFAULT 7,
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  end_date TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE challenge_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(challenge_id, member_id)
);

CREATE INDEX idx_challenge_completions_member ON challenge_completions(member_id);

-- ============================================================================
-- DAILY TASKS
-- ============================================================================

CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INT DEFAULT 15,
  icon TEXT DEFAULT 'clipboard',
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE daily_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  daily_id UUID NOT NULL REFERENCES daily_tasks(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  completion_date DATE DEFAULT CURRENT_DATE,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(daily_id, member_id, completion_date)
);

CREATE INDEX idx_daily_completions_member ON daily_completions(member_id);
CREATE INDEX idx_daily_completions_date ON daily_completions(completion_date);

-- ============================================================================
-- EVENTS (Calendar events)
-- ============================================================================

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  icon TEXT DEFAULT 'calendar',
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  rsvp_status TEXT DEFAULT 'attending', -- 'attending', 'maybe', 'not_attending'
  rsvp_date TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

CREATE INDEX idx_event_rsvps_event ON event_rsvps(event_id);
CREATE INDEX idx_event_rsvps_member ON event_rsvps(member_id);

-- ============================================================================
-- REWARDS/SHOP
-- ============================================================================

CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cost_xp INT NOT NULL,
  icon TEXT DEFAULT 'gift',
  rarity TEXT DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
  stock INT DEFAULT -1, -- -1 = unlimited
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reward_redemptions_member ON reward_redemptions(member_id);
CREATE INDEX idx_reward_redemptions_reward ON reward_redemptions(reward_id);

-- ============================================================================
-- SOCIAL FEED
-- ============================================================================

CREATE TABLE feed_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_type TEXT DEFAULT 'post', -- 'post', 'announcement', 'system'
  author_id UUID REFERENCES members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  reacted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, member_id, emoji)
);

CREATE INDEX idx_post_reactions_post ON post_reactions(post_id);
CREATE INDEX idx_post_reactions_member ON post_reactions(member_id);
CREATE INDEX idx_feed_posts_created ON feed_posts(created_at DESC);
CREATE INDEX idx_feed_posts_pinned ON feed_posts(pinned);

-- ============================================================================
-- POLLS
-- ============================================================================

CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE poll_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  option_index INT NOT NULL,
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(poll_id, member_id)
);

CREATE INDEX idx_poll_votes_poll ON poll_votes(poll_id);
CREATE INDEX idx_poll_votes_member ON poll_votes(member_id);

-- ============================================================================
-- BADGES/ACHIEVEMENTS
-- ============================================================================

CREATE TABLE badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  rarity TEXT DEFAULT 'common',
  tier INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE member_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(member_id, badge_id)
);

CREATE INDEX idx_member_badges_member ON member_badges(member_id);

-- ============================================================================
-- SEASONS (Monthly leaderboards and resets)
-- ============================================================================

CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month TEXT NOT NULL UNIQUE, -- Format: YYYY-MM
  month_label TEXT,
  start_date DATE,
  end_date DATE,
  top3_members TEXT[], -- JSON array of top 3 members
  total_xp INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_seasons_month ON seasons(month);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  icon TEXT DEFAULT 'sparkle',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_member ON notifications(member_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================================================
-- AUTO-RULES (Trigger-based automation)
-- ============================================================================

CREATE TABLE auto_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL, -- 'xp_gte', 'badge_earned', 'quest_done', etc.
  trigger_value INT,
  label TEXT,
  created_by UUID REFERENCES members(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_auto_rules_quest ON auto_rules(quest_id);

-- ============================================================================
-- ACTIVITY LOG
-- ============================================================================

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'quest_completed', 'xp_awarded', 'badge_earned', etc.
  entity_type TEXT, -- 'quest', 'challenge', 'daily', 'reward', etc.
  entity_id UUID,
  xp_amount INT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_log_member ON activity_log(member_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

INSERT INTO badges (id, name, description, rarity, tier) VALUES
  ('first_quest', 'Quest Starter', 'Complete your first quest', 'common', 1),
  ('social_bee', 'Social Bee', 'Earn 5 reactions on posts', 'common', 1),
  ('shopper', 'Shopaholic', 'Spend XP on rewards', 'common', 1),
  ('legendary_hunter', 'Legendary Hunter', 'Earn 100+ badges', 'legendary', 5),
  ('leaderboard_champion', 'Champion', 'Rank #1 in monthly standings', 'legendary', 5),
  ('daily_grinder', 'Grinder', 'Complete 30 daily tasks', 'rare', 2),
  ('challenge_master', 'Master', 'Complete 10 challenges', 'epic', 3),
  ('monthly_top_three', 'Rising Star', 'Place in top 3 for a month', 'rare', 2);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Members can view all members
CREATE POLICY "members_select_all"
  ON members FOR SELECT
  USING (true);

-- Members can update their own profile
CREATE POLICY "members_update_own"
  ON members FOR UPDATE
  USING (auth_id = auth.uid());

-- All quests are visible to everyone
CREATE POLICY "quests_select_all"
  ON quests FOR SELECT
  USING (true);

-- Feed posts are visible to all
CREATE POLICY "feed_posts_select_all"
  ON feed_posts FOR SELECT
  USING (true);

-- Members can view their own notifications
CREATE POLICY "notifications_select_own"
  ON notifications FOR SELECT
  USING (member_id = (SELECT id FROM members WHERE auth_id = auth.uid()));

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to award XP to a member
CREATE OR REPLACE FUNCTION award_xp(
  p_member_id UUID,
  p_amount INT,
  p_action_type TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  UPDATE members
  SET total_xp = total_xp + p_amount,
      monthly_xp = monthly_xp + p_amount,
      updated_at = NOW()
  WHERE id = p_member_id;

  INSERT INTO activity_log (member_id, action_type, entity_type, entity_id, xp_amount)
  VALUES (p_member_id, p_action_type, p_entity_type, p_entity_id, p_amount);
END;
$$ LANGUAGE plpgsql;

-- Function to apply monthly reset
CREATE OR REPLACE FUNCTION reset_monthly_xp()
RETURNS void AS $$
DECLARE
  v_current_month TEXT;
BEGIN
  v_current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');

  UPDATE members
  SET monthly_xp = 0,
      current_month = v_current_month,
      updated_at = NOW();

  INSERT INTO seasons (month, month_label, start_date, end_date, total_xp)
  VALUES (
    v_current_month,
    TO_CHAR(CURRENT_DATE, 'Month YYYY'),
    DATE_TRUNC('MONTH', CURRENT_DATE)::DATE,
    (DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE,
    (SELECT COALESCE(SUM(total_xp), 0) FROM members)
  );
END;
$$ LANGUAGE plpgsql;
