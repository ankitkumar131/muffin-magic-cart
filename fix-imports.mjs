import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing pages
const pagesDir = path.join(__dirname, 'src', 'pages');

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace relative imports with alias imports
    let updatedContent = content
      // Fix button imports
      .replace(/from\s+["']\.\.\/\.\.\/components\/ui\/button["']/g, 'from "@/components/ui/button"')
      // Fix other UI component imports that might be using relative paths
      .replace(/from\s+["']\.\.\/\.\.\/components\/ui\/([^"']+)["']/g, 'from "@/components/ui/$1"');
    
    // Only write if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Fixed imports in ${path.relative(__dirname, filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${path.relative(__dirname, filePath)}:`, error.message);
    return false;
  }
}

// Process all TypeScript/TSX files in the pages directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Fix imports in TypeScript/TSX files
      if (fixImportsInFile(filePath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

console.log('🔍 Fixing relative imports in pages...');
const fixedCount = processDirectory(pagesDir);
console.log(`✨ Done! Fixed imports in ${fixedCount} files.`);
