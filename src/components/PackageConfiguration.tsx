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
  onConfigChange: (config: PackageConfig, isValid: boolean) => void;
}

export interface PackageConfig {
  selectedCollection?: string;
  deliveryDate: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
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

export interface ValidationErrors {
  deliveryDate?: string;
  deliveryStreet?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryZipCode?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

const PackageConfiguration = ({ package: pkg, onConfigChange }: PackageConfigurationProps) => {
  const [config, setConfig] = useState<PackageConfig>({
    selectedCollection: pkg.collections?.[0]?.id || "",
    deliveryDate: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
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

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'deliveryDate':
        if (!value) return 'Delivery date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Delivery date cannot be in the past';
        return undefined;
      
      case 'deliveryStreet':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please provide a complete street address';
        return undefined;
      
      case 'deliveryCity':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please provide a valid city name';
        return undefined;
      
      case 'deliveryState':
        if (!value.trim()) return 'State is required';
        if (value.trim().length < 2) return 'Please provide a valid state';
        return undefined;
      
      case 'deliveryZipCode':
        if (!value.trim()) return 'ZIP code is required';
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value.trim())) return 'Please provide a valid ZIP code (12345 or 12345-6789)';
        return undefined;
      
      case 'contactName':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Please provide your full name';
        return undefined;
      
      case 'contactPhone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
          return 'Please provide a valid phone number';
        }
        return undefined;
      
      case 'contactEmail':
        if (value && value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please provide a valid email address';
        }
        return undefined;
      
