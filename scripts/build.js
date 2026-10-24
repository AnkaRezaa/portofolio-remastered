const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const portalDir = path.join(rootDir, 'portofolio-portal');
const remakeDir = path.join(rootDir, 'portofolio-reza-remake');
const distDir = path.join(rootDir, 'dist');
const portfolioSubDir = path.join(distDir, 'portfolio');

console.log('🚀 [1/3] Building React Web Portfolio (portofolio-reza-remake)...');
execSync('npm run build', {
  cwd: remakeDir,
  stdio: 'inherit',
});

console.log('🧹 [2/3] Preparing output directory (dist/)...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('📁 [3/3] Assembling Unified Ecosystem into dist/...');
// Copy portofolio-portal into dist/ (Terminal Gateway at root /)
fs.cpSync(portalDir, distDir, { recursive: true });

// Copy portofolio-reza-remake/dist into dist/portfolio/
const remakeDist = path.join(remakeDir, 'dist');
if (fs.existsSync(remakeDist)) {
  fs.cpSync(remakeDist, portfolioSubDir, { recursive: true });
}

console.log('✨ Build successful! Directory structure ready:');
console.log('   - /           -> Linux Terminal Portal Gateway');
console.log('   - /portfolio/ -> Modern React Web Portfolio');
