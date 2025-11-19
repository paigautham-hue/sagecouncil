import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../\_core/trpc";
import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";
import {
  getAllUsers,
  getTotalUserCount,
  getUserWithStats,
  getUserActivity,
  getPlatformAnalytics,
  getFeatureUsageStats,
  getTopEngagedUsers,
  logAdminAction,
  getAdminAuditLogs,
  getUserActivitySummary,
} from "../db-admin";
import { getDb } from "../db";

/**
 * Admin-only procedure middleware
 */
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({ ctx });
});

export const adminRouter = router({
  /**
   * Get all users with pagination
   */
  getAllUsers: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;
      const usersList = await getAllUsers(input.limit, offset);
      const total = await getTotalUserCount();

      return {
        users: usersList,
        total,
        page: input.page,
        limit: input.limit,
        totalPages: Math.ceil(total / input.limit),
      };
    }),

  /**
   * Get user details with engagement stats
   */
  getUserDetails: adminProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const userStats = await getUserWithStats(input.userId);
      if (!userStats) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const activities = await getUserActivity(input.userId, 50);
      const activitySummary = await getUserActivitySummary(input.userId, 30);

      return {
        ...userStats,
        recentActivities: activities,
        activitySummary,
      };
    }),

  /**
   * Get platform-wide analytics
   */
  getPlatformAnalytics: adminProcedure.query(async () => {
    return await getPlatformAnalytics();
  }),

  /**
   * Get feature usage statistics
   */
  getFeatureUsageStats: adminProcedure.query(async () => {
    return await getFeatureUsageStats();
  }),

  /**
   * Get top engaged users
   */
  getTopEngagedUsers: adminProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(20) }))
    .query(async ({ input }) => {
      return await getTopEngagedUsers(input.limit);
    }),

  /**
   * Change user role
   */
  changeUserRole: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        newRole: z.enum(["admin", "user"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Prevent self-demotion
      if (input.userId === ctx.user.id && input.newRole === "user") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot demote yourself from admin",
        });
      }

      await db
        .update(users)
        .set({ role: input.newRole })
        .where(eq(users.id, input.userId));

      // Log admin action
      await logAdminAction(
        ctx.user.id,
        "user_role_changed",
        input.userId,
        JSON.stringify({ newRole: input.newRole })
      );

      return { success: true };
    }),

  /**
   * Get admin audit logs
   */
  getAuditLogs: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;
      const logs = await getAdminAuditLogs(input.limit, offset);

      return {
        logs,
        page: input.page,
        limit: input.limit,
      };
    }),

  /**
   * Export analytics data
   */
  exportAnalytics: adminProcedure
    .input(
      z.object({
        format: z.enum(["json", "csv"]).default("json"),
        dataType: z.enum(["users", "activities", "engagement"]).default("users"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Log the export action
      await logAdminAction(
        ctx.user.id,
        "analytics_exported",
        undefined,
        JSON.stringify({ format: input.format, dataType: input.dataType })
      );

      if (input.dataType === "users") {
        const usersList = await getAllUsers(10000, 0);
        return {
          success: true,
          data: usersList,
          format: input.format,
        };
      } else if (input.dataType === "activities") {
        const analytics = await getPlatformAnalytics();
        return {
          success: true,
          data: analytics,
          format: input.format,
        };
      } else {
        const engagedUsers = await getTopEngagedUsers(1000);
        return {
          success: true,
          data: engagedUsers,
          format: input.format,
        };
      }
    }),
});
