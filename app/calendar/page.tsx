'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BentoCard from '@/components/ui/BentoCard'
import { createClient } from '@/lib/supabase/client'
import { getActivityLogs } from '@/lib/supabase/queries'
import type { ActivityLog } from '@/types/supabase'

export default function CalendarPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])

  useEffect(() => {
    const loadCalendarData = async () => {
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

        const logs = await getActivityLogs(user.id)
        setActivityLogs(logs)
      } catch (err) {
        console.error('Error loading calendar data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCalendarData()
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

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const activityMap = new Map<string, number>()
  activityLogs.forEach((log) => {
    const date = new Date(log.created_at).toDateString()
    activityMap.set(date, (activityMap.get(date) || 0) + 1)
  })

  const getActivityForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return activityMap.get(date.toDateString()) || 0
  }

  const getIntensity = (count: number) => {
    if (count === 0) return 0
    if (count === 1) return 2
    if (count === 2) return 3
    if (count === 3) return 4
    return 5
  }

  const cellStyles = [
    'bg-white/[0.045]',
    'bg-violet-500/20',
    'bg-violet-500/35 shadow-[0_0_16px_rgba(139,92,246,0.22)]',
    'bg-gradient-to-br from-violet-500/70 to-blue-500/55 shadow-[0_0_18px_rgba(139,92,246,0.38)]',
    'bg-gradient-to-br from-blue-500/80 to-cyan-400/65 shadow-[0_0_20px_rgba(34,211,238,0.35)]',
    'bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.5)]',
  ]

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const calendarDays = []
  const monthDays = daysInMonth(currentDate)
  const firstDay = firstDayOfMonth(currentDate)

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  for (let i = 1; i <= monthDays; i++) {
    calendarDays.push(i)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-400 text-white shadow-[0_0_28px_rgba(34,211,238,0.28)]">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Learning Calendar
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Track your daily learning activities and maintain consistency.
          </p>
        </div>

        {/* Calendar */}
        <BentoCard>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <button
              onClick={prevMonth}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:border-violet-300/25 hover:text-white transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-black text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <button
              onClick={nextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:border-violet-300/25 hover:text-white transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-bold uppercase text-slate-500 pb-3">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const activity = getActivityForDay(day)
              const intensity = getIntensity(activity)

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg border border-white/5 flex items-center justify-center text-center cursor-pointer transition hover:scale-105 ${cellStyles[intensity]}`}
                  title={`${activity} activities`}
                >
                  <div>
                    <p className="text-sm font-bold text-white">{day}</p>
                    {activity > 0 && (
                      <p className="text-xs text-slate-300 mt-1">{activity} act.</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
              Activity Intensity
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">Less</span>
              <div className="flex items-center gap-1.5">
                {cellStyles.map((style, index) => (
                  <span key={index} className={`h-4 w-4 rounded ${style}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500">More</span>
            </div>
          </div>
        </BentoCard>

        {/* Recent Activity */}
        <BentoCard className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Recent Activity
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Latest Learning Sessions
          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activityLogs.slice(0, 20).map((log) => (
              <div key={log.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white capitalize">{log.activity_type.replace('_', ' ')}</p>
                  {log.description && (
                    <p className="text-sm text-slate-400 mt-1">{log.description}</p>
                  )}
                </div>
                <p className="text-xs text-slate-500 ml-4 whitespace-nowrap">
                  {new Date(log.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </DashboardLayout>
  )
}
