# Gmail Setup Guide for AKIR Restaurant

## 🔧 **Step-by-Step Gmail Configuration**

### 1. **Enable 2-Factor Authentication**
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### 2. **Generate App Password**
1. In your Google Account settings, go to "Security"
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" as the app
4. Select "Other" as the device and name it "AKIR Restaurant Backend"
5. Click "Generate"
6. **Copy the 16-character password** (you'll need this)

### 3. **Update Environment Variables**
Edit the `backend/.env` file with your actual Gmail credentials:

```env
# Replace with your actual Gmail address
EMAIL_USER=your-actual-gmail@gmail.com

# Replace with the 16-character App Password from step 2
EMAIL_PASS=your-16-character-app-password

# Replace with your restaurant's email
RESTAURANT_EMAIL=restaurant@akir.com

# Server Configuration
PORT=3001
```

### 4. **Example Configuration**
```env
EMAIL_USER=akirrestaurant@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
RESTAURANT_EMAIL=reservations@akir.com
PORT=3001
```

### 5. **Restart the Backend**
After updating the `.env` file:

```bash
# Stop the current backend (Ctrl+C)
# Then restart it
cd backend
npm start
```

## ✅ **Testing Email Functionality**

### Test Reservation Email
1. Go to your website: `https://web-restaurant-backend-rexh.onrender.com`
2. Fill out the reservation form
3. Submit the form
4. Check your Gmail inbox for:
   - **Customer confirmation email**
   - **Restaurant notification email**

### Test Contact Form
1. Go to the Contact section
2. Fill out the contact form
3. Submit the form
4. Check your Gmail inbox for the inquiry email

## 🔍 **Troubleshooting**

### Common Issues:

**"Invalid login" error:**
- Make sure you're using the App Password, not your regular Gmail password
- Ensure 2FA is enabled on your Google account

**"Less secure app access" error:**
- This is normal - use App Passwords instead
- Don't enable "less secure apps"

**Emails not sending:**
- Check the backend console for error messages
- Verify the App Password is correct
- Ensure Gmail account is not locked

### Backend Logs
Check the backend console for email status:
- ✅ "Email notifications: Configured" = Working
- ❌ "Email notifications: Not configured" = Check .env file

## 📧 **Email Templates**

The backend automatically sends:

1. **Customer Confirmation**: Sent to the customer who made the reservation
2. **Restaurant Notification**: Sent to your restaurant email
3. **Contact Inquiry**: Sent to your restaurant email for contact form submissions

## 🚀 **Production Deployment**

For production, consider:
- Using a dedicated email service (SendGrid, Mailgun)
- Setting up proper SMTP settings
- Using environment variables in your hosting platform
- Setting up email monitoring and logging

---

**Need Help?** Check the backend console logs for detailed error messages!
