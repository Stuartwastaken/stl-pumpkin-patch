import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Calendar, MapPin, MessageSquare } from "lucide-react";
import { Package } from "@/data/packages";

interface PackageConfigurationProps {
  package: Package;
  onConfigChange: (config: PackageConfig) => void;
}

export interface PackageConfig {
  selectedCollection?: string;
  deliveryDate?: string;
  deliveryAddress: string;
  specialRequests: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  customizations: {
    extraHayBales: number;
    extraLargePumpkins: number;
    extraMediumPumpkins: number;
    extraSpecialtyPumpkins: number;
  };
}

const PackageConfiguration = ({ package: pkg, onConfigChange }: PackageConfigurationProps) => {
  const [config, setConfig] = useState<PackageConfig>({
    selectedCollection: pkg.collections?.[0]?.id || "",
    deliveryDate: "",
    deliveryAddress: "",
    specialRequests: "",
    contactInfo: {
      name: "",
      phone: "",
      email: ""
    },
    customizations: {
      extraHayBales: 0,
      extraLargePumpkins: 0,
      extraMediumPumpkins: 0,
      extraSpecialtyPumpkins: 0
    }
  });

  const updateConfig = (updates: Partial<PackageConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const updateCustomizations = (key: keyof PackageConfig['customizations'], value: number) => {
    const newCustomizations = { ...config.customizations, [key]: Math.max(0, value) };
    updateConfig({ customizations: newCustomizations });
  };

  const updateContactInfo = (key: keyof PackageConfig['contactInfo'], value: string) => {
    const newContactInfo = { ...config.contactInfo, [key]: value };
    updateConfig({ contactInfo: newContactInfo });
  };

  const calculateExtraCost = () => {
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

  const totalPrice = pkg.priceValue + calculateExtraCost();

  return (
    <div className="space-y-6">
      {/* Collection Selection for Specialty Collections */}
      {pkg.collections && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Collection Style</CardTitle>
            <CardDescription>Select which themed collection you'd prefer for your display</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pkg.collections.map((collection) => (
              <div 
                key={collection.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  config.selectedCollection === collection.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => updateConfig({ selectedCollection: collection.id })}
              >
                <div className="flex items-start gap-3">
                  <input 
                    type="radio" 
                    name="collection"
                    checked={config.selectedCollection === collection.id}
                    onChange={() => updateConfig({ selectedCollection: collection.id })}
                    className="mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">{collection.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Add-Ons and Customizations */}
      <Card>
        <CardHeader>
          <CardTitle>Customize Your Package</CardTitle>
          <CardDescription>Add extra items to enhance your display</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Extra Hay Bales (+$15 each)</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraHayBales', config.customizations.extraHayBales - 1)}
                  disabled={config.customizations.extraHayBales === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{config.customizations.extraHayBales}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraHayBales', config.customizations.extraHayBales + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Extra Large Pumpkins (+$12 each)</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraLargePumpkins', config.customizations.extraLargePumpkins - 1)}
                  disabled={config.customizations.extraLargePumpkins === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{config.customizations.extraLargePumpkins}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraLargePumpkins', config.customizations.extraLargePumpkins + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Extra Medium Pumpkins (+$8 each)</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraMediumPumpkins', config.customizations.extraMediumPumpkins - 1)}
                  disabled={config.customizations.extraMediumPumpkins === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{config.customizations.extraMediumPumpkins}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraMediumPumpkins', config.customizations.extraMediumPumpkins + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Extra Specialty Pumpkins (+$10 each)</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraSpecialtyPumpkins', config.customizations.extraSpecialtyPumpkins - 1)}
                  disabled={config.customizations.extraSpecialtyPumpkins === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{config.customizations.extraSpecialtyPumpkins}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateCustomizations('extraSpecialtyPumpkins', config.customizations.extraSpecialtyPumpkins + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {calculateExtraCost() > 0 && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Add-ons Total:</span>
                <Badge variant="outline" className="bg-primary/10">
                  +${calculateExtraCost()}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Delivery Details
          </CardTitle>
          <CardDescription>When and where should we deliver your pumpkins?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Preferred Delivery Date</Label>
            <Input 
              id="delivery-date"
              type="date"
              value={config.deliveryDate}
              onChange={(e) => updateConfig({ deliveryDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </Label>
            <Textarea 
              id="delivery-address"
              placeholder="Enter your full delivery address..."
              value={config.deliveryAddress}
              onChange={(e) => updateConfig({ deliveryAddress: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How can we reach you about your order?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name *</Label>
              <Input 
                id="contact-name"
                placeholder="Your full name"
                value={config.contactInfo.name}
                onChange={(e) => updateContactInfo('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number *</Label>
              <Input 
                id="contact-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={config.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address</Label>
            <Input 
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              value={config.contactInfo.email}
              onChange={(e) => updateContactInfo('email', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Special Requests
          </CardTitle>
          <CardDescription>Any special instructions or requests for your display?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Example: Please arrange pumpkins on left side of porch, avoid stepping on flower beds, call when arriving..."
            value={config.specialRequests}
            onChange={(e) => updateConfig({ specialRequests: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Base Package ({pkg.name}):</span>
            <span>${pkg.priceValue}</span>
          </div>
          
          {calculateExtraCost() > 0 && (
            <div className="flex justify-between text-sm">
              <span>Add-ons:</span>
              <span>+${calculateExtraCost()}</span>
            </div>
          )}

          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Price:</span>
            <span className="text-primary">${totalPrice}</span>
          </div>

          <div className="text-xs text-muted-foreground">
            {pkg.includes_setup ? "Setup service included" : "DIY arrangement"} • 
            Delivery included • Payment via Venmo or cash
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageConfiguration; 