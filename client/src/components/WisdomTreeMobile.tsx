/**
 * Unified Wisdom Tree Component (Mobile)
 * Displays the same beautiful static graphic as desktop
 * Single unified visual across all devices
 */
export default function WisdomTreeMobile() {
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
