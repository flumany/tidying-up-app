
import React from 'react';
import { Category } from '../types';
import CategoryIcon from './CategoryIcon';

interface IconSelectorProps {
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
  className?: string;
}

const categoryLabels: Record<Category, string> = {
  clothing: '衣類',
  documents: '書類',
  tools: '工具',
  seasonal: '季節物',
  books: '本',
  electronics: '電子機器',
  kitchenware: '調理器具',
  cleaning: '清掃用品',
  toys: 'おもちゃ',
  sports: 'スポーツ用品',
  other: 'その他'
};

const IconSelector: React.FC<IconSelectorProps> = ({ 
  selectedCategory, 
  onCategorySelect, 
  className = "" 
}) => {
  const categories = Object.keys(categoryLabels) as Category[];

  return (
    <div className={`grid grid-cols-4 gap-3 ${className}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`flex flex-col items-center p-3 rounded-xl transition-smooth ${
            selectedCategory === category
              ? 'bg-primary/20 border-2 border-primary'
              : 'bg-card border border-border hover:bg-primary/5'
          }`}
        >
          <div className="w-10 h-10 flex items-center justify-center mb-2">
            <CategoryIcon category={category} size={24} />
          </div>
          <span className="text-xs text-center text-foreground font-medium">
            {categoryLabels[category]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default IconSelector;
