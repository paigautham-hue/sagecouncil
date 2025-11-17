import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "What is the Council of Sages?",
    answer: "The Council of Sages is an AI-powered platform that brings together wisdom from 36 spiritual teachers across traditions and time periods. You can engage in dialogue with individual teachers, compare perspectives, or gather insights from the full council."
  },
  {
    question: "How does the AI work?",
    answer: "Our system uses advanced language models trained on the actual teachings, writings, and philosophies of each sage. Responses are grounded in authentic source material and designed to reflect each teacher's unique voice and perspective."
  },
  {
    question: "Can I trust the responses?",
    answer: "While our AI strives for authenticity, it's important to remember that these are AI-generated responses based on the teachers' works, not the teachers themselves. We recommend using the council as a starting point for exploration, then diving into the original sources."
  },
  {
    question: "Is my data private?",
    answer: "Yes. We take privacy seriously. Your conversations are stored securely and never shared with third parties. You can delete your data at any time through your account settings."
  },
  {
    question: "What if I'm in crisis?",
    answer: "The Council of Sages is not a substitute for professional mental health care. If you're in crisis, please reach out to a qualified professional. We include crisis detection and provide resources for immediate help when needed."
  },
  {
    question: "How do I choose which mode to use?",
    answer: "Use 'One Sage' for deep exploration of a specific teacher's philosophy. Choose 'Compare Two' to see how different perspectives approach the same question. Select 'Full Council' for a rich, multi-dimensional response drawing from multiple traditions."
  },
  {
    question: "Can I save my conversations?",
    answer: "Yes! All your conversations are automatically saved to your account. You can bookmark important dialogues and add them to your personal journal for future reference."
  },
  {
    question: "What are Journeys?",
    answer: "Journeys are guided multi-day explorations of specific themes, combining readings from multiple teachers with practices and reflection prompts. They're designed to deepen your understanding over time."
  },
  {
    question: "How often is new content added?",
    answer: "We regularly add new quotes, practices, and journeys. We also expand our council with additional teachers based on user requests and our research."
  },
  {
    question: "Can I suggest a teacher to add?",
    answer: "Absolutely! We welcome suggestions. Please use the feedback form in your account settings to recommend teachers you'd like to see added to the council."
  }
];

export default function FAQ() {
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
            Frequently Asked <span className="text-gradient-violet">Questions</span>
          </h1>
          <p className="text-xl text-slate-300">
            Everything you need to know about the Council of Sages
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-slate-900/40 backdrop-blur-md border-slate-700/50 p-6">
              <h3 className="text-xl font-semibold text-gold mb-3">{faq.question}</h3>
              <p className="text-slate-200 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-300 mb-6">
            Still have questions?
          </p>
          <Link href="/council">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700">
              Ask the Council
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
