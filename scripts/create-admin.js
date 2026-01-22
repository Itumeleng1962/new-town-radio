/**
 * Script to create the first admin user
 * Run this after deploying to Netlify
 * 
 * Usage:
 *   node scripts/create-admin.js <email> <password> <name>
 * 
 * Example:
 *   node scripts/create-admin.js admin@newtownradio.com MySecurePassword123 Admin User
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('❌ Missing required arguments!');
    console.log('\nUsage:');
    console.log('  node scripts/create-admin.js <email> <password> [name]');
    console.log('\nExample:');
    console.log('  node scripts/create-admin.js admin@newtownradio.com MyPassword123 "Admin Name"');
    process.exit(1);
  }

  const email = args[0];
  const password = args[1];
  const name = args[2] || 'Admin User';

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user to admin
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
          name: name
        }
      });
      console.log('✅ Existing user updated to ADMIN role!');
      console.log(`   Email: ${email}`);
      console.log(`   Name: ${name}`);
      console.log(`   Role: ADMIN`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'ADMIN'
        }
      });
      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   Name: ${name}`);
      console.log(`   Role: ADMIN`);
    }

    console.log('\n🎉 You can now log in at: /login');
    console.log(`   Email: ${email}`);
    console.log(`   Password: [the password you provided]`);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
