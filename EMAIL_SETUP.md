# Email Setup Guide for AKIR Restaurant

## Setting up Email Notifications for Reservations

To enable email notifications when customers submit reservation requests, follow these steps:

### 1. Sign up for EmailJS
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

### 3. Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with these variables:
   - `{{to_name}}` - Customer's name
   - `{{reservation_date}}` - Selected date
   - `{{reservation_time}}` - Selected time
   - `{{number_of_guests}}` - Number of guests
   - `{{special_requests}}` - Special requests
   - `{{phone}}` - Customer's phone number
4. Save the template and note down your **Template ID**

### 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### 5. Update Configuration
1. Open `src/lib/email-config.ts`
2. Replace the placeholder values:
   ```typescript
   export const emailConfig = {
     serviceId: 'YOUR_ACTUAL_SERVICE_ID',
     templateId: 'YOUR_ACTUAL_TEMPLATE_ID', 
     publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',
   }
   ```

### 6. Test the Email Functionality
1. Restart your development server
2. Fill out the reservation form on your website
3. Submit the form
4. Check if you receive the email notification

## Example Email Template

Here's a sample email template you can use:

```html
Subject: Reservation Confirmation - AKIR Restaurant

Dear {{to_name}},

Thank you for your reservation request at AKIR Restaurant.

Reservation Details:
- Date: {{reservation_date}}
- Time: {{reservation_time}}
- Number of Guests: {{number_of_guests}}
- Phone: {{phone}}

Special Requests: {{special_requests}}

We will review your request and contact you within 24 hours to confirm your reservation.

Best regards,
The AKIR Restaurant Team
```

## Troubleshooting

- **Email not sending**: Check your EmailJS service configuration and API keys
- **Template variables not working**: Make sure the variable names in your template match exactly
- **Authentication issues**: Re-authenticate your email service in EmailJS dashboard

## Security Notes

- Never commit your actual EmailJS credentials to version control
- Consider using environment variables for production deployments
- The free EmailJS plan allows 200 emails per month

