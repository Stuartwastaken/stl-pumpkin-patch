import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, ArrowLeft, Package, Truck, Settings, Phone, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { getPackageById } from "@/data/packages";
import PackageConfiguration, { PackageConfig } from "@/components/PackageConfiguration";
import { sendOrderEmail, OrderSubmission } from "@/services/emailService";
import OrderSummary from "@/components/OrderSummary";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");
  const [packageConfig, setPackageConfig] = useState<PackageConfig | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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

  const handleConfigChange = (config: PackageConfig, valid: boolean) => {
    setPackageConfig(config);
    setIsFormValid(valid);
  };



  const handleOrderSubmission = async () => {
    if (!packageConfig || !isFormValid) {
      setSubmissionStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // Calculate final price for order submission
      const calculateFinalPrice = () => {
        const costs = {
          extraHayBales: 15,
          extraLargePumpkins: 12,
          extraMediumPumpkins: 8,
          extraSpecialtyPumpkins: 10
        };
        
        const addOnsCost = Object.entries(packageConfig.customizations).reduce((total, [key, qty]) => {
          return total + (costs[key as keyof typeof costs] * qty);
        }, 0);
        
        const baseTotal = pkg.priceValue + addOnsCost;
        return packageConfig.paymentMethod === 'venmo' ? baseTotal * 0.9 : baseTotal;
      };

      const orderSubmission: OrderSubmission = {
        package: pkg,
        config: packageConfig,
        totalPrice: calculateFinalPrice()
      };

      const success = await sendOrderEmail(orderSubmission);
      
      if (success) {
        setSubmissionStatus('success');
        setCurrentTab('overview'); // Switch back to overview tab
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderPackage = () => {
    // If on overview tab, switch to configure tab
    // If on configure tab and form is valid, submit the order
    if (currentTab === 'overview') {
      setCurrentTab('configure');
    } else {
      handleOrderSubmission();
    }
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
                {submissionStatus === 'success' && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Order submitted successfully!</strong> We've received your order and will contact you within 24 hours to confirm details and schedule delivery.
                    </AlertDescription>
                  </Alert>
                )}
                
                {submissionStatus === 'error' && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Order submission failed.</strong> Please check that all required fields are filled out correctly and try again. If the problem persists, please call us directly.
                    </AlertDescription>
                  </Alert>
                )}

                <PackageConfiguration 
                  package={pkg} 
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Order Card */}
          <div className="lg:col-span-1">
            <OrderSummary 
              package={pkg} 
              config={packageConfig} 
              isCompact={true}
              onAction={handleOrderPackage}
              actionDisabled={currentTab === "configure" && (!isFormValid || isSubmitting)}
              isSubmitting={isSubmitting}
              currentTab={currentTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail; 