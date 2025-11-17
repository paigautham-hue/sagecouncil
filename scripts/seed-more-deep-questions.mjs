import { drizzle } from 'drizzle-orm/mysql2';
import { deepQuestions } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const questions = [
  // Ego & Self (6 more)
  { questionText: "What would you lose if you stopped defending yourself?", theme: "Ego & Self", safePrompt: "Think about a recent time you felt defensive.", realPrompt: "What part of your identity feels threatened when you're criticized?", rawPrompt: "If you completely stopped defending your self-image, who would you be?" },
  { questionText: "Who are you when no one is watching?", theme: "Ego & Self", safePrompt: "Consider your private moments versus your public persona.", realPrompt: "What do you hide from others that reveals your true self?", rawPrompt: "Strip away every role, every identity—what remains?" },
  { questionText: "What lie about yourself have you been telling for so long you believe it's true?", theme: "Ego & Self", safePrompt: "Think about the story you tell about who you are.", realPrompt: "What narrative about yourself protects you from facing something painful?", rawPrompt: "What truth about yourself are you most afraid to admit?" },
  { questionText: "If your ego died tomorrow, what would you actually lose?", theme: "Ego & Self", safePrompt: "Consider what parts of your identity feel essential.", realPrompt: "What would remain if your reputation, achievements, and self-image dissolved?", rawPrompt: "Is there anything real beneath the constructed self?" },
  { questionText: "What are you pretending not to know about yourself?", theme: "Ego & Self", safePrompt: "Reflect on insights you've had but haven't fully acknowledged.", realPrompt: "What truth about yourself do you glimpse but quickly look away from?", rawPrompt: "What do you know but refuse to admit?" },
  { questionText: "When you say 'I,' who is speaking?", theme: "Ego & Self", safePrompt: "Notice the feeling of 'I' in your experience.", realPrompt: "Trace back the sense of 'I'—where does it come from?", rawPrompt: "Is there a 'you' that exists independently of thought?" },
  
  // Relationships (6 more)
  { questionText: "What do you demand from others that you refuse to give yourself?", theme: "Relationships", safePrompt: "Think about your expectations in relationships.", realPrompt: "What do you need from others because you can't provide it for yourself?", rawPrompt: "Are you using relationships to avoid facing your own emptiness?" },
  { questionText: "Who do you need to forgive to be free?", theme: "Relationships", safePrompt: "Consider someone you're holding resentment toward.", realPrompt: "How is your unforgiveness keeping you tethered to the past?", rawPrompt: "What would it cost you to forgive completely?" },
  { questionText: "What would love do right now?", theme: "Relationships", safePrompt: "Think about a current relationship challenge.", realPrompt: "If you acted from love instead of fear, what would change?", rawPrompt: "Are you capable of loving without needing anything in return?" },
  { questionText: "Who have you abandoned by abandoning yourself?", theme: "Relationships", safePrompt: "Reflect on times you've compromised your truth for others.", realPrompt: "How has betraying yourself damaged your relationships?", rawPrompt: "Can you love others if you don't love yourself?" },
  { questionText: "What are you afraid to say to the person you love most?", theme: "Relationships", safePrompt: "Consider what you hold back in your closest relationships.", realPrompt: "What truth would risk everything if you spoke it?", rawPrompt: "Is your silence protecting the relationship or killing it?" },
  { questionText: "Are you being loved, or are you being needed?", theme: "Relationships", safePrompt: "Reflect on the difference between being valued and being used.", realPrompt: "Do your relationships honor your wholeness or exploit your wounds?", rawPrompt: "Are you in relationships or are you in transactions?" },
  
  // Death & Impermanence (6 more)
  { questionText: "If you died tonight, what would you regret not having said?", theme: "Death & Impermanence", safePrompt: "Think about important conversations you've been avoiding.", realPrompt: "What truth have you been withholding that needs to be spoken?", rawPrompt: "Are you living as if you have forever?" },
  { questionText: "What are you doing with your one wild and precious life?", theme: "Death & Impermanence", safePrompt: "Consider how you're spending your days.", realPrompt: "Is your life aligned with what truly matters to you?", rawPrompt: "Are you living or just avoiding death?" },
  { questionText: "What would you do differently if you knew you had one year to live?", theme: "Death & Impermanence", safePrompt: "Imagine your time is limited—what changes?", realPrompt: "What are you postponing that you'd prioritize if time was short?", rawPrompt: "Why aren't you living that way now?" },
  { questionText: "Who will you be in your final moments?", theme: "Death & Impermanence", safePrompt: "Imagine yourself at the end of your life.", realPrompt: "What kind of person do you want to have become?", rawPrompt: "Are you becoming that person now?" },
  { questionText: "What are you clinging to that's already gone?", theme: "Death & Impermanence", safePrompt: "Notice what you're holding onto from the past.", realPrompt: "How is your attachment to what was preventing you from being present?", rawPrompt: "Can you let go of everything?" },
  { questionText: "If nothing lasts, what's the point?", theme: "Death & Impermanence", safePrompt: "Consider the meaning of impermanence.", realPrompt: "Does impermanence make life meaningless or precious?", rawPrompt: "Can you find meaning in the midst of meaninglessness?" },
  
  // Suffering & Growth (6 more)
  { questionText: "What pain are you avoiding that's creating more pain?", theme: "Suffering & Growth", safePrompt: "Think about discomfort you've been running from.", realPrompt: "How is your avoidance of pain causing suffering?", rawPrompt: "What would happen if you stopped running?" },
  { questionText: "What is your suffering trying to teach you?", theme: "Suffering & Growth", safePrompt: "Consider a current source of pain in your life.", realPrompt: "What is this suffering asking you to see or change?", rawPrompt: "Are you willing to learn the lesson?" },
  { questionText: "What would you have to give up to be happy?", theme: "Suffering & Growth", safePrompt: "Reflect on what might be blocking your peace.", realPrompt: "What attachment, belief, or identity is causing your suffering?", rawPrompt: "Are you willing to let it go?" },
  { questionText: "How are you complicit in your own suffering?", theme: "Suffering & Growth", safePrompt: "Notice patterns in your life that create pain.", realPrompt: "What choices are you making that perpetuate your suffering?", rawPrompt: "Are you addicted to your own misery?" },
  { questionText: "What wound are you protecting by staying small?", theme: "Suffering & Growth", safePrompt: "Consider areas where you hold yourself back.", realPrompt: "What old pain are you avoiding by not fully showing up?", rawPrompt: "Is your smallness a form of self-protection or self-betrayal?" },
  { questionText: "If your suffering had a voice, what would it say?", theme: "Suffering & Growth", safePrompt: "Imagine your pain could speak to you.", realPrompt: "What message is your suffering carrying?", rawPrompt: "Are you listening?" },
  
  // Presence & Awareness (3 more)
  { questionText: "What are you missing right now by being somewhere else?", theme: "Presence & Awareness", safePrompt: "Notice where your attention is in this moment.", realPrompt: "How much of your life are you missing by being lost in thought?", rawPrompt: "Have you ever truly been here?" },
  { questionText: "What would you notice if you stopped trying to fix yourself?", theme: "Presence & Awareness", safePrompt: "Consider how much energy goes into self-improvement.", realPrompt: "What is already whole that you're overlooking?", rawPrompt: "Is there anything to fix?" },
  { questionText: "Who is aware of your thoughts?", theme: "Presence & Awareness", safePrompt: "Notice the space between thoughts.", realPrompt: "What is the awareness that witnesses your experience?", rawPrompt: "Are you the thinker or the awareness of thinking?" },
  
  // Purpose & Meaning (3 more)
  { questionText: "What would you do if you knew you couldn't fail?", theme: "Purpose & Meaning", safePrompt: "Imagine fear of failure was removed.", realPrompt: "What calling have you been avoiding because of fear?", rawPrompt: "Is fear of failure an excuse for not trying?" },
  { questionText: "What breaks your heart about the world?", theme: "Purpose & Meaning", safePrompt: "Consider what moves you to tears or anger.", realPrompt: "What injustice or suffering calls to you?", rawPrompt: "Is your heartbreak pointing to your purpose?" },
  { questionText: "If you weren't afraid of being judged, what would you create?", theme: "Purpose & Meaning", safePrompt: "Think about creative impulses you've suppressed.", realPrompt: "What gift are you withholding from the world?", rawPrompt: "Is your fear of judgment killing your purpose?" }
];

console.log('Seeding 30 additional Deep Questions...\n');

for (const question of questions) {
  try {
    await db.insert(deepQuestions).values(question);
    console.log(`✅ Seeded: "${question.questionText}"`);
  } catch (error) {
    console.error(`❌ Failed: "${question.questionText}"`, error.message);
  }
}

console.log('\n✨ Successfully expanded Deep Questions library to 54 total questions!');
process.exit(0);
