import { drizzle } from 'drizzle-orm/mysql2';
import { users } from '../../drizzle/schema';
import { getUserContentForWeek, createShadowMirrorSummary } from '../db';
import { generateShadowMirrorSummary } from '../ai-service';

/**
 * Cron job to generate Shadow Mirror summaries for all users
 * Runs every Sunday at 8:00 PM
 * 
 * This job:
 * 1. Fetches all active users
 * 2. Generates a Shadow Mirror summary for each user based on their last 7 days of activity
 * 3. Logs success/failure for each user
 */
export async function generateAllShadowMirrors() {
  const db = drizzle(process.env.DATABASE_URL!);
  
  try {
    console.log('[Cron] Starting weekly Shadow Mirror generation...');
    
    // Get all users
    const allUsers = await db.select().from(users);
    
    console.log(`[Cron] Found ${allUsers.length} users to process`);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const user of allUsers) {
      try {
        // Calculate last week's date range
        const now = new Date();
        const weekEndDate = new Date(now);
        weekEndDate.setDate(now.getDate() - now.getDay()); // Last Sunday
        const weekStartDate = new Date(weekEndDate);
        weekStartDate.setDate(weekEndDate.getDate() - 6); // Previous Monday
        
        // Get user's content from last week
        const { journalEntries, conversationMessages } = await getUserContentForWeek(
          user.id,
          weekStartDate,
          weekEndDate
        );
        
        // Skip if no content
        if (journalEntries.length === 0 && conversationMessages.length === 0) {
          console.log(`[Cron] ⏭️  Skipped user ${user.id} (no content)`);
          continue;
        }
        
        // Generate AI summary
        const aiSummary = await generateShadowMirrorSummary(
          journalEntries,
          conversationMessages
        );
        
        // Save to database
        await createShadowMirrorSummary({
          userId: user.id,
          weekStartDate,
          weekEndDate,
          dominantThemes: aiSummary.dominantThemes,
          patternAnalysis: aiSummary.patternAnalysis,
          blindSpots: aiSummary.blindSpots,
          growthOpportunities: aiSummary.growthOpportunities
        });
        successCount++;
        console.log(`[Cron] ✅ Generated Shadow Mirror for user ${user.id} (${user.name || user.email})`);
      } catch (error) {
        failureCount++;
        console.error(`[Cron] ❌ Failed to generate Shadow Mirror for user ${user.id}:`, error);
      }
    }
    
    console.log(`[Cron] Shadow Mirror generation completed: ${successCount} success, ${failureCount} failures`);
  } catch (error) {
    console.error('[Cron] Error in Shadow Mirror generation job:', error);
    throw error;
  }
}
