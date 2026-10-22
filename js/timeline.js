/**
 * Direct-to-chip liquid cooling explainer.
 * Deterministic timeline. Frame index is the only clock.
 * Frames 0-1019 at 30 fps (34.0 s).
 */

export const FPS = 30;
export const TOTAL = 1020;
export const LAST = 1019;

export const CANVAS = { w: 1920, h: 1080 };
export const VIEW = { x: 32, y: 108, w: 1856, h: 860 };

export const GEO = {
  wallX: 630,
  reject: { x: 96, y: 248, w: 430, h: 500 },
  cdu: { x: 790, y: 196, w: 500, h: 690 },
  rack: { x: 1520, y: 128, w: 660, h: 900 },
};

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function smootherstep(t) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function fadeWindow(frame, inn, out, dur = 18) {
  const a = smootherstep((frame - inn) / dur);
  const b = 1 - smootherstep((frame - out) / dur);
  return clamp(a, 0, 1) * clamp(b, 0, 1);
}

export function ramp(frame, start, dur) {
  return smootherstep((frame - start) / dur);
}

export function serverBox(i) {
  const rack = GEO.rack;
  const h = 168;
  const gap = 22;
  const top = rack.y + 78;
  return {
    x: rack.x + 92,
    y: top + i * (h + gap),
    w: rack.w - 124,
    h,
  };
}

export function anchors() {
  const hero = serverBox(1);
  const cdu = GEO.cdu;
  const rej = GEO.reject;
  const rack = GEO.rack;
  return {
    reject: { x: rej.x + rej.w * 0.42, y: rej.y + 70 },
    wall: { x: GEO.wallX + 14, y: 210 },
    cdu: { x: cdu.x + cdu.w * 0.5, y: cdu.y + 34 },
    rack: { x: rack.x + rack.w * 0.68, y: rack.y + 30 },
    manifolds: { x: rack.x + 46, y: rack.y + 168 },
    server: { x: hero.x + hero.w * 0.58, y: hero.y + 26 },
    package: { x: hero.x + 150, y: hero.y + hero.h * 0.48 },
    returnPort: { x: hero.x - 4, y: hero.y + 40 },
    supplyPort: { x: hero.x - 4, y: hero.y + hero.h - 40 },
    hx: { x: cdu.x + cdu.w * 0.5, y: cdu.y + 250 },
    itPump: { x: cdu.x + 128, y: cdu.y + cdu.h - 118 },
    facPump: { x: cdu.x + cdu.w - 136, y: cdu.y + cdu.h - 118 },
    sensorFlow: { x: cdu.x + cdu.w - 18, y: cdu.y + cdu.h - 230 },
    sensorTin: { x: cdu.x + cdu.w - 18, y: cdu.y + 168 },
    sensorTout: { x: cdu.x + 18, y: cdu.y + 168 },
    sensorP: { x: cdu.x + 18, y: cdu.y + cdu.h - 230 },
    powerIn: { x: rack.x + rack.w * 0.55, y: rack.y - 8 },
    airOut: { x: rej.x + 70, y: rej.y - 6 },
  };
}

export function itReturnPath() {
  const a = anchors();
  const manX = GEO.rack.x + 58;
  const inlet = { x: GEO.cdu.x + GEO.cdu.w, y: GEO.cdu.y + 168 };
  return [
    a.returnPort,
    { x: manX, y: a.returnPort.y },
    { x: manX, y: inlet.y },
    { x: inlet.x + 70, y: inlet.y },
    inlet,
  ];
}

export function itSupplyPath() {
  const a = anchors();
  const manX = GEO.rack.x + 32;
  const outlet = { x: GEO.cdu.x + GEO.cdu.w, y: GEO.cdu.y + GEO.cdu.h - 188 };
  return [
    outlet,
    { x: manX, y: outlet.y },
    { x: manX, y: a.supplyPort.y },
    a.supplyPort,
  ];
}

export function facToCduPath() {
  const rej = GEO.reject;
  const start = { x: rej.x + rej.w, y: rej.y + rej.h * 0.74 };
  const end = { x: GEO.cdu.x, y: GEO.cdu.y + GEO.cdu.h - 210 };
  const x = GEO.wallX + 36;
  return [start, { x, y: start.y }, { x, y: end.y }, end];
}

export function cduToFacPath() {
  const rej = GEO.reject;
  const start = { x: GEO.cdu.x, y: GEO.cdu.y + 156 };
  const end = { x: rej.x + rej.w, y: rej.y + 108 };
  const x = GEO.wallX + 36;
  return [start, { x, y: start.y }, { x, y: end.y }, end];
}

export function pathLength(pts) {
  let n = 0;
  for (let i = 1; i < pts.length; i++) {
    n += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return n;
}

export function pointAlong(pts, u) {
  const target = clamp(u, 0, 1) * pathLength(pts);
  let run = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const seg = Math.hypot(dx, dy);
    if (run + seg >= target) {
      const t = seg === 0 ? 0 : (target - run) / seg;
      return {
        x: pts[i - 1].x + dx * t,
        y: pts[i - 1].y + dy * t,
        angle: Math.atan2(dy, dx),
      };
    }
    run += seg;
  }
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  return {
    x: last.x,
    y: last.y,
    angle: Math.atan2(last.y - prev.y, last.x - prev.x),
  };
}

