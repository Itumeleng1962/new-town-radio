# Fixing Prisma Permission Error (Windows)

## Error: `EPERM: operation not permitted, unlink`

This happens when Prisma client files are locked by another process (usually the dev server).

## Solution 1: Stop All Node Processes (Recommended)

### Step 1: Stop Dev Server
1. Go to the terminal where `npm run dev` is running
2. Press `Ctrl+C` to stop it
3. Wait a few seconds

### Step 2: Close All Terminals
1. Close all PowerShell/Command Prompt windows
2. Close VS Code/Cursor if it's running the dev server

### Step 3: Try Again
```powershell
npx prisma generate
```

## Solution 2: Kill Node Processes

If Solution 1 doesn't work:

```powershell
# Find all Node processes
Get-Process node -ErrorAction SilentlyContinue

# Kill all Node processes (WARNING: This stops ALL Node apps)
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait 2 seconds
Start-Sleep -Seconds 2

# Try Prisma generate again
npx prisma generate
```

## Solution 3: Delete Prisma Client Manually

```powershell
# Delete the Prisma client folder
Remove-Item -Recurse -Force "node_modules\.prisma" -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 1

# Generate again
npx prisma generate
```

## Solution 4: Restart Computer

If nothing else works:
1. Save all your work
2. Restart your computer
3. Try `npx prisma generate` again

## Solution 5: Run as Administrator

1. Right-click PowerShell
2. Select "Run as Administrator"
3. Navigate to your project:
   ```powershell
   cd "C:\Users\Itumeleng Mahwa\Desktop\radio-station"
   ```
4. Run:
   ```powershell
   npx prisma generate
   ```

## After Fixing: Continue Deployment

Once `npx prisma generate` works, continue with:

```powershell
# Run migrations
npx prisma migrate deploy

# Test locally
npm run dev
```
