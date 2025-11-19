import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Users, BarChart3, Activity, LogOut, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Admin Dashboard - Comprehensive user and analytics management
 */
export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Admin queries
  const { data: platformAnalytics, isLoading: analyticsLoading } = trpc.admin.getPlatformAnalytics.useQuery();
  const { data: usersData, isLoading: usersLoading } = trpc.admin.getAllUsers.useQuery({ page: 1, limit: 50 });
  const { data: featureUsage } = trpc.admin.getFeatureUsageStats.useQuery();
  const { data: topUsers } = trpc.admin.getTopEngagedUsers.useQuery({ limit: 20 });
  const { data: userDetails } = trpc.admin.getUserDetails.useQuery(
    { userId: selectedUserId! },
    { enabled: !!selectedUserId }
  );
  const { data: auditLogs } = trpc.admin.getAuditLogs.useQuery({ page: 1, limit: 50 });

  // Mutations
  const changeRoleMutation = trpc.admin.changeUserRole.useMutation();
  const exportMutation = trpc.admin.exportAnalytics.useMutation();

  // Check admin access
  if (user?.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You don't have permission to access the admin dashboard</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const handleChangeRole = async (userId: number, newRole: "admin" | "user") => {
    try {
      await changeRoleMutation.mutateAsync({ userId, newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleExportAnalytics = async (format: "json" | "csv", dataType: "users" | "activities" | "engagement") => {
    try {
      const result = await exportMutation.mutateAsync({ format, dataType });
      toast.success(`Analytics exported as ${format.toUpperCase()}`);
      console.log("Exported data:", result.data);
    } catch (error) {
      toast.error("Failed to export analytics");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gradient-gold">Admin Dashboard</h1>
          <p className="text-foreground/70">Manage users, view analytics, and monitor platform activity</p>
        </div>

        {/* Platform Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformAnalytics?.totalUsers || 0}</div>
              <p className="text-xs text-foreground/60 mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformAnalytics?.adminUsers || 0}</div>
              <p className="text-xs text-foreground/60 mt-1">With admin access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Users (7d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformAnalytics?.activeUsersLast7Days || 0}</div>
              <p className="text-xs text-foreground/60 mt-1">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformAnalytics?.totalActivities || 0}</div>
              <p className="text-xs text-foreground/60 mt-1">Tracked events</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Engagement</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Features</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersLoading ? (
                    <div className="text-center py-8">Loading users...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-border/50">
                          <tr>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Email</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Joined</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersData?.users.map((u) => (
                            <tr key={u.id} className="border-b border-border/30 hover:bg-accent/5 transition-colors">
                              <td className="py-3 px-4 font-medium">{u.name || "Unknown"}</td>
                              <td className="py-3 px-4 text-foreground/70">{u.email || "-"}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  u.role === "admin" ? "bg-accent/20 text-accent" : "bg-foreground/10 text-foreground/70"
                                }`}>
                                  {u.role}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-foreground/70">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedUserId(u.id)}
                                  >
                                    View
                                  </Button>
                                  {u.role === "user" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleChangeRole(u.id, "admin")}
                                      disabled={changeRoleMutation.isPending}
                                    >
                                      Make Admin
                                    </Button>
                                  )}
                                  {u.role === "admin" && u.id !== user?.id && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleChangeRole(u.id, "user")}
                                      disabled={changeRoleMutation.isPending}
                                    >
                                      Remove Admin
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* User Details */}
            {selectedUserId && userDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                  <CardDescription>{userDetails.user.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-foreground/60">Page Views</p>
                      <p className="text-2xl font-bold">{userDetails.engagement?.totalPageViews || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Experiments</p>
                      <p className="text-2xl font-bold">{userDetails.engagement?.totalExperimentsStarted || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Paradoxes</p>
                      <p className="text-2xl font-bold">{userDetails.engagement?.totalParadoxesExplored || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Engagement Score</p>
                      <p className="text-2xl font-bold">{userDetails.engagement?.engagementScore || "0"}</p>
                    </div>
                  </div>

                  {userDetails.recentActivities && userDetails.recentActivities.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Recent Activities</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {userDetails.recentActivities.slice(0, 10).map((activity) => (
                          <div key={activity.id} className="text-sm p-2 bg-foreground/5 rounded">
                            <p className="font-medium">{activity.activityType}</p>
                            <p className="text-xs text-foreground/60">
                              {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Engaged Users</CardTitle>
                <CardDescription>Users with highest engagement scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topUsers?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-foreground/5 rounded">
                      <div>
                        <p className="font-medium">{item.user.name || "Unknown"}</p>
                        <p className="text-sm text-foreground/60">{item.engagement?.totalPageViews || 0} page views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{item.engagement?.engagementScore || "0"}</p>
                        <p className="text-xs text-foreground/60">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used features on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {featureUsage?.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between p-3 bg-foreground/5 rounded">
                      <div>
                        <p className="font-medium">{feature.featureName}</p>
                        <p className="text-sm text-foreground/60">{feature.uniqueUsers} unique users</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{feature.totalUsageCount}</p>
                        <p className="text-xs text-foreground/60">Uses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Admin Audit Log</CardTitle>
                  <CardDescription>Track all admin actions</CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExportAnalytics("json", "activities")}
                  disabled={exportMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {auditLogs?.logs.map((log) => (
                    <div key={log.id} className="p-3 bg-foreground/5 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-xs text-foreground/60">
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {log.details && (
                        <p className="text-xs text-foreground/60 mt-1">{log.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
