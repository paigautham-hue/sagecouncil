import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Users, BookOpen, Quote, Map } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminConsole() {
  const { user, isAuthenticated } = useAuth();

  const { data: teachers } = trpc.teachers.getAll.useQuery();
  const { data: journeys } = trpc.journeys.getAll.useQuery();
  const { data: quotes } = trpc.quotes.getAll.useQuery();

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <Card className="glass-card p-12 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-foreground/70 mb-6">
            This page is only accessible to administrators.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
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
            <h1 className="text-2xl font-bold text-gradient-gold">Admin Console</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Content <span className="text-gradient-violet">Management</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Manage teachers, journeys, and content for the Council of Sages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6">
            <Users className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-3xl font-bold mb-1">{teachers?.length || 0}</h3>
            <p className="text-sm text-muted-foreground">Teachers</p>
          </Card>
          
          <Card className="glass-card p-6">
            <Map className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-3xl font-bold mb-1">{journeys?.length || 0}</h3>
            <p className="text-sm text-muted-foreground">Journeys</p>
          </Card>
          
          <Card className="glass-card p-6">
            <Quote className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-3xl font-bold mb-1">{quotes?.length || 0}</h3>
            <p className="text-sm text-muted-foreground">Quotes</p>
          </Card>
          
          <Card className="glass-card p-6">
            <BookOpen className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-3xl font-bold mb-1">412</h3>
            <p className="text-sm text-muted-foreground">Key Ideas</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Teachers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Map className="w-4 h-4 mr-2" />
                Create Journey
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Quote className="w-4 h-4 mr-2" />
                Add Quotes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Update Content
              </Button>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">Data Import</h3>
            <p className="text-foreground/70 mb-4">
              To update the training dataset, replace the JSON file in the project directory and run the import script.
            </p>
            <code className="block bg-muted/30 p-3 rounded text-sm mb-4">
              pnpm tsx scripts/import-training-data.mjs
            </code>
            <p className="text-sm text-muted-foreground">
              The system will automatically process new teachers, quotes, and teachings.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
