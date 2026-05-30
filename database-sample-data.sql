-- ============================================================================
-- LEARNING DASHBOARD - SAMPLE DATA
-- Copy and paste this into Supabase SQL Editor AFTER running schema.sql
-- ============================================================================

-- Sample User ID (Use a real UUID from your Supabase Auth users)
-- For testing, use the format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx

-- 1. INSERT SAMPLE PROFILE
INSERT INTO profiles (id, username, email, full_name, bio, created_at)
VALUES (
  'a0000000-0000-4000-8000-000000000001'::uuid,
  'johndoe',
  'john@example.com',
  'John Doe',
  'Aspiring full-stack developer learning Next.js',
  NOW()
);

-- 2. INSERT SAMPLE COURSES
INSERT INTO courses (id, title, description, category, duration_hours, difficulty_level, instructor_name, created_at)
VALUES
  (
    'b0000000-0000-4000-8000-000000000001'::uuid,
    'Next.js 14 Masterclass',
    'Learn to build modern web applications with Next.js 14 App Router',
    'web',
    24,
    'intermediate',
    'Vercel Team',
    NOW()
  ),
  (
    'b0000000-0000-4000-8000-000000000002'::uuid,
    'TypeScript Fundamentals',
    'Master TypeScript from basics to advanced patterns',
    'web',
    16,
    'beginner',
    'Tech Academy',
    NOW()
  ),
  (
    'b0000000-0000-4000-8000-000000000003'::uuid,
    'Tailwind CSS Pro',
    'Advanced styling with Tailwind CSS and animations',
    'web',
    12,
    'intermediate',
    'Design Masters',
    NOW()
  );

-- 3. INSERT USER PROGRESS FOR COURSES
INSERT INTO user_progress (user_id, course_id, progress_percentage, total_lessons, completed_lessons, created_at)
VALUES
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000001'::uuid,
    65,
    24,
    16,
    NOW()
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000002'::uuid,
    100,
    16,
    16,
    NOW() - INTERVAL '30 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000003'::uuid,
    45,
    12,
    5,
    NOW() - INTERVAL '7 days'
  );

-- 4. INSERT ACTIVITY LOGS
INSERT INTO activity_logs (user_id, course_id, activity_type, description, created_at)
VALUES
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000001'::uuid,
    'lesson_completed',
    'Completed: App Router Fundamentals',
    NOW() - INTERVAL '2 hours'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000002'::uuid,
    'quiz_passed',
    'Passed: TypeScript Basics Quiz (95%)',
    NOW() - INTERVAL '5 hours'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000001'::uuid,
    'lesson_completed',
    'Completed: API Routes & Middleware',
    NOW() - INTERVAL '1 day'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000003'::uuid,
    'project_submitted',
    'Submitted: Personal Portfolio Project',
    NOW() - INTERVAL '2 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000002'::uuid,
    'lesson_completed',
    'Completed: Advanced Types & Generics',
    NOW() - INTERVAL '3 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000001'::uuid,
    'lesson_completed',
    'Completed: Server Components Deep Dive',
    NOW() - INTERVAL '4 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'b0000000-0000-4000-8000-000000000003'::uuid,
    'quiz_passed',
    'Passed: Tailwind Advanced Features (88%)',
    NOW() - INTERVAL '6 days'
  );

-- 5. INSERT ACHIEVEMENTS
INSERT INTO achievements (user_id, achievement_name, description, unlocked_at)
VALUES
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'Getting Started',
    'Completed your first lesson',
    NOW() - INTERVAL '60 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'TypeScript Master',
    'Completed TypeScript Fundamentals course with 100%',
    NOW() - INTERVAL '30 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'Streak Week',
    'Maintained a 7-day learning streak',
    NOW() - INTERVAL '5 days'
  ),
  (
    'a0000000-0000-4000-8000-000000000001'::uuid,
    'Speed Learner',
    'Completed 5 lessons in a single day',
    NOW() - INTERVAL '2 days'
  );

-- ============================================================================
-- TESTING: Run these queries to verify data was inserted correctly
-- ============================================================================

-- SELECT COUNT(*) FROM profiles;
-- SELECT COUNT(*) FROM courses;
-- SELECT COUNT(*) FROM user_progress;
-- SELECT COUNT(*) FROM activity_logs;
-- SELECT COUNT(*) FROM achievements;
