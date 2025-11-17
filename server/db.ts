import { eq, desc, sql, and, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, teachers, themes, quotes, keyIdeas, practices,
  centralQuestions, misunderstandings, journeys, journeyDays,
  userJourneyProgress, journalEntries, conversations, conversationMessages,
  embeddings, analytics, deepQuestions, userThemeStats, councilDebates,
  microRetreats, userMicroRetreatSessions, shadowMirrorSummaries, stories,
  paradoxes, userParadoxReflections, lifeExperiments, userExperimentLogs
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Teachers
export async function getAllTeachers() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(teachers).where(eq(teachers.isActive, true)).orderBy(teachers.fullName);
}

export async function getTeacherById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(teachers).where(eq(teachers.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTeacherByTeacherId(teacherId: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(teachers).where(eq(teachers.teacherId, teacherId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTeachersByPhase(phase: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(teachers)
    .where(and(eq(teachers.phase, phase), eq(teachers.isActive, true)))
    .orderBy(teachers.fullName);
}

// Key Ideas
export async function getKeyIdeasByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(keyIdeas).where(eq(keyIdeas.teacherId, teacherId));
}

// Practices
export async function getPracticesByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(practices).where(eq(practices.teacherId, teacherId));
}

// Central Questions
export async function getCentralQuestionsByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(centralQuestions).where(eq(centralQuestions.teacherId, teacherId));
}

// Misunderstandings
export async function getMisunderstandingsByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(misunderstandings).where(eq(misunderstandings.teacherId, teacherId));
}

// Themes
export async function getAllThemes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(themes).orderBy(themes.label);
}

export async function getThemeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(themes).where(eq(themes.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Quotes
export async function getAllQuotes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
}

export async function getQuotesByTeacher(teacherId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(quotes).where(eq(quotes.teacherId, teacherId));
}

export async function getFeaturedQuotes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(quotes).where(eq(quotes.isFeatured, true));
}

export async function getRandomQuote() {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(quotes).orderBy(sql`RAND()`).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Journeys
export async function getAllJourneys() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(journeys).where(eq(journeys.isActive, true));
}

