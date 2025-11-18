import React from 'react';

/**
 * Unified Wisdom Tree Component
 * Displays a beautiful static graphic with integrated sage portraits
 * Works seamlessly on both mobile and desktop
 * Cache-busting: v=4 forces complete rebuild and refresh
 */
export default function WisdomTree(): React.ReactElement {
  return (
    <div className="w-full flex justify-center py-8 md:py-12">
      <img
        src="/wisdom-tree-unified.png?v=4"
        alt="Council of Sages - Wisdom Tree"
        className="w-full max-w-4xl h-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
