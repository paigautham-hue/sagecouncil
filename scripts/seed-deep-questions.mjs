import { drizzle } from "drizzle-orm/mysql2";
import { deepQuestions } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const questions = [
  // Ego & Self theme
  {
    questionText: "What part of your identity feels most fragile right now?",
    themeId: "ego_self",
    difficulty: 2,
    teacherIds: [1, 5, 12], // Adyashanti, Eckhart Tolle, Nisargadatta
    tags: ["identity", "vulnerability", "ego"],
  },
  {
    questionText: "If no one could see you or judge you for a week, what would you do differently?",
    themeId: "ego_self",
    difficulty: 3,
    teacherIds: [1, 5, 12],
    tags: ["authenticity", "judgment", "freedom"],
  },
  {
    questionText: "What do you pretend to know that you actually don't understand?",
    themeId: "ego_self",
    difficulty: 3,
    teacherIds: [1, 12, 19], // Adyashanti, Nisargadatta, Socrates
    tags: ["honesty", "knowledge", "humility"],
  },
  
  // Relationships theme
  {
    questionText: "Who in your life do you avoid being fully honest with, and why?",
    themeId: "relationships",
    difficulty: 2,
    teacherIds: [5, 21, 30], // Eckhart Tolle, Thich Nhat Hanh, bell hooks
    tags: ["honesty", "communication", "fear"],
  },
  {
    questionText: "What do you need from others that you're afraid to ask for?",
    themeId: "relationships",
    difficulty: 2,
    teacherIds: [21, 30, 7], // Thich Nhat Hanh, bell hooks, Brené Brown
    tags: ["needs", "vulnerability", "asking"],
  },
  {
    questionText: "When do you feel most alone, even when surrounded by people?",
    themeId: "relationships",
    difficulty: 3,
    teacherIds: [5, 21, 7],
    tags: ["loneliness", "connection", "presence"],
  },
  
  // Death & Impermanence theme
  {
    questionText: "What would you do today if you knew you had exactly one year left to live?",
    themeId: "death_impermanence",
    difficulty: 2,
    teacherIds: [3, 14, 18], // Buddha, Marcus Aurelius, Seneca
    tags: ["mortality", "priorities", "time"],
  },
  {
    questionText: "What are you holding onto that you know you need to let go of?",
    themeId: "death_impermanence",
    difficulty: 2,
    teacherIds: [3, 5, 21],
    tags: ["letting-go", "attachment", "change"],
  },
  {
    questionText: "If you died tomorrow, what would you regret not having said or done?",
    themeId: "death_impermanence",
    difficulty: 3,
    teacherIds: [3, 14, 18],
    tags: ["regret", "action", "mortality"],
  },
  
  // Suffering & Growth theme
  {
    questionText: "What pain are you avoiding that might actually be trying to teach you something?",
    themeId: "suffering_growth",
    difficulty: 2,
    teacherIds: [3, 8, 5], // Buddha, Viktor Frankl, Eckhart Tolle
    tags: ["pain", "avoidance", "growth"],
  },
  {
    questionText: "What story about your suffering are you attached to?",
    themeId: "suffering_growth",
    difficulty: 3,
    teacherIds: [3, 5, 8],
    tags: ["narrative", "identity", "suffering"],
  },
  {
    questionText: "When has your greatest pain led to your deepest growth?",
    themeId: "suffering_growth",
    difficulty: 1,
    teacherIds: [3, 8, 21],
    tags: ["transformation", "resilience", "meaning"],
  },
  
  // Presence & Awareness theme
  {
    questionText: "What are you doing when you feel most fully alive and present?",
    themeId: "presence_awareness",
    difficulty: 1,
    teacherIds: [5, 21, 1],
    tags: ["presence", "aliveness", "flow"],
  },
  {
    questionText: "What thoughts keep pulling you out of the present moment?",
    themeId: "presence_awareness",
    difficulty: 2,
    teacherIds: [5, 21, 3],
    tags: ["distraction", "mind", "awareness"],
  },
  {
    questionText: "When was the last time you felt completely at peace with what is?",
    themeId: "presence_awareness",
    difficulty: 2,
    teacherIds: [5, 21, 12],
    tags: ["acceptance", "peace", "surrender"],
  },
  
  // Purpose & Meaning theme
  {
    questionText: "What would you do with your life if you knew you couldn't fail?",
    themeId: "purpose_meaning",
    difficulty: 1,
    teacherIds: [8, 13, 17], // Viktor Frankl, Rumi, Joseph Campbell
    tags: ["purpose", "fear", "calling"],
  },
  {
    questionText: "What breaks your heart about the world, and what does that tell you about your purpose?",
    themeId: "purpose_meaning",
    difficulty: 2,
    teacherIds: [8, 30, 21],
    tags: ["compassion", "purpose", "service"],
  },
  {
    questionText: "If your life were a book, what would you want the next chapter to be about?",
    themeId: "purpose_meaning",
    difficulty: 1,
    teacherIds: [8, 17, 14],
    tags: ["direction", "intention", "narrative"],
  },
  
  // Fear & Anxiety theme
  {
    questionText: "What are you most afraid of, and what would happen if that fear came true?",
    themeId: "fear_anxiety",
    difficulty: 2,
    teacherIds: [3, 5, 21],
    tags: ["fear", "worst-case", "courage"],
  },
  {
    questionText: "What would you attempt if you weren't afraid of what others might think?",
    themeId: "fear_anxiety",
    difficulty: 2,
    teacherIds: [7, 14, 19],
    tags: ["courage", "judgment", "authenticity"],
  },
  {
    questionText: "When you're anxious, what are you really trying to control?",
    themeId: "fear_anxiety",
    difficulty: 3,
    teacherIds: [3, 5, 12],
    tags: ["control", "anxiety", "surrender"],
  },
  
  // Desire & Attachment theme
  {
    questionText: "What do you want so badly that it's making you suffer?",
    themeId: "desire_attachment",
    difficulty: 2,
    teacherIds: [3, 12, 5],
    tags: ["desire", "suffering", "attachment"],
  },
  {
    questionText: "What would you have to give up to be truly free?",
    themeId: "desire_attachment",
    difficulty: 3,
    teacherIds: [3, 12, 1],
    tags: ["freedom", "sacrifice", "liberation"],
  },
  {
    questionText: "What are you chasing that you think will finally make you happy?",
    themeId: "desire_attachment",
    difficulty: 2,
    teacherIds: [3, 5, 14],
    tags: ["happiness", "pursuit", "fulfillment"],
  },
];

async function seedDeepQuestions() {
  console.log("Seeding deep questions...");
  
  try {
    for (const question of questions) {
      await db.insert(deepQuestions).values(question);
      console.log(`✓ Added: ${question.questionText.substring(0, 50)}...`);
    }
    
    console.log(`\n✅ Successfully seeded ${questions.length} deep questions!`);
  } catch (error) {
    console.error("Error seeding deep questions:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedDeepQuestions();
