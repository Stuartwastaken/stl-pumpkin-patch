import emailjs from '@emailjs/browser';
import { Package } from '@/data/packages';
import { PackageConfig } from '@/components/PackageConfiguration';
import { EMAIL_CONFIG } from '@/config/email';

export interface OrderSubmission {
  package: Package;
  config: PackageConfig;
  totalPrice: number;
}

export interface ReminderLead {
  email: string;
  remindOnISO: string;
  sourceUrl?: string;
}

export const sendOrderEmail = async (order: OrderSubmission): Promise<boolean> => {
  try {
    // Calculate add-ons details
    const addOnsDetails = [];
    const costs = {
      extraHayBales: 15,
      extraLargePumpkins: 12,
      extraMediumPumpkins: 8,
      extraSpecialtyPumpkins: 10
    };

    let addOnsCost = 0;
    Object.entries(order.config.customizations).forEach(([key, quantity]) => {
      if (quantity > 0) {
        const itemCost = costs[key as keyof typeof costs] * quantity;
        addOnsCost += itemCost;
        
        const itemName = key.replace(/([A-Z])/g, ' $1').toLowerCase().replace('extra ', '');
        addOnsDetails.push(`${quantity}x ${itemName} (+$${itemCost})`);
      }
    });

    // Calculate pricing with potential discount
    const baseTotal = order.package.priceValue + addOnsCost;
    const isVenmoPayment = order.config.paymentMethod === 'venmo';
    const discount = isVenmoPayment ? baseTotal * 0.1 : 0;
    const finalTotal = baseTotal - discount;

    // Prepare email template parameters
    const templateParams = {
      // Email destination (MUST be first for EmailJS)
      to_email: EMAIL_CONFIG.TO_EMAIL,
      to_name: EMAIL_CONFIG.TO_NAME,
      
      // Order Info
      order_number: `ORD-${Date.now()}`,
      order_date: new Date().toLocaleDateString(),
      
      // Package Details
      package_name: order.package.name,
      package_description: order.package.description,
      base_price: order.package.price,
      
      // Selected Collection (if applicable)
      selected_collection: order.config.selectedCollection ? 
        order.package.collections?.find(c => c.id === order.config.selectedCollection)?.name || 'None' : 'None',
      
      // Add-ons
      addons_list: addOnsDetails.length > 0 ? addOnsDetails.join(', ') : 'None',
      addons_cost: addOnsCost > 0 ? `$${addOnsCost}` : '$0',
      
      // Pricing
      subtotal_price: `$${baseTotal.toFixed(2)}`,
      venmo_discount: isVenmoPayment ? `$${discount.toFixed(2)}` : '$0.00',
      total_price: `$${finalTotal.toFixed(2)}`,
      
      // Payment Info
      payment_method: order.config.paymentMethod === 'venmo' ? 'Venmo Prepaid (10% discount applied)' : 'Pay on Delivery',
      
      // Customer Info
      customer_name: order.config.contactInfo.name,
      customer_phone: order.config.contactInfo.phone,
      customer_email: order.config.contactInfo.email || 'Not provided',
      
      // Delivery Details
      delivery_date: order.config.deliveryDate || 'Not specified',
      delivery_street: order.config.deliveryAddress.street,
      delivery_city: order.config.deliveryAddress.city,
      delivery_state: order.config.deliveryAddress.state,
      delivery_zipcode: order.config.deliveryAddress.zipCode,
      delivery_full_address: `${order.config.deliveryAddress.street}, ${order.config.deliveryAddress.city}, ${order.config.deliveryAddress.state} ${order.config.deliveryAddress.zipCode}`,
      
      // Special Requests
      special_requests: order.config.specialRequests || 'None',
      
      // Service Details
      includes_setup: order.package.includes_setup ? 'Yes' : 'No',
      setup_time: order.package.setup_time,
  
      
      // Package Features
      package_features: order.package.features.join(', ')
    };

    console.log('Sending email with params:', templateParams);

    const result = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    );

    console.log('Email sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Initialize EmailJS (call this once when the app starts)
export const initializeEmailJS = () => {
  emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
}; 

export const sendReminderLead = async (lead: ReminderLead): Promise<boolean> => {
  try {
    const params = {
      to_email: EMAIL_CONFIG.TO_EMAIL,
      to_name: EMAIL_CONFIG.TO_NAME,
      lead_email: lead.email,
      reply_to: lead.email,
      submitted_on: new Date().toLocaleDateString(),
      remind_on: new Date(lead.remindOnISO).toLocaleDateString(),
      remind_on_iso: lead.remindOnISO,
      source_url: lead.sourceUrl || 'unknown',
    };

    const result = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.REMINDER_TEMPLATE_ID || EMAIL_CONFIG.TEMPLATE_ID,
      params,
      EMAIL_CONFIG.PUBLIC_KEY
    );
    console.log('Reminder lead sent:', result);
    return true;
  } catch (e) {
    console.error('Failed to send reminder lead:', e);
    return false;
  }
};