import { useAuth } from "@/_core/hooks/useAuth";
import { MicroRetreatsLibrary } from "@/components/MicroRetreatsLibrary";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

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
                <Sparkles className="w-6 h-6 text-accent" />
                <h1 className="text-xl font-bold text-gradient-gold">Micro-Retreats</h1>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Navigation */}
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
              <Sparkles className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-gradient-gold">Micro-Retreats</h1>
            </div>
          </div>
        </div>
      </nav>
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
