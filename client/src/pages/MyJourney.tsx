import React, { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Flame,
  Award,
  TrendingUp,
  BookOpen,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface ExperimentProgress {
  id: number;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  daysCompleted: number;
  totalDays: number;
  theme: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: string;
}

interface StreakData {
  type: string;
  current: number;
  longest: number;
}

interface UserStats {
  totalParadoxesExplored: number;
  totalExperimentsStarted: number;
  totalExperimentsCompleted: number;
  totalRetreatsCompleted: number;
  totalInsightsGenerated: number;
  totalAchievementsEarned: number;
  favoriteTheme?: string;
}

export default function MyJourney() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in production, these would come from tRPC queries
  const stats: UserStats = {
    totalParadoxesExplored: 12,
    totalExperimentsStarted: 5,
    totalExperimentsCompleted: 3,
    totalRetreatsCompleted: 8,
    totalInsightsGenerated: 24,
    totalAchievementsEarned: 6,
    favoriteTheme: 'Presence & Awareness',
  };

  const experiments: ExperimentProgress[] = [
    {
      id: 1,
      title: 'The Silence Experiment',
      status: 'completed',
      daysCompleted: 7,
      totalDays: 7,
      theme: 'Presence & Awareness',
    },
    {
      id: 2,
      title: 'Loving-Kindness Practice',
      status: 'in_progress',
      daysCompleted: 3,
      totalDays: 10,
      theme: 'Relationships',
    },
    {
      id: 3,
      title: 'Mortality Contemplation',
      status: 'not_started',
      daysCompleted: 0,
      totalDays: 5,
      theme: 'Death & Impermanence',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 'first_paradox',
      title: 'Paradox Explorer',
      description: 'Explored your first paradox',
      icon: '🎭',
      earnedAt: '2025-11-15',
      category: 'exploration',
    },
    {
      id: 'week_streak',
      title: 'Consistent Seeker',
      description: '7-day exploration streak',
      icon: '🔥',
      earnedAt: '2025-11-18',
      category: 'consistency',
    },
    {
      id: 'depth_explorer',
      title: 'Depth Seeker',
      description: 'Completed 3 experiments',
      icon: '🌊',
      earnedAt: '2025-11-19',
      category: 'depth',
    },
    {
      id: 'retreat_master',
      title: 'Retreat Master',
      description: 'Completed 5 micro-retreats',
      icon: '🧘',
      earnedAt: '2025-11-18',
      category: 'growth',
    },
    {
      id: 'insight_seeker',
      title: 'Insight Seeker',
      description: 'Generated 20 AI insights',
      icon: '💡',
      earnedAt: '2025-11-17',
      category: 'exploration',
    },
    {
      id: 'wisdom_collector',
      title: 'Wisdom Collector',
      description: 'Saved 10 insights to journal',
      icon: '📚',
      earnedAt: '2025-11-16',
      category: 'community',
    },
  ];

  const streaks: StreakData[] = [
    { type: 'Daily Questions', current: 7, longest: 14 },
    { type: 'Experiments', current: 3, longest: 10 },
    { type: 'Paradox Exploration', current: 5, longest: 12 },
    { type: 'Retreats', current: 2, longest: 8 },
  ];

  const progressData = [
    { name: 'Paradoxes', value: stats.totalParadoxesExplored, fill: '#f59e0b' },
    { name: 'Experiments', value: stats.totalExperimentsCompleted, fill: '#8b5cf6' },
    { name: 'Retreats', value: stats.totalRetreatsCompleted, fill: '#06b6d4' },
  ];

  const growthData = [
    { week: 'Week 1', insights: 2, experiments: 0, retreats: 1 },
    { week: 'Week 2', insights: 5, experiments: 1, retreats: 2 },
    { week: 'Week 3', insights: 8, experiments: 2, retreats: 3 },
    { week: 'Week 4', insights: 9, experiments: 2, retreats: 2 },
  ];

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Please log in to view your journey</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Spiritual Journey</h1>
          <p className="text-muted-foreground mt-2">
            Track your growth and celebrate your progress on the path of wisdom
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paradoxes Explored</CardTitle>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalParadoxesExplored}</div>
              <p className="text-xs text-muted-foreground">Deep explorations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experiments</CardTitle>
              <Zap className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalExperimentsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalExperimentsStarted} started
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retreats</CardTitle>
              <Target className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRetreatsCompleted}</div>
              <p className="text-xs text-muted-foreground">Completed sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAchievementsEarned}</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Over Time</CardTitle>
                  <CardDescription>Your spiritual practice metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="insights"
                        stroke="#f59e0b"
                        name="Insights"
                      />
                      <Line
                        type="monotone"
                        dataKey="experiments"
                        stroke="#8b5cf6"
                        name="Experiments"
                      />
                      <Line
                        type="monotone"
                        dataKey="retreats"
                        stroke="#06b6d4"
                        name="Retreats"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Activity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Distribution</CardTitle>
                  <CardDescription>Your engagement breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={progressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {progressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Focus Area */}
            <Card>
              <CardHeader>
                <CardTitle>Your Current Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Favorite Theme</span>
                    <Badge variant="secondary">{stats.favoriteTheme}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Continue exploring this theme to deepen your understanding
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-4">
            {experiments.map((exp) => (
              <Card key={exp.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <CardDescription>{exp.theme}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        exp.status === 'completed'
                          ? 'default'
                          : exp.status === 'in_progress'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {exp.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {exp.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
                      {exp.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="text-muted-foreground">
                        {exp.daysCompleted} / {exp.totalDays} days
                      </span>
                    </div>
                    <Progress
                      value={(exp.daysCompleted / exp.totalDays) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">{achievement.icon}</div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-sm">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Streaks Tab */}
          <TabsContent value="streaks" className="space-y-4">
            {streaks.map((streak, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{streak.type}</CardTitle>
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                      <p className="text-2xl font-bold">{streak.current}</p>
                      <p className="text-xs text-muted-foreground">days</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Longest Streak</p>
                      <p className="text-2xl font-bold">{streak.longest}</p>
                      <p className="text-xs text-muted-foreground">days</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Consistency</span>
                      <span className="text-muted-foreground">
                        {Math.round((streak.current / streak.longest) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(streak.current / streak.longest) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
