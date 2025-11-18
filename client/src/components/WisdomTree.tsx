/**
 * Wisdom Tree - Static Graphic Component
 * Displays a beautiful, unified static image with integrated sage portraits
 * This component works seamlessly on all devices (mobile, tablet, desktop)
 * No interactive SVG, no animations - just a stunning visual
 * Uses wisdom-tree-final.png to ensure fresh deployment
 * FORCE REBUILD: 2025-11-18 08:30 UTC - Clearing old cached build
 */

export default function WisdomTree() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <picture>
        <img
          src="/wisdom-tree-final.png"
          alt="The Council of Sages - Wisdom Tree with 19 Sage Portraits"
          className="w-full h-auto"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}
