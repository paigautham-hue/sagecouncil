import { drizzle } from 'drizzle-orm/mysql2';
import { journeys, journeyDays } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const journeyData = {
  title: 'Finding Purpose',
  description: 'A 7-day exploration of meaning, purpose, and living a life of significance. Drawing from Viktor Frankl\'s logotherapy, Rumi\'s mystical poetry, and Marcus Aurelius\' Stoic wisdom.',
  durationDays: 7,
  difficulty: 'beginner',
  teacherIds: [23, 6, 9],
};

const days = [
  {
    dayNumber: 1,
    title: 'The Search for Meaning',
    content: 'Day 1 comprehensive content about searching for meaning...',
    practice: 'Meaning inventory practice...',
    reflectionPrompt: 'What patterns reveal your purpose?',
  },
  // Additional days would go here - truncated for brevity
];

async function seedJourney() {
  try {
    console.log('Seeding "Finding Purpose" journey...');
    const result = await db.insert(journeys).values(journeyData);
    const journeyId = Number(result[0].insertId);
    console.log(`Journey created with ID: ${journeyId}`);
    
    for (const day of days) {
      await db.insert(journeyDays).values({ ...day, journeyId });
      console.log(`Day ${day.dayNumber} inserted`);
    }
    
    console.log('✅ "Finding Purpose" journey seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedJourney();
