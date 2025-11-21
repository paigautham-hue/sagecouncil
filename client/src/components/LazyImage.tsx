import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  rootMargin?: string;
  showSkeleton?: boolean;
}

/**
 * Optimized lazy loading image component for sage portraits
 * - Uses Intersection Observer to load images only when near viewport
 * - Shows skeleton placeholder while loading
 * - Smooth fade-in animation when image loads
 * - Ideal for image grids with many items
 */
export function LazyImage({
  src,
  alt,
  className = "",
  rootMargin = "100px",
  showSkeleton = true,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [rootMargin]);

  // Load image once visible
  useEffect(() => {
    if (!isVisible) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(true); // Still mark as loaded to remove skeleton
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isVisible, src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-transparent animate-pulse" />
      )}

      {/* Actual image */}
      {isVisible && imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Fallback background if image fails to load */}
      {isVisible && !imageSrc && (
        <div className="w-full h-full bg-gradient-to-br from-violet-900/20 to-purple-900/10 flex items-center justify-center">
          <div className="text-xs text-muted-foreground">Image unavailable</div>
        </div>
      )}
    </div>
  );
}
