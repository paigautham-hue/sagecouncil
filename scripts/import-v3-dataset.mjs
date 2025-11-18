import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { 
  teachers, 
  keyIdeas, 
  practices, 
  centralQuestions,
  teacherBiographies,
  caseStudies,
  integrationGuides,
  glossaryTerms,
  quotes
} from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function importV3Dataset() {
  console.log("📚 Starting v3.0 dataset import...\n");
  
  // Read the JSON file
  const jsonData = JSON.parse(readFileSync("/home/ubuntu/upload/spiritual_training_dataset_v3.0.json", "utf-8"));
  
  console.log(`✅ Loaded dataset with ${jsonData.teachers.length} teachers\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const teacher of jsonData.teachers) {
    try {
      console.log(`Processing: ${teacher.full_name}...`);
      
      // 1. Insert or update teacher basic info
      const teacherResult = await db.insert(teachers).values({
        teacherId: teacher.teacher_id,
        fullName: teacher.full_name,
        phase: teacher.phase,
        alsoAppearsInPhases: teacher.also_appears_in_phases || [],
        traditionTags: teacher.tradition_tags || [],
        era: teacher.era,
        regions: teacher.regions || [],
        oneLineEssence: teacher.one_line_essence,
        shortSummary: teacher.short_summary,
        mediumSummary: teacher.medium_summary,
        longSummary: teacher.long_summary,
        isActive: true
      }).onDuplicateKeyUpdate({
        set: {
          fullName: teacher.full_name,
          longSummary: teacher.long_summary,
          mediumSummary: teacher.medium_summary,
          shortSummary: teacher.short_summary,
          oneLineEssence: teacher.one_line_essence,
          updatedAt: new Date()
        }
      });
      
      // Get the teacher's database ID
      const [teacherRecord] = await db.select().from(teachers).where(eq(teachers.teacherId, teacher.teacher_id)).limit(1);
      const dbTeacherId = teacherRecord.id;
      
      // 2. Insert biography
      if (teacher.biography) {
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
            historicalContext: teacher.biography.historical_context,
            keyLifeEvents: teacher.biography.key_life_events || [],
            influencesReceived: teacher.biography.influences_received || [],
            influencesGiven: teacher.biography.influences_given || [],
            legacyImpact: teacher.biography.legacy_and_impact,
            keySources: teacher.key_sources || []
          }
        });
      }
      
      // 3. Insert integration guide
      if (teacher.integration_guide) {
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
            advancedPath: teacher.integration_guide.advanced_path,
            dailyIntegration: teacher.integration_guide.daily_integration || [],
            complementaryTeachers: teacher.integration_guide.complementary_teachers || [],
            potentialPitfalls: teacher.integration_guide.potential_pitfalls || [],
            signsOfProgress: teacher.integration_guide.signs_of_progress || [],
            whenThisHelps: teacher.integration_guide.when_this_teaching_helps_most,
            whenToLookElsewhere: teacher.integration_guide.when_to_look_elsewhere
          }
        });
      }
      
      // 4. Insert key ideas (enhanced)
      if (teacher.key_ideas && Array.isArray(teacher.key_ideas) && teacher.key_ideas.length > 0) {
        for (const idea of teacher.key_ideas) {
          if (!idea || !idea.name) {
            console.log(`  ⚠️  Skipping key idea without name`);
            continue;
          }
          await db.insert(keyIdeas).values({
            teacherId: dbTeacherId,
            ideaId: `${teacher.teacher_id}_${idea.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
            name: idea.name,
            summary: idea.summary,
            examples: idea.examples,
            lifeDomains: idea.life_domains || [],
            strengths: idea.strengths,
            potentialMisuse: idea.potential_misuse
          }).onDuplicateKeyUpdate({
            set: {
              name: idea.name,
              summary: idea.summary,
              examples: idea.examples,
              lifeDomains: idea.life_domains || [],
              strengths: idea.strengths,
              potentialMisuse: idea.potential_misuse
            }
          });
        }
      }
      
      // 5. Insert practices (enhanced)
      if (teacher.recommended_practices && teacher.recommended_practices.length > 0) {
        for (const practice of teacher.recommended_practices) {
          // Skip if practice doesn't have a name
          if (!practice.name) {
            console.log(`  ⚠️  Skipping practice without name`);
            continue;
          }
          
          // Convert variations from dict to array format
          const truncatedVariations = practice.variations && typeof practice.variations === 'object' ?
            Object.entries(practice.variations).map(([level, description]) => ({
              level,
              description: typeof description === 'string' ? description.substring(0, 500) : ''
            })) : [];
          
          // Handle obstacles - can be array or null
          const truncatedObstacles = Array.isArray(practice.obstacles) ?
            practice.obstacles.slice(0, 5).map(o => ({
              obstacle: o?.obstacle ? String(o.obstacle).substring(0, 150) : '',
              solution: o?.solution ? String(o.solution).substring(0, 150) : ''
            })) : [];
          
          try {
            await db.insert(practices).values({
              teacherId: dbTeacherId,
              practiceId: `${teacher.teacher_id}_${practice.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
              name: practice.name,
              type: practice.type,
              stepByStep: practice.step_by_step ? practice.step_by_step.substring(0, 5000) : null,
              variations: truncatedVariations,
              progression: practice.progression ? practice.progression.substring(0, 2000) : null,
              obstacles: truncatedObstacles,
              progressIndicators: practice.progress_indicators ? practice.progress_indicators.slice(0, 7) : [],
              intendedEffect: practice.intended_effect ? practice.intended_effect.substring(0, 1000) : null,
              cautions: practice.cautions ? practice.cautions.substring(0, 1000) : null,
              timeCommitment: practice.time_commitment
            }).onDuplicateKeyUpdate({
              set: {
                name: practice.name,
                type: practice.type,
                stepByStep: practice.step_by_step ? practice.step_by_step.substring(0, 5000) : null,
                variations: truncatedVariations,
                progression: practice.progression ? practice.progression.substring(0, 2000) : null,
                obstacles: truncatedObstacles,
                progressIndicators: practice.progress_indicators ? practice.progress_indicators.slice(0, 7) : [],
                intendedEffect: practice.intended_effect ? practice.intended_effect.substring(0, 1000) : null,
                cautions: practice.cautions ? practice.cautions.substring(0, 1000) : null,
                timeCommitment: practice.time_commitment
              }
            });
          } catch (err) {
            console.log(`  ⚠️  Skipping practice "${practice.name}": ${err.message}`);
          }
        }
      }
      
      // 6. Insert central questions (enhanced)
      if (teacher.central_questions && Array.isArray(teacher.central_questions) && teacher.central_questions.length > 0) {
        for (const q of teacher.central_questions) {
          if (!q || !q.question) continue;
          await db.insert(centralQuestions).values({
            teacherId: dbTeacherId,
            question: q.question,
            category: q.category || 'general',
            explanation: q.explanation,
            lifeRelevance: q.life_relevance
          });
        }
      }
      
      // 7. Insert case studies
      if (teacher.case_studies && Array.isArray(teacher.case_studies) && teacher.case_studies.length > 0) {
        for (const caseStudy of teacher.case_studies) {
          if (!caseStudy || !caseStudy.scenario) continue;
          await db.insert(caseStudies).values({
            teacherId: dbTeacherId,
            domain: caseStudy.life_domain || 'general',
            scenario: caseStudy.scenario || '',
            relevantTeaching: caseStudy.relevant_teaching,
            application: caseStudy.application,
            outcome: caseStudy.outcome,
            commonObstacles: caseStudy.common_obstacles
          });
        }
      }
      
      // 8. Insert quotes
      if (teacher.selected_short_quotes && teacher.selected_short_quotes.length > 0) {
        for (const quote of teacher.selected_short_quotes) {
          await db.insert(quotes).values({
            teacherId: dbTeacherId,
            text: quote.text,
            isParaphrase: quote.is_paraphrase || false,
            sourceReference: quote.source_reference,
            isFeatured: false
          });
        }
      }
      
      successCount++;
      console.log(`✅ ${teacher.full_name} imported successfully\n`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${teacher.full_name}:`, error.message);
      console.error(error.stack);
    }
  }
  
  // Import global glossary
  if (jsonData.global_glossary && jsonData.global_glossary.length > 0) {
    console.log("\n📖 Importing global glossary...");
    for (const term of jsonData.global_glossary) {
      try {
        await db.insert(glossaryTerms).values({
          term: term.term,
          definition: term.definition,
          traditions: term.traditions || [],
          relatedTerms: term.related_terms || []
        }).onDuplicateKeyUpdate({
          set: {
            definition: term.definition,
            traditions: term.traditions || [],
            relatedTerms: term.related_terms || []
          }
        });
      } catch (error) {
        console.error(`Error importing glossary term "${term.term}":`, error.message);
      }
    }
    console.log(`✅ Imported ${jsonData.global_glossary.length} glossary terms\n`);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log(`✅ Import complete!`);
  console.log(`   Success: ${successCount} teachers`);
  console.log(`   Errors: ${errorCount} teachers`);
  console.log("=".repeat(60));
}

// Run the import
importV3Dataset().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
