import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLoginUrl } from "@/hooks/useLoginUrl";
import { trpc } from "@/lib/trpc";
import { Sparkles, FlaskConical, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function LifeExperiments() {
  const { isAuthenticated } = useAuth();
  const { loginUrl } = useLoginUrl();

  const { data: experiments, isLoading } = trpc.lifeExperiments.getAll.useQuery();
  const { data: userLogs } = trpc.lifeExperiments.getUserLogs.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const utils = trpc.useUtils();
  const startExperiment = trpc.lifeExperiments.startExperiment.useMutation({
    onSuccess: () => {
      toast.success("Experiment started! Track your progress daily.");
      // Invalidate queries to refresh the UI
      utils.lifeExperiments.getUserLogs.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to start experiment. Please try again.");
      console.error(error);
    },
  });

  const handleStartExperiment = async (experimentId: number) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to start experiments");
      window.location.href = loginUrl;
      return;
    }
    
    await startExperiment.mutateAsync({ experimentId });
  };

  const getExperimentStatus = (experimentId: number) => {
    const log = userLogs?.find(l => l.experimentId === experimentId);
    if (!log) return null;
    return log.status;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen cosmic-bg">
        <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <FlaskConical className="w-6 h-6 text-accent" />
                <h1 className="text-xl font-bold text-gradient-gold">Life Experiments</h1>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="max-w-md p-8 text-center">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Life Experiments</h2>
            <p className="text-foreground/70 mb-6">
              Sign in to start real-world behavioral experiments and track your growth.
            </p>
            <Button asChild>
              <a href={loginUrl}>Sign In to Continue</a>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-gradient-gold">Life Experiments</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">
              Real-World Behavioral Experiments
            </h2>
            <p className="text-lg text-foreground/70">
              Turn wisdom into action. Start small experiments, track your progress, and discover what works for you.
            </p>
          </div>

          {/* Active Experiments */}
          {userLogs && userLogs.filter(l => l.status === 'active').length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-accent" />
                Your Active Experiments
              </h3>
              <div className="grid gap-4">
                {userLogs.filter(l => l.status === 'active').map((log) => {
                  const experiment = experiments?.find(e => e.id === log.experimentId);
                  if (!experiment) return null;

                  return (
                    <Card key={log.id} className="p-6 border-accent/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{experiment.title}</h4>
                          <p className="text-sm text-foreground/60 mb-3">
                            Started: {new Date(log.startDate).toLocaleDateString()}
                          </p>
                          <p className="text-foreground/70">{experiment.description}</p>
                        </div>
                        <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Experiments */}
          {userLogs && userLogs.filter(l => l.status === 'completed').length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Completed Experiments
              </h3>
              <div className="grid gap-4">
                {userLogs.filter(l => l.status === 'completed').map((log) => {
                  const experiment = experiments?.find(e => e.id === log.experimentId);
                  if (!experiment) return null;

                  return (
                    <Card key={log.id} className="p-6 border-green-500/30 bg-green-500/5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{experiment.title}</h4>
                          <p className="text-sm text-foreground/60">
                            Completed: {log.endDate ? new Date(log.endDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Experiments */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Available Experiments</h3>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 text-foreground/60">Loading experiments...</p>
              </div>
            ) : experiments && experiments.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {experiments.map((experiment) => {
                  const status = getExperimentStatus(experiment.id);
                  const isStarted = status !== null;

                  return (
                    <Card
                      key={experiment.id}
                      className="p-6 hover:border-accent/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold">{experiment.title}</h4>
                        {isStarted && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            status === 'active' 
                              ? 'bg-accent/20 text-accent' 
                              : 'bg-green-500/20 text-green-500'
                          }`}>
                            {status === 'active' ? 'Active' : 'Completed'}
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 mb-4">
                        {experiment.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{experiment.duration} days</span>
                      </div>
                      {!isStarted && (
                        <Button
                          onClick={() => handleStartExperiment(experiment.id)}
                          disabled={startExperiment.isPending}
                          className="w-full"
                        >
                          {startExperiment.isPending ? "Starting..." : "Start Experiment"}
                        </Button>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <FlaskConical className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60">
                  No experiments available yet. Check back soon!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
