import { useAuth } from "@/_core/hooks/useAuth";
import { MicroRetreatsLibrary } from "@/components/MicroRetreatsLibrary";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Sparkles } from "lucide-react";

export default function MicroRetreats() {
  const { isAuthenticated, loading } = useAuth();

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
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-indigo-500/20">
              <Sparkles className="w-12 h-12 text-indigo-400" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-serif text-indigo-100 mb-3">
              15-Minute Micro-Retreats
            </h2>
            <p className="text-indigo-300/70">
              Sign in to access guided experiences for presence, reflection, and integration.
            </p>
          </div>
          <Button
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          >
            Sign In to Begin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-indigo-500/20">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-indigo">15-Minute</span> Micro-Retreats
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Guided experiences to pause, breathe, and reconnect with what matters most.
            Each retreat offers a complete arc: grounding, exploration, and integration.
          </p>
        </div>

        {/* Retreats Library */}
        <MicroRetreatsLibrary />
      </section>
    </div>
  );
}
