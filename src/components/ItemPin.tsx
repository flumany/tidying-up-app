
import React from 'react';
import { Item, Category } from '../types';

interface ItemPinProps {
  item: Item;
  onClick: (item: Item) => void;
  isAnimated?: boolean;
}

const categoryColors: Record<Category, string> = {
  clothing: '#FF6B9D',
  documents: '#4ECDC4',
  tools: '#45B7D1',
  seasonal: '#FFA726',
  books: '#AB47BC',
  electronics: '#66BB6A',
  kitchenware: '#EF5350',
  cleaning: '#42A5F5',
  toys: '#FF7043',
  sports: '#9CCC65',
  other: '#78909C'
};

const ItemPin: React.FC<ItemPinProps> = ({ item, onClick, isAnimated = false }) => {
  const color = categoryColors[item.category as Category] || categoryColors.other;
  
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-smooth hover:scale-110 ${
        isAnimated ? 'animate-pin-bounce' : ''
      }`}
      style={{
        left: `${item.coordinates.x}%`,
        top: `${item.coordinates.y}%`,
      }}
      onClick={() => onClick(item)}
    >
      <div
        className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-l-3 border-b-3 border-white"
        style={{ backgroundColor: color, marginTop: '28px' }}
      ></div>
    </div>
  );
};

export default ItemPin;
