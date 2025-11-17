import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Loader2, Play, Pause, SkipForward, Check, Star } from "lucide-react";
import { Streamdown } from "streamdown";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface MicroRetreatExperienceProps {
  retreatId: number;
  onComplete?: () => void;
}

export function MicroRetreatExperience({ retreatId, onComplete }: MicroRetreatExperienceProps) {
  const { data: retreat, isLoading } = trpc.microRetreats.getById.useQuery({ id: retreatId });
  const saveSession = trpc.microRetreats.saveSession.useMutation();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflectionNotes, setReflectionNotes] = useState("");
  const [rating, setRating] = useState(0);

  const currentStep = retreat?.steps[currentStepIndex];
  const progress = retreat ? ((currentStepIndex + 1) / retreat.steps.length) * 100 : 0;

  // Timer effect
  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining]);

  // Auto-advance when timer completes
  useEffect(() => {
    if (timeRemaining === 0 && currentStep?.durationSeconds && isPlaying === false && currentStepIndex < (retreat?.steps.length || 0) - 1) {
      // Small delay before auto-advancing
      const timeout = setTimeout(() => {
        handleNext();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [timeRemaining, isPlaying]);

  const handleStart = () => {
    if (currentStep?.durationSeconds) {
      setTimeRemaining(currentStep.durationSeconds);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (retreat && currentStepIndex < retreat.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setIsPlaying(false);
      setTimeRemaining(0);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = async () => {
    try {
      await saveSession.mutateAsync({
        retreatId,
        reflectionNotes: reflectionNotes || undefined,
        rating: rating || undefined,
      });
      toast.success("Retreat session saved!");
      onComplete?.();
    } catch (error) {
      toast.error("Failed to save session");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  if (!retreat) {
    return (
      <Card className="p-8 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
        <p className="text-center text-indigo-300">Retreat not found</p>
      </Card>
    );
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="p-8 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-500/20">
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif text-indigo-100 mb-2">
                Retreat Complete
              </h3>
              <p className="text-indigo-300/70">
                Take a moment to reflect on your experience
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Reflection Notes (optional)
                </label>
                <Textarea
                  value={reflectionNotes}
                  onChange={(e) => setReflectionNotes(e.target.value)}
                  placeholder="What insights or feelings emerged during this retreat?"
                  className="bg-black/20 border-indigo-500/20 text-indigo-100"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Rate this experience
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-indigo-400/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                disabled={saveSession.isPending}
              >
                {saveSession.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete & Save"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-indigo-300">
          <span>Step {currentStepIndex + 1} of {retreat.steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="bg-indigo-950/50" />
      </div>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
            <div className="space-y-6">
              {/* Step Header */}
              <div className="text-center">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm mb-4">
                  {currentStep?.type}
                </div>
                <h3 className="text-2xl font-serif text-indigo-100 mb-4">
                  {currentStep?.title}
                </h3>
              </div>

              {/* Timer (if applicable) */}
              {currentStep?.durationSeconds && (
                <div className="text-center">
                  <div className="text-5xl font-mono text-indigo-100 mb-4">
                    {formatTime(timeRemaining || currentStep.durationSeconds)}
                  </div>
                  <div className="flex justify-center gap-3">
                    {!isPlaying && timeRemaining === 0 && (
                      <Button
                        onClick={handleStart}
                        className="bg-indigo-600 hover:bg-indigo-500"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                    {isPlaying && (
                      <Button
                        onClick={handlePause}
                        variant="outline"
                        className="border-indigo-500/50"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-indigo-200/90 leading-relaxed">
                  <Streamdown>{currentStep?.content || ""}</Streamdown>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  {currentStepIndex === retreat.steps.length - 1 ? "Finish" : "Next"}
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
