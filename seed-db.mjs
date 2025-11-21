import mysql from 'mysql2/promise';
import { URL } from 'url';

// Parse DATABASE_URL properly
const databaseUrl = process.env.DATABASE_URL || '';
let host, user, password, database;

try {
  const url = new URL(databaseUrl);
  host = url.hostname;
  user = url.username;
  password = url.password;
  database = url.pathname.substring(1); // Remove leading slash
  
  console.log(`📌 Connecting to database: ${database} on ${host}`);
} catch (error) {
  console.error('❌ Failed to parse DATABASE_URL:', error.message);
  process.exit(1);
}

const pool = mysql.createPool({
  connectionLimit: 1,
  host,
  user,
  password,
  database,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  queueLimit: 0,
});

const paradoxes = [
  {
    title: 'The Paradox of Surrender',
    paradoxStatement: 'You must surrender your will to a higher power, yet you must also take full responsibility for your choices.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'In Zen Buddhism, we say: "Let go and yet hold on." True freedom comes from accepting what is while fully engaging with life.' },
      { perspective: 'The Stoics teach that we control our responses but not outcomes. Surrender to what you cannot control, master what you can.' }
    ]),
    isActive: true,
  },
  {
    title: 'The Paradox of Death',
    paradoxStatement: 'You must accept that you will die, yet you must live as if you will live forever.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'Heidegger called this "being-toward-death" - acknowledging mortality gives life meaning and urgency.' },
      { perspective: 'The Tibetan Book of the Dead teaches that contemplating death is the path to enlightenment.' }
    ]),
    isActive: true,
  },
  {
    title: 'The Paradox of Solitude',
    paradoxStatement: 'You must be alone to find yourself, yet you can only know yourself in relationship with others.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'Solitude is the furnace where the self is forged, but relationship is the mirror that reveals it.' },
      { perspective: 'In meditation, we go inward alone, yet the deepest insights emerge in communion with others.' }
    ]),
    isActive: true,
  },
  {
    title: 'The Paradox of Acceptance',
    paradoxStatement: 'You must accept reality as it is, yet you must also work to change what is unjust or harmful.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'Acceptance and action are not opposites - true change comes from accepting the current reality fully, then acting from that clarity.' },
      { perspective: 'The Serenity Prayer captures this: accept what you cannot change, change what you can, and have wisdom to know the difference.' }
    ]),
    isActive: true,
  },
  {
    title: 'The Paradox of the Self',
    paradoxStatement: 'You must know yourself, yet the self you seek to know is constantly changing and ultimately illusory.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'Buddhism teaches anatta - there is no fixed self, only a flowing process of becoming.' },
      { perspective: 'Yet paradoxically, the deeper you know this truth, the more authentically you can live.' }
    ]),
    isActive: true,
  },
  {
    title: 'The Paradox of Desire',
    paradoxStatement: 'You must desire to be free from desire, yet this very desire perpetuates suffering.',
    teacherPerspectives: JSON.stringify([
      { perspective: 'The Buddha taught that the path to freedom begins with acknowledging and understanding desire, not denying it.' },
      { perspective: 'True freedom comes not from wanting nothing, but from wanting rightly - aligned with your deepest values.' }
    ]),
    isActive: true,
  },
];

const lifeExperiments = [
  {
    title: 'The Gratitude Practice',
    description: 'Each morning, write down three things you\'re grateful for before checking your phone. Notice how this shifts your baseline mood and attention throughout the day.',
    hypothesis: 'Practicing gratitude shifts baseline mood and attention throughout the day.',
    duration: 7,
    isActive: true,
  },
  {
    title: 'The Purpose Experiment',
    description: 'Each day, ask yourself: "If I knew I would die in one year, what would I do differently today?" Act on at least one insight from this question.',
    hypothesis: 'Contemplating mortality clarifies priorities and motivates meaningful action.',
    duration: 7,
    isActive: true,
  },
  {
    title: 'The Suffering Inquiry',
    description: 'When you experience emotional pain, pause and ask: "What is the story I\'m telling myself?" Write down the story, then ask: "Is this absolutely true?" Investigate.',
    hypothesis: 'Investigating the stories we tell about suffering reduces its grip on us.',
    duration: 7,
    isActive: true,
  },
  {
    title: 'The Loving-Kindness Meditation',
    description: 'Cultivate compassion for yourself and others through guided loving-kindness practice. This retreat guides you through the traditional metta meditation.',
    hypothesis: 'Loving-kindness practice increases compassion and reduces emotional reactivity.',
    duration: 21,
    isActive: true,
  },
  {
    title: 'The Attention Experiment',
    description: 'For one week, practice single-tasking. Do one thing at a time with full attention. Notice how this changes your experience of work and relationships.',
    hypothesis: 'Single-tasking improves focus, reduces stress, and deepens relationships.',
    duration: 7,
    isActive: true,
  },
];

