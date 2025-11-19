import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq, count } from "drizzle-orm";

describe("Admin Core Features", () => {
  let testUserId: number;
  let db: any;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Create a test user
    await db.insert(users).values({
      openId: "test-admin-core-" + Date.now(),
      name: "Test Admin Core User",
      email: "testadmincore@example.com",
      role: "user",
    });

    // Get the inserted user ID
    const insertedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "testadmincore@example.com"))
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
    it("should retrieve all users from database", async () => {
      const allUsers = await db.select().from(users).limit(50);
      expect(Array.isArray(allUsers)).toBe(true);
      expect(allUsers.length).toBeGreaterThan(0);
    });

    it("should count total users", async () => {
      const allUsers = await db.select().from(users);
      expect(allUsers.length).toBeGreaterThan(0);
    });

    it("should get user by ID", async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId))
        .limit(1);
      expect(user.length).toBe(1);
      expect(user[0].id).toBe(testUserId);
      expect(user[0].email).toBe("testadmincore@example.com");
    });

    it("should update user role", async () => {
      await db
        .update(users)
        .set({ role: "admin" })
        .where(eq(users.id, testUserId));

      const updatedUser = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId))
        .limit(1);

      expect(updatedUser[0].role).toBe("admin");

      // Reset role
      await db
        .update(users)
        .set({ role: "user" })
        .where(eq(users.id, testUserId));
    });

    it("should filter users by role", async () => {
      const adminUsers = await db
        .select()
        .from(users)
        .where(eq(users.role, "admin"))
        .limit(50);

      expect(Array.isArray(adminUsers)).toBe(true);
      adminUsers.forEach((user: any) => {
        expect(user.role).toBe("admin");
      });
    });

    it("should get user creation date", async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId))
        .limit(1);

      expect(user[0].createdAt).toBeDefined();
      expect(user[0].createdAt instanceof Date).toBe(true);
    });
  });

  describe("Admin Access Control", () => {
    it("should identify admin users", async () => {
      const adminUsers = await db
        .select()
        .from(users)
        .where(eq(users.role, "admin"));

      expect(adminUsers.length).toBeGreaterThan(0);
      const hasAdmins = adminUsers.some((u: any) => u.role === "admin");
      expect(hasAdmins).toBe(true);
    });

    it("should identify regular users", async () => {
      const regularUsers = await db
        .select()
        .from(users)
        .where(eq(users.role, "user"));

      expect(Array.isArray(regularUsers)).toBe(true);
      regularUsers.forEach((user: any) => {
        expect(user.role).toBe("user");
      });
    });
  });

  describe("User Data Integrity", () => {
    it("should maintain user data consistency", async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId))
        .limit(1);

      expect(user[0]).toBeDefined();
      expect(user[0].openId).toBeDefined();
      expect(user[0].name).toBe("Test Admin Core User");
      expect(user[0].email).toBe("testadmincore@example.com");
    });

    it("should handle non-existent user gracefully", async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, 999999))
        .limit(1);

      expect(user.length).toBe(0);
    });

    it("should preserve user timestamps", async () => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, testUserId))
        .limit(1);

      expect(user[0].createdAt).toBeDefined();
      expect(user[0].updatedAt).toBeDefined();
      expect(user[0].lastSignedIn).toBeDefined();
    });
  });

  describe("Admin Dashboard Data", () => {
    it("should provide user list for admin dashboard", async () => {
      const users_list = await db
        .select()
        .from(users)
        .limit(50);

      expect(Array.isArray(users_list)).toBe(true);
      expect(users_list.length).toBeGreaterThan(0);

      // Verify required fields for dashboard
      users_list.forEach((user: any) => {
        expect(user.id).toBeDefined();
        expect(user.name).toBeDefined();
        expect(user.email).toBeDefined();
        expect(user.role).toBeDefined();
        expect(user.createdAt).toBeDefined();
      });
    });

    it("should provide user statistics", async () => {
      const allUsers = await db.select().from(users);
      const adminCount = allUsers.filter((u: any) => u.role === "admin").length;
      const userCount = allUsers.filter((u: any) => u.role === "user").length;

      expect(adminCount).toBeGreaterThanOrEqual(0);
      expect(userCount).toBeGreaterThanOrEqual(0);
      expect(adminCount + userCount).toBe(allUsers.length);
    });
  });
});
