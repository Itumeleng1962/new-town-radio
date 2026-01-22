# 🔧 Fix Local Database Connection

## ⚠️ The Error

```
Can't reach database server at `aws-0-eu-central-1.pooler.supabase.com:6543`
```

This means either:
- ❌ Wrong region (your project might not be in `eu-central-1`)
- ❌ Wrong connection string format in `.env`
- ❌ Network/firewall blocking the connection

---

## ✅ Solution: Get Correct Connection String from Supabase

### Step 1: Get Exact Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Click **"Connection pooling"** tab
5. Select **"Session mode"**
6. **Copy the ENTIRE connection string**

It should look like:
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Notice the region** - it might not be `eu-central-1`!

### Step 2: Check Your Project Region

The connection string will show your actual region. Common regions:
- `eu-central-1` (Europe - Central)
- `us-east-1` (US - East)
- `us-west-1` (US - West)
- `ap-southeast-1` (Asia - Southeast)

**Use the region from your Supabase connection string!**

### Step 3: Format the Connection String

1. **Replace `[YOUR-PASSWORD]`** with your actual password: `Tumi@0681738466`
2. **URL-encode the password:**
   - `@` → `%40`
   - So `Tumi@0681738466` → `Tumi%400681738466`
3. **Add `?sslmode=require` at the end**

**Example (if region is eu-central-1):**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Example (if region is us-east-1):**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

---

## 📝 Update Your .env File

### Step 1: Open .env File

Open your `.env` file in the project root directory.

### Step 2: Update DATABASE_URL

Find the line with `DATABASE_URL` and replace it with:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres?sslmode=require"
```

**Replace `[YOUR-REGION]` with your actual region from Supabase!**

**Important:**
- Use double quotes around the connection string
- Make sure the password is URL-encoded (`Tumi%400681738466`)
- Include `?sslmode=require` at the end

### Step 3: Save the File

Save the `.env` file.

---

## 🧪 Test the Connection

After updating `.env`, test it:

**PowerShell:**
```powershell
npx prisma db pull
```

**Bash:**
```bash
npx prisma db pull
```

**✅ Success:**
```
✔ Introspected X models and wrote them into schema.prisma in XXXms
```

**❌ Still failing?**
- Check the region in your connection string matches Supabase
- Verify password is URL-encoded
- Make sure `.env` file is in the project root
- Check for typos in the connection string

---

## 🔍 Find Your Correct Region

### Method 1: From Supabase Connection String

The connection string from Supabase will show your region:
```
aws-0-eu-central-1.pooler.supabase.com  ← Region is "eu-central-1"
aws-0-us-east-1.pooler.supabase.com     ← Region is "us-east-1"
```

### Method 2: From Supabase Project Settings

1. Go to Supabase → Settings → General
2. Look for **"Region"** or **"Zone"**
3. Common values: `eu-central-1`, `us-east-1`, `us-west-1`, `ap-southeast-1`

---

## 📋 Complete .env File Example

Your `.env` file should look like this:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE="
```

**Important:** Replace `eu-central-1` with your actual region!

---

## 🆘 Still Not Working?

### Issue 1: Wrong Region

**Solution:** Get the exact region from Supabase connection string and use it.

### Issue 2: Firewall/Network Blocking

**Solution:** 
- Check if your network/firewall allows outbound connections to port 6543
- Try from a different network
- Check if your ISP blocks database connections

### Issue 3: Connection String Format

**Common mistakes:**
- ❌ Missing quotes: `DATABASE_URL=postgresql://...`
- ✅ Correct: `DATABASE_URL="postgresql://..."`

- ❌ Password not URL-encoded: `Tumi@0681738466`
- ✅ Correct: `Tumi%400681738466`

- ❌ Missing SSL mode: `...postgres`
- ✅ Correct: `...postgres?sslmode=require`

### Issue 4: .env File Location

Make sure `.env` is in the project root (same directory as `package.json`).

---

## ✅ Quick Checklist

- [ ] Got connection string from Supabase "Connection pooling" tab
- [ ] Identified the correct region from the connection string
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] URL-encoded password (`@` → `%40`)
- [ ] Added `?sslmode=require` at the end
- [ ] Updated `.env` file with correct connection string
- [ ] Used double quotes around the connection string
- [ ] Saved `.env` file
- [ ] Tested with `npx prisma db pull`
- [ ] Connection works locally

---

## 🎯 Next Steps

Once the local connection works:

1. **Use the SAME connection string in Netlify:**
   - Go to Netlify → Site settings → Environment variables
   - Edit `DATABASE_URL`
   - Paste the exact same connection string that worked locally
   - Save

2. **Redeploy:**
   - Go to Deploys → Trigger deploy → Clear cache and deploy site

---

**The key is using the correct region from your Supabase connection string! 🌍**
