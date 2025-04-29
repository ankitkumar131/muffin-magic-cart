
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquare className="h-8 w-8 text-brand-peach" />
          <h1 className="text-4xl text-brand-darkBrown">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl text-brand-darkBrown mb-4">Get in Touch</h2>
            <p className="text-brand-brown mb-6">
              Have questions about our products or services? We'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <p className="text-brand-brown">
                <strong>Address:</strong><br />
                123 Bakery Street<br />
                Caketown, CT 12345
              </p>
              
              <p className="text-brand-brown">
                <strong>Phone:</strong><br />
                (123) 456-7890
              </p>
              
              <p className="text-brand-brown">
                <strong>Email:</strong><br />
                hello@threemuffins.com
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-brown mb-1">
                  Name
                </label>
                <Input id="name" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-brown mb-1">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-brown mb-1">
                  Message
                </label>
                <Textarea id="message" required className="min-h-[120px]" />
              </div>

              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
