import { Leaf, Truck, Heart } from "lucide-react";
import deliveryImage from "@/assets/delivery-scene.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Welcome to 
            <span className="text-primary"> STL Pumpkins Delivery!</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We're a small, local business born out of a love for fall, home styling, and supporting 
            the St. Louis area community. Our mission is simple: bring the beauty of fall straight 
            to your doorstep with hand-picked, farm-fresh pumpkins.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're looking for a quick DIY drop-off or a full-service styled setup, we take 
            pride in creating moments of joy through seasonal charm. Every pumpkin is sourced from 
            local farms and selected with care, and we're all about making your home feel festive, 
            warm, and uniquely you.
          </p>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
            <p className="text-lg text-foreground italic leading-relaxed text-center">
              "We believe fall is a feeling—so we're here to help you live in it."
            </p>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Thanks for supporting a local dream. Let's make your porch the coziest one on the block.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Farm Fresh</h3>
                <p className="text-muted-foreground">
                  Hand-picked from local St. Louis area farms and selected with care, 
                  supporting local agriculture while ensuring peak freshness.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Your Way</h3>
                <p className="text-muted-foreground">
                  Quick DIY drop-off or full-service Pinterest-worthy styled setup—
                  we take pride in creating moments of joy through seasonal charm.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-full">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Local Love</h3>
                <p className="text-muted-foreground">
                  Supporting the St. Louis community, local farms, and making your home 
                  feel festive, warm, and uniquely you.
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
      
      {/* Meet the Founder Section */}
      <div className="max-w-4xl mx-auto mt-20 px-4">
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Meet The <span className="text-primary">Founder</span>
          </h3>
        </div>
        
        <div className="bg-background border border-primary/20 rounded-2xl p-8 shadow-warm">
          <div className="space-y-6 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi! I'm <span className="font-semibold text-primary">Natalie</span>—a college student, 
              fall-obsessed, Pinterest-loving girly, and the creator of STL Pumpkin Delivery!
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              It all started with my love for decorating. People would ask where I got my pumpkins 
              and how I made it look so cute. So I thought… why not do it for others?
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              With a passion for fall vibes, supporting local farms, and spreading seasonal joy, 
              I turned that love into a small business that brings festive, Pinterest-worthy 
              porches right to your doorstep.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              When I'm not hauling pumpkins or styling setups, I'm probably studying, hanging with 
              family and friends, reading, or redecorating my room for the 100th time...
            </p>
            
            <p className="text-lg font-medium text-foreground">
              Thanks for being here and supporting local—it truly means the world. 💚
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;