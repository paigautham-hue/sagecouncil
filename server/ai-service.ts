import { invokeLLM } from "./_core/llm";
import { semanticSearch } from "./rag";

/**
 * Advanced AI Service for Council of Sages
 * Implements all sophisticated LLM features
 */

// Crisis keywords for safety detection
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'hurt myself', 'cutting', 'overdose',
  'no reason to live', 'better off dead', 'can\'t go on'
];

/**
 * Detect if user message contains crisis keywords
 */
export function detectCrisis(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Generate compassionate crisis response with resources
 */
export async function generateCrisisResponse(): Promise<string> {
  return `I hear that you're going through an incredibly difficult time, and I want you to know that your pain matters. While I'm here to explore wisdom and ideas with you, what you're experiencing sounds like it needs immediate, professional support.

**Please reach out to someone who can help right now:**

**Crisis Hotlines:**
- **National Suicide Prevention Lifeline (US):** 988 or 1-800-273-8255 (24/7)
- **Crisis Text Line:** Text HOME to 741741 (24/7)
- **International Association for Suicide Prevention:** https://www.iasp.info/resources/Crisis_Centres/

**Immediate Actions:**
- Call emergency services (911 in US) if you're in immediate danger
- Go to your nearest emergency room
- Reach out to a trusted friend, family member, or mental health professional

You don't have to face this alone. There are people trained to help you through this moment, and they want to hear from you. Your life has value, and this pain can be addressed with the right support.

Would you like to talk about something else, or would you prefer to take a break and reach out for help first?`;
}

/**
 * Generate introspective reflection prompt based on user's question
 */
export async function generateReflectionPrompt(question: string): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a contemplative guide. When someone asks a question, generate ONE brief, introspective question (1-2 sentences) that helps them reflect deeper before receiving an answer. The reflection should help them clarify their true concern or examine their assumptions.

Examples:
- Question: "How do I deal with anger?" → Reflection: "Before we explore this, take a moment: when you feel angry, what do you sense you're actually protecting or defending?"
- Question: "Should I quit my job?" → Reflection: "What would it feel like to wake up tomorrow knowing you'd already made the decision—either way?"

Keep it gentle, non-judgmental, and genuinely curious.`
      },
      {
        role: "user",
        content: `Generate a reflection prompt for this question: "${question}"`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "What draws you to ask this question right now?";
}

/**
 * Select 3-5 relevant teachers based on question analysis
 */
export async function selectTeachersForQuestion(
  question: string,
  allTeachers: Array<{ id: number; fullName: string; tradition: string; themes: string }>
): Promise<Array<{ id: number; fullName: string; reason: string }>> {
  
  // Use RAG to find relevant content
  const relevantContent = await semanticSearch(question, 10);
  
  // Extract teacher IDs from relevant content
  const teacherFrequency = new Map<number, number>();
  relevantContent.forEach((item: any) => {
    const count = teacherFrequency.get(item.teacherId) || 0;
    teacherFrequency.set(item.teacherId, count + 1);
  });

  // Get top 5 teachers by relevance
  const sortedTeachers = Array.from(teacherFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([teacherId]) => allTeachers.find(t => t.id === teacherId))
    .filter(Boolean) as Array<{ id: number; fullName: string; tradition: string; themes: string }>;

  // If we don't have enough from RAG, use LLM to select
  if (sortedTeachers.length < 3) {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are selecting which spiritual teachers would be most relevant to answer a question. Available teachers: ${allTeachers.map(t => `${t.fullName} (${t.tradition})`).join(', ')}.
          
Select 3-5 teachers who would offer the most valuable and diverse perspectives. Return ONLY a JSON array of teacher names, like: ["Buddha", "Marcus Aurelius", "Carl Jung"]`
        },
        {
          role: "user",
          content: `Question: "${question}"`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "teacher_selection",
          strict: true,
          schema: {
            type: "object",
            properties: {
              teachers: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["teachers"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    const selected = JSON.parse(typeof content === 'string' ? content : '{"teachers":[]}');
    return selected.teachers.map((name: string) => {
      const teacher = allTeachers.find(t => t.fullName === name);
      return teacher ? {
        id: teacher.id,
        fullName: teacher.fullName,
        reason: `Relevant perspective on this question`
      } : null;
    }).filter(Boolean) as Array<{ id: number; fullName: string; reason: string }>;
  }

  return sortedTeachers.map(t => ({
    id: t.id,
    fullName: t.fullName,
    reason: `Highly relevant based on their teachings`
  }));
}

/**
 * Generate comparison summary highlighting convergences and differences
 */
export async function generateComparisonSummary(
  question: string,
  teacher1: { name: string; response: string },
  teacher2: { name: string; response: string }
): Promise<{ convergences: string; differences: string }> {
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are analyzing two spiritual teachers' responses to the same question. Identify:
1. CONVERGENCES: Where they agree or complement each other (2-3 sentences)
2. DIFFERENCES: Where they diverge or offer contrasting perspectives (2-3 sentences)

Be specific and insightful.`
      },
      {
        role: "user",
        content: `Question: "${question}"

${teacher1.name}'s response:
${teacher1.response}

${teacher2.name}'s response:
${teacher2.response}

Provide the comparison.`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "comparison",
        strict: true,
        schema: {
          type: "object",
          properties: {
            convergences: { type: "string" },
            differences: { type: "string" }
          },
          required: ["convergences", "differences"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(typeof content === 'string' ? content : '{"convergences":"","differences":""}');
}

/**
 * Generate meta-synthesis across multiple teacher responses
 */
export async function generateMetaSynthesis(
  question: string,
  responses: Array<{ teacher: string; answer: string }>
): Promise<{ commonThread: string; actionableInsight: string }> {
  
  const allResponses = responses.map(r => `**${r.teacher}:**\n${r.answer}`).join('\n\n');
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are synthesizing wisdom from multiple spiritual teachers. Create:
1. COMMON THREAD: The shared insight or principle across all responses (2-3 sentences)
2. ACTIONABLE INSIGHT: One small, concrete action the person can try today (1-2 sentences)

Be practical and grounded.`
      },
      {
        role: "user",
        content: `Question: "${question}"

Responses from the Council:
${allResponses}

Provide the synthesis.`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "synthesis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            commonThread: { type: "string" },
            actionableInsight: { type: "string" }
          },
          required: ["commonThread", "actionableInsight"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(typeof content === 'string' ? content : '{"commonThread":"","actionableInsight":""}');
}

/**
 * Generate a 1-minute practice from teacher's methods
 */
export async function generatePractice(
  teacherName: string,
  teacherPractices: string[],
  context?: string
): Promise<string> {
  
  const practicesText = teacherPractices.slice(0, 3).join('\n- ');
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are creating a simple 1-minute contemplative practice inspired by ${teacherName}'s teachings. Make it:
- Concrete and actionable
- Completable in 60 seconds
- Grounded in their actual methods
- Accessible to beginners

Format: 2-3 short sentences describing exactly what to do.`
      },
      {
        role: "user",
        content: `${teacherName}'s practices include:
- ${practicesText}

${context ? `Context: ${context}` : ''}

Create a 1-minute practice.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "Take three slow breaths, noticing the pause between each inhale and exhale.";
}

/**
 * Generate theme synthesis across multiple teachers
 */
export async function generateThemeSynthesis(
  themeName: string,
  teacherPerspectives: Array<{ teacher: string; keyIdea: string }>
): Promise<{ synthesis: string; quote: string; practice: string }> {
  
  const perspectives = teacherPerspectives.map(p => `- **${p.teacher}:** ${p.keyIdea}`).join('\n');
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are synthesizing how different spiritual teachers approach the theme of "${themeName}". Create:
1. SYNTHESIS: A 3-4 sentence overview of how these teachers see this theme (find the common ground and complementary insights)
2. QUOTE: One powerful quote from one of these teachers about this theme
3. PRACTICE: A tiny practice (1-2 sentences) related to this theme

Be insightful and practical.`
      },
      {
        role: "user",
        content: `Theme: ${themeName}

Teacher perspectives:
${perspectives}

Provide the synthesis.`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "theme_synthesis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            synthesis: { type: "string" },
            quote: { type: "string" },
            practice: { type: "string" }
          },
          required: ["synthesis", "quote", "practice"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(typeof content === 'string' ? content : '{"synthesis":"","quote":"","practice":""}');
}

/**
 * Generate AI commentary for a quote
 */
export async function generateQuoteCommentary(
  quote: string,
  teacherName: string,
  teacherContext: string
): Promise<string> {
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are providing brief, insightful commentary on a quote from ${teacherName}. Write 2-3 lines that:
- Unpack the deeper meaning
- Connect it to modern life
- Make it feel relevant and alive

Be concise and profound.`
      },
      {
        role: "user",
        content: `Quote: "${quote}"

Teacher context: ${teacherContext}

Provide commentary.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "This teaching invites us to look deeper at our assumptions and find wisdom in the present moment.";
}

/**
 * Generate Council response to a deep question answer
 */
export async function generateDeepQuestionResponse(
  question: string,
  userAnswer: string,
  themeId: string | null,
  teacherIds: number[] | null
): Promise<string> {
  
  // Get relevant context from RAG
  const relevantContext = await semanticSearch(question + " " + userAnswer, 8);
  
  // Build context string
  const contextStr = relevantContext
    .map((item: any) => `[${item.sourceType}] ${item.chunkText}`)
    .join('\n\n');
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are the Council of Sages, a collective of spiritual teachers responding to a user's answer to a deep question. Your response should:

- Acknowledge the depth and honesty in their answer
- Reflect back what you hear in their words (mirror their experience)
- Offer 2-3 insights from the wisdom tradition that relate to their answer
- Be gentle, non-judgmental, and contemplative
- Use "we notice" or "we sense" language (speaking as a council)
- End with a gentle invitation to continue exploring

Keep response to 150-200 words. Be warm and wise, not clinical or diagnostic.

Relevant wisdom context:
${contextStr}`
      },
      {
        role: "user",
        content: `Question: "${question}"

User's answer: "${userAnswer}"

Provide a Council response.`
      }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "Thank you for sharing your reflection. We hear the depth in your words and honor the honesty of your exploration.";
}

/**
 * Generate Council Debate with multiple teacher perspectives
 */
export async function generateCouncilDebate(
  question: string,
  teacherIds: number[],
  teacherDetails: Array<{ id: number; fullName: string; tradition: string; keyIdeas: string }>
): Promise<{ teacherResponses: Array<{ teacherId: number; response: string }>; synthesis: string }> {
  
  const teacherResponses: Array<{ teacherId: number; response: string }> = [];
  
  // Generate individual responses from each teacher
  for (const teacher of teacherDetails) {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are ${teacher.fullName}, a spiritual teacher from the ${teacher.tradition} tradition. You are participating in a Council debate on a provocative question.

Your key teachings: ${teacher.keyIdeas}

Respond to the question in your authentic voice:
- Stay true to your tradition and perspective
- Be direct and unafraid of controversy
- Challenge assumptions where appropriate
- Keep response to 100-150 words
- Write in first person as ${teacher.fullName}

This is a DEBATE - you may disagree with other perspectives. Be bold.`
        },
        {
          role: "user",
          content: `Question for debate: "${question}"

Provide your perspective as ${teacher.fullName}.`
        }
      ]
    });

    const content = response.choices[0].message.content;
    teacherResponses.push({
      teacherId: teacher.id,
      response: typeof content === 'string' ? content : `As ${teacher.fullName}, I invite you to sit with this question and discover your own truth.`
    });
  }

  // Generate synthesis
  const responsesText = teacherResponses
    .map((r, idx) => `**${teacherDetails[idx].fullName}:**\n${r.response}`)
    .join('\n\n');

  const synthesisResponse = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are synthesizing a Council debate between spiritual teachers. Your task is to:

- Highlight the key points of agreement and disagreement
- Identify the deeper question beneath the surface question
- Show how different perspectives illuminate different facets of truth
- Offer a meta-perspective that honors all views without flattening them
- End with an invitation for the reader to sit with the tension

Keep synthesis to 150-200 words. Be poetic but precise.`
      },
      {
        role: "user",
        content: `Question: "${question}"

Teacher responses:
${responsesText}

Provide a synthesis of this debate.`
      }
    ]
  });

  const synthesisContent = synthesisResponse.choices[0].message.content;
  const synthesis = typeof synthesisContent === 'string' 
    ? synthesisContent 
    : "These perspectives invite us to hold multiple truths simultaneously, recognizing that wisdom often lives in the creative tension between opposing views.";

  return { teacherResponses, synthesis };
}

