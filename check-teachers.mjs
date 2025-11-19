import mysql from 'mysql2/promise';

async function checkTeachers() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    const [teachers] = await connection.execute('SELECT id, fullName, teacherId FROM teachers');
    
    console.log(`Total teachers: ${teachers.length}`);
    console.log('All teachers:');
    teachers.forEach((t) => {
      console.log(`- ${t.fullName} (teacherId: ${t.teacherId})`);
    });
  } finally {
    await connection.end();
  }
}

checkTeachers().catch(console.error);
