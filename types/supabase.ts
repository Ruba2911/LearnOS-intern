export interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string;
  duration_hours: number | null;
  difficulty_level: string | null;
  instructor_name: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  progress_percentage: number;
  total_lessons: number | null;
  completed_lessons: number;
  last_accessed: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  course_id: string | null;
  activity_type: string;
  description: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_name: string;
  achievement_icon: string | null;
  description: string | null;
  unlocked_at: string;
  created_at: string;
}

/**
 * Extended types for UI components
 */

export interface CourseWithProgress extends Course {
  progress?: UserProgress;
}

export interface UserProfile extends Profile {
  total_courses?: number;
  completed_courses?: number;
  current_streak?: number;
}
