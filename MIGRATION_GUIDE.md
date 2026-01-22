# Database Migration Guide: SQLite to PostgreSQL

## Why Switch?

SQLite works great for local development, but Netlify (and most serverless platforms) require a cloud database like PostgreSQL because:
- SQLite files can't be written to in serverless environments
- PostgreSQL is designed for production use
- Better performance and scalability

## Step-by-Step Migration

### Step 1: Set up PostgreSQL Database

**Option A: Supabase (Recommended - Free Tier)**
1. Go to https://supabase.com
2. Sign up/login
3. Click "New Project"
4. Fill in:
   - Name: `radio-station`
   - Database Password: (save this!)
   - Region: Choose closest to you
5. Wait 2-3 minutes for setup
6. Go to Settings → Database
7. Copy the "Connection string" (URI format)
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

**Option B: Neon (Alternative - Free Tier)**
1. Go to https://neon.tech
2. Sign up/login
3. Create a new project
4. Copy the connection string from dashboard

### Step 2: Update Prisma Schema

Your schema is already set to use `env("DATABASE_URL")`, so you just need to:

1. **For local development** - Keep using SQLite:
   - Your `.env` file: `DATABASE_URL="file:./dev.db"`

2. **For production** - Use PostgreSQL:
   - In Netlify: Set `DATABASE_URL` to your PostgreSQL connection string

### Step 3: Create Migration for PostgreSQL

You have two options:

**Option A: Keep both databases (Recommended)**
- Keep SQLite for local dev
- Use PostgreSQL for production
- No schema changes needed!

**Option B: Switch completely to PostgreSQL**

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Create migration:
```bash
npx prisma migrate dev --name switch_to_postgresql
```

3. Generate client:
```bash
npx prisma generate
```

### Step 4: Test Locally with PostgreSQL (Optional)

1. Create a `.env.local` file:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

2. Run migrations:
```bash
npx prisma migrate deploy
```

3. Test your app:
```bash
npm run dev
```

### Step 5: Deploy to Netlify

1. Push to GitHub (see README.md)
2. Connect Netlify to your GitHub repo
3. Set environment variables in Netlify:
   - `DATABASE_URL` = your PostgreSQL connection string
   - `NEXTAUTH_URL` = https://your-site.netlify.app
   - `NEXTAUTH_SECRET` = (generate with `openssl rand -base64 32`)

4. Update build command in Netlify:
   - Build command: `prisma generate && prisma migrate deploy && npm run build`

5. Deploy!

## Important Notes

- **Data Migration**: If you have existing data in SQLite, you'll need to export and import it to PostgreSQL
- **Connection String**: Make sure your PostgreSQL connection string includes SSL: `?sslmode=require`
- **Migrations**: Run `prisma migrate deploy` in production (not `prisma migrate dev`)

## Troubleshooting

**"Can't reach database server"**
- Check your connection string
- Verify database allows external connections
- Check firewall settings

**"SSL required"**
- Add `?sslmode=require` to your connection string

**"Migration failed"**
- Check database permissions
- Ensure you're using `migrate deploy` not `migrate dev` in production
