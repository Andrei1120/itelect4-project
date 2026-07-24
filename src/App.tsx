import React from 'react';
import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import { Role, ClaimStatus } from './types/index';
import type { User, LostFoundItem, Claim } from './types/index';

const student: User = {
  id: 1, 
  name: "Juan dela Cruz", 
  email: "juan@example.com",
  role: Role.Student, 
  isActive: true,
};

const item: LostFoundItem = {
  id: 1,
  title: "Lost Wallet",
  description: "Black leather wallet",
  type: "lost",
  location: "Cafeteria",
  reportedAt: new Date(),
  reportedBy: 1
};

const claim: Claim = {
  id: 1,
  itemId: 1,
  claimerId: 2,
  status: ClaimStatus.Pending,
  claimedAt: new Date()
};

function App() {
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Note:", e.target.value);
  };

  return (
    <div className="app">
      <h1>ITELECT4 - GT2 Part 1</h1>
      <input onChange={handleNoteChange} placeholder="Quick note (demo only)" />
      
      <UserCard 
        user={student} 
        onSelect={(u) => console.log("Selected user:", u)} 
      />
      
      <ItemCard item={item} />
      
      <ClaimBadge claim={claim}>
        <p>Awaiting verification</p>
      </ClaimBadge>
    </div>
  );
}

export default App;
