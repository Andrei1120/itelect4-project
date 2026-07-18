# ITELECT4 - Campus Lost & Found Tracker (GT1 - Part 2)

This is a TypeScript console application developed for **IT Elective 4** at De La Salle Lipa.

## Project Concept
The **Campus Lost & Found Tracker** is a system designed to help students, staff, and security personnel report and claim lost or found items on campus. 
*   **Users** (Students or Security Admins) can log reports.
*   **Lost/Found Items** are posted with descriptions, types (lost/found), and locations.
*   **Claims** are submitted by users to retrieve found items and verified by security admins.

## Core Entities & Types Defined
This project defines the following types and interfaces in [types/index.ts](file:///c:/Users/alist/Downloads/itelect4-project/itelect4-project/types/index.ts):

### Core Entities
*   `User`: Represents a campus member with roles defined by the `Role` enum (`student` or `security_admin`).
*   `LostFoundItem`: Represents an item reported on campus.
*   `Claim`: Represents an item claim, tracking the lifecycle status via the `ClaimStatus` enum.

### Auxiliary Types & Unions
*   `ID`: A union type representing a unique identifier (string or number).
*   `Coordinate`: An object type defining geographical latitude/longitude coordinates.
*   `DateFormatter`: A function signature type for formatting dates.
*   `StringOrNumber`: A union type representing either a string or a number.
*   `UserStatus`: A literal union representing account status states (`active`, `suspended`, `inactive`).
*   `ItemWithReporter`: An intersection type combining `LostFoundItem` and its reporting `User` details.

### Generics
*   `ApiResponse<T>`: A generic interface that wraps response metadata and dynamic payload data (`T`).
*   `getFirst<T>` (defined in `src/index.ts`): A generic function to safely retrieve the first item of an array.
*   `getById<T extends { id: number }>` (defined in `src/index.ts`): A constrained generic function to search objects containing a numeric `id`.

### Utility Types
*   `UserUpdate` (using `Partial<User>`): Allows updating a subset of User profile properties.
*   `ItemPreview` (using `Pick<LostFoundItem, "id" | "title" | "type" | "location">`): Captures brief list-view data of items.
*   `PublicClaim` (using `Omit<Claim, "verifiedBy">`): Excludes sensitive admin verification identifiers for public view.
*   `RoleCount` (using `Record<"student" | "security_admin", number>`): Maps user roles to numeric database counts.
*   `NewClaim` (using `ReturnType<typeof makeClaim>`): Infers the return type of a claim-creation handler.

### Enums
*   `ClaimStatus` (Regular Enum): Represents the claim lifecycle stages (`Pending`, `Approved`, `Rejected`, `Resolved`) with support for reverse-mapping.
*   `Role` (Const Enum): Inlined at compile time representing user roles (`student`, `security_admin`) with zero runtime overhead.

## Getting Started

### Installation
Ensure you have [Node.js](https://nodejs.org/) installed. Clone the repository and install dependencies:
```bash
npm install
```

### Running the Project
To execute the application and see the console output demonstrating all tracker features, run:
```bash
npx ts-node src/index.ts
```

To run the sample script:
```bash
npx ts-node src/sample.ts
```

### Type Checking
To run the TypeScript compiler in dry-run mode and check for errors:
```bash
npx tsc --noEmit
```
