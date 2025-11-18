import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { MessageCircle, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export function TodaysDeepDrop() {
  const { data: drop, isLoading } = trpc.daily.getTodaysDrop.useQuery();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <Card className="bg-slate-900/40 backdrop-blur-md border-gold/20">
        <CardContent className="p-8 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!drop) {
    return null;
  }

  const handleAskAboutThis = () => {
    // Navigate to Council with quote pre-loaded
    setLocation(`/council?mode=one_sage&teacher=${drop.teacher.id}&quote=${encodeURIComponent(drop.quote.text)}`);
  };

  const handleCompareViews = () => {
    // Navigate to Council in compare mode
    setLocation(`/council?mode=council&quote=${encodeURIComponent(drop.quote.text)}`);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/60 to-purple-900/20 backdrop-blur-md border-gold/30 shadow-2xl">
      <CardContent className="p-8 md:p-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
            <span className="text-gold text-sm font-medium">✨ Today's Deep Drop</span>
          </div>
        </div>

        {/* Quote */}
        <div className="space-y-4">
          <blockquote className="text-2xl md:text-3xl font-serif text-white/95 leading-relaxed text-center italic">
            "{drop.quote.text}"
          </blockquote>
          
          {/* Teacher Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl"></div>
              <div className="relative w-16 h-16 rounded-full border-2 border-gold/50 overflow-hidden">
                <ProgressiveImage
                  src={drop.teacher.portrait}
                  alt={drop.teacher.fullName}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-white">{drop.teacher.fullName}</div>
              <div className="text-sm text-slate-300 italic">{drop.teacher.oneLineEssence}</div>
            </div>
          </div>
        </div>

        {/* AI Commentary */}
        <div className="bg-slate-800/40 rounded-lg p-6 border border-slate-700/50">
          <div className="text-sm font-semibold text-gold mb-2">Reflection</div>
          <p className="text-slate-200 leading-relaxed">{drop.commentary}</p>
        </div>

        {/* 1-Minute Practice */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30">
          <div className="text-sm font-semibold text-purple-300 mb-2">1-Minute Practice</div>
          <p className="text-slate-200 leading-relaxed">{drop.practice}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleAskAboutThis}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask about this
          </Button>
          <Button
            onClick={handleCompareViews}
            variant="outline"
            className="flex-1 border-gold/30 text-gold hover:bg-gold/10"
          >
            <Users className="w-4 h-4 mr-2" />
            See how others see this
          </Button>
        </div>

        {/* Source */}
        {drop.quote.source && (
          <div className="text-center text-xs text-slate-400 pt-2">
            — {drop.quote.source}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
