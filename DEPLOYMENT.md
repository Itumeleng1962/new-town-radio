# Deployment Guide for Netlify

## Quick Setup Checklist

- [ ] Set up PostgreSQL database (Supabase or Neon)
- [ ] Update Prisma schema for PostgreSQL
- [ ] Push code to GitHub
- [ ] Connect Netlify to GitHub
- [ ] Set environment variables in Netlify
- [ ] Run database migrations
- [ ] Test the deployed site

## Detailed Steps

### 1. Database Setup (PostgreSQL)

**Using Supabase (Recommended - Free):**

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to be ready
4. Go to **Settings** → **Database**
5. Find **Connection string** → **URI**
6. Copy the connection string (looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`)

**Using Neon (Alternative - Free):**

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard

### 2. Update Prisma for Production

You have two options:

**Option A: Keep SQLite for dev, PostgreSQL for production**

Create `prisma/schema.prisma` with:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Then use different DATABASE_URL values:
- Local: `file:./dev.db`
- Production: `postgresql://...`

**Option B: Use PostgreSQL everywhere**

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma migrate dev --name switch_to_postgresql
```

### 3. GitHub Setup

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/radio-station.git

# Push
git branch -M main
git push -u origin main
```

### 4. Netlify Deployment

1. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - (Or the `netlify.toml` file handles this automatically)

4. **Set Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add:
     ```
     DATABASE_URL = postgresql://user:pass@host:5432/db
     NEXTAUTH_URL = https://your-site-name.netlify.app
     NEXTAUTH_SECRET = [generate a random string]
     ```

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

### 5. Run Database Migrations

After first deployment, run migrations:

**Option A: Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify env:set DATABASE_URL "your-postgresql-url"
netlify functions:invoke prisma-migrate
```

**Option B: Update build command**
In Netlify dashboard → Site settings → Build & deploy:
- Change build command to: `prisma generate && prisma migrate deploy && npm run build`

**Option C: Manual migration**
Connect to your database and run migrations manually.

### 6. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use an online generator and add it to Netlify environment variables.

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Ensure Node version is 20 (set in `netlify.toml`)
- Verify all environment variables are set

### Database Connection Errors
- Verify DATABASE_URL is correct
- Check database allows connections from Netlify IPs
- Ensure SSL is enabled in connection string (add `?sslmode=require`)

### Migrations Not Running
- Add `prisma migrate deploy` to build command
- Or run migrations manually after first deploy

### Ads/Images Not Showing
- Check file uploads are saved to `public/uploads/`
- Verify file paths in database
- Check Netlify file size limits (100MB default)

## Post-Deployment

1. **Test all features:**
   - User registration/login
   - Admin dashboard
   - Show/episode creation
   - Ad uploads
   - Shop functionality

2. **Set up custom domain** (optional):
   - Go to Domain settings in Netlify
   - Add your custom domain
   - Update NEXTAUTH_URL to match

3. **Monitor:**
   - Check Netlify function logs
   - Monitor database usage
   - Set up error tracking (optional)

## Important Notes

- **File Uploads:** Files uploaded to `public/uploads/` will be included in the build. For large files, consider using a CDN or cloud storage (S3, Cloudinary).
- **Database:** Free PostgreSQL databases have limits. Monitor usage.
- **Build Time:** First build may take 5-10 minutes. Subsequent builds are faster.
- **Environment Variables:** Never commit `.env` files. Use Netlify's environment variables.
