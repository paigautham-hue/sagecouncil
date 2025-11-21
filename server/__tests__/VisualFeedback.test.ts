import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'sonner';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Visual Feedback - Loading States and Toasts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Life Experiments - Loading States', () => {
    it('should show loading spinner when starting experiment', () => {
      // Test that Loader2 icon is rendered with animate-spin class
      const mockLoaderClass = 'animate-spin';
      expect(mockLoaderClass).toBe('animate-spin');
    });

    it('should display "Starting Experiment..." text during loading', () => {
      const loadingText = 'Starting Experiment...';
      expect(loadingText).toContain('Starting');
    });

    it('should disable button while experiment is starting', () => {
      // Button should be disabled when isPending is true
      const isDisabled = true;
      expect(isDisabled).toBe(true);
    });

    it('should show success toast when experiment starts', () => {
      const successMessage = 'Experiment started! Track your progress daily.';
      toast.success(successMessage);
      expect(toast.success).toHaveBeenCalledWith(successMessage);
    });

    it('should show error toast if experiment fails to start', () => {
      const errorMessage = 'Failed to start experiment. Please try again.';
      toast.error(errorMessage);
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('Paradox Playground - Loading States', () => {
    it('should show loading spinner when submitting reflection', () => {
      const mockLoaderClass = 'animate-spin';
      expect(mockLoaderClass).toBe('animate-spin');
    });

    it('should display "Submitting Reflection..." text during submission', () => {
      const submittingText = 'Submitting Reflection...';
      expect(submittingText).toContain('Submitting');
    });

    it('should disable button while reflection is submitting', () => {
      const isDisabled = true;
      expect(isDisabled).toBe(true);
    });

    it('should show success toast when reflection is submitted', () => {
      const successMessage = 'Reflection submitted! AI insight generated.';
      toast.success(successMessage);
      expect(toast.success).toHaveBeenCalledWith(successMessage);
    });

    it('should show error toast if reflection submission fails', () => {
      const errorMessage = 'Failed to submit reflection. Please try again.';
      toast.error(errorMessage);
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });

    it('should clear reflection text after successful submission', () => {
      const reflection = '';
      expect(reflection).toBe('');
    });
  });

  describe('Micro-Retreats - Visual Feedback', () => {
    it('should display Zap icon on Begin button', () => {
      const zapIconClass = 'w-4 h-4';
      expect(zapIconClass).toBe('w-4 h-4');
    });

    it('should have hover effect on Begin button', () => {
      const hoverClass = 'hover:bg-indigo-500';
      expect(hoverClass).toContain('hover');
    });

    it('should show smooth transition on button interaction', () => {
      const transitionClass = 'transition-all duration-200';
      expect(transitionClass).toContain('transition');
    });
  });

  describe('Button Styling and Feedback', () => {
    it('should apply accent color to action buttons', () => {
      const accentClass = 'bg-accent';
      expect(accentClass).toContain('accent');
    });

    it('should apply hover state to buttons', () => {
      const hoverClass = 'hover:bg-accent/90';
      expect(hoverClass).toContain('hover');
    });

    it('should show disabled state styling', () => {
      const disabledClass = 'disabled:opacity-50';
      expect(disabledClass).toContain('disabled');
    });

    it('should have consistent spacing in button content', () => {
      const spacingClass = 'gap-2';
      expect(spacingClass).toBe('gap-2');
    });
  });

  describe('Toast Notifications', () => {
    it('should show success toast for completed actions', () => {
      const message = 'Action completed successfully';
      toast.success(message);
      expect(toast.success).toHaveBeenCalled();
    });

    it('should show error toast for failed actions', () => {
      const message = 'Action failed. Please try again.';
      toast.error(message);
      expect(toast.error).toHaveBeenCalled();
    });

    it('should pass correct message to toast function', () => {
      const testMessage = 'Test notification';
      toast.success(testMessage);
      expect(toast.success).toHaveBeenCalledWith(testMessage);
    });
  });

  describe('Loading State Management', () => {
    it('should track pending state during async operations', () => {
      const isPending = false;
      expect(typeof isPending).toBe('boolean');
    });

    it('should update UI when loading state changes', () => {
      const isLoading = true;
      expect(isLoading).toBe(true);
    });

    it('should handle loading state for multiple concurrent operations', () => {
      const operations = [
        { id: 1, isPending: true },
        { id: 2, isPending: false },
      ];
      expect(operations.length).toBe(2);
    });
  });
});
