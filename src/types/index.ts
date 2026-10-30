// ===== ROLE =====
export const Role = {
  Student: "student",
  SecurityAdmin: "security_admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

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
  category?: string;
  status?: "lost" | "found" | "claimed";
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

// ===== CLAIM STATUS =====
// Regular enum replaced with const object (erasableSyntaxOnly compliance)
export const ClaimStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
  Resolved: 3,
} as const;

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus];

// ===== SESSION 10: Derived types matching the real API =====
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
  score?: number;
}

export type ApiSubmission = Omit<
  Submission,
  "id" | "studentId" | "submittedAt"
> & {
  id: string; // 24 hex characters, from MongoDB's _id
  studentId: string; // the owner's _id, also 24 hex characters
  submittedAt: string; // an ISO string, never a Date object
};

export type NewSubmission = Pick<Submission, "courseCode" | "repoUrl">;

export type ApiUser = Omit<User, "id"> & {
  id: string;
};

export interface AuthReply {
  token: string;
  user: ApiUser;
}

export type ApiLostFoundItem = Omit<
  LostFoundItem,
  "id" | "reportedBy" | "reportedAt"
> & {
  id: string;
  reportedBy?: string;
  reportedAt: string; // ISO string over the wire
};

export type NewLostFoundItem = Pick<
  LostFoundItem,
  "title" | "description" | "type" | "location"
> & {
  category?: string;
  status?: "lost" | "found" | "claimed";
  reportedAt?: string;
  reportedBy?: number | string;
};

export type ApiClaim = Omit<Claim, "id" | "claimedAt" | "verifiedAt"> & {
  id: string;
  claimedAt: string; // ISO string over the wire
  verifiedAt?: string;
};

export type NewClaim = Omit<ApiClaim, "id">;

// ===== GT5: AI reply type =====
// Must match the ReplySchema in itelect4-backend/src/routes/ai.ts exactly.
export type AiUrgency = "low" | "medium" | "high";

export interface AiReply {
  summary: string;
  urgencyLevel: AiUrgency;
  suggestedCategories: string[];
  nextSteps: string[];
  encouragement: string;
}