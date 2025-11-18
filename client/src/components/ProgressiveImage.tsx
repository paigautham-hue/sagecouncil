import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
}

/**
 * Progressive image component with blur-up placeholder effect
 * Loads a low-quality placeholder first, then transitions to full image
 */
export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholderSrc,
  onLoad,
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create a new image element to preload the full-res image
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      // If image fails to load, still show something
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? "blur-sm scale-110" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          filter: isLoading ? "blur(10px)" : "none",
          transform: isLoading ? "scale(1.1)" : "scale(1)",
          transition: "filter 0.3s ease-out, transform 0.3s ease-out",
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent animate-pulse" />
      )}
    </div>
  );
}
