// Generates WAV sound effects programmatically
const fs = require("fs");
const path = require("path");

const SR = 44100;

function writeWav(filename, samples) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(s * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  fs.writeFileSync(filename, Buffer.concat([header, data]));
  console.log(`✓ ${path.basename(filename)}`);
}

const out = path.join(__dirname, "../remotion-demo/public/audio");

// 1. IMPACT — deep bass thud when numbers slam in
(() => {
  const dur = 0.4;
  const n = Math.round(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 14);
    s[i] = Math.sin(2 * Math.PI * 55 * t) * env * 0.9
          + Math.sin(2 * Math.PI * 110 * t) * env * 0.4
          + (Math.random() * 2 - 1) * env * 0.15;
  }
  writeWav(`${out}/impact.wav`, s);
})();

// 2. WHOOSH — fast scene transition
(() => {
  const dur = 0.35;
  const n = Math.round(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const freq = 800 + (1 - t / dur) * 2400;
    const env = Math.sin(Math.PI * t / dur) * Math.exp(-t * 4);
    s[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.5
          + (Math.random() * 2 - 1) * env * 0.4;
  }
  writeWav(`${out}/whoosh.wav`, s);
})();

// 3. DING — bright highlight pop
(() => {
  const dur = 0.6;
  const n = Math.round(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 8);
    s[i] = Math.sin(2 * Math.PI * 880 * t) * env * 0.6
          + Math.sin(2 * Math.PI * 1760 * t) * env * 0.3
          + Math.sin(2 * Math.PI * 1320 * t) * env * 0.2;
  }
  writeWav(`${out}/ding.wav`, s);
})();

// 4. SCAN — tech scanning line beep
(() => {
  const dur = 0.15;
  const n = Math.round(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const freq = 1200 + t / dur * 800;
    const env = Math.sin(Math.PI * t / dur);
    s[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.35;
  }
  writeWav(`${out}/scan.wav`, s);
})();

// 5. POWER — dramatic power-up for opening
(() => {
  const dur = 0.8;
  const n = Math.round(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const freq = 80 + (t / dur) * 320;
    const env = t < 0.1 ? t / 0.1 : Math.exp(-(t - 0.1) * 3);
    s[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.7
          + Math.sin(2 * Math.PI * freq * 2 * t) * env * 0.3
          + (Math.random() * 2 - 1) * env * 0.1;
  }
  writeWav(`${out}/power.wav`, s);
})();

console.log("All sound effects generated!");
