import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FlaskConical, MessageSquare, BookOpen, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      setLocation('/');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage content, view analytics, and configure the Council of Sages
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="debates">Council Debates</TabsTrigger>
            <TabsTrigger value="questions">Deep Questions</TabsTrigger>
            <TabsTrigger value="retreats">Micro-Retreats</TabsTrigger>
            <TabsTrigger value="paradoxes">Paradoxes</TabsTrigger>
            <TabsTrigger value="experiments">Life Experiments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Council Debates</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    Active provocative discussions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Deep Questions</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">36</div>
                  <p className="text-xs text-muted-foreground">
                    Questions across all themes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Micro-Retreats</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Guided 15-minute experiences
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paradoxes</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Spiritual paradoxes to explore
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Life Experiments</CardTitle>
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    Real-world practices to try
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Create New Council Debate
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Add Deep Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Create Micro-Retreat
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Debates Tab */}
          <TabsContent value="debates" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Council Debates</h2>
                <p className="text-muted-foreground">Manage weekly provocative discussions</p>
              </div>
              <Button>Create New Debate</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Debate management interface coming soon. For now, use seed scripts to add debates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Deep Questions</h2>
                <p className="text-muted-foreground">Manage daily deep questions library</p>
              </div>
              <Button>Add New Question</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Question management interface coming soon. For now, use seed scripts to add questions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Retreats Tab */}
          <TabsContent value="retreats" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Micro-Retreats</h2>
                <p className="text-muted-foreground">Manage 15-minute guided experiences</p>
              </div>
              <Button>Create New Retreat</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Retreat builder interface coming soon. For now, use seed scripts to add retreats.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paradoxes Tab */}
          <TabsContent value="paradoxes" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Paradoxes</h2>
                <p className="text-muted-foreground">Manage spiritual paradoxes</p>
              </div>
              <Button>Add New Paradox</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Paradox management interface coming soon. For now, use seed scripts to add paradoxes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Life Experiments</h2>
                <p className="text-muted-foreground">Manage real-world behavioral experiments</p>
              </div>
              <Button>Create New Experiment</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Experiment management interface coming soon. For now, use seed scripts to add experiments.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
