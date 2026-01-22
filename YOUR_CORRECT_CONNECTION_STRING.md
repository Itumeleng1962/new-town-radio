# ✅ Your Correct Connection String for Netlify

## Current Connection String (WRONG for Netlify)

You're currently using:
```
postgresql://postgres:[YOUR-PASSWORD]@db.itzvbvajukjrveqzulvj.supabase.co:5432/postgres
```

**This is the DIRECT connection (port 5432) - it doesn't work with Netlify!**

---

## ✅ CORRECT Connection String (Pooler - Port 6543)

You need to use the **POOLER connection** instead. Here's how to get it:

### Method 1: Get It from Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **"Connection string"** section
5. **Click the "Connection pooling" tab** (NOT "URI")
6. Select **"Session mode"**
7. Copy the connection string

It should look like:
```
postgresql://postgres.itzvbvajukjrveqzulvj:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### Method 2: Construct It Manually

If you can't find it in the dashboard, construct it manually:

**Format:**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

**Your values:**
- Project reference: `itzvbvajukjrveqzulvj`
- Password: `Tumi@0681738466` (needs URL encoding: `Tumi%400681738466`)
- Region: Try `eu-central-1` first (most common)

**Try this connection string:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

If `eu-central-1` doesn't work, try:
- `us-east-1`
- `us-west-1`
- `ap-southeast-1`

---

## 🔍 Key Differences

| Feature | Direct (Current - WRONG) | Pooler (Needed - CORRECT) |
|---------|-------------------------|--------------------------|
| **Host** | `db.itzvbvajukjrveqzulvj.supabase.co` | `aws-0-[REGION].pooler.supabase.com` |
| **Username** | `postgres` | `postgres.itzvbvajukjrveqzulvj` |
| **Port** | `5432` | `6543` |
| **Works with Netlify?** | ❌ NO | ✅ YES |

---

## 📋 Steps to Update Netlify

1. **Get or construct the pooler connection string** (see above)

2. **Go to Netlify:**
   - [Netlify Dashboard](https://app.netlify.com)
   - Your site → **Site settings** → **Environment variables**

3. **Update DATABASE_URL:**
   - Find `DATABASE_URL`
   - Click **"Edit"**
   - Replace with the pooler connection string (port 6543)
   - Click **"Save"**

4. **Redeploy:**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🧪 Test Connection String (Optional)

Before deploying, test if it works:

```powershell
# Set the connection string
$env:DATABASE_URL = "postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Test connection
npx prisma db pull
```

If this works, your connection string is correct!

---

## 🆘 Can't Find Your Region?

### Option 1: Check Supabase Project Settings

1. Go to Supabase → **Settings** → **General**
2. Look for **"Region"** or **"Zone"**
3. Common values: `eu-central-1`, `us-east-1`, `us-west-1`, `ap-southeast-1`

### Option 2: Try Common Regions

Try these connection strings one by one:

**Europe (Most Common):**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**US East:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**US West:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Asia:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require
```

---

## ✅ Final Connection String Format

**Your password:** `Tumi@0681738466`  
**URL-encoded password:** `Tumi%400681738466`

**Complete connection string (replace [REGION] with your actual region):**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

**Try `eu-central-1` first:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

---

**Copy the connection string above (with eu-central-1) and paste it into Netlify's DATABASE_URL! 🚀**
