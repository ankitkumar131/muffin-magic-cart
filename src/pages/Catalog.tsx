
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Product, Category } from "@/types/product";
import { productService } from "@/services";
import { Loader2 } from "lucide-react";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam || "all"
  );
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getAllProducts();
        setAllProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam, activeCategory]);

  useEffect(() => {
    const filterAndSortProducts = async () => {
      try {
        setLoading(true);
        let filtered;
        
        if (activeCategory === "all") {
          filtered = [...allProducts];
        } else {
          // If we already have all products, filter them locally
          if (allProducts.length > 0) {
            filtered = allProducts.filter(product => 
              product.category.includes(activeCategory as Category)
            );
          } else {
            // Otherwise fetch from API
            filtered = await productService.getProductsByCategory(activeCategory);
          }
        }

        // Apply sorting
        switch (sortOption) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "featured":
          default:
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        }

        setFilteredProducts(filtered);
      } catch (err) {
        console.error("Error filtering products:", err);
        setError("Failed to filter products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    filterAndSortProducts();
  }, [activeCategory, sortOption, allProducts]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  const categories: { value: string; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "cakes", label: "Cakes" },
    { value: "muffins", label: "Muffins" },
    { value: "pastries", label: "Pastries" },
    { value: "cupcakes", label: "Cupcakes" },
    { value: "cookies", label: "Cookies" },
    { value: "breads", label: "Breads" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-pacifico text-brand-darkBrown mb-4">
          Our Delicious Products
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of handcrafted cakes, muffins, pastries, and
          more. All made with love and the finest ingredients.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <Tabs
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-7">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="w-full md:w-64">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading products...</span>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-2">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try changing your filters or check back later for new items.
          </p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
