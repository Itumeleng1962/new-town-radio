# Your DATABASE_URL for Netlify

## ⚠️ IMPORTANT: Use Pooler Connection!

The direct connection (port 5432) **doesn't work** with Netlify. You **MUST** use the **pooler connection** (port 6543).

---

## Your Connection String

**Your Supabase project reference:** `itzvbvajukjrveqzulvj`  
**Your password:** `Tumi@0681738466`

---

## ✅ CORRECT Connection String for Netlify

**IMPORTANT:** The `@` in your password must be URL-encoded as `%40`

### Get Your Pooler Connection String from Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **"Connection string"**
5. Click the **"Connection pooling"** tab (NOT "URI")
6. Select **"Session mode"** or **"Transaction mode"**
7. Copy the connection string

It should look like:
```
postgresql://postgres.itzvbvajukjrveqzulvj:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### Or Use This Format (If You Know Your Region)

Replace `[REGION]` with your Supabase region (e.g., `eu-central-1`, `us-east-1`, `ap-southeast-1`):

```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

**Common regions:**
- `eu-central-1` (Europe - Central)
- `us-east-1` (US - East)
- `ap-southeast-1` (Asia - Southeast)

### Quick Fix: Try This Connection String

If you're in Europe, try this:
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

If that doesn't work, get the exact connection string from Supabase (see steps above).

---

## 📋 Steps to Add to Netlify

1. **First, get your pooler connection string from Supabase:**
   - Go to Supabase → Settings → Database
   - Click **"Connection pooling"** tab
   - Copy the connection string

2. **Format it correctly:**
   - Replace `[YOUR-PASSWORD]` with `Tumi%400681738466` (password with `@` encoded)
   - Make sure it has `?sslmode=require` at the end

3. **Add to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click on your site
   - Click **"Site settings"** → **"Environment variables"**
   - Edit `DATABASE_URL`
   - Paste the pooler connection string (port 6543, NOT 5432)
   - Click **"Save"**

4. **Redeploy:**
   - Go to **"Deploys"** → **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🔍 What Changed?

- ❌ `[YOUR-PASSWORD]` → ✅ `Tumi%400681738466` (password with `@` encoded as `%40`)
- ✅ Added `?sslmode=require` at the end (required for Supabase)

---

## 🧪 Test It First (Optional)

Before deploying, you can test if the connection string works:

```powershell
# Set the connection string
$env:DATABASE_URL = "postgresql://postgres:Tumi%400681738466@db.itzvbvajukjrveqzulvj.supabase.co:5432/postgres?sslmode=require"

# Test connection
npx prisma db pull
```

If this works, your connection string is correct!

---

## 🔍 Key Differences: Direct vs Pooler

| Feature | Direct (Port 5432) | Pooler (Port 6543) |
|---------|-------------------|-------------------|
| **Host** | `db.itzvbvajukjrveqzulvj.supabase.co` | `aws-0-[REGION].pooler.supabase.com` |
| **Username** | `postgres` | `postgres.itzvbvajukjrveqzulvj` |
| **Port** | `5432` | `6543` |
| **Works with Netlify?** | ❌ NO | ✅ YES |

**You MUST use the pooler connection (port 6543) for Netlify!**

---

## 🆘 Can't Find Your Region?

1. Go to Supabase → Settings → Database
2. Look at the connection string - it will show your region
3. Or check your project settings for the region/zone

**Once you have the pooler connection string from Supabase, paste it into Netlify! 🚀**
