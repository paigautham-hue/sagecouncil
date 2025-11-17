import { drizzle } from 'drizzle-orm/mysql2';
import { teachers } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const allTeachers = await db.select().from(teachers);
const missingPortraits = allTeachers.filter(t => !t.portraitUrl || t.portraitUrl === '' || t.portraitUrl.includes('placeholder'));

console.log('Teachers missing portraits:');
missingPortraits.forEach(t => {
  console.log(`- ${t.name} (ID: ${t.id})`);
});
console.log(`\nTotal missing: ${missingPortraits.length} out of ${allTeachers.length}`);
