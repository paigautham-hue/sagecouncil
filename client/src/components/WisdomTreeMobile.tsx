/**
 * Mobile Wisdom Tree - Simple static image version
 * Shows the beautiful AI-generated tree background without interactive elements
 * Users can explore sages through the "Meet the Sages" section below
 */
export default function WisdomTreeMobile() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Static wisdom tree background */}
      <img
        src="/wisdom-tree-mobile.png"
        alt="Wisdom Tree - Council of Sages"
        className="w-full h-auto"
      />
    </div>
  );
}
