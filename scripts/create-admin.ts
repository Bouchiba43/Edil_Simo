/**
 * Create a Firebase Auth admin user.
 *
 * Usage:
 *   pnpm tsx --env-file=.env.local scripts/create-admin.ts <email> <password>
 *
 * Example:
 *   pnpm tsx --env-file=.env.local scripts/create-admin.ts ahmedbouchiba43@gmail.com MyP@ssw0rd!
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { ALLOWED_ADMIN_EMAILS } from "../lib/admin-emails";

const adminApp =
  getApps().find((a) => a.name === "create-admin") ||
  initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "create-admin",
  );

const auth = getAuth(adminApp);

async function main() {
  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.error("Usage: pnpm tsx --env-file=.env.local scripts/create-admin.ts <email> <password>");
    process.exit(1);
  }

  if (!ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase() as never)) {
    console.error(`\n✗ "${email}" is not in the allowed admin emails list.`);
    console.error(`  Allowed: ${ALLOWED_ADMIN_EMAILS.join(", ")}`);
    console.error(`  Add it to lib/admin-emails.ts first.\n`);
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("✗ Password must be at least 6 characters.");
    process.exit(1);
  }

  try {
    // Check if user already exists
    try {
      const existing = await auth.getUserByEmail(email);
      // User exists — update the password instead
      await auth.updateUser(existing.uid, { password });
      console.log(`\n✓ Password updated for existing admin: ${email}\n`);
    } catch (err: unknown) {
      if ((err as { code?: string }).code !== "auth/user-not-found") throw err;
      // Create new user
      const user = await auth.createUser({ email, password, emailVerified: true });
      console.log(`\n✓ Admin created successfully`);
      console.log(`  Email : ${user.email}`);
      console.log(`  UID   : ${user.uid}\n`);
    }
  } catch (err) {
    console.error("✗ Failed:", err);
    process.exit(1);
  }

  process.exit(0);
}

main();
