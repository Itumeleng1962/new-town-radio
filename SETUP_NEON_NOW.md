# 🚀 Setup Neon Database - Step by Step

## Step 1: Create Neon Account

1. Go to **[https://neon.tech](https://neon.tech)**
2. Click **"Sign up"** or **"Start free"**
3. Sign up with:
   - GitHub (easiest)
   - Google
   - Email
4. Verify your email if needed

---

## Step 2: Create New Project

1. Once logged in, click **"Create a project"** button
2. Fill in:
   - **Project name:** `radio-station` (or any name you like)
   - **Region:** Choose closest to you:
     - `US East` (Virginia) - good for US
     - `EU West` (Ireland) - good for Europe
     - `AP Southeast` (Singapore) - good for Asia
   - **PostgreSQL version:** `15` or `16` (both work fine)
3. Click **"Create project"**
4. Wait 1-2 minutes for setup

---

## Step 3: Get Connection String

1. Once project is ready, you'll see the dashboard
2. Look for **"Connection string"** section (usually at the top)
3. You'll see something like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Click the copy button** or select and copy the entire connection string
5. **SAVE THIS** - you'll need it!

**Note:** Neon connection strings are ready to use - no special formatting needed!

---

## Step 4: Update Your .env File

1. Open your `.env` file in the project root
2. Find the `DATABASE_URL` line
3. **Replace it** with your Neon connection string:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE="
```

**Important:**
- Use **double quotes** around the connection string
- Use the **exact** connection string from Neon (don't modify it)
- Neon already includes `?sslmode=require` at the end

4. **Save the file**

---

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma client for your database.

---

## Step 6: Run Database Migrations

This creates all your tables in Neon:

```bash
npx prisma migrate deploy
```

**Or for development:**
```bash
npx prisma migrate dev --name initial
```

---

## Step 7: Verify Connection

Test that everything works:

```bash
npx prisma db pull
```

**✅ Success:** You'll see "Introspected X models..."

**❌ Error:** Check your connection string is correct

---

## Step 8: Test Your App Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test your app.

---

## Step 9: Update Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site
3. Go to **Site settings** → **Environment variables**
4. Find `DATABASE_URL`
5. Click **"Edit"**
6. **Paste your Neon connection string** (same one from Step 3)
7. Click **"Save"**

---

## Step 10: Redeploy on Netlify

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete
4. Your site should now work! 🎉

---

## ✅ That's It!

You're done! Neon is much simpler than Supabase:
- ✅ No connection pooling issues
- ✅ No IPv4/IPv6 problems
- ✅ Just copy and paste the connection string
- ✅ Works immediately

---

## 🆘 Troubleshooting

### Issue: "Can't reach database server"

**Solution:**
- Make sure you copied the connection string correctly
- Check if your Neon project is active (not paused)
- Verify the connection string has `?sslmode=require`

### Issue: "Authentication failed"

**Solution:**
- Check your password in the connection string
- Neon passwords might have special characters - they should be URL-encoded in the connection string (Neon does this automatically)

### Issue: "Database does not exist"

**Solution:**
- Neon creates a default database called `neondb`
- Make sure your connection string uses `neondb` as the database name
- Or create a new database in Neon and use that name

---

## 📋 Quick Checklist

- [ ] Created Neon account
- [ ] Created new project in Neon
- [ ] Copied connection string from Neon
- [ ] Updated `.env` file with Neon connection string
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma migrate deploy`
- [ ] Tested connection with `npx prisma db pull`
- [ ] Tested app locally (`npm run dev`)
- [ ] Updated `DATABASE_URL` in Netlify
- [ ] Redeployed on Netlify
- [ ] Site is working! 🎉

---

**Follow these steps and you'll be done in 10 minutes! 🚀**
