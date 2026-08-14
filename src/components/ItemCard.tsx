import React from 'react';
import type { LostFoundItem } from '../types/index';

interface ItemCardProps {
  item: LostFoundItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="item-card border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 m-2 shadow-sm transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">Type: <span className="font-medium">{item.type}</span></p>
      <p className="text-gray-600 dark:text-gray-400">Location: {item.location}</p>
      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Reported At: {item.reportedAt.toLocaleDateString()}</p>
    </div>
  );
};

export default ItemCard;
