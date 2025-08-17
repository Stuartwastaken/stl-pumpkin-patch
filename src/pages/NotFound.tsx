import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PumpkinSVG = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto mb-8 animate-pulse"
  >
    {/* Pumpkin body - main shape */}
    <ellipse cx="100" cy="120" rx="70" ry="55" fill="#FF6B35" />
    
    {/* Pumpkin ridges */}
    <path
      d="M 60 80 Q 100 85 140 80 Q 100 130 60 80"
      fill="#E55A2B"
    />
    <path
      d="M 70 85 Q 100 90 130 85 Q 100 135 70 85"
      fill="#FF7A45"
    />
    
    {/* Pumpkin stem */}
    <rect x="95" y="50" width="10" height="20" rx="5" fill="#4A5D23" />
    <ellipse cx="100" cy="55" rx="8" ry="4" fill="#6B8E23" />
    
    {/* Pumpkin face - sad/confused */}
    {/* Left eye */}
    <ellipse cx="80" cy="105" rx="8" ry="12" fill="#2D1810" />
    
    {/* Right eye */}
    <ellipse cx="120" cy="105" rx="8" ry="12" fill="#2D1810" />
    
    {/* Mouth - frown */}
    <path
      d="M 85 135 Q 100 125 115 135"
      stroke="#2D1810"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Question mark above pumpkin */}
    <text
      x="140"
      y="70"
      fontSize="24"
      fill="#FF6B35"
      fontWeight="bold"
      className="animate-bounce"
    >
      ?
    </text>
    
    {/* Leaves */}
    <path
      d="M 105 55 Q 120 45 125 55 Q 115 65 105 55"
      fill="#4A5D23"
    />
    <path
      d="M 95 55 Q 80 45 75 55 Q 85 65 95 55"
      fill="#4A5D23"
    />
  </svg>
);

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Custom Pumpkin SVG */}
        <PumpkinSVG />
        
        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-orange-600 mb-4 font-serif">
          404
        </h1>
        
        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! This pumpkin patch is empty
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like you've wandered off the beaten path! The page you're looking for 
          doesn't exist in our pumpkin patch. Let's get you back to where the magic happens.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
        
        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <p className="font-mono">Attempted route: {location.pathname}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
