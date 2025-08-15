import { MapPin, Clock } from "lucide-react";

const ServiceArea = () => {
  const areas = [
    "St Charles",
    "St Peters",
    "O'Fallon",
    "Fenton",
    "Lake St Louis",
    "St Charles County",
    "Clayton", 
    "University City",
    "Webster Groves",
    "Kirkwood",
    "Richmond Heights",
    "Brentwood",
    "Maplewood",
    "Shrewsbury",
    "Crestwood",
    "Affton",
    "Sunset Hills"
  ];

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Delivery <span className="text-primary">Areas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Currently serving Saint Louis and surrounding communities. 
            Don't see your area? Reach out - I'm always looking to expand!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Service Areas */}
          <div className="animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-2xl font-semibold text-foreground">Current Service Areas</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <div 
                  key={area}
                  className="bg-background p-3 rounded-lg border border-border hover-lift cursor-pointer"
                >
                  <span className="text-foreground font-medium">{area}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                <strong>Delivery Range:</strong> Typically 15-20 miles from Washington University area. 
                Contact me for specific address confirmation.
              </p>
            </div>
          </div>
          
          {/* Delivery Information */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-2xl font-semibold text-foreground">Delivery Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-lg border border-border">
                <h4 className="font-semibold text-lg mb-3 text-foreground">Scheduling</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Same-week delivery available </li>
                  <li>• Weekend deliveries available </li>
                  <li>• Flexible timing to fit your schedule (if requested)</li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border">
                <h4 className="font-semibold text-lg mb-3 text-foreground">Payment Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-foreground">Venmo (@STLPumpkins)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-foreground">Cash or Check on delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Payment due after delivery and setup completion or 10% discount for Venmo pre-payment
                  </p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border">
                <h4 className="font-semibold text-lg mb-3 text-foreground">What's Included</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Fresh pumpkin selection</li>
                  <li>• Professional arrangement</li>
                  <li>• Money back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;