import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useLoginUrl } from "@/hooks/useLoginUrl";
import { Link, useLocation } from "wouter";
import { Sparkles, Users, BookOpen, Compass, ArrowRight, Menu, Brain, ChevronDown, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { LazySection } from "@/components/LazySection";
import { ThemeCards } from "@/components/ThemeCards";
import { TodaysDeepDrop } from "@/components/TodaysDeepDrop";
import wisdomTreeImage from "../../../client/public/wisdom-tree-20251118-v2.png?url";

/**
 * Logout Button Component
 */
function LogoutButton() {
  const [, navigate] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="text-foreground/80 hover:text-foreground"
    >
      <LogOut className="w-4 h-4 mr-2" />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}

/**
 * Home Page - Rebuilt from scratch 2025-11-18
 * Clean structure with direct static Wisdom Tree image
 * No complex component nesting, no conditional rendering of tree
 * Simple, straightforward layout for all devices
 */
export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: randomQuote } = trpc.quotes.getRandom.useQuery();
  const { loginUrl } = useLoginUrl();

  return (
    <div className="min-h-screen cosmic-bg">
      <ScrollProgressIndicator />

      {/* Navigation Bar */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <Sparkles className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-bold text-gradient-gold">{APP_TITLE}</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="https://soulprint.manus.space" className="text-foreground/80 hover:text-foreground transition-colors">
                ← SoulPrint
              </a>
              <Link href="/council" className="text-foreground/80 hover:text-foreground transition-colors">
                Council
              </Link>
              <Link href="/sages" className="text-foreground/80 hover:text-foreground transition-colors">
                Sages
              </Link>
              <Link href="/journeys" className="text-foreground/80 hover:text-foreground transition-colors">
                Journeys
              </Link>
              <Link href="/micro-retreats" className="text-foreground/80 hover:text-foreground transition-colors">
                Retreats
              </Link>
              <Link href="/paradox-playground" className="text-foreground/80 hover:text-foreground transition-colors">
                Paradoxes
              </Link>
              <Link href="/life-experiments" className="text-foreground/80 hover:text-foreground transition-colors">
                Experiments
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/my-path" className="text-foreground/80 hover:text-foreground transition-colors">
                    My Path
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="text-accent hover:text-accent/80 transition-colors font-semibold">
                      Admin Panel
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu & Auth Buttons */}
            <div className="flex items-center gap-4">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-4 mt-8">
                    <a href="https://soulprint.manus.space" className="text-foreground/80 hover:text-foreground transition-colors">
                      ← SoulPrint
                    </a>
                    <Link href="/council" className="text-foreground/80 hover:text-foreground transition-colors">
                      Council
                    </Link>
                    <Link href="/sages" className="text-foreground/80 hover:text-foreground transition-colors">
                      Sages
                    </Link>
                    <Link href="/journeys" className="text-foreground/80 hover:text-foreground transition-colors">
                      Journeys
                    </Link>
                    <Link href="/micro-retreats" className="text-foreground/80 hover:text-foreground transition-colors">
                      Retreats
                    </Link>
                    <Link href="/paradox-playground" className="text-foreground/80 hover:text-foreground transition-colors">
                      Paradoxes
                    </Link>
                    <Link href="/life-experiments" className="text-foreground/80 hover:text-foreground transition-colors">
                      Experiments
                    </Link>
                    {isAuthenticated && (
                      <>
                        <Link href="/my-path" className="text-foreground/80 hover:text-foreground transition-colors">
                          My Path
                        </Link>
                        <div className="border-t border-border/30 pt-4 mt-4">
                          {user?.role === "admin" && (
                            <Link href="/admin" className="text-accent hover:text-accent/80 transition-colors font-semibold block mb-2">
                              Admin Panel
                            </Link>
                          )}
                          <LogoutButton />
                        </div>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    {user?.role === "admin" && (
                      <Link href="/admin">
                        <Button variant="outline" size="sm" className="text-accent border-accent/50 hover:border-accent">
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <LogoutButton />
                  </>
                ) : (
                  <a href={loginUrl}>
                    <Button className="bg-accent hover:bg-accent/90">Sign In</Button>
                  </a>
                )}
              </div>

              {/* Mobile Auth Buttons (visible only on mobile when not in menu) */}
              <div className="md:hidden">
                {!isAuthenticated && (
                  <a href={loginUrl}>
                    <Button className="bg-accent hover:bg-accent/90" size="sm">Sign In</Button>
                  </a>
                )}
              </div>
            </div>        </div>
        </div>
      </nav>

      {/* Hero Section with Wisdom Tree */}
      <section className="relative overflow-hidden py-12 md:py-24">
        <div className="container mx-auto px-4">
          {/* Hero Text */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-gold">
              Seek Wisdom from the<br />
              <span className="text-gradient-purple">Council of Sages</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Engage in dialogue with history's greatest spiritual teachers. Compare perspectives, explore practices, and discover your path.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/council">
                <Button size="lg" className="bg-accent hover:bg-accent/90 w-full md:w-auto">
                  <Users className="w-5 h-5 mr-2" />
                  Enter the Council
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sages">
                <Button size="lg" variant="outline" className="w-full md:w-auto">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Sages
                </Button>
              </Link>
            </div>
          </div>

          {/* Wisdom Tree Static Image - Direct and Simple */}
          <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
            <img
              src={wisdomTreeImage}
              alt="The Council of Sages - Wisdom Tree with 19 Sage Portraits"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Scroll Hint */}
          <div className="flex flex-col items-center mt-8 md:mt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 text-accent/60" />
            <p className="text-sm text-accent/60 mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* Today's Deep Drop - Only for authenticated users */}
      {isAuthenticated && (
        <LazySection>
          <TodaysDeepDrop />
        </LazySection>
      )}

      {/* Theme Cards Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold">
            Pick Your <span className="text-gradient-purple">Focus</span> Today
          </h2>
          <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            Explore timeless wisdom on life's essential questions. Each theme offers synthesis from multiple teachers, practices, and pathways for deeper understanding.
          </p>
          <ThemeCards />
        </div>
      </section>

      {/* Three Ways to Explore Section */}
      <LazySection>
        <section className="py-20 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold">
              Three Ways to <span className="text-gradient-purple">Explore</span> Wisdom
            </h2>
            <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
              Choose your path into the Council's wisdom
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* One Sage */}
              <Link href="/council?mode=one-sage">
                <div className="group cursor-pointer h-full">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-violet-500/30 rounded-xl p-8 hover:border-violet-500/60 transition-all duration-300 h-full">
                    <Brain className="w-12 h-12 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">One Sage</h3>
                    <p className="text-foreground/70">Dive deep into conversation with a single teacher. Explore their unique perspective and practices.</p>
                  </div>
                </div>
              </Link>

              {/* Compare Two */}
              <Link href="/council?mode=compare">
                <div className="group cursor-pointer h-full">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-teal-500/30 rounded-xl p-8 hover:border-teal-500/60 transition-all duration-300 h-full">
                    <Compass className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Compare Two</h3>
                    <p className="text-foreground/70">See how two teachers approach the same question. Discover convergences and unique insights.</p>
                  </div>
                </div>
              </Link>

              {/* Full Council */}
              <Link href="/council?mode=full-council">
                <div className="group cursor-pointer h-full">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-amber-500/30 rounded-xl p-8 hover:border-amber-500/60 transition-all duration-300 h-full">
                    <Users className="w-12 h-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Full Council</h3>
                    <p className="text-foreground/70">Hear from all 19 teachers on a single question. Experience the full spectrum of wisdom traditions.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 md:py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-gradient-gold mb-4">Council of Sages</h3>
              <p className="text-foreground/70 text-sm">Wisdom from history's greatest spiritual teachers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/council" className="text-foreground/70 hover:text-foreground transition-colors">Council</Link></li>
                <li><Link href="/sages" className="text-foreground/70 hover:text-foreground transition-colors">Sages</Link></li>
                <li><Link href="/journeys" className="text-foreground/70 hover:text-foreground transition-colors">Journeys</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/micro-retreats" className="text-foreground/70 hover:text-foreground transition-colors">Retreats</Link></li>
                <li><Link href="/paradox-playground" className="text-foreground/70 hover:text-foreground transition-colors">Paradoxes</Link></li>
                <li><Link href="/life-experiments" className="text-foreground/70 hover:text-foreground transition-colors">Experiments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/safety" className="text-foreground/70 hover:text-foreground transition-colors">Safety</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 text-center text-foreground/60 text-sm">
            <p>&copy; 2025 Council of Sages. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
