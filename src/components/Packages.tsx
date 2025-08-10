import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { packages } from "@/data/packages";

const Packages = () => {
  const navigate = useNavigate();

  const handleViewPackage = (packageId: string) => {
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
            and professional arrangement. Payment accepted via Venmo or cash after delivery.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`relative hover-lift transition-smooth ${pkg.color} ${pkg.popular ? 'ring-2 ring-primary/20' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-foreground">{pkg.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">{pkg.price}</div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {pkg.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <div className="text-sm text-muted-foreground">
                    +{pkg.features.length - 4} more items...
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
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 p-6 bg-card rounded-xl border shadow-warm animate-scale-in">
          <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground">Custom Packages Available</h3>
          <p className="text-muted-foreground mb-4">
            Need something different? I can create a custom package tailored to your specific needs and budget.
          </p>
          <Button variant="outline" className="hover-lift">
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;