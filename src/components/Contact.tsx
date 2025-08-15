import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Order?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch to place your order or ask any questions. 
            I'm here to make your fall decorating effortless and beautiful!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Order Information */}
          <div className="animate-fade-in">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <CardTitle>How to Order</CardTitle>
                </div>
                <CardDescription>Simple 3-step process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Choose Your Package</h4>
                      <p className="text-sm text-muted-foreground">
                        Pick from our 5 packages or request a custom arrangement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Schedule Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Provide your address and preferred delivery time
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Enjoy Your Display</h4>
                      <p className="text-sm text-muted-foreground">
                        I'll deliver, and arrange. You just enjoy the results!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground font-medium">
                    💡 Pro Tip: Order early in the season for the best pumpkin selection!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center mt-12 animate-scale-in">
          <div className="bg-card p-8 rounded-2xl border shadow-warm">
            <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
              Questions? I'm Here to Help!
            </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Customer service is my top priority. 
              Don't hesitate to reach out with any questions about packages, timing, or custom arrangements.
            </p>
            
            {/* Email Contact Card */}
            <div className="max-w-md mx-auto">
              <Card className="hover-lift transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="w-6 h-6 text-primary" />
                    <CardTitle>Email for Questions</CardTitle>
                  </div>
                  <CardDescription className="text-center">For custom requests and inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full hover-glow" 
                    asChild
                  >
                    <a href="mailto:stlpumpkinsdelivery@gmail.com">
                      stlpumpkinsdelivery@gmail.com
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;