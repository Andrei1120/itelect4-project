import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import type { Course } from "../types/index";
import { fetchCourses, API_URL } from "../api/client";

function CoursesPage() {
  const { data, isPending, isError, error } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">
        Loading courses...
      </div>
    );
  }

  // ===== SESSION 10: name the host it actually tried ===================
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- tried {API_URL}/api/courses
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Courses
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {(data ?? []).map((course) => (
          <Link
            key={course.code}
            to={`/courses/${course.code}`}
            className="block rounded-xl border border-border bg-white dark:bg-[#0f172a] p-5 shadow-xs transition-transform hover:scale-[1.02]"
          >
            <span className="inline-block rounded-md bg-blue-100 dark:bg-blue-900/40 px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
              {course.code}
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Units: {course.units} &bull; {course.semester}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
