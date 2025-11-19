import mysql from 'mysql2/promise';

async function getTeachers() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    const [teachers] = await connection.execute('SELECT fullName, teacherId FROM teachers ORDER BY fullName');
    
    console.log('All Teachers and TeacherIds:');
    console.log('============================');
    teachers.forEach((t) => {
      console.log(`${t.fullName.padEnd(40)} → ${t.teacherId}`);
    });
  } finally {
    await connection.end();
  }
}

getTeachers().catch(console.error);
