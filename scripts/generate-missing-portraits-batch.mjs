import { drizzle } from 'drizzle-orm/mysql2';
import { teachers } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { generateImage } from '../server/_core/imageGeneration.ts';

const db = drizzle(process.env.DATABASE_URL);

// Get all teachers
const allTeachers = await db.select().from(teachers);
const missingPortraits = allTeachers.filter(t => !t.avatarUrl || t.avatarUrl === '');

console.log(`Found ${missingPortraits.length} teachers without portraits out of ${allTeachers.length} total`);
console.log('\nGenerating portraits...\n');

let successCount = 0;
let failCount = 0;

for (const teacher of missingPortraits) {
  console.log(`[${successCount + failCount + 1}/${missingPortraits.length}] Generating portrait for ${teacher.fullName}...`);
  
  try {
    // Create culturally appropriate prompt based on teacher info
    const era = teacher.era || 'historical spiritual teacher';
    const tradition = teacher.traditionTags?.[0] || 'wisdom tradition';
    
    const prompt = `A dignified, contemplative portrait of ${teacher.fullName}, ${era}. ${tradition} teacher. Photorealistic style with soft lighting, cosmic background with subtle stars and nebula. Wise, serene expression. Professional headshot composition. High quality, detailed.`;
    
    const result = await generateImage({ prompt });
    
    if (result && result.url) {
      // Update database with portrait URL
      await db.update(teachers)
        .set({ avatarUrl: result.url })
        .where(eq(teachers.id, teacher.id));
      
      console.log(`  ✓ Success: ${result.url.substring(0, 60)}...`);
      successCount++;
    } else {
      console.log(`  ✗ Failed: No URL returned`);
      failCount++;
    }
    
    // Add delay to avoid rate limiting (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    failCount++;
  }
}

console.log(`\n✓ Portrait generation complete!`);
console.log(`  Success: ${successCount}`);
console.log(`  Failed: ${failCount}`);
console.log(`  Total: ${successCount + failCount}`);
process.exit(0);
