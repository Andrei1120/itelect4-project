// ===== PRIMITIVE TYPE ANNOTATIONS =====
// Variables with explicit types
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;
// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
return `Welcome to ${name} -- AY ${year}!`;
}
// void: function that does NOT return a value
function logMessage(message: string): void {
console.log(message);
}
logMessage(greet(projectName, currentYear));

let anything: any = "hello";
anything = 42; // No error
anything = true; // No error
// unknown -- the safer version of any
// You MUST check the type before using it
let userInput: unknown = "test";
if (typeof userInput === "string") {
console.log(userInput.toUpperCase()); // OK -- TypeScript knows it's a string here
}
// never -- a function that NEVER returns
// Used when a function always throws an error or loops forever
function throwError(message: string): never {
throw new Error(message);
}

import type { User, Course, Submission } from "../types/index";
// ... (your previous code) ...
// ===== USING INTERFACES =====
const student: User = {
id: 1,
name: "Juan dela Cruz",
email: "juan@example.com",
role: "student",
isActive: true,
};
const course: Course = {
code: "ITELECT4",
title: "IT Elective 4",
units: 3,
semester: "1st Semester 2026-2027",
};
console.log(student);
console.log(course);

import type { StringOrNumber } from "../types/index";
// Narrowing with typeof
// Without the if-check, TypeScript would error:
// Property 'toUpperCase' does not exist on type 'number'
function processInput(input: StringOrNumber): string {
if (typeof input === "string") {
return input.toUpperCase(); // TypeScript knows: input is string here
}
return input.toFixed(2); // TypeScript knows: input is number here
}
// Narrowing with instanceof
// Used with class instances like Date, Error, etc.
function formatDate(value: string | Date): string {
if (value instanceof Date) {
return value.toLocaleDateString(); // TypeScript knows: it's a Date
}
return value; // TypeScript knows: it's a string
}
console.log(processInput("hello")); // HELLO
console.log(processInput(3.14159)); // 3.14
console.log(formatDate(new Date())); // e.g. 7/4/2026

// ===== DEMONSTRATING NEW ADDITIONS FOR PART 2 =====
import {
  getFirst,
  getById,
  SubmissionStatus
} from "../types/index";
import type {
  ApiResponse,
  UserUpdateInput,
  CoursePreview
} from "../types/index";

// 1. ApiResponse<T> Generic Interface Demonstration
const userResponse: ApiResponse<User> = {
  status: "success",
  message: "User profiles retrieved successfully",
  data: student
};
console.log("ApiResponse demonstration:", userResponse);

// 2. Generic Functions (getFirst and getById) Demonstration
const numberList = [42, 100, 200];
const firstNum = getFirst(numberList);
console.log("getFirst (numbers) demonstration:", firstNum);

const studentList: User[] = [
  student,
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "instructor", isActive: true }
];
const searchedUser = getById(studentList, 2);
console.log("getById (User with id = 2) demonstration:", searchedUser);

// 3. Utility Types (Partial and Pick) Demonstration
const userUpdate: UserUpdateInput = {
  email: "juan.updated@example.com"
};
console.log("UserUpdateInput (Partial<User>) demonstration:", userUpdate);

const coursePreview: CoursePreview = {
  code: "ITELECT4",
  title: "IT Elective 4"
};
console.log("CoursePreview (Pick<Course, 'code' | 'title'>) demonstration:", coursePreview);

// 4. Enum (SubmissionStatus) Demonstration
const currentStatus: SubmissionStatus = SubmissionStatus.Submitted;
console.log("SubmissionStatus enum demonstration:", currentStatus);