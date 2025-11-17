import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";

export default function Journeys() {
  const { data: journeys, isLoading } = trpc.journeys.getAll.useQuery();

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
            <h1 className="text-2xl font-bold text-gradient-gold">Spiritual Journeys</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Guided <span className="text-gradient-violet">Spiritual Paths</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Embark on multi-day journeys designed to deepen your understanding and practice.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded" />
              </Card>
            ))}
          </div>
        ) : journeys && journeys.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeys.map((journey) => (
              <Link key={journey.id} href={`/journeys/${journey.id}`}>
                <Card className="glass-card p-6 cursor-pointer group h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-3">{journey.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-1">{journey.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/30 pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{journey.durationDays} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Beginner</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4 w-full group-hover:bg-primary/20 transition-colors"
                  >
                    Begin Journey
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass-card p-12 text-center">
            <p className="text-foreground/70">No journeys available yet. Check back soon!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
