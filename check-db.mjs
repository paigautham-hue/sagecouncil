import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [teachers] = await connection.execute("SELECT COUNT(*) as count FROM teachers");
const [themes] = await connection.execute("SELECT COUNT(*) as count FROM themes");
const [keyIdeas] = await connection.execute("SELECT COUNT(*) as count FROM key_ideas");
const [practices] = await connection.execute("SELECT COUNT(*) as count FROM practices");
const [quotes] = await connection.execute("SELECT COUNT(*) as count FROM quotes");

console.log("📊 Database Status:");
console.log(`   Teachers: ${teachers[0].count}`);
console.log(`   Themes: ${themes[0].count}`);
console.log(`   Key Ideas: ${keyIdeas[0].count}`);
console.log(`   Practices: ${practices[0].count}`);
console.log(`   Quotes: ${quotes[0].count}`);

await connection.end();
