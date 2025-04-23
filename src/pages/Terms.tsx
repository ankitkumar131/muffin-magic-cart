
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="h-8 w-8 text-brand-peach" />
          <h1 className="text-4xl text-brand-darkBrown">Terms & Conditions</h1>
        </div>

        <div className="prose prose-lg">
          <p className="text-brand-brown mb-6">
            Welcome to ThreeMuffins. By accessing and using our website, you agree to these terms and conditions.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">1. Use of Website</h2>
          <p className="text-brand-brown mb-6">
            You agree to use our website for lawful purposes only and in a way that does not infringe upon 
            the rights of others or restrict their use of the website.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">2. Product Information</h2>
          <p className="text-brand-brown mb-6">
            We strive to display accurate product information, including prices and availability. 
            However, we reserve the right to modify this information without notice.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">3. Ordering & Payment</h2>
          <p className="text-brand-brown mb-6">
            By placing an order, you agree to provide accurate personal and payment information. 
            All payments are processed securely, and we do not store credit card information.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">4. Delivery & Pickup</h2>
          <p className="text-brand-brown mb-6">
            Delivery times are estimates only. We are not responsible for delays beyond our control. 
            Orders must be picked up at the scheduled time for store pickup.
          </p>

          <h2 className="text-2xl text-brand-darkBrown mt-8 mb-4">5. Privacy Policy</h2>
          <p className="text-brand-brown mb-6">
            Your privacy is important to us. Please review our Privacy Policy to understand how we 
            collect, use, and protect your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
