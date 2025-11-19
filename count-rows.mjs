import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const tables = [
  'teachers', 'themes', 'keyIdeas', 'practices', 'quotes', 
  'centralQuestions', 'misunderstandings', 'teacher_biographies',
  'integration_guides', 'glossary_terms', 'case_studies'
];

console.log("📊 Database Content Summary:");
for (const table of tables) {
  const [result] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`);
  console.log(`   ${table}: ${result[0].count}`);
}

await connection.end();
