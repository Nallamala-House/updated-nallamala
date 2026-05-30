const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const outputFilePath = path.join(__dirname, 'pyqs-data.json');

function buildTree(dirPath, relativePath = '') {
  const stats = fs.statSync(dirPath);
  const name = path.basename(dirPath);

  if (!stats.isDirectory()) {
    return {
      name,
      type: 'file',
      path: relativePath.replace(/\\/g, '/'),
      size: stats.size
    };
  }

  const children = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    // Ignore hidden files / directories
    if (file.startsWith('.')) continue;

    const fullPath = path.join(dirPath, file);
    const relPath = path.join(relativePath, file);
    children.push(buildTree(fullPath, relPath));
  }

  // Sort: directories first, then files alphabetically
  children.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === 'directory' ? -1 : 1;
  });

  return {
    name,
    type: 'directory',
    path: relativePath.replace(/\\/g, '/'),
    children
  };
}

try {
  console.log('Scanning Diploma and Foundation directories...');
  
  const diplomaPath = path.join(publicDir, 'Diploma');
  const foundationPath = path.join(publicDir, 'Foundation');
  
  const data = {
    Diploma: fs.existsSync(diplomaPath) ? buildTree(diplomaPath, 'Diploma').children : [],
    Foundation: fs.existsSync(foundationPath) ? buildTree(foundationPath, 'Foundation').children : []
  };

  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Successfully generated pyqs-data.json!');
} catch (error) {
  console.error('Error generating PYQ data:', error);
}
