# 🔍 Verify Your Connection String in Netlify

## ✅ Good Progress!

You're now connecting to the pooler correctly:
- ✅ Port: `6543` (pooler)
- ✅ Host: `aws-0-eu-central-1.pooler.supabase.com` (pooler)
- ❌ But username or password is wrong

---

## 🔍 The Problem

"FATAL: Tenant or user not found" means:
- ✅ Connection format is correct (reaching pooler)
- ❌ Username is wrong, OR
- ❌ Password is wrong, OR
- ❌ Password not URL-encoded correctly

---

## ✅ Solution: Verify Your Connection String in Netlify

### Step 1: Check What's Currently in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site
3. Go to **Site settings** → **Environment variables**
4. Find `DATABASE_URL`
5. Click **"Edit"** to see the current value

### Step 2: Verify Each Part

Your connection string should be:

```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Check each part:**

1. **Username:** Should be `postgres.ykfnpohsvgztpucvgoyl` (with project ref)
   - ❌ Wrong: `postgres`
   - ✅ Correct: `postgres.ykfnpohsvgztpucvgoyl`

2. **Password:** Should be `Tumi%400681738466` (URL-encoded)
   - ❌ Wrong: `Tumi@0681738466` (not encoded)
   - ✅ Correct: `Tumi%400681738466` (`@` → `%40`)

3. **Host:** Should be `aws-0-eu-central-1.pooler.supabase.com`
   - ✅ This looks correct based on the logs

4. **Port:** Should be `6543`
   - ✅ This looks correct based on the logs

5. **SSL:** Should have `?sslmode=require` at the end
   - ✅ Make sure this is present

---

## 🔑 Most Common Issues

### Issue 1: Password Not URL-Encoded

**Wrong:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi@0681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Problem:** The `@` in the password is not encoded, so it's interpreted as a separator!

**Correct:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Issue 2: Wrong Username Format

**Wrong:**
```
postgresql://postgres:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Problem:** Missing project reference in username!

**Correct:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Issue 3: Wrong Password

**Problem:** You might be using the wrong database password.

**Solution:**
1. Go to Supabase → Settings → Database
2. Check if you see your database password
3. If not, or if you're unsure, reset it:
   - Click **"Reset database password"**
   - **SAVE THE NEW PASSWORD**
   - Update your connection string with the new password
   - URL-encode it if it has special characters

---

## 🧪 Test Connection String Locally First

Before updating Netlify, test the connection string locally:

**PowerShell:**
```powershell
$env:DATABASE_URL = "postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

**Bash:**
```bash
export DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

**If this works locally:**
- ✅ Your connection string is correct
- ✅ Use the EXACT same string in Netlify

**If this fails locally:**
- ❌ Check your password
- ❌ Verify username format
- ❌ Make sure password is URL-encoded

---

## 📋 Step-by-Step Fix

### Step 1: Get Fresh Connection String from Supabase

1. Go to Supabase → Settings → Database
2. Click **"Connection pooling"** tab
3. Select **"Session mode"**
4. Copy the connection string

### Step 2: Format It Correctly

1. Replace `[YOUR-PASSWORD]` with your actual password
2. **URL-encode special characters:**
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - etc.
3. Add `?sslmode=require` at the end

### Step 3: Test Locally (Recommended)

Test the connection string locally before using it in Netlify (see commands above).

### Step 4: Update Netlify

1. Go to Netlify → Site settings → Environment variables
2. Edit `DATABASE_URL`
3. **Delete the old value completely**
4. Paste the new, correctly formatted connection string
5. Click **"Save"**
6. **Double-check** the value was saved correctly

### Step 5: Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🔍 Quick Checklist

- [ ] Got connection string from Supabase "Connection pooling" tab
- [ ] Username includes project ref: `postgres.ykfnpohsvgztpucvgoyl`
- [ ] Password is correct (database password, not account password)
- [ ] Password is URL-encoded (`@` → `%40`)
- [ ] Connection string has `?sslmode=require` at the end
- [ ] Tested connection string locally (optional but recommended)
- [ ] Updated `DATABASE_URL` in Netlify with correct value
- [ ] Verified the value was saved correctly in Netlify
- [ ] Triggered new deploy

---

## 🆘 Still Not Working?

### Option 1: Reset Database Password

If you're unsure about your password:

1. Go to Supabase → Settings → Database
2. Click **"Reset database password"**
3. **SAVE THE NEW PASSWORD** (write it down!)
4. Update your connection string with the new password
5. URL-encode special characters
6. Update in Netlify

### Option 2: Verify Project Reference

Make sure your project reference is correct:

1. Go to Supabase → Settings → General
2. Check **"Reference ID"** - should be `ykfnpohsvgztpucvgoyl`
3. If different, use the correct one in the connection string

### Option 3: Get Exact Connection String

The easiest way is to copy it directly from Supabase:

1. Supabase → Settings → Database
2. "Connection pooling" tab → "Session mode"
3. Copy the connection string (it will have the correct format)
4. Replace `[YOUR-PASSWORD]` with your actual password
5. URL-encode special characters
6. Add `?sslmode=require` if not already there

---

## 💡 Pro Tip

**The most common issue is the password not being URL-encoded!**

If your password is `Tumi@0681738466`, make sure it's `Tumi%400681738466` in the connection string.

---

**Double-check your connection string in Netlify - especially the password encoding! 🔐**
