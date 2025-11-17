import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // User preferences
  depthLevel: int("depthLevel").default(5), // 1-10 scale
  tonePreference: varchar("tonePreference", { length: 32 }).default("balanced"), // gentle, balanced, direct
  preferredTeachers: json("preferredTeachers").$type<string[]>(), // Array of teacher IDs
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Teachers from the training dataset
 */
export const teachers = mysqlTable("teachers", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: varchar("teacherId", { length: 128 }).notNull().unique(), // e.g., "adyashanti"
  fullName: varchar("fullName", { length: 256 }).notNull(),
  phase: int("phase").notNull(), // 1-6
  alsoAppearsInPhases: json("alsoAppearsInPhases").$type<number[]>(),
  traditionTags: json("traditionTags").$type<string[]>(),
  era: varchar("era", { length: 128 }),
  regions: json("regions").$type<string[]>(),
  oneLineEssence: text("oneLineEssence"),
  shortSummary: text("shortSummary"),
  mediumSummary: text("mediumSummary"),
  avatarUrl: varchar("avatarUrl", { length: 512 }), // URL to avatar image
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = typeof teachers.$inferInsert;

/**
 * Key ideas from teachers
 */
export const keyIdeas = mysqlTable("keyIdeas", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  ideaId: varchar("ideaId", { length: 128 }).notNull(),
  name: varchar("name", { length: 512 }).notNull(),
  clearExplanation: text("clearExplanation"),
  whenItApplies: text("whenItApplies"),
  lifeDomains: json("lifeDomains").$type<string[]>(),
  commonMisuse: text("commonMisuse"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KeyIdea = typeof keyIdeas.$inferSelect;
export type InsertKeyIdea = typeof keyIdeas.$inferInsert;

/**
 * Practices from teachers
 */
export const practices = mysqlTable("practices", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  practiceId: varchar("practiceId", { length: 128 }).notNull(),
  name: varchar("name", { length: 512 }).notNull(),
  type: varchar("type", { length: 64 }), // meditation, reflection, etc.
  stepByStep: text("stepByStep"),
  intendedEffect: text("intendedEffect"),
  cautions: text("cautions"),
  durationMinutes: int("durationMinutes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Practice = typeof practices.$inferSelect;
export type InsertPractice = typeof practices.$inferInsert;

/**
 * Themes index
 */
export const themes = mysqlTable("themes", {
  id: int("id").autoincrement().primaryKey(),
  themeId: varchar("themeId", { length: 128 }).notNull().unique(),
  label: varchar("label", { length: 256 }).notNull(),
  description: text("description"),
  relatedTeachers: json("relatedTeachers").$type<string[]>(), // Array of teacher IDs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Theme = typeof themes.$inferSelect;
export type InsertTheme = typeof themes.$inferInsert;

/**
 * Quotes and short teachings
 */
export const quotes = mysqlTable("quotes", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  text: text("text").notNull(),
  isParaphrase: boolean("isParaphrase").default(false).notNull(),
  sourceReference: text("sourceReference"),
  themeTags: json("themeTags").$type<string[]>(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

/**
 * Guided journeys/programs
 */
export const journeys = mysqlTable("journeys", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description"),
  durationDays: int("durationDays").notNull(),
  themeIds: json("themeIds").$type<string[]>(),
  teacherIds: json("teacherIds").$type<string[]>(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Journey = typeof journeys.$inferSelect;
export type InsertJourney = typeof journeys.$inferInsert;

/**
 * Individual days within a journey
 */
export const journeyDays = mysqlTable("journeyDays", {
  id: int("id").autoincrement().primaryKey(),
  journeyId: int("journeyId").notNull(),
  dayNumber: int("dayNumber").notNull(),
  quoteId: int("quoteId"),
  content: text("content"), // Markdown content
  practiceText: text("practiceText"),
  reflectionPrompt: text("reflectionPrompt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type JourneyDay = typeof journeyDays.$inferSelect;
export type InsertJourneyDay = typeof journeyDays.$inferInsert;

/**
 * User progress through journeys
 */
export const userJourneyProgress = mysqlTable("userJourneyProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  journeyId: int("journeyId").notNull(),
  currentDay: int("currentDay").default(1).notNull(),
  completedDays: json("completedDays").$type<number[]>(),
  lastCompletedAt: timestamp("lastCompletedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserJourneyProgress = typeof userJourneyProgress.$inferSelect;
export type InsertUserJourneyProgress = typeof userJourneyProgress.$inferInsert;

/**
 * User journal entries
 */
export const journalEntries = mysqlTable("journalEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["quote", "conversation", "reflection", "note", "deep_question", "micro_retreat", "life_experiment"]).notNull(),
  content: text("content").notNull(),
  tags: json("tags").$type<string[]>(),
  relatedTeacherIds: json("relatedTeacherIds").$type<number[]>(),
  relatedThemeIds: json("relatedThemeIds").$type<string[]>(),
  conversationId: int("conversationId"), // Link to conversation if applicable
  
  // Deep Question Ladder fields
  deepQuestionId: int("deepQuestionId"),
  userAnswerText: text("userAnswerText"),
  councilResponseText: text("councilResponseText"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = typeof journalEntries.$inferInsert;

/**
 * AI conversations
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mode: mysqlEnum("mode", ["one_sage", "compare_two", "council"]).notNull(),
  selectedTeachers: json("selectedTeachers").$type<number[]>(), // Teacher IDs
  metadata: json("metadata").$type<Record<string, any>>(),
  isFlagged: boolean("isFlagged").default(false).notNull(),
  flagReason: text("flagReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Individual messages within conversations
 */
export const conversationMessages = mysqlTable("conversationMessages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  teacherId: int("teacherId"), // Which teacher is speaking (for assistant messages)
  metadata: json("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConversationMessage = typeof conversationMessages.$inferSelect;
export type InsertConversationMessage = typeof conversationMessages.$inferInsert;

/**
 * Vector embeddings for RAG
 */
export const embeddings = mysqlTable("embeddings", {
  id: int("id").autoincrement().primaryKey(),
  sourceType: mysqlEnum("sourceType", ["teacher", "idea", "practice", "theme", "quote"]).notNull(),
  sourceId: int("sourceId").notNull(), // ID of the source entity
  teacherId: int("teacherId"), // For filtering by teacher
  chunkText: text("chunkText").notNull(),
  embedding: json("embedding").$type<number[]>().notNull(), // Vector embedding
  metadata: json("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Embedding = typeof embeddings.$inferSelect;
export type InsertEmbedding = typeof embeddings.$inferInsert;

/**
 * Central questions from teachers
 */
export const centralQuestions = mysqlTable("centralQuestions", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  question: text("question").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CentralQuestion = typeof centralQuestions.$inferSelect;
export type InsertCentralQuestion = typeof centralQuestions.$inferInsert;

/**
 * Common misunderstandings
 */
export const misunderstandings = mysqlTable("misunderstandings", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  misunderstanding: text("misunderstanding").notNull(),
  clarification: text("clarification"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Misunderstanding = typeof misunderstandings.$inferSelect;
export type InsertMisunderstanding = typeof misunderstandings.$inferInsert;

/**
 * Deep questions for the Deep Question Ladder feature
 */
export const deepQuestions = mysqlTable("deepQuestions", {
  id: int("id").autoincrement().primaryKey(),
  questionText: text("questionText").notNull(),
  themeId: varchar("themeId", { length: 128 }), // Optional theme association
  difficulty: int("difficulty").notNull(), // 1-10 scale
  teacherIds: json("teacherIds").$type<number[]>(), // Teachers who address this question
  tags: json("tags").$type<string[]>(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DeepQuestion = typeof deepQuestions.$inferSelect;
export type InsertDeepQuestion = typeof deepQuestions.$inferInsert;

/**
 * User theme interaction statistics for Inner Constellation
 */
export const userThemeStats = mysqlTable("userThemeStats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  themeId: varchar("themeId", { length: 128 }).notNull(),
  interactionCount: int("interactionCount").notNull().default(0),
  lastInteractionAt: timestamp("lastInteractionAt").notNull().defaultNow().onUpdateNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type UserThemeStat = typeof userThemeStats.$inferSelect;
export type InsertUserThemeStat = typeof userThemeStats.$inferInsert;

/**
 * Council Debates - Weekly provocative questions with multiple teacher perspectives
 */
export const councilDebates = mysqlTable("council_debates", {
  id: int("id").autoincrement().primaryKey(),
  questionText: text("questionText").notNull(),
  themeId: varchar("themeId", { length: 128 }),
  teacherIds: json("teacherIds").$type<number[]>().notNull(),
  teacherResponses: json("teacherResponses").$type<Array<{ teacherId: number; response: string }>>().notNull(),
  synthesis: text("synthesis"),
  weekNumber: int("weekNumber").notNull(),
  year: int("year").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type CouncilDebate = typeof councilDebates.$inferSelect;
export type InsertCouncilDebate = typeof councilDebates.$inferInsert;

/**
 * Micro-Retreats - 15-minute guided experiences
 */
export const microRetreats = mysqlTable("micro_retreats", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  themeId: varchar("themeId", { length: 128 }),
  durationMinutes: int("durationMinutes").notNull().default(15),
  steps: json("steps").$type<Array<{ type: string; title: string; content: string; durationSeconds?: number }>>().notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type MicroRetreat = typeof microRetreats.$inferSelect;
export type InsertMicroRetreat = typeof microRetreats.$inferInsert;

export const userMicroRetreatSessions = mysqlTable("user_micro_retreat_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  retreatId: int("retreatId").notNull(),
  completedAt: timestamp("completedAt").notNull().defaultNow(),
  reflectionNotes: text("reflectionNotes"),
  rating: int("rating"),
});

export type UserMicroRetreatSession = typeof userMicroRetreatSessions.$inferSelect;
export type InsertUserMicroRetreatSession = typeof userMicroRetreatSessions.$inferInsert;

/**
 * Shadow Mirror - Weekly pattern summaries
 */
export const shadowMirrorSummaries = mysqlTable("shadow_mirror_summaries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekStartDate: date("weekStartDate").notNull(),
  weekEndDate: date("weekEndDate").notNull(),
  dominantThemes: json("dominantThemes").$type<string[]>(),
  patternAnalysis: text("patternAnalysis").notNull(),
  blindSpots: text("blindSpots"),
  growthOpportunities: text("growthOpportunities"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type ShadowMirrorSummary = typeof shadowMirrorSummaries.$inferSelect;
export type InsertShadowMirrorSummary = typeof shadowMirrorSummaries.$inferInsert;

/**
 * Analytics tracking
 */
export const analytics = mysqlTable("analytics", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 128 }).notNull(), // page_view, chat_message, journey_start, etc.
  userId: int("userId"),
  metadata: json("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;
