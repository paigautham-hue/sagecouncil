import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { journeys, journeyDays } from '../drizzle/schema.ts';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const journeyData = {
  title: "Understanding Suffering: A 7-Day Exploration",
  description: "Journey through the nature of suffering with wisdom from Buddha, Viktor Frankl, and Eckhart Tolle. Discover how pain becomes suffering, find meaning in difficulty, and learn to be present with what is.",
  durationDays: 7,
  teacherIds: [13, 28, 7], // Buddha, Viktor Frankl, Eckhart Tolle
  days: [
    {
      dayNumber: 1,
      title: "Acknowledging Suffering",
      content: `## Day 1: Acknowledging Suffering

### Welcome to Your Journey

Today we begin by acknowledging a fundamental truth: suffering is part of the human experience. This isn't pessimism—it's clear seeing. By facing suffering directly, without resistance or denial, we take the first step toward freedom.

### Reading from Buddha

> "Life contains dukkha (suffering/unsatisfactoriness). Birth is dukkha, aging is dukkha, illness is dukkha, death is dukkha; union with what is displeasing is dukkha; separation from what is pleasing is dukkha; not to get what one wants is dukkha."

The Buddha didn't say life IS suffering—he said suffering EXISTS in life. This distinction matters profoundly. Suffering is a condition we encounter, not our essential nature. By acknowledging it without judgment, we stop adding the second arrow of resistance to the first arrow of pain.

### Insight from Viktor Frankl

> "When we are no longer able to change a situation, we are challenged to change ourselves."

Frankl discovered in the concentration camps that while we cannot always control our circumstances, we can choose our response. The gap between stimulus and response is where our freedom lives. Suffering becomes meaningful when we use it as a catalyst for growth.

### Wisdom from Eckhart Tolle

> "The primary cause of unhappiness is never the situation but your thoughts about it."

Tolle points to a crucial insight: pain is inevitable, but suffering is optional. Pain is what happens to us; suffering is our mental resistance to what is. When we stop fighting reality, a profound peace becomes possible even in difficulty.

### Today's Practice (10 minutes)

**Acknowledgment Meditation**

1. Sit comfortably and close your eyes
2. Bring to mind a current difficulty—nothing overwhelming, perhaps a minor frustration or worry
3. Instead of trying to fix it or push it away, simply acknowledge: "This is difficult right now"
4. Notice what happens in your body when you stop resisting
5. Breathe with the difficulty, neither pushing it away nor wallowing in it
6. After 5 minutes, expand your awareness to include your whole body and the space around you
7. Notice: can you hold this difficulty within a larger awareness?

### Reflection Questions

- What forms of suffering are present in your life right now?
- Can you name them without judgment, simply as facts to be acknowledged?
- What happens when you stop trying to fix or resist them, even for a moment?

### For Tomorrow

Tomorrow we'll explore the difference between pain and suffering, and how our minds create unnecessary layers of distress. For today, simply practice acknowledgment.`,
      practiceText: "Acknowledgment Meditation: Sit with a current difficulty for 10 minutes, practicing simple acknowledgment without resistance or fixing.",
      reflectionPrompt: "What forms of suffering are present in your life right now? Can you name them without judgment?"
    },
    {
      dayNumber: 2,
      title: "Pain vs. Suffering",
      content: `## Day 2: The Difference Between Pain and Suffering

### Building on Yesterday

Yesterday you practiced acknowledging suffering. Today we go deeper: understanding the crucial distinction between pain (inevitable) and suffering (optional). This insight can transform your relationship with difficulty.

### Buddha's Teaching: The Two Arrows

> "When touched with a feeling of pain, the uninstructed person sorrows, grieves, and laments. He feels two pains: physical and mental. Just as if they were to shoot a man with an arrow and, right afterward, were to shoot him with another one, so that he would feel the pains of two arrows."

The first arrow is pain—loss, illness, disappointment, aging. These are part of life. The second arrow is our reaction: "Why me?" "This shouldn't be happening!" "I can't handle this!" This second arrow is suffering, and it's optional.

### Frankl on Meaning in Pain

> "In some ways suffering ceases to be suffering at the moment it finds a meaning."

Frankl watched fellow prisoners in Auschwitz. Those who found meaning—caring for others, preserving their humanity, holding onto hope—endured better than those who saw only meaningless torment. Pain remained, but suffering transformed.

He asks: What meaning can you find in your current difficulties? What growth, compassion, or wisdom might they offer?

### Tolle on the Pain-Body

> "The pain-body is an accumulation of old emotional pain. It's a negative energy field that occupies your body and mind."

Tolle describes how we unconsciously identify with past pain, creating a "pain-body" that feeds on suffering. We replay old hurts, anticipate future ones, and miss the present moment where life actually happens.

The practice: notice when you're adding mental suffering to present-moment pain. Can you feel the difference?

### Today's Practice (15 minutes)

**The Two Arrows Practice**

1. Recall a recent difficult experience
2. Identify the "first arrow"—the actual painful event or circumstance
3. Now notice the "second arrows"—your thoughts about it:
   - "This is unfair"
   - "I'm a failure"
   - "Things will never get better"
   - "Why does this always happen to me?"
4. Write down these second-arrow thoughts
5. For each one, ask: "Is this thought helping or adding suffering?"
6. Practice letting the second arrows drop, returning to the simple reality of the first arrow
7. Notice: without the second arrows, how does the experience change?

### Reflection Questions

- Can you identify a situation where you've been shooting yourself with second arrows?
- What stories do you tell yourself that amplify pain into suffering?
- What would it be like to experience pain without the mental commentary?

### For Tomorrow

Tomorrow we'll explore how to find meaning in difficulty. For today, practice catching yourself adding second arrows, and gently letting them drop.`,
      practiceText: "Two Arrows Practice: Identify first-arrow pain vs. second-arrow mental suffering in a recent difficulty. Practice letting the second arrows drop.",
      reflectionPrompt: "Can you identify a situation where you've been shooting yourself with second arrows? What stories amplify your pain?"
    },
    {
      dayNumber: 3,
      title: "Finding Meaning in Difficulty",
      content: `## Day 3: Finding Meaning in Difficulty

### The Central Question

Today we address Frankl's profound insight: suffering that has meaning becomes bearable, even transformative. But how do we find meaning in pain that seems senseless?

### Frankl's Logotherapy

> "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances, to choose one's own way."

In the concentration camps, Frankl observed three paths to meaning:

1. **Creative work or deeds** - What can you create or contribute despite this difficulty?
2. **Love and connection** - How does this experience deepen your capacity for compassion?
3. **Courage in suffering** - How you bear unavoidable suffering can inspire others and transform you

### Buddha on Suffering as Teacher

> "Pain is certain, suffering is optional. The wise person learns from pain."

The Buddha taught that suffering, when met with awareness, becomes our greatest teacher. It shows us:
- Where we're attached
- Where we resist reality
- Where we need to grow
- What truly matters

Without suffering, we might never question, never seek, never wake up.

### Tolle on Presence Through Pain

> "Accept—then act. Whatever the present moment contains, accept it as if you had chosen it. Always work with it, not against it."

Tolle suggests that difficulty can crack open our identification with the ego-mind, revealing a deeper presence. When everything is going well, we rarely question our assumptions. Pain forces us to look deeper.

### Today's Practice (20 minutes)

**Meaning-Making Meditation**

1. Bring to mind a current or recent difficulty
2. Instead of asking "Why me?", ask:
   - "What is this teaching me?"
   - "How might this be serving my growth?"
   - "What strength or wisdom could emerge from this?"
   - "How might this increase my compassion for others who suffer?"
3. Write your responses without censoring
4. Consider: If you had to find meaning in this experience, what would it be?
5. Imagine yourself five years from now, looking back. What would you want to have learned?

**Frankl's Exercise:**
- What creative work could emerge from this difficulty?
- How could this deepen your capacity to love?
- How can you bear this with dignity and courage?

### Reflection Questions

- What meaning, if any, can you find in your current difficulties?
- How have past difficulties shaped you for the better?
- What would it mean to see suffering as a teacher rather than an enemy?

### For Tomorrow

Tomorrow we'll explore acceptance—not resignation, but a powerful yes to reality. For today, practice asking "What is this teaching me?" when difficulty arises.`,
      practiceText: "Meaning-Making Meditation: Ask 'What is this teaching me?' instead of 'Why me?' Explore how difficulty might serve your growth.",
      reflectionPrompt: "What meaning, if any, can you find in your current difficulties? How have past difficulties shaped you?"
    },
    {
      dayNumber: 4,
      title: "The Practice of Acceptance",
      content: `## Day 4: The Practice of Acceptance

### Acceptance vs. Resignation

Today's teaching requires careful understanding: acceptance is not passive resignation. It's an active, powerful yes to reality that paradoxically opens the door to change.

### Tolle on Radical Acceptance

> "Whatever the present moment contains, accept it as if you had chosen it. Always work with it, not against it. Make it your friend and ally, not your enemy. This will miraculously transform your whole life."

Acceptance doesn't mean you like what's happening or that you won't work to change it. It means you stop arguing with reality. You acknowledge what is before deciding what to do about it.

### Buddha's Teaching on Acceptance

> "Wanting things to be different than they are is the root of suffering."

The Buddha taught that craving (wanting what we don't have) and aversion (rejecting what we do have) create suffering. Acceptance is the middle way: seeing clearly without grasping or pushing away.

### Frankl on Accepting the Unchangeable

> "When we are no longer able to change a situation, we are challenged to change ourselves."

Frankl distinguished between what we can change and what we must accept. Wisdom lies in knowing the difference. Some suffering can be eliminated through action; some can only be transformed through acceptance.

### Today's Practice (20 minutes)

**Acceptance Meditation**

1. Sit quietly and scan your life for what you're resisting:
   - A person's behavior
   - Your own limitations
   - A loss or change
   - Physical pain or illness
   - A circumstance beyond your control

2. Choose one thing to work with

3. Practice saying internally: "I accept this. I accept that this is happening right now."

4. Notice any resistance that arises. Don't fight the resistance—accept that too!

5. Explore the difference between:
   - "I like this" (you don't have to)
   - "I want this" (you don't have to)
   - "This is happening" (simple fact)

6. Ask: "If I fully accepted this, what would I do differently?"

7. Notice: acceptance often reveals the next right action

### The Serenity Prayer Practice

Reflect on this wisdom:
- "Grant me the serenity to accept the things I cannot change"
- "The courage to change the things I can"
- "And the wisdom to know the difference"

Make three lists:
1. What I can change (and will work on)
2. What I cannot change (and will practice accepting)
3. What I'm unsure about (and will investigate)

### Reflection Questions

- What are you currently resisting that you cannot change?
- What becomes possible when you accept reality as it is?
- How does acceptance differ from giving up?

### For Tomorrow

Tomorrow we'll explore presence—the power of being fully here, even with difficulty. For today, practice radical acceptance of one unchangeable thing.`,
      practiceText: "Acceptance Meditation: Practice saying 'I accept this is happening' to one thing you're resisting. Notice what becomes possible.",
      reflectionPrompt: "What are you currently resisting that you cannot change? What becomes possible when you accept reality as it is?"
    },
    {
      dayNumber: 5,
      title: "The Power of Presence",
      content: `## Day 5: The Power of Presence

### Being Here Now

Today we explore perhaps the most powerful response to suffering: presence. Not thinking about the past or future, but being fully here with what is.

### Tolle on the Now

> "Realize deeply that the present moment is all you ever have. Make the Now the primary focus of your life."

Tolle's central teaching: most suffering exists in time. We regret the past, fear the future, and miss the only moment we actually have—now. Even in difficulty, the present moment is often bearable when we stop adding past and future to it.

### Buddha on Mindfulness

> "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment."

The Buddha taught that mindfulness—present-moment awareness—is the path to freedom. When we're fully present, we see clearly. We respond rather than react. We find peace even in difficulty.

### Frankl on the Present Moment

> "Live as if you were living already for the second time and as if you had acted the first time as wrongly as you are about to act now."

Even in the camps, Frankl found that being fully present—to a sunset, to a kind word, to a moment of beauty—made life meaningful. Presence transforms suffering from abstract dread into specific, manageable moments.

### Today's Practice (25 minutes)

**Presence Practice**

**Part 1: Body Scan (10 min)**
1. Sit or lie comfortably
2. Bring attention to your feet. Feel them from the inside.
3. Slowly move attention up through your body
4. When you encounter tension or pain, breathe into it
5. Practice being present with sensation without the story about it

**Part 2: Thought Watching (10 min)**
1. Sit quietly and watch your thoughts
2. Notice when thoughts pull you into past or future
3. Label them: "planning," "remembering," "worrying"
4. Return to the present: breath, sounds, body
5. Practice being the awareness that watches thoughts, not the thoughts themselves

**Part 3: Difficulty Practice (5 min)**
1. Bring to mind a current worry or difficulty
2. Notice how the mind wants to time-travel:
   - "What if this continues?"
   - "Why did this happen?"
   - "How will I cope?"
3. Return to now: "Right now, in this moment, am I okay?"
4. Often, the present moment is more bearable than our thoughts about it

### Reflection Questions

- How much of your suffering exists in past regrets or future fears?
- What is your actual experience right now, without the story?
- What becomes available when you're fully present?

### For Tomorrow

Tomorrow we'll explore compassion—for yourself and others. For today, practice returning to presence whenever you notice time-traveling thoughts.`,
      practiceText: "Presence Practice: Body scan, thought watching, and returning to 'Right now, in this moment, am I okay?' when difficulty arises.",
      reflectionPrompt: "How much of your suffering exists in past regrets or future fears? What is your actual experience right now?"
    },
    {
      dayNumber: 6,
      title: "Compassion for Self and Others",
      content: `## Day 6: Compassion for Self and Others

### Suffering as Connection

Today we discover how suffering, when met with compassion, becomes a bridge to others rather than a wall of isolation.

### Buddha on Compassion

> "If your compassion does not include yourself, it is incomplete."

The Buddha taught that compassion begins with ourselves. We cannot genuinely care for others while treating ourselves with harshness. Self-compassion isn't self-pity—it's recognizing our shared humanity.

### Frankl on Suffering and Love

> "Love is the only way to grasp another human being in the innermost core of his personality. No one can become fully aware of the very essence of another human being unless he loves him."

Frankl found that even in the camps, love and compassion gave life meaning. Those who could still care for others, who could see the suffering of fellow prisoners with compassion, maintained their humanity.

### Tolle on the Pain-Body and Compassion

> "The moment you become aware of the pain-body, it can no longer feed on your thoughts and emotions."

Tolle teaches that when we meet our own pain with presence and compassion, it begins to dissolve. The same is true for others' pain. Compassion doesn't fix suffering, but it transforms our relationship to it.

### Today's Practice (25 minutes)

**Self-Compassion Meditation (15 min)**

1. Sit comfortably and bring to mind a difficulty you're facing
2. Notice any self-judgment or harsh inner voice
3. Place your hand on your heart
4. Speak to yourself as you would to a dear friend:
   - "This is really hard right now"
   - "I'm not alone in this struggle"
   - "May I be kind to myself"
   - "May I give myself the compassion I need"
5. Feel the warmth of your own hand
6. Breathe in compassion for yourself
7. Notice: does self-compassion feel different from self-pity?

**Compassion for Others (10 min)**

1. Think of someone else who is suffering
2. Recognize: "Just like me, this person wants to be happy"
3. Reflect: "Just like me, this person wants to be free from suffering"
4. Offer these phrases:
   - "May you be free from suffering"
   - "May you find peace"
   - "May you know you are not alone"
5. Notice: does your own suffering feel different when you recognize it's shared?

### The Common Humanity Practice

Write down:
- "I am suffering because..."
- "Others who suffer in similar ways include..."
- "What connects us in this suffering is..."
- "How my suffering helps me understand others..."

### Reflection Questions

- How do you typically speak to yourself when you're struggling?
- What would change if you treated yourself with the same compassion you offer others?
- How does recognizing shared suffering affect your experience of it?

### For Tomorrow

Tomorrow we'll integrate everything you've learned into a sustainable practice. For today, practice self-compassion whenever you notice suffering.`,
      practiceText: "Self-Compassion Meditation: Place hand on heart and speak to yourself as you would a dear friend. Extend compassion to others who suffer.",
      reflectionPrompt: "How do you typically speak to yourself when struggling? What would change with more self-compassion?"
    },
    {
      dayNumber: 7,
      title: "Integration and Moving Forward",
      content: `## Day 7: Integration and Moving Forward

### Bringing It All Together

Congratulations on completing this journey! Today we integrate everything you've learned into a sustainable practice for living with suffering skillfully.

### The Seven Insights

Let's review the wisdom you've gathered:

**Day 1: Acknowledgment**
- Suffering exists; denying it creates more suffering
- The first step is simple recognition without judgment

**Day 2: Pain vs. Suffering**
- Pain is inevitable; suffering is optional
- The second arrow of mental resistance amplifies pain

**Day 3: Meaning**
- Suffering with meaning becomes bearable, even transformative
- We can choose our response to any circumstance

**Day 4: Acceptance**
- Acceptance is not resignation but a powerful yes to reality
- It opens the door to wise action

**Day 5: Presence**
- Most suffering exists in time—past regrets, future fears
- The present moment is often more bearable than our thoughts about it

**Day 6: Compassion**
- Self-compassion is not self-pity but recognition of shared humanity
- Suffering connects us to others when met with compassion

**Day 7: Integration**
- These practices work together, not in isolation
- Suffering can be a teacher, a connector, a transformer

### A Practice for Life

Here's a simple framework for working with suffering going forward:

**When Difficulty Arises:**

1. **Pause** - Stop, breathe, create space
2. **Acknowledge** - "This is suffering. This is difficult."
3. **Distinguish** - First arrow (pain) or second arrow (mental suffering)?
4. **Accept** - "This is happening right now."
5. **Be Present** - Return to this moment, this breath
6. **Find Meaning** - "What might this teach me?"
7. **Respond with Compassion** - To yourself and others
8. **Act Wisely** - What's the next right step?

### Today's Practice (30 minutes)

**Integration Meditation**

1. Sit quietly and review your week
2. What insights emerged?
3. What practices resonated most?
4. What will you carry forward?

**Create Your Personal Practice**

Design a daily practice using what you've learned:
- How long? (5-20 minutes)
- Which practices? (Choose 2-3 that resonated)
- When? (Morning, evening, or both?)
- What will remind you?

**Write a Letter to Your Future Self**

When suffering arises again (it will), what do you want to remember? Write it down now while the insights are fresh.

### The Three Teachers Speak

**Buddha reminds you:**
"The root of suffering is attachment. The cessation of suffering is possible. The path is practice."

**Frankl reminds you:**
"Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom."

**Tolle reminds you:**
"The primary cause of unhappiness is never the situation but your thoughts about it. Be aware of the thoughts you are thinking."

### Reflection Questions

- What was the most valuable insight from this journey?
- How has your relationship with suffering changed?
- What practice will you commit to continuing?

### Moving Forward

Suffering will continue to arise—that's part of being human. But now you have tools:
- Acknowledgment instead of denial
- Acceptance instead of resistance
- Presence instead of time-traveling
- Meaning instead of meaninglessness
- Compassion instead of judgment

You've learned that suffering can be a teacher, a connector, a transformer. Not something to be eliminated at all costs, but something to be met with wisdom, courage, and compassion.

Thank you for taking this journey. May you meet all that arises with presence, acceptance, and compassion.

### Your Next Steps

- Continue with another journey
- Explore the teachings of Buddha, Frankl, and Tolle more deeply
- Join the Council to ask questions as they arise
- Build your personal practice using what resonated

**Remember:** You are not alone in suffering. You are not defined by suffering. And you have everything you need to meet it skillfully.`,
      practiceText: "Integration Meditation: Review your week, create your personal practice, and write a letter to your future self about what to remember.",
      reflectionPrompt: "What was the most valuable insight from this journey? What practice will you commit to continuing?"
    }
  ]
};

