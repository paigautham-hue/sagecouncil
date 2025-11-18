import { drizzle } from "drizzle-orm/mysql2";
import { teachers, caseStudies } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL);

// Load v3.0 dataset
const datasetPath = "/home/ubuntu/upload/spiritual_training_dataset_v3.0.json";
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

async function importCaseStudies() {
  console.log("📚 Importing case studies from v3.0 dataset...\n");
  
  let totalSuccess = 0;
  let totalErrors = 0;
  let totalSkipped = 0;
  
  for (const teacherData of dataset.teachers) {
    const teacherName = teacherData.full_name;
    console.log(`Processing: ${teacherName}...`);
    
    // Find teacher in database
    const [teacher] = await db
      .select()
      .from(teachers)
      .where(eq(teachers.fullName, teacherName))
      .limit(1);
    
    if (!teacher) {
      console.log(`  ⚠️  Teacher not found: ${teacherName}`);
      totalSkipped++;
      continue;
    }
    
    // Import case studies
    const caseStudiesData = teacherData.case_studies || [];
    
    if (caseStudiesData.length === 0) {
      console.log(`  ℹ️  No case studies for ${teacherName}`);
      continue;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const caseStudy of caseStudiesData) {
      try {
        await db.insert(caseStudies).values({
          teacherId: teacher.id,
          domain: caseStudy.life_domain || "General",
          scenario: caseStudy.scenario || "",
          relevantTeaching: caseStudy.relevant_teaching || "",
          application: caseStudy.application || "",
          outcome: caseStudy.outcome || "",
          commonObstacles: caseStudy.common_obstacles || null,
        });
        successCount++;
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
        errorCount++;
      }
    }
    
    console.log(`  ✅ Imported ${successCount} case studies`);
    if (errorCount > 0) {
      console.log(`  ❌ Errors: ${errorCount}`);
    }
    
    totalSuccess += successCount;
    totalErrors += errorCount;
  }
  
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ CASE STUDIES IMPORT COMPLETE!`);
  console.log(`   Success: ${totalSuccess} case studies`);
  console.log(`   Errors: ${totalErrors} case studies`);
  console.log(`   Skipped teachers: ${totalSkipped}`);
  console.log(`${"=".repeat(60)}`);
}

importCaseStudies().catch(console.error);
