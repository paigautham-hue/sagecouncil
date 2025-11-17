import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OnboardingState {
  hasCompletedWelcome: boolean;
  hasSeenDeepQuestions: boolean;
  hasSeenCouncilDebates: boolean;
  hasSeenMicroRetreats: boolean;
  hasSeenConstellation: boolean;
}

interface OnboardingContextType {
  state: OnboardingState;
  markWelcomeComplete: () => void;
  markFeatureSeen: (feature: keyof Omit<OnboardingState, 'hasCompletedWelcome'>) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'council_of_sages_onboarding';

const defaultState: OnboardingState = {
  hasCompletedWelcome: false,
  hasSeenDeepQuestions: false,
  hasSeenCouncilDebates: false,
  hasSeenMicroRetreats: false,
  hasSeenConstellation: false,
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultState, ...JSON.parse(stored) };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const markWelcomeComplete = () => {
    setState(prev => ({ ...prev, hasCompletedWelcome: true }));
  };

  const markFeatureSeen = (feature: keyof Omit<OnboardingState, 'hasCompletedWelcome'>) => {
    setState(prev => ({ ...prev, [feature]: true }));
  };

  const resetOnboarding = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OnboardingContext.Provider value={{ state, markWelcomeComplete, markFeatureSeen, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
