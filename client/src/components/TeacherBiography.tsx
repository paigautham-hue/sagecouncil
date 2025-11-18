import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, History, Users, Sparkles } from "lucide-react";

interface TeacherBiographyProps {
  biography: {
    lifeStory: string;
    historicalContext: string;
    keyLifeEvents: string;
    influencesReceived: string;
    influencesGiven: string;
    legacyImpact: string;
  };
  teacherName: string;
}

export function TeacherBiography({ biography, teacherName }: TeacherBiographyProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Life & Legacy</CardTitle>
        </div>
        <CardDescription>
          Explore the life journey, influences, and lasting impact of {teacherName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="life-story" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="life-story">Life Story</TabsTrigger>
            <TabsTrigger value="context">Historical Context</TabsTrigger>
            <TabsTrigger value="events">Key Events</TabsTrigger>
            <TabsTrigger value="influences-in">Influences Received</TabsTrigger>
            <TabsTrigger value="influences-out">Influences Given</TabsTrigger>
            <TabsTrigger value="legacy">Legacy</TabsTrigger>
          </TabsList>

          <TabsContent value="life-story" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Life Story</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {biography.lifeStory}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="context" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <History className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Historical Context</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {biography.historicalContext}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Life Events</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {biography.keyLifeEvents.split('\n\n').map((event, index) => (
                        <div key={index} className="border-l-2 border-primary/30 pl-4 py-2">
                          <p className="text-muted-foreground leading-relaxed">{event}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="influences-in" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Influences Received</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {biography.influencesReceived}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="influences-out" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Influences Given</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {biography.influencesGiven}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legacy" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Legacy & Impact</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {biography.legacyImpact}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
