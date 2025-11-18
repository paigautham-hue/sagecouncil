import { useState, useEffect, useRef } from "react";
import { getSagePortrait } from "@/lib/sagePortraits";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Send, Sparkles, Users, Loader2, BookmarkPlus } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

type ChatMode = "one_sage" | "compare_two" | "council";
type ToneType = "gentle" | "balanced" | "direct";

export default function Council() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialMode = (searchParams.get("mode") as ChatMode) || "one_sage";

  const [mode, setMode] = useState<ChatMode>(initialMode);
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [tone, setTone] = useState<ToneType>("balanced");
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: teachers } = trpc.teachers.getAll.useQuery();
  const { data: messages } = trpc.conversations.getMessages.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId }
  );

  const utils = trpc.useUtils();
  const createConversation = trpc.conversations.create.useMutation();
  const sendMessage = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      // Invalidate messages query to refresh the chat
      utils.conversations.getMessages.invalidate();
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
    setSelectedTeachers([]);
    setConversationId(null);
  };

  const handleTeacherSelect = (teacherId: number) => {
    if (mode === "one_sage") {
      setSelectedTeachers([teacherId]);
    } else if (mode === "compare_two") {
      if (selectedTeachers.includes(teacherId)) {
        setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
      } else if (selectedTeachers.length < 2) {
        setSelectedTeachers([...selectedTeachers, teacherId]);
      }
    } else {
      if (selectedTeachers.includes(teacherId)) {
        setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
      } else {
        setSelectedTeachers([...selectedTeachers, teacherId]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || selectedTeachers.length === 0) {
      toast.error("Please select teachers and enter a message");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please sign in to chat with the council");
      window.location.href = getLoginUrl();
      return;
    }

    try {
      // Create conversation if needed
      let convId = conversationId;
      if (!convId) {
        const conv = await createConversation.mutateAsync({
          mode,
          selectedTeachers,
        });
        convId = Number(conv);
        setConversationId(Number(conv));
      }

      // Send message
      await sendMessage.mutateAsync({
        conversationId: convId,
        message,
        mode,
        selectedTeachers,
        tone,
      });

      setMessage("");
      toast.success("Response received");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  const canSend = selectedTeachers.length > 0 && 
    (mode === "one_sage" ? selectedTeachers.length === 1 :
     mode === "compare_two" ? selectedTeachers.length === 2 :
     selectedTeachers.length >= 2);

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient-gold">Council Chamber</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Selection */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Conversation Mode</h3>
              <RadioGroup value={mode} onValueChange={(v) => handleModeChange(v as ChatMode)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one_sage" id="one_sage" />
                    <Label htmlFor="one_sage" className="cursor-pointer">
                      <div>
                        <div className="font-medium">One Sage</div>
                        <div className="text-sm text-muted-foreground">Deep dive with one teacher</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compare_two" id="compare_two" />
                    <Label htmlFor="compare_two" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Compare Two</div>
                        <div className="text-sm text-muted-foreground">See two perspectives</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="council" id="council" />
                    <Label htmlFor="council" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Full Council</div>
                        <div className="text-sm text-muted-foreground">Multiple sages dialogue</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Tone Selection */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Response Tone</h3>
              <Select value={tone} onValueChange={(v) => setTone(v as ToneType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gentle">Gentle & Compassionate</SelectItem>
                  <SelectItem value="balanced">Balanced & Clear</SelectItem>
                  <SelectItem value="direct">Direct & Straightforward</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            {/* Teacher Selection */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Select {mode === "one_sage" ? "Sage" : mode === "compare_two" ? "Two Sages" : "Sages"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {mode === "one_sage" && "Choose one teacher"}
                {mode === "compare_two" && `Selected: ${selectedTeachers.length}/2`}
                {mode === "council" && `Selected: ${selectedTeachers.length} (min 2)`}
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {teachers?.map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => handleTeacherSelect(teacher.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTeachers.includes(teacher.id)
                        ? "bg-primary/20 border-2 border-primary"
                        : "glass-card border border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{teacher.fullName}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {teacher.oneLineEssence}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card h-[calc(100vh-12rem)] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!conversationId && (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <h3 className="text-2xl font-bold mb-2">Welcome to the Council</h3>
                    <p className="text-foreground/70 max-w-md mx-auto">
                      Select your sages and ask your question. The council awaits your inquiry.
                    </p>
                  </div>
                )}

                {messages?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.role === "user"
                          ? "bg-primary/20 border border-primary/30"
                          : "glass-card"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-accent">Council Response</span>
                        </div>
                      )}
                      <Streamdown>{msg.content}</Streamdown>
                    </div>
                  </div>
                ))}

                {sendMessage.isPending && (
                  <div className="flex justify-start">
                    <div className="glass-card rounded-2xl p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-accent" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border/50 p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask your question to the council..."
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!canSend || sendMessage.isPending}
                    size="lg"
                    className="ripple"
                  >
                    {sendMessage.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
