import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, MessageCircle, BookOpen, Lightbulb, Quote } from "lucide-react";
import { getSagePortrait } from "@/lib/sagePortraits";
import { Streamdown } from "streamdown";
import { QuoteCard } from "@/components/QuoteCard";
import { TeacherBiography } from "@/components/TeacherBiography";
import { IntegrationGuide } from "@/components/IntegrationGuide";
import { useState } from "react";

export default function SageDetail() {
  const { teacherId } = useParams();
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  
  const { data: teacher, isLoading } = trpc.teachers.getByTeacherId.useQuery(
    { teacherId: teacherId! },
    { enabled: !!teacherId }
  );
  
  const { data: keyIdeas } = trpc.teachers.getKeyIdeas.useQuery(
    { teacherId: teacher?.id! },
    { enabled: !!teacher?.id }
  );
  
  const { data: practices } = trpc.teachers.getPractices.useQuery(
    { teacherId: teacher?.id! },
    { enabled: !!teacher?.id }
  );
  
  const { data: quotes } = trpc.quotes.getByTeacher.useQuery(
    { teacherId: teacher?.id! },
    { enabled: !!teacher?.id }
  );
  
  const { data: biography } = trpc.teachers.getBiography.useQuery(
    { teacherId: teacher?.id! },
    { enabled: !!teacher?.id }
  );
  
  const { data: integrationGuide } = trpc.teachers.getIntegrationGuide.useQuery(
    { teacherId: teacher?.id! },
    { enabled: !!teacher?.id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse mx-auto mb-4" />
          <p className="text-foreground/70">Loading sage...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sage Not Found</h2>
          <Link href="/sages">
            <Button>Return to Library</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/sages">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Link href={`/council?mode=one_sage`}>
              <Button className="ripple">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-6 sage-avatar overflow-hidden">
            <img
              src={getSagePortrait(teacher.teacherId)}
              alt={teacher.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-5xl font-bold text-foreground hidden" id={`avatar-${teacher.id}`}>
              {teacher.fullName.charAt(0)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{teacher.fullName}</h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {teacher.era && (
              <span className="text-lg text-accent">{teacher.era}</span>
            )}
            {teacher.traditionTags && teacher.traditionTags.length > 0 && (
              <span className="px-4 py-2 rounded-full bg-muted/30 text-sm">
                {teacher.traditionTags.join(', ')}
              </span>
            )}
          </div>
          
          {teacher.oneLineEssence && (
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto italic">
              "{teacher.oneLineEssence}"
            </p>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-4xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biography">Biography</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="ideas">Key Ideas</TabsTrigger>
            <TabsTrigger value="practices">Practices</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-accent" />
                Overview
              </h3>
              <div className="space-y-4 text-foreground/80">
                <p>{teacher.shortSummary}</p>
                {teacher.longSummary && (
                  <p className="pt-4 border-t border-border/30">{teacher.longSummary}</p>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="biography" className="space-y-6">
            {biography ? (
              <TeacherBiography 
                biography={{
                  lifeStory: biography.lifeStory || '',
                  historicalContext: biography.historicalContext || '',
                  keyLifeEvents: Array.isArray(biography.keyLifeEvents)
                    ? biography.keyLifeEvents.map((e: any) => `${e.event}\n${e.context}`).join('\n\n')
                    : (biography.keyLifeEvents || ''),
                  influencesReceived: Array.isArray(biography.influencesReceived)
                    ? biography.influencesReceived.join('\n\n')
                    : (biography.influencesReceived || ''),
                  influencesGiven: Array.isArray(biography.influencesGiven)
                    ? biography.influencesGiven.join('\n\n')
                    : (biography.influencesGiven || ''),
                  legacyImpact: biography.legacyImpact || '',
                }} 
                teacherName={teacher.fullName} 
              />
            ) : (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70">Biography not available yet.</p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-6">
            {integrationGuide ? (
              <IntegrationGuide 
                guide={{
                  beginnerPath: integrationGuide.beginnerPath || '',
                  intermediatePath: integrationGuide.intermediatePath || '',
                  advancedPath: integrationGuide.advancedPath || '',
                  dailyIntegration: Array.isArray(integrationGuide.dailyIntegration) 
                    ? integrationGuide.dailyIntegration.join('\n\n') 
                    : (integrationGuide.dailyIntegration || ''),
                  complementaryTeachers: Array.isArray(integrationGuide.complementaryTeachers)
                    ? integrationGuide.complementaryTeachers.join('\n\n')
                    : (integrationGuide.complementaryTeachers || ''),
                  potentialPitfalls: Array.isArray(integrationGuide.potentialPitfalls)
                    ? integrationGuide.potentialPitfalls.join('\n\n')
                    : (integrationGuide.potentialPitfalls || ''),
                  signsOfProgress: Array.isArray(integrationGuide.signsOfProgress)
                    ? integrationGuide.signsOfProgress.join('\n\n')
                    : (integrationGuide.signsOfProgress || ''),
                }} 
                teacherName={teacher.fullName} 
              />
            ) : (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70">Integration guide not available yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ideas" className="space-y-6">
            {keyIdeas && keyIdeas.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {keyIdeas.map((idea, idx) => (
                  <Card key={idx} className="glass-card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <h4 className="text-lg font-bold">{idea.name}</h4>
                    </div>
                    <Streamdown>{idea.clearExplanation || ''}</Streamdown>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70">No key ideas available yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="practices" className="space-y-6">
            {practices && practices.length > 0 ? (
              <div className="space-y-6">
                {practices.map((practice, idx) => (
                  <Card key={idx} className="glass-card p-8">
                    <h4 className="text-2xl font-bold mb-4">{practice.name}</h4>
                    <Streamdown>{practice.stepByStep || ''}</Streamdown>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70">No practices available yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            {selectedQuote ? (
              <div className="max-w-2xl mx-auto">
                <Button
                  onClick={() => setSelectedQuote(null)}
                  variant="ghost"
                  size="sm"
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to all quotes
                </Button>
                <QuoteCard
                  quote={selectedQuote}
                  teacherName={teacher?.fullName || ''}
                  teacherId={teacher?.teacherId || ''}
                />
              </div>
            ) : quotes && quotes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {quotes.map((quote, idx) => (
                  <Card
                    key={idx}
                    className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => setSelectedQuote(quote.text)}
                  >
                    <Quote className="w-8 h-8 text-accent/30 mb-3" />
                    <p className="text-lg italic mb-4">"{quote.text}"</p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>Click to share</span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70">No quotes available yet.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
