import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { embeddings, teachers, keyIdeas, practices, quotes } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Generate embedding for text using simple TF-IDF-like approach
 * This creates a 384-dimensional vector based on word frequencies and positions
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const dimension = 384;
  const embedding = new Array(dimension).fill(0);
  
  // Normalize text
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/).filter(w => w.length > 2);
  
  // Generate embedding based on word hashes and positions
  words.forEach((word, idx) => {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Map to embedding dimensions
    const pos = Math.abs(hash) % dimension;
    const weight = 1 / (idx + 1); // Earlier words have more weight
    embedding[pos] += weight;
  });
  
  // Normalize the embedding vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    for (let i = 0; i < dimension; i++) {
      embedding[i] /= magnitude;
    }
  }
  
  return embedding;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Store embedding in database
 */
export async function storeEmbedding(
  contentType: "idea" | "practice" | "quote" | "teacher",
  contentId: number,
  teacherId: number,
  text: string,
  embedding: number[]
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(embeddings).values({
    sourceType: contentType,
    sourceId: contentId,
    teacherId,
    chunkText: text,
    embedding,
    metadata: {},
  });
}

/**
 * Search for similar content using vector similarity
 */
export async function semanticSearch(
  query: string,
  limit: number = 5,
  teacherIds?: number[]
): Promise<Array<{
  text: string;
  similarity: number;
  sourceType: string;
  sourceId: number;
  teacherId: number;
}>> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Generate embedding for query
  const queryEmbedding = await generateEmbedding(query);

  // Fetch all embeddings (with optional teacher filter)
  let query_builder = db.select().from(embeddings);
  
  if (teacherIds && teacherIds.length > 0) {
    query_builder = query_builder.where(
      sql`${embeddings.teacherId} IN (${sql.join(teacherIds.map(id => sql`${id}`), sql`, `)})`
    ) as any;
  }

  const allEmbeddings = await query_builder;

  // Calculate similarities
  const results = allEmbeddings.map((emb) => {
    const embVector = JSON.parse(emb.embedding as any) as number[];
    const similarity = cosineSimilarity(queryEmbedding, embVector);
    
    return {
      text: emb.chunkText,
      similarity,
      sourceType: emb.sourceType,
      sourceId: emb.sourceId,
      teacherId: emb.teacherId!,
    };
  });

  // Sort by similarity and return top results
  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Generate embeddings for all teacher content
 */
export async function generateAllEmbeddings() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  console.log("🚀 Starting embedding generation...");

  // Get all teachers
  const allTeachers = await db.select().from(teachers);
  console.log(`📚 Processing ${allTeachers.length} teachers...`);

  let totalEmbeddings = 0;

  for (const teacher of allTeachers) {
    console.log(`\n👤 Processing ${teacher.fullName}...`);

    // Generate teacher overview embedding
    if (teacher.oneLineEssence) {
      const embedding = await generateEmbedding(teacher.oneLineEssence);
      await storeEmbedding("teacher", teacher.id, teacher.id, teacher.oneLineEssence, embedding);
      totalEmbeddings++;
    }

    // Get and embed key ideas
    const ideas = await db.select().from(keyIdeas).where(eq(keyIdeas.teacherId, teacher.id));
    console.log(`  💡 ${ideas.length} key ideas`);
    
    for (const idea of ideas) {
      const text = `${idea.name}: ${idea.clearExplanation || ""}`;
      const embedding = await generateEmbedding(text);
      await storeEmbedding("idea", idea.id, teacher.id, text, embedding);
      totalEmbeddings++;
    }

    // Get and embed practices
    const pracs = await db.select().from(practices).where(eq(practices.teacherId, teacher.id));
    console.log(`  🧘 ${pracs.length} practices`);
    
    for (const practice of pracs) {
      const text = `${practice.name}: ${practice.stepByStep || ""}`;
      const embedding = await generateEmbedding(text);
      await storeEmbedding("practice", practice.id, teacher.id, text, embedding);
      totalEmbeddings++;
    }

    // Get and embed quotes
    const quotesList = await db.select().from(quotes).where(eq(quotes.teacherId, teacher.id));
    console.log(`  💬 ${quotesList.length} quotes`);
    
    for (const quote of quotesList) {
      const embedding = await generateEmbedding(quote.text);
      await storeEmbedding("quote", quote.id, teacher.id, quote.text, embedding);
      totalEmbeddings++;
    }

    console.log(`  ✅ Completed ${teacher.fullName}`);
  }

  console.log(`\n🎉 Generated ${totalEmbeddings} embeddings for ${allTeachers.length} teachers!`);
  return { totalEmbeddings, totalTeachers: allTeachers.length };
}

/**
 * Get relevant context for a user question
 */
export async function getRelevantContext(
  question: string,
  teacherIds?: number[],
  limit: number = 5
): Promise<string> {
  const results = await semanticSearch(question, limit, teacherIds);
  
  if (results.length === 0) {
    return "No relevant context found.";
  }

  return results
    .map((r, idx) => `[${idx + 1}] ${r.text} (similarity: ${r.similarity.toFixed(3)})`)
    .join("\n\n");
}
