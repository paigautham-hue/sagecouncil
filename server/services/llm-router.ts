/**
 * LLM Router Service
 * Implements intelligent fallback strategy across multiple LLM providers
 * Primary: Claude (Anthropic)
 * Fallback 1: Perplexity (Sonar Pro)
 * Fallback 2: Gemini (Google)
 * Fallback 3: Grok (xAI)
 */

import { invokeLLM } from '../_core/llm';

export interface LLMRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface LLMResponse {
  content: string;
  provider: 'claude' | 'perplexity' | 'gemini' | 'grok';
  tokensUsed?: number;
  error?: string;
}

interface LLMProvider {
  name: string;
  id: 'claude' | 'perplexity' | 'gemini' | 'grok';
  apiKey: string | undefined;
  isAvailable: boolean;
  failureCount: number;
  lastFailureTime: number | null;
  circuitBreakerOpen: boolean;
}

const CIRCUIT_BREAKER_THRESHOLD = 3; // failures before opening circuit
const CIRCUIT_BREAKER_RESET_TIME = 60000; // 1 minute

class LLMRouter {
  private providers: Map<string, LLMProvider> = new Map();
  private requestLog: Array<{
    timestamp: number;
    provider: string;
    success: boolean;
    error?: string;
  }> = [];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Primary: Claude (Anthropic)
    this.providers.set('claude', {
      name: 'Claude 3 Opus',
      id: 'claude',
      apiKey: process.env.ANTHROPIC_API_KEY,
      isAvailable: !!process.env.ANTHROPIC_API_KEY,
      failureCount: 0,
      lastFailureTime: null,
      circuitBreakerOpen: false,
    });

    // Fallback 1: Perplexity
    this.providers.set('perplexity', {
      name: 'Perplexity Sonar Pro',
      id: 'perplexity',
      apiKey: process.env.SONAR_API_KEY,
      isAvailable: !!process.env.SONAR_API_KEY,
      failureCount: 0,
      lastFailureTime: null,
      circuitBreakerOpen: false,
    });

    // Fallback 2: Gemini
    this.providers.set('gemini', {
      name: 'Gemini 2.5 Flash',
      id: 'gemini',
      apiKey: process.env.GEMINI_API_KEY,
      isAvailable: !!process.env.GEMINI_API_KEY,
      failureCount: 0,
      lastFailureTime: null,
      circuitBreakerOpen: false,
    });

