
import React from 'react';
import { 
  Shirt,
  FileText, 
  Settings, 
  Circle, 
  Book, 
  Search as Phone, 
  Home, 
  Circle as Cleaning, 
  Circle as Toys, 
  Circle as Sports,
  Box
} from 'lucide-react';
import { Category } from '../types';

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

const categoryIcons: Record<Category, any> = {
  clothing: Shirt,
  documents: FileText,
  tools: Settings,
  seasonal: Circle,
  books: Book,
  electronics: Phone,
  kitchenware: Home,
  cleaning: Cleaning,
  toys: Toys,
  sports: Sports,
  other: Box
};

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

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 24, 
  className = "" 
}) => {
  const IconComponent = categoryIcons[category] || categoryIcons.other;
  const color = categoryColors[category] || categoryColors.other;
  
  return (
    <IconComponent 
      size={size} 
      className={className}
      color={color}
    />
  );
};

export default CategoryIcon;
