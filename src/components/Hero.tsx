import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-pumpkins.jpg";

const Hero = () => {
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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-primary text-white font-semibold px-8 py-4 text-lg hover-lift border-0 shadow-warm"
          >
            View Packages
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 text-lg transition-smooth"
          >
            Learn More
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
            <span className="text-sm font-medium">Same-Day Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
            <span className="text-sm font-medium">Locally Sourced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
            <span className="text-sm font-medium">College Entrepreneur</span>
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