import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { SageQuickView } from "@/components/SageQuickView";
import { getSagePortrait, getSageInitials } from "@/lib/sagePortraits";
import { ProgressiveImage } from "@/components/ProgressiveImage";

// Sage positions on the static image (approximate coordinates as percentages)
// These correspond to the portrait positions in the generated image
const SAGE_POSITIONS = [
  // Top center
  { x: 50, y: 14, index: 0 },
  
  // Second row (3 nodes)
  { x: 35, y: 19, index: 1 },
  { x: 65, y: 19, index: 2 },
  
  // Third row (4 nodes)
  { x: 23, y: 26, index: 3 },
  { x: 42, y: 28, index: 4 },
  { x: 58, y: 28, index: 5 },
  { x: 77, y: 26, index: 6 },
  
  // Fourth row (5 nodes)
  { x: 15, y: 35, index: 7 },
  { x: 32, y: 37, index: 8 },
  { x: 50, y: 38, index: 9 },
  { x: 68, y: 37, index: 10 },
  { x: 85, y: 35, index: 11 },
  
  // Fifth row (4 nodes)
  { x: 25, y: 47, index: 12 },
  { x: 42, y: 49, index: 13 },
  { x: 58, y: 49, index: 14 },
  { x: 75, y: 47, index: 15 },
  
  // Bottom row (3 nodes)
  { x: 35, y: 58, index: 16 },
  { x: 50, y: 60, index: 17 },
  { x: 65, y: 58, index: 18 },
];

export default function WisdomTreeMobile() {
  const { data: teachers } = trpc.teachers.getAll.useQuery();
  const [quickViewSage, setQuickViewSage] = useState<any>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const handleSageTap = (index: number) => {
    if (!teachers || teachers.length === 0) return;
    
    const teacher = teachers[index];
    if (!teacher) return;

    // First tap: show tooltip
    if (tappedIndex !== index) {
      setTappedIndex(index);
      return;
    }

    // Second tap: open quick view
    const sage = {
      id: teacher.id.toString(),
      name: teacher.fullName,
      tradition: teacher.traditionTags?.[0] || 'Wisdom Teacher',
      era: teacher.era || 'Ancient',
      bio: teacher.longSummary || teacher.oneLineEssence || '',
      keyTeachings: [],
    };
    setQuickViewSage(sage);
    setShowQuickView(true);
    setTappedIndex(null);
  };

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Static wisdom tree background */}
        <img
          src="/wisdom-tree-mobile.png"
          alt="Wisdom Tree - Council of Sages"
          className="w-full h-auto"
        />

        {/* Overlay actual sage portraits with clickable hotspots */}
        {SAGE_POSITIONS.map((pos) => {
          const teacher = teachers?.[pos.index];
          if (!teacher) return null;

          const portraitUrl = teacher.avatarUrl || getSagePortrait(teacher.fullName);

          return (
            <button
              key={pos.index}
              onClick={() => handleSageTap(pos.index)}
              className="absolute rounded-full transition-all duration-300 overflow-hidden"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: '11%',
                aspectRatio: '1',
                transform: 'translate(-50%, -50%)',
                border: tappedIndex === pos.index 
                  ? '3px solid rgba(251, 191, 36, 1)' 
                  : '2px solid rgba(251, 191, 36, 0.3)',
                boxShadow: tappedIndex === pos.index
                  ? '0 0 20px rgba(251, 191, 36, 0.6)'
                  : '0 0 10px rgba(251, 191, 36, 0.2)',
              }}
              aria-label={`View ${teacher.fullName}`}
            >
              {/* Actual sage portrait or initials fallback */}
              {imageErrors.has(pos.index) ? (
                <div className="w-full h-full bg-gradient-to-br from-violet-600 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                  {getSageInitials(teacher.fullName)}
                </div>
              ) : (
                <img
                  src={portraitUrl}
                  alt={teacher.fullName}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(pos.index)}
                />
              )}

              {/* Tooltip on tap */}
              {tappedIndex === pos.index && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900/95 border border-amber-500/50 rounded-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl">
                  <div className="text-xs font-semibold text-amber-400">
                    {teacher.fullName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {teacher.traditionTags?.[0] || 'Wisdom Teacher'}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1">
                    Tap again to learn more
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick view modal */}
      {showQuickView && quickViewSage && (
        <SageQuickView
          sage={quickViewSage}
          open={showQuickView}
          onOpenChange={(open) => {
            setShowQuickView(open);
            if (!open) setQuickViewSage(null);
          }}
        />
      )}
    </>
  );
}
