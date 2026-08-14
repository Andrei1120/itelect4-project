import { Role, ClaimStatus } from '../types/index';
import type { User, LostFoundItem, Claim } from '../types/index';

export const allUsers: User[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: Role.Student, isActive: true },
  { id: 2, name: "Maria Clara", email: "maria@example.com", role: Role.Student, isActive: true }
];

export const allItems: LostFoundItem[] = [
  { id: 1, title: "Lost Wallet", description: "Black leather wallet", type: "lost", location: "Cafeteria", reportedAt: new Date(), reportedBy: 1 },
  { id: 2, title: "Found Keys", description: "Set of keys with red lanyard", type: "found", location: "Library", reportedAt: new Date(), reportedBy: 2 }
];

export const allClaims: Claim[] = [
  { id: 1, itemId: 1, claimerId: 2, status: ClaimStatus.Pending, claimedAt: new Date() }
];
