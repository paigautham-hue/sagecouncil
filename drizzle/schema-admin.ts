import {
  int,
  varchar,
  text,
  timestamp,
  boolean,
  mysqlEnum,
  mysqlTable,
  index,
  decimal,
} from "drizzle-orm/mysql-core";

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
    metadata: text("metadata"), // JSON string for additional data
    ipAddress: varchar("ipAddress", { length: 45 }),
    userAgent: text("userAgent"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
    activityTypeIdx: index("activity_type_idx").on(table.activityType),
  })
);

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = typeof userActivity.$inferInsert;

/**
 * Daily user statistics for analytics dashboards
 * Aggregated data for performance optimization
 */
export const dailyUserStats = mysqlTable(
  "daily_user_stats",
  {
    id: int("id").autoincrement().primaryKey(),
    date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
    totalActiveUsers: int("total_active_users").default(0).notNull(),
    newUsers: int("new_users").default(0).notNull(),
    totalPageViews: int("total_page_views").default(0).notNull(),
    totalExperimentsStarted: int("total_experiments_started").default(0).notNull(),
    totalParadoxesExplored: int("total_paradoxes_explored").default(0).notNull(),
    totalRetreatsBegun: int("total_retreats_begun").default(0).notNull(),
    averageSessionDuration: decimal("average_session_duration", { precision: 10, scale: 2 }).default("0").notNull(),
    bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }).default("0").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    dateIdx: index("date_idx").on(table.date),
  })
);

export type DailyUserStats = typeof dailyUserStats.$inferSelect;
export type InsertDailyUserStats = typeof dailyUserStats.$inferInsert;

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
    engagementScore: decimal("engagement_score", { precision: 5, scale: 2 }).default("0").notNull(),
    lastEngagementCalculated: timestamp("last_engagement_calculated"),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("user_id_engagement_idx").on(table.userId),
  })
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
    averageUsagePerUser: decimal("average_usage_per_user", { precision: 10, scale: 2 }).default("0").notNull(),
    lastUsedDate: timestamp("last_used_date"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    featureNameIdx: index("feature_name_idx").on(table.featureName),
  })
);

export type FeatureUsage = typeof featureUsage.$inferSelect;
export type InsertFeatureUsage = typeof featureUsage.$inferInsert;

/**
 * User session tracking
 * Tracks user sessions for engagement analysis
 */
export const userSession = mysqlTable(
  "user_session",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    sessionId: varchar("session_id", { length: 255 }).notNull().unique(),
    startTime: timestamp("start_time").defaultNow().notNull(),
    endTime: timestamp("end_time"),
    duration: int("duration"), // in seconds
    pageViewCount: int("page_view_count").default(0).notNull(),
    lastPageViewed: varchar("last_page_viewed", { length: 255 }),
    deviceType: mysqlEnum("device_type", ["mobile", "tablet", "desktop"]),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("user_id_session_idx").on(table.userId),
    sessionIdIdx: index("session_id_idx").on(table.sessionId),
  })
);

export type UserSession = typeof userSession.$inferSelect;
export type InsertUserSession = typeof userSession.$inferInsert;

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
    details: text("details"), // JSON string with action details
    ipAddress: varchar("ip_address", { length: 45 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    adminIdIdx: index("admin_id_idx").on(table.adminId),
    createdAtIdx: index("audit_created_at_idx").on(table.createdAt),
  })
);

export type AdminAuditLog = typeof adminAuditLog.$inferSelect;
export type InsertAdminAuditLog = typeof adminAuditLog.$inferInsert;
