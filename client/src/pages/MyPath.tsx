import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Calendar,
  TrendingUp,
  Flame,
  Tag,
  Plus,
  X,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Eye,
  Book,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { getLoginUrl } from '@/const';
import { Streamdown } from 'streamdown';
import { InnerConstellation } from '@/components/InnerConstellation';
import { ShadowMirror } from '@/components/ShadowMirror';
import { StoryAlchemy } from '@/components/StoryAlchemy';

export default function MyPath() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [journalContent, setJournalContent] = useState('');
  const [journalTags, setJournalTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const { data: journalEntries, refetch: refetchJournal } = trpc.journal.getEntries.useQuery(
    { limit: 20 },
    { enabled: isAuthenticated }
  );

  const { data: conversations } = trpc.conversations.getAll.useQuery(
    { limit: 10 },
    { enabled: isAuthenticated }
  );

  const createEntry = trpc.journal.createEntry.useMutation({
    onSuccess: () => {
      setJournalContent('');
      setJournalTags([]);
      refetchJournal();
    },
  });

  const handleAddTag = () => {
    if (newTag && !journalTags.includes(newTag)) {
      setJournalTags([...journalTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setJournalTags(journalTags.filter(t => t !== tag));
  };

  const handleSaveEntry = () => {
    if (journalContent.trim()) {
      createEntry.mutate({
        type: 'reflection',
        content: journalContent,
        tags: journalTags.length > 0 ? journalTags : undefined,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
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

  // Calculate stats
  const totalJournalEntries = journalEntries?.length || 0;
  const savedConversations = conversations?.length || 0;
  const currentStreak = 7; // Placeholder

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
            <h1 className="text-2xl font-bold text-gradient-gold">My Path</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="text-gradient-violet">{user?.name || 'Seeker'}</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Continue your journey of wisdom and self-discovery.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalJournalEntries}</div>
                <div className="text-sm text-muted-foreground">Journal Entries</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <MessageCircle className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{savedConversations}</div>
                <div className="text-sm text-muted-foreground">Conversations</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Flame className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="journal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="constellation">Constellation</TabsTrigger>
            <TabsTrigger value="shadow-mirror">Shadow Mirror</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            {/* New Entry */}
            <Card className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-4">New Journal Entry</h3>
              
              <div className="space-y-4">
                <RichTextEditor
                  content={journalContent}
                  onChange={setJournalContent}
                  placeholder="Reflect on your insights, practices, and discoveries..."
                />

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (optional)</label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add a tag..."
                      className="flex-1"
                    />
                    <Button onClick={handleAddTag} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {journalTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {journalTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSaveEntry}
                  disabled={!journalContent.trim() || createEntry.isPending}
                  className="w-full"
                >
                  {createEntry.isPending ? 'Saving...' : 'Save Entry'}
                </Button>
              </div>
            </Card>

            {/* Past Entries */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Past Entries</h3>
              {journalEntries && journalEntries.length > 0 ? (
                journalEntries.map((entry: any) => (
                  <Card key={entry.id} className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      {entry.tags && (entry.tags as string[]).length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {(entry.tags as string[]).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <Streamdown>{entry.content}</Streamdown>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="glass-card p-12 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No journal entries yet. Start writing to capture your insights!
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Constellation Tab */}
          <TabsContent value="constellation" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Inner Constellation</h3>
              <p className="text-muted-foreground mb-6">
                A living map of your spiritual exploration. Watch your constellation grow as you engage with themes and teachers.
              </p>
            </div>
            <InnerConstellation />
          </TabsContent>

          {/* Shadow Mirror Tab */}
          <TabsContent value="shadow-mirror" className="space-y-6">
            <ShadowMirror />
          </TabsContent>

          {/* Story Alchemy Tab */}
          <TabsContent value="stories" className="space-y-6">
            <StoryAlchemy />
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-4">
            <h3 className="text-2xl font-bold">Saved Conversations</h3>
            {conversations && conversations.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {conversations.map((conversation: any) => (
                  <Link key={conversation.id} href={`/council?conversation=${conversation.id}`}>
                    <Card className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <MessageCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">
                            {conversation.mode === 'one_sage' ? 'One Sage' : 
                             conversation.mode === 'compare_two' ? 'Compare Two' : 'Full Council'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(conversation.createdAt).toLocaleDateString()}
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
                <p className="text-muted-foreground mb-4">
                  No saved conversations yet. Start a dialogue with the sages!
                </p>
                <Button asChild>
                  <Link href="/council">Enter the Council</Link>
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <h3 className="text-2xl font-bold">Your Growth Journey</h3>
            
            {/* Progress Visualization Placeholder */}
            <Card className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Growth Over Time</h4>
              <div className="h-64 flex items-center justify-center border border-border/50 rounded-lg bg-background/30">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Progress visualization</p>
                  <p className="text-sm mt-1">Track your journey completion and engagement</p>
                </div>
              </div>
            </Card>

            {/* Journeys */}
            <Card className="glass-card p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Start a guided journey to track your progress
              </p>
              <Button asChild>
                <Link href="/journeys">Explore Journeys</Link>
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
