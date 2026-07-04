/**
 * Creates the first admin user from env vars SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.
 * Run with: npm run seed:admin
 */
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "../src/models/AdminUser";

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!uri || !email || !password) {
    console.error("MONGODB_URI, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const existing = await AdminUser.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`Admin user ${email} already exists. Skipping.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.create({
    email: email.toLowerCase(),
    passwordHash,
    name: "Office Admin",
    role: "super_admin",
  });

  console.log(`Admin user created: ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
