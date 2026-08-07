import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.resolve(root, 'dist');
const output = path.resolve(root, 'html');
if (!source.startsWith(root) || !output.startsWith(root)) throw new Error('Las rutas de exportación deben permanecer dentro del proyecto.');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

const walk = async (directory) => {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry);
    if ((await stat(absolute)).isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
};

const htmlFiles = (await walk(output)).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  let markup = await readFile(file, 'utf8');
  const stylesheets = [...markup.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^\"]+\.css)">/g)];
  for (const match of stylesheets) {
    const cssPath = path.join(output, match[1].replace(/^\//, ''));
    const css = await readFile(cssPath, 'utf8');
    markup = markup.replace(match[0], `<style data-inline-source="${match[1]}">${css}</style>`);
  }
  await writeFile(file, markup, 'utf8');
}

await writeFile(path.join(output, 'README.md'), '# Exportación HTML\n\nGenerada automáticamente con `npm run export:html`. No edites estos archivos a mano; modifica `src/` y vuelve a exportar.\n', 'utf8');
console.log(`Exportación HTML lista: ${htmlFiles.length} páginas con CSS compilado en línea.`);
