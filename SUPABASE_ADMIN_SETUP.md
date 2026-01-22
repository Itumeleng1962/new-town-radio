# Create Admin User in Supabase - Step by Step Guide

## Quick Steps

1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run the SQL command below
4. Login with your new admin credentials

---

## Detailed Instructions

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project (the one you're using for the radio station)

### Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** button (top right)

### Step 3: Generate Password Hash

First, you need to hash your password. You have two options:

**Option A: Use Online Bcrypt Generator (Easiest)**
1. Go to [https://bcrypt-generator.com/](https://bcrypt-generator.com/)
2. Enter your desired password (e.g., `MyAdminPassword123`)
3. Set rounds to **10**
4. Click **"Generate Hash"**
5. Copy the hash (starts with `$2a$10$...`)

**Option B: Use Node.js (If you have it installed)**
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10).then(hash => console.log(hash));"
```

### Step 4: Run SQL Command

Copy and paste this SQL into the Supabase SQL Editor, then **replace the values**:

```sql
-- Create Admin User
-- Replace these values:
--   'admin@newtownradio.com' with your admin email
--   '$2a$10$...' with your bcrypt password hash
--   'Admin User' with your admin name

INSERT INTO "User" (
  id, 
  email, 
  password, 
  name, 
  role, 
  "createdAt", 
  "updatedAt"
)
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),  -- Generates unique ID
  'admin@newtownradio.com',                          -- YOUR ADMIN EMAIL
  '$2a$10$YourHashedPasswordHere',                   -- YOUR BCRYPT HASH
  'Admin User',                                      -- YOUR ADMIN NAME
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

### Step 5: Customize the Values

**Replace these parts:**

1. **Email:** `'admin@newtownradio.com'` → Your admin email
2. **Password Hash:** `'$2a$10$YourHashedPasswordHere'` → Your bcrypt hash from Step 3
3. **Name:** `'Admin User'` → Your admin display name

**Example with real values:**
```sql
INSERT INTO "User" (
  id, 
  email, 
  password, 
  name, 
  role, 
  "createdAt", 
  "updatedAt"
)
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),
  'admin@newtownradio.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',  -- Example hash
  'Itumeleng Mahwa',
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

### Step 6: Execute the Query

1. Click **"Run"** button (or press `Ctrl+Enter`)
2. You should see: **"Success. No rows returned"** or **"1 row inserted"**

### Step 7: Verify Admin User Created

Run this query to verify:

```sql
SELECT id, email, name, role, "createdAt"
FROM "User"
WHERE role = 'ADMIN';
```

You should see your admin user listed.

### Step 8: Login to Your Site

1. Go to your deployed site: `https://your-site.netlify.app/login`
2. Or locally: `http://localhost:3000/login`
3. Enter your credentials:
   - **Email:** The email you used in the SQL
   - **Password:** The password you hashed (original password, not the hash!)
4. Click **"Sign In"**
5. You should be redirected to the dashboard
6. Go to `/admin` to access the admin panel

---

## Complete Example

Here's a complete, ready-to-use example (just replace the password hash):

```sql
-- Step 1: Generate password hash at https://bcrypt-generator.com/
-- For password "Admin123!" the hash might be:
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Step 2: Run this SQL (replace the hash with yours)
INSERT INTO "User" (
  id, 
  email, 
  password, 
  name, 
  role, 
  "createdAt", 
  "updatedAt"
)
VALUES (
  'admin-' || substr(md5(random()::text), 1, 12),
  'admin@newtownradio.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',  -- REPLACE THIS!
  'Admin User',
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

---

## Troubleshooting

### "duplicate key value violates unique constraint"
- The email already exists
- The `ON CONFLICT` clause will update it to ADMIN
- This is fine - your existing user will become admin

### "column does not exist"
- Make sure you're using the correct table name: `"User"` (with quotes and capital U)
- Check that migrations have been run

### "Cannot login after creating user"
- Make sure you're using the **original password** (not the hash) to login
- Verify the password hash was generated correctly
- Check that the email matches exactly

### "Permission denied"
- Make sure you're logged into Supabase
- Verify you have access to the project
- Check that the database is accessible

---

## Security Tips

✅ Use a strong password (12+ characters, mix of letters, numbers, symbols)  
✅ Use a professional email address  
✅ Don't share admin credentials  
✅ Consider creating a separate admin email (not your personal one)  
✅ Change password regularly  

---

## Quick Reference

| Item | Value |
|------|-------|
| Table Name | `"User"` (with quotes, capital U) |
| Role Value | `'ADMIN'` (uppercase, in quotes) |
| Password | Must be bcrypt hashed (use bcrypt-generator.com) |
| Login URL | `/login` |
| Admin Dashboard | `/admin` |

---

## Need Help?

- Check Supabase logs: Dashboard → Logs → Postgres Logs
- Verify table exists: Run `SELECT * FROM "User" LIMIT 1;`
- Test connection: Make sure your site can connect to the database
