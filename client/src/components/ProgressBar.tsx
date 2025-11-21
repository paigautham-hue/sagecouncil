import React from 'react';

interface ProgressBarProps {
  /**
   * Progress percentage (0-100)
   */
  percentage: number;
  /**
   * Height of the progress bar (in Tailwind units)
   */
  height?: 'h-1' | 'h-2' | 'h-3' | 'h-4';
  /**
   * Color scheme for the progress bar
   */
  color?: 'accent' | 'green' | 'blue' | 'purple' | 'gold';
  /**
   * Whether to show percentage text
   */
  showLabel?: boolean;
  /**
   * Custom label text
   */
  label?: string;
  /**
   * Whether to show animated stripes
   */
  animated?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 'h-2',
  color = 'accent',
  showLabel = true,
  label,
  animated = true,
  className = '',
}) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const colorClasses = {
    accent: 'bg-accent',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    gold: 'bg-yellow-500',
  };

  const bgColorClass = colorClasses[color];

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {/* Progress bar container */}
      <div className={`w-full ${height} bg-foreground/10 rounded-full overflow-hidden`}>
        {/* Progress fill */}
        <div
          className={`${height} ${bgColorClass} transition-all duration-500 ease-out rounded-full ${
            animated ? 'relative overflow-hidden' : ''
          }`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {/* Animated stripes */}
          {animated && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, rgba(255,255,255,.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.2) 75%, transparent 75%, transparent)',
                backgroundSize: '1rem 1rem',
                animation: 'progress-animation 2s linear infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/70">{label || 'Progress'}</span>
          <span className="text-foreground/90 font-medium">{clampedPercentage}%</span>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes progress-animation {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
