import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Sparkles, Brain, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function ParadoxPlayground() {
  const { isAuthenticated } = useAuth();
  const [selectedParadox, setSelectedParadox] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: paradoxes, isLoading } = trpc.paradoxPlayground.getAll.useQuery();
  const { data: userReflections } = trpc.paradoxPlayground.getUserReflections.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const utils = trpc.useUtils();
  const submitReflection = trpc.paradoxPlayground.submitReflection.useMutation({
    onSuccess: () => {
      toast.success("Reflection submitted! AI insight generated.");
      setReflection("");
      setSubmitting(false);
      // Invalidate queries to refresh reflections
      utils.paradoxPlayground.getUserReflections.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to submit reflection. Please try again.");
      console.error(error);
      setSubmitting(false);
    },
  });

  const selectedParadoxData = paradoxes?.find(p => p.id === selectedParadox);
  const userReflectionForSelected = userReflections?.find(r => r.paradoxId === selectedParadox);

  const handleSubmitReflection = async () => {
    if (!selectedParadox || !reflection.trim()) {
      toast.error("Please write your reflection first");
      return;
    }
    
    setSubmitting(true);
    await submitReflection.mutateAsync({
      paradoxId: selectedParadox,
      userReflection: reflection,
    });
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
                <Brain className="w-6 h-6 text-accent" />
                <h1 className="text-xl font-bold text-gradient-gold">Paradox Playground</h1>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="max-w-md p-8 text-center">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Paradox Playground</h2>
            <p className="text-foreground/70 mb-6">
              Sign in to explore spiritual paradoxes and receive AI-guided reflections.
            </p>
            <Button asChild>
              <a href={getLoginUrl()}>Sign In to Continue</a>
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
              <Brain className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-gradient-gold">Paradox Playground</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">
              Explore Spiritual Paradoxes
            </h2>
            <p className="text-lg text-foreground/70">
              Wisdom traditions are full of paradoxes. Explore them, reflect on your experience, and receive AI-guided insights.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-foreground/60">Loading paradoxes...</p>
            </div>
          ) : paradoxes && paradoxes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {paradoxes.map((paradox) => {
                const hasReflection = userReflections?.some(r => r.paradoxId === paradox.id);
                
                return (
                  <Card
                    key={paradox.id}
                    className="p-6 cursor-pointer hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20"
                    onClick={() => setSelectedParadox(paradox.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {paradox.title}
                      </h3>
                      {hasReflection && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                          Reflected
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 mb-4 line-clamp-3">
                      {paradox.paradoxStatement}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedParadox(paradox.id);
                      }}
                    >
                      Explore Paradox
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Brain className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60">
                No paradoxes available yet. Check back soon!
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Paradox Detail Dialog */}
      <Dialog open={selectedParadox !== null} onOpenChange={() => setSelectedParadox(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto cosmic-bg">
          {selectedParadoxData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-gradient-gold">
                  {selectedParadoxData.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-lg font-medium mb-6">
                    {selectedParadoxData.paradoxStatement}
                  </p>
                </div>

                {selectedParadoxData.teacherPerspectives && selectedParadoxData.teacherPerspectives.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-foreground">Teacher Perspectives</h4>
                    {selectedParadoxData.teacherPerspectives.map((tp, idx) => (
                      <Card key={idx} className="p-4 bg-accent/5 border-accent/30">
                        <p className="text-sm text-foreground/70">
                          {tp.perspective}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}

                {!userReflectionForSelected ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Reflection
                      </label>
                      <Textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="How does this paradox show up in your life? Which side resonates more? What tension do you feel?"
                        rows={6}
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitReflection}
                      disabled={!reflection.trim() || submitting}
                      className="w-full"
                    >
                      {submitting ? "Submitting..." : "Submit Reflection & Get AI Insight"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Your Reflection</h4>
                      <Card className="p-4 bg-background/50">
                        <p className="text-foreground/80 whitespace-pre-wrap">
                          {userReflectionForSelected.userReflection}
                        </p>
                      </Card>
                    </div>
                    {userReflectionForSelected.aiResponse && (
                      <div>
                        <h4 className="font-bold text-accent mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          AI Insight
                        </h4>
                        <Card className="p-4 bg-accent/5 border-accent/30">
                          <Streamdown>{userReflectionForSelected.aiResponse}</Streamdown>
                        </Card>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
