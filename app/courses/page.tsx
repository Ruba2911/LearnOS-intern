'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BentoCard from '@/components/ui/BentoCard'
import CourseCard from '@/components/dashboard/CourseCard'
import { createClient } from '@/lib/supabase/client'
import { getCourses, getUserProgress } from '@/lib/supabase/queries'
import type { Course, UserProgress } from '@/types/supabase'

export default function CoursesPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<Array<Course & { progress?: UserProgress }>>([])
  const [filteredCourses, setFilteredCourses] = useState<Array<Course & { progress?: UserProgress }>>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const loadCourses = async () => {
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

        const allCourses = await getCourses()
        const userProgress = await getUserProgress(user.id)

        const coursesWithProgress = allCourses.map((course) => {
          const progress = userProgress.find((p) => p.course_id === course.id)
          return { ...course, progress }
        })

        setCourses(coursesWithProgress)
        setFilteredCourses(coursesWithProgress)
      } catch (err) {
        console.error('Error loading courses:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [supabase.auth, router])

  useEffect(() => {
    let filtered = courses

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    setFilteredCourses(filtered)
  }, [searchQuery, selectedCategory, courses])

  const categories = [
  'All',
  ...Array.from(new Set(courses.map((c) => c.category))),
]

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            All Courses
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Choose from {courses.length} available courses and start learning today.
          </p>
        </div>

        {/* Search Bar */}
        <BentoCard className="mb-8">
          <div className="flex items-center gap-3 bg-white/[0.055] rounded-2xl border border-white/10 px-4 py-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
            />
          </div>
        </BentoCard>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_0_35px_rgba(139,92,246,0.16)]'
                  : 'border border-white/10 bg-white/5 text-slate-200 hover:border-violet-300/25 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-violet-300/25 hover:bg-white/[0.07] hover:shadow-[0_24px_80px_rgba(88,28,135,0.22)]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                  <span className="rounded-full border border-violet-300/15 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                    {course.category}
                  </span>
                </div>

                {course.description && (
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                )}

                <div className="mb-4 flex items-center gap-4 text-sm text-slate-400">
                  <span>{course.duration_hours || 0}h duration</span>
                  <span>•</span>
                  <span>{course.difficulty_level || 'Intermediate'}</span>
                </div>

                {course.progress && (
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between text-xs text-slate-400">
                      <span>Progress</span>
                      <span className="font-semibold text-slate-200">
                        {course.progress.progress_percentage}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                        style={{ width: `${course.progress.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-300/25 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:from-violet-500/30 hover:to-blue-500/30">
                  {course.progress && course.progress.progress_percentage > 0
                    ? 'Continue'
                    : 'Start'} Learning
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-lg">
                No courses found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
