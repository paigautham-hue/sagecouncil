import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Users,
  MessageCircle,
  TrendingUp,
  BookOpen,
  BarChart3,
  Activity,
  Search,
} from 'lucide-react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AdminAnalytics() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Analytics data would come from a dedicated endpoint
  const analytics = {
    totalUsers: 0,
    totalIdeas: 0,
    totalQuotes: 0,
    totalThemes: 0,
    activeJourneys: 0,
    totalJournalEntries: 0,
  };

  const { data: conversations } = trpc.conversations.getAll.useQuery(
    { limit: 50 },
    { enabled: isAdmin }
  );

  const { data: teachers } = trpc.teachers.getAll.useQuery();

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
        <Card className="glass-card p-12 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-muted-foreground mb-6">
            You need administrator privileges to access this page.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Calculate metrics
  const totalConversations = conversations?.length || 0;
  const totalMessages = conversations?.reduce((sum: number, conv: any) => sum + (conv.messageCount || 0), 0) || 0;
  const totalTeachers = teachers?.length || 0;

  // Popular teachers (simplified - count conversations)
  const teacherUsage = new Map<number, number>();
  conversations?.forEach((conv: any) => {
    if (conv.teacherIds) {
      (conv.teacherIds as number[]).forEach((id: number) => {
        teacherUsage.set(id, (teacherUsage.get(id) || 0) + 1);
      });
    }
  });

  const popularTeachers = Array.from(teacherUsage.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([teacherId, count]) => ({
      teacher: teachers?.find((t: any) => t.id === teacherId),
      count,
    }));

  // Mode distribution
  const modeDistribution = {
    one_sage: conversations?.filter((c: any) => c.mode === 'one_sage').length || 0,
    compare_two: conversations?.filter((c: any) => c.mode === 'compare_two').length || 0,
    full_council: conversations?.filter((c: any) => c.mode === 'full_council').length || 0,
  };

  // Filter conversations by search
  const filteredConversations = conversations?.filter((conv: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      conv.mode?.toLowerCase().includes(query) ||
      conv.id?.toString().includes(query)
    );
  });

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient-gold">Admin Analytics</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalConversations}</div>
                <div className="text-sm text-muted-foreground">Conversations</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Activity className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalMessages}</div>
                <div className="text-sm text-muted-foreground">Total Messages</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10">
                <BookOpen className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalTeachers}</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Users className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{analytics?.totalUsers || 0}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="modes">Modes</TabsTrigger>
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
          </TabsList>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Conversation Logs</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredConversations && filteredConversations.length > 0 ? (
                filteredConversations.map((conv: any) => (
                  <Card key={conv.id} className="glass-card p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          Conversation #{conv.id} - {conv.mode?.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(conv.createdAt).toLocaleString()} • {conv.messageCount || 0} messages
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/council?conversation=${conv.id}`}>View</Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="glass-card p-12 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No conversations found</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-4">
            <h3 className="text-2xl font-bold">Popular Teachers</h3>
            <div className="space-y-2">
              {popularTeachers.length > 0 ? (
                popularTeachers.map(({ teacher, count }, index) => (
                  <Card key={teacher?.id || index} className="glass-card p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                        <div>
                          <div className="font-semibold">{teacher?.fullName || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">
                            {teacher?.traditionTags?.[0] || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{count}</div>
                        <div className="text-sm text-muted-foreground">conversations</div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="glass-card p-12 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No usage data yet</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Modes Tab */}
          <TabsContent value="modes" className="space-y-4">
            <h3 className="text-2xl font-bold">Mode Distribution</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass-card p-6">
                <h4 className="font-semibold mb-2">One Sage</h4>
                <div className="text-3xl font-bold text-primary mb-2">{modeDistribution.one_sage}</div>
                <div className="text-sm text-muted-foreground">
                  {totalConversations > 0 
                    ? `${Math.round((modeDistribution.one_sage / totalConversations) * 100)}%`
                    : '0%'}
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h4 className="font-semibold mb-2">Compare Two</h4>
                <div className="text-3xl font-bold text-violet-400 mb-2">{modeDistribution.compare_two}</div>
                <div className="text-sm text-muted-foreground">
                  {totalConversations > 0 
                    ? `${Math.round((modeDistribution.compare_two / totalConversations) * 100)}%`
                    : '0%'}
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h4 className="font-semibold mb-2">Full Council</h4>
                <div className="text-3xl font-bold text-teal-400 mb-2">{modeDistribution.full_council}</div>
                <div className="text-sm text-muted-foreground">
                  {totalConversations > 0 
                    ? `${Math.round((modeDistribution.full_council / totalConversations) * 100)}%`
                    : '0%'}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Coverage Tab */}
          <TabsContent value="coverage" className="space-y-4">
            <h3 className="text-2xl font-bold">Knowledge Coverage</h3>
            <Card className="glass-card p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Content Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Teachers</span>
                      <span className="font-semibold">{totalTeachers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Key Ideas</span>
                      <span className="font-semibold">{analytics?.totalIdeas || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quotes</span>
                      <span className="font-semibold">{analytics?.totalQuotes || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Themes</span>
                      <span className="font-semibold">{analytics?.totalThemes || 0}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Engagement Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Messages/Conversation</span>
                      <span className="font-semibold">
                        {totalConversations > 0 
                          ? Math.round(totalMessages / totalConversations)
                          : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Journeys</span>
                      <span className="font-semibold">{analytics?.activeJourneys || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Journal Entries</span>
                      <span className="font-semibold">{analytics?.totalJournalEntries || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h4 className="font-semibold mb-4">Teacher Coverage</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Teachers with zero conversations may need more prominent placement or better descriptions.
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {teachers?.map((teacher: any) => {
                  const usage = teacherUsage.get(teacher.id) || 0;
                  return (
                    <div key={teacher.id} className="flex justify-between items-center p-2 rounded bg-background/30">
                      <span className="text-sm">{teacher.fullName}</span>
                      <span className={`text-sm font-semibold ${usage === 0 ? 'text-destructive' : 'text-primary'}`}>
                        {usage} uses
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
