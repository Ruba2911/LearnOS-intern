import { createClient } from "./client";
import type { Course, UserProgress, ActivityLog, Achievement, Profile } from "@/types/supabase";

const supabase = createClient();

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) throw error;

  return data || [];
}

export async function getUserProgress(userId: string): Promise<(UserProgress & { courses?: Course })[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select(`
      *,
      courses (*)
    `)
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
}

export async function getActivityLogs(userId: string): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function getActivityLogsForDate(userId: string, startDate: string): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startDate)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function getAchievements(userId: string): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
}

export async function getDashboardSummary(userId: string) {
  const profile = await getProfile(userId);
  const progress = await getUserProgress(userId);
  const activity = await getActivityLogs(userId);
  const allCourses = await getCourses();

  const totalCoursesEnrolled = progress?.length || 0;

  const completedCourses = progress?.filter(
    (p) => p.progress_percentage >= 100
  ).length || 0;

  const averageProgress = progress?.length
    ? Math.round(
        progress.reduce(
          (sum, p) => sum + p.progress_percentage,
          0
        ) / progress.length
      )
    : 0;

  // Calculate total hours based on course duration and progress
  const totalHours = progress?.reduce((sum, p) => {
    const course = allCourses.find((c) => c.id === p.course_id);
    const courseHours = course?.duration_hours || 0;
    // Only count completed hours (progress_percentage of course duration)
    const completedHours = (courseHours * p.progress_percentage) / 100;
    return sum + Math.round(completedHours);
  }, 0) || 0;

  // Calculate streak from activity logs
  const streak = calculateStreak(activity);

  return {
    profile,
    stats: {
      totalCoursesEnrolled,
      completedCourses,
      averageProgress,
      totalHours,
    },
    recentActivity: activity || [],
    streak,
  };
}

export async function getActivityHeatmapData(userId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 49); // 7 weeks

  const activity = await getActivityLogsForDate(userId, sevenDaysAgo.toISOString());

  // Create a map of dates to activity count
  const activityMap = new Map<string, number>();

  activity.forEach((log) => {
    const date = new Date(log.created_at).toDateString();
    activityMap.set(date, (activityMap.get(date) || 0) + 1);
  });

  // Generate 49 days (7 weeks) of intensity values (0-5)
  const intensities: number[] = [];
  for (let i = 48; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    const count = activityMap.get(dateStr) || 0;
    // Map count to intensity 0-5
    const intensity = Math.min(5, Math.max(0, Math.floor(count / 2)));
    intensities.push(intensity);
  }

  return intensities;
}

function calculateStreak(activity: ActivityLog[]): number {
  if (!activity || activity.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toDateString();

    const hasActivityOnDate = activity.some(
      (log) => new Date(log.created_at).toDateString() === dateStr
    );

    if (hasActivityOnDate) {
      streak++;
    } else if (i === 0) {
      // If no activity today, check yesterday to see if we broke the streak
      continue;
    } else {
      break;
    }
  }

  return streak;
}
export async function createProfile(profile: {
  id: string
  email: string
  full_name?: string
  username?: string
}) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        username: profile.username,
      },
    ])

  if (error) throw error

  return data
}