import { useParams, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Circle, Lock } from "lucide-react";
import { Streamdown } from "streamdown";
import { getLoginUrl } from "@/const";

export default function JourneyDetail() {
  const { journeyId } = useParams();
  const { isAuthenticated } = useAuth();
  
  const { data: journey, isLoading } = trpc.journeys.getById.useQuery(
    { id: Number(journeyId) },
    { enabled: !!journeyId }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <p className="text-foreground/70">Loading journey...</p>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Journey Not Found</h2>
          <Link href="/journeys">
            <Button>Browse Journeys</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/journeys">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            {!isAuthenticated && (
              <Button asChild>
                <a href={getLoginUrl()}>Sign In to Start</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{journey.title}</h1>
            <p className="text-xl text-foreground/70">{journey.description}</p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span>{journey.durationDays} days</span>
              <span>•</span>
              <span>Beginner</span>
            </div>
          </div>

          <Card className="glass-card p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <Streamdown>{journey.description || "Begin your spiritual journey."}</Streamdown>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Daily Path</h3>
            {[...Array(journey.durationDays)].map((_, idx) => {
              const dayNum = idx + 1;
              const isLocked = !isAuthenticated;
              
              return (
                <Card key={dayNum} className={`glass-card p-6 ${isLocked ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-1">Day {dayNum}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isLocked ? "Sign in to unlock" : "Ready to explore"}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
