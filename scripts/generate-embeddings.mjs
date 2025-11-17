import { generateAllEmbeddings } from "../server/rag.ts";

console.log("🎯 Council of Sages - Embedding Generation");
console.log("==========================================\n");

try {
  const result = await generateAllEmbeddings();
  console.log("\n✅ Embedding generation complete!");
  console.log(`📊 Total embeddings: ${result.totalEmbeddings}`);
  console.log(`👥 Total teachers: ${result.totalTeachers}`);
  process.exit(0);
} catch (error) {
  console.error("\n❌ Error generating embeddings:", error);
  process.exit(1);
}
