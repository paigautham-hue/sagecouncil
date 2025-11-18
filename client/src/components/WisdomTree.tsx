import { useEffect, useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface SageNode {
  id: number;
  name: string;
  avatarUrl: string | null;
  tradition: string;
  teacherId: string;
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
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate tree structure with 36 nodes (18 on mobile)
  useEffect(() => {
    if (!teachers || teachers.length === 0) return;

    const nodes: SageNode[] = [];
    const centerX = isMobile ? 300 : 600;
    const startY = isMobile ? 400 : 800;
    const branches = isMobile ? 6 : 6; // Keep 6 branches
    const maxNodes = isMobile ? 18 : 36; // Reduce nodes on mobile
    const nodesPerBranch = Math.floor(maxNodes / branches);

    teachers.slice(0, maxNodes).forEach((teacher: any, index: number) => {
      const branchIndex = Math.floor(index / nodesPerBranch);
      const nodeInBranch = index % nodesPerBranch;
      
      // Calculate position using golden ratio spiral
      const angle = (branchIndex * 60) + (nodeInBranch * 10) - 90; // Start from top
      const baseRadius = isMobile ? 40 : 80;
      const radiusIncrement = isMobile ? 30 : 60;
      const radius = baseRadius + (nodeInBranch * radiusIncrement); // Increase radius as we go up
      
      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = startY - radius * Math.sin((angle * Math.PI) / 180);

      nodes.push({
        id: teacher.id,
        name: teacher.fullName,
        avatarUrl: teacher.avatarUrl,
        tradition: teacher.traditionTags?.[0] || "Wisdom",
        teacherId: teacher.teacherId,
        x,
        y,
        branch: branchIndex,
      });
    });

    setSageNodes(nodes);

    // Generate floating quote leaves (fewer on mobile)
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

    const maxQuotes = isMobile ? 4 : 8;
    const maxWidth = isMobile ? 400 : 800;
    const maxHeight = isMobile ? 200 : 400;
    const leaves: QuoteLeaf[] = quotes.slice(0, maxQuotes).map((text, i) => ({
      id: i,
      text,
      x: (isMobile ? 100 : 200) + Math.random() * maxWidth,
      y: (isMobile ? 100 : 200) + Math.random() * maxHeight,
      delay: Math.random() * 5,
    }));

    setQuoteLeaves(leaves);
  }, [teachers, isMobile]);

  // Trigger growth animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsGrown(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate tree paths (branches)
  const generateBranches = () => {
    if (sageNodes.length === 0) return [];

    const centerX = isMobile ? 300 : 600;
    const startY = isMobile ? 400 : 800;
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

  // Touch gesture handlers for mobile
  const bind = useGesture(
    {
      onPinch: ({ offset: [scale] }) => {
        if (isMobile) {
          setScale(Math.max(0.5, Math.min(3, scale)));
        }
      },
      onDrag: ({ offset: [x, y], pinching }) => {
        if (isMobile && !pinching) {
          setPosition({ x, y });
        }
      },
    },
    {
      drag: { from: () => [position.x, position.y] },
      pinch: { scaleBounds: { min: 0.5, max: 3 }, from: () => [scale, 0] },
    }
  );

  // Reset view to original position and scale
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1a2e] to-[#0a0e27]"
      {...(isMobile ? bind() : {})}
      style={{ touchAction: isMobile ? 'none' : 'auto' }}
    >
      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      
      {/* Reset button for mobile */}
      {isMobile && (scale !== 1 || position.x !== 0 || position.y !== 0) && (
        <Button
          onClick={resetView}
          size="sm"
          variant="outline"
          className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
      )}

      {/* SVG Tree */}
      <div
        style={{
          transform: isMobile ? `translate(${position.x}px, ${position.y}px) scale(${scale})` : 'none',
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox={isMobile ? "0 0 600 500" : "0 0 1200 900"}
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

        {/* Philosophical Tradition Roots (hidden on mobile) */}
        {!isMobile && PHILOSOPHICAL_TRADITIONS.map((tradition, i) => (
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
              fontFamily="Cinzel, serif"
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
              r={hoveredNode === node.id ? (isMobile ? 20 : 35) : (isMobile ? 15 : 25)}
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
                <circle cx={node.x} cy={node.y} r={hoveredNode === node.id ? (isMobile ? 16 : 28) : (isMobile ? 12 : 20)} />
              </clipPath>
            </defs>

            {node.avatarUrl && (
              <motion.image
                href={node.avatarUrl}
                x={node.x - (hoveredNode === node.id ? (isMobile ? 16 : 28) : (isMobile ? 12 : 20))}
                y={node.y - (hoveredNode === node.id ? (isMobile ? 16 : 28) : (isMobile ? 12 : 20))}
                width={hoveredNode === node.id ? (isMobile ? 32 : 56) : (isMobile ? 24 : 40)}
                height={hoveredNode === node.id ? (isMobile ? 32 : 56) : (isMobile ? 24 : 40)}
                clipPath={`url(#clip-${node.id})`}
                initial={{ opacity: 0 }}
                animate={isGrown ? { opacity: 0.9 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  setSelectedNode(node.id);
                  window.location.href = `/sages/${node.teacherId}`;
                }}
                className="cursor-pointer transition-all duration-300"
              />
            )}

            {/* Node border */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={hoveredNode === node.id ? (isMobile ? 18 : 30) : (isMobile ? 14 : 22)}
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
                window.location.href = `/sages/${node.teacherId}`;
              }}
              className="cursor-pointer"
            />

            {/* Name label on hover */}
            {hoveredNode === node.id && (
              <motion.text
                x={node.x}
                y={node.y - (isMobile ? 25 : 45)}
                textAnchor="middle"
                fill="#f4d03f"
                fontSize={isMobile ? "10" : "14"}
                fontWeight="600"
                fontFamily="Cinzel, serif"
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
            fontSize={isMobile ? "9" : "11"}
            fontStyle="italic"
            fontFamily="Cormorant Garamond, serif"
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
          cx={isMobile ? "300" : "600"}
          cy={isMobile ? "400" : "800"}
          r={isMobile ? "25" : "40"}
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
      </div>

      {/* Floating particles (fewer on mobile) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
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
