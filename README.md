# ITELECT4 TypeScript Project (GT1 - Part 2)

This is a TypeScript console application developed for **IT Elective 4** at De La Salle Lipa.

## Project Concept
The project serves as a foundational platform for learning advanced TypeScript concepts. It models a student course management and submission tracking system. The system manages user profiles (students, instructors, and administrators), courses, and project submissions. In this second part, the application is enhanced with generic interfaces and functions, TypeScript utility types, and enums to show how type-safety and code reusability can be maximized.

## Features & Types Defined
This project defines several core TypeScript interfaces, types, and generic functions:

### Interfaces & Basic Types
*   `User`: Represents academic user data with standard attributes.
*   `Course`: Represents details of an academic course.
*   `Submission`: Represents a repository submission by a student.
*   `ID`: A union type representing a unique identifier (string or number).
*   `Coordinate`: An object type defining x and y coordinates.
*   `Formatter`: A function signature type for formatting scores.
*   `StringOrNumber`: A union type representing either a string or a number.
*   `Status`: A union type representing status states (`pending`, `active`, `inactive`).
*   `StudentWithCourse`: An intersection type combining `User` and course enrollment data.

### Part 2 Additions
*   `ApiResponse<T>`: A generic interface that wraps any API response data structure.
*   `getFirst<T>`: A generic function that retrieves the first element from any array.
*   `getById<T extends { id: number }>`: A generic function constrained to items containing a numeric `id`.
*   **Utility Type Uses**:
    *   `UserUpdate` (using `Partial<User>`): Makes all fields of `User` optional.
    *   `UserPreview` (using `Pick<User, "id" | "name" | "role">`): Includes only the specific ID, name, and role fields.
    *   `PublicUser` (using `Omit<User, "email" | "isActive">`): Excludes email and activity status fields.
    *   `RoleCount` (using `Record<"student" | "admin" | "instructor", number>`): Maps user roles to numeric counts.
    *   `NewSubmission` (using `ReturnType<typeof makeSubmission>`): Resolves to the return shape of the `makeSubmission` function.
*   **Enums**:
    *   `SubmissionStatus` (Regular Enum): Models submission states (`Pending`, `Graded`, `Late`) supporting reverse-mapping.
    *   `Role` (Const Enum): Inlined at compile time for performance to represent user roles (`student`, `admin`, `instructor`).

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