export async function getJourneyById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(journeys).where(eq(journeys.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getJourneyDays(journeyId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(journeyDays)
    .where(eq(journeyDays.journeyId, journeyId))
    .orderBy(journeyDays.dayNumber);
}

// User Journey Progress
export async function getUserJourneyProgress(userId: number, journeyId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(userJourneyProgress)
    .where(and(
      eq(userJourneyProgress.userId, userId),
      eq(userJourneyProgress.journeyId, journeyId)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getAllUserJourneyProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userJourneyProgress)
    .where(eq(userJourneyProgress.userId, userId));
}

// Journal Entries
export async function getUserJournalEntries(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(journalEntries)
    .where(eq(journalEntries.userId, userId))
    .orderBy(desc(journalEntries.createdAt))
    .limit(limit);
}

export async function createJournalEntry(entry: typeof journalEntries.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(journalEntries).values(entry);
  return result[0].insertId;
}

// Conversations
export async function getUserConversations(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.createdAt))
    .limit(limit);
}

export async function getConversationById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(conversations).where(eq(conversations.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getConversationMessages(conversationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(conversationMessages)
    .where(eq(conversationMessages.conversationId, conversationId))
    .orderBy(conversationMessages.createdAt);
}

export async function createConversation(conversation: typeof conversations.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(conversations).values(conversation);
  return Number(result[0].insertId);
}

export async function addConversationMessage(message: typeof conversationMessages.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(conversationMessages).values(message);
  return Number(result[0].insertId);
}

// Analytics
export async function trackAnalytics(eventType: string, userId: number | null, metadata: Record<string, any>) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(analytics).values({
    eventType,
    userId,
    metadata
  });
}

// Embeddings for RAG
export async function searchEmbeddings(queryEmbedding: number[], limit: number = 10, teacherId?: number) {
  const db = await getDb();
  if (!db) return [];
  
  // For now, return all embeddings (will implement vector similarity later)
  let query = db.select().from(embeddings);
  
  if (teacherId) {
    query = query.where(eq(embeddings.teacherId, teacherId)) as any;
  }
  
  return await query.limit(limit);
}

export async function createEmbedding(embedding: typeof embeddings.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(embeddings).values(embedding);
  return Number(result[0].insertId);
}

// Deep Questions
export async function getAllDeepQuestions() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(deepQuestions)
    .where(eq(deepQuestions.isActive, true))
    .orderBy(desc(deepQuestions.createdAt));
}

export async function getDeepQuestionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(deepQuestions)
    .where(eq(deepQuestions.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getDailyDeepQuestion() {
  const db = await getDb();
  if (!db) return null;
  
  // Get today's date as a seed for consistent daily selection
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Get all active questions
  const questions = await db.select().from(deepQuestions)
    .where(eq(deepQuestions.isActive, true));
  
  if (questions.length === 0) return null;
  
  // Select question based on day of year (consistent for the day)
  const index = dayOfYear % questions.length;
  return questions[index];
}

export async function createDeepQuestion(question: typeof deepQuestions.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(deepQuestions).values(question);
  return Number(result[0].insertId);
}

// User Theme Stats for Inner Constellation
export async function getUserThemeStats(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userThemeStats)
    .where(eq(userThemeStats.userId, userId))
    .orderBy(desc(userThemeStats.interactionCount));
}

export async function incrementThemeInteraction(userId: number, themeId: string) {
  const db = await getDb();
  if (!db) return;
  
  // Try to increment existing record
  const existing = await db.select().from(userThemeStats)
    .where(and(
      eq(userThemeStats.userId, userId),
      eq(userThemeStats.themeId, themeId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    await db.update(userThemeStats)
      .set({
        interactionCount: sql`${userThemeStats.interactionCount} + 1`,
        lastInteractionAt: new Date()
      })
      .where(eq(userThemeStats.id, existing[0].id));
  } else {
    await db.insert(userThemeStats).values({
      userId,
      themeId,
      interactionCount: 1
    });
  }
}

export async function getConstellationData(userId: number) {
  const db = await getDb();
  if (!db) return { themes: [], teachers: [], connections: [] };
  
  // Get user's theme interactions
  const themeStats = await getUserThemeStats(userId);
  
  // Get user's teacher interactions from conversations
  const teacherInteractions = await db
    .select({
      teacherId: conversationMessages.teacherId,
      count: sql<number>`COUNT(*)`.as('count')
    })
    .from(conversationMessages)
    .innerJoin(conversations, eq(conversationMessages.conversationId, conversations.id))
    .where(and(
      eq(conversations.userId, userId),
      sql`${conversationMessages.teacherId} IS NOT NULL`
    ))
    .groupBy(conversationMessages.teacherId);
  
  // Get teacher details
  const teacherIds = teacherInteractions.map(t => t.teacherId).filter(Boolean) as number[];
  const teacherDetails = teacherIds.length > 0 
    ? await db.select().from(teachers).where(inArray(teachers.id, teacherIds))
    : [];
  
  // Get theme details
  const themeIds = themeStats.map(t => t.themeId);
  const themeDetails = themeIds.length > 0
    ? await db.select().from(themes).where(inArray(themes.themeId, themeIds))
    : [];
  
  return {
    themes: themeStats.map(stat => {
      const theme = themeDetails.find(t => t.themeId === stat.themeId);
      return {
        id: stat.themeId,
        label: theme?.label || stat.themeId,
        interactionCount: stat.interactionCount,
        lastInteractionAt: stat.lastInteractionAt
      };
    }),
    teachers: teacherInteractions.map(interaction => {
      const teacher = teacherDetails.find(t => t.id === interaction.teacherId);
      return {
        id: interaction.teacherId,
        name: teacher?.fullName || 'Unknown',
        interactionCount: Number(interaction.count)
      };
    }),
    connections: [] // Will be computed on frontend based on shared themes
  };
}

// Council Debates
export async function getWeeklyDebate() {
  const db = await getDb();
  if (!db) return null;
  
  // Get current week number and year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  const year = now.getFullYear();
  
  // Try to get debate for current week
  const result = await db.select().from(councilDebates)
    .where(and(
      eq(councilDebates.weekNumber, weekNumber),
      eq(councilDebates.year, year),
      eq(councilDebates.isActive, true)
    ))
    .limit(1);
  
  if (result.length > 0) return result[0];
  
  // Fallback to most recent debate
  const fallback = await db.select().from(councilDebates)
    .where(eq(councilDebates.isActive, true))
    .orderBy(desc(councilDebates.createdAt))
    .limit(1);
  
  return fallback.length > 0 ? fallback[0] : null;
}

export async function getAllDebates() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(councilDebates)
    .where(eq(councilDebates.isActive, true))
    .orderBy(desc(councilDebates.createdAt));
}

export async function createDebate(debate: typeof councilDebates.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(councilDebates).values(debate);
  return Number(result[0].insertId);
}

// Micro-Retreats
export async function getAllMicroRetreats() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(microRetreats)
    .where(eq(microRetreats.isActive, true))
    .orderBy(desc(microRetreats.createdAt));
}

export async function getMicroRetreatById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(microRetreats)
    .where(and(eq(microRetreats.id, id), eq(microRetreats.isActive, true)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createMicroRetreat(retreat: typeof microRetreats.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(microRetreats).values(retreat);
  return Number(result[0].insertId);
}

export async function saveRetreatSession(session: typeof userMicroRetreatSessions.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(userMicroRetreatSessions).values(session);
  return Number(result[0].insertId);
}

export async function getUserRetreatSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userMicroRetreatSessions)
    .where(eq(userMicroRetreatSessions.userId, userId))
    .orderBy(desc(userMicroRetreatSessions.completedAt));
}

// Shadow Mirror
export async function getUserShadowMirrorSummaries(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(shadowMirrorSummaries)
    .where(eq(shadowMirrorSummaries.userId, userId))
    .orderBy(desc(shadowMirrorSummaries.weekStartDate));
}

export async function getLatestShadowMirrorSummary(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(shadowMirrorSummaries)
    .where(eq(shadowMirrorSummaries.userId, userId))
    .orderBy(desc(shadowMirrorSummaries.weekStartDate))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createShadowMirrorSummary(summary: typeof shadowMirrorSummaries.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(shadowMirrorSummaries).values(summary);
  return Number(result[0].insertId);
}

export async function getUserContentForWeek(userId: number, weekStartDate: Date, weekEndDate: Date) {
  const db = await getDb();
  if (!db) return { journalEntries: [], conversationMessages: [] };
  
  // Get journal entries from the week
  const entries = await db.select().from(journalEntries)
    .where(and(
      eq(journalEntries.userId, userId),
      sql`${journalEntries.createdAt} >= ${weekStartDate}`,
      sql`${journalEntries.createdAt} <= ${weekEndDate}`
    ))
    .orderBy(journalEntries.createdAt);
  
  // Get conversation messages from the week
  const messages = await db.select({
    id: conversationMessages.id,
    role: conversationMessages.role,
    content: conversationMessages.content,
    createdAt: conversationMessages.createdAt,
  })
    .from(conversationMessages)
    .innerJoin(conversations, eq(conversationMessages.conversationId, conversations.id))
    .where(and(
      eq(conversations.userId, userId),
      sql`${conversationMessages.createdAt} >= ${weekStartDate}`,
      sql`${conversationMessages.createdAt} <= ${weekEndDate}`
    ))
    .orderBy(conversationMessages.createdAt);
  
  return { journalEntries: entries, conversationMessages: messages };
}

// Story Alchemy
export async function getUserStories(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(stories)
    .where(eq(stories.userId, userId))
    .orderBy(desc(stories.createdAt));
}

export async function createStory(story: typeof stories.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(stories).values(story);
  return Number(result[0].insertId);
}

export async function getStoryById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(stories)
    .where(eq(stories.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

// Paradox Playground (minimal implementation)
export async function getAllParadoxes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(paradoxes)
    .where(eq(paradoxes.isActive, true))
    .orderBy(desc(paradoxes.createdAt));
}

export async function createParadox(paradox: typeof paradoxes.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(paradoxes).values(paradox);
  return Number(result[0].insertId);
}

export async function getUserParadoxReflections(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userParadoxReflections)
    .where(eq(userParadoxReflections.userId, userId))
    .orderBy(desc(userParadoxReflections.createdAt));
}

export async function createParadoxReflection(reflection: typeof userParadoxReflections.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(userParadoxReflections).values(reflection);
  return Number(result[0].insertId);
}

// Life Experiments (minimal implementation)
export async function getAllLifeExperiments() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(lifeExperiments)
    .where(eq(lifeExperiments.isActive, true))
    .orderBy(desc(lifeExperiments.createdAt));
}

export async function createLifeExperiment(experiment: typeof lifeExperiments.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(lifeExperiments).values(experiment);
  return Number(result[0].insertId);
}

export async function getUserExperimentLogs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userExperimentLogs)
    .where(eq(userExperimentLogs.userId, userId))
    .orderBy(desc(userExperimentLogs.createdAt));
}

export async function createExperimentLog(log: typeof userExperimentLogs.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(userExperimentLogs).values(log);
  return Number(result[0].insertId);
}

export async function updateExperimentLog(logId: number, updates: Partial<typeof userExperimentLogs.$inferSelect>) {
  const db = await getDb();
  if (!db) return false;
  
  await db.update(userExperimentLogs)
    .set(updates)
    .where(eq(userExperimentLogs.id, logId));
  
  return true;
}
