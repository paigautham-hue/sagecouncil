import { useEffect, useRef } from "react";

/**
 * Ancient Temple Portal - Mind-blowing animated hero element
 * Features: Glowing pillars, swirling cosmic energy, floating light particles
 */
export function TemplePortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for floating lights
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 0.8 - 0.2; // Float upward
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.random() * 60 + 30; // Gold range
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.002;

        // Reset particle when it fades or goes off screen
        if (this.opacity <= 0 || this.y < 0 || this.x < 0 || this.x > width) {
          this.x = Math.random() * width;
          this.y = height;
          this.opacity = Math.random() * 0.5 + 0.3;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 1)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height)
      );
    }

    // Animation variables
    let frame = 0;
    let animationId: number;

    // Draw temple portal
    const drawPortal = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Pulsing portal energy in center
      const pulseSize = 120 + Math.sin(frame * 0.02) * 20;
      const pulseOpacity = 0.3 + Math.sin(frame * 0.02) * 0.15;

      // Inner cosmic energy
      const energyGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        pulseSize
      );
      energyGradient.addColorStop(0, `rgba(138, 43, 226, ${pulseOpacity})`); // Violet
      energyGradient.addColorStop(0.5, `rgba(218, 165, 32, ${pulseOpacity * 0.6})`); // Gold
      energyGradient.addColorStop(1, "rgba(138, 43, 226, 0)");

      ctx.fillStyle = energyGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Swirling energy rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = pulseSize + i * 40;
        const ringOpacity = (0.2 - i * 0.05) * (1 + Math.sin(frame * 0.03 + i) * 0.3);

        ctx.save();
        ctx.globalAlpha = ringOpacity;
        ctx.strokeStyle = i % 2 === 0 ? "#DAA520" : "#8A2BE2";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw temple pillars (left and right)
      const pillarWidth = 40;
      const pillarHeight = height * 0.8;
      const pillarGap = width * 0.4;

      // Left pillar
      const leftPillarX = centerX - pillarGap / 2;
      drawPillar(ctx, leftPillarX, centerY - pillarHeight / 2, pillarWidth, pillarHeight, frame);

      // Right pillar
      const rightPillarX = centerX + pillarGap / 2;
      drawPillar(
        ctx,
        rightPillarX,
        centerY - pillarHeight / 2,
        pillarWidth,
        pillarHeight,
        frame
      );

      // Draw connecting arch
      drawArch(ctx, leftPillarX + pillarWidth, rightPillarX, centerY - pillarHeight / 2, frame);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx);
      });

      frame++;
      animationId = requestAnimationFrame(drawPortal);
    };

    // Draw glowing pillar
    const drawPillar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      frame: number
    ) => {
      // Pillar body with gradient
      const pillarGradient = ctx.createLinearGradient(x, y, x + width, y);
      pillarGradient.addColorStop(0, "rgba(218, 165, 32, 0.1)");
      pillarGradient.addColorStop(0.5, "rgba(218, 165, 32, 0.3)");
      pillarGradient.addColorStop(1, "rgba(218, 165, 32, 0.1)");

      ctx.fillStyle = pillarGradient;
      ctx.fillRect(x, y, width, height);

      // Glowing edges
      const glowIntensity = 0.6 + Math.sin(frame * 0.03) * 0.3;
      ctx.strokeStyle = `rgba(218, 165, 32, ${glowIntensity})`;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Vertical energy lines
      for (let i = 0; i < 3; i++) {
        const lineX = x + (width / 4) * (i + 1);
        const lineOpacity = 0.3 + Math.sin(frame * 0.05 + i) * 0.2;
        ctx.strokeStyle = `rgba(138, 43, 226, ${lineOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lineX, y);
        ctx.lineTo(lineX, y + height);
        ctx.stroke();
      }

      // Pillar cap (top)
      const capHeight = 20;
      const capGradient = ctx.createLinearGradient(x - 10, y - capHeight, x + width + 10, y);
      capGradient.addColorStop(0, "rgba(218, 165, 32, 0.2)");
      capGradient.addColorStop(0.5, "rgba(218, 165, 32, 0.6)");
      capGradient.addColorStop(1, "rgba(218, 165, 32, 0.2)");

      ctx.fillStyle = capGradient;
      ctx.fillRect(x - 10, y - capHeight, width + 20, capHeight);

      // Cap glow
      ctx.strokeStyle = `rgba(218, 165, 32, ${glowIntensity})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 10, y - capHeight, width + 20, capHeight);
    };

    // Draw connecting arch
    const drawArch = (
      ctx: CanvasRenderingContext2D,
      leftX: number,
      rightX: number,
      topY: number,
      frame: number
    ) => {
      const archHeight = 60;
      const centerX = (leftX + rightX) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(leftX, topY);
      ctx.quadraticCurveTo(centerX, topY - archHeight, rightX, topY);

      const glowIntensity = 0.6 + Math.sin(frame * 0.03) * 0.3;
      ctx.strokeStyle = `rgba(218, 165, 32, ${glowIntensity})`;
      ctx.lineWidth = 4;
      ctx.stroke();

      // Inner arch glow
      ctx.strokeStyle = `rgba(138, 43, 226, ${glowIntensity * 0.7})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    drawPortal();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
}
