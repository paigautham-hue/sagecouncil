/**
 * Unified Wisdom Tree Component
 * Displays a beautiful static graphic with integrated sage portraits
 * Works seamlessly on both mobile and desktop
 */
export default function WisdomTree() {
  return (
    <div className="w-full flex justify-center py-8 md:py-12">
      <img
        src="/wisdom-tree-unified.png"
        alt="Council of Sages - Wisdom Tree"
        className="w-full max-w-4xl h-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}
