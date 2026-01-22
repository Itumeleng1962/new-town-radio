# 🔧 Fix Port and Credentials Issues

## ⚠️ Two Problems Found

1. **Wrong Port:** You're using `5432` but need `6543` for pooler
2. **Wrong Username/Password:** "Tenant or user not found" error

---

## ✅ Solution

### Step 1: Get Correct Connection String from Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Settings → Database
3. Click **"Connection pooling"** tab (NOT "URI")
4. Select **"Session mode"**
5. Copy the connection string

It should look like:
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:[YOUR-PASSWORD]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres
```

**Notice:**
- ✅ Region: `eu-north-1` (this is correct based on your error)
- ✅ Port: `6543` (pooler port - NOT 5432!)
- ✅ Username: `postgres.ykfnpohsvgztpucvgoyl` (with project ref)

### Step 2: Format the Connection String

1. **Replace `[YOUR-PASSWORD]`** with your actual password: `Tumi@0681738466`
2. **URL-encode the password:**
   - `@` → `%40`
   - So `Tumi@0681738466` → `Tumi%400681738466`
3. **Add `?sslmode=require` at the end**

**Correct connection string:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Key points:**
- ✅ Port: `6543` (NOT `5432`)
- ✅ Username: `postgres.ykfnpohsvgztpucvgoyl` (with project ref)
- ✅ Password: `Tumi%400681738466` (URL-encoded)
- ✅ Region: `eu-north-1`

### Step 3: Update Your .env File

Open your `.env` file and update `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

**Important:**
- Use double quotes
- Port must be `6543` (not `5432`)
- Username must include project ref: `postgres.ykfnpohsvgztpucvgoyl`
- Password must be URL-encoded: `Tumi%400681738466`

### Step 4: Verify Your Password

If you're still getting "Tenant or user not found" after fixing the port:

1. Go to Supabase → Settings → Database
2. Check if you see your database password
3. If not, or if you're unsure:
   - Click **"Reset database password"**
   - **SAVE THE NEW PASSWORD**
   - Update your connection string with the new password
   - URL-encode it if it has special characters

### Step 5: Test Again

After updating `.env`, test:

```bash
npx prisma db pull
```

**✅ Success:**
```
✔ Introspected X models and wrote them into schema.prisma in XXXms
```

**❌ Still "Tenant or user not found"?**
- Verify password is correct
- Make sure password is URL-encoded
- Check username includes project ref

---

## 🔍 Common Mistakes

### Mistake 1: Wrong Port

❌ **WRONG:**
```
...@aws-0-eu-north-1.pooler.supabase.com:5432/postgres
```

✅ **CORRECT:**
```
...@aws-0-eu-north-1.pooler.supabase.com:6543/postgres
```

**The pooler connection MUST use port 6543!**

### Mistake 2: Wrong Username Format

❌ **WRONG:**
```
postgresql://postgres:Tumi%400681738466@...
```

✅ **CORRECT:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@...
```

**Username MUST include your project reference!**

### Mistake 3: Password Not URL-Encoded

❌ **WRONG:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi@0681738466@...
```

✅ **CORRECT:**
```
postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@...
```

**The `@` in the password must be encoded as `%40`!**

---

## 📋 Complete .env File Example

Your `.env` file should look like this:

```env
DATABASE_URL="postgresql://postgres.ykfnpohsvgztpucvgoyl:Tumi%400681738466@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE="
```

**Double-check:**
- ✅ Port is `6543` (not `5432`)
- ✅ Username is `postgres.ykfnpohsvgztpucvgoyl` (with project ref)
- ✅ Password is `Tumi%400681738466` (URL-encoded)
- ✅ Region is `eu-north-1`
- ✅ Has `?sslmode=require` at the end

---

## ✅ Quick Checklist

- [ ] Got connection string from Supabase "Connection pooling" tab
- [ ] Verified port is `6543` (not `5432`)
- [ ] Verified username includes project ref: `postgres.ykfnpohsvgztpucvgoyl`
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] URL-encoded password (`@` → `%40`)
- [ ] Added `?sslmode=require` at the end
- [ ] Updated `.env` file with correct connection string
- [ ] Saved `.env` file
- [ ] Tested with `npx prisma db pull`
- [ ] Connection works!

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

**The main issues are: port must be 6543 (not 5432) and username must include project ref! 🔧**
