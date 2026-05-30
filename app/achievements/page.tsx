'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, Star, Award, Medal, Badge, Target, Zap } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BentoCard from '@/components/ui/BentoCard'
import { createClient } from '@/lib/supabase/client'
import { getAchievements, getDashboardSummary } from '@/lib/supabase/queries'
import type { Achievement } from '@/types/supabase'

export default function AchievementsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState({
    totalAchievements: 0,
    completionRate: 0,
    totalHours: 0,
  })

  useEffect(() => {
    const loadAchievements = async () => {
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

        const userAchievements = await getAchievements(user.id)
        const dashboardData = await getDashboardSummary(user.id)

        setAchievements(userAchievements)
        setStats({
          totalAchievements: userAchievements.length,
          completionRate: dashboardData.stats.completedCourses,
          totalHours: dashboardData.stats.totalHours,
        })
      } catch (err) {
        console.error('Error loading achievements:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAchievements()
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

  const achievementTemplates = [
    {
      id: 'first-course',
      title: 'First Course',
      description: 'Complete your first course',
      icon: Trophy,
      color: 'from-violet-500 to-blue-500',
      iconColor: 'text-violet-200',
      earned: stats.completionRate >= 1,
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Earn 10 hours of learning',
      icon: Zap,
      color: 'from-cyan-500 to-blue-500',
      iconColor: 'text-cyan-200',
      earned: stats.totalHours >= 10,
    },
    {
      id: 'consistent',
      title: 'Consistent Learner',
      description: 'Maintain a 7-day streak',
      icon: Star,
      color: 'from-orange-500 to-yellow-500',
      iconColor: 'text-orange-200',
      earned: achievements.some((a) => a.achievement_name.includes('7-day')),
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Complete 5 courses',
      icon: Award,
      color: 'from-pink-500 to-purple-500',
      iconColor: 'text-pink-200',
      earned: stats.completionRate >= 5,
    },
    {
      id: 'master',
      title: 'Master Learner',
      description: 'Earn 100+ hours',
      icon: Medal,
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-200',
      earned: stats.totalHours >= 100,
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Complete 10 courses',
      icon: Badge,
      color: 'from-green-500 to-cyan-500',
      iconColor: 'text-green-200',
      earned: stats.completionRate >= 10,
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-400 text-white shadow-[0_0_28px_rgba(251,146,60,0.28)]">
              <Trophy className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Achievements
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Unlock badges and celebrate your learning milestones.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
                  Badges Earned
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.totalAchievements}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
                  Courses Completed
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.completionRate}
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
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Total Hours
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {stats.totalHours}h
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-200">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievementTemplates.map((achievement) => {
            const Icon = achievement.icon
            return (
              <BentoCard
                key={achievement.id}
                className={`relative overflow-hidden ${
                  !achievement.earned ? 'opacity-50' : ''
                }`}
              >
                {achievement.earned && (
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                )}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.color} shadow-lg mb-4`}
                >
                  <Icon className={`h-8 w-8 ${achievement.iconColor}`} />
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  {achievement.title}
                </h3>

                <p className="text-sm text-slate-400 mb-4">
                  {achievement.description}
                </p>

                <div className="flex items-center gap-2">
                  {achievement.earned ? (
                    <div className="text-xs font-semibold text-green-200 bg-green-500/20 px-3 py-1 rounded-full">
                      Unlocked
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-slate-400 bg-slate-500/20 px-3 py-1 rounded-full">
                      Locked
                    </div>
                  )}
                </div>
              </BentoCard>
            )
          })}
        </div>

        {/* User Achievements */}
        {achievements.length > 0 && (
          <BentoCard className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
              Your Badges
            </p>
            <h2 className="text-2xl font-black text-white mb-6">
              Custom Achievements
            </h2>

            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white">
                        {achievement.achievement_name}
                      </h3>
                      {achievement.description && (
                        <p className="text-sm text-slate-400 mt-1">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 ml-4 whitespace-nowrap">
                      {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        )}
      </div>
    </DashboardLayout>
  )
}
