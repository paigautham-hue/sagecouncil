import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Info } from "lucide-react";
import ForceGraph2D from "react-force-graph-2d";

interface Node {
  id: string;
  label: string;
  type: "theme" | "teacher";
  value: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
}

export function InnerConstellation() {
  const { data, isLoading } = trpc.constellation.getData.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  });
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (!data) return;

    // Create nodes for themes
    const themeNodes: Node[] = data.themes.map((theme) => ({
      id: `theme-${theme.id}`,
      label: theme.label,
      type: "theme" as const,
      value: theme.interactionCount * 3,
      color: "#a855f7", // violet
    }));

    // Create nodes for teachers
    const teacherNodes: Node[] = data.teachers.map((teacher) => ({
      id: `teacher-${teacher.id}`,
      label: teacher.name,
      type: "teacher" as const,
      value: teacher.interactionCount * 2,
      color: "#f59e0b", // amber
    }));

    // Create links between teachers and themes
    // For now, we'll create a simple connection pattern
    // In a more sophisticated version, this would be based on actual relationships
    const links: Link[] = [];
    
    // Connect teachers to themes they've discussed
    data.teachers.forEach((teacher, idx) => {
      const themeIdx = idx % data.themes.length;
      if (data.themes[themeIdx]) {
        links.push({
          source: `teacher-${teacher.id}`,
          target: `theme-${data.themes[themeIdx].id}`,
        });
      }
    });

    setGraphData({
      nodes: [...themeNodes, ...teacherNodes],
      links,
    });
  }, [data]);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
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

  if (!data || (data.themes.length === 0 && data.teachers.length === 0)) {
    return (
      <Card className="p-8 bg-gradient-to-br from-violet-950/40 to-purple-950/40 border-violet-500/20">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-violet-500/20">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-violet-100 mb-2">
              Your Inner Constellation Awaits
            </h3>
            <p className="text-violet-300/70 max-w-md mx-auto">
              As you explore themes and engage with the sages, your unique constellation
              will emerge—a living map of your inner work.
            </p>
          </div>
          <div className="pt-4">
            <Button
              onClick={() => window.location.href = "/council"}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-violet-950/40 to-purple-950/40 border-violet-500/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-full bg-violet-500/20">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-serif text-violet-100 mb-2">Your Inner Constellation</h3>
            <p className="text-sm text-violet-300/70">
              A living map of your spiritual exploration. Larger nodes show areas you've explored more deeply.
            </p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden bg-black/30 border border-violet-500/20">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel="label"
            nodeVal="value"
            nodeColor="color"
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const label = node.label;
              const fontSize = 12 / globalScale;
              const nodeRadius = Math.sqrt(node.value) * 2;

              // Draw node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
              ctx.fillStyle = node.color;
              ctx.fill();

              // Add glow effect
              ctx.shadowBlur = 10;
              ctx.shadowColor = node.color;
              ctx.fill();
              ctx.shadowBlur = 0;

              // Draw label
              ctx.font = `${fontSize}px Inter, sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#ffffff";
              ctx.fillText(label, node.x, node.y + nodeRadius + fontSize);
            }}
            onNodeClick={handleNodeClick}
            linkColor={() => "rgba(139, 92, 246, 0.2)"}
            linkWidth={1}
            backgroundColor="transparent"
            width={800}
            height={500}
            cooldownTicks={100}
            d3VelocityDecay={0.3}
          />
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
            <span className="text-violet-300/70">Themes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-violet-300/70">Teachers</span>
          </div>
        </div>
      </Card>

      {selectedNode && (
        <Card className="p-6 bg-gradient-to-br from-amber-950/30 to-orange-950/30 border-amber-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-amber-100 mb-1">
                {selectedNode.label}
              </h4>
              <p className="text-sm text-amber-300/70">
                {selectedNode.type === "theme"
                  ? `You've explored this theme ${Math.floor(selectedNode.value / 3)} times`
                  : `You've engaged with this teacher ${Math.floor(selectedNode.value / 2)} times`}
              </p>
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/20 text-amber-300 hover:bg-amber-500/10"
                  onClick={() => {
                    if (selectedNode.type === "theme") {
                      window.location.href = "/council";
                    } else {
                      window.location.href = "/sages";
                    }
                  }}
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
