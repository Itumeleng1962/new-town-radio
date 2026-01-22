# 🔧 Fix "Tenant or user not found" Database Error

The error **"FATAL: Tenant or user not found"** means your `DATABASE_URL` in Netlify is either:
- ❌ Not set at all
- ❌ Has wrong password
- ❌ Has wrong format
- ❌ Password contains special characters that need URL encoding

---

## ✅ Solution: Fix DATABASE_URL in Netlify

### Step 1: Get Your Correct Supabase Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** (gear icon) → **Database**
4. Scroll down to **"Connection string"**
5. Click the **"URI"** tab
6. You'll see something like:
   ```
   postgresql://postgres.xkzxjetmoxgwrtxejvqc:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```

### Step 2: Format the Connection String Correctly

**IMPORTANT:** You must:
1. Replace `[YOUR-PASSWORD]` with your **actual Supabase database password**
2. Add `?sslmode=require` at the end

**Final format should be:**
```
postgresql://postgres.xkzxjetmoxgwrtxejvqc:YOUR_ACTUAL_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**⚠️ If your password has special characters** (like `@`, `#`, `$`, `%`, `&`, etc.), you need to **URL-encode** them:

| Character | URL-Encoded |
|-----------|-------------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |

**Example:**
- Password: `MyP@ss#123`
- URL-encoded: `MyP%40ss%23123`
- Full connection string:
  ```
  postgresql://postgres.xkzxjetmoxgwrtxejvqc:MyP%40ss%23123@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
  ```

### Step 3: Add DATABASE_URL to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site
3. Click **"Site settings"** (gear icon)
4. Click **"Environment variables"** (left sidebar)
5. Look for `DATABASE_URL`:
   - **If it exists:** Click **"Edit"** and update it
   - **If it doesn't exist:** Click **"Add variable"**

6. Fill in:
   - **Key:** `DATABASE_URL`
   - **Value:** Your complete connection string (from Step 2)
   - **Scopes:** Leave as "All scopes" (or select "Builds" and "Functions")

7. Click **"Save"**

### Step 4: Verify Other Environment Variables

While you're there, make sure you also have:

**NEXTAUTH_SECRET:**
- Key: `NEXTAUTH_SECRET`
- Value: `G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE=`

**NEXTAUTH_URL:**
- Key: `NEXTAUTH_URL`
- Value: `https://your-site-name.netlify.app` (or placeholder for now)

### Step 5: Trigger New Deploy

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete (3-5 minutes)

---

## 🧪 Test Your Connection String Locally

Before deploying, test if your connection string works:

### Option 1: Test with PowerShell

```powershell
# Set the DATABASE_URL temporarily
$env:DATABASE_URL = "postgresql://postgres.xkzxjetmoxgwrtxejvqc:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Test Prisma connection
npx prisma db pull
```

If this works, your connection string is correct!

### Option 2: Test with Node.js

Create a test file `test-db.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

test();
```

Run it:
```powershell
$env:DATABASE_URL = "your-connection-string"
node test-db.js
```

---

## 🔍 Common Issues and Fixes

### Issue 1: "Tenant or user not found"

**Cause:** Wrong password or wrong connection string format

**Fix:**
- Double-check your Supabase password
- Make sure you're using the **pooler** connection string (port 6543) not direct (port 5432)
- Verify the connection string has `?sslmode=require` at the end

### Issue 2: Password has special characters

**Fix:** URL-encode special characters in your password

**Quick way to URL-encode:**
1. Go to [https://www.urlencoder.org/](https://www.urlencoder.org/)
2. Paste your password
3. Click "Encode"
4. Copy the encoded version
5. Use it in the connection string

### Issue 3: Wrong Supabase project

**Fix:**
- Make sure you're using the connection string from the **correct Supabase project**
- Check the hostname matches your project

### Issue 4: Connection string not saved in Netlify

**Fix:**
- Go to Netlify → Site settings → Environment variables
- Verify `DATABASE_URL` is listed
- Make sure you clicked "Save" after adding it
- Check the value is exactly what you copied (no extra spaces)

---

## 📋 Checklist

Before redeploying, verify:

- [ ] I have the correct Supabase connection string
- [ ] I replaced `[YOUR-PASSWORD]` with my actual password
- [ ] I URL-encoded any special characters in the password
- [ ] I added `?sslmode=require` at the end
- [ ] I added `DATABASE_URL` in Netlify environment variables
- [ ] I saved the environment variable in Netlify
- [ ] I tested the connection string locally (optional but recommended)
- [ ] I triggered a new deploy with cache cleared

---

## 🆘 Still Not Working?

### Check Netlify Build Logs

1. Go to Netlify → Your site → **Deploys**
2. Click on the failed deploy
3. Look for the exact error message
4. Check if `DATABASE_URL` is mentioned in the logs

### Verify Supabase Database is Running

1. Go to Supabase dashboard
2. Check if your project shows as "Active"
3. Try connecting via Supabase SQL Editor to verify the database works

### Get Fresh Connection String

1. In Supabase, go to **Settings** → **Database**
2. Click **"Reset database password"** (if needed)
3. Copy the new connection string
4. Update it in Netlify

---

**Once you fix the DATABASE_URL and redeploy, the build should succeed! 🚀**
