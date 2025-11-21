import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Clock, Sparkles, Zap } from "lucide-react";
import { MicroRetreatExperience } from "./MicroRetreatExperience";

export function MicroRetreatsLibrary() {
  const { data: retreats, isLoading, refetch } = trpc.microRetreats.getAll.useQuery();
  const [selectedRetreatId, setSelectedRetreatId] = useState<number | null>(null);

  const handleComplete = () => {
    setSelectedRetreatId(null);
    refetch();
  };

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
        </div>
      </Card>
    );
  }

  if (!retreats || retreats.length === 0) {
    return (
      <Card className="p-8 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-indigo-500/20">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2">
              No Retreats Available
            </h3>
            <p className="text-indigo-300/70 max-w-md mx-auto">
              Check back soon for guided micro-retreats to deepen your practice.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {retreats.map((retreat) => (
          <Card
            key={retreat.id}
            className="group cursor-pointer bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedRetreatId(retreat.id)}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex items-center gap-1 text-sm text-indigo-300">
                  <Clock className="w-4 h-4" />
                  <span>{retreat.durationMinutes} min</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-100 mb-2 group-hover:text-indigo-200 transition-colors">
                  {retreat.title}
                </h3>
                {retreat.description && (
                  <p className="text-sm text-indigo-300/70 line-clamp-2">
                    {retreat.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-indigo-400">
                  {retreat.steps.length} steps
                </span>
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRetreatId(retreat.id);
                  }}
                >
                  <Zap className="w-4 h-4" />
                  Begin
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Retreat Experience Dialog */}
      <Dialog open={!!selectedRetreatId} onOpenChange={() => setSelectedRetreatId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-indigo-500/30">
          {selectedRetreatId && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-indigo-100">
                  Micro-Retreat Experience
                </DialogTitle>
              </DialogHeader>
              <MicroRetreatExperience
                retreatId={selectedRetreatId}
                onComplete={handleComplete}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
