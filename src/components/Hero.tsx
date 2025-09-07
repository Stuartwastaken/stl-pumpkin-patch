import { Button } from "@/components/ui/button";
import heroImage from "@/assets/porch-main.jpg";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";

const Hero = () => {
  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          STL Pumpkins
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
          Locally Sourced • Freshly Delivered • Beautifully Arranged
        </p>
        <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto">
          Bringing fall magic to your doorstep across Saint Louis and surrounding areas. 
          No hassle, just beautiful porch pumpkins delivered fresh from local farms.
        </p>
        
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-primary text-white font-semibold px-8 py-4 text-lg hover-lift border-0 shadow-warm w-full sm:w-auto"
            onClick={scrollToPackages}
          >
            View Packages
          </Button>

          {/* Email Capture Form */}
          <div className="w-full max-w-md mx-auto mt-4">
            <p className="text-sm text-white/80 mb-2">
              Sign up for <strong>10% off</strong> your first order!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input 
                  type="email" 
                  placeholder="Enter your email for a discount" 
                  className="pl-10 w-full bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-primary"
                  aria-label="Email for discount"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-smooth"
              >
                Get Discount
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Floating pumpkin decoration */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-16 h-16 bg-primary rounded-full animate-float opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;