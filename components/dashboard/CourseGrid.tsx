import CourseCard from "./CourseCard";
import SectionTitle from "@/components/ui/SectionTitle";

const courses = [
  {
    title: "Next.js App Router Mastery",
    category: "Frontend",
    progress: 72,
    duration: "4h left",
  },
  {
    title: "Supabase Data Workflows",
    category: "Backend",
    progress: 48,
    duration: "7h left",
  },
  {
    title: "AI Product Design",
    category: "Strategy",
    progress: 86,
    duration: "2h left",
  },
];

export default function CourseGrid() {
  return (
    <section className="space-y-5">
      <SectionTitle eyebrow="Courses" title="Continue learning" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </section>
  );
}
