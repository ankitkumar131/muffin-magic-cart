
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
