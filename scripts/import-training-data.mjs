import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { eq } from "drizzle-orm";
import { themes, teachers, keyIdeas, practices, centralQuestions, misunderstandings, quotes } from "../drizzle/schema.ts";

const schema = { themes, teachers, keyIdeas, practices, centralQuestions, misunderstandings, quotes };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read training data
const trainingDataPath = path.join(__dirname, "../training_data.json");
const trainingData = JSON.parse(fs.readFileSync(trainingDataPath, "utf-8"));

console.log("🚀 Starting training data import...");
console.log(`📊 Dataset version: ${trainingData.metadata.version}`);
console.log(`👥 Total teachers: ${trainingData.metadata.total_teachers}`);
console.log(`💡 Total key ideas: ${trainingData.metadata.total_key_ideas}`);
console.log(`🧘 Total practices: ${trainingData.metadata.total_practices}`);
console.log(`🏷️  Total themes: ${trainingData.metadata.total_themes}`);

// Connect to database
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable not set");
  process.exit(1);
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: "default" });

async function importData() {
  try {
    // Import themes first
    console.log("\n📥 Importing themes...");
    const themeMap = new Map();
    
    if (trainingData.themes_index && trainingData.themes_index.length > 0) {
      for (const theme of trainingData.themes_index) {
        const existing = await db.select().from(schema.themes).where(eq(schema.themes.themeId, theme.theme_id)).limit(1);
        
        if (existing.length > 0) {
          // Update existing
          await db.update(schema.themes)
            .set({
              label: theme.label,
              description: theme.description || null,
              relatedTeachers: theme.related_teachers || []
            })
            .where(eq(schema.themes.themeId, theme.theme_id));
          themeMap.set(theme.theme_id, existing[0].id);
        } else {
          // Insert new
          const result = await db.insert(schema.themes).values({
            themeId: theme.theme_id,
            label: theme.label,
            description: theme.description || null,
            relatedTeachers: theme.related_teachers || []
          });
          themeMap.set(theme.theme_id, Number(result[0].insertId));
        }
      }
      console.log(`✅ Imported ${trainingData.themes_index.length} themes`);
    }

    // Import teachers
    console.log("\n📥 Importing teachers...");
    const teacherMap = new Map();
    let teacherCount = 0;
    let ideaCount = 0;
    let practiceCount = 0;
    let questionCount = 0;
    let misunderstandingCount = 0;
    let quoteCount = 0;

    for (const teacher of trainingData.teachers) {
      const existing = await db.select().from(schema.teachers).where(eq(schema.teachers.teacherId, teacher.teacher_id)).limit(1);
      
      let teacherDbId;
      if (existing.length > 0) {
        // Update existing
        await db.update(schema.teachers)
          .set({
            fullName: teacher.full_name,
            phase: teacher.phase,
            alsoAppearsInPhases: teacher.also_appears_in_phases || [],
            traditionTags: teacher.tradition_tags || [],
            era: teacher.era || null,
            regions: teacher.regions || [],
            oneLineEssence: teacher.one_line_essence || null,
            shortSummary: teacher.short_summary || null,
            mediumSummary: teacher.medium_summary || null
          })
          .where(eq(schema.teachers.teacherId, teacher.teacher_id));
        teacherDbId = existing[0].id;
      } else {
        // Insert new
        const result = await db.insert(schema.teachers).values({
          teacherId: teacher.teacher_id,
          fullName: teacher.full_name,
          phase: teacher.phase,
          alsoAppearsInPhases: teacher.also_appears_in_phases || [],
          traditionTags: teacher.tradition_tags || [],
          era: teacher.era || null,
          regions: teacher.regions || [],
          oneLineEssence: teacher.one_line_essence || null,
          shortSummary: teacher.short_summary || null,
          mediumSummary: teacher.medium_summary || null,
          isActive: true
        });
        teacherDbId = Number(result[0].insertId);
      }

      teacherMap.set(teacher.teacher_id, teacherDbId);
      teacherCount++;

      // Import key ideas for this teacher
      if (teacher.key_ideas && teacher.key_ideas.length > 0) {
        for (const idea of teacher.key_ideas) {
          await db.insert(schema.keyIdeas).values({
            teacherId: teacherDbId,
            ideaId: idea.idea_id || idea.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
            name: idea.name,
            clearExplanation: idea.clear_explanation || idea.summary || null,
            whenItApplies: idea.when_it_applies || null,
            lifeDomains: idea.life_domains || [],
            commonMisuse: idea.common_misuse || idea.potential_misuse || null
          });
          ideaCount++;
        }
      }

      // Import practices for this teacher
      if (teacher.practices && teacher.practices.length > 0) {
        for (const practice of teacher.practices) {
          await db.insert(schema.practices).values({
            teacherId: teacherDbId,
            practiceId: practice.practice_id || practice.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
            name: practice.name,
            type: practice.type || null,
            stepByStep: practice.step_by_step || null,
            intendedEffect: practice.intended_effect || null,
            cautions: practice.cautions || null,
            durationMinutes: practice.duration_minutes || null
          });
          practiceCount++;
        }
      }

      // Import central questions
      if (teacher.central_questions && teacher.central_questions.length > 0) {
        for (const question of teacher.central_questions) {
          const questionText = typeof question === 'string' ? question : question.question;
          await db.insert(schema.centralQuestions).values({
            teacherId: teacherDbId,
            question: questionText
          });
          questionCount++;
        }
      }

      // Import common misunderstandings
      if (teacher.common_misunderstandings && teacher.common_misunderstandings.length > 0) {
        for (const misunderstanding of teacher.common_misunderstandings) {
          const misunderstandingText = typeof misunderstanding === 'string' ? misunderstanding : (misunderstanding.misreading || misunderstanding.misunderstanding);
          const clarificationText = typeof misunderstanding === 'string' ? null : (misunderstanding.clarification || null);
          await db.insert(schema.misunderstandings).values({
            teacherId: teacherDbId,
            misunderstanding: misunderstandingText,
            clarification: clarificationText
          });
          misunderstandingCount++;
        }
      }

      // Import selected short quotes as quotes
      if (teacher.selected_short_quotes && teacher.selected_short_quotes.length > 0) {
        for (const quote of teacher.selected_short_quotes) {
          const quoteText = typeof quote === 'string' ? quote : (quote.quote || quote.text);
          if (quoteText) {
            await db.insert(schema.quotes).values({
              teacherId: teacherDbId,
              text: quoteText,
              isParaphrase: quote.is_paraphrase || false,
              sourceReference: quote.source_reference || null,
              themeTags: [],
              isFeatured: false
            });
            quoteCount++;
          }
        }
      }

      if (teacherCount % 5 === 0) {
        console.log(`   Processed ${teacherCount} teachers...`);
      }
    }

    console.log(`✅ Imported ${teacherCount} teachers`);
    console.log(`   - Key ideas: ${ideaCount}`);
    console.log(`   - Practices: ${practiceCount}`);
    console.log(`   - Central questions: ${questionCount}`);
    console.log(`   - Misunderstandings: ${misunderstandingCount}`);
    console.log(`   - Quotes: ${quoteCount}`);

    console.log("\n✨ Training data import completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Themes: ${themeMap.size}`);
    console.log(`   - Teachers: ${teacherMap.size}`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error importing training data:", error);
    await connection.end();
    process.exit(1);
  }
}

importData();
