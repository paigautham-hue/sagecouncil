import { readFileSync, writeFileSync, readdirSync } from 'fs';

const pagesDir = 'client/src/pages';
const files = ['Sages.tsx', 'SageDetail.tsx', 'Council.tsx'];

files.forEach(file => {
  const path = `${pagesDir}/${file}`;
  try {
    let content = readFileSync(path, 'utf-8');
    
    // Add import if not present
    if (!content.includes('getSagePortrait')) {
      content = content.replace(
        /import.*from.*react.*;/,
        `$&\nimport { getSagePortrait } from "@/lib/sagePortraits";`
      );
    }
    
    // Replace avatar divs with image elements
    // Pattern 1: Simple avatar with initials
    content = content.replace(
      /className="([^"]*w-\d+ h-\d+[^"]*rounded-full[^"]*)"[^>]*>\s*{?[^<}]*\.charAt\(0\)[^<}]*}?\s*<\/div>/g,
      `className="$1 overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/30 bg-slate-900/50">
                    <img src={getSagePortrait(teacher?.fullName || sage?.fullName || "")} alt={teacher?.fullName || sage?.fullName} className="w-full h-full object-cover" />
                  </div>`
    );
    
    writeFileSync(path, content);
    console.log(`✅ Updated ${file}`);
  } catch (err) {
    console.log(`⏭️  Skipped ${file}: ${err.message}`);
  }
});

console.log('Done!');
