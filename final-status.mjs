import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const tables = {
  'teachers': 'Spiritual Teachers',
  'themes': 'Spiritual Themes',
  'keyIdeas': 'Key Ideas',
  'practices': 'Practices',
  'quotes': 'Quotes',
  'centralQuestions': 'Central Questions',
  'misunderstandings': 'Misunderstandings',
  'teacher_biographies': 'Teacher Biographies',
  'integration_guides': 'Integration Guides',
  'case_studies': 'Case Studies',
  'glossary_terms': 'Glossary Terms',
  'deepQuestions': 'Deep Questions',
  'paradoxes': 'Paradoxes',
  'life_experiments': 'Life Experiments',
  'micro_retreats': 'Micro-Retreats',
  'council_debates': 'Council Debates',
  'journeys': 'Journeys',
  'journeyDays': 'Journey Days'
};

console.log("\n🎉 COUNCIL OF SAGES - DATABASE STATUS\n");
console.log("═".repeat(50));

let totalRecords = 0;
for (const [table, label] of Object.entries(tables)) {
  try {
    const [result] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`);
    const count = result[0].count;
    totalRecords += count;
    const icon = count > 0 ? '✅' : '⚠️ ';
    console.log(`${icon} ${label.padEnd(30)} ${count.toString().padStart(6)}`);
  } catch (e) {
    console.log(`❌ ${label.padEnd(30)} ERROR`);
  }
}

console.log("═".repeat(50));
console.log(`📊 TOTAL RECORDS: ${totalRecords.toString().padStart(30)}\n`);

await connection.end();
