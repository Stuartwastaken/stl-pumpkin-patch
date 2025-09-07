import { Button } from "@/components/ui/button";
import heroImage from "@/assets/porch-main.jpg";

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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-primary text-white font-semibold px-8 py-4 text-lg hover-lift border-0 shadow-warm"
            onClick={scrollToPackages}
          >
            View Packages
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 text-lg transition-smooth"
            onClick={scrollToAbout}
          >
            Learn More
          </Button>
        </div>
        
    
      </div>
      
      {/* Floating pumpkin decoration */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-16 h-16 animate-float opacity-70">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Pumpkin body */}
            <ellipse cx="50" cy="60" rx="35" ry="30" fill="#cc4a1a" />
            {/* Happy face */}
            <circle cx="42" cy="52" r="3" fill="#2d1810" />
            <circle cx="58" cy="52" r="3" fill="#2d1810" />
            <path d="M38 65 Q50 75 62 65" stroke="#2d1810" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Pumpkin stem */}
            <rect x="47" y="25" width="6" height="15" rx="3" fill="#5a2d0c" />
            {/* Stem detail */}
            <ellipse cx="50" cy="27" rx="4" ry="2" fill="#6b3410" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;