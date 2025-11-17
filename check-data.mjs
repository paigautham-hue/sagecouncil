import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const teachers = await db.execute("SELECT COUNT(*) as count FROM teachers");
const themes = await db.execute("SELECT COUNT(*) as count FROM themes");
const keyIdeas = await db.execute("SELECT COUNT(*) as count FROM keyIdeas");
const practices = await db.execute("SELECT COUNT(*) as count FROM practices");
const quotes = await db.execute("SELECT COUNT(*) as count FROM quotes");

console.log("Database counts:");
console.log("Teachers:", teachers[0][0].count);
console.log("Themes:", themes[0][0].count);
console.log("Key Ideas:", keyIdeas[0][0].count);
console.log("Practices:", practices[0][0].count);
console.log("Quotes:", quotes[0][0].count);

await connection.end();
