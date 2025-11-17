import { useEffect, useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { motion, useAnimation } from "framer-motion";

interface SageNode {
  id: number;
  name: string;
  avatarUrl: string | null;
  tradition: string;
  x: number;
  y: number;
  branch: number;
}

interface QuoteLeaf {
  id: number;
  text: string;
  x: number;
  y: number;
  delay: number;
}

const PHILOSOPHICAL_TRADITIONS = [
  { name: "Buddhism", color: "#f59e0b", x: 200 },
  { name: "Stoicism", color: "#8b5cf6", x: 350 },
  { name: "Sufism", color: "#14b8a6", x: 500 },
  { name: "Advaita Vedanta", color: "#ec4899", x: 650 },
  { name: "Existentialism", color: "#3b82f6", x: 800 },
  { name: "Taoism", color: "#10b981", x: 950 },
];

export default function WisdomTree() {
  const { data: teachers } = trpc.teachers.getAll.useQuery();
  const [sageNodes, setSageNodes] = useState<SageNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isGrown, setIsGrown] = useState(false);
  const [quoteLeaves, setQuoteLeaves] = useState<QuoteLeaf[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate tree structure with 36 nodes
  useEffect(() => {
    if (!teachers || teachers.length === 0) return;

    const nodes: SageNode[] = [];
    const centerX = 600;
    const startY = 800;
    const branches = 6; // 6 main branches
    const nodesPerBranch = 6; // 6 nodes per branch = 36 total

    teachers.slice(0, 36).forEach((teacher: any, index: number) => {
      const branchIndex = Math.floor(index / nodesPerBranch);
      const nodeInBranch = index % nodesPerBranch;
      
      // Calculate position using golden ratio spiral
      const angle = (branchIndex * 60) + (nodeInBranch * 10) - 90; // Start from top
      const radius = 80 + (nodeInBranch * 60); // Increase radius as we go up
      
      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = startY - radius * Math.sin((angle * Math.PI) / 180);

      nodes.push({
        id: teacher.id,
        name: teacher.fullName,
        avatarUrl: teacher.avatarUrl,
        tradition: teacher.traditionTags?.[0] || "Wisdom",
        x,
        y,
        branch: branchIndex,
      });
    });

    setSageNodes(nodes);

    // Generate floating quote leaves
    const quotes = [
      "The wound is the place where the Light enters you.",
      "Be the change you wish to see in the world.",
      "The only way out is through.",
      "What you seek is seeking you.",
      "The present moment is all you ever have.",
      "Know thyself.",
      "The obstacle is the way.",
      "Let go or be dragged.",
    ];

    const leaves: QuoteLeaf[] = quotes.map((text, i) => ({
      id: i,
      text,
      x: 200 + Math.random() * 800,
      y: 200 + Math.random() * 400,
      delay: Math.random() * 5,
    }));

    setQuoteLeaves(leaves);
  }, [teachers]);

  // Trigger growth animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsGrown(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate tree paths (branches)
  const generateBranches = () => {
    if (sageNodes.length === 0) return [];

    const centerX = 600;
    const startY = 800;
    const branches: string[] = [];

    // Group nodes by branch
    for (let b = 0; b < 6; b++) {
      const branchNodes = sageNodes.filter(n => n.branch === b);
      if (branchNodes.length === 0) continue;

      let path = `M ${centerX} ${startY}`;
      
      branchNodes.forEach((node, i) => {
        if (i === 0) {
          path += ` L ${node.x} ${node.y}`;
        } else {
          // Smooth curve through nodes
          const prevNode = branchNodes[i - 1];
          const controlX = (prevNode.x + node.x) / 2;
          const controlY = (prevNode.y + node.y) / 2 - 30;
          path += ` Q ${controlX} ${controlY}, ${node.x} ${node.y}`;
        }
      });

      branches.push(path);
    }

    return branches;
  };

  const branches = generateBranches();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1a2e] to-[#0a0e27]">
      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      
      {/* SVG Tree */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for branches */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for nodes */}
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for nodes */}
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f4d03f" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Philosophical Tradition Roots */}
        {PHILOSOPHICAL_TRADITIONS.map((tradition, i) => (
          <g key={tradition.name}>
            <motion.path
              d={`M 600 800 Q ${tradition.x} 850, ${tradition.x} 900`}
              stroke={tradition.color}
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isGrown ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
            />
            <motion.text
              x={tradition.x}
              y={920}
              textAnchor="middle"
              fill={tradition.color}
              fontSize="12"
              fontFamily="serif"
              initial={{ opacity: 0 }}
              animate={isGrown ? { opacity: 0.6 } : {}}
              transition={{ duration: 1, delay: 1 + i * 0.1 }}
            >
              {tradition.name}
            </motion.text>
          </g>
        ))}

        {/* Tree Branches */}
        {branches.map((path, i) => (
          <motion.path
            key={`branch-${i}`}
            d={path}
            stroke="url(#nodeGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isGrown ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
          />
        ))}

        {/* Sage Nodes */}
        {sageNodes.map((node, i) => (
          <g key={node.id}>
            {/* Node glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={hoveredNode === node.id ? 35 : 25}
              fill="url(#nodeGradient)"
              filter="url(#nodeGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isGrown ? { scale: 1, opacity: 0.8 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              style={{
                animation: isGrown ? `pulse 8s ease-in-out infinite ${i * 0.2}s` : "none",
              }}
            />

            {/* Node portrait (clipped to circle) */}
            <defs>
              <clipPath id={`clip-${node.id}`}>
                <circle cx={node.x} cy={node.y} r={hoveredNode === node.id ? 28 : 20} />
              </clipPath>
            </defs>

            {node.avatarUrl && (
              <motion.image
                href={node.avatarUrl}
                x={node.x - (hoveredNode === node.id ? 28 : 20)}
                y={node.y - (hoveredNode === node.id ? 28 : 20)}
                width={hoveredNode === node.id ? 56 : 40}
                height={hoveredNode === node.id ? 56 : 40}
                clipPath={`url(#clip-${node.id})`}
                initial={{ opacity: 0 }}
                animate={isGrown ? { opacity: 0.9 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node.id)}
                className="cursor-pointer"
              />
            )}

            {/* Node border */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={hoveredNode === node.id ? 30 : 22}
              fill="none"
              stroke="#f4d03f"
              strokeWidth={hoveredNode === node.id ? 3 : 2}
              initial={{ scale: 0, opacity: 0 }}
              animate={isGrown ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                setSelectedNode(node.id);
                // Find teacher and navigate
                const teacher = teachers?.find(t => t.id === node.id);
                if (teacher) {
                  window.location.href = `/sages/${teacher.teacherId}`;
                }
              }}
              className="cursor-pointer transition-all duration-300"
            />

            {/* Name label on hover */}
            {hoveredNode === node.id && (
              <motion.text
                x={node.x}
                y={node.y - 45}
                textAnchor="middle"
                fill="#f4d03f"
                fontSize="14"
                fontWeight="600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {node.name}
              </motion.text>
            )}
          </g>
        ))}

        {/* Floating Quote Leaves */}
        {quoteLeaves.map((leaf) => (
          <motion.text
            key={leaf.id}
            x={leaf.x}
            y={leaf.y}
            textAnchor="middle"
            fill="#f4d03f"
            fontSize="11"
            fontStyle="italic"
            opacity="0.4"
            initial={{ opacity: 0, y: 20 }}
            animate={isGrown ? {
              opacity: [0.2, 0.5, 0.2],
              y: [leaf.y, leaf.y - 30, leaf.y],
            } : {}}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: leaf.delay,
              ease: "easeInOut",
            }}
          >
            {leaf.text}
          </motion.text>
        ))}

        {/* Center trunk */}
        <motion.circle
          cx="600"
          cy="800"
          r="40"
          fill="url(#nodeGradient)"
          filter="url(#nodeGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isGrown ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            animation: isGrown ? "pulse 8s ease-in-out infinite" : "none",
          }}
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
