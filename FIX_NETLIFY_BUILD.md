# 🔧 Fix Netlify Build Error - Missing Environment Variables

Your build is failing because `DATABASE_URL` is not set in Netlify. Here's how to fix it:

---

## 🚨 Current Error

```
Error: Environment variable not found: DATABASE_URL
```

This means Netlify doesn't have your database connection string.

---

## ✅ Solution: Add Environment Variables in Netlify

### Step 1: Go to Your Netlify Site Settings

1. Open [https://app.netlify.com](https://app.netlify.com)
2. Click on your site (the one that just failed to build)
3. Click **"Site settings"** (gear icon in the top navigation, or in the left sidebar)

### Step 2: Navigate to Environment Variables

1. In the left sidebar, click **"Environment variables"**
2. You'll see a list of variables (probably empty right now)

### Step 3: Add DATABASE_URL

1. Click **"Add variable"** button
2. Fill in:
   - **Key:** `DATABASE_URL`
   - **Value:** Your Supabase connection string
     ```
     postgresql://postgres.xkzxjetmoxgwrtxejvqc:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
     ```
     **Replace `[YOUR-PASSWORD]` with your actual Supabase database password!**
3. Click **"Save"**

### Step 4: Add NEXTAUTH_SECRET

1. Click **"Add variable"** again
2. Fill in:
   - **Key:** `NEXTAUTH_SECRET`
   - **Value:** `G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE=`
     (This is the one you generated earlier)
3. Click **"Save"**

### Step 5: Add NEXTAUTH_URL (Temporary)

1. Click **"Add variable"** again
2. Fill in:
   - **Key:** `NEXTAUTH_URL`
   - **Value:** `https://your-site-name.netlify.app`
     **For now, use a placeholder. You'll update this after the first deploy.**
3. Click **"Save"**

---

## 📍 Where to Find Your Netlify URL (NEXTAUTH_URL)

### Option 1: After First Successful Deploy

1. Go to your Netlify dashboard
2. Click on your site
3. Look at the top of the page - you'll see:
   ```
   https://random-name-123.netlify.app
   ```
   This is your site URL!

### Option 2: In Site Settings

1. Go to **Site settings** → **General**
2. Look for **"Site details"**
3. You'll see **"Site URL"** - that's your Netlify URL

### Option 3: In Deploy Logs

1. Go to **Deploys** tab
2. Click on any deploy
3. Look at the top - it shows the site URL

### Option 4: Before First Deploy (Placeholder)

If you haven't deployed yet, Netlify will assign a random name like:
- `https://amazing-site-123.netlify.app`
- `https://your-repo-name.netlify.app`

**You can use a placeholder for now, then update it after the first deploy.**

---

## 🔄 After Adding Variables: Trigger New Deploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for the build to complete (3-5 minutes)
4. The build should now succeed!

---

## ✅ Update NEXTAUTH_URL After First Deploy

Once your site is live:

1. Note your actual Netlify URL (e.g., `https://amazing-site-123.netlify.app`)
2. Go to **Site settings** → **Environment variables**
3. Find `NEXTAUTH_URL`
4. Click **"Edit"**
5. Update the value to your actual Netlify URL
6. Click **"Save"**
7. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 📋 Quick Checklist

- [ ] Added `DATABASE_URL` with your Supabase connection string
- [ ] Added `NEXTAUTH_SECRET` with your generated secret
- [ ] Added `NEXTAUTH_URL` (placeholder is fine for now)
- [ ] Triggered a new deploy
- [ ] Build succeeded
- [ ] Updated `NEXTAUTH_URL` with actual Netlify URL after first deploy

---

## 🆘 Still Having Issues?

### Check Your DATABASE_URL Format

Make sure it looks like this:
```
postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?sslmode=require
```

**Common mistakes:**
- ❌ Missing `?sslmode=require` at the end
- ❌ Wrong password
- ❌ Wrong host/port
- ❌ Missing `postgresql://` prefix

### Get Your Supabase Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **"Connection string"**
5. Click **"URI"** tab
6. Copy the connection string
7. **Add `?sslmode=require` at the end**

---

**Once you add these variables and redeploy, your build should succeed! 🚀**
