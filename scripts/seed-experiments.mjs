import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

const experiments = [
  {
    title: "The Gratitude Practice",
    description: "Each morning, write down three things you're grateful for before checking your phone. Notice how this shifts your baseline mood and attention throughout the day.",
    hypothesis: "Starting the day with gratitude will increase overall life satisfaction and reduce reactivity to stressors.",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What did you notice about your mood today compared to usual?",
      "Did you find yourself more or less reactive to challenges?",
      "What was the quality of your attention throughout the day?"
    ]),
    themeId: "presence_and_awareness"
  },
  {
    title: "The Pause Experiment",
    description: "Before responding to any request or question, pause for three conscious breaths. Notice the space between stimulus and response.",
    hypothesis: "Creating space before responding will reduce impulsive reactions and increase the quality of my responses.",
    duration: 5,
    checkInPrompts: JSON.stringify([
      "How many times did you remember to pause today?",
      "What did you notice in the space between stimulus and response?",
      "Did pausing change the quality of your interactions?"
    ]),
    themeId: "presence_and_awareness"
  },
  {
    title: "The Ego Observation",
    description: "Throughout the day, notice when you feel the need to defend, justify, or prove yourself. Simply observe without judgment. Keep a log of these moments.",
    hypothesis: "Observing ego reactions without identifying with them will reduce their power and frequency.",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What triggered your ego today?",
      "What did it feel like to observe rather than react?",
      "Did you notice any patterns in what triggers defensiveness?"
    ]),
    themeId: "ego_and_self"
  },
  {
    title: "The Kindness Challenge",
    description: "Perform one anonymous act of kindness each day. It can be small—leaving a kind note, paying for someone's coffee, or helping without being asked. Tell no one.",
    hypothesis: "Practicing kindness without recognition will shift my sense of self from 'what can I get' to 'what can I give.'",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What act of kindness did you perform today?",
      "How did it feel to give without recognition?",
      "Did you notice any changes in how you see others?"
    ]),
    themeId: "relationships"
  },
  {
    title: "The Death Meditation",
    description: "Each evening, spend 5 minutes contemplating your mortality. Imagine this was your last day. What would you regret not doing? What would you let go of?",
    hypothesis: "Regular contemplation of death will clarify what truly matters and reduce attachment to trivial concerns.",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What came up during today's death meditation?",
      "Did it change how you spent your day?",
      "What are you still holding onto that doesn't matter?"
    ]),
    themeId: "death_and_impermanence"
  },
  {
    title: "The Suffering Inquiry",
    description: "When you experience emotional pain, pause and ask: 'What is the story I'm telling myself?' Write down the story, then ask: 'Is this absolutely true?' Investigate.",
    hypothesis: "Questioning the stories behind suffering will reveal that much of my pain is self-created through belief in unexamined thoughts.",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What story caused you suffering today?",
      "What happened when you questioned its truth?",
      "Did the suffering shift or dissolve?"
    ]),
    themeId: "suffering_and_growth"
  },
  {
    title: "The Purpose Experiment",
    description: "Each day, ask yourself: 'If I knew I would die in one year, what would I do differently today?' Act on at least one insight from this question.",
    hypothesis: "Regular confrontation with mortality will clarify my true purpose and reduce time spent on meaningless activities.",
    duration: 7,
    checkInPrompts: JSON.stringify([
      "What did you do differently today based on the one-year question?",
      "What activities did you stop doing or deprioritize?",
      "Are you moving closer to what truly matters?"
    ]),
    themeId: "purpose_and_meaning"
  }
];

console.log(`Seeding ${experiments.length} life experiments...`);

for (const experiment of experiments) {
  await connection.execute(
    `INSERT INTO life_experiments (title, description, hypothesis, duration, checkInPrompts, themeId, isActive, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      experiment.title,
      experiment.description,
      experiment.hypothesis,
      experiment.duration,
      experiment.checkInPrompts,
      experiment.themeId,
      true
    ]
  );
  console.log(`✓ Seeded: ${experiment.title}`);
}

console.log(`\n✅ Successfully seeded ${experiments.length} life experiments!`);

await connection.end();
