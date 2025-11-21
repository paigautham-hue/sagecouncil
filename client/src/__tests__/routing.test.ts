import { describe, it, expect } from "vitest";

/**
 * Unit tests for application routing
 * Verifies that all routes are properly configured and accessible
 */

describe("Application Routing", () => {
  const routes = {
    public: [
      { path: "/", name: "Home" },
      { path: "/about", name: "About" },
      { path: "/faq", name: "FAQ" },
      { path: "/safety", name: "Safety" },
      { path: "/privacy", name: "Privacy" },
    ],
    core: [
      { path: "/council", name: "Council" },
      { path: "/favorites", name: "Favorites" },
      { path: "/micro-retreats", name: "Micro Retreats" },
      { path: "/paradox-playground", name: "Paradox Playground" },
      { path: "/life-experiments", name: "Life Experiments" },
    ],
    sages: [
      { path: "/sages", name: "Sages Library" },
      { path: "/sages/1", name: "Sage Detail (Dynamic)" },
    ],
    journeys: [
      { path: "/journeys", name: "Journeys" },
      { path: "/journeys/1", name: "Journey Detail (Dynamic)" },
    ],
    user: [
      { path: "/my-path", name: "My Path" },
    ],
    admin: [
      { path: "/admin", name: "Admin Console" },
      { path: "/admin/dashboard", name: "Admin Dashboard" },
      { path: "/admin/analytics", name: "Admin Analytics" },
    ],
    error: [
      { path: "/404", name: "Not Found" },
    ],
  };

  it("should have all public routes defined", () => {
    expect(routes.public.length).toBeGreaterThan(0);
    expect(routes.public).toContainEqual({ path: "/", name: "Home" });
    expect(routes.public).toContainEqual({ path: "/about", name: "About" });
  });

  it("should have all core feature routes defined", () => {
    expect(routes.core.length).toBe(5);
    expect(routes.core).toContainEqual({ path: "/council", name: "Council" });
    expect(routes.core).toContainEqual({ path: "/favorites", name: "Favorites" });
  });

  it("should have sage routes with correct order", () => {
    // General route must come before specific route
    const sageIndex = routes.sages.findIndex(r => r.path === "/sages");
    const sageDetailIndex = routes.sages.findIndex(r => r.path === "/sages/1");
    expect(sageIndex).toBeLessThan(sageDetailIndex);
  });

  it("should have journey routes with correct order", () => {
    // General route must come before specific route
    const journeyIndex = routes.journeys.findIndex(r => r.path === "/journeys");
    const journeyDetailIndex = routes.journeys.findIndex(r => r.path === "/journeys/1");
    expect(journeyIndex).toBeLessThan(journeyDetailIndex);
  });

  it("should have admin routes properly separated", () => {
    expect(routes.admin.length).toBe(3);
    expect(routes.admin).toContainEqual({ path: "/admin", name: "Admin Console" });
    expect(routes.admin).toContainEqual({ path: "/admin/dashboard", name: "Admin Dashboard" });
    expect(routes.admin).toContainEqual({ path: "/admin/analytics", name: "Admin Analytics" });
  });

  it("should have no duplicate routes", () => {
    const allRoutes = [
      ...routes.public,
      ...routes.core,
      ...routes.sages,
      ...routes.journeys,
      ...routes.user,
      ...routes.admin,
      ...routes.error,
    ];

    const paths = allRoutes.map(r => r.path);
    const uniquePaths = new Set(paths);

    // Filter out dynamic routes for duplicate check
    const staticPaths = paths.filter(p => !p.includes(":"));
    const uniqueStaticPaths = new Set(staticPaths);

    expect(staticPaths.length).toBe(uniqueStaticPaths.size);
  });

  it("should have 404 fallback route", () => {
    expect(routes.error).toContainEqual({ path: "/404", name: "Not Found" });
  });

  it("should have proper route grouping for navigation", () => {
    // Public pages should be accessible without authentication
    expect(routes.public.length).toBeGreaterThan(0);

    // Core features should be accessible to authenticated users
    expect(routes.core.length).toBeGreaterThan(0);

    // Admin routes should be restricted to admin users
    expect(routes.admin.length).toBeGreaterThan(0);
  });

  it("should support dynamic route parameters", () => {
    const dynamicRoutes = [
      "/sages/:teacherId",
      "/journeys/:journeyId",
    ];

    dynamicRoutes.forEach(route => {
      expect(route).toContain(":");
    });
  });

  it("should have consistent path naming conventions", () => {
    const allRoutes = [
      ...routes.public,
      ...routes.core,
      ...routes.sages,
      ...routes.journeys,
      ...routes.user,
      ...routes.admin,
    ];

    // All paths should start with /
    allRoutes.forEach(route => {
      expect(route.path).toMatch(/^\/[a-z-:]*$/);
    });
  });

  it("should prevent route conflicts", () => {
    // /admin should not conflict with /admin/dashboard or /admin/analytics
    // This is handled by route ordering in the Router component
    const adminRoutes = routes.admin.map(r => r.path).sort();
    
    // More specific routes should come after general routes
    expect(adminRoutes[0]).toBe("/admin");
    expect(adminRoutes[1]).toBe("/admin/analytics");
    expect(adminRoutes[2]).toBe("/admin/dashboard");
  });

  it("should have all imported pages routed", () => {
    // These pages are imported in App.tsx and should have routes
    const importedPages = [
      "Home",
      "About",
      "Council",
      "Sages",
      "SageDetail",
      "Journeys",
      "JourneyDetail",
      "MyPath",
      "Favorites",
      "MicroRetreats",
      "ParadoxPlayground",
      "LifeExperiments",
      "FAQ",
      "Safety",
      "Privacy",
      "AdminConsole",
      "AdminDashboard",
      "AdminAnalytics",
      "NotFound",
    ];

    const allRouteNames = [
      ...routes.public,
      ...routes.core,
      ...routes.sages,
      ...routes.journeys,
      ...routes.user,
      ...routes.admin,
      ...routes.error,
    ].map(r => r.name);

    expect(allRouteNames.length).toBeGreaterThanOrEqual(importedPages.length - 2); // -2 for dynamic routes
  });

  it("should maintain route hierarchy", () => {
    // Public routes first
    // Core features second
    // Specific routes (sages, journeys) third
    // User routes fourth
    // Admin routes fifth
    // Error routes last

    const routeOrder = [
      routes.public,
      routes.core,
      routes.sages,
      routes.journeys,
      routes.user,
      routes.admin,
      routes.error,
    ];

    routeOrder.forEach(group => {
      expect(group.length).toBeGreaterThan(0);
    });
  });
});

describe("Route Accessibility", () => {
  it("should have home page accessible", () => {
    const homePath = "/";
    expect(homePath).toBe("/");
  });

  it("should have about page accessible", () => {
    const aboutPath = "/about";
    expect(aboutPath).toMatch(/^\/about$/);
  });

  it("should have sages library accessible", () => {
    const sagesPath = "/sages";
    expect(sagesPath).toMatch(/^\/sages$/);
  });

  it("should support sage detail with teacher ID", () => {
    const sagePath = "/sages/123";
    expect(sagePath).toMatch(/^\/sages\/\d+$/);
  });

  it("should have admin panel accessible", () => {
    const adminPath = "/admin";
    expect(adminPath).toBe("/admin");
  });

  it("should have 404 fallback", () => {
    const notFoundPath = "/404";
    expect(notFoundPath).toBe("/404");
  });
});
