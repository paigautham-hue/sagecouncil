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
  longSummary: text("longSummary"),
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
  summary: text("summary"),
  examples: text("examples"),
  clearExplanation: text("clearExplanation"),
  whenItApplies: text("whenItApplies"),
  lifeDomains: json("lifeDomains").$type<string[]>(),
  strengths: text("strengths"),
  potentialMisuse: text("potentialMisuse"),
  commonMisuse: text("commonMisuse"),
  integrationTips: text("integrationTips"),
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
  variations: json("variations").$type<Array<{ level: string; description: string }>>(),
  progression: text("progression"),
  obstacles: json("obstacles").$type<Array<{ obstacle: string; solution: string }>>(),
  progressIndicators: json("progressIndicators").$type<string[]>(),
  intendedEffect: text("intendedEffect"),
  cautions: text("cautions"),
  timeCommitment: varchar("timeCommitment", { length: 128 }),
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
  category: varchar("category", { length: 128 }),
  explanation: text("explanation"),
  lifeRelevance: text("lifeRelevance"),
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
 * Story Alchemy - Transform journal entries into parables
 */
export const stories = mysqlTable("stories", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  journalEntryId: int("journalEntryId"),
  teacherId: varchar("teacherId", { length: 128 }).notNull(),
  originalContent: text("originalContent").notNull(),
  storyContent: text("storyContent").notNull(),
  title: varchar("title", { length: 256 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type Story = typeof stories.$inferSelect;
export type InsertStory = typeof stories.$inferInsert;

/**
 * Paradox Playground - Explore spiritual paradoxes
 */
export const paradoxes = mysqlTable("paradoxes", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  paradoxStatement: text("paradoxStatement").notNull(),
  themeId: varchar("themeId", { length: 128 }),
  teacherPerspectives: json("teacherPerspectives").$type<Array<{ teacherId: string; perspective: string }>>(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const userParadoxReflections = mysqlTable("user_paradox_reflections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  paradoxId: int("paradoxId").notNull(),
  userReflection: text("userReflection").notNull(),
  aiResponse: text("aiResponse"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

/**
 * Life Experiments - Real-world behavioral experiments
 */
export const lifeExperiments = mysqlTable("life_experiments", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  hypothesis: text("hypothesis").notNull(),
  duration: int("duration").notNull(),
  checkInPrompts: json("checkInPrompts").$type<string[]>(),
  themeId: varchar("themeId", { length: 128 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const userExperimentLogs = mysqlTable("user_experiment_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  experimentId: int("experimentId").notNull(),
  status: varchar("status", { length: 64 }).default("active").notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate"),
  checkInEntries: json("checkInEntries").$type<Array<{ date: string; entry: string }>>(),
  finalReflection: text("finalReflection"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

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

/**
 * Teacher biographies from v3.0 dataset
 */
export const teacherBiographies = mysqlTable("teacher_biographies", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull().unique(),
  lifeStory: text("lifeStory"),
  historicalContext: text("historicalContext"),
  keyLifeEvents: json("keyLifeEvents").$type<Array<{ event: string; context: string }>>(),
  influencesReceived: json("influencesReceived").$type<string[]>(),
  influencesGiven: json("influencesGiven").$type<string[]>(),
  legacyImpact: text("legacyImpact"),
  keySources: json("keySources").$type<Array<{ title: string; type: string }>>(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type TeacherBiography = typeof teacherBiographies.$inferSelect;
export type InsertTeacherBiography = typeof teacherBiographies.$inferInsert;

/**
 * Case studies showing real-world applications
 */
export const caseStudies = mysqlTable("case_studies", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  domain: varchar("domain", { length: 128 }).notNull(),
  scenario: text("scenario").notNull(),
  relevantTeaching: text("relevantTeaching"),
  application: text("application"),
  outcome: text("outcome"),
  commonObstacles: text("commonObstacles"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = typeof caseStudies.$inferInsert;

/**
 * Integration guides for learning paths
 */
export const integrationGuides = mysqlTable("integration_guides", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull().unique(),
  beginnerPath: text("beginnerPath"),
  intermediatePath: text("intermediatePath"),
  advancedPath: text("advancedPath"),
  dailyIntegration: json("dailyIntegration").$type<string[]>(),
  complementaryTeachers: json("complementaryTeachers").$type<string[]>(),
  potentialPitfalls: json("potentialPitfalls").$type<string[]>(),
  signsOfProgress: json("signsOfProgress").$type<string[]>(),
  whenThisHelps: text("whenThisHelps"),
  whenToLookElsewhere: text("whenToLookElsewhere"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type IntegrationGuide = typeof integrationGuides.$inferSelect;
export type InsertIntegrationGuide = typeof integrationGuides.$inferInsert;

/**
 * Global glossary terms
 */
export const glossaryTerms = mysqlTable("glossary_terms", {
  id: int("id").autoincrement().primaryKey(),
  term: varchar("term", { length: 256 }).notNull().unique(),
  definition: text("definition").notNull(),
  traditions: json("traditions").$type<string[]>(),
  relatedTerms: json("relatedTerms").$type<string[]>(),
  teacherIds: json("teacherIds").$type<number[]>(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertGlossaryTerm = typeof glossaryTerms.$inferInsert;

/**
 * User favorites/bookmarks for sages
 */
export const sageFavorites = mysqlTable("sage_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  teacherId: int("teacherId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SageFavorite = typeof sageFavorites.$inferSelect;
export type InsertSageFavorite = typeof sageFavorites.$inferInsert;


/**
 * User activity tracking for analytics
 * Tracks every user action across the platform
 */
export const userActivity = mysqlTable(
  "user_activity",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    activityType: mysqlEnum("activityType", [
      "page_view",
      "experiment_started",
      "paradox_explored",
      "retreat_begun",
      "quote_saved",
      "sage_viewed",
      "theme_explored",
      "search_performed",
      "ai_insight_generated",
    ]).notNull(),
    resourceType: varchar("resourceType", { length: 50 }),
    resourceId: varchar("resourceId", { length: 255 }),
    resourceName: text("resourceName"),
    metadata: text("metadata"),
    ipAddress: varchar("ipAddress", { length: 45 }),
    userAgent: text("userAgent"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = typeof userActivity.$inferInsert;

/**
 * User engagement metrics
 * Tracks user interaction patterns and engagement levels
 */
export const userEngagement = mysqlTable(
  "user_engagement",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().unique(),
    lastActivityDate: timestamp("last_activity_date"),
    totalActiveDays: int("total_active_days").default(0).notNull(),
    currentStreak: int("current_streak").default(0).notNull(),
    longestStreak: int("longest_streak").default(0).notNull(),
    totalPageViews: int("total_page_views").default(0).notNull(),
    totalExperimentsStarted: int("total_experiments_started").default(0).notNull(),
    totalExperimentsCompleted: int("total_experiments_completed").default(0).notNull(),
    totalParadoxesExplored: int("total_paradoxes_explored").default(0).notNull(),
    totalRetreatsBegun: int("total_retreats_begun").default(0).notNull(),
    totalRetreatsCompleted: int("total_retreats_completed").default(0).notNull(),
    totalAIInsightsGenerated: int("total_ai_insights_generated").default(0).notNull(),
    engagementScore: varchar("engagement_score", { length: 10 }).default("0").notNull(),
    lastEngagementCalculated: timestamp("last_engagement_calculated"),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type UserEngagement = typeof userEngagement.$inferSelect;
export type InsertUserEngagement = typeof userEngagement.$inferInsert;

/**
 * Feature usage statistics
 * Tracks which features are most popular
 */
export const featureUsage = mysqlTable(
  "feature_usage",
  {
    id: int("id").autoincrement().primaryKey(),
    featureName: varchar("feature_name", { length: 100 }).notNull().unique(),
    totalUsageCount: int("total_usage_count").default(0).notNull(),
    uniqueUsers: int("unique_users").default(0).notNull(),
    averageUsagePerUser: varchar("average_usage_per_user", { length: 20 }).default("0").notNull(),
    lastUsedDate: timestamp("last_used_date"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type FeatureUsage = typeof featureUsage.$inferSelect;
export type InsertFeatureUsage = typeof featureUsage.$inferInsert;

/**
 * Admin audit log
 * Tracks all admin actions for security and compliance
 */
export const adminAuditLog = mysqlTable(
  "admin_audit_log",
  {
    id: int("id").autoincrement().primaryKey(),
    adminId: int("admin_id").notNull(),
    action: mysqlEnum("action", [
      "user_role_changed",
      "user_suspended",
      "user_deleted",
      "user_restored",
      "content_moderated",
      "system_setting_changed",
      "analytics_exported",
      "user_data_accessed",
    ]).notNull(),
    targetUserId: int("target_user_id"),
    targetResourceType: varchar("target_resource_type", { length: 50 }),
    targetResourceId: varchar("target_resource_id", { length: 255 }),
    details: text("details"),
    ipAddress: varchar("ip_address", { length: 45 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export type AdminAuditLog = typeof adminAuditLog.$inferSelect;
export type InsertAdminAuditLog = typeof adminAuditLog.$inferInsert;
