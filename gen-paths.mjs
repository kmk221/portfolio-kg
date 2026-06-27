import pkg from 'opentype.js';
const { parse } = pkg;
import { readFileSync } from 'fs';

const font = parse(readFileSync('./permanent-marker.ttf').buffer);

function getCharPath(char, fontSize) {
  const path = font.getPath(char, 0, fontSize, fontSize);
  const bb = path.getBoundingBox();
  if (bb.x1 === Infinity) return null; // space or empty
  const w = Math.ceil(bb.x2 - bb.x1) + 4;
  const h = Math.ceil(bb.y2 - bb.y1) + 4;
  const ox = -bb.x1 + 2;
  const oy = -bb.y1 + 2;
  const path2 = font.getPath(char, ox, fontSize + oy - 2, fontSize);
  const bb2 = path2.getBoundingBox();
  return {
    d: path2.toPathData(1),
    w: Math.ceil(bb2.x2) + 2,
    h: Math.ceil(bb2.y2) + 2,
    advance: font.getAdvanceWidth(char, fontSize),
  };
}

function getWordPaths(word, fontSize) {
  const chars = [];
  let x = 0;
  for (const ch of word) {
    if (ch === ' ') { x += fontSize * 0.3; continue; }
    const info = getCharPath(ch, fontSize);
    if (info) chars.push({ ch, x: Math.round(x), ...info });
    x += font.getAdvanceWidth(ch, fontSize);
  }
  return chars;
}

console.log('export const KG_CHARS =', JSON.stringify(getWordPaths('Kristin Garza', 52), null, 0), ';');
console.log('export const HUMANS_CHARS =', JSON.stringify(getWordPaths('humans', 72), null, 0), ';');
