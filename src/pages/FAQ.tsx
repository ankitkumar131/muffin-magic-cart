
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="h-8 w-8 text-brand-peach" />
          <h1 className="text-4xl text-brand-darkBrown">Frequently Asked Questions</h1>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ordering">
            <AccordionTrigger>How do I place an order?</AccordionTrigger>
            <AccordionContent>
              Browse our catalog, select your desired items, and add them to your cart. 
              Proceed to checkout, where you can review your order and complete the payment process. 
              You'll receive an order confirmation email with all the details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery">
            <AccordionTrigger>What are your delivery options?</AccordionTrigger>
            <AccordionContent>
              We offer local delivery within a 15-mile radius of our bakery. 
              You can also choose to pick up your order at our store. 
              Delivery times and fees will be calculated at checkout.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dietary">
            <AccordionTrigger>Do you offer dietary alternatives?</AccordionTrigger>
            <AccordionContent>
              Yes! We offer gluten-free, vegan, and sugar-free options. 
              Each product in our catalog is clearly labeled with dietary information. 
              Please contact us for specific dietary requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="customization">
            <AccordionTrigger>Can I customize my order?</AccordionTrigger>
            <AccordionContent>
              Absolutely! We offer customization options for most of our products. 
              You can specify your requirements during the ordering process or 
              contact us directly for special requests.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cancellation">
            <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
            <AccordionContent>
              Orders can be cancelled up to 24 hours before the scheduled delivery/pickup time. 
              For custom orders, cancellation policies may vary. Please contact us for specific cases.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
