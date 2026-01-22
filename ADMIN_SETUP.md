# Admin Account Setup Guide

## After Deploying to Netlify

When your site is live on Netlify, you need to create the first admin account to access the admin dashboard.

## Method 1: Using the Script (Recommended)

### Step 1: Connect to Your Database

You'll need to run the script with access to your PostgreSQL database. You can do this:

**Option A: Using Netlify CLI (Easiest)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site
netlify link

# Set your database URL
netlify env:set DATABASE_URL "your-postgresql-connection-string"

# Run the script
DATABASE_URL="your-postgresql-connection-string" node scripts/create-admin.js admin@yourdomain.com YourSecurePassword123 "Admin Name"
```

**Option B: Using Supabase/Neon Dashboard (Recommended for Supabase)**
1. Go to your Supabase dashboard: [https://supabase.com](https://supabase.com)
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**
5. **Generate password hash first:**
   - Go to [https://bcrypt-generator.com/](https://bcrypt-generator.com/)
   - Enter your password (e.g., `MyAdminPassword123`)
   - Set rounds to **10**
   - Click "Generate Hash" and copy it
6. Run this SQL (replace with your details):

```sql
-- Create Admin User in PostgreSQL (Supabase)
-- Replace these values:
--   'admin@yourdomain.com' with your admin email
--   '$2a$10$...' with your bcrypt password hash from bcrypt-generator.com
--   'Admin User' with your admin name

INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),  -- PostgreSQL syntax
  'admin@yourdomain.com',                           -- YOUR EMAIL
  '$2a$10$YourHashedPasswordHere',                  -- YOUR BCRYPT HASH
  'Admin User',                                     -- YOUR NAME
  'ADMIN',
  NOW(),                                            -- PostgreSQL syntax
  NOW()
)
ON CONFLICT (email) DO UPDATE
SET 
  role = 'ADMIN',
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  "updatedAt" = NOW();
```

**See `SUPABASE_ADMIN_SETUP.md` for detailed step-by-step instructions!**

**Option C: Using Database GUI Tool**
- Download DBeaver, pgAdmin, or TablePlus
- Connect to your PostgreSQL database
- Manually insert a user with role = 'ADMIN'

### Step 2: Login

1. Go to: `https://your-site.netlify.app/login`
2. Use the credentials you created:
   - **Email:** admin@yourdomain.com (or whatever you set)
   - **Password:** YourSecurePassword123 (or whatever you set)

## Method 2: Using the API Endpoint (One-Time Use)

⚠️ **SECURITY WARNING:** Disable this endpoint after creating your admin!

### Step 1: Create Admin via API

After your site is deployed, make a POST request:

```bash
curl -X POST https://your-site.netlify.app/api/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "YourSecurePassword123",
    "name": "Admin User"
  }'
```

Or use a tool like Postman or Thunder Client.

### Step 2: Login

Use the credentials you just created to log in.

## Method 3: Update Existing User to Admin

If you already registered a regular user account:

### Using SQL:
```sql
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

### Using the Script:
```bash
node scripts/create-admin.js your-email@example.com YourPassword "Your Name"
```

This will update the existing user to ADMIN role.

## Default Admin Credentials (For Reference)

**There are NO default credentials!** You must create the admin account yourself after deployment.

## Recommended Admin Setup

1. **Email:** Use a professional email (e.g., `admin@newtownradio.com`)
2. **Password:** Use a strong password (at least 12 characters, mix of letters, numbers, symbols)
3. **Name:** Your admin display name

## Security Best Practices

1. ✅ Create admin account immediately after deployment
2. ✅ Use a strong, unique password
3. ✅ Consider disabling the API endpoint after use
4. ✅ Don't share admin credentials
5. ✅ Use environment variables for sensitive data
6. ✅ Regularly update passwords

## Troubleshooting

### "Cannot connect to database"
- Check your DATABASE_URL environment variable in Netlify
- Verify database allows connections from Netlify
- Check SSL settings (add `?sslmode=require` to connection string)

### "User already exists"
- The script will update existing users to ADMIN
- Or manually update via SQL: `UPDATE "User" SET role = 'ADMIN' WHERE email = '...'`

### "Permission denied"
- Check database user has INSERT/UPDATE permissions
- Verify connection string is correct

### "Script not found"
- Make sure you're in the project root directory
- Check `scripts/create-admin.js` exists
- Install dependencies: `npm install`

## After Creating Admin

1. ✅ Test login at `/login`
2. ✅ Access admin dashboard at `/admin`
3. ✅ Create your first show, event, or product
4. ✅ Test all admin features
5. ✅ (Optional) Disable the `/api/admin/create-admin` endpoint for security

## Need Help?

- Check Netlify function logs
- Check database logs (Supabase/Neon dashboard)
- Verify environment variables are set correctly
- Test database connection separately
