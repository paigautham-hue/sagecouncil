import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { LotusIcon, CompassIcon, LabyrinthIcon, SeedIcon, SacredGeometryIcon } from "@/components/icons/SophisticatedIcons";

interface Theme {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  synthesis: string;
  practice: string;
  quotes: Array<{ text: string; teacher: string }>;
}

const themes: Theme[] = [
  {
    id: "ego",
    title: "Ego & Self",
    icon: LabyrinthIcon,
    color: "from-purple-600 to-indigo-600",
    description: "Understanding the nature of self and transcending ego",
    synthesis: "The ego is not an enemy to be destroyed, but a construct to be understood. Across traditions, teachers point to the illusory nature of the separate self while honoring the practical necessity of personality. The path involves seeing through identification while functioning skillfully in the world.",
    practice: "For the next minute, observe your thoughts without claiming them as 'yours.' Notice how thoughts arise like clouds in the sky of awareness. When you catch yourself saying 'I think,' ask: who is the 'I' that notices the thinking?",
    quotes: [
      { text: "The ego is not master in its own house.", teacher: "Carl Jung" },
      { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", teacher: "Rumi" },
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    icon: SacredGeometryIcon,
    color: "from-rose-600 to-pink-600",
    description: "Love, connection, and authentic relating",
    synthesis: "True relationship begins with relationship to oneself. Teachers across traditions emphasize that we cannot offer others what we haven't cultivated within. Love is not possession but recognition—seeing the divine in another while honoring their autonomy. Healthy boundaries and authentic vulnerability create the container for genuine connection.",
    practice: "Think of someone you're in conflict with. For one minute, imagine seeing the world through their eyes. What fears might drive their behavior? What wounds might they carry? This doesn't excuse harm, but it opens compassion.",
    quotes: [
      { text: "We are not held back by the love we didn't receive in the past, but by the love we're not extending in the present.", teacher: "Marianne Williamson" },
      { text: "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.", teacher: "Carl Jung" },
    ],
  },
  {
    id: "death",
    title: "Death & Impermanence",
    icon: SeedIcon,
    color: "from-slate-600 to-gray-700",
    description: "Embracing mortality and the transient nature of existence",
    synthesis: "Death is the ultimate teacher, stripping away all that is non-essential. Contemplating mortality doesn't lead to despair but to presence—when we truly understand that this moment is all we have, we stop postponing our lives. Impermanence is not a problem to solve but a truth to embrace, revealing the preciousness of each passing moment.",
    practice: "Close your eyes and imagine this is your last day alive. What becomes important? What falls away? Notice how this perspective shifts your priorities. Now open your eyes and look at your current moment with this clarity.",
    quotes: [
      { text: "Death is not the opposite of life, but a part of it.", teacher: "Haruki Murakami" },
      { text: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.", teacher: "Mark Twain" },
    ],
  },
  {
    id: "suffering",
    title: "Suffering & Growth",
    icon: LotusIcon,
    color: "from-orange-600 to-red-600",
    description: "Finding meaning in pain and adversity",
    synthesis: "Suffering is universal, but it need not be meaningless. The Buddha taught that suffering arises from attachment; Viktor Frankl showed that meaning can be found even in the darkest circumstances. Pain is inevitable; suffering is what happens when we resist pain. The path through difficulty involves neither avoidance nor wallowing, but conscious engagement with what is.",
    practice: "Bring to mind a current difficulty. Instead of asking 'Why is this happening to me?', ask 'What is this teaching me?' or 'How might I grow through this?' Notice how the question shifts your relationship to the challenge.",
    quotes: [
      { text: "The wound is the place where the Light enters you.", teacher: "Rumi" },
      { text: "What man actually needs is not a tensionless state but rather the striving and struggling for a worthwhile goal.", teacher: "Viktor Frankl" },
    ],
  },
  {
    id: "presence",
    title: "Presence & Awareness",
    icon: CompassIcon,
    color: "from-gold to-yellow-600",
    description: "Living in the present moment",
    synthesis: "The present moment is the only point of power. Past and future exist only as thoughts arising now. Presence is not a state to achieve but our natural condition when we stop resisting what is. Awareness itself is always here, always whole—it's only our attention that wanders. Coming home to now is coming home to ourselves.",
    practice: "Stop reading for a moment. Feel your breath. Notice three sounds around you. Feel the weight of your body. This is presence—simple, immediate, always available. Return here whenever you remember.",
    quotes: [
      { text: "Realize deeply that the present moment is all you ever have.", teacher: "Eckhart Tolle" },
      { text: "The secret of health for both mind and body is not to mourn for the past, nor to worry about the future, but to live the present moment wisely and earnestly.", teacher: "Buddha" },
    ],
  },
  {
    id: "purpose",
    title: "Purpose & Meaning",
    icon: SacredGeometryIcon,
    color: "from-blue-600 to-cyan-600",
    description: "Discovering your unique contribution",
    synthesis: "Purpose is not found but forged through engagement with life. It emerges at the intersection of your gifts, the world's needs, and what brings you alive. Meaning is not a destination but a direction—a continuous choosing of values over comfort, growth over stagnation, contribution over consumption. Your purpose evolves as you do.",
    practice: "Complete these sentences: 'I come alive when...' 'The world needs...' 'I am uniquely positioned to...' Where do these three circles overlap? That's where purpose lives.",
    quotes: [
      { text: "The meaning of life is to find your gift. The purpose of life is to give it away.", teacher: "Pablo Picasso" },
      { text: "He who has a why to live can bear almost any how.", teacher: "Friedrich Nietzsche" },
    ],
  },
];

export function ThemeCards() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const { isAuthenticated } = useAuth();
  const trackInteraction = trpc.constellation.trackThemeInteraction.useMutation();

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    if (isAuthenticated) {
      trackInteraction.mutate({ themeId: theme.id });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Card
              key={theme.id}
              className="group cursor-pointer bg-slate-900/40 backdrop-blur-md border-slate-700/50 hover:border-gold/50 gradient-overlay card-lift stagger-item"
              onClick={() => handleThemeClick(theme)}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${theme.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{theme.title}</h3>
                  <p className="text-sm text-slate-300">{theme.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gold hover:text-gold/80 hover:bg-gold/10 p-0"
                >
                  Explore →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Theme Modal */}
      <Dialog open={!!selectedTheme} onOpenChange={() => setSelectedTheme(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-gold/30">
          {selectedTheme && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${selectedTheme.color} flex items-center justify-center`}>
                    <selectedTheme.icon className="w-8 h-8 text-white" />
                  </div>
                  <DialogTitle className="text-3xl font-bold text-white">
                    {selectedTheme.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Synthesis */}
                <div className="bg-slate-800/40 rounded-lg p-6 border border-slate-700/50">
                  <div className="text-sm font-semibold text-gold mb-3">Wisdom Synthesis</div>
                  <p className="text-slate-200 leading-relaxed">{selectedTheme.synthesis}</p>
                </div>

                {/* Practice */}
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30">
                  <div className="text-sm font-semibold text-purple-300 mb-3">1-Minute Practice</div>
                  <p className="text-slate-200 leading-relaxed">{selectedTheme.practice}</p>
                </div>

                {/* Quotes */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gold">Voices from the Council</div>
                  {selectedTheme.quotes.map((quote, idx) => (
                    <div key={idx} className="bg-slate-800/20 rounded-lg p-4 border-l-4 border-gold/50">
                      <p className="text-slate-200 italic mb-2">"{quote.text}"</p>
                      <p className="text-sm text-gold">— {quote.teacher}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    onClick={() => {
                      setSelectedTheme(null);
                      window.location.href = `/council?mode=council&theme=${selectedTheme.id}`;
                    }}
                  >
                    Explore with the Council
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
