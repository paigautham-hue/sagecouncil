import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import { Streamdown } from "streamdown";
import { motion, AnimatePresence } from "framer-motion";

export function CouncilDebate() {
  const { data: debate, isLoading } = trpc.debates.getWeekly.useQuery();
  const { data: teachers } = trpc.teachers.getAll.useQuery();
  const [showSynthesis, setShowSynthesis] = useState(false);

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
        </div>
      </Card>
    );
  }

  if (!debate) {
    return (
      <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-amber-500/20">
              <MessageSquare className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-amber-100 mb-2">
              No Debate This Week
            </h3>
            <p className="text-amber-300/70 max-w-md mx-auto">
              Check back soon for the next Council debate where sages wrestle with life's most provocative questions.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Get teacher names
  const getTeacherName = (teacherId: number) => {
    const teacher = teachers?.find(t => t.id === teacherId);
    return teacher?.fullName || 'Unknown Sage';
  };

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.1),transparent)]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-amber-500/20">
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-amber-100">This Week's Council Debate</h3>
              <p className="text-sm text-amber-300/70">Where wisdom traditions meet and clash</p>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-black/20 border border-amber-500/20 mb-6">
            <p className="text-2xl text-amber-100 leading-relaxed font-serif italic">
              "{debate.questionText}"
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-amber-300/70">
            <Sparkles className="w-4 h-4" />
            <span>{debate.teacherResponses.length} sages respond</span>
          </div>
        </div>
      </Card>

      {/* Teacher Responses */}
      <div className="space-y-4">
        {debate.teacherResponses.map((response, idx) => {
          const teacherName = getTeacherName(response.teacherId);
          const colors = [
            { from: "violet-950/30", to: "purple-950/30", border: "violet-500/20", text: "violet-100" },
            { from: "blue-950/30", to: "cyan-950/30", border: "blue-500/20", text: "blue-100" },
            { from: "emerald-950/30", to: "teal-950/30", border: "emerald-500/20", text: "emerald-100" },
            { from: "rose-950/30", to: "pink-950/30", border: "rose-500/20", text: "rose-100" },
            { from: "amber-950/30", to: "yellow-950/30", border: "amber-500/20", text: "amber-100" },
          ];
          const color = colors[idx % colors.length];

          return (
            <motion.div
              key={response.teacherId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`p-6 bg-gradient-to-br from-${color.from} to-${color.to} border-${color.border}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${color.from} to-${color.to} flex items-center justify-center border border-${color.border}`}>
                      <span className={`text-${color.text} font-bold text-sm`}>
                        {teacherName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h4 className={`font-semibold text-${color.text}`}>{teacherName}</h4>
                    </div>
                  </div>
                  <div className={`text-${color.text}/90 leading-relaxed`}>
                    <Streamdown>{response.response}</Streamdown>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Synthesis Section */}
      {debate.synthesis && (
        <div className="space-y-4">
          <Button
            onClick={() => setShowSynthesis(!showSynthesis)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {showSynthesis ? "Hide" : "View"} Council Synthesis
          </Button>

          <AnimatePresence>
            {showSynthesis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="p-8 bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-purple-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h4 className="text-xl font-serif text-purple-100">The Council Speaks</h4>
                    </div>
                    <div className="text-purple-200/90 leading-relaxed">
                      <Streamdown>{debate.synthesis}</Streamdown>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
