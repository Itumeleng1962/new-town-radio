# Complete Deployment Guide: PowerShell Edition (Windows)

This is your complete, step-by-step guide to deploy your radio station website to Netlify - **Windows PowerShell version**.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js installed (version 20 or higher) - [Download here](https://nodejs.org/)
- [ ] A GitHub account
- [ ] A Supabase account (free tier works)
- [ ] A Netlify account (free tier works)

---

## STEP 1: Set Up PostgreSQL Database (Supabase)

### 1.1 Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

### 1.2 Create New Project
1. Click **"New Project"**
2. Fill in:
   - **Name:** `radio-station` (or any name)
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you (e.g., "South Africa" or "Europe")
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

### 1.3 Get Connection String
1. Once project is ready, go to **Settings** (gear icon in left sidebar)
2. Click **"Database"**
3. Scroll down to **"Connection string"**
4. Click **"URI"** tab
5. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
6. **IMPORTANT:** Add `?sslmode=require` at the end:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
   ```
7. **SAVE THIS** - you'll need it later!

---

## STEP 2: Prepare Your Code for GitHub

### 2.1 Check Your Files
Make sure these files exist in your project:
- ✅ `prisma/schema.prisma` (should have `provider = "postgresql"`)
- ✅ `netlify.toml`
- ✅ `package.json`
- ✅ `.gitignore`

### 2.2 Update Your Local .env File
1. Open your `.env` file (create it if it doesn't exist)
2. Add your Supabase connection string:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```
3. Replace `YOUR_PASSWORD` with your actual Supabase password
4. Replace the host with your actual Supabase host

### 2.3 Generate NEXTAUTH_SECRET (PowerShell)

**Option A: Using Node.js (Recommended)**
```powershell
node -e "const crypto = require('crypto'); console.log(crypto.randomBytes(32).toString('base64'));"
```

**Option B: Using PowerShell (If Node.js doesn't work)**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```
Then use an online base64 encoder, or use this PowerShell command:
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {Get-Random -Maximum 256})))
```

**Option C: Online Generator (Easiest)**
1. Go to [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
2. Copy the generated secret
3. Paste it as your `NEXTAUTH_SECRET` in `.env`

**Copy the output** and paste it as your `NEXTAUTH_SECRET` in `.env`

---

## STEP 3: Test Database Connection Locally

### 3.1 Generate Prisma Client
```powershell
npx prisma generate
```

### 3.2 Run Migrations
```powershell
npx prisma migrate deploy
```

If this is your first time, you might need to:
```powershell
npx prisma migrate dev --name initial
```

### 3.3 Test Your App Locally
```powershell
npm run dev
```

1. Open `http://localhost:3000`
2. Test that the site loads
3. Try registering a user (go to `/signup`)
4. Check that everything works

---

## STEP 4: Push Code to GitHub

### 4.1 Initialize Git (If Not Already Done)
```powershell
git init
```

### 4.2 Add All Files
```powershell
git add .
```

### 4.3 Create First Commit
```powershell
git commit -m "Initial commit - Ready for Netlify deployment"
```

