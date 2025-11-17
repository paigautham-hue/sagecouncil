import { drizzle } from 'drizzle-orm/mysql2';
import { councilDebates } from '../../drizzle/schema';
import { eq, and, gte, lt } from 'drizzle-orm';

/**
 * Cron job to rotate the weekly Council Debate
 * Runs every Monday at 12:00 AM
 * 
 * This job:
 * 1. Deactivates the current week's debate
 * 2. Activates the next debate in the rotation
 * 3. If no more debates, loops back to the first one
 */
export async function rotateWeeklyDebate() {
  const db = drizzle(process.env.DATABASE_URL!);
  
  try {
    console.log('[Cron] Starting weekly debate rotation...');
    
    // Get current active debate
    const [currentDebate] = await db
      .select()
      .from(councilDebates)
      .where(eq(councilDebates.isActive, true))
      .limit(1);
    
    if (!currentDebate) {
      console.log('[Cron] No active debate found, activating first debate');
      const [firstDebate] = await db
        .select()
        .from(councilDebates)
        .orderBy(councilDebates.createdAt)
        .limit(1);
      
      if (firstDebate) {
        await db
          .update(councilDebates)
          .set({ isActive: true })
          .where(eq(councilDebates.id, firstDebate.id));
        console.log(`[Cron] Activated debate: "${firstDebate.questionText}"`);
      }
      return;
    }
    
    // Deactivate current debate
    await db
      .update(councilDebates)
      .set({ isActive: false })
      .where(eq(councilDebates.id, currentDebate.id));
    
    console.log(`[Cron] Deactivated current debate: "${currentDebate.questionText}"`);
    
    // Find next debate (by creation date)
    const [nextDebate] = await db
      .select()
      .from(councilDebates)
      .where(
        and(
          eq(councilDebates.isActive, false),
          gte(councilDebates.createdAt, currentDebate.createdAt)
        )
      )
      .orderBy(councilDebates.createdAt)
      .limit(1);
    
    if (nextDebate) {
      // Activate next debate
      await db
        .update(councilDebates)
        .set({ isActive: true })
        .where(eq(councilDebates.id, nextDebate.id));
      console.log(`[Cron] Activated next debate: "${nextDebate.questionText}"`);
    } else {
      // No more debates, loop back to first
      const [firstDebate] = await db
        .select()
        .from(councilDebates)
        .orderBy(councilDebates.createdAt)
        .limit(1);
      
      if (firstDebate) {
        await db
          .update(councilDebates)
          .set({ isActive: true })
          .where(eq(councilDebates.id, firstDebate.id));
        console.log(`[Cron] Looped back to first debate: "${firstDebate.questionText}"`);
      }
    }
    
    console.log('[Cron] Weekly debate rotation completed successfully');
  } catch (error) {
    console.error('[Cron] Error rotating weekly debate:', error);
    throw error;
  }
}
