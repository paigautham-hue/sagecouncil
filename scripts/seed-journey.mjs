import { drizzle } from "drizzle-orm/mysql2";
import { journeys, journeyDays } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const journeyData = {
  title: "Understanding Suffering: A 7-Day Exploration",
  description: "Journey through the nature of suffering with wisdom from Buddha, Viktor Frankl, and Eckhart Tolle. Discover how pain becomes suffering, find meaning in difficulty, and learn to be present with what is.",
  duration: 7,
  difficulty: "beginner",
  teacherIds: [13, 28, 7], // Buddha, Viktor Frankl, Eckhart Tolle
  days: [
    {
      dayNumber: 1,
      title: "The First Noble Truth: Suffering Exists",
      content: `## Welcome to Your Journey

Today we begin by acknowledging a fundamental truth: suffering is part of the human experience. This isn't pessimism—it's clear seeing.

### Reading from Buddha

"Life is dukkha (suffering/unsatisfactoriness). Birth is suffering, aging is suffering, illness is suffering, death is suffering; union with what is displeasing is suffering; separation from what is pleasing is suffering; not to get what one wants is suffering."

The Buddha didn't say life IS suffering—he said suffering EXISTS in life. This distinction matters. By acknowledging suffering without resistance, we take the first step toward freedom.

### Reflection Prompt

What forms of suffering are present in your life right now? Can you name them without judgment, simply as facts to be acknowledged?

### Practice (5 minutes)

Sit comfortably. Bring to mind a current difficulty—nothing overwhelming, perhaps a minor frustration. Instead of trying to fix it or push it away, simply acknowledge: "This is difficult right now." Notice what happens when you stop resisting and simply allow the truth of the moment.`,
      practiceTitle: "Acknowledgment Practice",
      practiceInstructions: "Sit with a difficulty without trying to fix it. Simply acknowledge 'This is difficult right now' and notice what shifts.",
      reflectionPrompt: "What forms of suffering are present in your life right now? Can you name them without judgment?",
    },
    {
      dayNumber: 2,
      title: "The Second Noble Truth: The Origin of Suffering",
      content: `## Day 2: Understanding the Cause

Yesterday we acknowledged suffering. Today we explore its origin: not the pain itself, but our relationship to it.

### Reading from Buddha

"The origin of suffering is attachment (tanha). It is the craving that leads to renewed existence, accompanied by delight and lust, seeking delight here and there; craving for sensual pleasures, craving for existence, craving for non-existence."

Suffering arises not from pain, but from our clinging to pleasure and our resistance to pain. We want things to be different than they are. This wanting—this gap between reality and our preferences—is where suffering lives.

### Reading from Eckhart Tolle

"The primary cause of unhappiness is never the situation but your thoughts about it. Be aware of the thoughts you are thinking. Separate them from the situation, which is always neutral, which always is as it is."

### Reflection Prompt

Where in your life are you arguing with reality? Where are you insisting things "should" be different than they are?

### Practice (5 minutes)

Notice your preferences today. When you think "I want..." or "This shouldn't be happening," pause. Can you feel the tension between what is and what you want? This tension is the birthplace of suffering.`,
      practiceTitle: "Noticing Preferences",
      practiceInstructions: "Throughout the day, notice when you think 'I want...' or 'This shouldn't...' Feel the tension between what is and what you prefer.",
      reflectionPrompt: "Where in your life are you arguing with reality? Where are you insisting things should be different?",
    },
    {
      dayNumber: 3,
      title: "Pain vs. Suffering: The Crucial Distinction",
      content: `## Day 3: The Gap Between Pain and Suffering

Today we explore a liberating truth: pain is inevitable, but suffering is optional.

### Reading from Viktor Frankl

"If there is meaning in life at all, then there must be meaning in suffering. Suffering ceases to be suffering at the moment it finds a meaning."

Frankl survived Nazi concentration camps by finding meaning even in the most horrific circumstances. He discovered that while we cannot always control what happens to us, we can control how we respond.

### Reading from Eckhart Tolle

"Pain is inevitable as long as you are identified with your mind. Suffering is optional—it is the mind's resistance to what is."

Pain is physical or emotional discomfort. Suffering is the story we tell about the pain: "This is terrible. This shouldn't be happening. Why me? This will never end."

### Reflection Prompt

Think of a current pain in your life. What is the actual sensation or circumstance? Now notice the story you tell about it. Can you separate the two?

### Practice (10 minutes)

Bring to mind a difficulty. Ask yourself:
1. What is the actual pain? (Describe the facts)
2. What is my story about it? (Notice your thoughts)
3. What meaning might this hold? (Frankl's question)

Write down what you discover.`,
      practiceTitle: "Separating Pain from Story",
      practiceInstructions: "Choose a difficulty. Identify: 1) The actual pain (facts), 2) Your story about it (thoughts), 3) Possible meaning it holds.",
      reflectionPrompt: "Can you separate the actual pain from the story you tell about it? What changes when you do?",
    },
    {
      dayNumber: 4,
      title: "The Freedom in Acceptance",
      content: `## Day 4: Radical Acceptance

Today we explore acceptance—not resignation, but clear-eyed acknowledgment of what is.

### Reading from Eckhart Tolle

"Whatever the present moment contains, accept it as if you had chosen it. Always work with it, not against it. Make it your friend and ally, not your enemy. This will miraculously transform your whole life."

Acceptance doesn't mean liking what's happening or giving up on change. It means acknowledging reality as it is right now, which paradoxically creates the space for transformation.

### Reading from Buddha

"Letting go gives us freedom, and freedom is the only condition for happiness. If, in our heart, we still cling to anything—anger, anxiety, or possessions—we cannot be free."

### Reflection Prompt

What are you refusing to accept about your current reality? What would change if you stopped fighting it?

### Practice (10 minutes)

Choose something you've been resisting. Say to yourself: "Right now, this is how it is." Not "I like this" or "This is okay"—simply "This is how it is."

Notice what happens in your body when you stop resisting. Does the situation change? Does your relationship to it change?`,
      practiceTitle: "Radical Acceptance Practice",
      practiceInstructions: "Choose something you've been resisting. Say 'Right now, this is how it is.' Notice what shifts when you stop fighting.",
      reflectionPrompt: "What are you refusing to accept? What would change if you stopped fighting reality?",
    },
    {
      dayNumber: 5,
      title: "Finding Meaning in Difficulty",
      content: `## Day 5: The Question That Changes Everything

Today we shift from "Why is this happening?" to "What is this teaching me?"

### Reading from Viktor Frankl

"When we are no longer able to change a situation, we are challenged to change ourselves. Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances."

Frankl noticed that in the camps, those who found meaning—caring for others, maintaining dignity, holding onto hope—were more likely to survive. Meaning didn't eliminate suffering, but it made suffering bearable.

### Reading from Rumi

"The wound is the place where the Light enters you."

Our difficulties crack us open. They reveal what we're made of. They force us to grow in ways comfort never could.

### Reflection Prompt

What has your current difficulty taught you? What strength have you discovered? What has it revealed about what truly matters?

### Practice (15 minutes)

Journal on these questions:
- If this difficulty is here to teach me something, what might it be?
- What quality am I being called to develop? (Patience? Courage? Compassion?)
- How might I be different on the other side of this?
- If I knew this difficulty had a purpose, what might that purpose be?`,
      practiceTitle: "Meaning-Making Practice",
      practiceInstructions: "Journal: What is this difficulty teaching me? What quality am I developing? How might I grow through this?",
      reflectionPrompt: "What has your current difficulty taught you? What strength have you discovered?",
    },
    {
      dayNumber: 6,
      title: "The Power of Presence",
      content: `## Day 6: Being With What Is

Today we practice the most radical act: being fully present with our experience, exactly as it is.

### Reading from Eckhart Tolle

"Accept—then act. Whatever the present moment contains, accept it as if you had chosen it. This will miraculously transform your whole life."

When we're fully present, suffering loses its power. Suffering lives in the past (regret, resentment) and future (worry, fear). This moment, right now, is almost always manageable.

### Reading from Thich Nhat Hanh

"The present moment is the only time over which we have dominion. The most important time is now."

### Reflection Prompt

When you're suffering, where is your mind? In the past? The future? What happens when you bring your attention fully to this moment?

### Practice (10 minutes)

Sit quietly. Notice any discomfort—physical or emotional. Instead of trying to fix it or understand it, simply be with it.

Ask yourself: "Right now, in this moment, am I okay?" Not tomorrow, not yesterday—right now. Notice that this moment, stripped of story, is almost always bearable.

Breathe. Feel your body. Notice sounds. This is presence. This is freedom.`,
      practiceTitle: "Presence Practice",
      practiceInstructions: "Sit with any discomfort. Ask 'Right now, in this moment, am I okay?' Notice that this moment is almost always bearable.",
      reflectionPrompt: "When you're suffering, where is your mind? What happens when you bring attention fully to this moment?",
    },
    {
      dayNumber: 7,
      title: "Integration: The Third Noble Truth",
      content: `## Day 7: The End of Suffering

Today we complete our journey with the Buddha's Third Noble Truth: the cessation of suffering is possible.

### Reading from Buddha

"There is an end to suffering. Through the complete fading away and cessation of craving, there is liberation."

We've learned:
- Suffering exists (Day 1)
- It arises from our resistance to reality (Day 2)
- Pain and suffering are different (Day 3)
- Acceptance creates freedom (Day 4)
- Difficulty can have meaning (Day 5)
- Presence dissolves suffering (Day 6)

### Reading from Viktor Frankl

"Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom."

### Reading from Eckhart Tolle

"Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life."

### Reflection Prompt

How has your relationship to suffering shifted this week? What practices will you carry forward?

### Practice (20 minutes)

Review your week:
1. What did you learn about suffering?
2. What did you learn about yourself?
3. What practice was most helpful?
4. What will you do differently going forward?

Write a letter to yourself to read when you're suffering, reminding yourself of what you've learned.

### Moving Forward

Suffering will return—it's part of life. But now you have tools:
- Acknowledge what is
- Notice resistance
- Separate pain from story
- Find meaning
- Return to presence

The path continues. Walk it with compassion.`,
      practiceTitle: "Integration Practice",
      practiceInstructions: "Review your week. Write a letter to yourself for when you're suffering, capturing what you've learned.",
      reflectionPrompt: "How has your relationship to suffering shifted? What practices will you carry forward?",
    },
  ],
};

async function seedJourney() {
  try {
    console.log("Creating journey...");
    
    const result = await db.insert(journeys).values({
      title: journeyData.title,
      description: journeyData.description,
      durationDays: journeyData.duration,
      teacherIds: journeyData.teacherIds,
    });

    // MySQL returns insertId in the result object
    const journeyId = Number(result[0]?.insertId || result.insertId);
    console.log(`Journey created with ID: ${journeyId}`);

    console.log("Creating journey days...");
    for (const day of journeyData.days) {
      await db.insert(journeyDays).values({
        journeyId,
        ...day,
      });
      console.log(`  Day ${day.dayNumber}: ${day.title}`);
    }

    console.log("\n✅ Journey seeded successfully!");
    console.log(`Journey ID: ${journeyId}`);
  } catch (error) {
    console.error("Error seeding journey:", error);
    process.exit(1);
  }
}

seedJourney();
