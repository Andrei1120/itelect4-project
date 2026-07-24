import React from 'react';
import type { User } from '../types/index';

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onSelect) {
      onSelect(user);
    }
  };

  return (
    <div className="user-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleClick}>Select User</button>
    </div>
  );
};

export default UserCard;