async function seedJourney() {
  try {
    console.log("🌱 Starting journey seed...\n");
    
    // Insert journey
    console.log("Creating journey:", journeyData.title);
    const result = await db.insert(journeys).values({
      title: journeyData.title,
      description: journeyData.description,
      durationDays: journeyData.durationDays,
      teacherIds: JSON.stringify(journeyData.teacherIds),
    });

    // Get the inserted ID - MySQL returns it in result[0].insertId
    const journeyId = Number(result[0]?.insertId);
    
    if (!journeyId || isNaN(journeyId)) {
      throw new Error(`Failed to get journey ID from insert result: ${JSON.stringify(result)}`);
    }
    
    console.log(`✅ Journey created with ID: ${journeyId}\n`);

    // Insert journey days
    console.log("Creating journey days...\n");
    for (const day of journeyData.days) {
      await db.insert(journeyDays).values({
        journeyId,
        dayNumber: day.dayNumber,
        content: day.content,
        practiceText: day.practiceText,
        reflectionPrompt: day.reflectionPrompt,
      });
      console.log(`  ✅ Day ${day.dayNumber}: ${day.title}`);
    }

    console.log("\n🎉 Journey seeded successfully!");
    console.log(`\nJourney Details:`);
    console.log(`- ID: ${journeyId}`);
    console.log(`- Title: ${journeyData.title}`);
    console.log(`- Duration: ${journeyData.durationDays} days`);
    console.log(`- Total days created: ${journeyData.days.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding journey:", error);
    process.exit(1);
  }
}

seedJourney();
