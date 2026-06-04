-- ============================================================================
-- MIGRATION: Add Missing Fields to Members Table
-- Required for full app functionality (daily login rewards, badges, history)
-- ============================================================================

-- Add missing fields to members table
ALTER TABLE members
ADD COLUMN IF NOT EXISTS all_time_xp INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS login_streak INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_date TEXT,
ADD COLUMN IF NOT EXISTS login_history TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS xp_history TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS quests_done TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS daily_completions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS gem_hi_score INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS challenges_done TEXT[] DEFAULT '{}';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_members_login_streak ON members(login_streak DESC);
CREATE INDEX IF NOT EXISTS idx_members_last_login ON members(last_login_date);

-- Update the award_xp function to include all_time_xp
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
      all_time_xp = all_time_xp + p_amount,
      updated_at = NOW()
  WHERE id = p_member_id;

  INSERT INTO activity_log (member_id, action_type, entity_type, entity_id, xp_amount)
  VALUES (p_member_id, p_action_type, p_entity_type, p_entity_id, p_amount);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Verification: Check that all required fields now exist
-- ============================================================================
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'members' ORDER BY ordinal_position;
