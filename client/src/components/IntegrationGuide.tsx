import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  GraduationCap, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  Users, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

interface IntegrationGuideProps {
  guide: {
    beginnerPath: string;
    intermediatePath: string;
    advancedPath: string;
    dailyIntegration: string;
    complementaryTeachers: string;
    potentialPitfalls: string;
    signsOfProgress: string;
  };
  teacherName: string;
}

export function IntegrationGuide({ guide, teacherName }: IntegrationGuideProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <CardTitle>Integration Guide</CardTitle>
        </div>
        <CardDescription>
          A structured path to integrate {teacherName}'s teachings into your daily life
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="beginner">
              <span className="hidden sm:inline">Beginner</span>
              <span className="sm:hidden">Begin</span>
            </TabsTrigger>
            <TabsTrigger value="intermediate">
              <span className="hidden sm:inline">Intermediate</span>
              <span className="sm:hidden">Inter</span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <span className="hidden sm:inline">Advanced</span>
              <span className="sm:hidden">Adv</span>
            </TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="teachers">
              <span className="hidden sm:inline">Teachers</span>
              <span className="sm:hidden">More</span>
            </TabsTrigger>
            <TabsTrigger value="pitfalls">
              <span className="hidden sm:inline">Pitfalls</span>
              <span className="sm:hidden">Watch</span>
            </TabsTrigger>
            <TabsTrigger value="progress">
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">Signs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beginner" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Level 1</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Beginner Path
                  </h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {guide.beginnerPath}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="intermediate" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Level 2</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Intermediate Path
                  </h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {guide.intermediatePath}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Level 3</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Advanced Path
                  </h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {guide.advancedPath}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="daily" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Daily Integration Tips</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {guide.dailyIntegration.split('\n\n').map((tip, index) => (
                        <Alert key={index}>
                          <AlertDescription className="text-sm leading-relaxed">
                            {tip}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Complementary Teachers</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {guide.complementaryTeachers}
                    </p>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pitfalls" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Potential Pitfalls</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {guide.potentialPitfalls.split('\n\n').map((pitfall, index) => (
                        <Alert key={index} variant="destructive" className="bg-amber-50 border-amber-200 dark:bg-amber-950/20">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm leading-relaxed text-foreground">
                            {pitfall}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Signs of Progress</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {guide.signsOfProgress.split('\n\n').map((sign, index) => (
                        <Alert key={index} className="bg-green-50 border-green-200 dark:bg-green-950/20">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-sm leading-relaxed">
                            {sign}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
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
