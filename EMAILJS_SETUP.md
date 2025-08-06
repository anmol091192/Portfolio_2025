# EmailJS Setup Instructions

## Steps to Enable Gmail Integration:

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2. Add Email Service (Gmail)
1. Go to Email Services in your EmailJS dashboard
2. Click "Add New Service"
3. Select "Gmail"
4. Authenticate with your Gmail account
5. Note down the **Service ID** (e.g., `service_xyz123`)

### 3. Create Email Template
1. Go to Email Templates in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Variables:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{to_email}}` - Your email (anmol09k@gmail.com)
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{reply_to}}` - Reply-to email

**Email Template Example:**
```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} <{{from_email}}>

Message:
{{message}}

---
This message was sent through your portfolio contact form.
Reply directly to: {{reply_to}}
```

4. Note down the **Template ID** (e.g., `template_abc789`)

### 4. Get Public Key
1. Go to Account > API Keys in your EmailJS dashboard
2. Note down your **Public Key** (e.g., `user_def456`)

### 5. Update Contact.js
Replace these placeholders in `/src/sections/Contact/Contact.js`:

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID';     // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // Replace with your Template ID  
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';     // Replace with your Public Key
```

### 6. Environment Variables (Recommended)
Create a `.env.local` file in your project root:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update Contact.js to use:
```javascript
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
```

### 7. Test the Integration
1. Fill out the contact form on your portfolio
2. Submit the form
3. Check your Gmail inbox for the email
4. Verify the email contains all the form data

## Features Included:

✅ **Form Validation**: Validates required fields and email format
✅ **Loading State**: Shows "Sending..." while processing
✅ **Error Handling**: Fallback to mailto link if EmailJS fails
✅ **Success Feedback**: Confirmation message after successful send
✅ **Form Reset**: Clears form after successful submission

## Free Tier Limits:
- EmailJS free tier: 200 emails/month
- Perfect for portfolio contact forms

## Security Note:
The Public Key is safe to expose in frontend code as it's designed for client-side use.
