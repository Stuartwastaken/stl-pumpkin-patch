import { Leaf, Truck, Heart } from "lucide-react";
import deliveryImage from "@/assets/delivery-scene.jpg";

const About = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Your Local Fall 
            <span className="text-primary"> Partner</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Hi! I'm a college entrepreneur passionate about bringing the beauty of autumn 
            to your doorstep. Every pumpkin is hand-selected from local Saint Louis area farms, 
            ensuring you get the freshest, most beautiful pumpkins for your fall decorations.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Locally Sourced</h3>
                <p className="text-muted-foreground">
                  Hand-picked from trusted farms in the Saint Louis region, 
                  supporting local agriculture and ensuring peak freshness.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hassle-Free Delivery</h3>
                <p className="text-muted-foreground">
                  I bring the pumpkins straight to your door and can even arrange them 
                  on your porch. No driving, no heavy lifting - just enjoy the results!
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Touch</h3>
                <p className="text-muted-foreground">
                  As a college student building this business, every delivery gets my 
                  personal attention. Your satisfaction is my success!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="animate-scale-in">
          <div className="relative">
            <img 
              src={deliveryImage} 
              alt="Fall pumpkin delivery" 
              className="w-full h-[500px] object-cover rounded-2xl shadow-warm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;