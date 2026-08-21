import { Role } from "../types/index";
import type { User } from "../types/index";

// allItems and allClaims are DELETED. They live in db.json now,
// and the app fetches them via TanStack Query instead of importing them.
//
// Users stay here for now until authentication and user endpoints are built in Module 4.
export const allUsers: User[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: Role.Student, isActive: true },
  { id: 2, name: "Maria Clara", email: "maria@example.com", role: Role.Student, isActive: true },
];
