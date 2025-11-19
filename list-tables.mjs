import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [tables] = await connection.execute(
  "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() ORDER BY TABLE_NAME"
);

console.log("📊 Tables in database:");
tables.forEach(t => console.log(`   - ${t.TABLE_NAME}`));

await connection.end();
