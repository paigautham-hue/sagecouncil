import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Sparkles, Users, BookOpen, Compass, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [quote, setQuote] = useState<{ text: string; teacher: string } | null>(null);

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
              <Link href="/council">
                <a className="text-foreground/80 hover:text-foreground transition-colors">Council</a>
              </Link>
              <Link href="/sages">
                <a className="text-foreground/80 hover:text-foreground transition-colors">Sages</a>
              </Link>
              <Link href="/journeys">
                <a className="text-foreground/80 hover:text-foreground transition-colors">Journeys</a>
              </Link>
              {isAuthenticated && (
                <Link href="/my-path">
                  <a className="text-foreground/80 hover:text-foreground transition-colors">My Path</a>
                </Link>
              )}
            </div>

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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Wisdom from 36 spiritual teachers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Seek Wisdom from the{" "}
              <span className="text-gradient-gold">Council of Sages</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              Engage in dialogue with history's greatest spiritual teachers. 
              Compare perspectives, explore practices, and discover your path.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/council">
                <Button size="lg" className="ripple text-lg px-8 py-6">
                  <Users className="w-5 h-5 mr-2" />
                  Enter the Council
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/sages">
                <Button size="lg" variant="outline" className="ripple text-lg px-8 py-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Sages
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating quote */}
        {quote && (
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              <p className="text-lg italic text-foreground/90 mb-4">"{quote.text}"</p>
              <p className="text-sm text-accent">— {quote.teacher}</p>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/30">
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
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center sage-avatar">
                    <span className="text-2xl font-bold text-foreground">
                      {teacher.fullName.charAt(0)}
                    </span>
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
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/sages"><a className="hover:text-foreground transition-colors">Sages</a></Link>
              <Link href="/journeys"><a className="hover:text-foreground transition-colors">Journeys</a></Link>
              <Link href="/council"><a className="hover:text-foreground transition-colors">Council</a></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
