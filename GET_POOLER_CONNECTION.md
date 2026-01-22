# 🔧 Get Pooler Connection String from Supabase

The error "Can't reach database server" means you need to use the **pooler connection** (port 6543) instead of the direct connection (port 5432).

---

## ✅ Step-by-Step: Get Pooler Connection String

### Step 1: Go to Supabase Dashboard

1. Open [https://app.supabase.com](https://app.supabase.com)
2. Sign in
3. Select your project

### Step 2: Navigate to Database Settings

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"Database"** in the settings menu

### Step 3: Find Connection Pooling

1. Scroll down to **"Connection string"** section
2. You'll see tabs: **"URI"**, **"Connection pooling"**, **"JDBC"**, etc.
3. **Click the "Connection pooling" tab** ⬅️ IMPORTANT!

### Step 4: Select Pooling Mode

You'll see options like:
- **Session mode** (recommended for most cases)
- **Transaction mode**

**Choose "Session mode"** (or either one - both work)

### Step 5: Copy the Connection String

You'll see a connection string that looks like:

```
postgresql://postgres.itzvbvajukjrveqzulvj:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Notice:**
- Username: `postgres.itzvbvajukjrveqzulvj` (has your project ref)
- Host: `aws-0-[REGION].pooler.supabase.com` (pooler, not direct)
- Port: `6543` (pooler port, not 5432)

### Step 6: Format It for Netlify

1. Copy the connection string
2. Replace `[YOUR-PASSWORD]` with your actual password
3. **URL-encode special characters** in your password:
   - `@` → `%40`
   - `#` → `%23`
   - etc.
4. **Add `?sslmode=require` at the end**

**Example:**
- Your password: `Tumi@0681738466`
- URL-encoded: `Tumi%400681738466`
- Final connection string:
  ```
  postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
  ```

---

## 📋 Quick Checklist

- [ ] Went to Supabase → Settings → Database
- [ ] Clicked **"Connection pooling"** tab (NOT "URI")
- [ ] Selected "Session mode"
- [ ] Copied the connection string
- [ ] Replaced `[YOUR-PASSWORD]` with my password
- [ ] URL-encoded special characters (`@` → `%40`)
- [ ] Added `?sslmode=require` at the end
- [ ] Updated `DATABASE_URL` in Netlify
- [ ] Triggered new deploy

---

## 🎯 What to Look For

**✅ CORRECT (Pooler - Use This):**
```
postgresql://postgres.itzvbvajukjrveqzulvj:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```
- Has `.pooler.supabase.com` in hostname
- Port is `6543`
- Username includes project ref: `postgres.itzvbvajukjrveqzulvj`

**❌ WRONG (Direct - Don't Use for Netlify):**
```
postgresql://postgres:password@db.itzvbvajukjrveqzulvj.supabase.co:5432/postgres
```
- Has `db.xxx.supabase.co` in hostname
- Port is `5432`
- Username is just `postgres`

---

## 🆘 Still Can't Find It?

### Alternative: Check Your Project Settings

1. In Supabase, go to **Settings** → **General**
2. Look for **"Reference ID"** or **"Project URL"**
3. Your project ref is: `itzvbvajukjrveqzulvj`

### Manual Construction (If Needed)

If you know your region, you can construct it manually:

```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

**Common regions:**
- `eu-central-1` (Europe)
- `us-east-1` (US East)
- `us-west-1` (US West)
- `ap-southeast-1` (Asia)

**Try `eu-central-1` first** (most common for new projects):
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

---

**Once you have the pooler connection string, update it in Netlify and redeploy! 🚀**
