import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Cake, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const DirectSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreed) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    setLoading(true);

    try {
      // Direct approach like in debug form
      console.log('Sending signup request with data:', {
        fullname: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Step 1: Register the user directly with the backend
      const registerResponse = await axios.post('http://localhost:5000/api/user/add', {
        fullname: formData.name, // Important: using lowercase 'n' to match backend
        email: formData.email,
        password: formData.password,
        userRole: 'USER'
      });
      
      console.log('Registration successful:', registerResponse.data);
      
      // Step 2: Login the user after successful registration
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful:', loginResponse.data);
      
      // Store token and user data
      const userData = loginResponse.data.data;
      localStorage.setItem('threemuffinsToken', userData.token);
      localStorage.setItem('threemuffinsUser', JSON.stringify({
        id: userData.user._id,
        name: userData.user.fullName,
        email: userData.user.email,
        isAdmin: userData.user.userRole === 'ADMIN'
      }));
      
      toast({
        title: "Welcome to ThreeMuffins!",
        description: `Your account has been created successfully, ${formData.name}!`,
      });
      
      // Redirect to home page
      navigate("/");
      window.location.reload(); // Ensure the auth state is refreshed
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || "Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex mb-4">
            <Cake size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-pacifico text-brand-darkBrown">
            Create an Account
          </h1>
          <p className="text-muted-foreground mt-2">
            Join ThreeMuffins and start ordering delicious treats
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign Up (Direct Method)</CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
                
                {error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DirectSignup;
