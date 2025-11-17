import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, MessageSquare, BookOpen, Brain, Map } from "lucide-react";
import { APP_TITLE } from "@/const";

export function WelcomeModal() {
  const { state, markWelcomeComplete } = useOnboarding();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated || state.hasCompletedWelcome) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to {APP_TITLE}! ✨</DialogTitle>
          <DialogDescription className="text-base mt-4">
            Your journey into wisdom begins here. Let us show you around.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Deep Question of the Day</h4>
              <p className="text-sm text-muted-foreground">
                Explore profound questions at three depth levels: Safe, Real, and Raw
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Council Debates</h4>
              <p className="text-sm text-muted-foreground">
                Weekly provocative questions debated by 3-5 spiritual teachers
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">15-Minute Micro-Retreats</h4>
              <p className="text-sm text-muted-foreground">
                Guided multi-step experiences with breathing, reflection, and integration
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Map className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Inner Constellation</h4>
              <p className="text-sm text-muted-foreground">
                Visualize your spiritual journey as a dynamic map of themes and teachers
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Paradox Playground & Life Experiments</h4>
              <p className="text-sm text-muted-foreground">
                Explore spiritual paradoxes and try real-world behavioral experiments
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={markWelcomeComplete}>
            Begin Your Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
