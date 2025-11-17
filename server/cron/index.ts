import { schedule } from 'node-cron';
import { rotateWeeklyDebate } from './rotate-debate';
import { generateAllShadowMirrors } from './generate-shadow-mirrors';

/**
 * Register all cron jobs
 * 
 * Cron schedule format: second minute hour day month weekday
 * Examples:
 * - '0 0 0 * * 1' = Every Monday at midnight
 * - '0 0 20 * * 0' = Every Sunday at 8 PM
 */
export function registerCronJobs() {
  console.log('[Cron] Registering scheduled jobs...');
  
  // Rotate Council Debate every Monday at midnight
  schedule('0 0 0 * * 1', async () => {
    console.log('[Cron] Running weekly debate rotation...');
    try {
      await rotateWeeklyDebate();
    } catch (error) {
      console.error('[Cron] Failed to rotate debate:', error);
    }
  }, {
    timezone: 'UTC'
  });
  
  // Generate Shadow Mirror summaries every Sunday at 8 PM
  schedule('0 0 20 * * 0', async () => {
    console.log('[Cron] Running weekly Shadow Mirror generation...');
    try {
      await generateAllShadowMirrors();
    } catch (error) {
      console.error('[Cron] Failed to generate Shadow Mirrors:', error);
    }
  }, {
    timezone: 'UTC'
  });
  
  console.log('[Cron] ✅ Registered 2 cron jobs:');
  console.log('[Cron]   - Weekly debate rotation (Mondays at midnight UTC)');
  console.log('[Cron]   - Shadow Mirror generation (Sundays at 8 PM UTC)');
}
