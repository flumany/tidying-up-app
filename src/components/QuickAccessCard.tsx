
import React from 'react';
import { Item } from '../types';
import CategoryIcon from './CategoryIcon';

interface QuickAccessCardProps {
  title: string;
  items: Item[];
  onItemClick: (item: Item) => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, items, onItemClick }) => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {items.slice(0, 3).map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-smooth text-left"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              {item.images[0] ? (
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
              ) : (
                <CategoryIcon 
                  category={item.category as any} 
                  size={24} 
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.location}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCard;
