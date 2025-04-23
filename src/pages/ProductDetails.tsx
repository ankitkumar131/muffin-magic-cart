
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Heart,
  Truck,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(productId || "");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/catalog")}>
          Return to Catalog
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to add items to your cart.",
      });
      navigate("/login", { state: { from: `/products/${product.id}` } });
      return;
    }

    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Get related products (same category)
  const relatedProducts = getProductsByCategory(product.category[0]).filter(
    (p) => p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        className="mb-8 flex items-center"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-pacifico text-brand-darkBrown mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="text-sm text-muted-foreground ml-1">(24 reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border border-input rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-2"
                disabled={quantity <= 1}
              >
                <MinusCircle className="w-4 h-4" />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Add to Wishlist
            </Button>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-start gap-3 mb-3">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Free shipping</p>
                <p className="text-sm text-muted-foreground">
                  For orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Fresh baked daily</p>
                <p className="text-sm text-muted-foreground">
                  Order today for delivery tomorrow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-pacifico text-brand-darkBrown mb-6">
          Product Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-muted-foreground mb-6">
              {product.description}
              {" "}Our products are baked fresh daily with high-quality ingredients to ensure
              the best taste and texture. Perfect for any occasion, from everyday treats to
              special celebrations.
            </p>
            
            <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
            <ul className="list-disc pl-5 mb-6 text-muted-foreground">
              {product.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="border-b pb-2 mb-2">
                <p className="font-medium">Calories</p>
                <p>{product.nutrition?.calories} kcal</p>
              </div>
              <div className="border-b pb-2 mb-2">
                <p className="font-medium">Fat</p>
                <p>{product.nutrition?.fat}g</p>
              </div>
              <div className="border-b pb-2 mb-2">
                <p className="font-medium">Carbohydrates</p>
                <p>{product.nutrition?.carbs}g</p>
              </div>
              <div>
                <p className="font-medium">Protein</p>
                <p>{product.nutrition?.protein}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-pacifico text-brand-darkBrown mb-6">
          You might also like
        </h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
