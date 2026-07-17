# ITELECT4 TypeScript Project (GT1 - Part 2)

This is a TypeScript console application developed for **IT Elective 4** at De La Salle Lipa.

## Project Concept
The project serves as a foundational platform for learning advanced TypeScript concepts. It models a student course management and submission tracking system. The system manages user profiles (students, instructors, and administrators), courses, and project submissions. In this second part, the application is enhanced with generic interfaces and functions, TypeScript utility types, and enums to show how type-safety and code reusability can be maximized.

## Features & Types Defined
This project defines several core TypeScript interfaces, types, and generic functions:

### Interfaces & Basic Types
*   `User`: Represents a system user with roles (`student`, `instructor`, `admin`) and status.
*   `Course`: Represents academic course details (code, title, units, semester).
*   `Submission`: Represents a repository submission by a student, with optional grading capability.
*   `ID`: A union type representing a unique identifier (string or number).
*   `Coordinate`: An object type defining x and y coordinates.
*   `Formatter`: A function signature type for formatting scores.
*   `StringOrNumber`: A union type representing either a string or a number.
*   `Status`: A union type representing account status states (`pending`, `active`, `inactive`).
*   `StudentWithCourse`: An intersection type combining `User` and course enrollment data.

### Part 2 Additions
*   `ApiResponse<T>`: A generic interface that models standardized API responses wrapping arbitrary payload data (`T`).
*   `getFirst<T>`: A generic function that retrieves the first element from an array of any type.
*   `getById<T>`: A generic function that retrieves an item by its unique ID from a list of objects containing `id`.
*   **Utility Type Uses**:
    *   `UserUpdateInput` (using `Partial<User>`): Allows updating subset fields of a User.
    *   `CoursePreview` (using `Pick<Course, "code" | "title">`): Defines a course preview layout containing only code and title.
    *   `OptionalSubmission` (using `Partial<Submission>`): Used for checking partial submissions.
*   `SubmissionStatus` (Enum): A set of standard submission states (`PENDING`, `SUBMITTED`, `GRADED`, `LATE`).

## Getting Started

### Installation
Ensure you have [Node.js](https://nodejs.org/) installed. Clone the repository and install dependencies:
```bash
npm install
```

### Running the Project
To execute the application and see the console output demonstrating all types and functions, run:
```bash
npx ts-node src/index.ts
```

### Type Checking
To run the TypeScript compiler in dry-run mode and check for errors:
```bash
npx tsc --noEmit
```
