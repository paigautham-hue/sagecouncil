import { eq, desc, gte, lte, and, count, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  users,
  userActivity,
  userEngagement,
  featureUsage,
  adminAuditLog,
} from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Get all users with pagination and filtering
 */
export async function getAllUsers(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(users)
    .limit(limit)
    .offset(offset);
}

/**
 * Get total user count
 */
export async function getTotalUserCount() {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: count() })
    .from(users);

  return result[0]?.count || 0;
}

/**
 * Get user by ID with engagement stats
 */
export async function getUserWithStats(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user.length) return null;

  const engagement = await db
    .select()
    .from(userEngagement)
    .where(eq(userEngagement.userId, userId))
    .limit(1);

  return {
    user: user[0],
    engagement: engagement[0] || null,
  };
}

/**
 * Get user activity for a specific user
 */
export async function getUserActivity(userId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(userActivity)
    .where(eq(userActivity.userId, userId))
    .orderBy(desc(userActivity.createdAt))
    .limit(limit);
}

/**
 * Get platform-wide analytics
 */
export async function getPlatformAnalytics() {
  const db = await getDb();
  if (!db) return null;

  const totalUsers = await db
    .select({ count: count() })
    .from(users);

  const adminUsers = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, "admin"));

  const totalActivities = await db
    .select({ count: count() })
    .from(userActivity);

  const activeUsers = await db
    .select({ userId: userActivity.userId })
    .from(userActivity)
    .where(gte(userActivity.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    .groupBy(userActivity.userId);

  return {
    totalUsers: totalUsers[0]?.count || 0,
    adminUsers: adminUsers[0]?.count || 0,
    totalActivities: totalActivities[0]?.count || 0,
    activeUsersLast7Days: activeUsers.length,
  };
}

/**
 * Get feature usage statistics
 */
export async function getFeatureUsageStats() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(featureUsage)
    .orderBy(desc(featureUsage.totalUsageCount))
    .limit(20);
}

/**
 * Get user engagement stats
 */
export async function getTopEngagedUsers(limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      user: users,
      engagement: userEngagement,
    })
    .from(userEngagement)
    .innerJoin(users, eq(userEngagement.userId, users.id))
    .orderBy(desc(userEngagement.engagementScore))
    .limit(limit);
}

/**
 * Log admin action
 */
export async function logAdminAction(
  adminId: number,
  action: string,
  targetUserId?: number,
  details?: string,
  ipAddress?: string
) {
  const db = await getDb();
  if (!db) return;

  await db.insert(adminAuditLog).values({
    adminId,
    action: action as any,
    targetUserId,
    details,
    ipAddress,
  });
}

/**
 * Get admin audit logs
 */
export async function getAdminAuditLogs(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(adminAuditLog)
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Track user activity
 */
export async function trackUserActivity(
  userId: number,
  activityType: string,
  resourceType?: string,
  resourceId?: string,
  resourceName?: string,
  metadata?: string,
  ipAddress?: string,
  userAgent?: string
) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(userActivity).values({
      userId,
      activityType: activityType as any,
      resourceType,
      resourceId,
      resourceName,
      metadata,
      ipAddress,
      userAgent,
    });

    // Update user engagement stats
    const engagement = await db
      .select()
      .from(userEngagement)
      .where(eq(userEngagement.userId, userId))
      .limit(1);

    if (engagement.length) {
      // Update existing engagement record
      const updates: any = {
        lastActivityDate: new Date(),
        totalPageViews: engagement[0].totalPageViews + 1,
        updatedAt: new Date(),
      };

      if (activityType === "experiment_started") {
        updates.totalExperimentsStarted = engagement[0].totalExperimentsStarted + 1;
      } else if (activityType === "paradox_explored") {
        updates.totalParadoxesExplored = engagement[0].totalParadoxesExplored + 1;
      } else if (activityType === "retreat_begun") {
        updates.totalRetreatsBegun = engagement[0].totalRetreatsBegun + 1;
      } else if (activityType === "ai_insight_generated") {
        updates.totalAIInsightsGenerated = engagement[0].totalAIInsightsGenerated + 1;
      }

      await db
        .update(userEngagement)
        .set(updates)
        .where(eq(userEngagement.userId, userId));
    } else {
      // Create new engagement record
      const newEngagement: any = {
        userId,
        lastActivityDate: new Date(),
        totalPageViews: 1,
        totalActiveDays: 1,
      };

      if (activityType === "experiment_started") {
        newEngagement.totalExperimentsStarted = 1;
      } else if (activityType === "paradox_explored") {
        newEngagement.totalParadoxesExplored = 1;
      } else if (activityType === "retreat_begun") {
        newEngagement.totalRetreatsBegun = 1;
      } else if (activityType === "ai_insight_generated") {
        newEngagement.totalAIInsightsGenerated = 1;
      }

      await db.insert(userEngagement).values(newEngagement);
    }
  } catch (error) {
    console.error("[Database] Failed to track user activity:", error);
  }
}

/**
 * Get user activity summary for dashboard
 */
export async function getUserActivitySummary(userId: number, days = 30) {
  const db = await getDb();
  if (!db) return null;

  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const activities = await db
    .select({
      activityType: userActivity.activityType,
      count: count(),
    })
    .from(userActivity)
    .where(
      and(
        eq(userActivity.userId, userId),
        gte(userActivity.createdAt, startDate)
      )
    )
    .groupBy(userActivity.activityType);

  return activities;
}
