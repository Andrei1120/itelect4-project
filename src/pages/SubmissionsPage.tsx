import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiSubmission, Course } from "../types/index";
import { submissionSchema, type SubmissionFormValues } from "../schemas/submissionSchema";
import { fetchSubmissions, createSubmission, fetchCourses } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmissionsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: { courseCode: "", repoUrl: "" },
  });

  const courses = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const { data = [], isPending, isError, error } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  // ===== SESSION 10: the two fields the form has, and nothing else =====
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate(values);
  };

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">
        Loading submissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Submissions
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 grid gap-4 rounded-xl border border-border bg-white dark:bg-[#0f172a] p-5 shadow-xs"
      >
        <h3 className="text-base font-semibold text-foreground">
          New Submission
        </h3>

        <div className="grid gap-1.5">
          <Label htmlFor="courseCode" className="text-foreground">
            Course
          </Label>
          <select
            id="courseCode"
            {...register("courseCode")}
            aria-invalid={errors.courseCode ? true : undefined}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select a course...</option>
            {courses.data?.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
          {errors.courseCode && (
            <p className="text-sm text-red-600">{errors.courseCode.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="repoUrl" className="text-foreground">
            GitHub Repository URL
          </Label>
          <Input
            id="repoUrl"
            type="url"
            {...register("repoUrl")}
            aria-invalid={errors.repoUrl ? true : undefined}
            placeholder="https://github.com/username/project"
          />
          {errors.repoUrl && (
            <p className="text-sm text-red-600">{errors.repoUrl.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addSubmission.isPending}
          className="justify-self-start"
        >
          {addSubmission.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {addSubmission.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addSubmission.error.message}
        </p>
      )}

      <div className="space-y-3">
        {data.map((sub) => (
          <div
            key={sub.id}
            className="rounded-xl border border-border bg-white dark:bg-[#0f172a] p-4 shadow-xs flex justify-between items-center"
          >
            <div>
              <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                {sub.courseCode}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                {sub.repoUrl}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(sub.submittedAt).toLocaleString()}
              </p>
            </div>
            {sub.score !== undefined && (
              <span className="text-sm font-bold bg-green-100 text-green-800 px-2.5 py-1 rounded-md">
                Score: {sub.score}
              </span>
            )}
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No submissions yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default SubmissionsPage;
