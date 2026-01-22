# 🔧 Fix "Can't Reach Database Server" Error

## ✅ Good Progress!

You've fixed the port (now using `6543`), but now getting "Can't reach database server". This could be:

1. **Network/firewall blocking the connection**
2. **Connection string format issue**
3. **Supabase project paused or pooler not enabled**
4. **Connection string missing required parts**

---

## ✅ Solution: Verify Connection String Format

### Step 1: Check Your .env File

Open your `.env` file and verify the `DATABASE_URL` looks exactly like this:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

**Check for:**
- ✅ Double quotes around the entire string
- ✅ Username: `postgres.ykfnpohsvgztpucvgoyl` (with project ref)
- ✅ Password: `Tumi%400681738466` (URL-encoded)
- ✅ Host: `aws-0-eu-north-1.pooler.supabase.com`
- ✅ Port: `6543`
- ✅ Database: `postgres`
- ✅ SSL: `?sslmode=require` at the end

### Step 2: Get Fresh Connection String from Supabase

Sometimes the connection string format needs to be copied directly:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Settings → Database
3. Click **"Connection pooling"** tab
4. Select **"Session mode"**
5. **Copy the ENTIRE connection string** (don't modify it manually)

### Step 3: Format It Correctly

1. **Replace `[YOUR-PASSWORD]`** with your actual password: `Tumi@0681738466`
2. **URL-encode the password:**
   - `@` → `%40`
   - So `Tumi@0681738466` → `Tumi%400681738466`
3. **Make sure `?sslmode=require` is at the end**

### Step 4: Update .env File

Replace the `DATABASE_URL` in your `.env` file with the correctly formatted string.

---

## 🔍 Common Issues

### Issue 1: Missing Quotes

❌ **WRONG:**
```env
DATABASE_URL=postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require
```

✅ **CORRECT:**
```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

### Issue 2: Password Encoding Issue

If your password has special characters, make sure they're all URL-encoded:

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

### Issue 3: Network/Firewall Blocking

If you're behind a firewall or corporate network:

1. **Try from a different network** (mobile hotspot, different WiFi)
2. **Check if your firewall blocks port 6543**
3. **Try using a VPN** if available

### Issue 4: Supabase Project Status

1. Go to Supabase Dashboard
2. Check if your project shows as **"Active"**
3. If paused, resume it
4. Check if connection pooling is enabled (should be by default)

---

## 🧪 Alternative: Test with Direct Connection First

If the pooler connection doesn't work locally, you can test with the direct connection first (just for testing, not for Netlify):

1. Go to Supabase → Settings → Database
2. Click **"URI"** tab (not "Connection pooling")
3. Copy the direct connection string
4. Format it with your password
5. Test locally

**Note:** Direct connection (port 5432) won't work with Netlify, but it can help verify your credentials are correct.

If direct connection works but pooler doesn't:
- The issue is with the pooler connection format
- Get the exact pooler connection string from Supabase
- Make sure you're using "Session mode" not "Transaction mode"

---

## 🔄 Try Different Pooling Modes

In Supabase, try both pooling modes:

1. **Session mode** (recommended)
2. **Transaction mode**

Copy the connection string for each and test both.

---

## 📋 Debugging Steps

### Step 1: Verify Connection String Format

Print your connection string (without password) to verify format:

**PowerShell:**
```powershell
# Check what's in your .env (without showing password)
Get-Content .env | Select-String "DATABASE_URL"
```

**Bash:**
```bash
# Check what's in your .env (without showing password)
grep DATABASE_URL .env
```

### Step 2: Test Connection String Manually

Try connecting with a PostgreSQL client to verify the connection string works:

**Using psql (if installed):**
```bash
psql "postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

### Step 3: Check Supabase Dashboard

1. Go to Supabase → Settings → Database
2. Check **"Connection pooling"** section
3. Verify it's enabled
4. Check if there are any warnings or errors

---

## 🆘 Still Not Working?

### Option 1: Reset Database Password

1. Go to Supabase → Settings → Database
2. Click **"Reset database password"**
3. **SAVE THE NEW PASSWORD**
4. Update your connection string with the new password
5. URL-encode it
6. Test again

### Option 2: Check Project Region

Make sure you're using the correct region:

1. Go to Supabase → Settings → General
2. Check **"Region"** or **"Zone"**
3. Verify it matches `eu-north-1` in your connection string

### Option 3: Contact Supabase Support

If nothing works:
1. Check Supabase status page for outages
2. Contact Supabase support
3. Check Supabase community forums

---

## ✅ Complete .env File Example

Your `.env` file should look exactly like this:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE="
```

**Important:** 
- Use double quotes
- No extra spaces
- Password must be URL-encoded
- Port must be 6543

---

## 🎯 Quick Checklist

- [ ] Got fresh connection string from Supabase "Connection pooling" tab
- [ ] Verified port is `6543`
- [ ] Verified username includes project ref
- [ ] Password is correct and URL-encoded
- [ ] Connection string has `?sslmode=require` at the end
- [ ] `.env` file uses double quotes
- [ ] Saved `.env` file
- [ ] Tested connection
- [ ] Checked Supabase project is active
- [ ] Tried from different network (if firewall issue)

---

**The connection string format looks correct now. If it still doesn't work, it might be a network/firewall issue. Try from a different network or check your firewall settings! 🔧**
