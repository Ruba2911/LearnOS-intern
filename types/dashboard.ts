export interface Stat {
  title: "Courses" | "Hours" | "Projects";
  value: string;
  description: string;
  tone: "violet" | "blue" | "cyan";
}

export interface Course {
  title: string;
  category: string;
  progress: number;
  duration: string;
  tone: "violet" | "blue" | "cyan";
}
