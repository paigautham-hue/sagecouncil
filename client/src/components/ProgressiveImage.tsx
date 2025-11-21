import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
  lazy?: boolean; // Enable lazy loading with Intersection Observer
  rootMargin?: string; // Margin around viewport for lazy loading trigger
}

/**
 * Progressive image component with blur-up placeholder effect and optional lazy loading
 * - Loads a low-quality placeholder first, then transitions to full image
 * - When lazy=true, uses Intersection Observer to only load images when near viewport
 * - Improves performance for pages with many images (e.g., sage library with 36 portraits)
 */
export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholderSrc,
  onLoad,
  lazy = true,
  rootMargin = "50px",
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(!lazy); // Start loading immediately if not lazy
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return; // Skip if not using lazy loading or already loading

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When image enters viewport (with margin), start loading
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin, // Start loading before image enters viewport
        threshold: 0.01, // Trigger when even 1% of image is visible
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
  }, [lazy, shouldLoad, rootMargin]);

  // Load the full image once shouldLoad is true
  useEffect(() => {
    if (!shouldLoad) return;

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
  }, [src, shouldLoad, onLoad]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {shouldLoad ? (
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
      ) : (
        // Placeholder skeleton while waiting for image to enter viewport
        <div className="w-full h-full bg-gradient-to-br from-violet-900/20 to-transparent animate-pulse" />
      )}
      {isLoading && shouldLoad && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent animate-pulse" />
      )}
    </div>
  );
}
