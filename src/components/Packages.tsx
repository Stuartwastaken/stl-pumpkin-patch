import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { packages } from "@/data/packages";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

const Packages = () => {
  const navigate = useNavigate();
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const minPrice = Math.min(...packages.map((p) => p.priceValue));

  const handleViewPackage = (packageId: string) => {
    try {
      trackEvent('view_package_click', { package_id: packageId });
    } catch (e) {
      // analytics unavailable
    }
    navigate(`/packages/${packageId}`);
  };

  return (
    <section id="packages" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Fall Pumpkin <span className="text-primary">Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect package for your space. All packages include fresh, locally-sourced pumpkins 
            delivered to your door. Full Set Up packages include professional styling on-site, while DIY packages let you create your own arrangement.
          </p>
          <div className="mt-4">
            <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-sm">
              From ${minPrice}
            </Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`relative hover-lift transition-smooth ${pkg.color} ${pkg.popular ? 'ring-2 ring-primary/20' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <Badge className="absolute top-3 right-3 z-20 bg-primary text-primary-foreground shadow-md pointer-events-none">
                  Most Popular
                </Badge>
              )}
              
              {/* Package Image */}
              {pkg.images && pkg.images.length > 0 && (
                <div 
                  className="relative h-72 md:h-80 lg:h-96 overflow-hidden rounded-t-lg cursor-pointer"
                  onClick={() => handleViewPackage(pkg.id)}
                >
                  <img 
                    src={pkg.images[0]} 
                    alt={`${pkg.name} example`}
                    className="w-full h-full object-cover object-bottom hover:scale-105 transition-transform duration-300 select-none"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    draggable={false}
                    onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  {pkg.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 z-10 bg-black/60 text-white text-[10px] md:text-xs px-2 py-1 rounded">
                      +{pkg.images.length - 1} more
                    </div>
                  )}
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-foreground">{pkg.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  {pkg.includes_delivery && (
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">Delivery included</span>
                  )}
                  {pkg.includes_setup ? (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Pro styling included</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">DIY styling</span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-primary">From {pkg.price}</div>
                  <div className="text-sm mt-1">
                    <span className="text-muted-foreground">Prepay with Venmo:</span>{' '}
                    <span className="font-semibold text-green-600">
                      ${ (pkg.priceValue * 0.9).toFixed(2) }
                    </span>
                    <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      Save ${(pkg.priceValue - pkg.priceValue * 0.9).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div id={`features-${pkg.id}`} className="space-y-3">
                  {(expandedPackages[pkg.id] ? pkg.features : pkg.features.slice(0, 4)).map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                {pkg.features.length > 4 && (
                  <div>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 font-medium underline underline-offset-4 px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/30"
                      aria-expanded={!!expandedPackages[pkg.id]}
                      aria-controls={`features-${pkg.id}`}
                      onClick={() =>
                        setExpandedPackages((prev) => ({ ...prev, [pkg.id]: !prev[pkg.id] }))
                      }
                    >
                      {expandedPackages[pkg.id]
                        ? 'Show less'
                        : `+${pkg.features.length - 4} more items...`}
                    </button>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className={`w-full ${pkg.popular ? 'gradient-primary text-white' : ''} hover-glow transition-smooth`}
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => handleViewPackage(pkg.id)}
                >
                  View Details
                </Button>
                <div className="text-[11px] text-muted-foreground text-center">
                  No payment due today — reserve now, pay on delivery
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default Packages;