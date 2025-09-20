// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  // Get these from your EmailJS dashboard at https://www.emailjs.com/
  SERVICE_ID: 'service_qst6paw', 
  TEMPLATE_ID: 'template_7ccwxzk',  
  PUBLIC_KEY: 'z9Ay3KM0D4KNUEh_m',  
  REMINDER_TEMPLATE_ID: 'template_reminder_lead',
  
  // Email settings
  TO_EMAIL: 'stlpumpkinsdelivery@gmail.com',
  TO_NAME: 'STL Pumpkins'
};

// Instructions for setup:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a new service (Gmail, Outlook, etc.)
// 3. Create a new email template with the variables used in emailService.ts
// 4. Replace the values above with your actual credentials
// 5. Update the template content in EmailJS dashboard 