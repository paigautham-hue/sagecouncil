import { drizzle } from 'drizzle-orm/mysql2';
import { teachers } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { generateImage } from '../server/_core/imageGeneration.ts';

const db = drizzle(process.env.DATABASE_URL);

// Priority teachers to fix (visible in screenshot)
const priorityTeachers = ['Baruch Spinoza', 'Gabor Maté', 'Hafiz'];

console.log(`Generating portraits for priority teachers...`);

for (const teacherName of priorityTeachers) {
  const [teacher] = await db.select().from(teachers).where(eq(teachers.fullName, teacherName));
  
  if (!teacher) {
    console.log(`✗ Teacher not found: ${teacherName}`);
    continue;
  }
  
  console.log(`\nGenerating portrait for ${teacher.fullName}...`);
  
  try {
    // Generate portrait with culturally appropriate styling
    let prompt = '';
    
    if (teacher.fullName === 'Baruch Spinoza') {
      prompt = 'A dignified portrait of Baruch Spinoza, 17th century Dutch philosopher. Dark hair, contemplative expression, period clothing. Cosmic background with subtle stars. Photorealistic, professional headshot.';
    } else if (teacher.fullName === 'Gabor Maté') {
      prompt = 'A warm, compassionate portrait of Gabor Maté, contemporary physician and author. Gentle smile, wise eyes, modern professional attire. Cosmic background with subtle nebula. Photorealistic, professional headshot.';
    } else if (teacher.fullName === 'Hafiz') {
      prompt = 'A serene portrait of Hafiz, 14th century Persian poet and Sufi mystic. Traditional Persian attire, turban, peaceful expression. Cosmic background with stars and mystical light. Photorealistic, professional headshot.';
    }
    
    const result = await generateImage({ prompt });
    
    if (result && result.url) {
      // Update database with portrait URL
      await db.update(teachers)
        .set({ avatarUrl: result.url })
        .where(eq(teachers.id, teacher.id));
      
      console.log(`✓ Generated and saved portrait for ${teacher.fullName}`);
      console.log(`  URL: ${result.url}`);
    } else {
      console.log(`✗ Failed to generate portrait for ${teacher.fullName}`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error(`✗ Error generating portrait for ${teacher.fullName}:`, error.message);
  }
}

console.log('\n✓ Priority portrait generation complete!');
console.log('\nTo generate all remaining portraits, run:');
console.log('  pnpm tsx scripts/generate-all-portraits.mjs');
process.exit(0);
