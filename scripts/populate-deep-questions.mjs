import { drizzle } from "drizzle-orm/mysql2";
import { deepQuestions } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const questions = [
  // Ego & Self (themeId: "ego-self")
  {
    questionText: "Who am I beyond my thoughts, emotions, and social roles?",
    themeId: "ego-self",
    difficulty: 8,
    teacherIds: [1, 7, 18, 24, 30], // Adyashanti, Eckhart Tolle, Jiddu Krishnamurti, Nisargadatta, Ramana Maharshi
    tags: ["self-inquiry", "identity", "consciousness", "non-duality"],
  },
  {
    questionText: "What is the relationship between the observer and the observed?",
    themeId: "ego-self",
    difficulty: 9,
    teacherIds: [6, 18, 24], // David Bohm, Jiddu Krishnamurti, Nisargadatta
    tags: ["consciousness", "perception", "awareness", "duality"],
  },
  {
    questionText: "How do I distinguish between my authentic self and my conditioned self?",
    themeId: "ego-self",
    difficulty: 7,
    teacherIds: [5, 18, 25], // Carl Jung, Jiddu Krishnamurti, Osho
    tags: ["authenticity", "conditioning", "shadow-work", "self-discovery"],
  },
  {
    questionText: "What remains when all identifications fall away?",
    themeId: "ego-self",
    difficulty: 10,
    teacherIds: [1, 24, 30], // Adyashanti, Nisargadatta, Ramana Maharshi
    tags: ["non-duality", "emptiness", "pure-consciousness", "liberation"],
  },
  
  // Relationships (themeId: "relationships")
  {
    questionText: "How can I love another without losing myself?",
    themeId: "relationships",
    difficulty: 6,
    teacherIds: [16, 26, 34], // Jalal ad-Din Rumi, Pema Chödrön, Tara Brach
    tags: ["love", "boundaries", "self-care", "intimacy"],
  },
  {
    questionText: "What is the difference between attachment and genuine connection?",
    themeId: "relationships",
    difficulty: 7,
    teacherIds: [11, 15, 26, 35], // Gautama Buddha, Jack Kornfield, Pema Chödrön, Thich Nhat Hanh
    tags: ["attachment", "connection", "non-attachment", "love"],
  },
  {
    questionText: "How do I hold space for another's pain without taking it on as my own?",
    themeId: "relationships",
    difficulty: 8,
    teacherIds: [4, 10, 34], // Bessel van der Kolk, Gabor Maté, Tara Brach
    tags: ["compassion", "boundaries", "empathy", "healing"],
  },
  {
    questionText: "Can I truly meet another person if I haven't met myself?",
    themeId: "relationships",
    difficulty: 7,
    teacherIds: [1, 18, 23], // Adyashanti, Jiddu Krishnamurti, Mooji
    tags: ["self-knowledge", "intimacy", "presence", "authenticity"],
  },
  
  // Death & Impermanence (themeId: "death-impermanence")
  {
    questionText: "How would I live differently if I truly accepted my mortality?",
    themeId: "death-impermanence",
    difficulty: 7,
    teacherIds: [22, 33, 36], // Marcus Aurelius, Seneca, Viktor Frankl
    tags: ["mortality", "meaning", "urgency", "values"],
  },
  {
    questionText: "What dies when the body dies?",
    themeId: "death-impermanence",
    difficulty: 9,
    teacherIds: [11, 24, 30], // Gautama Buddha, Nisargadatta, Ramana Maharshi
    tags: ["death", "consciousness", "rebirth", "liberation"],
  },
  {
    questionText: "How can I befriend impermanence rather than resist it?",
    themeId: "death-impermanence",
    difficulty: 6,
    teacherIds: [11, 26, 35], // Gautama Buddha, Pema Chödrön, Thich Nhat Hanh
    tags: ["impermanence", "acceptance", "change", "equanimity"],
  },
  {
    questionText: "What is the relationship between death awareness and aliveness?",
    themeId: "death-impermanence",
    difficulty: 8,
    teacherIds: [7, 22, 36], // Eckhart Tolle, Marcus Aurelius, Viktor Frankl
    tags: ["presence", "mortality", "vitality", "meaning"],
  },
  
  // Suffering & Growth (themeId: "suffering-growth")
  {
    questionText: "What is the difference between pain and suffering?",
    themeId: "suffering-growth",
    difficulty: 6,
    teacherIds: [7, 11, 35, 36], // Eckhart Tolle, Gautama Buddha, Thich Nhat Hanh, Viktor Frankl
    tags: ["pain", "suffering", "resistance", "acceptance"],
  },
  {
    questionText: "How do I transform my wounds into wisdom?",
    themeId: "suffering-growth",
    difficulty: 7,
    teacherIds: [5, 10, 17, 36], // Carl Jung, Gabor Maté, James Hillman, Viktor Frankl
    tags: ["trauma", "healing", "integration", "growth"],
  },
  {
    questionText: "Can suffering be a doorway to awakening?",
    themeId: "suffering-growth",
    difficulty: 8,
    teacherIds: [1, 7, 11, 26], // Adyashanti, Eckhart Tolle, Gautama Buddha, Pema Chödrön
    tags: ["suffering", "awakening", "transformation", "spiritual-crisis"],
  },
  {
    questionText: "What is the role of resistance in perpetuating my suffering?",
    themeId: "suffering-growth",
    difficulty: 7,
    teacherIds: [7, 11, 34], // Eckhart Tolle, Gautama Buddha, Tara Brach
    tags: ["resistance", "acceptance", "suffering", "mindfulness"],
  },
  
  // Presence & Awareness (themeId: "presence-awareness")
  {
    questionText: "What is the difference between thinking about the present and being present?",
    themeId: "presence-awareness",
    difficulty: 6,
    teacherIds: [7, 19, 35], // Eckhart Tolle, Jon Kabat-Zinn, Thich Nhat Hanh
    tags: ["presence", "mindfulness", "thinking", "awareness"],
  },
  {
    questionText: "How do I cultivate awareness without becoming the 'watcher'?",
    themeId: "presence-awareness",
    difficulty: 9,
    teacherIds: [1, 18, 24], // Adyashanti, Jiddu Krishnamurti, Nisargadatta
    tags: ["awareness", "non-duality", "observer", "consciousness"],
  },
  {
    questionText: "What is aware of my awareness?",
    themeId: "presence-awareness",
    difficulty: 10,
    teacherIds: [24, 30, 31], // Nisargadatta, Ramana Maharshi, Sam Harris
    tags: ["meta-awareness", "consciousness", "self-inquiry", "non-duality"],
  },
  {
    questionText: "How can I remain present in the midst of chaos?",
    themeId: "presence-awareness",
    difficulty: 7,
    teacherIds: [7, 19, 26, 35], // Eckhart Tolle, Jon Kabat-Zinn, Pema Chödrön, Thich Nhat Hanh
    tags: ["presence", "equanimity", "stress", "mindfulness"],
  },
  
  // Purpose & Meaning (themeId: "purpose-meaning")
  {
    questionText: "What is my unique gift to the world?",
    themeId: "purpose-meaning",
    difficulty: 6,
    teacherIds: [17, 28, 36], // James Hillman, Rabindranath Tagore, Viktor Frankl
    tags: ["purpose", "calling", "service", "gifts"],
  },
  {
    questionText: "Can life have meaning without a predetermined purpose?",
    themeId: "purpose-meaning",
    difficulty: 8,
    teacherIds: [3, 27, 36], // Baruch Spinoza, Plato, Viktor Frankl
    tags: ["meaning", "purpose", "existentialism", "philosophy"],
  },
  {
    questionText: "How do I distinguish between my ego's agenda and my soul's calling?",
    themeId: "purpose-meaning",
    difficulty: 7,
    teacherIds: [5, 17, 20], // Carl Jung, James Hillman, Kabir
    tags: ["calling", "ego", "soul", "discernment"],
  },
  {
    questionText: "What would I do if I knew I couldn't fail?",
    themeId: "purpose-meaning",
    difficulty: 5,
    teacherIds: [17, 28, 29], // James Hillman, Rabindranath Tagore, Rainer Maria Rilke
    tags: ["courage", "purpose", "fear", "potential"],
  },
  
  // Cross-theme deep questions
  {
    questionText: "What is the relationship between freedom and responsibility?",
    themeId: null,
    difficulty: 7,
    teacherIds: [3, 8, 22, 33, 36], // Baruch Spinoza, Epictetus, Marcus Aurelius, Seneca, Viktor Frankl
    tags: ["freedom", "responsibility", "ethics", "choice"],
  },
  {
    questionText: "How do I know if I'm growing or just changing?",
    themeId: null,
    difficulty: 6,
    teacherIds: [5, 15, 26], // Carl Jung, Jack Kornfield, Pema Chödrön
    tags: ["growth", "change", "transformation", "discernment"],
  },
  {
    questionText: "What is the difference between spiritual bypassing and genuine transcendence?",
    themeId: null,
    difficulty: 8,
    teacherIds: [1, 10, 15, 26], // Adyashanti, Gabor Maté, Jack Kornfield, Pema Chödrön
    tags: ["spiritual-bypassing", "transcendence", "shadow-work", "integration"],
  },
  {
    questionText: "Can I be fully human and fully awake at the same time?",
    themeId: null,
    difficulty: 9,
    teacherIds: [1, 7, 15, 25], // Adyashanti, Eckhart Tolle, Jack Kornfield, Osho
    tags: ["awakening", "humanity", "embodiment", "integration"],
  },
  {
    questionText: "What is the relationship between solitude and loneliness?",
    themeId: null,
    difficulty: 6,
    teacherIds: [18, 29, 30], // Jiddu Krishnamurti, Rainer Maria Rilke, Ramana Maharshi
    tags: ["solitude", "loneliness", "aloneness", "connection"],
  },
  {
    questionText: "How do I balance acceptance with the desire for change?",
    themeId: null,
    difficulty: 7,
    teacherIds: [11, 19, 34], // Gautama Buddha, Jon Kabat-Zinn, Tara Brach
    tags: ["acceptance", "change", "paradox", "balance"],
  },
];

async function populateDeepQuestions() {
  console.log("🤔 Populating Deep Questions table...\n");
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const question of questions) {
    try {
      await db.insert(deepQuestions).values(question);
      console.log(`✅ Added: "${question.questionText.substring(0, 60)}..."`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error adding question: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ DEEP QUESTIONS POPULATED!`);
  console.log(`   Success: ${successCount} questions`);
  console.log(`   Errors: ${errorCount} questions`);
  console.log(`${"=".repeat(60)}`);
}

populateDeepQuestions().catch(console.error);
