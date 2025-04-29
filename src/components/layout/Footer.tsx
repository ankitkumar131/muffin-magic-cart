
import { Link } from "react-router-dom";
import { Cake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Cake size={28} className="text-brand-peach" />
              <span className="text-xl font-pacifico text-brand-darkBrown">
                ThreeMuffins
              </span>
            </Link>
            <p className="mt-4 text-brand-brown text-sm">
              Delicious handcrafted cakes, muffins, and pastries baked with love.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalog?category=cakes"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=muffins"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Muffins
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=pastries"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Pastries
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=cupcakes"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Cupcakes
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-2">123 Bakery Street</p>
            <p className="text-sm mb-2">Caketown, CT 12345</p>
            <p className="text-sm mb-2">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: hello@threemuffins.com</p>
          </div>
        </div>

        <div className="border-t border-brand-brown/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-brand-brown">
            &copy; {new Date().getFullYear()} ThreeMuffins. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="#" className="text-sm hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm hover:text-primary">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
