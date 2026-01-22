# 🧪 Test Database Connection Locally

## ⚠️ Your Command Had Two Issues

1. **Wrong syntax:** You used PowerShell syntax (`$env:`) in bash
2. **Incomplete connection string:** Missing password and wrong format

---

## ✅ Correct Commands

### If You're in PowerShell (Windows):

```powershell
$env:DATABASE_URL = "postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

### If You're in Bash (Linux/Mac/Git Bash):

```bash
export DATABASE_URL="postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

---

## 🔍 Your Connection String Issues

**What you tried:**
```
postgresql://postgres:Tuykfnpohsvgztpucvgoyl.supabase.co:5432/postgres?sslmode=require
```

**Problems:**
1. ❌ Missing password (should be after `postgres:`)
2. ❌ Wrong host format (`Tuykfnpohsvgztpucvgoyl.supabase.co` - this looks like a project ref, not a host)
3. ❌ Wrong port (`5432` - should be `6543` for pooler)
4. ❌ Wrong username format (should be `postgres.itzvbvajukjrveqzulvj`)

---

## ✅ Correct Connection String Format

**For Pooler (Port 6543) - Use This:**
```
postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Breakdown:**
- Username: `postgres.itzvbvajukjrveqzulvj` (your project ref)
- Password: `Tumi%400681738466` (URL-encoded: `@` → `%40`)
- Host: `aws-0-eu-central-1.pooler.supabase.com` (pooler)
- Port: `6543` (pooler port)
- Database: `postgres`
- SSL: `?sslmode=require`

---

## 📋 Step-by-Step Test

### Step 1: Get Your Correct Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Settings → Database
3. Click **"Connection pooling"** tab
4. Select **"Session mode"**
5. Copy the connection string

### Step 2: Format It

Replace `[YOUR-PASSWORD]` with your actual password and URL-encode it:
- Password: `Tumi@0681738466`
- URL-encoded: `Tumi%400681738466`

### Step 3: Test in Your Terminal

**PowerShell:**
```powershell
$env:DATABASE_URL = "postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

**Bash:**
```bash
export DATABASE_URL="postgresql://postgres.itzvbvajukjrveqzulvj:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
npx prisma db pull
```

### Step 4: Check Results

**✅ Success:**
```
Introspecting based on datasource defined in prisma/schema.prisma
✔ Introspected 12 models and wrote them into schema.prisma in XXXms
```

**❌ Failure:**
- If you get "Tenant or user not found" → Check password
- If you get "Can't reach database" → Check connection string format
- If you get "SSL required" → Make sure `?sslmode=require` is at the end

---

## 🔑 Important Notes

1. **Password must be URL-encoded:**
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - etc.

2. **Use pooler connection for Netlify:**
   - Port: `6543` (not `5432`)
   - Host: `aws-0-[REGION].pooler.supabase.com` (not `db.xxx.supabase.co`)

3. **Username must include project ref:**
   - `postgres.itzvbvajukjrveqzulvj` (not just `postgres`)

---

## 🆘 Still Having Issues?

### Verify Your Password

1. Go to Supabase → Settings → Database
2. Check if you see your database password
3. If not, reset it: Click "Reset database password"
4. **SAVE THE NEW PASSWORD**
5. Update your connection string

### Get Exact Connection String from Supabase

The easiest way is to copy it directly from Supabase:
1. Supabase → Settings → Database
2. "Connection pooling" tab
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your actual password
5. URL-encode special characters
6. Add `?sslmode=require` if not already there

---

**Once the local test works, use the SAME connection string in Netlify! 🚀**
