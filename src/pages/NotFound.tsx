
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gaming-purple">404</h1>
        <p className="mb-6 text-xl text-foreground">
          Game Over! Page not found
        </p>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved to another realm.
        </p>
        <Link to="/">
          <Button className="bg-gaming-purple hover:bg-gaming-purple/90">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
