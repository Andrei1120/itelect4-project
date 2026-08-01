import { useState, useEffect } from 'react';
import { Role, ClaimStatus } from '../types/index';
import type { User, LostFoundItem, Claim } from '../types/index';

type MockData = {
  users: User[];
  items: LostFoundItem[];
  claims: Claim[];
};

// Custom hook 2: useMockData with explicit return type
export const useMockData = (): { data: MockData | null; isLoading: boolean } => {
  const [data, setData] = useState<MockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setData({
        users: [
          { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: Role.Student, isActive: true },
          { id: 2, name: "Maria Clara", email: "maria@example.com", role: Role.Student, isActive: true }
        ],
        items: [
          { id: 1, title: "Lost Wallet", description: "Black leather wallet", type: "lost", location: "Cafeteria", reportedAt: new Date(), reportedBy: 1 },
          { id: 2, title: "Found Keys", description: "Set of keys with red lanyard", type: "found", location: "Library", reportedAt: new Date(), reportedBy: 2 }
        ],
        claims: [
          { id: 1, itemId: 1, claimerId: 2, status: ClaimStatus.Pending, claimedAt: new Date() }
        ]
      });
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};
