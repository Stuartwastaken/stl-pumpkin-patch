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
  <div className="w-20 h-20 animate-float opacity-90">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        {/* Orange gradient for pumpkin */}
        <radialGradient id="pumpkinGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff7a29" />
          <stop offset="100%" stopColor="#cc4a1a" />
        </radialGradient>
        {/* Glow for face */}
        <radialGradient id="faceGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#ffd966" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Glow background */}
      <circle cx="50" cy="60" r="28" fill="url(#faceGlow)" />

      {/* Pumpkin body with ridges */}
      <ellipse cx="50" cy="60" rx="35" ry="30" fill="url(#pumpkinGradient)" />
      <ellipse cx="50" cy="60" rx="28" ry="29" fill="none" stroke="#a53710" strokeWidth="2" opacity="0.5" />
      <ellipse cx="50" cy="60" rx="20" ry="28" fill="none" stroke="#a53710" strokeWidth="2" opacity="0.5" />

      {/* Pumpkin stem (curved) */}
      <path d="M50 25 C48 15, 56 15, 54 25 Z" fill="#5a2d0c" stroke="#3d1c0a" strokeWidth="1" />
      <path d="M52 20 Q55 15, 58 18" stroke="#3d1c0a" strokeWidth="1" fill="none" />

      {/* Happy face */}
      <circle cx="42" cy="52" r="4" fill="#2d1810" />
      <circle cx="58" cy="52" r="4" fill="#2d1810" />
      <path d="M38 65 Q50 78 62 65" stroke="#2d1810" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Cheek highlights */}
      <circle cx="34" cy="58" r="3" fill="#ff9966" opacity="0.6" />
      <circle cx="66" cy="58" r="3" fill="#ff9966" opacity="0.6" />
    </svg>
  </div>
</div>

    </section>
  );
};

export default Hero;