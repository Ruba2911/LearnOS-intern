"use client";

import { BarChart3, BookOpen, Home, Trophy, Calendar } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const items = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
];

export default function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const getIsActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-[26px] border border-white/10 bg-[#080918]/78 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden">
      <div className="flex items-center justify-around px-3 py-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item.href);

          return (
            <motion.button
              key={item.href}
              onClick={() => router.push(item.href)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              className={`
                relative flex min-w-14 flex-col items-center gap-1
                text-xs
                transition
                ${
                  isActive
                    ? "text-violet-300"
                    : "text-slate-400"
                }
              `}
            >
              <div
                className={`
                  rounded-2xl p-2 transition
                  ${
                    isActive
                      ? "bg-gradient-to-br from-violet-500/25 to-cyan-500/15 shadow-[0_0_24px_rgba(139,92,246,0.32)]"
                      : "bg-transparent"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
