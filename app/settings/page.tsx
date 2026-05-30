'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings as SettingsIcon, Bell, Shield, LogOut } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BentoCard from '@/components/ui/BentoCard'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/lib/supabase/logout'
import { getProfile } from '@/lib/supabase/queries'
import type { Profile } from '@/types/supabase'

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
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

        const userProfile = await getProfile(user.id)
        setProfile(userProfile)
      } catch (err) {
        console.error('Error loading settings:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [supabase.auth, router])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push('/auth/login')
    }
  }

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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-400 text-white shadow-[0_0_28px_rgba(71,85,105,0.28)]">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Settings
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Manage your account preferences and notifications.
          </p>
        </div>

        {/* Profile Section */}
        <BentoCard className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Account
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Profile Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Full Name
              </label>
              <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-white">
                {profile?.full_name || 'Not set'}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Email
              </label>
              <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-white">
                {profile?.email || 'Not set'}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Username
              </label>
              <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-white">
                {profile?.username || 'Not set'}
              </div>
            </div>

            {profile?.bio && (
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">
                  Bio
                </label>
                <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-white text-sm">
                  {profile.bio}
                </div>
              </div>
            )}
          </div>
        </BentoCard>

        {/* Notifications Section */}
        <BentoCard className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Preferences
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Notification Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/[0.045]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-200">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email Notifications</p>
                  <p className="text-xs text-slate-400">Receive updates via email</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  emailNotifications
                    ? 'bg-violet-500 shadow-[0_0_16px_rgba(139,92,246,0.4)]'
                    : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/[0.045]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Push Notifications</p>
                  <p className="text-xs text-slate-400">Receive browser notifications</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  pushNotifications
                    ? 'bg-violet-500 shadow-[0_0_16px_rgba(139,92,246,0.4)]'
                    : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </BentoCard>

        {/* Security Section */}
        <BentoCard className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Security
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Account Security
          </h2>

          <button className="w-full flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 hover:border-slate-400/25 hover:bg-white/[0.055] transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/20 text-slate-200">
              <Shield className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Change Password</p>
              <p className="text-xs text-slate-400">Update your account password</p>
            </div>
          </button>
        </BentoCard>

        {/* Logout */}
        <BentoCard>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Session
          </p>
          <h2 className="text-2xl font-black text-white mb-6">
            Sign Out
          </h2>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg border border-red-500/25 bg-red-500/10 p-4 hover:border-red-400/40 hover:bg-red-500/15 transition"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/30 text-red-200">
              <LogOut className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-red-200">Logout</p>
              <p className="text-xs text-red-400/70">Sign out from your account</p>
            </div>
          </button>
        </BentoCard>
      </div>
    </DashboardLayout>
  )
}
