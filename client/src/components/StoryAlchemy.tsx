import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen } from "lucide-react";
import { Streamdown } from "streamdown";
import { motion } from "framer-motion";

export function StoryAlchemy() {
  const { data: stories, isLoading } = trpc.storyAlchemy.getUserStories.useQuery();

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
        </div>
      </Card>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-amber-500/20">
              <BookOpen className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-amber-100 mb-2">
              No Stories Yet
            </h4>
            <p className="text-amber-300/70 max-w-md mx-auto">
              Transform your journal entries into timeless parables through a teacher's lens.
              Look for the "Turn into Story" button on your journal entries.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-amber-500/20">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-amber-100 mb-2">
              Story Alchemy
            </h3>
            <p className="text-amber-300/70 max-w-2xl">
              Your personal experiences transformed into universal parables.
              Each story preserves the emotional truth while making it timeless and archetypal.
            </p>
          </div>
        </div>
      </Card>

      {/* Stories */}
      <div className="space-y-6">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/20">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h4 className="text-2xl font-serif text-amber-100 mb-2">
                    {story.title}
                  </h4>
                  <p className="text-sm text-amber-300/60">
                    {new Date(story.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Story Content */}
                <div className="prose prose-invert prose-amber max-w-none">
                  <div className="text-amber-100/90 leading-relaxed text-lg">
                    <Streamdown>{story.storyContent}</Streamdown>
                  </div>
                </div>

                {/* Attribution */}
                <div className="pt-4 border-t border-amber-500/20">
                  <p className="text-sm text-amber-300/60 italic">
                    Transformed through the lens of {story.teacherId}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