    // Fallback 3: Grok
    this.providers.set('grok', {
      name: 'Grok 4',
      id: 'grok',
      apiKey: process.env.XAI_API_KEY,
      isAvailable: !!process.env.XAI_API_KEY,
      failureCount: 0,
      lastFailureTime: null,
      circuitBreakerOpen: false,
    });
  }

  /**
   * Get the next available provider in fallback order
   */
  private getNextProvider(): LLMProvider | null {
    const order: Array<'claude' | 'perplexity' | 'gemini' | 'grok'> = [
      'claude',
      'perplexity',
      'gemini',
      'grok',
    ];

    for (const providerId of order) {
      const provider = this.providers.get(providerId);
      if (!provider) continue;

      // Check circuit breaker
      if (provider.circuitBreakerOpen) {
        const timeSinceLastFailure = Date.now() - (provider.lastFailureTime || 0);
        if (timeSinceLastFailure < CIRCUIT_BREAKER_RESET_TIME) {
          continue; // Circuit still open
        } else {
          // Reset circuit breaker
          provider.circuitBreakerOpen = false;
          provider.failureCount = 0;
        }
      }

      if (provider.isAvailable) {
        return provider;
      }
    }

    return null;
  }

  /**
   * Record a successful request
   */
  private recordSuccess(provider: LLMProvider) {
    provider.failureCount = 0;
    provider.lastFailureTime = null;
    this.requestLog.push({
      timestamp: Date.now(),
      provider: provider.id,
      success: true,
    });
  }

  /**
   * Record a failed request
   */
  private recordFailure(provider: LLMProvider, error: string) {
    provider.failureCount++;
    provider.lastFailureTime = Date.now();

    if (provider.failureCount >= CIRCUIT_BREAKER_THRESHOLD) {
      provider.circuitBreakerOpen = true;
      console.warn(
        `[LLM Router] Circuit breaker opened for ${provider.name} after ${provider.failureCount} failures`
      );
    }

    this.requestLog.push({
      timestamp: Date.now(),
      provider: provider.id,
      success: false,
      error,
    });
  }

  /**
   * Main method to get LLM response with automatic fallback
   */
  async generateInsight(request: LLMRequest): Promise<LLMResponse> {
    let lastError: string | undefined;
    let attempts = 0;
    const maxAttempts = 4; // Try all 4 providers

    while (attempts < maxAttempts) {
      const provider = this.getNextProvider();

      if (!provider) {
        return {
          content: this.getDefaultFallbackResponse(),
          provider: 'claude',
          error: 'All LLM providers unavailable',
        };
      }

      attempts++;

      try {
        console.log(`[LLM Router] Attempting ${provider.name} (attempt ${attempts})`);

        const response = await this.callLLMProvider(provider, request);

        this.recordSuccess(provider);

        return {
          content: response,
          provider: provider.id,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        lastError = errorMessage;

        this.recordFailure(provider, errorMessage);

        console.warn(
          `[LLM Router] ${provider.name} failed (${provider.failureCount}/${CIRCUIT_BREAKER_THRESHOLD}): ${errorMessage}`
        );

        // Continue to next provider
      }
    }

    // All providers failed, return default response
    return {
      content: this.getDefaultFallbackResponse(),
      provider: 'claude',
      error: `All LLM providers failed. Last error: ${lastError}`,
    };
  }

  /**
   * Call specific LLM provider
   */
  private async callLLMProvider(provider: LLMProvider, request: LLMRequest): Promise<string> {
    // For now, use the built-in invokeLLM which handles Claude
    // In production, you would implement provider-specific logic here
    // This is a simplified version - in reality you'd have separate implementations
    // for Perplexity, Gemini, and Grok APIs

    if (provider.id === 'claude') {
      const response = await invokeLLM({
        messages: request.messages,
      });

      if (!response.choices || !response.choices[0] || !response.choices[0].message) {
        throw new Error('Invalid response from Claude API');
      }

      const content = response.choices[0].message.content;
      if (typeof content === 'string') {
        return content;
      }

      throw new Error('Claude returned non-string content');
    }

    // For other providers, would implement similar logic
    // This is a placeholder for the actual implementations
    throw new Error(`Provider ${provider.name} not yet fully implemented`);
  }

  /**
   * Get default fallback response when all LLMs fail
   */
  private getDefaultFallbackResponse(): string {
    return `I'm experiencing technical difficulties connecting to our AI services at the moment. 

However, here's a reflection for you to consider:

The paradox you're exploring reflects a fundamental tension in human experience. Take a moment to sit with this contradiction rather than trying to resolve it immediately. Often, the wisdom lies not in choosing one side, but in understanding how both truths coexist.

Consider:
- What does this paradox reveal about your current situation?
- Where do you see this tension playing out in your life?
- What would it mean to embrace both sides of this paradox?

Please try again in a moment, and our full AI insights will be available to provide deeper guidance.`;
  }

  /**
   * Get router health status
   */
  getHealthStatus() {
    const status: Record<string, any> = {};

    this.providers.forEach((provider, key) => {
      status[key] = {
        name: provider.name,
        available: provider.isAvailable && !provider.circuitBreakerOpen,
        failureCount: provider.failureCount,
        circuitBreakerOpen: provider.circuitBreakerOpen,
      };
    });

    return status;
  }

  /**
   * Get request logs for monitoring
   */
  getRequestLogs(limit: number = 100) {
    return this.requestLog.slice(-limit);
  }

  /**
   * Reset provider failure counts (admin function)
   */
  resetProviderFailures(providerId?: string) {
    if (providerId) {
      const provider = this.providers.get(providerId);
      if (provider) {
        provider.failureCount = 0;
        provider.circuitBreakerOpen = false;
        provider.lastFailureTime = null;
      }
    } else {
      // Reset all
      this.providers.forEach((provider) => {
        provider.failureCount = 0;
        provider.circuitBreakerOpen = false;
        provider.lastFailureTime = null;
      });
    }
  }
}

// Singleton instance
export const llmRouter = new LLMRouter();

/**
 * Helper function to generate paradox insight
 */
export async function generateParadoxInsight(
  paradoxTitle: string,
  paradoxStatement: string,
  userTheme?: string,
  userJourneyProgress?: string
): Promise<LLMResponse> {
  const systemPrompt = `You are a wise spiritual guide helping users explore paradoxes in wisdom traditions. 
Your role is to:
1. Help the user understand the paradox deeply
2. Show how this paradox appears in different traditions
3. Offer practical ways to work with this paradox in daily life
4. Connect it to their spiritual journey if context is provided

Keep responses concise (2-3 paragraphs) but profound.`;

  const userMessage = `I'm exploring this paradox: "${paradoxTitle}"

The paradox: ${paradoxStatement}
${userTheme ? `\nMy current focus area: ${userTheme}` : ''}
${userJourneyProgress ? `\nMy journey progress: ${userJourneyProgress}` : ''}

Please provide personalized insights on how to work with this paradox.`;

  return llmRouter.generateInsight({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });
}

/**
 * Helper function to generate experiment guidance
 */
export async function generateExperimentGuidance(
  experimentTitle: string,
  experimentDescription: string,
  userContext?: string
): Promise<LLMResponse> {
  const systemPrompt = `You are a compassionate guide helping users engage with spiritual experiments.
Your role is to:
1. Help them understand the deeper purpose of the experiment
2. Offer personalized variations based on their context
3. Suggest how to track insights and progress
4. Provide encouragement and realistic expectations

Keep responses warm, practical, and concise (2-3 paragraphs).`;

  const userMessage = `I'm starting this experiment: "${experimentTitle}"

Description: ${experimentDescription}
${userContext ? `\nMy context: ${userContext}` : ''}

Please help me approach this experiment with intention and clarity.`;

  return llmRouter.generateInsight({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });
}
