import { drizzle } from 'drizzle-orm/mysql2';
import { teachers } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { generateImage } from '../server/_core/imageGeneration.ts';

const db = drizzle(process.env.DATABASE_URL);

// Get all teachers
const allTeachers = await db.select().from(teachers);

console.log(`Generating portraits for ${allTeachers.length} teachers...`);

for (const teacher of allTeachers) {
  if (!teacher.portraitUrl || teacher.portraitUrl === '') {
    console.log(`\nGenerating portrait for ${teacher.name}...`);
    
    try {
      // Generate portrait with culturally appropriate styling
      const prompt = `A dignified, contemplative portrait of ${teacher.name}, ${teacher.era || 'historical spiritual teacher'}. Photorealistic style with soft lighting, cosmic background with subtle stars and nebula. Wise, serene expression. Professional headshot composition. High quality, detailed.`;
      
      const result = await generateImage({ prompt });
      
      if (result && result.url) {
        // Update database with portrait URL
        await db.update(teachers)
          .set({ portraitUrl: result.url })
          .where(eq(teachers.id, teacher.id));
        
        console.log(`✓ Generated and saved portrait for ${teacher.name}: ${result.url}`);
      } else {
        console.log(`✗ Failed to generate portrait for ${teacher.name}`);
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`✗ Error generating portrait for ${teacher.name}:`, error.message);
    }
  } else {
    console.log(`✓ ${teacher.name} already has portrait: ${teacher.portraitUrl}`);
  }
}

console.log('\n✓ Portrait generation complete!');
process.exit(0);
