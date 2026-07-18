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

import { Role } from "../types/index";
import type { User, LostFoundItem, Claim } from "../types/index";

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: Role.Student,
  isActive: true,
};

const item: LostFoundItem = {
  id: 101,
  title: "iPhone 15 Pro",
  description: "Space Gray, found near the library.",
  type: "found",
  location: "College Library",
  reportedAt: new Date(),
  reportedBy: 2, // Admin ID
};

console.log("User entity:", student);
console.log("Lost/Found Item entity:", item);

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

// ===== GENERIC FUNCTIONS =====
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic -- T must have an "id: number" field
function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// [student] is an array containing one element
const firstUser = getFirst<User>([student]);
const foundUser = getById<User>([student], 1);
console.log("firstUser name:", firstUser?.name); // Juan dela Cruz
console.log("foundUser email:", foundUser?.email); // juan@example.com

// ===== GENERIC INTERFACE =====
import type { ApiResponse } from "../types/index";
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};
const itemResponse: ApiResponse<LostFoundItem[]> = {
  success: true,
  data: [item],
};
console.log("ApiResponse user name:", userResponse.data.name); // Juan dela Cruz

// ===== USING UTILITY TYPES =====
import { UserUpdate, ItemPreview, PublicClaim, RoleCount } from "../types/index";
// Partial<T> -- update payload only needs the changed fields
const patch: UserUpdate = { name: "Juan D. Cruz" };
// Pick<T,K> -- a lightweight preview object
const preview: ItemPreview = { id: 101, title: "iPhone 15 Pro", type: "found", location: "College Library" };
// Omit<T,K> -- safe to expose publicly (no email, no isActive)
const publicProfile: PublicClaim = { id: 1, itemId: 101, claimerId: 1, status: 0, claimedAt: new Date() };
// Record<K,T> -- dashboard-style counts
const roleCount: RoleCount = { student: 45, security_admin: 2 };

// ===== ReturnType<T> =====
function makeClaim(itemId: number, claimerId: number) {
  return { id: 1, itemId, claimerId, status: 0, claimedAt: new Date() };
}
// Infer the shape directly from the function -- no need to redeclare it
type NewClaim = ReturnType<typeof makeClaim>;
const gt1Claim: NewClaim = makeClaim(101, 1);

// ===== USING ENUMS =====
import { ClaimStatus } from "../types/index";
let status: ClaimStatus = ClaimStatus.Pending;
console.log("ClaimStatus reverse mapping:", ClaimStatus[status]); // "Pending" -- reverse mapping
status = ClaimStatus.Approved;
console.log("Is status Approved?:", status === ClaimStatus.Approved); // true
const currentRole: Role = Role.Student;
console.log("Current role value:", currentRole); // "student"