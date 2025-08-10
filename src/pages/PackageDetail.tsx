import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ArrowLeft, Package, Truck, Settings, Phone, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { getPackageById } from "@/data/packages";
import PackageConfiguration, { PackageConfig } from "@/components/PackageConfiguration";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");
  const [packageConfig, setPackageConfig] = useState<PackageConfig | null>(null);
  
  const pkg = getPackageById(packageId!);
  
  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Package Not Found</CardTitle>
            <CardDescription>The package you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleOrderPackage = () => {
    // Scroll to contact section or open contact modal
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Breadcrumb Navigation */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Home
            </Button>
            <span>/</span>
            <span>Packages</span>
            <span>/</span>
            <span className="text-foreground font-medium">{pkg.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                  {pkg.name}
                </h1>
                {pkg.id === "premium-display" && (
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground">{pkg.description}</p>
              <p className="text-lg text-foreground leading-relaxed">{pkg.longDescription}</p>
            </div>

            {/* Tabbed Content */}
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Package Details
                </TabsTrigger>
                <TabsTrigger value="configure" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Configure & Order
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Package Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Service Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            {pkg.includes_delivery ? "Included" : "Not included"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Setup Service</p>
                          <p className="text-sm text-muted-foreground">
                            {pkg.includes_setup ? `Included (${pkg.setup_time})` : "DIY arrangement"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Space Requirements</p>
                      <p className="text-sm text-muted-foreground">{pkg.space_required}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="configure" className="mt-6">
                <PackageConfiguration 
                  package={pkg} 
                  onConfigChange={setPackageConfig}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Order Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {packageConfig 
                      ? `$${pkg.priceValue + (packageConfig.customizations ? 
                          Object.entries(packageConfig.customizations).reduce((total, [key, qty]) => {
                            const costs = { extraHayBales: 15, extraLargePumpkins: 12, extraMediumPumpkins: 8, extraSpecialtyPumpkins: 10 };
                            return total + (costs[key as keyof typeof costs] * qty);
                          }, 0) : 0)}`
                      : pkg.price
                    }
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base Package:</span>
                    <span className="font-semibold">{pkg.price}</span>
                  </div>
                  
                  {packageConfig && packageConfig.customizations && 
                   Object.values(packageConfig.customizations).some(qty => qty > 0) && (
                    <div className="flex justify-between">
                      <span>Add-ons:</span>
                      <span className="font-semibold text-primary">
                        +${Object.entries(packageConfig.customizations).reduce((total, [key, qty]) => {
                          const costs = { extraHayBales: 15, extraLargePumpkins: 12, extraMediumPumpkins: 8, extraSpecialtyPumpkins: 10 };
                          return total + (costs[key as keyof typeof costs] * qty);
                        }, 0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup Service:</span>
                    <span className={pkg.includes_setup ? "text-green-600" : "text-muted-foreground"}>
                      {pkg.includes_setup ? "Included" : "DIY"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  {currentTab === "overview" ? (
                    <Button 
                      className="w-full gradient-primary text-white hover-glow"
                      size="lg"
                      onClick={() => setCurrentTab("configure")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Configure & Order
                    </Button>
                  ) : (
                    <Button 
                      className="w-full gradient-primary text-white hover-glow"
                      size="lg"
                      onClick={handleOrderPackage}
                      disabled={!packageConfig?.contactInfo.name || !packageConfig?.contactInfo.phone}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Submit Order Request
                    </Button>
                  )}
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Payment via Venmo or cash after delivery. 
                    {pkg.includes_setup && " Setup included in price."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail; 