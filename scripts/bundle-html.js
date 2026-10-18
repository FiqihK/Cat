import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const htmlPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Find CSS file
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  // Replace <link rel="stylesheet" ...> with <style>...</style>
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/i, `<style>\n${cssContent}\n</style>`);
}

if (jsFile) {
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  // Replace <script type="module" crossorigin src="..."></script> with inline script
  html = html.replace(/<script[^>]+src=["'][^"']*index-[^"']*\.js["'][^>]*><\/script>/i, `<script type="module">\n${jsContent}\n</script>`);
}

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Write to public/pusat-cat-indonesia.html and dist/pusat-cat-indonesia.html
const publicOut = path.resolve('public/pusat-cat-indonesia.html');
const distOut = path.join(distDir, 'pusat-cat-indonesia.html');

fs.writeFileSync(publicOut, html, 'utf8');
fs.writeFileSync(distOut, html, 'utf8');

console.log('Standalone single-file HTML generated successfully at:');
console.log(' - ' + publicOut);
console.log(' - ' + distOut);
