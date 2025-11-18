import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Sparkles, Users, BookOpen, Compass, ArrowRight, Menu, X, Brain, FlaskConical, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { TemplePortal } from "@/components/TemplePortal";
import WisdomTree from "@/components/WisdomTree";
import { TodaysDeepDrop } from "@/components/TodaysDeepDrop";
import { DeepQuestionOfTheDay } from "@/components/DeepQuestionOfTheDay";
import { CouncilDebate } from "@/components/CouncilDebate";
import { ThemeCards } from "@/components/ThemeCards";
import { getSagePortrait } from "@/lib/sagePortraits";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { LazySection } from "@/components/LazySection";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [quote, setQuote] = useState<{ text: string; teacher: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: randomQuote } = trpc.quotes.getRandom.useQuery();
  const { data: teachers } = trpc.teachers.getAll.useQuery();

  useEffect(() => {
    if (randomQuote) {
      // We'll need to fetch the teacher name separately
      setQuote({
        text: randomQuote.text,
        teacher: "Ancient Wisdom"
      });
    }
  }, [randomQuote]);

  return (
    <div className="min-h-screen cosmic-bg">
      <ScrollProgressIndicator />
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
            
            <div className="hidden md:flex items-center gap-6">
              <a href="https://soulprint.manus.space" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                <span>←</span> SoulPrint
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
                <Link href="/my-path" className="text-foreground/80 hover:text-foreground transition-colors">
                  My Path
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 cosmic-bg border-border/50">
                <div className="flex flex-col gap-4 mt-8">
                  <a href="https://soulprint.manus.space">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      SoulPrint
                    </Button>
                  </a>
                  <Link href="/council">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Users className="w-4 h-4 mr-2" />
                      Council
                    </Button>
                  </Link>
                  <Link href="/sages">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Sages
                    </Button>
                  </Link>
                  <Link href="/journeys">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Compass className="w-4 h-4 mr-2" />
                      Journeys
                    </Button>
                  </Link>
                  <Link href="/micro-retreats">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Retreats
                    </Button>
                  </Link>
                  <Link href="/paradox-playground">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Brain className="w-4 h-4 mr-2" />
                      Paradoxes
                    </Button>
                  </Link>
                  <Link href="/life-experiments">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <FlaskConical className="w-4 h-4 mr-2" />
                      Experiments
                    </Button>
                  </Link>
                  {isAuthenticated && (
                    <Link href="/my-path">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        My Path
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <div>
              {isAuthenticated ? (
                <Link href="/my-path">
                  <Button variant="default" className="ripple">
                    <Compass className="w-4 h-4 mr-2" />
                    My Path
                  </Button>
                </Link>
              ) : (
                <Button asChild variant="default" className="ripple">
                  <a href={getLoginUrl()}>Sign In</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Wisdom Tree */}
      <section className="relative overflow-hidden pb-8">
        {/* Hero Content - Positioned above tree */}
        <div className="relative z-10 container mx-auto px-4 pt-0 md:pt-8 pb-0 md:pb-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-bold mb-2 md:mb-6 leading-[1.1] drop-shadow-2xl min-h-[60px] md:min-h-[120px] flex flex-col items-center justify-center">
              <span className="block">Seek Wisdom from the</span>
              <span 
                className="block" 
                style={{
                  background: 'linear-gradient(to right, oklch(0.70 0.15 85), oklch(0.55 0.25 290), oklch(0.55 0.15 200))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Council of Sages
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-foreground/80 mb-2 md:mb-6 max-w-3xl mx-auto drop-shadow-lg">
              Engage in dialogue with history's greatest spiritual teachers. Compare perspectives, explore practices, and discover your path.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/council">
                <Button size="lg" className="ripple text-lg px-8 py-6 shadow-2xl">
                  <Users className="w-5 h-5 mr-2" />
                  Enter the Council
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/sages">
                <Button size="lg" variant="outline" className="ripple text-lg px-8 py-6 shadow-2xl backdrop-blur-sm bg-background/50">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Sages
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wisdom Tree - Background */}
        <div className="relative z-0 -mt-64 md:-mt-48">
          <WisdomTree />
        </div>
      </section>
      {quote && (
        <section className="container py-16">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              <p className="text-lg italic text-foreground/90 mb-4">"{quote.text}"</p>
              <p className="text-sm text-accent">— {quote.teacher}</p>
            </div>
          </div>
        </section>
      )}

      {/* Today's Deep Drop */}
      <LazySection className="container py-16">
        <TodaysDeepDrop />
      </LazySection>

      {/* Deep Question of the Day */}
      <LazySection className="container py-16">
        <DeepQuestionOfTheDay />
      </LazySection>

      {/* Council Debate */}
      <LazySection className="container py-16">
        <CouncilDebate />
      </LazySection>

      {/* Pick Your Focus Today */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pick Your <span className="text-gradient-violet">Focus</span> Today
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Explore timeless wisdom on life's essential questions. Each theme offers synthesis from multiple teachers, practices, and pathways for deeper understanding.
          </p>
        </div>
        <ThemeCards />
      </section>

      {/* Features Section */}
      <section className="border-t border-border/30">
        <div className="container py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Three Ways to <span className="text-gradient-violet">Explore Wisdom</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* One Sage */}
            <Link href="/council?mode=one_sage">
              <div className="glass-card p-8 rounded-2xl cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">One Sage</h3>
                <p className="text-foreground/70">
                  Dive deep into conversation with a single teacher. 
                  Experience their unique perspective and wisdom.
                </p>
              </div>
            </Link>

            {/* Compare Two */}
            <Link href="/council?mode=compare_two">
              <div className="glass-card p-8 rounded-2xl cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Compass className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Compare Two</h3>
                <p className="text-foreground/70">
                  See how two teachers approach the same question. 
                  Discover convergences and differences.
                </p>
              </div>
            </Link>

            {/* Council */}
            <Link href="/council?mode=council">
              <div className="glass-card p-8 rounded-2xl cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Full Council</h3>
                <p className="text-foreground/70">
                  Gather multiple sages for a rich dialogue. 
                  Synthesize wisdom from diverse traditions.
                </p>
              </div>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="border-t border-border/30">
        <div className="container py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Advanced <span className="text-gradient-violet">Practices</span>
          </h2>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-16">
            Go deeper with structured experiences designed to challenge assumptions and catalyze growth.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Paradox Playground */}
            <Link href="/paradox-playground">
              <div className="glass-card p-8 rounded-2xl cursor-pointer group hover:border-violet-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Paradox Playground</h3>
                <p className="text-foreground/70 mb-4">
                  Explore spiritual paradoxes where opposing truths coexist. Reflect on tensions like effort vs. surrender, and receive AI-guided insights from multiple teacher perspectives.
                </p>
                <div className="flex items-center gap-2 text-sm text-violet-400">
                  <span>8 Paradoxes</span>
                  <span>•</span>
                  <span>Teacher Perspectives</span>
                </div>
              </div>
            </Link>

            {/* Life Experiments */}
            <Link href="/life-experiments">
              <div className="glass-card p-8 rounded-2xl cursor-pointer group hover:border-amber-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Life Experiments</h3>
                <p className="text-foreground/70 mb-4">
                  Test spiritual teachings in real life. Start 5-7 day behavioral experiments like gratitude practices, ego observation, or death meditation. Track your insights daily.
                </p>
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <span>7 Experiments</span>
                  <span>•</span>
                  <span>Real-World Practice</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Teacher Preview */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Meet the <span className="text-gradient-gold">Sages</span>
            </h2>
            <Link href="/sages">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teachers?.slice(0, 12).map((teacher) => (
              <Link key={teacher.id} href={`/sages/${teacher.teacherId}`}>
                <div className="glass-card p-4 rounded-xl cursor-pointer group text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-amber-500/50 shadow-lg shadow-amber-500/30 overflow-hidden bg-slate-900/50 sage-avatar">
                    <ProgressiveImage
                      src={getSagePortrait(teacher.fullName)} 
                      alt={teacher.fullName}
                      className="w-full h-full"
                    />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">{teacher.fullName}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {teacher.era || "Ancient"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Begin Your Journey
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Create an account to save conversations, track your progress through guided journeys, 
              and build your personal library of insights.
            </p>
            {!isAuthenticated && (
              <Button asChild size="lg" className="ripple text-lg px-8 py-6">
                <a href={getLoginUrl()}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Free
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-sm text-muted-foreground">
                © 2024 {APP_TITLE}. Wisdom for the modern seeker.
              </span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground justify-center md:justify-end">
              <Link href="/sages" className="hover:text-foreground transition-colors">Sages</Link>
              <Link href="/journeys" className="hover:text-foreground transition-colors">Journeys</Link>
              <Link href="/council" className="hover:text-foreground transition-colors">Council</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/safety" className="hover:text-foreground transition-colors">Safety</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