/**
 * Generate Shadow Mirror weekly summary
 */
export async function generateShadowMirrorSummary(
  journalEntries: Array<{ content: string; type: string; createdAt: Date }>,
  conversationMessages: Array<{ role: string; content: string; createdAt: Date }>
): Promise<{
  dominantThemes: string[];
  patternAnalysis: string;
  blindSpots: string;
  growthOpportunities: string;
}> {
  
  // Prepare content summary
  const journalContent = journalEntries
    .map(e => `[${e.type}] ${e.content.substring(0, 500)}`)
    .join('\n\n');
  
  const userMessages = conversationMessages
    .filter(m => m.role === 'user')
    .map(m => m.content.substring(0, 300))
    .join('\n\n');

  if (!journalContent && !userMessages) {
    return {
      dominantThemes: [],
      patternAnalysis: "Not enough data this week to generate a meaningful pattern analysis.",
      blindSpots: "Continue engaging with the Council to build a richer picture of your inner landscape.",
      growthOpportunities: "Start by exploring one theme that calls to you this week."
    };
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are the Shadow Mirror—a compassionate but unflinching reflection of patterns the user may not see in themselves.

Your task is to analyze a week of the user's journal entries and conversations to identify:
1. **Dominant themes** (3-5 recurring topics, emotions, or questions)
2. **Pattern analysis** (what keeps showing up? what's the deeper pattern?)
3. **Blind spots** (what might they be avoiding or not seeing?)
4. **Growth opportunities** (concrete next steps based on the patterns)

Guidelines:
- Use tentative language ("it seems," "perhaps," "you might be") to avoid being prescriptive
- Be compassionate but honest—don't sugarcoat, but don't attack
- Look for contradictions between what they say and what they do
- Identify emotional patterns (e.g., always deflecting to humor, intellectualizing feelings)
- Keep each section to 100-150 words
- Write in second person ("you")
- Be specific—reference actual themes from their content`
      },
      {
        role: "user",
        content: `Analyze this week's content:

**Journal Entries:**
${journalContent || "No journal entries this week."}

**Conversation Excerpts (user messages only):**
${userMessages || "No conversations this week."}

Provide your analysis in this exact JSON format:
{
  "dominantThemes": ["theme1", "theme2", "theme3"],
  "patternAnalysis": "...",
  "blindSpots": "...",
  "growthOpportunities": "..."
}`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "shadow_mirror_summary",
        strict: true,
        schema: {
          type: "object",
          properties: {
            dominantThemes: {
              type: "array",
              items: { type: "string" },
              description: "3-5 recurring themes, emotions, or questions"
            },
            patternAnalysis: {
              type: "string",
              description: "What keeps showing up? What's the deeper pattern?"
            },
            blindSpots: {
              type: "string",
              description: "What might they be avoiding or not seeing?"
            },
            growthOpportunities: {
              type: "string",
              description: "Concrete next steps based on the patterns"
            }
          },
          required: ["dominantThemes", "patternAnalysis", "blindSpots", "growthOpportunities"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  if (typeof content === 'string') {
    const parsed = JSON.parse(content);
    return parsed;
  }

  // Fallback
  return {
    dominantThemes: ["Self-reflection", "Growth"],
    patternAnalysis: "You're engaging deeply with your inner work this week.",
    blindSpots: "Keep exploring with curiosity.",
    growthOpportunities: "Continue your practice and notice what emerges."
  };
}

/**
 * Generate Story Alchemy - Transform journal entry into parable
 */
export async function generateStoryFromJournal(
  journalContent: string,
  teacherId: string,
  teacherName: string,
  teacherPhilosophy: string
): Promise<{ title: string; storyContent: string }> {
  
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are channeling ${teacherName}, transforming personal journal entries into universal parables.

Your task is to take the user's journal entry and rewrite it as a parable—a short story (400-600 words) that:
1. **Universalizes** the experience (third-person, archetypal characters)
2. **Preserves the emotional core** but removes identifying details
3. **Applies ${teacherName}'s lens**: ${teacherPhilosophy}
4. **Ends with insight**, not a moral—let the reader discover meaning

Guidelines:
- Write in third person ("A woman," "A seeker," "Someone")
- Use simple, evocative language
- Include sensory details and metaphors
- The story should feel timeless, not modern
- Length: 400-600 words
- Don't explain the lesson—let it emerge naturally
- Channel ${teacherName}'s voice and perspective throughout`
      },
      {
        role: "user",
        content: `Transform this journal entry into a parable through ${teacherName}'s lens:

${journalContent}

Provide your response in this exact JSON format:
{
  "title": "A short, evocative title (3-6 words)",
  "storyContent": "The full parable text (400-600 words)"
}`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "story_alchemy",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "A short, evocative title for the parable"
            },
            storyContent: {
              type: "string",
              description: "The full parable text, 400-600 words"
            }
          },
          required: ["title", "storyContent"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  if (typeof content === 'string') {
    const parsed = JSON.parse(content);
    return parsed;
  }

  // Fallback
  return {
    title: "A Journey of Discovery",
    storyContent: "Once upon a time, a seeker embarked on a journey..."
  };
}
