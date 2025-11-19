import { router, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { generateParadoxInsight, generateExperimentGuidance } from '../services/llm-router';

export const aiRouter = router({
  /**
   * Generate AI insight for paradox exploration
   */
  generateInsight: publicProcedure
    .input(
      z.object({
        type: z.enum(['paradox', 'experiment', 'retreat']),
        title: z.string(),
        description: z.string(),
        userTheme: z.string().optional(),
        userJourneyProgress: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (input.type === 'paradox') {
          const result = await generateParadoxInsight(
            input.title,
            input.description,
            input.userTheme,
            input.userJourneyProgress
          );

          return {
            content: result.content,
            provider: result.provider,
            error: result.error || null,
          };
        } else if (input.type === 'experiment') {
          const result = await generateExperimentGuidance(
            input.title,
            input.description,
            input.userTheme
          );

          return {
            content: result.content,
            provider: result.provider,
            error: result.error || null,
          };
        } else {
          // Retreat type - use experiment guidance for now
          const result = await generateExperimentGuidance(
            input.title,
            input.description,
            input.userTheme
          );

          return {
            content: result.content,
            provider: result.provider,
            error: result.error || null,
          };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return {
          content: 'Unable to generate insight at this moment. Please try again later.',
          provider: 'fallback',
          error: errorMessage,
        };
      }
    }),

  /**
   * Get LLM router health status (admin only)
   */
  getHealth: publicProcedure.query(async () => {
    const { llmRouter } = await import('../services/llm-router');

    return {
      status: 'ok',
      providers: llmRouter.getHealthStatus(),
      recentLogs: llmRouter.getRequestLogs(10),
    };
  }),
});
