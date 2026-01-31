-- ============================================
-- ELITE FITNESS TRACKER - Row Level Security Policies
-- ============================================
-- Run this SQL in Supabase SQL Editor AFTER Prisma migrations
-- These policies ensure users can only access their own data
-- ============================================

-- Enable RLS on all user data tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins_weekly ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Exercises table: RLS for custom exercises only
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS TABLE
-- ============================================
-- Users can only read/update their own record
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE POLICY "Users can view own profile data" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- PLANS TABLE
-- ============================================
CREATE POLICY "Users can view own plans" ON plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own plans" ON plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans" ON plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans" ON plans
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- SESSION TEMPLATES TABLE
-- ============================================
CREATE POLICY "Users can view own session templates" ON session_templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM plans 
      WHERE plans.id = session_templates.plan_id 
      AND plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create session templates in own plans" ON session_templates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM plans 
      WHERE plans.id = plan_id 
      AND plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own session templates" ON session_templates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM plans 
      WHERE plans.id = session_templates.plan_id 
      AND plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own session templates" ON session_templates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM plans 
      WHERE plans.id = session_templates.plan_id 
      AND plans.user_id = auth.uid()
    )
  );

-- ============================================
-- WORKOUT LOGS TABLE
-- ============================================
CREATE POLICY "Users can view own workout logs" ON workout_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workout logs" ON workout_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workout logs" ON workout_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workout logs" ON workout_logs
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- SET LOGS TABLE
-- ============================================
CREATE POLICY "Users can view own set logs" ON set_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_logs 
      WHERE workout_logs.id = set_logs.workout_log_id 
      AND workout_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create set logs in own workouts" ON set_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_logs 
      WHERE workout_logs.id = workout_log_id 
      AND workout_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own set logs" ON set_logs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_logs 
      WHERE workout_logs.id = set_logs.workout_log_id 
      AND workout_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own set logs" ON set_logs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_logs 
      WHERE workout_logs.id = set_logs.workout_log_id 
      AND workout_logs.user_id = auth.uid()
    )
  );

-- ============================================
-- CHECK-INS WEEKLY TABLE
-- ============================================
CREATE POLICY "Users can view own check-ins" ON check_ins_weekly
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own check-ins" ON check_ins_weekly
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check-ins" ON check_ins_weekly
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- DAILY METRICS TABLE
-- ============================================
CREATE POLICY "Users can view own daily metrics" ON metrics_daily
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own daily metrics" ON metrics_daily
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily metrics" ON metrics_daily
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily metrics" ON metrics_daily
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- MEDIA TABLE
-- ============================================
CREATE POLICY "Users can view own media" ON media
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own media" ON media
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own media" ON media
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own media" ON media
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- EXERCISES TABLE (Special case)
-- ============================================
-- All users can view system exercises (created_by_user_id is NULL)
-- Users can only CRUD their own custom exercises

CREATE POLICY "Anyone can view system exercises" ON exercises
  FOR SELECT USING (created_by_user_id IS NULL);

CREATE POLICY "Users can view own custom exercises" ON exercises
  FOR SELECT USING (auth.uid() = created_by_user_id);

CREATE POLICY "Users can create custom exercises" ON exercises
  FOR INSERT WITH CHECK (auth.uid() = created_by_user_id AND is_custom = true);

CREATE POLICY "Users can update own custom exercises" ON exercises
  FOR UPDATE USING (auth.uid() = created_by_user_id AND is_custom = true);

CREATE POLICY "Users can delete own custom exercises" ON exercises
  FOR DELETE USING (auth.uid() = created_by_user_id AND is_custom = true);

-- ============================================
-- STORAGE POLICIES (Run in Storage section)
-- ============================================
-- Note: These need to be created in Supabase Dashboard > Storage > Policies
-- 
-- Bucket: progress-media
-- Policy: Users can only access their own folder
-- 
-- SELECT policy:
--   auth.uid()::text = (storage.foldername(name))[1]
--
-- INSERT policy:  
--   auth.uid()::text = (storage.foldername(name))[1]
--   AND bucket_id = 'progress-media'
--   AND (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov'))
--
-- UPDATE policy:
--   auth.uid()::text = (storage.foldername(name))[1]
--
-- DELETE policy:
--   auth.uid()::text = (storage.foldername(name))[1]
