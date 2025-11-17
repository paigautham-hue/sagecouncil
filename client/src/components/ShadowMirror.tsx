import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Sparkles, TrendingUp } from "lucide-react";
import { Streamdown } from "streamdown";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function ShadowMirror() {
  const { data: summaries, isLoading, refetch } = trpc.shadowMirror.getSummaries.useQuery();
  const generateSummary = trpc.shadowMirror.generateWeeklySummary.useMutation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleGenerate = async () => {
    try {
      await generateSummary.mutateAsync();
      toast.success("Weekly summary generated!");
      refetch();
    } catch (error) {
      toast.error("Failed to generate summary");
    }
  };

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border-purple-500/20">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border-purple-500/20">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-purple-100 mb-2">
                Shadow Mirror
              </h3>
              <p className="text-purple-300/70 max-w-2xl">
                Weekly reflections that reveal patterns you might not see in yourself.
                The Shadow Mirror analyzes your journal entries and conversations to identify
                recurring themes, blind spots, and growth opportunities.
              </p>
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={generateSummary.isPending}
            className="bg-purple-600 hover:bg-purple-500"
          >
            {generateSummary.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate This Week
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Summaries */}
      {!summaries || summaries.length === 0 ? (
        <Card className="p-8 bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border-purple-500/20">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-100 mb-2">
                No Summaries Yet
              </h4>
              <p className="text-purple-300/70 max-w-md mx-auto">
                Generate your first weekly summary to see patterns in your inner work.
                The more you journal and converse with the Council, the richer your reflections become.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {summaries.map((summary) => {
            const isExpanded = expandedId === summary.id;
            const weekStart = new Date(summary.weekStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const weekEnd = new Date(summary.weekEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : summary.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Eye className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-purple-100">
                              Week of {weekStart} - {weekEnd}
                            </h4>
                            <p className="text-sm text-purple-300/60">
                              {summary.dominantThemes?.length || 0} themes identified
                            </p>
                          </div>
                        </div>

                        {/* Dominant Themes */}
                        {summary.dominantThemes && summary.dominantThemes.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {summary.dominantThemes.map((theme, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm"
                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 space-y-6"
                    >
                      {/* Pattern Analysis */}
                      <div>
                        <h5 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Pattern Analysis
                        </h5>
                        <div className="prose prose-invert prose-sm max-w-none text-purple-100/90">
                          <Streamdown>{summary.patternAnalysis}</Streamdown>
                        </div>
                      </div>

                      {/* Blind Spots */}
                      {summary.blindSpots && (
                        <div>
                          <h5 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Blind Spots
                          </h5>
                          <div className="prose prose-invert prose-sm max-w-none text-purple-100/90">
                            <Streamdown>{summary.blindSpots}</Streamdown>
                          </div>
                        </div>
                      )}

                      {/* Growth Opportunities */}
                      {summary.growthOpportunities && (
                        <div>
                          <h5 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Growth Opportunities
                          </h5>
                          <div className="prose prose-invert prose-sm max-w-none text-purple-100/90">
                            <Streamdown>{summary.growthOpportunities}</Streamdown>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
