# EmailJS Setup Guide for STL Pumpkin Patch

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

### Step 2: Connect Your Email Service
1. In EmailJS dashboard, go to "Services" → "Add New Service"
2. Choose your email provider (Gmail recommended)
3. For Gmail:
   - Click "Gmail"
   - Sign in with your Google account (stuartray32@gmail.com)
   - Allow EmailJS access
   - Note the **Service ID** (something like `service_abc123`)
   - service_qst6paw

### Step 3: Create Email Template
1. Go to "Templates" → "Create New Template"
2. Copy this template content:

```
Subject: 🎃 New Pumpkin Order - {{order_number}}

Hi {{to_name}},

You've received a new pumpkin package order!

ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order Number: {{order_number}}
Order Date: {{order_date}}
Package: {{package_name}}
Total Price: {{total_price}}

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{customer_name}}
Phone: {{customer_phone}}
Email: {{customer_email}}

DELIVERY DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Preferred Date: {{delivery_date}}
Address: {{delivery_address}}

PACKAGE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Package: {{package_name}} ({{base_price}})
Description: {{package_description}}
Selected Collection: {{selected_collection}}
Add-ons: {{addons_list}} ({{addons_cost}})
Setup Service: {{includes_setup}}
Setup Time: {{setup_time}}
Space Required: {{space_required}}

WHAT'S INCLUDED:
{{package_features}}

SPECIAL REQUESTS:
{{special_requests}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact the customer at {{customer_phone}} to confirm details!

Best regards,
STL Pumpkin Patch Order System
```

3. Save the template and note the **Template ID** (something like `template_xyz789`)

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (something like `user_abcdef123456`)

### Step 5: Update Your Configuration
1. Open `src/config/email.ts` in your project
2. Replace the placeholder values:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123',     // Your actual service ID
  TEMPLATE_ID: 'template_xyz789',   // Your actual template ID
  PUBLIC_KEY: 'user_abcdef123456',  // Your actual public key
  
  TO_EMAIL: 'stuartray32@gmail.com',
  TO_NAME: 'Stuart'
};
```

### Step 6: Test the Integration
1. Start your development server: `npm run dev`
2. Go to any package detail page
3. Fill out the "Configure & Order" form
4. Click "Submit Order Request"
5. Check your email for the order notification

## Email Features Included

✅ **Complete Order Details**: Package, pricing, add-ons, customer info
✅ **Customer Contact Info**: Name, phone, email
✅ **Delivery Information**: Date and full address
✅ **Special Requests**: Any custom instructions
✅ **Package Configuration**: Collections, add-ons, setup requirements

## Troubleshooting

### Email Not Sending?
1. Check browser console for errors
2. Verify all three IDs are correct in `email.ts`
3. Make sure EmailJS service is connected to your Gmail
4. Check EmailJS dashboard "Logs" for failed attempts

### Wrong Email Address?
- Update `TO_EMAIL` in `src/config/email.ts`

### Want SMS Notifications Too?
- Consider upgrading to Twilio integration later
- For now, you can set up Gmail forwarding to SMS

## Free Tier Limits
- **200 emails/month** (about 7 orders per day)
- **1 email service** 
- **2 email templates**

Perfect for getting started! Upgrade to paid plan if you exceed limits.

## Security Note
Your EmailJS keys are safe to use in frontend code - they're designed for client-side use and EmailJS handles the security.

---

That's it! Your order system will now email you every order with complete details. 🎉 