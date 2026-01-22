# 🔧 Update .env to Use Neon

## ⚠️ Current Problem

Your `.env` file still has Supabase connection string:
```
DATABASE_URL="postgresql://postgres:Tumi%4017341@db.xkzxjetmoxgwrtxejvqc.supabase.co:6543/postgres"
```

You need to replace it with your **Neon connection string**.

---

## ✅ Step 1: Get Your Neon Connection String

1. Go to [Neon Dashboard](https://console.neon.tech)
2. Select your project
3. Look for **"Connection string"** section
4. Copy the connection string (it looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
5. **Copy the entire string**

---

## ✅ Step 2: Update Your .env File

1. Open your `.env` file in a text editor
2. Find this line:
   ```env
   DATABASE_URL="postgresql://postgres:Tumi%4017341@db.xkzxjetmoxgwrtxejvqc.supabase.co:6543/postgres"
   ```
3. **Replace it** with your Neon connection string:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```
   (Use your actual Neon connection string)

4. **Save the file**

---

## ✅ Step 3: Test the Connection

After updating `.env`, test it:

```bash
npx prisma db pull
```

**✅ Success:** You'll see "Introspected X models..."

**❌ Still error:** Make sure you:
- Copied the entire Neon connection string
- Used double quotes
- Saved the file

---

## ✅ Step 4: Run Migrations

Once connection works:

```bash
npx prisma generate
npx prisma migrate deploy
```

---

## 🆘 Don't Have Neon Account Yet?

1. Go to [neon.tech](https://neon.tech)
2. Sign up (free)
3. Create a project
4. Copy the connection string
5. Then follow steps above

---

**Once you update .env with Neon connection string, everything will work! 🚀**
