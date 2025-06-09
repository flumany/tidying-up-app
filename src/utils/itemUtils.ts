
import { Item } from '../types';

export interface ItemWithExpiry extends Item {
  expiryDate?: Date;
  isImportant?: boolean;
  lastAccessAlert?: Date;
}

export const checkExpiringItems = (items: ItemWithExpiry[]): ItemWithExpiry[] => {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  return items.filter(item => 
    item.expiryDate && item.expiryDate <= thirtyDaysFromNow
  );
};

export const checkImportantItems = (items: ItemWithExpiry[]): ItemWithExpiry[] => {
  return items.filter(item => item.isImportant);
};

export const checkUnusedItems = (items: ItemWithExpiry[]): ItemWithExpiry[] => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  return items.filter(item => 
    item.lastAccessed < sixMonthsAgo && !item.isImportant
  );
};

export const updateItemLocation = (items: ItemWithExpiry[], itemId: string, newLocation: string, newRoom: string): ItemWithExpiry[] => {
  return items.map(item => 
    item.id === itemId 
      ? { ...item, location: newLocation, room: newRoom, lastAccessed: new Date() }
      : item
  );
};
