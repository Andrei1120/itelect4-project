export const enum Role {
  Student = "student",
  SecurityAdmin = "security_admin"
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface LostFoundItem {
  id: number;
  title: string;
  description: string;
  type: "lost" | "found";
  location: string;
  reportedAt: Date;
  reportedBy: number; // User ID
}

export interface Claim {
  id: number;
  itemId: number;
  claimerId: number;
  status: ClaimStatus;
  claimedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: number; // User ID
}

export type ID = number | string;

// Alias for location coordinates
export type Coordinate = {
  latitude: number;
  longitude: number;
};

// Alias for a date formatter
export type DateFormatter = (value: Date) => string;

// Union type
export type StringOrNumber = string | number;

// Literal union
export type UserStatus = "active" | "suspended" | "inactive";

// Intersection type: Item details combined with reporter's profile
export type ItemWithReporter = LostFoundItem & {
  reporter: User;
};

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;
// Pick<T, K> -- keep ONLY the listed fields
export type ItemPreview = Pick<LostFoundItem, "id" | "title" | "type" | "location">;
// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicClaim = Omit<Claim, "verifiedBy">;
// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"student" | "security_admin", number>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
  Resolved
}