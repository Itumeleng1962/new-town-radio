# 🔧 Fix "Tenant or user not found" Error

Good news: You're now connecting to the pooler (port 6543)! ✅  
Bad news: The username or password is incorrect. ❌

---

## 🔍 The Problem

The error "FATAL: Tenant or user not found" means:
- ✅ Connection string format is correct (reaching pooler)
- ❌ Username is wrong, OR
- ❌ Password is wrong, OR
- ❌ Password not URL-encoded correctly

---

## ✅ Solution: Verify Your Connection String

### Step 1: Get the EXACT Connection String from Supabase

**This is the most reliable method:**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **"Connection string"**
5. Click **"Connection pooling"** tab
6. Select **"Session mode"**
7. **Copy the ENTIRE connection string** (it should already have the correct username format)

It should look like:
```
postgresql://postgres.itzvbvajukjrveqzulvj:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### Step 2: Format It Correctly

1. **Replace `[YOUR-PASSWORD]`** with your actual password: `Tumi@0681738466`
2. **URL-encode the password:**
   - `@` → `%40`
   - So `Tumi@0681738466` → `Tumi%400681738466`
3. **Add `?sslmode=require` at the end**

**Final connection string should be:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Step 3: Verify Your Supabase Password

**IMPORTANT:** Make sure you're using the **correct database password**:

1. Go to Supabase → **Settings** → **Database**
2. Look for **"Database password"** section
3. If you don't remember it, you can:
   - Check if you saved it when creating the project
   - Or reset it (see Step 4)

### Step 4: Reset Database Password (If Needed)

If you're not sure about your password:

1. Go to Supabase → **Settings** → **Database**
2. Scroll to **"Database password"**
3. Click **"Reset database password"**
4. **SAVE THE NEW PASSWORD** (you'll need it!)
5. Update your connection string with the new password
6. URL-encode it if it has special characters

---

## 🧪 Test Connection String Locally First

Before deploying to Netlify, test it locally:

### Test in PowerShell:

```powershell
# Set the connection string
$env:DATABASE_URL = "postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Test connection
npx prisma db pull
```

**If this works locally, the connection string is correct!**

**If it fails locally:**
- Check your password is correct
- Verify the username format (should be `postgres.itzvbvajukjrveqzulvj`)
- Make sure password is URL-encoded

---

## 📋 Common Mistakes

### Mistake 1: Wrong Username Format

❌ **WRONG:**
```
postgresql://postgres:password@...
```

✅ **CORRECT:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:password@...
```

The username **MUST** include your project reference: `postgres.[PROJECT_REF]`

### Mistake 2: Password Not URL-Encoded

❌ **WRONG:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi@0681738466@...
```

✅ **CORRECT:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@...
```

The `@` in the password must be encoded as `%40`

### Mistake 3: Wrong Password

- Make sure you're using the **database password**, not your Supabase account password
- The password is set when you create the project
- If unsure, reset it in Supabase settings

### Mistake 4: Missing SSL Mode

❌ **WRONG:**
```
postgresql://...@...:6543/postgres
```

✅ **CORRECT:**
```
postgresql://...@...:6543/postgres?sslmode=require
```

---

## ✅ Correct Connection String Format

**Your project reference:** `itzvbvajukjrveqzulvj`  
**Your password:** `Tumi@0681738466`  
**URL-encoded password:** `Tumi%400681738466`

**Complete connection string:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Double-check:**
- ✅ Username: `postgres.itzvbvajukjrveqzulvj` (has project ref)
- ✅ Password: `Tumi%400681738466` (URL-encoded)
- ✅ Host: `aws-0-eu-central-1.pooler.supabase.com` (pooler)
- ✅ Port: `6543` (pooler port)
- ✅ SSL: `?sslmode=require` at the end

---

## 🔄 Update Netlify

1. **Test the connection string locally first** (see above)

2. **If local test works:**
   - Go to Netlify → Site settings → Environment variables
   - Edit `DATABASE_URL`
   - Paste the exact connection string that worked locally
   - Click **"Save"**

3. **If local test fails:**
   - Verify your password in Supabase
   - Reset password if needed
   - Try again

4. **Redeploy:**
   - Go to Deploys → Trigger deploy → Clear cache and deploy site

---

## 🆘 Still Not Working?

### Option 1: Get Fresh Connection String from Supabase

1. Go to Supabase → Settings → Database
2. Click **"Connection pooling"** tab
3. Select **"Session mode"**
4. Copy the connection string (it will have the correct format)
5. Replace `[YOUR-PASSWORD]` with your actual password
6. URL-encode special characters
7. Add `?sslmode=require`

### Option 2: Reset Database Password

1. Supabase → Settings → Database
2. Click **"Reset database password"**
3. **SAVE THE NEW PASSWORD**
4. Update connection string with new password
5. URL-encode if needed
6. Update in Netlify

### Option 3: Verify Project Reference

Make sure your project reference is correct:
- Go to Supabase → Settings → General
- Check **"Reference ID"** - should be `itzvbvajukjrveqzulvj`
- If different, use the correct one in the connection string

---

## 📝 Quick Checklist

- [ ] Got connection string from Supabase "Connection pooling" tab
- [ ] Username includes project ref: `postgres.itzvbvajukjrveqzulvj`
- [ ] Password is correct (database password, not account password)
- [ ] Password is URL-encoded (`@` → `%40`)
- [ ] Added `?sslmode=require` at the end
- [ ] Tested connection string locally (optional but recommended)
- [ ] Updated `DATABASE_URL` in Netlify
- [ ] Triggered new deploy

---

**The most common issue is the password - make sure it's correct and URL-encoded! 🔐**
