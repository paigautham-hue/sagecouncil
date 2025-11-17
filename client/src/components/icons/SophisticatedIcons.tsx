// Sophisticated icon components to replace cartoonish lucide-react icons
// Design philosophy: Mystical, elegant, premium aesthetic

interface IconProps {
  className?: string;
  size?: number;
}

// Lotus flower for spiritual awakening / Deep Drop
export const LotusIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 2C12 2 8 6 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 6 12 2 12 2Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M7 8C7 8 4 10 4 13C4 14.6569 5.34315 16 7 16C8.65685 16 10 14.6569 10 13C10 10 7 8 7 8Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M17 8C17 8 20 10 20 13C20 14.6569 18.6569 16 17 16C15.3431 16 14 14.6569 14 13C14 10 17 8 17 8Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M5 14C5 14 3 16 3 18.5C3 19.8807 4.11929 21 5.5 21C6.88071 21 8 19.8807 8 18.5C8 16 5 14 5 14Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M19 14C19 14 21 16 21 18.5C21 19.8807 19.8807 21 18.5 21C17.1193 21 16 19.8807 16 18.5C16 16 19 14 19 14Z"
      fill="currentColor"
      opacity="0.5"
    />
    <circle cx="12" cy="18" r="3" fill="currentColor" opacity="0.6" />
  </svg>
);

// Sacred geometry for Council Debate
export const SacredGeometryIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <path d="M12 3 L12 21" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M3 12 L21 12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M6.34 6.34 L17.66 17.66" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M17.66 6.34 L6.34 17.66" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Phoenix for Suffering & Growth
export const PhoenixIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 2C12 2 10 5 10 8C10 9.5 11 10.5 12 10.5C13 10.5 14 9.5 14 8C14 5 12 2 12 2Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M12 10C12 10 8 12 8 16C8 18.2 9.8 20 12 20C14.2 20 16 18.2 16 16C16 12 12 10 12 10Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M7 14C7 14 5 15 5 17C5 18.1 5.9 19 7 19C8.1 19 9 18.1 9 17C9 15 7 14 7 14Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M17 14C17 14 19 15 19 17C19 18.1 18.1 19 17 19C15.9 19 15 18.1 15 17C15 15 17 14 17 14Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M4 18L6 20M20 18L18 20M12 20V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Zen circle for Presence & Awareness
export const EnsoIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Compass for Purpose & Meaning
export const CompassIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path
      d="M12 3V5M12 19V21M3 12H5M19 12H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M10 8L14 16L10 14L8 10L10 8Z"
      fill="currentColor"
      opacity="0.8"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.9" />
  </svg>
);

// Infinity symbol for Ego & Self
export const InfinityIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M7 12C7 9.79086 8.79086 8 11 8C13.2091 8 15 9.79086 15 12C15 14.2091 13.2091 16 11 16C8.79086 16 7 14.2091 7 12Z"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.7"
    />
    <path
      d="M17 12C17 14.2091 15.2091 16 13 16C10.7909 16 9 14.2091 9 12C9 9.79086 10.7909 8 13 8C15.2091 8 17 9.79086 17 12Z"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.7"
    />
  </svg>
);

// Heart mandala for Relationships
export const HeartMandalaIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 21C12 21 4 15 4 9C4 6.79086 5.79086 5 8 5C9.5 5 10.7 5.7 12 7C13.3 5.7 14.5 5 16 5C18.2091 5 20 6.79086 20 9C20 15 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.6"
    />
    <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <path
      d="M9 11L15 11M12 8L12 14"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

// Hourglass for Death & Impermanence
export const HourglassIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M7 3H17V8L12 12L7 8V3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M7 21H17V16L12 12L7 16V21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path d="M6 3H18M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Labyrinth for Paradox Playground
export const LabyrinthIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 12C12 12 12 8 16 8C18 8 19 9 19 11C19 13 18 14 16 14C14 14 12 14 12 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M12 12C12 12 12 16 8 16C6 16 5 15 5 13C5 11 6 10 8 10C10 10 12 10 12 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
  </svg>
);

// Seed sprouting for Life Experiments
export const SeedIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-rotate-hover ${className}`}
  >
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M12 12C12 12 8 8 8 5C8 3.5 9 2 11 2C12 2 12 3 12 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M12 12C12 12 16 8 16 5C16 3.5 15 2 13 2C12 2 12 3 12 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      opacity="0.5"
    />
    <ellipse cx="12" cy="20" rx="4" ry="2" fill="currentColor" opacity="0.6" />
  </svg>
);
