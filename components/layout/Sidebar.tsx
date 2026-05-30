"use client";

import {
  Home,
  BookOpen,
  BarChart3,
  Calendar,
  Trophy,
  Settings,
  BrainCircuit,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/lib/supabase/logout";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "@/lib/supabase/queries";
import type { Profile } from "@/types/supabase";


const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);


  const getIsActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          setProfile(null);
          return;
        }

        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      } catch {
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [supabase.auth]);

  const nameToDisplay = useMemo(() => {
    const fullName = profile?.full_name?.trim();
    const username = profile?.username?.trim();
    const email = profile?.email?.trim();

    return fullName || username || email || "User";
  }, [profile]);

  const avatarInitials = useMemo(() => {
    const source = nameToDisplay || "User";
    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [nameToDisplay]);

  const handleLogout = async () => {

    const result = await logout();
    if (result.success) {
      router.push("/auth/login");
    }
  };

  return (
    <aside className="fixed left-3 top-3 z-50 hidden h-[calc(100vh-1.5rem)] w-[20rem] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070817]/70 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:flex">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
      <div className="pointer-events-none absolute -left-14 top-20 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
      {/* Logo */}
      <div className="relative border-b border-white/5 p-5">
          <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-[0_0_28px_rgba(139,92,246,0.55)]">
            <BrainCircuit className="h-5 w-5" />
          </div>


          <div>
            <h1 className="text-lg font-bold tracking-tight">
              LearnOS
            </h1>

            <p className="text-xs text-slate-400">
              AI Learning Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item.href);

          return (
            <motion.button
              key={item.href}
              onClick={() => router.push(item.href)}
              whileHover={{
                x: 4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className={`
    relative
    overflow-hidden
    flex
    items-center
    gap-3
    rounded-2xl
    px-4
    py-3
    text-sm
    font-medium
    transition-all
    ${
      isActive
        ? "bg-white/[0.09] text-white shadow-[0_0_35px_rgba(139,92,246,0.16)]"
        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
    }
  `}
            >

  {/* Glow */}
  {isActive && (
    <>
      <motion.div
        layoutId="active-sidebar"
        className="absolute inset-0 rounded-2xl border border-violet-300/20 bg-gradient-to-r from-violet-500/22 to-cyan-500/8"
      />
      <div className="absolute inset-y-2 left-0 w-1 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.9)]" />
    </>
  )}

  <Icon className="relative z-10 h-5 w-5" />

  <span className="relative z-10">
    {item.label}
  </span>

</motion.button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="relative border-t border-white/5 p-4">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-full glass-card flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.065] transition"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 font-semibold text-white">
            {profileLoading ? "R" : avatarInitials}
          </div>


          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-medium text-white">
              {profileLoading ? "Loading..." : nameToDisplay}
            </p>

            <p className="text-xs font-medium text-violet-200">&nbsp;</p>



          </div>




          <motion.div
            animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </motion.div>
        </button>

        {/* Dropdown Menu */}
        {isProfileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-4 right-4 rounded-2xl border border-white/10 bg-[#070817]/95 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl overflow-hidden z-50"
          >
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                router.push("/settings");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.08] transition border-b border-white/5"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-200 hover:bg-red-500/10 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </aside>
  );
}
