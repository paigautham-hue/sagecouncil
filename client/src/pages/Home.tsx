import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Sparkles, Users, BookOpen, Compass, ArrowRight, Menu, X, Brain, FlaskConical, ArrowLeft, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { TemplePortal } from "@/components/TemplePortal";
import WisdomTree from "@/components/WisdomTree";
import WisdomTreeMobile from "@/components/WisdomTreeMobile";
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
  
  // Initialize with immediate detection - check window.innerWidth immediately
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      // Use visualViewport for Safari, which is more accurate on mobile
      const width = window.visualViewport?.width ?? window.innerWidth;
      return width < 768;
    }
    return false;
  });

  // Reliable mobile detection using JavaScript
  useEffect(() => {
    const checkMobile = () => {
      // Use visualViewport for Safari, which is more accurate on mobile
      const width = window.visualViewport?.width ?? window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
    };
    
    // Check immediately
    checkMobile();
    
    // Listen for resize
    window.addEventListener('resize', checkMobile);
    
    // Also listen to visualViewport changes for Safari
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', checkMobile);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

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
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-4 mt-8">
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
                </nav>
              </SheetContent>
            </Sheet>

            {!isAuthenticated && (
              <Link href={getLoginUrl()}>
                <Button className="bg-accent hover:bg-accent/90">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <TemplePortal />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-gold">
              Seek Wisdom from the<br />
              <span className="text-gradient-purple">Council of Sages</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Engage in dialogue with history's greatest spiritual teachers. Compare perspectives, explore practices, and discover your path.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
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

          {/* Wisdom Tree - Background */}
          <div className="relative z-0 -mt-[550px] md:-mt-48">
            {/* Conditional rendering based on JavaScript detection */}
            {isMobile ? (
              <WisdomTreeMobile />
            ) : (
              <WisdomTree />
            )}
          </div>

          {/* Scroll Hint */}
          <div className="relative z-10 flex flex-col items-center mt-8 md:mt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 text-accent/60" />
            <p className="text-sm text-accent/60 mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* Today's Deep Drop - Only show if user is authenticated */}
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

      {/* Three Ways Section */}
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
              <Link href="/council?mode=one-sage">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-violet-500/30 rounded-xl p-8 hover:border-violet-500/60 transition-all duration-300 h-full">
                    <Brain className="w-12 h-12 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">One Sage</h3>
                    <p className="text-foreground/70">Dive deep into conversation with a single teacher. Explore their unique perspective and practices.</p>
                  </div>
                </div>
              </Link>

              <Link href="/council?mode=compare">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-teal-500/30 rounded-xl p-8 hover:border-teal-500/60 transition-all duration-300 h-full">
                    <Compass className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Compare Two</h3>
                    <p className="text-foreground/70">See how two teachers approach the same question. Discover convergences and unique insights.</p>
                  </div>
                </div>
              </Link>

              <Link href="/council?mode=full-council">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-amber-500/30 rounded-xl p-8 hover:border-amber-500/60 transition-all duration-300 h-full">
                    <Users className="w-12 h-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Full Council</h3>
                    <p className="text-foreground/70">Gather multiple sages for a rich dialogue. Experience the full spectrum of wisdom traditions.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Advanced Practices Section */}
      <LazySection>
        <section className="py-20 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold">
              Advanced <span className="text-gradient-purple">Practices</span>
            </h2>
            <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
              Go deeper with structured experiences designed to challenge assumptions and catalyze growth.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/paradox-playground">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-violet-500/30 rounded-xl p-8 hover:border-violet-500/60 transition-all duration-300 h-full">
                    <FlaskConical className="w-12 h-12 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Paradox Playground</h3>
                    <p className="text-foreground/70">Explore spiritual paradoxes where apparent contradictions reveal deeper truths. Challenge your assumptions.</p>
                  </div>
                </div>
              </Link>

              <Link href="/life-experiments">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-teal-500/30 rounded-xl p-8 hover:border-teal-500/60 transition-all duration-300 h-full">
                    <Sparkles className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gradient-gold mb-3">Life Experiments</h3>
                    <p className="text-foreground/70">Test spiritual teachings in real life. Design and track experiments that integrate wisdom into daily practice.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Meet the Sages Section */}
      <LazySection>
        <section className="py-20 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold">
                Meet the <span className="text-gradient-purple">Sages</span>
              </h2>
              <Link href="/sages">
                <Button variant="ghost" className="text-accent hover:text-accent/80">
                  View All
                </Button>
              </Link>
            </div>
            
            {teachers && teachers.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {teachers.slice(0, 12).map((teacher) => (
                  <Link key={teacher.id} href={`/sages/${teacher.teacherId}`}>
                    <div className="group cursor-pointer">
                      <div className="relative mb-3 overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-violet-900/40 to-teal-900/40 border border-violet-500/30 group-hover:border-violet-500/60 transition-all duration-300">
                        <ProgressiveImage
                          src={teacher.avatarUrl || getSagePortrait(teacher.fullName)}
                          alt={teacher.fullName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{teacher.fullName}</h3>
                      <p className="text-xs text-foreground/60">{teacher.era}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </LazySection>

      {/* Begin Your Journey Section */}
      <LazySection>
        <section className="py-20 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-violet-900/40 to-teal-900/40 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
                Begin Your <span className="text-gradient-purple">Journey</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Create an account to save conversations, track your progress through guided journeys, and build your personal library of insights.
              </p>
              {!isAuthenticated && (
                <Link href={getLoginUrl()}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gradient-gold mb-4">Council of Sages</h3>
              <p className="text-sm text-foreground/60">Wisdom from history's greatest spiritual teachers</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sages" className="text-foreground/60 hover:text-foreground transition-colors">Sages</Link></li>
                <li><Link href="/council" className="text-foreground/60 hover:text-foreground transition-colors">Council</Link></li>
                <li><Link href="/journeys" className="text-foreground/60 hover:text-foreground transition-colors">Journeys</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/faq" className="text-foreground/60 hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/safety" className="text-foreground/60 hover:text-foreground transition-colors">Safety</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-foreground/60 hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 Council of Sages. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
