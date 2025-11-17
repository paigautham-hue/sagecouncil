import * as db from "./db";
import * as aiService from "./ai-service";

/**
 * Get "Today's Deep Drop" - daily quote with AI commentary and practice
 */
export async function getTodaysDrop() {
  // Use date as seed for consistent daily selection
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Get all quotes
  const allQuotes = await db.getAllQuotes();
  if (!allQuotes || allQuotes.length === 0) {
    return null;
  }
  
  // Select today's quote using date-based index
  const quoteIndex = seed % allQuotes.length;
  const todaysQuote = allQuotes[quoteIndex];
  
  // Get teacher info
  const teacher = await db.getTeacherById(todaysQuote.teacherId);
  if (!teacher) {
    return null;
  }
  
  // Get teacher's practices for practice generation
  // For now, use placeholder practices - will be enhanced later
  const practiceTexts = ['Mindful breathing', 'Present moment awareness', 'Compassionate self-inquiry'];
  
  // Generate AI commentary for the quote
  const commentary = await aiService.generateQuoteCommentary(
    todaysQuote.text,
    teacher.fullName,
    teacher.shortSummary || teacher.oneLineEssence || ''
  );
  
  // Generate a 1-minute practice
  const practice = await aiService.generatePractice(
    teacher.fullName,
    practiceTexts,
    `Related to this quote: "${todaysQuote.text}"`
  );
  
  return {
    quote: {
      text: todaysQuote.text,
      source: todaysQuote.sourceReference || 'Unknown',
    },
    teacher: {
      id: teacher.id,
      fullName: teacher.fullName,
      oneLineEssence: teacher.oneLineEssence,
      portrait: `/sages/${teacher.teacherId}.png`,
    },
    commentary,
    practice,
  };
}
