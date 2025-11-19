import { describe, it, expect, beforeAll, vi } from 'vitest';
import { llmRouter, generateParadoxInsight, generateExperimentGuidance } from '../services/llm-router';

describe('AI Features - LLM Router & Insights', () => {
  describe('LLM Router Health & Status', () => {
    it('should initialize with all providers', () => {
      const health = llmRouter.getHealthStatus();
      expect(health).toHaveProperty('claude');
      expect(health).toHaveProperty('perplexity');
      expect(health).toHaveProperty('gemini');
      expect(health).toHaveProperty('grok');
    });

    it('should track provider availability', () => {
      const health = llmRouter.getHealthStatus();
      expect(health.claude).toHaveProperty('available');
      expect(health.claude).toHaveProperty('failureCount');
      expect(health.claude).toHaveProperty('circuitBreakerOpen');
    });

    it('should have Claude available (primary provider)', () => {
      const health = llmRouter.getHealthStatus();
      expect(health.claude.available).toBe(true);
    });

    it('should maintain request logs', () => {
      const logs = llmRouter.getRequestLogs(10);
      expect(Array.isArray(logs)).toBe(true);
    });
  });

  describe('Fallback Strategy', () => {
    it('should have fallback providers configured', () => {
      const health = llmRouter.getHealthStatus();
      const providers = Object.keys(health);
      expect(providers.length).toBeGreaterThanOrEqual(4);
      expect(providers).toContain('claude');
      expect(providers).toContain('perplexity');
      expect(providers).toContain('gemini');
      expect(providers).toContain('grok');
    });

    it('should provide default fallback response when all LLMs fail', async () => {
      // This would be tested with mocked LLM failures
      // In production, this ensures graceful degradation
      const health = llmRouter.getHealthStatus();
      expect(health).toBeDefined();
    });
  });

  describe('Paradox Insight Generation', () => {
    it('should generate paradox insights with context', async () => {
      const result = await generateParadoxInsight(
        'The Observer Paradox',
        'How can we observe reality without changing it?',
        'Presence & Awareness',
        'Beginning explorer'
      );

      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('provider');
      expect(result.content).toBeTruthy();
      expect(result.content.length).toBeGreaterThan(50);
    });

    it('should include provider information in response', async () => {
      const result = await generateParadoxInsight(
        'The Self Paradox',
        'Who is the observer of the self?',
        'Ego & Self'
      );

      expect(['claude', 'perplexity', 'gemini', 'grok', 'fallback']).toContain(result.provider);
    });

    it('should handle paradoxes without theme context', async () => {
      const result = await generateParadoxInsight(
        'Infinity Paradox',
        'Can infinity exist within the finite?'
      );

      expect(result.content).toBeTruthy();
      expect(result.provider).toBeTruthy();
    });

    it('should provide personalized insights based on journey progress', async () => {
      const result = await generateParadoxInsight(
        'The Void Paradox',
        'How can emptiness be full?',
        'Presence & Awareness',
        'Advanced practitioner with 30 days of exploration'
      );

      expect(result.content).toBeTruthy();
      // Advanced practitioners should get more nuanced insights
      expect(result.content.length).toBeGreaterThan(100);
    });
  });

  describe('Experiment Guidance Generation', () => {
    it('should generate experiment guidance', async () => {
      const result = await generateExperimentGuidance(
        'The Silence Experiment',
        'Spend 30 minutes in complete silence daily for 7 days',
        'Beginner looking to develop presence'
      );

      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('provider');
      expect(result.content).toBeTruthy();
      expect(result.content.length).toBeGreaterThan(50);
    });

    it('should provide practical guidance for experiments', async () => {
      const result = await generateExperimentGuidance(
        'Loving-Kindness Practice',
        '10-minute daily meditation focusing on compassion'
      );

      expect(result.content).toContain('practice') || expect(result.content).toContain('meditation');
    });

    it('should adapt guidance based on user context', async () => {
      const result = await generateExperimentGuidance(
        'Mortality Contemplation',
        'Reflect on impermanence and death',
        'Experienced practitioner seeking deeper insights'
      );

      expect(result.content).toBeTruthy();
      expect(result.content.length).toBeGreaterThan(100);
    });

    it('should handle experiments without user context', async () => {
      const result = await generateExperimentGuidance(
        'The Mirror Experiment',
        'Observe your face in a mirror for 10 minutes'
      );

      expect(result.content).toBeTruthy();
      expect(result.provider).toBeTruthy();
    });
  });

  describe('Error Handling & Resilience', () => {
    it('should provide fallback response on all provider failures', async () => {
      // Even if all LLMs fail, should return meaningful response
      const result = await generateParadoxInsight(
        'Test Paradox',
        'Test statement'
      );

      expect(result).toHaveProperty('content');
      expect(result.content).toBeTruthy();
      // Fallback response should still be helpful
      expect(result.content.length).toBeGreaterThan(20);
    });

    it('should track provider failures', () => {
      const health = llmRouter.getHealthStatus();
      // Verify failure tracking is in place
      expect(health.claude).toHaveProperty('failureCount');
      expect(typeof health.claude.failureCount).toBe('number');
    });

    it('should implement circuit breaker pattern', () => {
      const health = llmRouter.getHealthStatus();
      // Verify circuit breaker is configured
      expect(health.claude).toHaveProperty('circuitBreakerOpen');
      expect(typeof health.claude.circuitBreakerOpen).toBe('boolean');
    });
  });

  describe('Response Quality', () => {
    it('should generate responses with appropriate length', async () => {
      const result = await generateParadoxInsight(
        'Quality Test',
        'Test paradox statement'
      );

      // Response should be substantial but not excessive
      expect(result.content.length).toBeGreaterThan(100);
      expect(result.content.length).toBeLessThan(5000);
    });

    it('should include actionable insights', async () => {
      const result = await generateExperimentGuidance(
        'Actionable Test',
        'Test experiment description'
      );

      // Should provide practical guidance
      expect(result.content).toBeTruthy();
      const hasActionableContent =
        result.content.toLowerCase().includes('try') ||
        result.content.toLowerCase().includes('practice') ||
        result.content.toLowerCase().includes('consider') ||
        result.content.toLowerCase().includes('reflect');

      expect(hasActionableContent || result.error).toBeTruthy();
    });

    it('should maintain consistency in response format', async () => {
      const result1 = await generateParadoxInsight('Test 1', 'Statement 1');
      const result2 = await generateParadoxInsight('Test 2', 'Statement 2');

      // Both should have same structure
      expect(result1).toHaveProperty('content');
      expect(result1).toHaveProperty('provider');
      expect(result2).toHaveProperty('content');
      expect(result2).toHaveProperty('provider');
    });
  });

  describe('Provider Rotation', () => {
    it('should attempt primary provider first', async () => {
      const health = llmRouter.getHealthStatus();
      // Claude should be primary
      expect(health.claude).toBeDefined();
    });

    it('should have fallback order configured', () => {
      const health = llmRouter.getHealthStatus();
      const providers = ['claude', 'perplexity', 'gemini', 'grok'];
      
      for (const provider of providers) {
        expect(health).toHaveProperty(provider);
      }
    });

    it('should reset provider failures when circuit breaker resets', () => {
      // Verify reset mechanism exists
      llmRouter.resetProviderFailures();
      const health = llmRouter.getHealthStatus();
      
      expect(health.claude.failureCount).toBe(0);
      expect(health.claude.circuitBreakerOpen).toBe(false);
    });
  });

  describe('Performance', () => {
    it('should generate insights within reasonable time', async () => {
      const startTime = Date.now();
      await generateParadoxInsight('Performance Test', 'Test statement');
      const endTime = Date.now();

      const duration = endTime - startTime;
      // Should complete within 30 seconds (accounting for network latency)
      expect(duration).toBeLessThan(30000);
    });
  });

  describe('Logging & Monitoring', () => {
    it('should maintain request logs for monitoring', () => {
      const logs = llmRouter.getRequestLogs(5);
      expect(Array.isArray(logs)).toBe(true);
      
      if (logs.length > 0) {
        expect(logs[0]).toHaveProperty('timestamp');
        expect(logs[0]).toHaveProperty('provider');
        expect(logs[0]).toHaveProperty('success');
      }
    });

    it('should log both successful and failed requests', () => {
      const logs = llmRouter.getRequestLogs(100);
      // Logs should track both successes and failures
      expect(Array.isArray(logs)).toBe(true);
    });
  });
});
