import { drizzle } from 'drizzle-orm/mysql2';
import { journeys, journeyDays } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const journeyData = {
  title: 'Understanding the Ego',
  description: 'A 7-day exploration of the ego\'s nature and how to transcend its limitations. Drawing from the profound insights of Eckhart Tolle, Nisargadatta Maharaj, and Ramana Maharshi, this journey guides you through recognizing, understanding, and ultimately dissolving identification with the false self.',
  durationDays: 7,
  difficulty: 'intermediate',
  teacherIds: [5, 17, 16], // Eckhart Tolle, Nisargadatta, Ramana Maharshi
};

const days = [
  {
    dayNumber: 1,
    title: 'What is the Ego?',
    content: `# Day 1: What is the Ego?

## Introduction

Welcome to this transformative journey of understanding the ego. Today, we begin by exploring what the ego actually is—not as an abstract concept, but as a living pattern of thought and identification that shapes your entire experience of life.

## Eckhart Tolle: The Voice in Your Head

Eckhart Tolle teaches that the ego is essentially the voice in your head—the constant stream of thoughts, judgments, and narratives that you've come to believe is "you." It's the mental construct that says "I am this" or "I am not that," constantly defining and defending an image of who you think you are.

The ego is not your enemy. It's simply a case of mistaken identity. You've believed yourself to be a thought-created entity when, in truth, you are the awareness in which all thoughts arise.

## Nisargadatta: The False "I Am This"

Nisargadatta Maharaj points directly to the heart of the matter: "The sense 'I am' is the first ignorance." The ego begins with the simple feeling of being, which is pure and true, but then immediately adds "I am this body," "I am this person," "I am this story."

This addition is the birth of the false self. The pure "I Am" becomes contaminated with identification, and suffering follows inevitably.

## Ramana Maharshi: The Thought "I"

Ramana Maharshi teaches that the ego is simply the first thought—the thought "I." From this root thought, all other thoughts branch out, creating the entire world of separation and suffering.

He asks us to investigate: To whom do these thoughts arise? Who is experiencing this? When you trace every experience back to its source, you find only the question "Who am I?"—and in that inquiry, the ego begins to dissolve.

## Today's Contemplation

The ego is not a thing but a process—a habitual pattern of identifying with thoughts, emotions, and stories. It's the voice that narrates your life, judges your experiences, and defends your self-image.

Today, simply notice this voice. Don't fight it or try to eliminate it. Just observe it with curiosity and compassion. Notice how it constantly comments, compares, and creates drama.

## Reflection Questions

1. Can you notice the voice in your head right now? What is it saying?
2. How much of your day is spent listening to and believing this inner narrator?
3. What would it be like to simply observe thoughts without identifying with them?`,
    practice: `**Witnessing the Voice Practice (10 minutes)**

1. Sit comfortably and close your eyes
2. Simply listen to the thoughts arising in your mind
3. Notice the voice that comments, judges, and narrates
4. Instead of being the voice, be the one listening to it
5. Ask yourself: "Who is aware of these thoughts?"
6. Rest in the awareness that observes without identifying

Do this practice 2-3 times today, especially when you notice strong mental chatter.`,
    reflectionPrompt: 'What did you notice about the voice in your head today? Were there moments when you could observe it without being completely identified with it?',
  },
  {
    dayNumber: 2,
    title: 'The Ego and Time',
    content: `# Day 2: The Ego and Time

## The Ego's Relationship with Time

Today we explore one of the ego's most fundamental characteristics: it cannot exist in the present moment. The ego lives entirely in psychological time—in memories of the past and projections into the future.

## Eckhart Tolle: The Ego and the Now

Tolle reveals that the ego is completely dependent on time for its survival. It strengthens itself by dwelling on past grievances or future anxieties. The present moment is the ego's greatest enemy because, in the Now, there is no story, no problem, no identity to defend.

When you are fully present, the ego cannot function. This is why the ego resists presence with all its might, constantly pulling your attention into past regrets or future worries.

## Nisargadatta: Beyond Time

Nisargadatta teaches that your true nature is timeless. The "I Am" that you truly are exists before time, beyond time. The ego, being a mental construct, exists only in the realm of time and memory.

He asks: "What were you before you were born? What will you be after death?" These questions point to the timeless awareness that you are—the awareness that watches the ego's time-bound drama without being touched by it.

## Ramana Maharshi: The Eternal Self

Ramana emphasizes that the Self is ever-present, unchanging, eternal. It is only the ego-thought that creates the illusion of time, of past and future, of becoming and achieving.

When you inquire "Who am I?" and trace the "I-thought" to its source, you discover that which has always been, is now, and always will be—beyond all concepts of time.

## Today's Insight

Notice how the ego constantly escapes the present moment:
- Dwelling on past mistakes or glories
- Worrying about future outcomes
- Planning, rehearsing, regretting
- Comparing present reality to past or imagined futures

The present moment, when fully inhabited, is the death of the ego. This is why presence is so powerful—and why the ego resists it so strongly.

## Reflection Questions

1. How much of your mental energy goes into past or future?
2. What happens to your sense of self when you're fully present?
3. Can you notice the ego's resistance to the Now?`,
    practice: `**Present Moment Awareness (Throughout the day)**

Set 5 random alarms on your phone today. When each alarm sounds:

1. Stop whatever you're doing
2. Take three conscious breaths
3. Notice: Where was your mind? Past or future?
4. Feel your body, your breath, the space around you
5. Rest in this moment for 30 seconds
6. Notice: Can you find the ego in pure presence?

Journal about your discoveries tonight.`,
    reflectionPrompt: 'When you brought your attention fully to the present moment today, what happened to your sense of self? Did you notice the ego\'s resistance to presence?',
  },
  {
    dayNumber: 3,
    title: 'The Ego and Identification',
    content: `# Day 3: The Ego and Identification

## The Pattern of Identification

Today we examine the ego's core mechanism: identification. The ego is nothing but a collection of identifications—with thoughts, emotions, possessions, roles, and stories.

## Eckhart Tolle: The Ego's Content

Tolle teaches that the ego is always seeking to strengthen itself through identification. It says "I am my thoughts," "I am my emotions," "I am my body," "I am my possessions," "I am my achievements."

Each identification adds to the ego's sense of solidity and importance. Yet all these identifications are temporary, changeable, and ultimately illusory. When any of them is threatened, the ego experiences this as a threat to its very existence.

## Nisargadatta: The Chain of False Identifications

Nisargadatta points out that identification begins with the body: "I am this body." From this primary identification, all other identifications flow. "I am a man/woman," "I am young/old," "I am successful/unsuccessful."

He teaches that you must first break the identification with the body. Recognize that you are not the body; you are the awareness in which the body appears. This is the first and most crucial step in transcending the ego.

## Ramana Maharshi: Dis-identification Through Inquiry

Ramana's method of self-inquiry directly attacks identification. By constantly asking "Who am I?" and investigating every identification, you discover that none of them are truly you.

"I am not the body, for the body is inert. I am not the mind, for thoughts come and go. I am not the emotions, for they change. What remains when all identifications are removed?"

## Today's Exploration

The ego identifies with:
- Physical appearance and attributes
- Thoughts and opinions
- Emotions and moods
- Roles (parent, professional, etc.)
- Possessions and achievements
- Beliefs and ideologies
- Personal history and story

Notice today: Which identifications does your ego cling to most strongly? What happens when any of these are questioned or threatened?

## Reflection Questions

1. What are your primary identifications? (I am a _____, I am someone who _____)
2. What would remain if all these identifications were removed?
3. Can you observe your identifications without being completely absorbed in them?`,
    practice: `**Dis-identification Practice (15 minutes)**

Sit quietly and systematically dis-identify from all that you are not:

1. "I am not this body" - Observe the body as an object of awareness
2. "I am not these thoughts" - Watch thoughts arise and pass
3. "I am not these emotions" - Feel emotions without being them
4. "I am not this personality" - See the personality as a pattern
5. "I am not this story" - Recognize your life story as a mental construct

After each statement, rest in the awareness that remains. Ask: "Then who am I?"

Don't try to answer with the mind. Simply rest in the question.`,
    reflectionPrompt: 'What identifications did you notice yourself clinging to today? Were you able to observe any of them without being completely identified?',
  },
  {
    dayNumber: 4,
    title: 'The Ego and Resistance',
    content: `# Day 4: The Ego and Resistance

## The Ego's Relationship with What Is

Today we explore how the ego survives through resistance—through saying "no" to the present moment, to reality as it is.

## Eckhart Tolle: The Pain-Body and Resistance

Tolle teaches that the ego strengthens itself through resistance to what is. Whenever you argue with reality, complain about circumstances, or wish things were different, you are feeding the ego.

This resistance creates what Tolle calls the "pain-body"—an accumulation of old emotional pain that the ego uses to maintain its sense of separate identity. The pain-body actually feeds on negativity and resistance.

## Nisargadatta: Acceptance of What Is

Nisargadatta teaches radical acceptance: "Whatever happens, happens. Whatever doesn't happen, doesn't happen." This is not passive resignation but recognition of reality.

The ego constantly wants things to be different than they are. It lives in a state of argument with reality. But reality always wins this argument. Suffering is the result of this futile resistance.

## Ramana Maharshi: Surrender to the Self

Ramana teaches that the ego is sustained by the sense of doership—the belief that "I am doing this." Surrender is the recognition that everything happens by itself, through the Self, and that the ego-doer is an illusion.

When you surrender the sense of doership, when you stop resisting what is, the ego loses its primary fuel. What remains is peace, regardless of circumstances.

## Today's Insight

Notice the ego's resistance patterns:
- Complaining about circumstances
- Wishing things were different
- Arguing with reality in your mind
- Feeling that "this shouldn't be happening"
- Resisting uncomfortable emotions or situations

Each act of resistance strengthens the ego and creates suffering. Acceptance—not as a mental concept but as a living reality—dissolves the ego's grip.

## Reflection Questions

1. What are you resisting in your life right now?
2. What would it be like to fully accept this moment as it is?
3. Can you notice the difference between acceptance and resignation?`,
    practice: `**Acceptance Practice (Throughout the day)**

Today, practice radical acceptance:

1. Notice when resistance arises (complaint, wish for things to be different)
2. Pause and acknowledge: "This is what is happening right now"
3. Feel the resistance in your body
4. Consciously relax the resistance
5. Say internally: "I accept this moment fully"
6. Notice what happens to the ego when you stop resisting

Do this especially with small annoyances: traffic, weather, delays, others' behavior.`,
    reflectionPrompt: 'What did you notice when you practiced acceptance today? How did the ego react when you stopped resisting?',
  },
  {
    dayNumber: 5,
    title: 'The Ego and Relationships',
    content: `# Day 5: The Ego and Relationships

## The Ego in Relationship

Today we examine how the ego operates in relationships—how it uses others to strengthen or defend itself, creating suffering for everyone involved.

## Eckhart Tolle: Ego-Based Relationships

Tolle reveals that most relationships are not true relationships but "ego-relationships"—where two egos use each other for their own purposes. The ego seeks to use the other person to enhance its sense of self through:
- Validation and approval
- Sense of superiority or inferiority
- Drama and conflict
- Possession and control

True relationship begins only when the ego is recognized and transcended. Then you can relate from presence to presence, being to being.

## Nisargadatta: The Mirror of Relationship

Nisargadatta teaches that others are mirrors reflecting your own ego back to you. What irritates you in another person is often what you haven't accepted in yourself. What you seek from others is what you haven't found within.

He says: "The world is a reflection of your own mind. Change your mind and the world changes." This is especially true in relationships.

## Ramana Maharshi: The One Self

Ramana points to the ultimate truth: there is only one Self. The sense of separate individuals is the ego's illusion. When you inquire into the nature of the "I" in relationship—"Who is relating to whom?"—you discover that there is no real separation.

This doesn't mean relationships disappear, but they are transformed. Instead of two egos clashing or clinging, there is the recognition of shared being.

## Today's Exploration

Notice the ego in your relationships:
- Seeking validation or approval
- Defending your position or image
- Wanting to be right
- Taking things personally
- Comparing yourself to others
- Trying to change or control others
- Creating drama or conflict

Each of these patterns is the ego using relationship to strengthen itself. True relationship begins when these patterns are seen and released.

## Reflection Questions

1. How does your ego show up in your closest relationships?
2. What do you seek from others that you haven't found within yourself?
3. Can you relate to someone without the ego's agenda?`,
    practice: `**Conscious Relationship Practice (Today)**

In your interactions today:

1. Before speaking, pause and notice: Is this the ego speaking?
2. When listening, notice: Am I truly listening or just waiting to speak?
3. When conflict arises, ask: "What is the ego defending right now?"
4. Practice seeing the other person as awareness, not just as their ego
5. Notice when you take things personally—this is always the ego

Choose one important relationship to practice this with especially.`,
    reflectionPrompt: 'How did the ego show up in your relationships today? Were there moments when you could relate without the ego\'s interference?',
  },
  {
    dayNumber: 6,
    title: 'The Ego and Suffering',
    content: `# Day 6: The Ego and Suffering

## The Ego as the Root of Suffering

Today we explore the fundamental truth that all psychological suffering stems from identification with the ego. This is perhaps the most important insight of the entire journey.

## Eckhart Tolle: The Ego Creates Problems

Tolle teaches that the ego needs problems to survive. It creates problems where none exist, or it magnifies small challenges into major dramas. Why? Because problems give the ego a sense of identity and purpose.

The ego says: "I am someone who has this problem." It defines itself through its problems, its grievances, its story of victimhood or struggle. Without problems, the ego would have nothing to do, nowhere to go, no one to be.

## Nisargadatta: The Dream of Suffering

Nisargadatta reveals that all suffering is a dream—the dream of being a separate individual. He says: "You are not what you think yourself to be. You are much more than that. You are the infinite source of all that is."

Suffering arises from the belief "I am this limited person with these problems." When you wake up from this dream, when you recognize your true nature, suffering cannot touch you. Pain may come and go, but suffering—the mental resistance to pain—disappears.

## Ramana Maharshi: The Ego-Thought is the Root

Ramana teaches that the ego-thought is the root of all suffering. Every form of psychological pain can be traced back to the thought "I" and its identifications.

"Who is suffering?" he asks. "Find out who you are, and suffering will end." Not because your circumstances change, but because the one who suffers is recognized as an illusion.

## Today's Understanding

All psychological suffering involves the ego:
- Fear: "Something bad might happen to me"
- Anger: "This shouldn't be happening to me"
- Sadness: "I've lost something I needed"
- Anxiety: "I'm not good enough / safe enough"
- Guilt: "I did something wrong"
- Shame: "I am something wrong"

Notice the common thread: the "me," the ego, at the center of every form of suffering. When the ego is seen through, suffering loses its grip.

## Reflection Questions

1. What is your primary form of suffering right now?
2. Can you find the ego at the center of this suffering?
3. What would remain if the ego's story about this situation dissolved?`,
    practice: `**Suffering Investigation Practice (When suffering arises)**

When you notice suffering today:

1. Stop and acknowledge: "There is suffering"
2. Ask: "Who is suffering?"
3. Look for the "I" at the center of the suffering
4. Notice the story the ego is telling
5. Ask: "Is this story absolutely true?"
6. Feel the suffering in your body without the story
7. Rest in the awareness that observes the suffering

Notice: The awareness itself never suffers. Only the ego suffers.`,
    reflectionPrompt: 'What did you discover when you investigated your suffering today? Could you find the space between the awareness and the suffering?',
  },
  {
    dayNumber: 7,
    title: 'Beyond the Ego: Your True Nature',
    content: `# Day 7: Beyond the Ego: Your True Nature

## The Recognition of What You Are

We've spent six days understanding the ego—what it is, how it operates, how it creates suffering. Today, we turn our attention to what remains when the ego is seen through: your true nature.

## Eckhart Tolle: The Power of Now

Tolle teaches that your true nature is presence—the consciousness that is aware of this moment. It is not a thing, not an object, not a concept. It is the aware space in which all experience arises.

This presence is always here, always now. It is not affected by what happens in your life. Joy and sorrow come and go; presence remains. Success and failure come and go; presence remains. Even the body and mind come and go; presence remains.

You are this presence. Not as a belief or concept, but as a living reality that can be directly experienced.

## Nisargadatta: The "I Am"

Nisargadatta points to the pure sense of being—the "I Am" before any addition. Not "I am this" or "I am that," but simply "I Am."

This "I Am" is your true nature. It is consciousness itself, existence itself, being itself. It has no attributes, no limitations, no problems. It is complete, whole, perfect as it is.

He says: "Stay with the sense 'I am,' reject all else. This is the direct way to truth." When you rest in pure being, the ego dissolves like a dream upon waking.

## Ramana Maharshi: The Self

Ramana teaches that you are the Self—pure awareness, pure consciousness. The Self is not something you need to attain or achieve. It is what you already are, have always been, and always will be.

The only "practice" needed is to stop identifying with what you are not. Stop claiming "I am the body," "I am the mind," "I am this person." What remains when all false identifications cease is the Self—your true nature.

"The Self is always realized," Ramana says. "There is no moment when it is not realized. The question is only: Do you recognize it?"

## Integration and Moving Forward

This journey has been about recognition, not achievement. The ego cannot be destroyed or eliminated—it can only be seen through, recognized as the illusion it is.

Moving forward:
- Continue to notice the ego's patterns without judgment
- Rest in presence, in the "I Am," in awareness
- Practice self-inquiry when identification arises
- Accept what is, resist nothing
- Relate from being to being, not ego to ego

## The Ultimate Understanding

You are not the ego. You never were. The ego is a thought-pattern, a habit of identification, a dream of separation. Your true nature is the awareness in which the ego appears—vast, spacious, peaceful, complete.

This is not a belief to adopt but a reality to recognize. And this recognition is the end of suffering, the beginning of peace, the discovery of who you truly are.

## Reflection Questions

1. What is your direct experience of awareness right now?
2. Can you rest in the "I Am" without adding anything to it?
3. How will you continue this recognition in daily life?`,
    practice: `**Resting as Awareness (20 minutes)**

For your final practice:

1. Sit in a comfortable position
2. Close your eyes and take a few deep breaths
3. Notice that you are aware
4. Rest in this awareness
5. Thoughts will come—let them
6. Emotions will arise—let them
7. Sensations will appear—let them
8. You are the space in which all of this happens
9. Rest as this space, this awareness
10. This is your true nature

Do this practice daily going forward. It is the direct path home.`,
    reflectionPrompt: 'As you complete this journey, what has shifted in your understanding of who you are? How will you continue to recognize your true nature beyond the ego?',
  },
];

async function seedJourney() {
  try {
    console.log('Seeding "Understanding the Ego" journey...');
    
    // Insert journey
    const result = await db.insert(journeys).values(journeyData);
    const journeyId = Number(result[0].insertId);
    
    console.log(`Journey created with ID: ${journeyId}`);
    
    // Insert all days
    for (const day of days) {
      await db.insert(journeyDays).values({
        ...day,
        journeyId,
      });
      console.log(`Day ${day.dayNumber} inserted`);
    }
    
    console.log('✅ "Understanding the Ego" journey seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding journey:', error);
    process.exit(1);
  }
}

seedJourney();
