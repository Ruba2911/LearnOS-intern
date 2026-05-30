'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BentoCard from '@/components/ui/BentoCard'
import { createClient } from '@/lib/supabase/client'
import { getDashboardSummary, getCourses, getUserProgress } from '@/lib/supabase/queries'
import type { Course, UserProgress } from '@/types/supabase'

export default function AnalyticsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCoursesEnrolled: 0,
    completedCourses: 0,
    averageProgress: 0,
    totalHours: 0,
    streak: 0,
  })
  const [courses, setCourses] = useState<Course[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true)

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push('/auth/login')
          return
        }

        const dashboardData = await getDashboardSummary(user.id)
        const allCourses = await getCourses()
        const userProgress = await getUserProgress(user.id)

        setStats({
          totalCoursesEnrolled: dashboardData.stats.totalCoursesEnrolled,
          completedCourses: dashboardData.stats.completedCourses,
          averageProgress: dashboardData.stats.averageProgress,
          totalHours: dashboardData.stats.totalHours,
          streak: dashboardData.streak,
        })

        setCourses(allCourses)
        setProgress(userProgress)
      } catch (err) {
        console.error('Error loading analytics:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [supabase.auth, router])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  const completionRate = stats.totalCoursesEnrolled
    ? Math.round((stats.completedCourses / stats.totalCoursesEnrolled) * 100)
    : 0

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_0_28px_rgba(34,211,238,0.28)]">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Analytics & Insights
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Track your learning progress and achievements.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
                  Courses Enrolled
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.totalCoursesEnrolled}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                <Target className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-green-300">
                  Completed
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.completedCourses}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-green-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
                  Total Hours
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.totalHours}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Current Streak
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.streak}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-200">
                <Zap className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Progress Metrics */}
        <BentoCard className="mb-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
              Overall Metrics
            </p>
            <h2 className="text-2xl font-black text-white mb-6">
              Learning Statistics
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">
                    Average Progress
                  </span>
                  <span className="text-2xl font-black text-white">
                    {stats.averageProgress}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                    style={{ width: `${stats.averageProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">
                    Completion Rate
                  </span>
                  <span className="text-2xl font-black text-white">
                    {completionRate}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Course Progress */}
        <BentoCard>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Course Breakdown
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Individual Course Progress
          </h2>

          <div className="space-y-4">
            {progress.map((p) => {
              const course = courses.find((c) => c.id === p.course_id)
              if (!course) return null

              return (
                <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{course.category}</p>
                    </div>
                    <span className="text-xl font-black text-white">
                      {p.progress_percentage}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                      style={{ width: `${p.progress_percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </BentoCard>
      </div>
    </DashboardLayout>
  )
}
