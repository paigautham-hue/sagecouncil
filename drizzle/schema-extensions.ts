/**
 * Schema Extensions for AI Insights and Progress Tracking
 * Add these tables to drizzle/schema.ts
 */

import {
  int,
  varchar,
  text,
  timestamp,
  mysqlTable,
  boolean,
  json,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

/**
 * User Paradox Insights - Store AI-generated insights for paradoxes
 */
export const userParadoxInsights = mysqlTable('user_paradox_insights', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  paradoxId: int('paradoxId').notNull(),
  insight: text('insight').notNull(),
  provider: varchar('provider', { length: 50 }).notNull(), // claude, perplexity, gemini, grok
  theme: varchar('theme', { length: 100 }),
  feedback: mysqlEnum('feedback', ['helpful', 'not_helpful', 'neutral']),
  savedToJournal: boolean('savedToJournal').default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type UserParadoxInsight = typeof userParadoxInsights.$inferSelect;
export type InsertUserParadoxInsight = typeof userParadoxInsights.$inferInsert;

/**
 * User Experiment Progress - Track user's experiment journey
 */
export const userExperimentProgress = mysqlTable('user_experiment_progress', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  experimentId: int('experimentId').notNull(),
  status: mysqlEnum('status', ['not_started', 'in_progress', 'completed', 'paused']).default('not_started'),
  startedAt: timestamp('startedAt'),
  completedAt: timestamp('completedAt'),
  reflection: text('reflection'),
  insights: json('insights'),
  daysCompleted: int('daysCompleted').default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type UserExperimentProgress = typeof userExperimentProgress.$inferSelect;
export type InsertUserExperimentProgress = typeof userExperimentProgress.$inferInsert;

/**
 * User Retreat Sessions - Track micro-retreat participation
 */
export const userRetreatsessions = mysqlTable('user_retreat_sessions', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  retreatId: int('retreatId').notNull(),
  status: mysqlEnum('status', ['not_started', 'in_progress', 'completed']).default('not_started'),
  stepsCompleted: int('stepsCompleted').default(0),
  totalSteps: int('totalSteps').notNull(),
  reflection: text('reflection'),
  startedAt: timestamp('startedAt'),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type UserRetreatSession = typeof userRetreatsessions.$inferSelect;
export type InsertUserRetreatSession = typeof userRetreatsessions.$inferInsert;

/**
 * User Achievements - Track badges and milestones
 */
export const userAchievements = mysqlTable('user_achievements', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  achievementId: varchar('achievementId', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 255}),
  category: mysqlEnum('category', [
    'exploration',
    'consistency',
    'depth',
    'growth',
    'community',
  ]).notNull(),
  earnedAt: timestamp('earnedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

/**
 * Streak Tracking - Track daily practice streaks
 */
export const streakTracking = mysqlTable('streak_tracking', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  streakType: mysqlEnum('streakType', [
    'daily_questions',
    'experiments',
    'paradox_exploration',
    'retreats',
  ]).notNull(),
  currentStreak: int('currentStreak').default(0),
  longestStreak: int('longestStreak').default(0),
  lastActivityDate: timestamp('lastActivityDate'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type StreakTracking = typeof streakTracking.$inferSelect;
export type InsertStreakTracking = typeof streakTracking.$inferInsert;

/**
 * User Statistics - Aggregate user engagement metrics
 */
export const userStatistics = mysqlTable('user_statistics', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  totalParadoxesExplored: int('totalParadoxesExplored').default(0),
  totalExperimentsStarted: int('totalExperimentsStarted').default(0),
  totalExperimentsCompleted: int('totalExperimentsCompleted').default(0),
  totalRetreatsCompleted: int('totalRetreatsCompleted').default(0),
  totalInsightsGenerated: int('totalInsightsGenerated').default(0),
  totalAchievementsEarned: int('totalAchievementsEarned').default(0),
  favoriteTheme: varchar('favoriteTheme', { length: 100 }),
  favoriteTeacher: int('favoriteTeacher'),
  lastActivityDate: timestamp('lastActivityDate'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type UserStatistics = typeof userStatistics.$inferSelect;
export type InsertUserStatistics = typeof userStatistics.$inferInsert;
