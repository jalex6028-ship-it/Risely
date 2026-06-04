-- ============================================================================
-- USER ROLES TABLE - For role-based access control
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policies for user_roles
CREATE POLICY "Users can view their own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON user_roles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

CREATE POLICY "Only admins can update roles"
  ON user_roles FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- ============================================================================
-- UPDATE MEMBERS TABLE - Link to auth users
-- ============================================================================

ALTER TABLE members ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id);
ALTER TABLE members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS last_login_date TEXT;

-- ============================================================================
-- QUESTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INTEGER DEFAULT 50,
  icon TEXT DEFAULT 'bolt',
  category TEXT DEFAULT 'General',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quests"
  ON quests FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create quests"
  ON quests FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update quests"
  ON quests FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- CHALLENGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS challenges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INTEGER DEFAULT 100,
  duration_days INTEGER DEFAULT 7,
  icon TEXT DEFAULT 'target',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read challenges"
  ON challenges FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create challenges"
  ON challenges FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update challenges"
  ON challenges FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- DAILY TASKS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS daily_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INTEGER DEFAULT 15,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read daily tasks"
  ON daily_tasks FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create daily tasks"
  ON daily_tasks FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update daily tasks"
  ON daily_tasks FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TEXT NOT NULL,
  event_time TEXT,
  location TEXT,
  icon TEXT DEFAULT 'calendar',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create events"
  ON events FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update events"
  ON events FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- REWARDS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cost INTEGER NOT NULL DEFAULT 100,
  icon TEXT DEFAULT 'gift',
  stock INTEGER DEFAULT 999,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rewards"
  ON rewards FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create rewards"
  ON rewards FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update rewards"
  ON rewards FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- POLLS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  options TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read polls"
  ON polls FOR SELECT
  USING (TRUE);

CREATE POLICY "Only admins can create polls"
  ON polls FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Only admins can update polls"
  ON polls FOR UPDATE
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role IN ('admin', 'moderator')
    )
  );

-- ============================================================================
-- Make members table RLS compliant
-- ============================================================================

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read members"
  ON members FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update their own profile"
  ON members FOR UPDATE
  WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can create their own member profile"
  ON members FOR INSERT
  WITH CHECK (
    auth.uid() = auth_user_id
  );

-- ============================================================================
-- Setup admin function
-- ============================================================================

-- This stored procedure promotes a user to admin (call once to set first admin)
-- Usage: SELECT make_admin('your-email@example.com');

CREATE OR REPLACE FUNCTION make_admin(email TEXT)
RETURNS TEXT AS $$
DECLARE
  user_id UUID;
BEGIN
  SELECT id INTO user_id FROM auth.users WHERE email = $1;

  IF user_id IS NULL THEN
    RETURN 'User not found';
  END IF;

  INSERT INTO user_roles (user_id, role) VALUES (user_id, 'admin')
  ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

  RETURN 'User ' || email || ' is now admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
