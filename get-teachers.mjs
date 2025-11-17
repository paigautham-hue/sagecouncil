import { drizzle } from "drizzle-orm/mysql2";
import { teachers } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);
const allTeachers = await db.select().from(teachers).orderBy(teachers.fullName);

console.log("All 36 Teachers:");
allTeachers.forEach((t, idx) => {
  console.log(`${idx + 1}. ${t.fullName} (${t.birthYear}-${t.deathYear || 'present'})`);
});
