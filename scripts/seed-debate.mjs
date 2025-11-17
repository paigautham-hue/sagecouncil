import { drizzle } from "drizzle-orm/mysql2";
import { councilDebates } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

// Calculate current week number
const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);

const sampleDebate = {
  questionText: "Is suffering necessary for spiritual growth, or is it just a story we tell ourselves to make sense of pain?",
  themeId: "suffering_growth",
  teacherIds: [3, 8, 5, 12], // Buddha, Viktor Frankl, Eckhart Tolle, Nisargadatta
  teacherResponses: [
    {
      teacherId: 3,
      response: "Suffering itself is not necessary—clinging is. The First Noble Truth states that dukkha exists, but the path I taught is precisely about ending suffering, not perpetuating it. Growth comes not from pain, but from understanding its cause: craving, aversion, and ignorance. When you see clearly, suffering ceases. To romanticize pain as a teacher is to miss the point entirely. Liberation is possible here and now."
    },
    {
      teacherId: 8,
      response: "Suffering is not necessary for growth—but meaning is. In the concentration camps, I witnessed people who found purpose even in the most horrific circumstances, and others who had everything yet despaired. The question is not whether suffering teaches us, but whether we choose to learn from it. We cannot always choose our circumstances, but we can always choose our attitude. That choice is where growth lives."
    },
    {
      teacherId: 5,
      response: "Suffering is the ego's resistance to what is. The present moment, accepted fully, contains no suffering—only the situation as it is. Pain may be inevitable, but suffering is optional. Spiritual growth happens not through suffering, but through presence. When you stop arguing with reality, you discover a deeper dimension of yourself that was never touched by circumstances. This is not a story—it is direct experience."
    },
    {
      teacherId: 12,
      response: "You are not the one who suffers. Suffering happens to the body-mind, but You—the awareness—remain untouched. To believe suffering is necessary for growth is to identify with the person, not the Self. Growth, too, is a concept. What you truly are was never born and will never die. See this, and suffering loses its grip. The question itself assumes a 'you' that needs to grow. Find out who is asking."
    }
  ],
  synthesis: "Here we witness a profound convergence: all four teachers agree that suffering itself is not the teacher—our relationship to it is. The Buddha points to clinging as the root; Frankl to meaning-making; Tolle to presence; Nisargadatta to the witness. Yet they diverge on whether growth is even real. The Buddha offers a path; Frankl a choice; Tolle a dimension; Nisargadatta a dissolution of the seeker itself. Perhaps the deepest teaching is this: suffering is neither necessary nor meaningless—it simply is. What we do with it reveals everything.",
  weekNumber,
  year: now.getFullYear(),
};

async function seedDebate() {
  console.log("Seeding Council Debate for Week", weekNumber, "of", now.getFullYear());
  
  try {
    await db.insert(councilDebates).values(sampleDebate);
    console.log("✅ Successfully seeded Council Debate!");
  } catch (error) {
    console.error("Error seeding debate:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedDebate();