      default:
        return undefined;
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    newErrors.deliveryDate = validateField('deliveryDate', config.deliveryDate);
    newErrors.deliveryStreet = validateField('deliveryStreet', config.deliveryAddress.street);
    newErrors.deliveryCity = validateField('deliveryCity', config.deliveryAddress.city);
    newErrors.deliveryState = validateField('deliveryState', config.deliveryAddress.state);
    newErrors.deliveryZipCode = validateField('deliveryZipCode', config.deliveryAddress.zipCode);
    newErrors.contactName = validateField('contactName', config.contactInfo.name);
    newErrors.contactPhone = validateField('contactPhone', config.contactInfo.phone);
    newErrors.contactEmail = validateField('contactEmail', config.contactInfo.email);
    
    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key as keyof ValidationErrors]) {
        delete newErrors[key as keyof ValidationErrors];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateConfig = (updates: Partial<PackageConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    
    // Validate changed fields
    Object.keys(updates).forEach(field => {
      if (field === 'contactInfo' && updates.contactInfo) {
        Object.keys(updates.contactInfo).forEach(subField => {
          const fieldName = `contact${subField.charAt(0).toUpperCase() + subField.slice(1)}`;
          const error = validateField(fieldName, updates.contactInfo![subField as keyof typeof updates.contactInfo]);
          setErrors(prev => ({ ...prev, [fieldName]: error }));
        });
      } else if (field === 'deliveryAddress' && updates.deliveryAddress) {
        Object.keys(updates.deliveryAddress).forEach(subField => {
          const fieldName = `delivery${subField.charAt(0).toUpperCase() + subField.slice(1)}`;
          const error = validateField(fieldName, updates.deliveryAddress![subField as keyof typeof updates.deliveryAddress]);
          setErrors(prev => ({ ...prev, [fieldName]: error }));
        });
      } else if (field === 'deliveryDate') {
        const error = validateField(field, updates[field] as string);
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    });
    
    // Check if form is valid and notify parent
    const isValid = newConfig.deliveryDate && 
                   newConfig.deliveryAddress.street.trim() && 
                   newConfig.deliveryAddress.city.trim() && 
                   newConfig.deliveryAddress.state.trim() && 
                   newConfig.deliveryAddress.zipCode.trim() && 
                   newConfig.contactInfo.name.trim() && 
                   newConfig.contactInfo.phone.trim();
    
    onConfigChange(newConfig, !!isValid);
  };

  const handleFieldTouch = (fieldName: string) => {
    setTouched(prev => new Set([...prev, fieldName]));
  };

  const isFormValid = (): boolean => {
    return config.deliveryDate && 
           config.deliveryAddress.street.trim() && 
           config.deliveryAddress.city.trim() && 
           config.deliveryAddress.state.trim() && 
           config.deliveryAddress.zipCode.trim() && 
           config.contactInfo.name.trim() && 
           config.contactInfo.phone.trim() &&
           Object.keys(errors).length === 0;
  };

  const updateCustomizations = (key: keyof PackageConfig['customizations'], value: number) => {
    const newCustomizations = { ...config.customizations, [key]: Math.max(0, value) };
    updateConfig({ customizations: newCustomizations });
  };

  const updateContactInfo = (key: keyof PackageConfig['contactInfo'], value: string) => {
    const newContactInfo = { ...config.contactInfo, [key]: value };
    updateConfig({ contactInfo: newContactInfo });
  };

  const updateDeliveryAddress = (key: keyof PackageConfig['deliveryAddress'], value: string) => {
    const newDeliveryAddress = { ...config.deliveryAddress, [key]: value };
    updateConfig({ deliveryAddress: newDeliveryAddress });
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
            <Label htmlFor="delivery-date" className="text-sm font-medium">
              Preferred Delivery Date *
            </Label>
            <Input 
              id="delivery-date"
              type="date"
              value={config.deliveryDate}
              onChange={(e) => updateConfig({ deliveryDate: e.target.value })}
              onBlur={() => handleFieldTouch('deliveryDate')}
              min={new Date().toISOString().split('T')[0]}
              className={errors.deliveryDate ? 'border-red-500' : ''}
              required
            />
            {errors.deliveryDate && touched.has('deliveryDate') && (
              <p className="text-sm text-red-500">{errors.deliveryDate}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Delivery Address *
            </Label>
            
            <div className="space-y-3">
              {/* Street Address */}
              <div>
                <Input 
                  id="delivery-street"
                  placeholder="Street address (e.g., 123 Main St)"
                  value={config.deliveryAddress.street}
                  onChange={(e) => updateDeliveryAddress('street', e.target.value)}
                  onBlur={() => handleFieldTouch('deliveryStreet')}
                  className={errors.deliveryStreet ? 'border-red-500' : ''}
                  required
                />
                {errors.deliveryStreet && touched.has('deliveryStreet') && (
                  <p className="text-sm text-red-500 mt-1">{errors.deliveryStreet}</p>
                )}
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <Input 
                    id="delivery-city"
                    placeholder="City"
                    value={config.deliveryAddress.city}
                    onChange={(e) => updateDeliveryAddress('city', e.target.value)}
                    onBlur={() => handleFieldTouch('deliveryCity')}
                    className={errors.deliveryCity ? 'border-red-500' : ''}
                    required
                  />
                  {errors.deliveryCity && touched.has('deliveryCity') && (
                    <p className="text-sm text-red-500 mt-1">{errors.deliveryCity}</p>
                  )}
                </div>

                <div>
                  <Input 
                    id="delivery-state"
                    placeholder="State"
                    value={config.deliveryAddress.state}
                    onChange={(e) => updateDeliveryAddress('state', e.target.value)}
                    onBlur={() => handleFieldTouch('deliveryState')}
                    className={errors.deliveryState ? 'border-red-500' : ''}
                    required
                  />
                  {errors.deliveryState && touched.has('deliveryState') && (
                    <p className="text-sm text-red-500 mt-1">{errors.deliveryState}</p>
                  )}
                </div>

                <div>
                  <Input 
                    id="delivery-zipcode"
                    placeholder="ZIP Code"
                    value={config.deliveryAddress.zipCode}
                    onChange={(e) => updateDeliveryAddress('zipCode', e.target.value)}
                    onBlur={() => handleFieldTouch('deliveryZipCode')}
                    className={errors.deliveryZipCode ? 'border-red-500' : ''}
                    required
                  />
                  {errors.deliveryZipCode && touched.has('deliveryZipCode') && (
                    <p className="text-sm text-red-500 mt-1">{errors.deliveryZipCode}</p>
                  )}
                </div>
              </div>
            </div>
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
              <Label htmlFor="contact-name" className="text-sm font-medium">Full Name *</Label>
              <Input 
                id="contact-name"
                placeholder="Your full name"
                value={config.contactInfo.name}
                onChange={(e) => updateContactInfo('name', e.target.value)}
                onBlur={() => handleFieldTouch('contactName')}
                className={errors.contactName ? 'border-red-500' : ''}
                required
              />
              {errors.contactName && touched.has('contactName') && (
                <p className="text-sm text-red-500">{errors.contactName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="text-sm font-medium">Phone Number *</Label>
              <Input 
                id="contact-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={config.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                onBlur={() => handleFieldTouch('contactPhone')}
                className={errors.contactPhone ? 'border-red-500' : ''}
                required
              />
              {errors.contactPhone && touched.has('contactPhone') && (
                <p className="text-sm text-red-500">{errors.contactPhone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-sm font-medium">Email Address (Optional)</Label>
            <Input 
              id="contact-email"
              type="email"
              placeholder="your@email.com (optional - for order confirmation)"
              value={config.contactInfo.email}
              onChange={(e) => updateContactInfo('email', e.target.value)}
              onBlur={() => handleFieldTouch('contactEmail')}
              className={errors.contactEmail ? 'border-red-500' : ''}
            />
            {errors.contactEmail && touched.has('contactEmail') && (
              <p className="text-sm text-red-500">{errors.contactEmail}</p>
            )}
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