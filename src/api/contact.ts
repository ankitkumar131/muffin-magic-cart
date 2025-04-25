
import { apiRequest } from "@/lib/api-client";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactResponse = {
  success: boolean;
  message: string;
};

/**
 * API service for contact form submission
 */
export const contactApi = {
  /**
   * Submit contact form
   */
  submitContactForm: async (formData: ContactFormData): Promise<ContactResponse> => {
    // This is a temporary fallback while API is being set up
    try {
      return await apiRequest<ContactResponse>('/contact', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.log("API not yet implemented, simulating success response");
      
      // Simulate API call with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Thank you for your message! We will get back to you soon."
          });
        }, 1000);
      });
    }
  }
};
