import { readFileSync, writeFileSync } from 'fs';

const homePath = 'client/src/pages/Home.tsx';
let content = readFileSync(homePath, 'utf-8');

// Add TemplePortal import
if (!content.includes('TemplePortal')) {
  content = content.replace(
    'import { useEffect, useState } from "react";',
    'import { useEffect, useState } from "react";\nimport { TemplePortal } from "@/components/TemplePortal";'
  );
}

// Update hero section to include temple portal
content = content.replace(
  '{/* Hero Section */}\n      <section className="relative overflow-hidden py-20 md:py-32">',
  `{/* Hero Section with Temple Portal */}
      <section className="relative overflow-hidden">
        {/* Temple Portal Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
          <TemplePortal />
        </div>
        
        <div className="relative py-20 md:py-32">`
);

// Close the wrapper div before features section
content = content.replace(
  '      {/* Features Section */}',
  '        </div>\n      </section>\n\n      {/* Features Section */}'
);

// Fix the section closing tag
content = content.replace(
  '        )}\ n      </section>\n\n      {/* Features Section */}',
  '        )}\n        </div>\n      </section>\n\n      {/* Features Section */}'
);

writeFileSync(homePath, content);
console.log('✅ Updated Home.tsx with Temple Portal');
