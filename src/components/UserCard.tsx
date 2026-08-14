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
    <div className="user-card border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 m-2 shadow-sm transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
      <p className="text-gray-600 dark:text-gray-400">Role: <span className="font-medium">{user.role}</span></p>
      <button 
        onClick={handleClick}
        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
      >
        Select User
      </button>
    </div>
  );
};

export default UserCard;
