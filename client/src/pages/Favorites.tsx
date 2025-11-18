import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getSagePortrait } from "@/lib/sagePortraits";
import { ProgressiveImage } from "@/components/ProgressiveImage";

export default function Favorites() {
  const { isAuthenticated, loading } = useAuth();
  const { data: favorites, isLoading } = trpc.favorites.getAll.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Favorite Sages</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to save your favorite sages and access them quickly anytime.
          </p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>
              <Sparkles className="w-5 h-5 mr-2" />
              Sign In
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Sparkles className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-bold text-gradient-gold">{APP_TITLE}</h1>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-10 h-10 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold">Your Favorite Sages</h1>
          </div>

          {!favorites || favorites.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring and save your favorite sages to access them quickly here.
              </p>
              <Link href="/sages">
                <Button size="lg">
                  Explore Sages
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((favorite) => {
                const teacher = favorite.teacher;
                if (!teacher) return null;

                return (
                  <Link key={favorite.id} href={`/sages/${teacher.teacherId}`}>
                    <div className="glass-card p-6 rounded-xl cursor-pointer group hover:border-red-500/50 transition-all">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-red-500/50 shadow-lg shadow-red-500/30 overflow-hidden bg-slate-900/50">
                          <ProgressiveImage
                            src={getSagePortrait(teacher.fullName)}
                            alt={teacher.fullName}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-background">
                          <Heart className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-center mb-1 line-clamp-2">
                        {teacher.fullName}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center line-clamp-1">
                        {teacher.era || "Ancient"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
