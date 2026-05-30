"use client";

import { useEffect, useState } from "react";
import {
  getCourses,
  getUserProgress,
  getAchievements,
  getActivityLogs,
} from "@/lib/supabase/queries";

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const userId =
        "06a04d1d-2c97-4f66-891f-5d2c06021a3a";

      const courses = await getCourses();
      const progress = await getUserProgress(userId);
      const achievements = await getAchievements(userId);
      const activity = await getActivityLogs(userId);

      setData({
        courses,
        progress,
        achievements,
        activity,
      });
    }

    loadData();
  }, []);

  return (
    <div className="p-8 text-white">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}