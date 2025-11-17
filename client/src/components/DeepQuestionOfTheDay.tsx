import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { Streamdown } from "streamdown";

type DepthLevel = 1 | 2 | 3;

const DEPTH_LEVELS: Array<{ level: DepthLevel; label: string; description: string; color: string }> = [
  { 
    level: 1, 
    label: "Safe", 
    description: "Gentle exploration", 
    color: "from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30" 
  },
  { 
    level: 2, 
    label: "Real", 
    description: "Honest inquiry", 
    color: "from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30" 
  },
  { 
    level: 3, 
    label: "Raw", 
    description: "Unfiltered truth", 
    color: "from-rose-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30" 
  },
];

export function DeepQuestionOfTheDay() {
  const [selectedLevel, setSelectedLevel] = useState<DepthLevel | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const { data: question, isLoading } = trpc.deepQuestions.getDailyQuestion.useQuery();
  const submitAnswer = trpc.deepQuestions.submitAnswer.useMutation();

  const handleSubmit = async () => {
    if (!question || !selectedLevel || !userAnswer.trim()) return;
    
    try {
      const result = await submitAnswer.mutateAsync({
        questionId: question.id,
        depthLevel: selectedLevel,
        userAnswer: userAnswer.trim(),
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleReset = () => {
    setSelectedLevel(null);
    setUserAnswer("");
    setSubmitted(false);
  };

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-violet-950/40 to-purple-950/40 border-violet-500/20">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
        </div>
      </Card>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-violet-950/40 to-purple-950/40 border-violet-500/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-violet-500/20">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-violet-100">Deep Question of the Day</h3>
            <p className="text-sm text-violet-300/70">Choose your depth, then reflect</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedLevel ? (
            // Level Selection
            <motion.div
              key="level-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <p className="text-violet-200/90 mb-6">
                How deep do you want to go today?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEPTH_LEVELS.map(({ level, label, description, color }) => (
                  <motion.button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-6 rounded-lg bg-gradient-to-br ${color} border border-white/10 text-left transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg font-semibold text-white mb-1">{label}</div>
                    <div className="text-sm text-white/70">{description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : !submitted ? (
            // Question & Answer
            <motion.div
              key="question-answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium">
                    {DEPTH_LEVELS.find(d => d.level === selectedLevel)?.label} Level
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-violet-300 hover:text-violet-100"
                >
                  Change Level
                </Button>
              </div>

              <div className="p-6 rounded-lg bg-black/20 border border-violet-500/20">
                <p className="text-xl text-violet-100 leading-relaxed">
                  {question.questionText}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-violet-300/90">Your reflection:</label>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Take your time... write what comes to you honestly."
                  className="min-h-[150px] bg-black/30 border-violet-500/20 text-violet-100 placeholder:text-violet-400/40 resize-none"
                  disabled={submitAnswer.isPending}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim() || submitAnswer.isPending}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                >
                  {submitAnswer.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Receiving Council Response...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Submit to Council
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            // Council Response
            <motion.div
              key="council-response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Saved to your journal</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-violet-300/70 mb-2">Your Reflection:</h4>
                  <div className="p-4 rounded-lg bg-black/20 border border-violet-500/10">
                    <p className="text-violet-200/90">{userAnswer}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-violet-300/70 mb-2">Council Response:</h4>
                  <div className="p-6 rounded-lg bg-gradient-to-br from-amber-950/30 to-orange-950/30 border border-amber-500/20">
                    <Streamdown className="text-amber-100/90 prose-sm prose-invert">
                      {submitAnswer.data?.councilResponse || ""}
                    </Streamdown>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
              >
                Explore Another Depth
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
