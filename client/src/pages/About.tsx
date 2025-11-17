import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Heart, Users, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-border/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About the <span className="text-gradient-violet">Council of Sages</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A sanctuary for seekers, bringing together wisdom from 36 spiritual teachers across traditions and time periods.
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                <p className="text-slate-200 leading-relaxed">
                  The Council of Sages exists to make timeless wisdom accessible, practical, and personally relevant. We believe that the great spiritual teachers—from ancient philosophers to contemporary psychologists—offer complementary perspectives on life's essential questions. By bringing these voices into conversation, we help you discover insights that resonate with your unique journey.
                </p>
              </div>
            </div>
          </Card>

          {/* How It Works */}
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">How It Works</h2>
                <div className="space-y-4 text-slate-200">
                  <p>
                    <strong className="text-gold">AI-Powered Dialogue:</strong> Our system uses advanced language models trained on the actual teachings of each sage. When you ask a question, you receive responses grounded in their authentic philosophy and style.
                  </p>
                  <p>
                    <strong className="text-gold">Three Modes of Exploration:</strong> Dive deep with one teacher, compare perspectives between two, or gather the full council for a rich, multi-dimensional response.
                  </p>
                  <p>
                    <strong className="text-gold">Curated Content:</strong> Every quote, practice, and journey is drawn from verified sources—books, talks, and writings from the teachers themselves.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* The Teachers */}
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">The Teachers</h2>
                <p className="text-slate-200 leading-relaxed mb-4">
                  Our council includes 36 voices spanning 2,500 years of human wisdom: from Socrates and Buddha to Carl Jung and Eckhart Tolle. We've chosen teachers who offer practical guidance, not just abstract philosophy—those who help you live more consciously, compassionately, and courageously.
                </p>
                <Link href="/sages">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Meet the Sages
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Our Commitment */}
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Our Commitment</h2>
                <div className="space-y-3 text-slate-200">
                  <p><strong className="text-gold">Authenticity:</strong> We honor each teacher's original voice and philosophy.</p>
                  <p><strong className="text-gold">Accessibility:</strong> Wisdom shouldn't require a philosophy degree. We make deep teachings approachable.</p>
                  <p><strong className="text-gold">Privacy:</strong> Your spiritual journey is personal. We never share your conversations or data.</p>
                  <p><strong className="text-gold">Safety:</strong> We include crisis detection and resources for those in distress.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-300 mb-6">
            Ready to begin your journey?
          </p>
          <Link href="/council">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700">
              Enter the Council
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
