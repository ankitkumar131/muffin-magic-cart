
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Chocolate Delight Cake",
    description: "Rich chocolate cake with chocolate ganache and fresh berries.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    category: ["cakes", "featured"],
    featured: true,
    ingredients: ["Flour", "Chocolate", "Sugar", "Eggs", "Butter"],
    nutrition: {
      calories: 350,
      fat: 18,
      carbs: 42,
      protein: 5,
    },
  },
  {
    id: "2",
    name: "Blueberry Muffins",
    description: "Soft muffins packed with fresh blueberries and a hint of lemon.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1607958996333-41784c70c366?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["muffins"],
    featured: false,
    ingredients: ["Flour", "Blueberries", "Sugar", "Eggs", "Butter"],
    nutrition: {
      calories: 220,
      fat: 9,
      carbs: 32,
      protein: 3,
    },
  },
  {
    id: "3",
    name: "Strawberry Shortcake",
    description: "Layers of vanilla sponge, fresh strawberries and cream.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["cakes", "featured"],
    featured: true,
    ingredients: ["Flour", "Strawberries", "Sugar", "Eggs", "Cream"],
    nutrition: {
      calories: 300,
      fat: 14,
      carbs: 36,
      protein: 4,
    },
  },
  {
    id: "4",
    name: "Croissant",
    description: "Buttery, flaky pastry perfect for breakfast.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["pastries"],
    featured: false,
    ingredients: ["Flour", "Butter", "Sugar", "Yeast"],
    nutrition: {
      calories: 260,
      fat: 14,
      carbs: 28,
      protein: 5,
    },
  },
  {
    id: "5",
    name: "Chocolate Chip Cookies",
    description: "Homemade cookies with chunks of chocolate in every bite.",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["cookies"],
    featured: false,
    ingredients: ["Flour", "Chocolate Chips", "Sugar", "Eggs", "Butter"],
    nutrition: {
      calories: 180,
      fat: 8,
      carbs: 24,
      protein: 2,
    },
  },
  {
    id: "6",
    name: "Red Velvet Cupcake",
    description: "Classic red velvet with cream cheese frosting.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["cupcakes", "featured"],
    featured: true,
    ingredients: ["Flour", "Cocoa", "Red Food Coloring", "Cream Cheese", "Butter"],
    nutrition: {
      calories: 320,
      fat: 16,
      carbs: 38,
      protein: 4,
    },
  },
  {
    id: "7",
    name: "Sourdough Bread",
    description: "Artisanal bread with a chewy interior and crispy crust.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1585478259715-4d3f5f213a1d?q=80&w=921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["breads"],
    featured: false,
    ingredients: ["Flour", "Water", "Salt", "Sourdough Starter"],
    nutrition: {
      calories: 120,
      fat: 0,
      carbs: 24,
      protein: 4,
    },
  },
  {
    id: "8",
    name: "Carrot Cake",
    description: "Moist cake with grated carrots, nuts, and cream cheese frosting.",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1567171466502-4e92481356b9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["cakes"],
    featured: false,
    ingredients: ["Flour", "Carrots", "Sugar", "Eggs", "Cream Cheese"],
    nutrition: {
      calories: 380,
      fat: 22,
      carbs: 42,
      protein: 6,
    },
  },
  {
    id: "9",
    name: "Chocolate Muffin",
    description: "Double chocolate muffins with chocolate chips.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1604413191066-4dd20bedf486?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["muffins"],
    featured: false,
    ingredients: ["Flour", "Cocoa", "Sugar", "Eggs", "Chocolate Chips"],
    nutrition: {
      calories: 280,
      fat: 12,
      carbs: 36,
      protein: 4,
    },
  },
  {
    id: "10",
    name: "Vanilla Birthday Cake",
    description: "Celebration cake with vanilla frosting and rainbow sprinkles.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["cakes", "featured"],
    featured: true,
    ingredients: ["Flour", "Vanilla Extract", "Sugar", "Eggs", "Butter", "Sprinkles"],
    nutrition: {
      calories: 370,
      fat: 18,
      carbs: 46,
      protein: 5,
    },
  },
  {
    id: "11",
    name: "Cinnamon Roll",
    description: "Soft, gooey rolls with cinnamon swirl and cream cheese glaze.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1606729352836-3a5e27fecb7f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["pastries", "featured"],
    featured: true,
    ingredients: ["Flour", "Cinnamon", "Sugar", "Butter", "Cream Cheese"],
    nutrition: {
      calories: 310,
      fat: 12,
      carbs: 48,
      protein: 5,
    },
  },
  {
    id: "12",
    name: "Lemon Tart",
    description: "Buttery pastry shell filled with tangy lemon curd.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1528252941458-c0b902f8d917?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["pastries"],
    featured: false,
    ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemons"],
    nutrition: {
      calories: 280,
      fat: 14,
      carbs: 34,
      protein: 4,
    },
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.includes(category as any));
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
