
export interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  room: string;
  images: string[];
  description?: string;
  tags: string[];
  coordinates: {
    x: number;
    y: number;
  };
  lastAccessed: Date;
  createdAt: Date;
}

export interface Room {
  id: string;
  name: string;
  floor: number;
  storageAreas: StorageArea[];
}

export interface StorageArea {
  id: string;
  name: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  items: string[];
}

export interface FloorPlan {
  id: string;
  name: string;
  image: string;
  rooms: Room[];
  scale: number;
}

export type Category = 
  | 'clothing'
  | 'documents'
  | 'tools'
  | 'seasonal'
  | 'books'
  | 'electronics'
  | 'kitchenware'
  | 'cleaning'
  | 'toys'
  | 'sports'
  | 'other';
