import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { Course } from "../types/index";
import { fetchCourseByCode, API_URL } from "../api/client";
import { Button } from "@/components/ui/button";

function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<Course>({
    queryKey: ["courses", code],
    queryFn: () => fetchCourseByCode(code!),
    enabled: Boolean(code),
  });

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">
        Loading course details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p>{error.message} -- tried {API_URL}/api/courses/{code}</p>
        <Button
          onClick={() => navigate("/courses")}
          className="mt-4"
          variant="outline"
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="rounded-xl border border-border bg-white dark:bg-[#0f172a] p-6 shadow-xs">
        <span className="inline-block rounded-md bg-blue-100 dark:bg-blue-900/40 px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
          {data.code}
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {data.title}
        </h2>
        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><strong>Units:</strong> {data.units}</p>
          <p><strong>Semester:</strong> {data.semester}</p>
        </div>
        <Button
          onClick={() => navigate("/courses")}
          className="mt-6"
          variant="outline"
        >
          &larr; Back to Courses
        </Button>
      </div>
    </div>
  );
}

export default CourseDetailPage;
