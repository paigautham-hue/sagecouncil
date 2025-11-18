import { useState } from "react";
import { getSagePortrait } from "@/lib/sagePortraits";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Search, Filter } from "lucide-react";

export default function Sages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");

  const { data: teachers, isLoading } = trpc.teachers.getAll.useQuery();
  const { data: themes } = trpc.themes.getAll.useQuery();

  const filteredTeachers = teachers?.filter((teacher) => {
    const matchesSearch = 
      teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.oneLineEssence?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTheme = selectedTheme === "all";
    
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="min-h-screen cosmic-bg">
      <nav className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient-gold">Library of Sages</h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="text-gradient-violet">Timeless Wisdom</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover the teachings of {teachers?.length || 0} spiritual masters from diverse traditions and eras.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, tradition, or essence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Filter by theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  {themes?.map((theme) => (
                    <SelectItem key={theme.id} value={theme.label}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTeachers?.length || 0} of {teachers?.length || 0} sages
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-card p-6 animate-pulse">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4" />
                <div className="h-6 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded" />
              </Card>
            ))}
          </div>
        ) : filteredTeachers && filteredTeachers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Link key={teacher.id} href={`/sages/${teacher.teacherId}`}>
                <Card className="glass-card p-6 cursor-pointer group h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <ProgressiveImage
                      src={getSagePortrait(teacher.teacherId)}
                      alt={teacher.fullName}
                      className="w-24 h-24 rounded-full object-cover mb-4 sage-avatar"
                    />
                    
                    <h3 className="text-xl font-bold mb-2">{teacher.fullName}</h3>
                    
                    {teacher.era && (
                      <p className="text-sm text-accent mb-2">{teacher.era}</p>
                    )}
                    
                    {teacher.traditionTags && teacher.traditionTags.length > 0 && (
                      <p className="text-xs text-muted-foreground mb-3 px-3 py-1 rounded-full bg-muted/30">
                        {teacher.traditionTags[0]}
                      </p>
                    )}
                    
                    {teacher.oneLineEssence && (
                      <p className="text-sm text-foreground/80 line-clamp-3 flex-1">
                        {teacher.oneLineEssence}
                      </p>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-4 group-hover:bg-primary/20 transition-colors"
                    >
                      Explore Teachings
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/70">No sages found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
