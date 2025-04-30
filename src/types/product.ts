
export type Category = 
  | 'cakes'
  | 'muffins'
  | 'pastries'
  | 'cupcakes'
  | 'cookies'
  | 'breads'
  | 'featured';

export interface Product {
  id: string;
  productId: number;
  name: string;
  price: number;
  cardDescription: string;
  detailDescription: string;
  ingredients: string[];
  nutritionInfo?: {
    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;
  };
  image: string;
  category?: Category;
  featured?: boolean;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category[];
  featured: boolean;
  ingredients?: string[];
  nutrition?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
}
export interface Product {
  id: string;
  productId: number;
  name: string;
  price: number;
  cardDescription: string;
  detailDescription: string;
  ingredients: string[];
  nutritionInfo?: {
    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;
  };
  image: string;
  category?: Category;
}
