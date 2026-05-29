"use client";

import { Bell, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050510]/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Left Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-inner shadow-white/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          {/* Search */}
          <div className="hidden w-[min(38vw,360px)] items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-slate-400 shadow-inner shadow-black/30 transition focus-within:border-cyan-300/40 focus-within:bg-white/[0.075] focus-within:shadow-[0_0_28px_rgba(34,211,238,0.14)] md:flex">
            <Search className="h-4 w-4" />

            <input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>

        </div>

        {/* Right Side */}
        <motion.button
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-slate-300 transition hover:border-violet-300/30 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]"
        >
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          <Bell className="h-5 w-5" />
        </motion.button>

      </div>
    </header>
  );
}
