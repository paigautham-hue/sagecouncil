import { useEffect, useState } from "react";

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    // Update on mount
    updateScrollProgress();

    // Update on scroll with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, oklch(0.55 0.25 290) 0%, oklch(0.70 0.15 85) 50%, oklch(0.55 0.15 200) 100%)',
        width: `${scrollProgress}%`,
        transition: 'width 0.1s ease-out',
        boxShadow: scrollProgress > 0 ? '0 0 10px oklch(0.55 0.25 290 / 0.5)' : 'none',
      }}
    />
  );
}
