# Deployment Steps 10-18: Post-Deployment & Testing

## ⚠️ Note About Prisma Generate Error

If you're getting the `EPERM` error with `npx prisma generate`, **don't worry!** 

**This will be fixed automatically during Netlify build.** The build process runs `prisma generate` in a clean environment where files aren't locked.

**You can skip local Prisma generate and continue with deployment!**

---

## STEP 10: Verify GitHub Repository

### 10.1 Check Your Repository
1. Go to [https://github.com](https://github.com)
2. Find your `radio-station` repository
3. Verify all files are there:
   - ✅ `prisma/schema.prisma`
   - ✅ `netlify.toml`
   - ✅ `package.json`
   - ✅ `src/` folder
   - ✅ All other project files

### 10.2 Verify .gitignore is Working
Make sure these are NOT in GitHub (they shouldn't be):
- ❌ `.env` file
- ❌ `node_modules/` folder
- ❌ `.next/` folder
- ❌ `prisma/dev.db` (if you had SQLite)

---

## STEP 11: Complete Netlify Deployment

### 11.1 Check Build Status
1. Go to Netlify dashboard
2. Click on your site
3. Check **"Deploys"** tab
4. Look for build status:
   - ✅ **Published** = Success!
   - ⏳ **Building** = Wait for it
   - ❌ **Failed** = Check logs

### 11.2 If Build Failed
1. Click on the failed deploy
2. Click **"Deploy log"**
3. Look for errors (usually red text)
4. Common issues:
   - Missing environment variables
   - Database connection error
   - Build command error

### 11.3 Trigger New Deploy (If Needed)
1. Go to **Deploys** tab
2. Click **"Trigger deploy"**
3. Select **"Clear cache and deploy site"**
4. Wait for build to complete

---

## STEP 12: Verify Environment Variables

### 12.1 Check All Variables Are Set
Go to Netlify → Site settings → Environment variables

Verify you have:
- ✅ `DATABASE_URL` (your Supabase PostgreSQL connection string)
- ✅ `NEXTAUTH_URL` (your Netlify site URL)
- ✅ `NEXTAUTH_SECRET` (the secret you generated)

### 12.2 Update NEXTAUTH_URL
1. Note your actual Netlify URL (e.g., `https://amazing-radio-123.netlify.app`)
2. Update `NEXTAUTH_URL` to match exactly
3. Save
4. Trigger a new deploy

---

## STEP 13: Verify Database Migrations Ran

### 13.1 Check Supabase Tables
1. Go to Supabase dashboard
2. Click **"Table Editor"** (left sidebar)
3. You should see these tables:
   - ✅ `User`
   - ✅ `Show`
   - ✅ `Episode`
   - ✅ `Event`
   - ✅ `Product`
   - ✅ `Order`
   - ✅ `OrderItem`
   - ✅ `Advertisement`

### 13.2 If Tables Don't Exist
Run migrations manually in Supabase:

1. Go to **SQL Editor**
2. Click **"New query"**
3. Copy the contents of `prisma/migrations/switch_to_postgresql/migration.sql`
4. Paste and run it
5. Click **"Run"**

---

## STEP 14: Create Admin Account (Supabase SQL)

### 14.1 Generate Password Hash
1. Go to [https://bcrypt-generator.com/](https://bcrypt-generator.com/)
2. Enter your admin password (e.g., `Admin123!`)
3. Set rounds to **10**
4. Click **"Generate Hash"**
5. **Copy the hash**

### 14.2 Run Admin Creation SQL
1. Go to Supabase → **SQL Editor**
2. Click **"New query"**
3. Paste this SQL (replace values):

```sql
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),
  'admin@newtownradio.com',                    -- YOUR EMAIL
  '$2a$10$YourHashedPasswordHere',             -- YOUR BCRYPT HASH
  'Admin User',                                -- YOUR NAME
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

4. Replace the values
5. Click **"Run"**

### 14.3 Verify Admin Created
Run this query:
```sql
SELECT id, email, name, role FROM "User" WHERE role = 'ADMIN';
```

---

## STEP 15: Test Your Live Site

### 15.1 Visit Homepage
1. Go to: `https://your-site-name.netlify.app`
2. Check that:
   - ✅ Homepage loads
   - ✅ Navigation works
   - ✅ No errors in browser console (F12)

### 15.2 Test Login
1. Go to: `https://your-site-name.netlify.app/login`
2. Enter admin credentials:
   - **Email:** Your admin email
   - **Password:** Your original password (not hash!)
3. Click **"Sign In"**
4. Should redirect to dashboard

### 15.3 Test Admin Dashboard
1. Go to: `https://your-site-name.netlify.app/admin`
2. Verify you see:
   - ✅ Overview stats
   - ✅ Shows tab
   - ✅ Episodes tab
   - ✅ Events tab
   - ✅ Products tab
   - ✅ Advertisements tab
   - ✅ Users tab

---

## STEP 16: Test Admin Features

### 16.1 Create a Test Show
1. In admin dashboard, click **"Shows"** tab
2. Click **"+ Add New Show"**
3. Fill in:
   - Title: "Test Show"
   - Description: "Testing admin features"
   - Schedule: "Monday 10:00 - 12:00"
   - Host: Select a user
   - Upload cover image
4. Click **"Save Show"**
5. Verify it appears in the list

### 16.2 Create a Test Event
1. Click **"Events"** tab
2. Click **"+ Add New Event"**
3. Fill in details
4. Upload event image
5. Save and verify

### 16.3 Create a Test Ad
1. Click **"Advertisements"** tab
2. Click **"+ Add New Ad"**
3. Fill in:
   - Title: "Test Ad"
   - Type: Image Ad
   - Placement: Homepage
   - Upload image
4. Save and verify

### 16.4 Verify Ads Show on Site
1. Go to homepage: `https://your-site-name.netlify.app`
2. Check if ads appear:
   - After Stats section (homepage placement)
   - Banner ad section
   - Between content sections

---

## STEP 17: Test Public Features

### 17.1 Test Shows Page
1. Go to: `https://your-site-name.netlify.app/shows`
2. Verify shows are displayed
3. Click on a show to see details

### 17.2 Test Events Page
1. Go to: `https://your-site-name.netlify.app/events`
2. Verify events are displayed
3. Check event details

### 17.3 Test Shop Page
1. Go to: `https://your-site-name.netlify.app/shop`
2. Verify products are displayed
3. Test adding to cart

### 17.4 Test Other Pages
- ✅ About page
- ✅ Contact page
- ✅ Hosts page
- ✅ Schedule page

---

## STEP 18: Final Checks & Optimization

### 18.1 Performance Check
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your Netlify URL
3. Check performance score
4. Address any critical issues

### 18.2 Mobile Responsiveness
1. Open your site on mobile device
2. Or use browser DevTools (F12) → Toggle device toolbar
3. Test on different screen sizes
4. Verify everything looks good

### 18.3 SEO Check
1. Verify page titles are set
2. Check meta descriptions
3. Test social media previews
4. Verify sitemap (if you have one)

### 18.4 Security Check
- ✅ HTTPS is enabled (automatic on Netlify)
- ✅ Environment variables are secure
- ✅ Admin endpoint should be disabled after use
- ✅ Passwords are hashed

### 18.5 Set Up Custom Domain (Optional)
1. Go to Netlify → Site settings → Domain management
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `newtownradio.com`)
4. Follow DNS setup instructions
5. Update `NEXTAUTH_URL` to custom domain
6. Wait for DNS propagation (can take 24-48 hours)

### 18.6 Set Up Monitoring (Optional)
1. Enable Netlify Analytics (if available)
2. Set up error tracking (Sentry, etc.)
3. Monitor database usage in Supabase
4. Set up uptime monitoring

---

## ✅ Final Deployment Checklist

Before marking deployment as complete:

- [ ] Site is live and accessible
- [ ] Can log in as admin
- [ ] Admin dashboard works
- [ ] Can create shows
- [ ] Can create events
- [ ] Can create products
- [ ] Can create ads
- [ ] Ads appear on homepage
- [ ] Images upload correctly
- [ ] Database is connected
- [ ] All environment variables are set
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain (if applicable)

---

## 🎉 Deployment Complete!

Your radio station website is now fully deployed and functional!

---

## 📞 Next Steps

1. **Share your site** with your team/manager
2. **Add real content** (shows, events, products)
3. **Set up regular backups** (Supabase has automatic backups)
4. **Monitor performance** and user feedback
5. **Keep dependencies updated** regularly

---

## 🔧 Common Post-Deployment Issues

### Ads Not Showing
- Check ad is active in admin
- Verify placement matches
- Check browser console for errors
- Verify image/video uploaded correctly

### Can't Upload Images
- Check file size (Netlify limit: 100MB)
- Verify `public/uploads/` directory exists
- Check file permissions

### Database Slow
- Check Supabase dashboard for query performance
- Optimize database queries if needed
- Consider upgrading Supabase plan if needed

### Build Fails After Code Changes
- Check build logs
- Verify all dependencies are in `package.json`
- Check for TypeScript errors
- Verify environment variables are still set

---

**Congratulations! Your radio station is live! 🎵📻**
