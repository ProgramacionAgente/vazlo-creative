// Genera public/brand/ a partir de los logos fuente en public/uploads/.
// Ejecutar una sola vez tras actualizar el logo; el resultado se comitea.
// No corre en CI. Requiere `sharp` (devDependency transitiva de Astro).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'public/uploads/';
const OUT = 'public/brand/';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(OUT, { recursive: true });

async function buildIsotipoMaster(canvasSize = 512, marginRatio = 0.08) {
  const trimmed = sharp(SRC + 'Logo_3.png').trim({ threshold: 1 });
  const trimmedMeta = await trimmed.clone().png().toBuffer({ resolveWithObject: true });
  const { width: tw, height: th } = trimmedMeta.info;

  const targetH = Math.round(canvasSize * (1 - marginRatio * 2));
  const targetW = Math.round((tw / th) * targetH);

  const resizedBuffer = await sharp(trimmedMeta.data)
    .resize({ width: targetW, height: targetH, fit: 'fill' })
    .png()
    .toBuffer();

  const padLeft = Math.round((canvasSize - targetW) / 2);
  const padTop = Math.round((canvasSize - targetH) / 2);
  const padRight = canvasSize - targetW - padLeft;
  const padBottom = canvasSize - targetH - padTop;

  return sharp(resizedBuffer)
    .extend({ top: padTop, bottom: padBottom, left: padLeft, right: padRight, background: TRANSPARENT })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

console.log('Generando isotipo maestro (512x512, transparente)...');
const isotipoMaster = await buildIsotipoMaster(512, 0.08);
await sharp(isotipoMaster).toFile(OUT + 'isotipo.png');

console.log('Derivados PNG del isotipo...');
for (const [name, size] of [['icon-512', 512], ['icon-192', 192], ['favicon-32', 32], ['favicon-16', 16]]) {
  await sharp(isotipoMaster).resize(size, size).png().toFile(`${OUT}${name}.png`);
}

console.log('apple-touch-icon (opaco, iOS no soporta transparencia)...');
{
  const size = 180;
  const markSize = Math.round(size * 0.82);
  const pad = Math.round((size - markSize) / 2);
  const markBuf = await sharp(isotipoMaster).resize(markSize, markSize).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: markBuf, left: pad, top: pad }])
    .flatten({ background: '#FFFFFF' })
    .png()
    .toFile(OUT + 'apple-touch-icon.png');
}

console.log('icon maskable 512x512 (zona segura 80%, fondo opaco)...');
{
  const size = 512;
  const markSize = Math.round(size * 0.58);
  const pad = Math.round((size - markSize) / 2);
  const markBuf = await sharp(isotipoMaster).resize(markSize, markSize).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: markBuf, left: pad, top: pad }])
    .flatten({ background: '#FFFFFF' })
    .png()
    .toFile(OUT + 'icon-maskable-512.png');
}

console.log('Imagotipo horizontal (footer / usos futuros)...');
await sharp(SRC + 'Logo.png')
  .trim({ threshold: 1 })
  .resize({ width: 720 })
  .png({ compressionLevel: 9 })
  .toFile(OUT + 'logo-horizontal.png');

console.log('OG por defecto (1200x630, imagotipo centrado sobre hueso)...');
{
  const logoBuf = await sharp(SRC + 'Logo.png').trim({ threshold: 1 }).resize({ width: 660 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#F7F6F4' } })
    .composite([{ input: logoBuf, gravity: 'centre' }])
    .png()
    .toFile(OUT + 'og-default.png');
}

console.log('Listo. Archivos generados en ' + OUT);
