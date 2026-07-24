import React from 'react';
import type { LostFoundItem } from '../types/index';

interface ItemCardProps {
  item: LostFoundItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="item-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      <p>Location: {item.location}</p>
      <p>Reported At: {item.reportedAt.toLocaleDateString()}</p>
    </div>
  );
};

export default ItemCard;
