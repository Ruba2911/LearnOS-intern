'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Flame,
  Play,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'

import BentoGrid from '@/components/dashboard/BentoGrid'
import StatsCard from '@/components/dashboard/StatsCard'
import CourseCard from '@/components/dashboard/CourseCard'
import ActivityHeatmap from '@/components/dashboard/ActivityHeatmap'

import BentoCard from '@/components/ui/BentoCard'

import { createClient } from '@/lib/supabase/client'
import { getDashboardSummary, getCourses, getUserProgress } from '@/lib/supabase/queries'
import type { Course, UserProgress, ActivityLog } from '@/types/supabase'

export default function HomePage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState([
    { title: 'Courses' as const, value: '0', description: 'Enrolled', tone: 'violet' as const },
    { title: 'Hours' as const, value: '0', description: 'Completed', tone: 'blue' as const },
    { title: 'Projects' as const, value: '0%', description: 'Average progress', tone: 'cyan' as const },
  ])
  const [courses, setCourses] = useState<Array<Course & { progress?: UserProgress }>>([])
  const [streak, setStreak] = useState(0)
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true)

        // Get current user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push('/auth/login')
          return
        }

        // Load dashboard data
        const dashboardData = await getDashboardSummary(user.id)
        const allCourses = await getCourses()
        const userProgress = await getUserProgress(user.id)

        if (dashboardData) {
          setUserName(dashboardData.profile?.full_name || 'User')

          // Update stats with correct values
          setStats([
            {
              title: 'Courses',
              value: dashboardData.stats.totalCoursesEnrolled.toString(),
              description: 'Enrolled',
              tone: 'violet',
            },
            {
              title: 'Hours',
              value: dashboardData.stats.totalHours.toString(),
              description: 'Completed',
              tone: 'blue',
            },
            {
              title: 'Projects',
              value: dashboardData.stats.averageProgress.toString() + '%',
              description: 'Average progress',
              tone: 'cyan',
            },
          ])

          setRecentActivity(dashboardData.recentActivity)
          setStreak(dashboardData.streak)

          // Combine courses with progress data
          const coursesWithProgress = allCourses.map((course) => {
            const progress = userProgress.find((p) => p.course_id === course.id)
            return { ...course, progress }
          })

          setCourses(coursesWithProgress.slice(0, 3))
        }
      } catch (err) {
        console.error('Error loading dashboard:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
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

  return (
    <DashboardLayout>
      <BentoGrid>
        <BentoCard className="min-h-[320px] md:col-span-2 xl:col-span-3 xl:row-span-2">
          <div className="absolute -right-28 top-1/2 hidden h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px] xl:block" />
          <div className="absolute right-8 top-8 hidden h-[360px] w-[360px] rounded-full bg-violet-600/25 blur-[120px] xl:block" />
          <div className="absolute right-10 top-16 hidden h-[300px] w-[300px] rounded-full border border-cyan-300/10 xl:block" />
          <div className="absolute right-20 top-24 hidden h-[210px] w-[210px] rounded-full border border-violet-300/10 xl:block" />
          <div className="absolute right-24 top-28 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,#67e8f9_0%,#8b5cf6_42%,transparent_70%)] opacity-90 blur-sm shadow-[0_0_90px_rgba(34,211,238,0.55)] xl:block" />

          <div className="flex h-full max-w-4xl flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-violet-200 shadow-[0_0_28px_rgba(139,92,246,0.16)]">
                <Sparkles className="h-4 w-4" />
                Welcome back
              </div>

              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Build your <span className="gradient-text">futuristic</span> AI learning journey.
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Master modern technologies with immersive learning experiences, live progress intelligence, and cinematic focus flows powered by modern web architecture.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => router.push('/courses')}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(139,92,246,0.34)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(34,211,238,0.28)]"
              >
                Continue Learning
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push('/analytics')}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-3 text-sm font-bold text-white shadow-inner shadow-white/5 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.085]"
              >
                View Analytics
                <BarChart3 className="h-4 w-4 text-cyan-200" />
              </button>
            </div>
          </div>
        </BentoCard>

        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            tone={stat.tone}
          />
        ))}

        <BentoCard className="min-h-[350px] md:col-span-2 xl:row-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                Activity
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Weekly Progress
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
              +18% focus
            </div>
          </div>
          <ActivityHeatmap />
        </BentoCard>

        <BentoCard className="min-h-[360px] md:col-span-2 xl:col-span-2 xl:row-span-2">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
                Curriculum
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                My Courses
              </h2>
            </div>
            <button
              onClick={() => router.push('/courses')}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-300/25 hover:bg-white/10"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-2">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                title={course.title}
                category={course.category}
                progress={course.progress?.progress_percentage || 0}
                duration={`${course.duration_hours || 0}h`}
                tone={
                  index % 3 === 0
                    ? 'violet'
                    : index % 3 === 1
                    ? 'blue'
                    : 'cyan'
                }
              />
            ))}
          </div>
        </BentoCard>

        <BentoCard className="min-h-[200px] md:col-span-2 xl:col-span-2">
          <div className="flex h-full flex-col justify-between gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Focus Queue
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
                  Next learning sprint
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.16)]">
                <Play className="h-4 w-4 fill-current" />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] p-3 transition hover:border-cyan-300/20 hover:bg-white/[0.07]"
                >
                  <p className="text-sm font-semibold text-white">{course.title}</p>
              <p className="mt-1 text-xs text-slate-500">{Math.round((course.duration_hours || 0) * (1 - (course.progress?.progress_percentage || 0) / 100))}h remaining</p>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard className="min-h-[200px]">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400/25 to-violet-500/20 text-orange-200 shadow-[0_0_28px_rgba(251,146,60,0.16)]">
                <Flame className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                Live
              </span>
            </div>

            <div>
              <p className="text-5xl font-black tracking-tight text-white">
                {streak}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Day streak
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="min-h-[200px]">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 text-violet-200 shadow-[0_0_28px_rgba(139,92,246,0.18)]">
                <Target className="h-5 w-5" />
              </div>
              <Zap className="h-5 w-5 text-cyan-200" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-300">Milestone</p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-white">
                {courses.length > 0 ? `${courses[0].title}` : 'Complete next course'}
              </h3>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                {courses.length > 0 ? `${100 - (courses[0].progress?.progress_percentage || 0)}% remaining` : 'Start learning'}
              </div>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </DashboardLayout>
  )
}
