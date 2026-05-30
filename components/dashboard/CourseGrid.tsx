"use client";

import { useEffect, useState } from "react";

import CourseCard from "./CourseCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { getCourses } from "@/lib/supabase/queries";
import type { Course } from "@/types/supabase";

export default function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();

        if (data) {
          setCourses(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, []);

  return (
    <section className="space-y-5">
      <SectionTitle
        eyebrow="Courses"
        title="Continue learning"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            category={course.category}
            progress={75}
            duration={course.duration_hours ? `${course.duration_hours}h` : "N/A"}
          />
        ))}
      </div>
    </section>
  );
}