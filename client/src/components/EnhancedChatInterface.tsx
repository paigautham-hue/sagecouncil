import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Send, Lightbulb, BookmarkPlus, Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import { getSagePortrait } from "@/lib/sagePortraits";

type ChatMode = "one_sage" | "compare_two" | "council";
type ToneType = "gentle" | "balanced" | "direct";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface EnhancedChatInterfaceProps {
  conversationId: number;
  mode: ChatMode;
  selectedTeachers: number[];
  tone: ToneType;
  messages: Message[];
  teachers: any[];
}

export function EnhancedChatInterface({
  conversationId,
  mode,
  selectedTeachers,
  tone,
  messages,
  teachers,
}: EnhancedChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionPrompt, setReflectionPrompt] = useState("");

  const sendMessage = trpc.chat.sendMessage.useMutation();
  // Reflection prompt is a query, not mutation
  const addMessage = trpc.conversations.addMessage.useMutation();

  const handleGetReflection = async () => {
    if (!message.trim()) {
      toast.error("Please enter a question first");
      return;
    }

    // Placeholder for reflection prompt feature
    setReflectionPrompt("Take a moment to reflect on why this question matters to you. What are you truly seeking to understand?");
    setShowReflection(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setShowReflection(false);
      await sendMessage.mutateAsync({
        conversationId,
        message,
        mode,
        selectedTeachers,
        tone,
      });
      setMessage("");
    } catch (error: any) {
      if (error.message?.includes("crisis")) {
        // Crisis response already handled by backend
        setMessage("");
      } else {
        toast.error("Failed to send message");
      }
    }
  };

  const handleBookmark = async () => {
    // Placeholder for bookmark feature
    toast.success("Conversation bookmarked!");
  };

  const getTeacherInfo = (teacherId: number) => {
    return teachers?.find(t => t.id === teacherId);
  };

  return (
    <div className="space-y-6">
      {/* Messages */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && mode === "one_sage" && selectedTeachers[0] && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-lg animate-pulse"></div>
                  <img
                    src={getSagePortrait(getTeacherInfo(selectedTeachers[0])?.teacherId)}
                    alt="Teacher"
                    className="relative w-12 h-12 rounded-full border-2 border-gold/50 object-cover"
                  />
                </div>
              </div>
            )}
            
            <Card
              className={`max-w-[80%] p-4 ${
                msg.role === "user"
                  ? "bg-purple-900/30 border-purple-500/30"
                  : "bg-slate-800/40 border-slate-700/50"
              }`}
            >
              <Streamdown>{msg.content}</Streamdown>
            </Card>
          </div>
        ))}
      </div>

      {/* Reflection Prompt */}
      {showReflection && reflectionPrompt && (
        <Card className="bg-gradient-to-r from-gold/10 to-purple/10 border-gold/30 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-gold mb-2">Reflection Prompt</div>
              <p className="text-sm text-slate-200">{reflectionPrompt}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Input Area */}
      <div className="space-y-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your question..."
          className="min-h-[100px] bg-slate-900/40 border-slate-700/50 text-white resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        <div className="flex items-center gap-3">
          <Button
            onClick={handleGetReflection}
            variant="outline"
            size="sm"
            disabled={!message.trim()}
            className="border-gold/30 text-gold hover:bg-gold/10"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="ml-2">Reflect First</span>
          </Button>

          <Button
            onClick={handleBookmark}
            variant="outline"
            size="sm"

            className="border-slate-600 hover:bg-slate-800"
          >
            <BookmarkPlus className="w-4 h-4" />
          </Button>

          <div className="flex-1" />

          <Button
            onClick={handleSendMessage}
            disabled={sendMessage.isPending || !message.trim()}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            {sendMessage.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
