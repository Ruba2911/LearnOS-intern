-- ============================================================================
-- SUPABASE LEARNING DASHBOARD - DATABASE SCHEMA
-- Copy and paste this entire SQL into Supabase SQL Editor and execute
-- ============================================================================

-- 1. PROFILES TABLE (User Information)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. COURSES TABLE (Available Courses)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'web', 'mobile', 'data-science', etc.
  duration_hours INT,
  difficulty_level TEXT, -- 'beginner', 'intermediate', 'advanced'
  instructor_name TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. USER_PROGRESS TABLE (Track Course Progress)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress_percentage INT DEFAULT 0, -- 0-100
  total_lessons INT,
  completed_lessons INT DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 4. ACTIVITY_LOGS TABLE (Track Learning Activity)
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL, -- 'lesson_completed', 'quiz_passed', 'project_submitted'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACHIEVEMENTS TABLE (User Achievements/Badges)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_name TEXT NOT NULL,
  achievement_icon TEXT,
  description TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read public profiles, update their own
CREATE POLICY "Allow users to read profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Allow users to update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses: Everyone can read courses
CREATE POLICY "Allow anyone to read courses"
  ON courses FOR SELECT
  USING (true);

-- User Progress: Users can only see their own progress
CREATE POLICY "Allow users to read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

Create POLICY "Allow users to update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Activity Logs: Users can only see their own activity
CREATE POLICY "Allow users to read own activity"
  ON activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create own activity"
  ON activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Achievements: Users can only see their own achievements
CREATE POLICY "Allow users to read own achievements"
  ON achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create own achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);
