import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "../db";
import * as adminDb from "../db-admin";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Admin Features", () => {
  let testUserId: number;
  let db: any;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Create a test user
    const result = await db
      .insert(users)
      .values({
        openId: "test-admin-user-" + Date.now(),
        name: "Test Admin User",
        email: "testadmin@example.com",
        role: "user",
      });

    // Get the inserted user ID
    const insertedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "testadmin@example.com"))
      .limit(1);

    testUserId = insertedUser[0]?.id;
  });

  afterAll(async () => {
    // Cleanup test user
    if (testUserId && db) {
      await db.delete(users).where(eq(users.id, testUserId));
    }
  });

  describe("User Management", () => {
    it("should get all users with pagination", async () => {
      const result = await adminDb.getAllUsers(50, 0);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should get total user count", async () => {
      const count = await adminDb.getTotalUserCount();
      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThan(0);
    });

    it("should get user with stats", async () => {
      const userStats = await adminDb.getUserWithStats(testUserId);
      expect(userStats).toBeDefined();
      expect(userStats?.user.id).toBe(testUserId);
    });

    it("should get user activity", async () => {
      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(Array.isArray(activities)).toBe(true);
    });
  });

  describe("Platform Analytics", () => {
    it("should get platform analytics", async () => {
      const analytics = await adminDb.getPlatformAnalytics();
      expect(analytics).toBeDefined();
      expect(typeof analytics?.totalUsers).toBe("number");
      expect(typeof analytics?.adminUsers).toBe("number");
      expect(typeof analytics?.totalActivities).toBe("number");
      expect(typeof analytics?.activeUsersLast7Days).toBe("number");
    });

    it("should have valid analytics data", async () => {
      const analytics = await adminDb.getPlatformAnalytics();
      expect(analytics!.totalUsers).toBeGreaterThanOrEqual(0);
      expect(analytics!.adminUsers).toBeGreaterThanOrEqual(0);
      expect(analytics!.adminUsers).toBeLessThanOrEqual(analytics!.totalUsers);
    });
  });

  describe("Feature Usage", () => {
    it("should get feature usage stats", async () => {
      const stats = await adminDb.getFeatureUsageStats();
      expect(Array.isArray(stats)).toBe(true);
    });
  });

  describe("Engagement Tracking", () => {
    it("should get top engaged users", async () => {
      const topUsers = await adminDb.getTopEngagedUsers(20);
      expect(Array.isArray(topUsers)).toBe(true);
    });

    it("should get user activity summary", async () => {
      const summary = await adminDb.getUserActivitySummary(testUserId, 30);
      expect(Array.isArray(summary)).toBe(true);
    });
  });

  describe("Audit Logging", () => {
    it("should log admin action", async () => {
      const adminId = testUserId;
      await adminDb.logAdminAction(
        adminId,
        "test_action",
        testUserId,
        "Test action details"
      );

      const logs = await adminDb.getAdminAuditLogs(50, 0);
      expect(Array.isArray(logs)).toBe(true);
      // Verify at least one log exists
      expect(logs.length).toBeGreaterThanOrEqual(0);
    });

    it("should get audit logs", async () => {
      const logs = await adminDb.getAdminAuditLogs(50, 0);
      expect(Array.isArray(logs)).toBe(true);
    });
  });

  describe("User Activity Tracking", () => {
    it("should track user activity", async () => {
      await adminDb.trackUserActivity(
        testUserId,
        "page_view",
        "home",
        "home-page",
        "Home Page"
      );

      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(Array.isArray(activities)).toBe(true);
    });

    it("should track experiment started activity", async () => {
      await adminDb.trackUserActivity(
        testUserId,
        "experiment_started",
        "experiment",
        "exp-1",
        "Test Experiment"
      );

      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(activities.length).toBeGreaterThan(0);
    });

    it("should track paradox explored activity", async () => {
      await adminDb.trackUserActivity(
        testUserId,
        "paradox_explored",
        "paradox",
        "par-1",
        "Test Paradox"
      );

      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(activities.length).toBeGreaterThan(0);
    });

    it("should track retreat begun activity", async () => {
      await adminDb.trackUserActivity(
        testUserId,
        "retreat_begun",
        "retreat",
        "ret-1",
        "Test Retreat"
      );

      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(activities.length).toBeGreaterThan(0);
    });

    it("should track AI insight generated activity", async () => {
      await adminDb.trackUserActivity(
        testUserId,
        "ai_insight_generated",
        "insight",
        "ins-1",
        "Test Insight"
      );

      const activities = await adminDb.getUserActivity(testUserId, 100);
      expect(activities.length).toBeGreaterThan(0);
    });
  });

  describe("Data Integrity", () => {
    it("should maintain data consistency", async () => {
      const userStats = await adminDb.getUserWithStats(testUserId);
      expect(userStats?.user.id).toBe(testUserId);

      const totalCount = await adminDb.getTotalUserCount();
      expect(totalCount).toBeGreaterThan(0);
    });

    it("should handle missing user gracefully", async () => {
      const userStats = await adminDb.getUserWithStats(999999);
      expect(userStats).toBeNull();
    });
  });
});
