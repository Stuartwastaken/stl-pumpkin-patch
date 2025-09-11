import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, ArrowLeft, Package, Truck, Settings, Phone, ShoppingCart, CheckCircle, AlertCircle, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { getPackageById } from "@/data/packages";
import PackageConfiguration, { PackageConfig } from "@/components/PackageConfiguration";
import { sendOrderEmail, OrderSubmission } from "@/services/emailService";
import OrderSummary from "@/components/OrderSummary";
import { Helmet } from "react-helmet-async";
import { getPackageSeo } from "@/config/seo";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");
  const [packageConfig, setPackageConfig] = useState<PackageConfig | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Ref for scrolling to tabs section
  const tabsRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts or packageId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [packageId]);

  // Image modal functions
  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    const pkg = getPackageById(packageId!);
    if (pkg?.images && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % pkg.images.length);
    }
  };

  const prevImage = () => {
    const pkg = getPackageById(packageId!);
    if (pkg?.images && selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? pkg.images.length - 1 : selectedImageIndex - 1);
    }
  };

  // Add keyboard event listener for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImageModalOpen) return;
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, selectedImageIndex]);

  // Helper function to scroll to tabs section
  const scrollToTabs = () => {
    setTimeout(() => {
      if (tabsRef.current) {
        tabsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };
  
  const pkg = getPackageById(packageId!);
  const seo = getPackageSeo(packageId!);
  
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
        // Track GA4 lead form submission
        try {
          const pkgId = packageId || pkg.id;
          const totalPrice = orderSubmission.totalPrice;
          const paymentMethod = packageConfig.paymentMethod;
          const { trackLeadFormSubmit } = await import("@/lib/analytics");
          trackLeadFormSubmit({
            packageId: pkgId,
            packageName: pkg.name,
            totalPrice: typeof totalPrice === 'number' ? totalPrice : Number(totalPrice),
            paymentMethod: paymentMethod,
          });
        } catch (e) {
          console.warn('GA tracking failed or not available', e);
        }
        setSubmissionStatus('success');
        setCurrentTab('overview'); // Switch back to overview tab
        // Scroll to top to show success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        setSubmissionStatus('error');
        // Scroll to top to show error message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmissionStatus('error');
      // Scroll to top to show error message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderPackage = () => {
    // If on overview tab, switch to configure tab
    // If on configure tab and form is valid, submit the order
    if (currentTab === 'overview') {
      setCurrentTab('configure');
      // Scroll to tabs section when switching to configure tab
      scrollToTabs();
    } else {
      handleOrderSubmission();
    }
  };

  return (
    <>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.ogImage} />
          <meta property="og:url" content={seo.canonical} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.ogImage} />
          <link rel="canonical" href={seo.canonical} />
          <script type="application/ld+json">
            {JSON.stringify(seo.structuredData)}
          </script>
        </Helmet>
      )}
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
          {/* Success State - Show only when order is successfully submitted */}
          {submissionStatus === 'success' ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Package Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                    {pkg.name}
                  </h1>
                  {pkg.popular && (
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground">{pkg.description}</p>
              </div>

              {/* Success Alert */}
              <Alert className="border-green-200 bg-green-50 p-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <AlertDescription className="text-green-800 ml-2">
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">🎉 Order submitted successfully!</div>
                    <p className="text-base">
                      We've received your pumpkin delivery order and will contact you within 24 hours to confirm details and schedule your delivery.
                    </p>
                    <p className="text-sm">
                      Thank you for choosing STL Pumpkin Patch! We can't wait to help make your fall display amazing.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Order Summary for Reference */}
              {packageConfig && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Your Order Summary
                    </CardTitle>
                    <CardDescription>Reference details for your pumpkin delivery order</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Package Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Package:</span> {pkg.name}</p>
                          {packageConfig.selectedCollection && (
                            <p><span className="text-muted-foreground">Collection:</span> {packageConfig.selectedCollection}</p>
                          )}
                          <p><span className="text-muted-foreground">Payment:</span> {packageConfig.paymentMethod === 'venmo' ? 'Venmo Prepay (10% discount)' : 'Pay on Delivery'}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Delivery Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Week:</span> {packageConfig.deliveryDate}</p>
                          <p><span className="text-muted-foreground">Address:</span> {packageConfig.deliveryAddress.street}</p>
                          <p className="text-muted-foreground">{packageConfig.deliveryAddress.city}, {packageConfig.deliveryAddress.state} {packageConfig.deliveryAddress.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Call to Action */}
              <div className="text-center pt-6">
                <Button onClick={() => navigate('/')} size="lg" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse More Packages
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    setSubmissionStatus('idle');
                    setCurrentTab('overview');
                  }}
                >
                  Place Another Order
                </Button>
              </div>
            </div>
          ) : (
            // Normal ordering flow when not in success state
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
              {/* Package Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                    {pkg.name}
                  </h1>
                  {pkg.popular && (
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {pkg.includes_delivery && (
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">Delivery included</span>
                  )}
                  {pkg.includes_setup ? (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Pro styling included</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">DIY styling</span>
                  )}
                </div>
                <p className="text-lg text-foreground leading-relaxed">{pkg.longDescription}</p>
              </div>

              {/* Package Image Gallery */}
              {pkg.images && pkg.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Package Examples
                    </CardTitle>
                    <CardDescription>
                      See examples of this package in action
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pkg.images.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative group overflow-hidden rounded-xl cursor-pointer"
                          onClick={() => openImageModal(index)}
                        >
                          <img 
                            src={image} 
                            alt={`${pkg.name} example ${index + 1}`}
                            className="w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tabbed Content */}
              <div ref={tabsRef}>
                <Tabs value={currentTab} onValueChange={(value) => {
                  setCurrentTab(value);
                  // Scroll to tabs section when manually switching tabs
                  scrollToTabs();
                }} className="w-full">
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
                      
                      {/* Disclaimer for Full Set Up packages only */}
                      {pkg.includes_setup && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg border-l-4 border-primary/30">
                          <p className="text-xs text-muted-foreground italic leading-relaxed">
                            <strong>Note:</strong> Pumpkins may be placed throughout your porch and steps to create that perfect layered fall look—some pumpkins may not be visible in photos, but they're all part of the magic.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="configure" className="mt-6">
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
            </div>

            {/* Sidebar - Order Card */}
            <div className="lg:col-span-1">
              <OrderSummary 
                package={pkg} 
                config={packageConfig} 
                onAction={handleOrderPackage}
                actionDisabled={currentTab === "configure" && (!isFormValid || isSubmitting)}
                isSubmitting={isSubmitting}
                currentTab={currentTab}
              />
            </div>
          </div>
          )}
        </div>

        {/* Image Modal/Lightbox */}
        {isImageModalOpen && selectedImageIndex !== null && pkg?.images && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeImageModal}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {pkg.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Image Container */}
            <div className="relative w-full max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={pkg.images[selectedImageIndex]}
                alt={`${pkg.name} example ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                loading="eager"
                onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
              />
              
              {/* Image Counter */}
              {pkg.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                    {selectedImageIndex + 1} of {pkg.images.length}
                  </div>
                </div>
              )}
            </div>


          </div>
        )}
      </div>
    </>
  );
};

export default PackageDetail; 