const CAMERA_KEYS = [
  { f: 0, x: 1160, y: 560, z: 0.64 },
  { f: 88, x: 1200, y: 548, z: 0.68 },
  { f: 149, x: 1200, y: 540, z: 0.7 },
  { f: 198, x: 1720, y: 500, z: 1.7 },
  { f: 248, x: 1860, y: 470, z: 2.85 },
  { f: 318, x: 1760, y: 455, z: 2.45 },
  { f: 410, x: 1540, y: 430, z: 1.72 },
  { f: 490, x: 1240, y: 410, z: 1.78 },
  { f: 575, x: 1040, y: 560, z: 1.38 },
  { f: 690, x: 1040, y: 570, z: 1.46 },
  { f: 749, x: 1040, y: 560, z: 1.36 },
  { f: 960, x: 1180, y: 760, z: 0.56 },
  { f: 1019, x: 1180, y: 760, z: 0.56 },
];

function sampleKeys(frame) {
  const keys = CAMERA_KEYS;
  if (frame <= keys[0].f) return { x: keys[0].x, y: keys[0].y, z: keys[0].z };
  const last = keys[keys.length - 1];
  if (frame >= last.f) return { x: last.x, y: last.y, z: last.z };
  let i = 0;
  while (keys[i + 1].f < frame) i += 1;
  const a = keys[i];
  const b = keys[i + 1];
  const u = smootherstep((frame - a.f) / (b.f - a.f));
  return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) };
}

export function tracerU(frame) {
  if (frame < 324) return 0;
  if (frame > 500) return 1;
  return smootherstep((frame - 324) / 176);
}

export function camera(frame) {
  const base = sampleKeys(frame);
  if (frame < 332 || frame > 545) return base;
  const u = tracerU(frame);
  const p = pointAlong(itReturnPath(), u);
  const followZ = lerp(2.15, 1.7, smootherstep((frame - 332) / 180));
  const follow = { x: p.x - 20, y: p.y, z: followZ };
  const inn = smootherstep((frame - 332) / 36);
  const out = smootherstep((frame - 500) / 40);
  const m = clamp(inn * (1 - out), 0, 1);
  return {
    x: lerp(base.x, follow.x, m),
    y: lerp(base.y, follow.y, m),
    z: lerp(base.z, follow.z, m),
  };
}

export function chapter(frame) {
  if (frame < 150) {
    return {
      id: 1,
      k: "01",
      t: "System",
      d: "Server, cold plates, rack manifolds, CDU, and the outdoor rejection path.",
    };
  }
  if (frame < 300) {
    return {
      id: 2,
      k: "02",
      t: "Package and plate",
      d: "Section through the package and thermal interface, then the cold plate.",
    };
  }
  if (frame < 510) {
    return {
      id: 3,
      k: "03",
      t: "Return path",
      d: "Warmed coolant to the rack return manifold, then the CDU exchanger.",
    };
  }
  if (frame < 750) {
    return {
      id: 4,
      k: "04",
      t: "Two loops",
      d: "Separate circuits exchange heat. In this arrangement the fluids do not mix.",
    };
  }
  return {
    id: 5,
    k: "05",
    t: "Whole system",
    d: "Rack, outdoor boundary, remaining air-cooled parts, qualitative monitoring.",
  };
}

export function appear(frame) {
  return {
    reject: ramp(frame, -20, 36),
    cdu: ramp(frame, 8, 34),
    rack: ramp(frame, 26, 34),
    pipes: ramp(frame, 46, 30),
  };
}

export function sectionOpen(frame) {
  return smootherstep((frame - 186) / 46);
}

export function sectionClose(frame) {
  return smootherstep((frame - 306) / 40);
}

export function sectionProgress(frame) {
  return clamp(sectionOpen(frame) * (1 - sectionClose(frame)), 0, 1);
}

export function microPhase(frame) {
  if (frame < 236) return "package";
  if (frame < 266) return "tim";
  return "plate";
}

export function conductionP(frame) {
  return ramp(frame, 246, 30);
}

export function intoFluidP(frame) {
  return ramp(frame, 272, 26);
}

export function exchangeP(frame) {
  return fadeWindow(frame, 548, 736, 22);
}

export function controlP(frame) {
  return ramp(frame, 700, 28);
}

export function shelfP(frame) {
  return ramp(frame, 860, 48);
}

export function badges(frame) {
  const out = [];
  if (frame >= 160 && frame <= 214) out.push("SECTION PLANE");
  if (sectionProgress(frame) > 0.45 && frame <= 348) out.push("SECTIONAL VIEW");
  if (frame >= 214 && frame <= 342) out.push("ENLARGED SCALE");
  if (frame >= 250 && frame <= 318) out.push("SLOW MOTION");
  if (frame >= 318 && frame <= 530) out.push("TIME COMPRESSION");
  if (frame >= 520 && frame <= 749) out.push("SCHEMATIC DETAIL");
  if (frame >= 860) out.push("QUALITATIVE BALANCE");
  return out;
}

export function timecode(frame) {
  const msTotal = Math.round((frame * 1000) / FPS);
  const m = Math.floor(msTotal / 60000);
  const s = Math.floor(msTotal / 1000) % 60;
  const ms = msTotal % 1000;
  const pad = (n, w) => String(n).padStart(w, "0");
  return `${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}`;
}

export function flowShift(frame, reduced) {
  if (reduced) return 0;
  return frame * 1.35;
}

export const CHAPTER_STARTS = [0, 150, 300, 510, 750];
