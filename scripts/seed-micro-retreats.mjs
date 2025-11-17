import { drizzle } from "drizzle-orm/mysql2";
import { microRetreats } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const sampleRetreats = [
  {
    title: "Breath & Presence",
    description: "A simple practice to ground yourself in the present moment through conscious breathing and body awareness.",
    themeId: "presence_awareness",
    durationMinutes: 15,
    steps: [
      {
        type: "Grounding",
        title: "Arrive Here",
        content: "Find a comfortable seated position. Close your eyes or soften your gaze. Take three deep breaths, letting each exhale be a little longer than the inhale. Notice where you are. Notice that you are here.",
        durationSeconds: 120
      },
      {
        type: "Breathing",
        title: "Follow the Breath",
        content: "For the next few minutes, simply follow your natural breath. Don't change it—just observe. Notice the cool air entering your nostrils. Notice the slight pause at the top of the inhale. Notice the warm air leaving. Notice the pause at the bottom of the exhale. When your mind wanders (and it will), gently return to the breath.",
        durationSeconds: 300
      },
      {
        type: "Body Scan",
        title: "Scan Your Body",
        content: "Bring your awareness to your body. Start at the crown of your head and slowly move down: forehead, eyes, jaw, neck, shoulders, arms, chest, belly, hips, legs, feet. Don't judge what you find—just notice. Where is there tension? Where is there ease? Breathe into any areas of tightness.",
        durationSeconds: 180
      },
      {
        type: "Reflection",
        title: "Notice What's Here",
        content: "Without analyzing, simply notice: What thoughts are present? What emotions? What sensations? Imagine you're a compassionate observer, watching your inner weather without needing to change it. Everything is allowed to be here.",
        durationSeconds: 120
      },
      {
        type: "Integration",
        title: "Carry This Forward",
        content: "Before you return to your day, set a simple intention: 'I will pause three times today to take three conscious breaths.' That's it. Three pauses. Three breaths each. This retreat doesn't end when you stand up—it continues in those micro-moments of presence.",
        durationSeconds: 60
      }
    ]
  },
  {
    title: "Shadow Work: Meeting Your Inner Critic",
    description: "A gentle exploration of the voice that judges you most harshly—and the wisdom hidden beneath it.",
    themeId: "suffering_growth",
    durationMinutes: 15,
    steps: [
      {
        type: "Grounding",
        title: "Create a Safe Container",
        content: "Sit comfortably. Place one hand on your heart, one on your belly. Breathe deeply. You are about to meet a part of yourself that often feels like an enemy. But you are safe. You are held. You are bigger than any single voice inside you.",
        durationSeconds: 90
      },
      {
        type: "Inquiry",
        title: "Call Forward the Critic",
        content: "Think of a recent moment when you felt harsh self-judgment. What did that inner voice say? Write it down if you can, or simply let it speak in your mind. Don't argue with it yet—just listen. What is the tone? What are the exact words?",
        durationSeconds: 180
      },
      {
        type: "Dialogue",
        title: "Ask: What Are You Protecting?",
        content: "Now, with curiosity instead of resistance, ask your inner critic: 'What are you trying to protect me from?' Listen. Often, the critic is trying to keep you safe from failure, rejection, or shame. It's a misguided protector. What does it fear will happen if it stops criticizing you?",
        durationSeconds: 240
      },
      {
        type: "Reframe",
        title: "Translate the Criticism",
        content: "Take the critic's harshest statement and translate it into a need. For example: 'You're so lazy' might translate to 'I need to feel productive and purposeful.' 'You're not good enough' might translate to 'I need to feel valued and seen.' What is the deeper need beneath the attack?",
        durationSeconds: 180
      },
      {
        type: "Integration",
        title: "Thank and Release",
        content: "Say to your inner critic: 'Thank you for trying to protect me. I see your intention. But I don't need you to be so harsh anymore. I've got this.' Imagine the critic softening, becoming an advisor instead of an attacker. You don't have to banish it—just change the relationship.",
        durationSeconds: 90
      }
    ]
  },
  {
    title: "Gratitude as Rebellion",
    description: "In a world optimized for dissatisfaction, gratitude is a radical act. This retreat helps you reclaim it.",
    themeId: "purpose_meaning",
    durationMinutes: 15,
    steps: [
      {
        type: "Grounding",
        title: "Pause the Striving",
        content: "Sit quietly. Notice how much of your mental energy is spent on what's missing, what's wrong, what needs to be fixed. This is not your fault—you've been trained to focus on lack. For the next 15 minutes, you're going to practice a different way of seeing.",
        durationSeconds: 90
      },
      {
        type: "Reflection",
        title: "Three Simple Things",
        content: "Name three things you're grateful for right now. But here's the catch: they must be simple. Not 'my family' or 'my health'—those are too abstract. Try: 'The warmth of this chair.' 'The fact that I can see color.' 'The sound of birds outside.' Let yourself feel the texture of each one.",
        durationSeconds: 180
      },
      {
        type: "Inquiry",
        title: "What Did You Almost Miss?",
        content: "Think about your day so far. What small moment of beauty or kindness did you almost overlook? A stranger's smile? The way light hit a wall? A moment of ease? Our minds are wired to scan for threats, so goodness often slips by unnoticed. Retrieve one moment now.",
        durationSeconds: 180
      },
      {
        type: "Practice",
        title: "The Gratitude Breath",
        content: "For the next few minutes, pair your breath with gratitude. Inhale: 'I am here.' Exhale: 'This is enough.' Inhale: 'I am alive.' Exhale: 'This is enough.' Let the rhythm settle into your body. This is not toxic positivity—it's a choice to honor what is, even as you work toward what could be.",
        durationSeconds: 240
      },
      {
        type: "Integration",
        title: "Carry the Practice",
        content: "Before you leave this retreat, set a reminder on your phone for tonight. Label it: 'What did I almost miss today?' Each evening, name one thing. That's it. One thing. Over time, this practice rewires your attention. You start to see the world differently—not because it changed, but because you did.",
        durationSeconds: 90
      }
    ]
  }
];

async function seedMicroRetreats() {
  console.log("Seeding Micro-Retreats...");
  
  try {
    for (const retreat of sampleRetreats) {
      await db.insert(microRetreats).values(retreat);
      console.log(`✅ Seeded: ${retreat.title}`);
    }
    console.log("✅ Successfully seeded all Micro-Retreats!");
  } catch (error) {
    console.error("Error seeding micro-retreats:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedMicroRetreats();
