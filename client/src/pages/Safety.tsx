import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, Heart, AlertCircle } from "lucide-react";

export default function Safety() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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
            Your <span className="text-gradient-violet">Safety</span> Matters
          </h1>
          <p className="text-xl text-slate-300">
            Resources and support when you need them most
          </p>
        </div>

        {/* Crisis Resources */}
        <Card className="bg-gradient-to-r from-rose-900/30 to-red-900/30 border-rose-500/50 p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-rose-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">If You're in Crisis</h2>
              <p className="text-slate-200 mb-6">
                The Council of Sages is not a substitute for professional mental health care. If you're experiencing a mental health emergency, please reach out to qualified professionals immediately.
              </p>
              <div className="space-y-4">
                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-gold" />
                    <h3 className="font-semibold text-white">National Suicide Prevention Lifeline (US)</h3>
                  </div>
                  <p className="text-slate-200">Call or text: <strong className="text-gold">988</strong></p>
                  <p className="text-sm text-slate-400">Available 24/7, free and confidential</p>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-gold" />
                    <h3 className="font-semibold text-white">Crisis Text Line</h3>
                  </div>
                  <p className="text-slate-200">Text <strong className="text-gold">HELLO</strong> to <strong className="text-gold">741741</strong></p>
                  <p className="text-sm text-slate-400">Free, 24/7 support via text message</p>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-gold" />
                    <h3 className="font-semibold text-white">International Association for Suicide Prevention</h3>
                  </div>
                  <p className="text-slate-200">
                    <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                      Find crisis centers worldwide
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Our Commitment */}
        <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8 mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Your Wellbeing</h2>
              <div className="space-y-4 text-slate-200">
                <p>
                  <strong className="text-gold">Crisis Detection:</strong> Our system monitors for keywords and patterns indicating distress. When detected, we provide compassionate responses and direct you to professional resources.
                </p>
                <p>
                  <strong className="text-gold">Not a Replacement for Therapy:</strong> The Council of Sages offers wisdom and perspective, but it's not a substitute for licensed mental health professionals, especially in crisis situations.
                </p>
                <p>
                  <strong className="text-gold">Privacy Protected:</strong> Your conversations are confidential. We never share your data with third parties. However, we encourage you to seek professional help when needed.
                </p>
                <p>
                  <strong className="text-gold">Supportive Community:</strong> While we don't offer peer support forums, we connect you with teachers whose wisdom has helped millions navigate life's challenges.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* When to Seek Professional Help */}
        <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">When to Seek Professional Help</h2>
          <div className="space-y-3 text-slate-200">
            <p>Consider reaching out to a mental health professional if you're experiencing:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Thoughts of harming yourself or others</li>
              <li>Persistent feelings of hopelessness or despair</li>
              <li>Difficulty functioning in daily life</li>
              <li>Substance abuse issues</li>
              <li>Trauma or PTSD symptoms</li>
              <li>Severe anxiety or panic attacks</li>
              <li>Significant changes in sleep, appetite, or energy</li>
            </ul>
            <p className="mt-4">
              <strong className="text-gold">Remember:</strong> Seeking help is a sign of strength, not weakness. Professional support can make a profound difference.
            </p>
          </div>
        </Card>

        <div className="mt-16 text-center">
          <p className="text-slate-300 mb-6">
            You are not alone. Help is available.
          </p>
        </div>
      </main>
    </div>
  );
}
