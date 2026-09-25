import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Next prefixes bundles with basePath, but public font URLs in CSS need the same prefix.
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
async function prefixFonts(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await prefixFonts(file);
    else if (file.endsWith('.css')) {
      const css = await readFile(file, 'utf8');
      await writeFile(file, css.replace(/url\((['"]?)\/fonts\//g, `url($1${base}/fonts/`));
    }
  }
}
if (base) await prefixFonts('out/_next');
