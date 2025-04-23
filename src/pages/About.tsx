
import { Info } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Info className="h-8 w-8 text-brand-peach" />
          <h1 className="text-4xl text-brand-darkBrown">About Us</h1>
        </div>
        
        <div className="prose prose-lg">
          <p className="text-lg text-brand-brown mb-6">
            Welcome to ThreeMuffins, where passion for baking meets the art of creating memorable moments.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">Our Story</h2>
          <p className="text-brand-brown mb-6">
            Founded in 2020, ThreeMuffins started as a small family bakery with a simple mission: to bring joy through freshly baked goods. Our name comes from the three founding sisters who shared a love for baking muffins in their grandmother's kitchen.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">Our Promise</h2>
          <p className="text-brand-brown mb-6">
            Every item in our bakery is crafted with care using premium ingredients. We believe in maintaining the highest standards of quality while creating delicious treats that bring smiles to our customers' faces.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">Quality Ingredients</h2>
          <p className="text-brand-brown mb-6">
            We source our ingredients from local farmers and suppliers whenever possible. Our flour comes from premium mills, our eggs from free-range farms, and our fruits are always fresh and seasonal.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">Community First</h2>
          <p className="text-brand-brown mb-6">
            We're proud to be part of our local community. ThreeMuffins regularly participates in local events and supports various community initiatives through our baking programs.
          </p>
        </div>
      </div>
    </div>
  );
}
