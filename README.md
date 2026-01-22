# Newtown Radio Station

A modern radio station website built with Next.js, featuring live streaming, shows, events, shop, and admin dashboard.

## Features

- 🎵 Live radio streaming
- 📻 Show management and episodes
- 📅 Events calendar
- 🛒 E-commerce shop
- 👥 User authentication
- 📊 Admin dashboard
- 📢 Advertisement management (image & video ads)
- 🌐 Multi-language support

## Tech Stack

- **Framework:** Next.js 16
- **Database:** SQLite (dev) / PostgreSQL (production)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd radio-station
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

5. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

### Step 1: Set up PostgreSQL Database

SQLite won't work on Netlify. You need a PostgreSQL database:

**Option A: Use Supabase (Free)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)

**Option B: Use Neon (Free)**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### Step 2: Update Prisma Schema for Production

For production, you'll need to update your Prisma schema to use PostgreSQL. Create a new migration:

```bash
# Update schema.prisma datasource to:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# Then run:
npx prisma migrate dev --name switch_to_postgresql
```

### Step 3: Deploy to Netlify

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Or use the `netlify.toml` file (already included)

4. **Set Environment Variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add these variables:
     ```
     DATABASE_URL=your-postgresql-connection-string
     NEXTAUTH_URL=https://your-site.netlify.app
     NEXTAUTH_SECRET=your-secret-key
     ```

5. **Deploy:**
   - Netlify will automatically build and deploy
   - After first deploy, run migrations:
     - Go to Netlify Functions or use Netlify CLI:
     ```bash
     npx netlify-cli functions:invoke --name prisma-migrate
     ```
   - Or add a build hook to run migrations automatically

### Step 4: Run Database Migrations

After deployment, you need to run migrations. You can:

**Option A: Use Netlify Functions (Recommended)**
Create a migration function or use Netlify's build process.

**Option B: Use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify env:set DATABASE_URL "your-postgresql-url"
netlify dev
```

**Option C: Add to build command:**
Update `netlify.toml`:
```toml
[build]
  command = "prisma generate && prisma migrate deploy && npm run build"
```

## Project Structure

```
radio-station/
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static files
├── src/
│   ├── app/              # Next.js app router
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   └── ...
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── types/            # TypeScript types
├── .env.example          # Environment variables template
├── netlify.toml          # Netlify configuration
└── package.json
```

## Admin Access

- Navigate to `/admin` to access the admin dashboard
- You need to be logged in with an ADMIN role

## Features

### Admin Dashboard
- Manage Shows, Episodes, Events, Products
- Manage Advertisements (Image & Video)
- User management
- System statistics

### Public Features
- Live radio streaming
- Browse shows and episodes
- View upcoming events
- Shop products
- User authentication

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NEXTAUTH_URL` | Your site URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth | Yes |

## License

Private - All rights reserved

## Support

For issues or questions, please contact the development team.
