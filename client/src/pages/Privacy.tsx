import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
            Privacy <span className="text-gradient-violet">Policy</span>
          </h1>
          <p className="text-xl text-slate-300">
            Your spiritual journey is personal. We protect it.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <div className="space-y-3 text-slate-200">
              <p><strong className="text-gold">Account Information:</strong> Email address, name, and authentication credentials.</p>
              <p><strong className="text-gold">Conversation Data:</strong> Your questions, the AI responses, and conversation metadata.</p>
              <p><strong className="text-gold">Usage Data:</strong> Pages visited, features used, and interaction patterns to improve the platform.</p>
              <p><strong className="text-gold">Technical Data:</strong> IP address, browser type, device information for security and functionality.</p>
            </div>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <div className="space-y-3 text-slate-200">
              <p><strong className="text-gold">Provide the Service:</strong> Store your conversations, track your journey progress, and personalize your experience.</p>
              <p><strong className="text-gold">Improve the Platform:</strong> Analyze usage patterns to enhance features and fix issues.</p>
              <p><strong className="text-gold">Safety:</strong> Detect crisis keywords and provide appropriate resources.</p>
              <p><strong className="text-gold">Communication:</strong> Send important updates about the service (you can opt out of non-essential emails).</p>
            </div>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What We Don't Do</h2>
            <div className="space-y-3 text-slate-200">
              <p><strong className="text-gold">We don't sell your data.</strong> Ever. Your conversations are not a product.</p>
              <p><strong className="text-gold">We don't share conversations with third parties.</strong> Your dialogue with the sages stays between you and the platform.</p>
              <p><strong className="text-gold">We don't use your data to train public AI models.</strong> Your personal conversations remain private.</p>
              <p><strong className="text-gold">We don't track you across the web.</strong> No third-party advertising cookies.</p>
            </div>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <div className="space-y-3 text-slate-200">
              <p><strong className="text-gold">Access:</strong> Request a copy of all data we have about you.</p>
              <p><strong className="text-gold">Deletion:</strong> Delete your account and all associated data at any time.</p>
              <p><strong className="text-gold">Correction:</strong> Update or correct your personal information.</p>
              <p><strong className="text-gold">Export:</strong> Download your conversations and journal entries.</p>
              <p><strong className="text-gold">Opt-Out:</strong> Unsubscribe from non-essential communications.</p>
            </div>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="text-slate-200 leading-relaxed">
              We use industry-standard encryption to protect your data in transit and at rest. Access to user data is restricted to essential personnel only. We regularly audit our security practices and update them as needed.
            </p>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p className="text-slate-200 leading-relaxed">
              We may update this privacy policy from time to time. We'll notify you of significant changes via email or a prominent notice on the platform. Continued use after changes constitutes acceptance.
            </p>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-slate-200 leading-relaxed">
              Questions about privacy? Contact us through your account settings or email us at privacy@councilofsages.com.
            </p>
          </Card>
        </div>

        <div className="mt-16 text-center text-sm text-slate-400">
          <p>Last updated: November 2024</p>
        </div>
      </main>
    </div>
  );
}
