import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, MessageCircle, TrendingUp, Calendar } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function MyPath() {
  const { user, isAuthenticated } = useAuth();

  const { data: conversations } = trpc.conversations.getAll.useQuery(
    { limit: 10 },
    { enabled: isAuthenticated }
  );

  // Disable journey progress for now - would need user-specific query
  const journeyProgress: any[] = [];

  const { data: journalEntries } = trpc.journal.getEntries.useQuery(
    { limit: 10 },
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <Card className="glass-card p-12 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Sign In Required</h2>
          <p className="text-foreground/70 mb-6">
            Create an account to track your spiritual journey, save conversations, and access personalized insights.
          </p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient-gold">My Path</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="text-gradient-violet">{user?.name || 'Seeker'}</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Continue your journey of wisdom and self-discovery.
          </p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="journeys">Journeys</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="space-y-6">
            {conversations && conversations.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {conversations.map((conv: any) => (
                  <Link key={conv.id} href={`/council?conversation=${conv.id}`}>
                    <Card className="glass-card p-6 cursor-pointer group">
                      <div className="flex items-start gap-3 mb-3">
                        <MessageCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">
                            {conv.mode === 'one_sage' ? 'One Sage' : 
                             conv.mode === 'compare_two' ? 'Compare Two' : 'Full Council'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(conv.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground/70 mb-4">No conversations yet</p>
                <Link href="/council">
                  <Button>Start Your First Conversation</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="journeys" className="space-y-6">
            {journeyProgress.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {journeyProgress.map((progress: any) => (
                  <Link key={progress.id} href={`/journeys/${progress.journeyId}`}>
                    <Card className="glass-card p-6 cursor-pointer group">
                      <div className="flex items-start gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">Journey Progress</h4>
                          <p className="text-sm text-muted-foreground">
                            Day {progress.currentDay}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${(progress.currentDay / 30) * 100}%` }}
                        />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground/70 mb-4">No active journeys</p>
                <Link href="/journeys">
                  <Button>Explore Journeys</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            {journalEntries && journalEntries.length > 0 ? (
              <div className="space-y-4">
                {journalEntries.map((entry: any) => (
                  <Card key={entry.id} className="glass-card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-foreground/80">{entry.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground/70">No journal entries yet</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
