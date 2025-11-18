import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { 
  teachers, 
  teacherBiographies,
  integrationGuides,
  glossaryTerms
} from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function importV3Optimized() {
  console.log("📚 Starting OPTIMIZED v3.0 dataset import...\n");
  console.log("⚡ Phase 1: Core teacher data + biographies + integration guides\n");
  
  const jsonData = JSON.parse(readFileSync("/home/ubuntu/upload/spiritual_training_dataset_v3.0.json", "utf-8"));
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const teacher of jsonData.teachers) {
    try {
      console.log(`Processing: ${teacher.full_name}...`);
      
      // 1. Update teacher with longSummary
      await db.update(teachers)
        .set({
          longSummary: teacher.long_summary,
          updatedAt: new Date()
        })
        .where(eq(teachers.teacherId, teacher.teacher_id));
      
      // Get the teacher's database ID
      const [teacherRecord] = await db.select().from(teachers).where(eq(teachers.teacherId, teacher.teacher_id)).limit(1);
      
      if (!teacherRecord) {
        console.log(`  ⚠️  Teacher not found in database, skipping`);
        continue;
      }
      
      const dbTeacherId = teacherRecord.id;
      
      // 2. Insert biography (if exists)
      if (teacher.biography) {
        try {
          await db.insert(teacherBiographies).values({
            teacherId: dbTeacherId,
            lifeStory: teacher.biography.life_story,
            historicalContext: teacher.biography.historical_context,
            keyLifeEvents: teacher.biography.key_life_events || [],
            influencesReceived: teacher.biography.influences_received || [],
            influencesGiven: teacher.biography.influences_given || [],
            legacyImpact: teacher.biography.legacy_and_impact,
            keySources: teacher.key_sources || []
          }).onDuplicateKeyUpdate({
            set: {
              lifeStory: teacher.biography.life_story,
              historicalContext: teacher.biography.historical_context
            }
          });
          console.log(`  ✅ Biography imported`);
        } catch (err) {
          console.log(`  ⚠️  Biography skipped: ${err.message}`);
        }
      }
      
      // 3. Insert integration guide (if exists)
      if (teacher.integration_guide) {
        try {
          await db.insert(integrationGuides).values({
            teacherId: dbTeacherId,
            beginnerPath: teacher.integration_guide.beginner_path,
            intermediatePath: teacher.integration_guide.intermediate_path,
            advancedPath: teacher.integration_guide.advanced_path,
            dailyIntegration: teacher.integration_guide.daily_integration || [],
            complementaryTeachers: teacher.integration_guide.complementary_teachers || [],
            potentialPitfalls: teacher.integration_guide.potential_pitfalls || [],
            signsOfProgress: teacher.integration_guide.signs_of_progress || [],
            whenThisHelps: teacher.integration_guide.when_this_teaching_helps_most,
            whenToLookElsewhere: teacher.integration_guide.when_to_look_elsewhere
          }).onDuplicateKeyUpdate({
            set: {
              beginnerPath: teacher.integration_guide.beginner_path,
              intermediatePath: teacher.integration_guide.intermediate_path,
              advancedPath: teacher.integration_guide.advanced_path
            }
          });
          console.log(`  ✅ Integration guide imported`);
        } catch (err) {
          console.log(`  ⚠️  Integration guide skipped: ${err.message}`);
        }
      }
      
      successCount++;
      console.log(`✅ ${teacher.full_name} completed\n`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${teacher.full_name}:`, error.message);
    }
  }
  
  // Import global glossary
  console.log("\n📖 Phase 2: Importing global glossary...\n");
  if (jsonData.global_glossary && jsonData.global_glossary.length > 0) {
    let glossaryCount = 0;
    for (const term of jsonData.global_glossary) {
      try {
        await db.insert(glossaryTerms).values({
          term: term.term,
          definition: term.definition,
          traditions: term.traditions || [],
          relatedTerms: term.related_terms || []
        }).onDuplicateKeyUpdate({
          set: {
            definition: term.definition
          }
        });
        glossaryCount++;
      } catch (error) {
        // Skip duplicates silently
      }
    }
    console.log(`✅ Imported ${glossaryCount} glossary terms\n`);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log(`✅ OPTIMIZED IMPORT COMPLETE!`);
  console.log(`   Success: ${successCount} teachers`);
  console.log(`   Errors: ${errorCount} teachers`);
  console.log(`\n   📝 Note: Key ideas, practices, questions, and case studies`);
  console.log(`   can be imported separately if needed.`);
  console.log("=".repeat(60));
}

// Run the import
importV3Optimized().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
