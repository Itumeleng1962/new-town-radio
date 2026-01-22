# ✅ Get Pooler Connection String from Supabase

## ⚠️ What You Have (Direct Connection - WRONG for Netlify)

```
postgresql://postgres:[YOUR-PASSWORD]@db.ykfnpohsvgztpucvgoyl.supabase.co:5432/postgres
```

**This is the DIRECT connection (port 5432) - it won't work with Netlify!**

---

## ✅ What You Need (Pooler Connection - CORRECT for Netlify)

You need the **pooler connection** (port 6543) instead.

---

## 📋 Step-by-Step: Get Pooler Connection String

### Step 1: Go to Supabase Dashboard

1. Open [https://app.supabase.com](https://app.supabase.com)
2. Sign in
3. Select your project

### Step 2: Navigate to Database Settings

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"Database"** in the settings menu

### Step 3: Find Connection String Section

1. Scroll down to **"Connection string"** section
2. You'll see multiple tabs: **"URI"**, **"Connection pooling"**, **"JDBC"**, etc.

### Step 4: Click "Connection pooling" Tab ⬅️ IMPORTANT!

**DO NOT use the "URI" tab!** You need the **"Connection pooling"** tab.

### Step 5: Select Pooling Mode

You'll see options like:
- **Session mode** (recommended)
- **Transaction mode**

**Choose "Session mode"**

### Step 6: Copy the Connection String

You'll see a connection string that looks like:

```
postgresql://postgres.ykfnpohsvgztpucvgoyl:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Notice the differences:**
- ✅ Username: `postgres.ykfnpohsvgztpucvgoyl` (has project ref)
- ✅ Host: `aws-0-[REGION].pooler.supabase.com` (pooler, not direct)
- ✅ Port: `6543` (pooler port, not 5432)

---

## 🔧 Format It Correctly

### Step 1: Copy the Pooler Connection String

From Supabase, you should have something like:
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### Step 2: Replace [YOUR-PASSWORD]

Replace `[YOUR-PASSWORD]` with your actual database password: `Tumi@0681738466`

### Step 3: URL-Encode Special Characters

Your password `Tumi@0681738466` contains `@`, which must be URL-encoded as `%40`:

- `Tumi@0681738466` → `Tumi%400681738466`

### Step 4: Add SSL Mode

Add `?sslmode=require` at the end.

### Final Connection String:

```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Note:** Replace `eu-central-1` with your actual region if different.

---

## 🔍 Key Differences: Direct vs Pooler

| Feature | Direct (What You Have) | Pooler (What You Need) |
|---------|------------------------|------------------------|
| **Tab in Supabase** | "URI" | "Connection pooling" |
| **Username** | `postgres` | `postgres.ykfnpohsvgztpucvgoyl` |
| **Host** | `db.ykfnpohsvgztpucvgoyl.supabase.co` | `aws-0-[REGION].pooler.supabase.com` |
| **Port** | `5432` | `6543` |
| **Works with Netlify?** | ❌ NO | ✅ YES |

---

## 📋 Quick Checklist

- [ ] Went to Supabase → Settings → Database
- [ ] Clicked **"Connection pooling"** tab (NOT "URI")
- [ ] Selected "Session mode"
- [ ] Copied the connection string
- [ ] Replaced `[YOUR-PASSWORD]` with my actual password
- [ ] URL-encoded special characters (`@` → `%40`)
- [ ] Added `?sslmode=require` at the end
- [ ] Verified username includes project ref: `postgres.ykfnpohsvgztpucvgoyl`
- [ ] Verified port is `6543` (not `5432`)
- [ ] Verified host has `.pooler.supabase.com` (not `.supabase.co`)

---

## 🧪 Test It Locally First

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

If this works, use the same connection string in Netlify!

---

## 🆘 Can't Find "Connection pooling" Tab?

### Option 1: Check Your Supabase Version

Some older Supabase projects might not show the pooling tab. In that case:

1. Go to **Settings** → **Database**
2. Look for **"Connection pooling"** section
3. It might be under a different name like **"Connection string"** → **"Pooling"**

### Option 2: Manual Construction

If you know your region, construct it manually:

**Format:**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

**Your values:**
- Project reference: `ykfnpohsvgztpucvgoyl`
- Password: `Tumi@0681738466` → URL-encoded: `Tumi%400681738466`
- Region: Try `eu-central-1` first (most common)

**Try this:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**If `eu-central-1` doesn't work, try:**
- `us-east-1`
- `us-west-1`
- `ap-southeast-1`

---

## ✅ Final Steps

1. **Get the pooler connection string** from Supabase (see steps above)
2. **Format it correctly** (replace password, URL-encode, add SSL)
3. **Test it locally** (optional but recommended)
4. **Update Netlify:**
   - Go to Netlify → Site settings → Environment variables
   - Edit `DATABASE_URL`
   - Paste the pooler connection string
   - Save
5. **Redeploy:**
   - Go to Deploys → Trigger deploy → Clear cache and deploy site

---

**The key is using the "Connection pooling" tab, not the "URI" tab! 🚀**
