# Lost and Found System

A campus Lost and Found management system built with React and TypeScript, allowing students and security admins to report lost or found items, manage claims, and verify item ownership securely.

## Interfaces and Types Defined

The following core interfaces and utility types form the foundation of our data model:

- **`User`**: Represents a system user, containing their role and active status.
- **`LostFoundItem`**: Represents an item that has been reported lost or found, including its location and reporting details.
- **`Claim`**: Represents a claim made by a user on a specific item, tracking its verification status.
- **`Role`**: Enum defining user roles (`Student`, `SecurityAdmin`).
- **`ClaimStatus`**: Enum for the lifecycle of a claim (`Pending`, `Approved`, `Rejected`, `Resolved`).
- **Utility Types**: Includes `ApiResponse<T>`, `UserUpdate`, `ItemPreview`, `PublicClaim`, `RoleCount`, and `ItemWithReporter`.

## How to Install and Run

First, install the project dependencies:
```bash
npm install
```

To run the React development server:
```bash
npm run dev
```

*(Note: If you need to execute standalone TypeScript files from earlier stages, you can use `npx ts-node src/sample.ts` or `src/index.ts` if applicable).*
