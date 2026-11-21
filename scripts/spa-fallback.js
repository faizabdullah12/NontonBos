// Salin index.html -> 404.html agar deep link (mis. /jelajah/82) tetap jalan di GitHub Pages
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('404.html dibuat untuk SPA fallback');
