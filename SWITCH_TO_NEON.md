# 🚀 Switch from Supabase to Neon PostgreSQL

## Why Neon?

- ✅ **Free tier** with generous limits
- ✅ **Serverless PostgreSQL** - perfect for Netlify
- ✅ **Easy setup** - no connection pooling issues
- ✅ **Works great with Prisma**
- ✅ **No IPv4/IPv6 issues**

---

## Step 1: Create Neon Account

1. Go to [https://neon.tech](https://neon.tech)
2. Click **"Sign up"** (or "Start free")
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

---

## Step 2: Create a New Project

1. Once logged in, click **"Create a project"**
2. Fill in:
   - **Project name:** `radio-station` (or any name)
   - **Region:** Choose closest to you (e.g., "US East", "EU West")
   - **PostgreSQL version:** 15 or 16 (both work)
3. Click **"Create project"**
4. Wait 1-2 minutes for setup

---

## Step 3: Get Connection String

1. Once project is ready, you'll see the dashboard
2. Look for **"Connection string"** section
3. You'll see a connection string like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copy this connection string** - you'll need it!

**Note:** Neon provides the connection string ready to use - no need for connection pooling or special formatting!

---

## Step 4: Update Your .env File

1. Open your `.env` file
2. Replace `DATABASE_URL` with your Neon connection string:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="G5JQxfwFI0vZlA5iEK8dWOlVOEAVQ7hlmdYLYbZB3hE="
```

**Important:**
- Use the **exact** connection string from Neon
- Keep the double quotes
- Neon connection strings already include `?sslmode=require`

---

## Step 5: Run Database Migrations

1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Run migrations to create tables:**
   ```bash
   npx prisma migrate deploy
   ```

   Or for development:
   ```bash
   npx prisma migrate dev --name initial
   ```

3. **Verify connection:**
   ```bash
   npx prisma db pull
   ```

If this works, your connection is successful! ✅

---

## Step 6: Test Your App Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test your app.

---

## Step 7: Update Netlify Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site
3. Go to **Site settings** → **Environment variables**
4. Find `DATABASE_URL`
5. Click **"Edit"**
6. Replace with your **Neon connection string** (the same one from Step 3)
7. Click **"Save"**

---

## Step 8: Redeploy on Netlify

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete
4. Your site should now work! 🎉

---

## ✅ Advantages of Neon

1. **No connection pooling issues** - works directly
2. **No IPv4/IPv6 problems** - just works
3. **Simple connection string** - copy and paste
4. **Free tier includes:**
   - 0.5 GB storage
   - Unlimited projects
   - Branching (database branching for dev/staging)
   - Automatic backups

---

## 🔄 Alternative: Railway

If you prefer Railway:

1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Provision PostgreSQL"**
5. Copy the connection string from the **"Variables"** tab
6. Use it the same way as Neon

---

## 🔄 Alternative: Render

If you prefer Render:

1. Go to [https://render.com](https://render.com)
2. Sign up
3. Click **"New +"** → **"PostgreSQL"**
4. Fill in details and create
5. Copy the **"Internal Database URL"** or **"External Database URL"**
6. Use it the same way

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

## 🆘 Troubleshooting

### Issue: "Can't reach database server"

**Solution:**
- Make sure you copied the connection string correctly
- Check if your Neon project is active (not paused)
- Verify the connection string has `?sslmode=require`

### Issue: "Authentication failed"

**Solution:**
- Check your password in the connection string
- Neon passwords might have special characters - make sure they're URL-encoded if needed
- Try resetting the password in Neon dashboard

### Issue: "Database does not exist"

**Solution:**
- Neon creates a default database called `neondb`
- Make sure your connection string uses `neondb` as the database name
- Or create a new database in Neon and use that name

---

## 💡 Pro Tips

1. **Neon Dashboard:**
   - You can view your data in the Neon dashboard
   - Go to your project → "Tables" to see your schema
   - Use "SQL Editor" to run queries

2. **Database Branching:**
   - Neon supports database branching (like Git branches)
   - Great for testing changes without affecting production

3. **Automatic Backups:**
   - Neon automatically backs up your database
   - You can restore from backups if needed

---

**Neon is much simpler than Supabase for this use case - no connection pooling headaches! 🚀**
