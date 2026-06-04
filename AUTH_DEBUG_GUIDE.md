# Authentication Debugging Guide

## Issue: "Incorrect Password" Error

If you're seeing an "incorrect password" error when trying to sign up, follow these steps:

### Step 1: Start the Development Server

**Option A: Double-click the batch file**
1. Open File Explorer and navigate to `C:\risely-app`
2. Double-click `start-dev.bat`
3. A command prompt will open and start the Next.js dev server
4. Wait for it to say "ready - started server on..." (usually takes 10-15 seconds)
5. Keep this window open

**Option B: Manual command**
1. Open Command Prompt
2. Type: `cd C:\risely-app`
3. Type: `npm run dev`
4. Wait for the server to start

### Step 2: Open the App in Browser

1. Open Chrome or your browser
2. Go to: `http://localhost:3000`
3. You should see the login/signup screen

### Step 3: Open Developer Console

1. Press `F12` to open Developer Tools
2. Click the "Console" tab
3. Leave this open - we'll check it for error messages

### Step 4: Try to Sign Up

1. Click "Sign Up" tab
2. Enter:
   - **Name**: TestUser
   - **Email**: test@example.com (use a unique email each time)
   - **Password**: Password123 (at least 6 characters)
3. Click "Create Account"
4. **IMPORTANT**: Check the Console (F12) for detailed error messages
5. Take a screenshot of any error messages you see

### Step 5: Share the Error Details

The actual error from Supabase will be shown in:
- The red error message on the screen
- The browser console (F12 → Console tab)

Please share:
1. The exact error message displayed
2. Any messages in the browser console
3. The full error stack trace (if visible)

## Common Solutions

### If you see "Please fill in all fields"
- Make sure you entered text in all three fields (Name, Email, Password)

### If you see "Password must be at least 6 characters"
- Use a password with at least 6 characters (e.g., "Password123")

### If you see other Supabase errors
- Check that your `.env.local` file has the correct Supabase credentials
- Verify the database tables exist in Supabase Dashboard

## Checking Supabase Configuration

1. Go to: https://supabase.com/dashboard
2. Select your "risely-app" project
3. Check:
   - **Authentication** → Confirm email/password auth is enabled
   - **SQL Editor** → Run: `SELECT * FROM members LIMIT 1;` to verify tables exist
   - **Auth** → Check Users to see if any accounts were created

## Expected Flow

1. ✅ You fill in form
2. ✅ Click "Create Account"
3. ✅ Account is created in Supabase Auth
4. ✅ Member record is created in database
5. ✅ User role is created
6. ✅ Success message shows: "✓ Account created! Please sign in."
7. ✅ Form switches to login tab
8. ✅ You can now sign in with email/password

## Questions?

If you get past all these steps and still have issues, share:
- The browser console error messages (F12 → Console)
- Your `.env.local` file (the URLs, not the full keys)
- Screenshots of any errors
