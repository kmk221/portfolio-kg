import pkg from 'opentype.js';
const { parse } = pkg;
import { readFileSync } from 'fs';

const font = parse(readFileSync('./permanent-marker.ttf').buffer);

function getPathData(text, fontSize) {
  const path = font.getPath(text, 0, fontSize, fontSize);
  // Get bounding box
  const bb = path.getBoundingBox();
  const w = Math.ceil(bb.x2 - bb.x1) + 20;
  const h = Math.ceil(bb.y2 - bb.y1) + 20;
  const offsetX = -bb.x1 + 10;
  const offsetY = -bb.y1 + 10;

  // Re-render with offset
  const path2 = font.getPath(text, offsetX, fontSize + offsetY - 10, fontSize);
  const bb2 = path2.getBoundingBox();
  const w2 = Math.ceil(bb2.x2) + 10;
  const h2 = Math.ceil(bb2.y2) + 10;

  const d = path2.toPathData(1);
  return { d, w: w2, h: h2 };
}

const kg = getPathData('Kristin Garza', 52);
const hu = getPathData('humans', 72);

console.log('--- KRISTIN GARZA ---');
console.log(`viewBox="0 0 ${kg.w} ${kg.h}"`);
console.log(`d="${kg.d}"`);

console.log('\n--- HUMANS ---');
console.log(`viewBox="0 0 ${hu.w} ${hu.h}"`);
console.log(`d="${hu.d}"`);
