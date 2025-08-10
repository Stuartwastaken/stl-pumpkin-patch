import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone } from "lucide-react";
import { Package } from "@/data/packages";
import { PackageConfig } from "./PackageConfiguration";

interface OrderSummaryProps {
  package: Package;
  config: PackageConfig | null;
  isCompact?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  actionDisabled?: boolean;
  isSubmitting?: boolean;
  currentTab?: string;
}

const OrderSummary = ({ 
  package: pkg, 
  config, 
  isCompact = false, 
  onAction, 
  actionLabel, 
  actionDisabled = false, 
  isSubmitting = false,
  currentTab = "overview"
}: OrderSummaryProps) => {
  const calculateExtraCost = (): number => {
    if (!config) return 0;
    
    const costs = {
      extraHayBales: 15,
      extraLargePumpkins: 12,
      extraMediumPumpkins: 8,
      extraSpecialtyPumpkins: 10
    };

    return Object.entries(config.customizations).reduce((total, [key, quantity]) => {
      return total + (costs[key as keyof typeof costs] * quantity);
    }, 0);
  };

  const getFullPrice = (): number => {
    return pkg.priceValue + calculateExtraCost();
  };

  const getDiscountedPrice = (): number => {
    const fullPrice = getFullPrice();
    return fullPrice * 0.9; // 10% discount
  };

  const getSavingsAmount = (): number => {
    return getFullPrice() - getDiscountedPrice();
  };

  const getFinalPrice = (): number => {
    return config?.paymentMethod === 'venmo' ? getDiscountedPrice() : getFullPrice();
  };

  const hasAddons = config && Object.values(config.customizations).some(qty => qty > 0);
  const isVenmoPayment = config?.paymentMethod === 'venmo';

  if (isCompact) {
    // Compact version for sidebar
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              ${getFinalPrice().toFixed(2)}
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
            
            {hasAddons && (
              <div className="flex justify-between">
                <span>Add-ons:</span>
                <span className="font-semibold text-primary">
                  +${calculateExtraCost().toFixed(2)}
                </span>
              </div>
            )}

            {isVenmoPayment && (
              <div className="flex justify-between">
                <span>Venmo Discount (10%):</span>
                <span className="font-semibold text-green-600">
                  -${getSavingsAmount().toFixed(2)}
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

          {config && (
            <>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Payment Method:</span>
                <span className={isVenmoPayment ? 'text-blue-600 font-medium' : 'text-foreground'}>
                  {isVenmoPayment ? 'Venmo Prepay' : 'Pay on Delivery'}
                </span>
              </div>
            </>
          )}

          {onAction && (
            <>
              <Separator />
              <div className="space-y-3">
                <Button 
                  className="w-full gradient-primary text-white hover-glow"
                  size="lg"
                  onClick={onAction}
                  disabled={actionDisabled}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : currentTab === "overview" ? (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Configure & Order
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Submit Order Request
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  {pkg.includes_setup ? "Setup service included" : "DIY arrangement"} • 
                  Delivery included • {isVenmoPayment ? 'Venmo @natalieptay' : 'Cash or Venmo on delivery'}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  // Full version for configuration section
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Base Package ({pkg.name}):</span>
          <span>${pkg.priceValue}</span>
        </div>
        
        {hasAddons && (
          <div className="flex justify-between text-sm">
            <span>Add-ons:</span>
            <span>+${calculateExtraCost().toFixed(2)}</span>
          </div>
        )}

        <Separator />
        
        {isVenmoPayment && (
          <div className="flex justify-between text-sm">
            <span>Venmo Discount (10%):</span>
            <span className="text-green-600 font-medium">-${getSavingsAmount().toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Price:</span>
          <div className="text-right">
            {isVenmoPayment ? (
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground line-through">
                  ${getFullPrice().toFixed(2)}
                </div>
                <div className="text-primary">
                  ${getFinalPrice().toFixed(2)}
                </div>
              </div>
            ) : (
              <span className="text-primary">${getFinalPrice().toFixed(2)}</span>
            )}
          </div>
        </div>

        {config && (
          <div className="flex justify-between text-sm mt-2">
            <span>Payment Method:</span>
            <span className={isVenmoPayment ? 'text-blue-600 font-medium' : 'text-foreground'}>
              {isVenmoPayment ? 'Venmo Prepay' : 'Pay on Delivery'}
            </span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          {pkg.includes_setup ? "Setup service included" : "DIY arrangement"} • 
          Delivery included • {isVenmoPayment ? 'Venmo @natalieptay' : 'Cash or Venmo on delivery'}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary; 