# PostgreSQL Setup Complete! 🎉

Your Prisma schema has been updated to use PostgreSQL instead of SQLite.

## What Changed

✅ **Schema Updated:** `prisma/schema.prisma` now uses `provider = "postgresql"`  
✅ **Migration Created:** `prisma/migrations/switch_to_postgresql/migration.sql`

## Next Steps

### 1. Update Your Database Connection String

Make sure your `.env` file has the correct PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
```

**Important Notes:**
- Use port **5432** for direct connection (not 6543)
- Add `?sslmode=require` at the end for SSL
- Replace `YOUR_PASSWORD` with your actual database password

### 2. Run the Migration

Once your database is accessible, run:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

Or for development:
```bash
npx prisma migrate dev
```

### 3. Verify Connection

Test the connection:
```bash
npx prisma db pull
```

This will verify your database connection is working.

## Supabase Connection String

If using Supabase:

1. Go to **Settings** → **Database**
2. Find **Connection string** → **URI**
3. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. Add `?sslmode=require` at the end:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
   ```

## Neon Connection String

If using Neon:

1. Go to your project dashboard
2. Click **Connection Details**
3. Copy the connection string
4. It should already include SSL settings

## Troubleshooting

### "Can't reach database server"
- Check your connection string is correct
- Verify you're using port **5432** (not 6543 for connection pooling)
- Check if your IP needs to be whitelisted (some providers require this)

### "SSL required"
- Add `?sslmode=require` to your connection string
- Or use `?sslmode=prefer` if your provider allows

### "Migration failed"
- Make sure database is empty or backup existing data
- Check database user has CREATE TABLE permissions
- Verify connection string is correct

### "Connection timeout"
- Check firewall settings
- Verify database is running
- Try using connection pooling port (6543) if direct connection fails

## For Netlify Deployment

When deploying to Netlify:

1. Set `DATABASE_URL` in Netlify environment variables
2. Use the **direct connection** string (port 5432) with SSL
3. Build command will automatically run migrations:
   ```
   prisma generate && prisma migrate deploy && npm run build
   ```

## Data Migration (If You Have Existing SQLite Data)

If you have data in your SQLite database that you want to migrate:

1. Export data from SQLite:
   ```bash
   sqlite3 prisma/dev.db .dump > data.sql
   ```

2. Convert SQLite syntax to PostgreSQL (manual editing may be needed)

3. Import to PostgreSQL:
   ```bash
   psql your-connection-string < data.sql
   ```

Or use a migration tool like `pgloader`:
```bash
pgloader sqlite://prisma/dev.db postgresql://user:pass@host/db
```

## You're All Set! 🚀

Your project is now configured for PostgreSQL. Once you:
1. ✅ Update your `.env` with the correct connection string
2. ✅ Run `npx prisma migrate deploy`
3. ✅ Test the connection

You'll be ready to deploy to Netlify!
