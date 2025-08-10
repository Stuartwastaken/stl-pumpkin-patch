import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Mini Fall",
    price: "$25",
    description: "Perfect for small spaces or apartments",
    features: [
      "3 small decorative pumpkins",
      "Fall leaves arrangement",
      "Doorstep delivery",
      "Basic styling"
    ],
    popular: false,
    color: "border-muted"
  },
  {
    name: "Classic Harvest",
    price: "$45",
    description: "Our most popular choice for front porches",
    features: [
      "5 mixed-size pumpkins",
      "Seasonal gourd variety",
      "Autumn leaf scatter",
      "Professional arrangement",
      "2 decorative hay bales"
    ],
    popular: true,
    color: "border-primary"
  },
  {
    name: "Premium Autumn",
    price: "$65",
    description: "Maximum impact for your fall display",
    features: [
      "8 varied pumpkins & gourds",
      "Decorative corn stalks",
      "Premium mums (seasonal)",
      "Custom porch styling",
      "Fall wreath included",
      "Photo documentation"
    ],
    popular: false,
    color: "border-secondary"
  },
  {
    name: "Thanksgiving Special",
    price: "$85",
    description: "Complete holiday transformation",
    features: [
      "12+ pumpkins all sizes",
      "Corn stalks & wheat bundles",
      "Seasonal flower arrangements",
      "Custom centerpiece creation",
      "Turkey day styling",
      "Cleanup after holiday"
    ],
    popular: false,
    color: "border-accent"
  },
  {
    name: "Business Display",
    price: "$120",
    description: "Professional fall displays for businesses",
    features: [
      "20+ premium pumpkins",
      "Large corn stalk bundles",
      "Professional design consultation",
      "Weekly maintenance visits",
      "Seasonal refresh service",
      "Commercial styling"
    ],
    popular: false,
    color: "border-muted"
  }
];

const Packages = () => {
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
              key={pkg.name} 
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
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${pkg.popular ? 'gradient-primary text-white' : ''} hover-glow transition-smooth`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Order {pkg.name}
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