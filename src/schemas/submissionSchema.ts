import { z } from "zod";

export const submissionSchema = z.object({
  courseCode: z.string().min(1, "Please select a course."),
  repoUrl: z
    .string()
    .min(1, "GitHub repository URL is required.")
    .regex(/^https:\/\/github\.com\/.+/, "repoUrl must start with https://github.com/"),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
