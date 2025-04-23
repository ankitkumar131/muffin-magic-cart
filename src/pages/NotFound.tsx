
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cake } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="mb-8">
        <Cake size={120} className="text-primary/30" />
      </div>
      <h1 className="text-5xl font-pacifico text-brand-darkBrown mb-4">Oops!</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        We can't seem to find the page you're looking for. The page might have been
        moved or doesn't exist.
      </p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link to="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
