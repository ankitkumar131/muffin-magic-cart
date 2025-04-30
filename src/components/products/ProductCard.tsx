
import { useState } from "react";
import { Product } from "@/types/product";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Add this import
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  CreditCard 
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/uploads/products/';

export default function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product: Product, quantity: number) => {
    // Add your cart logic here
    console.log('Added to cart:', product, quantity);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    // Add your buy now logic here
    console.log('Buy now:', product, quantity);
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath; // Use the full URL directly from the backend
  };

  const getMainCategory = () => {
    if (!product.category || product.category.length === 0) return 'All Products';
    return product.category[0].charAt(0).toUpperCase() + product.category[0].slice(1);
  };

  const category = getMainCategory();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
          <div className="p-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <img 
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                  (e.target as HTMLImageElement).alt = 'Product image not available';
                }}
              />
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.cardDescription}
              </p>
              <p className="font-semibold mt-1">₹{product.price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{category}</p>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl p-0 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <img 
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-4">
            <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
            
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>

            <div className="text-2xl font-bold text-primary">
              ₹{(product.price * quantity).toFixed(2)}
            </div>

            <p className="text-gray-600">{product.detailDescription}</p>

            {/* Quantity Selector */}
            <div className="py-4">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => handleAddToCart(product, quantity)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1"
                onClick={() => handleBuyNow(product, quantity)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>

            {/* Product Info */}
            <div className="pt-4 space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Nutrition Info</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Calories</span>
                    <span>{product.nutritionInfo?.calories || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fat</span>
                    <span>{product.nutritionInfo?.fat || 'N/A'}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Carbs</span>
                    <span>{product.nutritionInfo?.carbs || 'N/A'}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Protein</span>
                    <span>{product.nutritionInfo?.protein || 'N/A'}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
