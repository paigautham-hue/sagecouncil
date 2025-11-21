import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface Step {
  id: string | number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  /**
   * Array of steps
   */
  steps: Step[];
  /**
   * Current step index (0-based)
   */
  currentStep: number;
  /**
   * Display style: 'horizontal' or 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Color scheme
   */
  color?: 'accent' | 'green' | 'blue' | 'purple' | 'gold';
  /**
   * Callback when a step is clicked
   */
  onStepClick?: (stepIndex: number) => void;
  /**
   * Whether steps can be clicked
   */
  clickable?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  color = 'accent',
  onStepClick,
  clickable = false,
  className = '',
}) => {
  const colorClasses = {
    accent: {
      active: 'bg-accent text-foreground',
      completed: 'bg-accent/20 text-accent',
      inactive: 'bg-foreground/10 text-foreground/50',
      line: 'bg-accent',
    },
    green: {
      active: 'bg-green-500 text-white',
      completed: 'bg-green-500/20 text-green-500',
      inactive: 'bg-foreground/10 text-foreground/50',
      line: 'bg-green-500',
    },
    blue: {
      active: 'bg-blue-500 text-white',
      completed: 'bg-blue-500/20 text-blue-500',
      inactive: 'bg-foreground/10 text-foreground/50',
      line: 'bg-blue-500',
    },
    purple: {
      active: 'bg-purple-500 text-white',
      completed: 'bg-purple-500/20 text-purple-500',
      inactive: 'bg-foreground/10 text-foreground/50',
      line: 'bg-purple-500',
    },
    gold: {
      active: 'bg-yellow-500 text-foreground',
      completed: 'bg-yellow-500/20 text-yellow-500',
      inactive: 'bg-foreground/10 text-foreground/50',
      line: 'bg-yellow-500',
    },
  };

  const colors = colorClasses[color];

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => clickable && onStepClick?.(index)}
                  disabled={!clickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    transition-all duration-300 relative z-10
                    ${isCompleted ? colors.completed : ''}
                    ${isActive ? colors.active : ''}
                    ${isUpcoming ? colors.inactive : ''}
                    ${clickable ? 'cursor-pointer hover:scale-110' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-1 h-12 mt-2 transition-all duration-300 ${
                      isCompleted ? colors.line : 'bg-foreground/10'
                    }`}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 pt-1">
                <h3
                  className={`font-semibold transition-colors duration-300 ${
                    isActive ? 'text-foreground' : 'text-foreground/70'
                  }`}
                >
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-foreground/50 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal orientation
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.id} className="flex-1 flex items-center">
            {/* Step circle */}
            <button
              onClick={() => clickable && onStepClick?.(index)}
              disabled={!clickable}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                transition-all duration-300 flex-shrink-0
                ${isCompleted ? colors.completed : ''}
                ${isActive ? colors.active : ''}
                ${!isActive && !isCompleted ? colors.inactive : ''}
                ${clickable ? 'cursor-pointer hover:scale-110' : ''}
              `}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  isCompleted ? colors.line : 'bg-foreground/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
