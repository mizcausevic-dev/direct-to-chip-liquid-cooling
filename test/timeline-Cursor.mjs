import assert from "node:assert/strict";
import test from "node:test";
import {
  LAST,
  TOTAL,
  badges,
  camera,
  chapter,
  intoFluidP,
  itReturnPath,
  pathLength,
  pointAlong,
  sectionProgress,
  shelfP,
  tracerU,
} from "../js/timeline.js";

test("duration is 1020 frames, index 0 through 1019", () => {
  assert.equal(TOTAL, 1020);
  assert.equal(LAST, 1019);
  assert.equal(chapter(0).id, 1);
  assert.equal(chapter(149).id, 1);
  assert.equal(chapter(150).id, 2);
  assert.equal(chapter(299).id, 2);
  assert.equal(chapter(300).id, 3);
  assert.equal(chapter(509).id, 3);
  assert.equal(chapter(510).id, 4);
  assert.equal(chapter(749).id, 4);
  assert.equal(chapter(750).id, 5);
  assert.equal(chapter(1019).id, 5);
});

test("camera motion is continuous and the ending holds", () => {
  let prev = camera(0);
  for (let f = 1; f <= LAST; f++) {
    const cam = camera(f);
    assert.ok(Math.hypot(cam.x - prev.x, cam.y - prev.y) < 28, `jump at ${f}`);
    assert.ok(cam.z / prev.z < 1.08 && prev.z / cam.z < 1.08, `zoom pop at ${f}`);
    assert.ok(cam.z > 0.4 && cam.z < 4, `zoom range at ${f}`);
    prev = cam;
  }
  const a = camera(980);
  const b = camera(1019);
  assert.equal(a.x, b.x);
  assert.equal(a.y, b.y);
  assert.equal(a.z, b.z);
});

test("return tracer is monotonic and the path reaches the CDU", () => {
  const path = itReturnPath();
  assert.ok(pathLength(path) > 200);
  let prev = 0;
  for (let f = 324; f <= 500; f++) {
    const u = tracerU(f);
    assert.ok(u + 1e-9 >= prev);
    prev = u;
  }
  assert.equal(tracerU(300), 0);
  assert.equal(tracerU(509), 1);
  const end = pointAlong(path, 1);
  const start = pointAlong(path, 0);
  assert.ok(end.x < start.x);
});

test("required teaching marks land inside their acts", () => {
  assert.ok(sectionProgress(280) > 0.95);
  assert.ok(intoFluidP(290) > 0.8);
  assert.ok(badges(280).includes("ENLARGED SCALE"));
  assert.ok(badges(280).includes("SLOW MOTION"));
  assert.ok(badges(280).includes("SECTIONAL VIEW"));
  assert.ok(badges(400).includes("TIME COMPRESSION"));
  assert.ok(badges(640).includes("SCHEMATIC DETAIL"));
  assert.ok(badges(980).includes("QUALITATIVE BALANCE"));
  assert.ok(shelfP(1019) === 1);
  assert.equal(sectionProgress(1019), 0);
});