### 4.4 Create GitHub Repository
1. Go to [https://github.com](https://github.com)
2. Click **"+"** (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `radio-station` (or your choice)
   - **Description:** "Newtown Radio Station Website"
   - **Visibility:** Choose Public or Private
   - **DO NOT** check "Initialize with README" (you already have files)
4. Click **"Create repository"**

### 4.5 Connect and Push
GitHub will show you commands. Use these (replace `YOUR-USERNAME`):

```powershell
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/radio-station.git
git push -u origin main
```

**If asked for credentials:**
- Use a Personal Access Token (not your password)
- Create one at: [github.com/settings/tokens](https://github.com/settings/tokens)
- Or use GitHub Desktop app (easier for Windows)

---

## STEP 5: Deploy to Netlify

### 5.1 Create Netlify Account
1. Go to [https://netlify.com](https://netlify.com)
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easiest)
4. Authorize Netlify to access your GitHub

### 5.2 Import Your Project
1. In Netlify dashboard, click **"Add new site"**
2. Click **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify (if needed)
5. Find and select your `radio-station` repository
6. Click **"Next"**

### 5.3 Configure Build Settings
Netlify should auto-detect Next.js, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- (These are already in `netlify.toml`, so should auto-fill)

Click **"Deploy site"**

### 5.4 Set Environment Variables
**IMPORTANT:** Do this BEFORE the build completes!

1. While build is running, click **"Site settings"** (or go to site → Settings)
2. Click **"Environment variables"** (in left sidebar)
3. Click **"Add variable"** and add these one by one:

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: `postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require`
   - (Use your actual Supabase connection string)

   **Variable 2:**
   - Key: `NEXTAUTH_URL`
   - Value: `https://your-site-name.netlify.app`
   - (Replace with your actual Netlify URL - you'll see it after first deploy)

   **Variable 3:**
   - Key: `NEXTAUTH_SECRET`
   - Value: `your-secret-from-step-2.3`
   - (The one you generated)

4. Click **"Save"** for each variable

### 5.5 Wait for Build
- First build takes 5-10 minutes
- You'll see progress in the deploy log
- If it fails, check the logs for errors

### 5.6 Update NEXTAUTH_URL
1. After first deploy, note your site URL (e.g., `https://amazing-site-123.netlify.app`)
2. Go to **Site settings** → **Environment variables**
3. Update `NEXTAUTH_URL` to your actual Netlify URL
4. Click **"Save"**
5. Go to **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

---

## STEP 6: Run Database Migrations

### 6.1 Check if Migrations Ran
The build command includes `prisma migrate deploy`, so migrations should run automatically.

### 6.2 Verify Tables Were Created
1. Go to Supabase dashboard
2. Click **"Table Editor"** (left sidebar)
3. You should see tables: `User`, `Show`, `Event`, `Product`, `Advertisement`, etc.

If tables don't exist:
1. Go to **SQL Editor** in Supabase
2. Run:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
3. If empty, migrations didn't run - see troubleshooting below

---

## STEP 7: Create Your Admin Account

### 7.1 Generate Password Hash
1. Go to [https://bcrypt-generator.com/](https://bcrypt-generator.com/)
2. Enter your desired admin password (e.g., `Admin123!`)
3. Set rounds to **10**
4. Click **"Generate Hash"**
5. **Copy the hash** (starts with `$2a$10$...`)

### 7.2 Open Supabase SQL Editor
1. Go to Supabase dashboard
2. Click **"SQL Editor"** (left sidebar)
3. Click **"New query"**

### 7.3 Run Admin Creation SQL
Copy and paste this SQL, then **replace the values**:

```sql
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),
  'admin@newtownradio.com',                    -- REPLACE: Your admin email
  '$2a$10$YourHashedPasswordHere',             -- REPLACE: Your bcrypt hash from step 7.1
  'Admin User',                                -- REPLACE: Your admin name
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE
SET 
  role = 'ADMIN',
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  "updatedAt" = NOW();
```

**Replace:**
- `'admin@newtownradio.com'` → Your admin email
- `'$2a$10$YourHashedPasswordHere'` → Your bcrypt hash from step 7.1
- `'Admin User'` → Your admin display name

### 7.4 Execute Query
1. Click **"Run"** button (or press `Ctrl+Enter`)
2. Should see: **"Success. No rows returned"**

### 7.5 Verify Admin Created
Run this query:
```sql
SELECT id, email, name, role FROM "User" WHERE role = 'ADMIN';
```

You should see your admin user.

---

## STEP 8: Test Your Live Site

### 8.1 Visit Your Site
1. Go to your Netlify URL: `https://your-site-name.netlify.app`
2. Check that the homepage loads
3. Test navigation

### 8.2 Test Login
1. Go to `/login`
2. Enter your admin credentials:
   - **Email:** The email you used in step 7.3
   - **Password:** Your original password (not the hash!)
3. Click **"Sign In"**
4. You should be logged in

### 8.3 Access Admin Dashboard
1. Go to `/admin`
2. You should see the admin dashboard
3. Test creating a show, event, or ad

### 8.4 Test Key Features
- [ ] Homepage loads
- [ ] Login works
- [ ] Admin dashboard accessible
- [ ] Can create shows
- [ ] Can create events
- [ ] Can create ads
- [ ] Can upload images

---

## STEP 9: Final Configuration

### 9.1 Set Custom Domain (Optional)
1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to connect your domain
4. Update `NEXTAUTH_URL` to your custom domain

### 9.2 Enable HTTPS (Automatic)
- Netlify automatically provides HTTPS
- Your site is secure by default

### 9.3 Set Up Continuous Deployment
- Already done! Every push to GitHub main branch auto-deploys
- You can disable this in **Site settings** → **Build & deploy** → **Continuous Deployment**

---

## 🎉 Congratulations!

Your radio station website is now live on Netlify!

---

## 📝 PowerShell Commands Quick Reference

| Task | PowerShell Command |
|------|-------------------|
| **Generate NEXTAUTH_SECRET** | `node -e "const crypto = require('crypto'); console.log(crypto.randomBytes(32).toString('base64'));"` |
| **Generate Prisma Client** | `npx prisma generate` |
| **Run Migrations** | `npx prisma migrate deploy` |
| **Start Dev Server** | `npm run dev` |
| **Build for Production** | `npm run build` |
| **Initialize Git** | `git init` |
| **Add Files** | `git add .` |
| **Commit** | `git commit -m "message"` |
| **Push to GitHub** | `git push -u origin main` |

---

## 🔧 Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify all environment variables are set
- Check Node version (should be 20)
- Verify `package.json` has all dependencies

### Database Connection Errors
- Verify `DATABASE_URL` is correct in Netlify
- Check connection string has `?sslmode=require`
- Verify Supabase database is running
- Check firewall/network settings

### Can't Login
- Verify admin user was created (check Supabase)
- Check password hash was generated correctly
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your Netlify URL

### Migrations Didn't Run
- Check build logs for Prisma errors
- Manually run: Go to Netlify Functions or use CLI
- Or run SQL directly in Supabase SQL Editor

### Images/Uploads Not Working
- Check file size limits (Netlify: 100MB)
- Verify `public/uploads/` directory exists
- Check file paths in database

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Site is live and accessible
- [ ] Can log in as admin
- [ ] Admin dashboard works
- [ ] Can create shows
- [ ] Can create events
- [ ] Can create products
- [ ] Can create ads
- [ ] Images upload correctly
- [ ] Database is connected
- [ ] Environment variables are set
- [ ] Custom domain (if applicable)

---

**You're all set! Your radio station is live! 🎉**
