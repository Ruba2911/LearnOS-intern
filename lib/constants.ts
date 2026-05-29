import { Course, Stat } from "@/types/dashboard";

export const stats: Stat[] = [
  {
    title: "Courses",
    value: "12",
    description: "Active learning tracks",
    tone: "violet",
  },
  {
    title: "Hours",
    value: "148",
    description: "Learning hours completed",
    tone: "blue",
  },
  {
    title: "Projects",
    value: "8",
    description: "Real-world projects built",
    tone: "cyan",
  },
];

export const courses: Course[] = [
  {
    title: "Advanced React Patterns",
    category: "Frontend",
    progress: 78,
    duration: "12h 30m",
    tone: "violet",
  },
  {
    title: "AI System Design",
    category: "Artificial Intelligence",
    progress: 54,
    duration: "8h 10m",
    tone: "blue",
  },
  {
    title: "Full Stack Architecture",
    category: "Backend",
    progress: 91,
    duration: "15h 45m",
    tone: "cyan",
  },
];
