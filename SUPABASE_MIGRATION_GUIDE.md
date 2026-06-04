# Supabase Database Migration Guide

## Problem Summary
The Risely app code was expecting database fields that don't exist in Supabase:
- `login_streak`, `last_login_date`, `login_history` (for daily login rewards)
- `all_time_xp` (for all-time leaderboard)
- `xp_history`, `quests_done`, `challenges_done` (for history tracking)
- `gem_hi_score` (for GemCrush game)
- `daily_completions` (for daily task tracking)

Additionally, the code was using `auth_user_id` but the schema uses `auth_id`.

## Solution Applied

### 1. Code Fixes (✅ COMPLETED)
- ✅ Fixed all `auth_user_id` → `auth_id` references
- ✅ Updated fieldConversion.js to map all fields correctly
- ✅ Fixed field name mapping in persistence calls (camelCase ↔ snake_case)
- ✅ Updated member creation in useAuth.js to use correct field names

### 2. Database Migration (⏳ PENDING - MANUAL EXECUTION REQUIRED)

You must manually run this migration in Supabase to add the missing fields:

```sql
-- ============================================================================
-- MIGRATION: Add Missing Fields to Members Table
-- Required for full app functionality (daily login rewards, badges, history)
-- ============================================================================

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
```

## How to Apply the Migration

### Option A: Via Supabase Web Console (Easiest)

1. Go to https://supabase.com/dashboard
2. Select your Risely project
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Paste the migration SQL from above
6. Click **Run**
7. You should see "Success" message

### Option B: Via pgAdmin or psql

If you have direct database access, run:
```bash
psql "postgres://user:password@host/risely" < database/02-add-missing-fields.sql
```

## Verification After Migration

Run this query in Supabase SQL Editor to verify all fields exist:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;
```

Expected columns:
```
id                      | uuid
auth_id                 | uuid
name                    | text
email                   | text
photo                   | text
bio                     | text
total_xp                | integer
monthly_xp              | integer
spent_xp                | integer
all_time_xp             | integer ← NEW
login_streak            | integer ← NEW
last_login_date         | text ← NEW
login_history           | text[] ← NEW
xp_history              | text[] ← NEW
quests_done             | text[] ← NEW
challenges_done         | text[] ← NEW
daily_completions       | jsonb ← NEW
gem_hi_score            | integer ← NEW
badges                  | text[]
current_month           | text
created_at              | timestamp
updated_at              | timestamp
```

## Testing After Migration

1. Build the app: `npm run build`
2. Start the app: `npm run start`
3. Create a new account
4. Claim the daily login reward
5. Refresh the page
6. **Verify**: The reward should still be claimed (not reset)
7. Check Supabase: The member record should show updated `login_streak` and `last_login_date`

## If Migration Fails

Common issues:

**Issue**: "Cannot add column - column already exists"
- **Solution**: The migration has probably already run. Check the columns exist using the verification query above.

**Issue**: "Permission denied"
- **Solution**: Make sure you're using the Supabase service role key or a user with ALTER TABLE permissions.

**Issue**: "Syntax error"
- **Solution**: Copy the exact SQL from this file. Ensure no extra characters are included.

## Rollback (if needed)

If you need to remove the new columns:

```sql
ALTER TABLE members
DROP COLUMN IF EXISTS all_time_xp,
DROP COLUMN IF EXISTS login_streak,
DROP COLUMN IF EXISTS last_login_date,
DROP COLUMN IF EXISTS login_history,
DROP COLUMN IF EXISTS xp_history,
DROP COLUMN IF EXISTS quests_done,
DROP COLUMN IF EXISTS daily_completions,
DROP COLUMN IF EXISTS gem_hi_score,
DROP COLUMN IF EXISTS challenges_done;

DROP INDEX IF EXISTS idx_members_login_streak;
DROP INDEX IF EXISTS idx_members_last_login;
```

## What This Fixes

✅ Daily login rewards now persist across page reloads  
✅ XP from all activities properly saved  
✅ Member state updates work end-to-end  
✅ Login streak tracking works  
✅ All-time XP leaderboard works  
✅ GemCrush game scores persist  
✅ Quest/Challenge tracking works  

---

**Status**: Code fixes complete. Database migration requires manual execution.  
**Next Step**: Apply the migration in Supabase, then test the app.
