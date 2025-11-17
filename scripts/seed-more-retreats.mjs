import { drizzle } from 'drizzle-orm/mysql2';
import { microRetreats } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const retreats = [
  {
    title: "Loving-Kindness Meditation",
    description: "Cultivate compassion for yourself and others through traditional metta practice. This retreat guides you through extending loving-kindness to yourself, loved ones, neutral people, difficult people, and all beings.",
    durationMinutes: 15,
    theme: "Compassion",
    steps: JSON.stringify([
      {
        type: "instruction",
        title: "Welcome to Metta Practice",
        content: "Loving-kindness meditation (metta) is the practice of cultivating unconditional goodwill toward all beings. We'll start with ourselves, then gradually expand outward. Find a comfortable seated position.",
        duration: 60
      },
      {
        type: "breathing",
        title: "Centering Breath",
        content: "Take three deep breaths. With each exhale, let your body soften and settle. Allow your heart center to open.",
        duration: 90
      },
      {
        type: "reflection",
        title: "Loving-Kindness for Yourself",
        content: "Place your hand on your heart. Silently repeat: 'May I be happy. May I be healthy. May I be safe. May I live with ease.' Feel the words as a genuine wish for your own wellbeing. Notice any resistance.",
        duration: 180
      },
      {
        type: "reflection",
        title: "Loving-Kindness for a Loved One",
        content: "Bring to mind someone you love easily. Visualize them and repeat: 'May you be happy. May you be healthy. May you be safe. May you live with ease.' Feel genuine care radiating toward them.",
        duration: 180
      },
      {
        type: "reflection",
        title: "Loving-Kindness for All Beings",
        content: "Expand your awareness to include all beings everywhere. Repeat: 'May all beings be happy. May all beings be healthy. May all beings be safe. May all beings live with ease.' Feel your heart opening to the world.",
        duration: 180
      }
    ])
  },
  {
    title: "Impermanence Contemplation",
    description: "Reflect deeply on the transient nature of all things. This retreat uses guided contemplation to help you make peace with change, loss, and the flowing nature of existence.",
    durationMinutes: 15,
    theme: "Impermanence",
    steps: JSON.stringify([
      {
        type: "instruction",
        title: "Contemplating Change",
        content: "Everything that arises passes away. This is not pessimism—it's the fundamental nature of reality. Today we'll contemplate impermanence not as a concept, but as a felt experience. Settle into your seat.",
        duration: 60
      },
      {
        type: "breathing",
        title: "Breath as Impermanence",
        content: "Notice your breath. Each inhale arises and passes. Each exhale arises and passes. Nothing stays. Even this breath, right now, is already gone. Feel the constant flow.",
        duration: 120
      },
      {
        type: "reflection",
        title: "What Has Changed?",
        content: "Reflect: What in your life was once solid that is now gone? A relationship, a belief, a version of yourself? Notice how you survived the loss. Notice how new things arose. Write about one significant change.",
        duration: 240
      },
      {
        type: "reflection",
        title: "What Are You Clinging To?",
        content: "What are you holding onto that's already changing? A relationship, your youth, your health, your identity? Feel the suffering that comes from clinging. What would it be like to hold it lightly?",
        duration: 180
      },
      {
        type: "integration",
        title: "Living with Impermanence",
        content: "If everything is impermanent, what becomes precious? How does accepting change free you? What would you do differently today if you truly accepted that nothing lasts? Write your insights.",
        duration: 180
      }
    ])
  },
  {
    title: "Forgiveness Practice",
    description: "Release the burden of resentment through guided forgiveness meditation. This retreat helps you forgive yourself, forgive others, and ask for forgiveness—not as condoning harm, but as freeing your heart.",
    durationMinutes: 15,
    theme: "Forgiveness",
    steps: JSON.stringify([
      {
        type: "instruction",
        title: "The Practice of Forgiveness",
        content: "Forgiveness is not condoning harm. It's releasing the poison of resentment that harms you. Today we'll practice three directions of forgiveness: forgiving yourself, forgiving others, and asking for forgiveness.",
        duration: 60
      },
      {
        type: "breathing",
        title: "Opening the Heart",
        content: "Place your hand on your heart. Breathe into your heart center. With each exhale, let your heart soften. Create space for forgiveness.",
        duration: 90
      },
      {
        type: "reflection",
        title: "Forgiving Yourself",
        content: "Bring to mind something you've done that you regret. See yourself with compassion. Say: 'I forgive myself for [what you did]. I was doing the best I could with what I knew. I release myself from this burden.' Feel the weight lifting.",
        duration: 240
      },
      {
        type: "reflection",
        title: "Forgiving Another",
        content: "Bring to mind someone who has harmed you. This doesn't mean what they did was okay. Say: 'I forgive you for [what they did]. I release the burden of hatred. I free myself from this resentment.' Notice any resistance. That's okay.",
        duration: 240
      },
      {
        type: "integration",
        title: "Freedom Through Forgiveness",
        content: "Forgiveness is a practice, not a one-time event. You may need to forgive the same thing many times. What did you notice in this practice? What feels lighter? What still feels heavy? Write your reflections.",
        duration: 180
      }
    ])
  },
  {
    title: "Befriending Your Inner Critic",
    description: "Transform your relationship with self-judgment through compassionate inquiry. This retreat helps you understand the protective function of your inner critic and develop a kinder inner voice.",
    durationMinutes: 15,
    theme: "Self-Compassion",
    steps: JSON.stringify([
      {
        type: "instruction",
        title: "Meeting Your Inner Critic",
        content: "Your inner critic is not your enemy—it's a part of you trying to protect you (often badly). Today we'll meet this voice with curiosity instead of judgment. Get comfortable.",
        duration: 60
      },
      {
        type: "breathing",
        title: "Grounding in Safety",
        content: "Take a few deep breaths. Feel your body supported by the chair or floor. You are safe right now. This exploration is happening in a space of safety.",
        duration: 90
      },
      {
        type: "reflection",
        title: "Listening to the Critic",
        content: "What does your inner critic say to you? Write down the harshest things it says. Don't edit. Let it speak. 'You're not good enough. You're lazy. You're a failure.' Just witness the voice.",
        duration: 180
      },
      {
        type: "reflection",
        title: "Understanding the Critic",
        content: "Ask your inner critic: 'What are you trying to protect me from?' Listen. Often the critic is trying to prevent rejection, failure, or shame. It's trying to keep you safe (even if its methods are harmful). What is it protecting?",
        duration: 180
      },
      {
        type: "integration",
        title: "Responding with Compassion",
        content: "Thank your inner critic for trying to protect you. Then gently say: 'I hear you, but I don't need this kind of protection anymore. I can handle failure. I can handle rejection. You can rest now.' How does this feel? Write your experience.",
        duration: 180
      }
    ])
  },
  {
    title: "Solitude & Silence",
    description: "Explore the richness of being alone without distraction. This retreat guides you into intentional solitude, helping you distinguish between loneliness and the nourishing quality of aloneness.",
    durationMinutes: 15,
    theme: "Solitude",
    steps: JSON.stringify([
      {
        type: "instruction",
        title: "Entering Solitude",
        content: "Solitude is not loneliness—it's the art of being alone without being lonely. Today we'll practice being with ourselves without distraction, without entertainment, without escape. Just you, here, now.",
        duration: 60
      },
      {
        type: "breathing",
        title: "Settling into Silence",
        content: "Close your eyes. Notice the silence. Not the absence of sound, but the space that holds all sound. Breathe into this silence. Let it hold you.",
        duration: 120
      },
      {
        type: "reflection",
        title: "What Are You Avoiding?",
        content: "When you're alone, what do you reach for? Your phone, TV, food, work? What are you avoiding by staying busy? What discomfort arises when there's nothing to distract you? Write what comes up.",
        duration: 240
      },
      {
        type: "reflection",
        title: "The Gift of Aloneness",
        content: "Sit in silence for these minutes. Don't do anything. Don't fix anything. Just be. Notice what arises—boredom, restlessness, peace, insight. All of it is welcome. This is the practice of being with yourself.",
        duration: 180
      },
      {
        type: "integration",
        title: "Solitude as Nourishment",
        content: "What did you discover in the silence? How is solitude different from loneliness? How might you create more intentional solitude in your life? Write your reflections.",
        duration: 180
      }
    ])
  }
];

console.log('Seeding 5 additional Micro-Retreats...\n');

for (const retreat of retreats) {
  try {
    await db.insert(microRetreats).values(retreat);
    console.log(`✅ Seeded retreat: "${retreat.title}"`);
  } catch (error) {
    console.error(`❌ Failed to seed retreat: "${retreat.title}"`, error.message);
  }
}

console.log('\n✨ Successfully expanded Micro-Retreats library to 8 total retreats!');
process.exit(0);