const microRetreats = [
  {
    title: 'Breath & Presence',
    description: 'A simple practice to ground yourself in the present moment through conscious breathing and body awareness.',
    durationMinutes: 15,
    steps: JSON.stringify([
      { type: 'Grounding', title: 'Find Your Seat', content: 'Sit comfortably with your spine upright. Let your hands rest naturally. Take three deep breaths and arrive fully here.', durationSeconds: 120 },
      { type: 'Exploration', title: 'Follow Your Breath', content: 'Close your eyes. Notice the natural rhythm of your breath. Don\'t change it, just observe. Where do you feel the breath most clearly?', durationSeconds: 600 },
      { type: 'Integration', title: 'Return & Reflect', content: 'Slowly open your eyes. Notice any shifts in your body or mind. Carry this presence with you into your day.', durationSeconds: 180 },
    ]),
    isActive: true,
  },
  {
    title: 'Gratitude as Rebellion',
    description: 'In a world optimized for dissatisfaction, gratitude is a radical act. This retreat helps you reclaim it.',
    durationMinutes: 15,
    steps: JSON.stringify([
      { type: 'Grounding', title: 'Settle In', content: 'Find a comfortable position. Take a moment to appreciate that you\'re here, taking time for yourself. That itself is something to be grateful for.', durationSeconds: 120 },
      { type: 'Exploration', title: 'Gratitude Scan', content: 'Mentally scan your life: your body, your senses, your relationships, your opportunities. For each, whisper "thank you." Feel the shift.', durationSeconds: 600 },
      { type: 'Integration', title: 'Carry It Forward', content: 'Open your eyes. Choose one thing you\'re grateful for and text someone about it. Gratitude shared is gratitude multiplied.', durationSeconds: 180 },
    ]),
    isActive: true,
  },
  {
    title: 'Shadow Work: Meeting Your Inner Critic',
    description: 'A gentle exploration of the voice that judges you most harshly - and what it\'s trying to protect.',
    durationMinutes: 15,
    steps: JSON.stringify([
      { type: 'Grounding', title: 'Create Safety', content: 'Sit with your hand on your heart. Acknowledge: "I am safe. I am worthy. I can look at this."', durationSeconds: 120 },
      { type: 'Exploration', title: 'Listen to the Critic', content: 'What does your inner critic say? "You\'re not good enough"? "You\'re too much"? Listen without judgment. What is it trying to protect you from?', durationSeconds: 600 },
      { type: 'Integration', title: 'Gratitude for the Guardian', content: 'Thank your inner critic for trying to keep you safe. You don\'t need that protection anymore. You can handle life.', durationSeconds: 180 },
    ]),
    isActive: true,
  },
  {
    title: 'Impermanence Contemplation',
    description: 'Reflect deeply on the transient nature of all things - and find freedom in that truth.',
    durationMinutes: 15,
    steps: JSON.stringify([
      { type: 'Grounding', title: 'Witness Change', content: 'Sit quietly. Notice your breath, your heartbeat, the sounds around you. Everything is changing, moment by moment.', durationSeconds: 120 },
      { type: 'Exploration', title: 'The Impermanence Inquiry', content: 'Think of something you\'re clinging to or resisting. A relationship, a role, a belief about yourself. It too will change. How does this truth feel?', durationSeconds: 600 },
      { type: 'Integration', title: 'Release & Flow', content: 'With each exhale, release your grip slightly. Life is a river. You can\'t hold water in your fist. Let it flow.', durationSeconds: 180 },
    ]),
    isActive: true,
  },
  {
    title: 'Loving-Kindness for Difficult People',
    description: 'Transform your relationship with someone challenging through the practice of metta meditation.',
    durationMinutes: 15,
    steps: JSON.stringify([
      { type: 'Grounding', title: 'Begin with Yourself', content: 'Place your hand on your heart. Silently repeat: "May I be happy. May I be healthy. May I be safe. May I live with ease."', durationSeconds: 120 },
      { type: 'Exploration', title: 'Extend to the Difficult One', content: 'Bring to mind someone who challenges you. Repeat the same phrases for them: "May you be happy. May you be healthy..." Notice what arises.', durationSeconds: 600 },
      { type: 'Integration', title: 'Wisdom Emerges', content: 'End by extending kindness to all beings. Understanding grows when we stop seeing enemies and start seeing fellow travelers.', durationSeconds: 180 },
    ]),
    isActive: true,
  },
];

async function seed() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('🌱 Starting database seed...');
    
    // Seed paradoxes
    console.log('📚 Seeding paradoxes...');
    for (const paradox of paradoxes) {
      await connection.execute(
        'INSERT INTO paradoxes (title, paradoxStatement, teacherPerspectives, isActive, createdAt) VALUES (?, ?, ?, ?, NOW())',
        [paradox.title, paradox.paradoxStatement, paradox.teacherPerspectives, paradox.isActive]
      );
    }
    console.log(`✅ Seeded ${paradoxes.length} paradoxes`);
    
    // Seed life experiments
    console.log('🧪 Seeding life experiments...');
    for (const experiment of lifeExperiments) {
      await connection.execute(
        'INSERT INTO life_experiments (title, description, hypothesis, duration, isActive, createdAt) VALUES (?, ?, ?, ?, ?, NOW())',
        [experiment.title, experiment.description, experiment.hypothesis, experiment.duration, experiment.isActive]
      );
    }
    console.log(`✅ Seeded ${lifeExperiments.length} life experiments`);
    
    // Seed micro retreats
    console.log('🧘 Seeding micro retreats...');
    for (const retreat of microRetreats) {
      await connection.execute(
        'INSERT INTO micro_retreats (title, description, durationMinutes, steps, isActive, createdAt) VALUES (?, ?, ?, ?, ?, NOW())',
        [retreat.title, retreat.description, retreat.durationMinutes, retreat.steps, retreat.isActive]
      );
    }
    console.log(`✅ Seeded ${microRetreats.length} micro retreats`);
    
    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.release();
    await pool.end();
  }
}

seed();
