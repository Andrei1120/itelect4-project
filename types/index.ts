export interface User {
id: number;
name: string;
email: string;
role: "student" | "admin" | "instructor"; // only these values
isActive: boolean;
}
export interface Course {
code: string;
title: string;
units: number;
semester: string;
}
export interface Submission {
id: number;
studentId: number;
courseCode: string;
repoUrl: string;
submittedAt: Date;
score?: number; // ? means this field is optional
}

export type ID = number | string;
// Alias for an object shape
export type Coordinate = {
x: number;
y: number;
};
// Alias for a function signature
export type Formatter = (value: number) => string;
// Using them
const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;
console.log(studentId); // S2026-001
console.log(formatScore(95.5)); // 95.5%

export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive"; // literal union
// Function that accepts a union type
export function printId(id: StringOrNumber): void {
console.log(`ID: ${id}`);
}
printId(101);
printId("S2026-001");
// ===== INTERSECTION TYPES -- combines ALL properties =====
// StudentWithCourse must have all User fields AND enrolledCourse AND gpa
export type StudentWithCourse = User & {
enrolledCourse: Course;
gpa: number;
};
const topStudent: StudentWithCourse = {
id: 1, name: "Maria Santos", email: "m@example.com",
role: "student", isActive: true,
enrolledCourse: { code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st" },
gpa: 1.25,
};

// ===== NEW ADDITIONS FOR PART 2 =====

// 1. Generic Interface
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

// 2. Generic Functions
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: ID }>(items: T[], id: ID): T | undefined {
  return items.find(item => item.id === id);
}

// 3. Utility Type Uses (at least TWO)
export type UserUpdateInput = Partial<User>;
export type CoursePreview = Pick<Course, "code" | "title">;
export type OptionalSubmission = Partial<Submission>;

// 4. Enum (at least ONE)
export enum SubmissionStatus {
  Pending = "PENDING",
  Submitted = "SUBMITTED",
  Graded = "GRADED",
  Late = "LATE"
}