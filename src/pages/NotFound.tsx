
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-8">
        The page {location.pathname} does not exist.
      </p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
}
