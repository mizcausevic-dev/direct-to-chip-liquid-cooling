import { renderFrame } from "./draw.js";
import { CHAPTER_STARTS, LAST, TOTAL, chapter, timecode } from "./timeline.js";

const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d", { alpha: false });
const playBtn = document.getElementById("play");
const scrub = document.getElementById("scrub");
const readout = document.getElementById("readout");
const chapterLive = document.getElementById("chapter-live");
const reducedNote = document.getElementById("reduced-note");

const params = new URLSearchParams(location.search);
const shot = params.has("shot");
if (shot) document.body.classList.add("shot");

const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let userPlayed = false;
let frame = 0;
let playing = false;
let acc = 0;
let last = 0;

if (params.has("frame")) {
  const n = Number(params.get("frame"));
  if (Number.isFinite(n)) frame = Math.max(0, Math.min(LAST, Math.round(n)));
}

function decorativeHold() {
  return reducedQuery && !userPlayed;
}

function paint() {
  renderFrame(ctx, frame, { reducedMotion: decorativeHold() });
  scrub.value = String(frame);
  const ch = chapter(frame);
  const label = `Frame ${frame} of ${LAST}. ${timecode(frame)}. ${ch.k} ${ch.t}.`;
  readout.textContent = `${String(frame).padStart(4, "0")}  ${timecode(frame)}  /  00:34.000`;
  chapterLive.textContent = `${ch.k} ${ch.t}. ${ch.d}`;
  canvas.setAttribute("aria-label", label);
  playBtn.textContent = playing ? "Pause" : frame >= LAST ? "Replay" : "Play";
  playBtn.setAttribute("aria-pressed", playing ? "true" : "false");
  window.__frameReady = frame;
}

function seek(n) {
  frame = Math.max(0, Math.min(LAST, n | 0));
  acc = 0;
  paint();
}

function toggle() {
  if (frame >= LAST && !playing) {
    frame = 0;
    acc = 0;
  }
  userPlayed = true;
  playing = !playing;
  last = performance.now();
  paint();
}

function loop(now) {
  if (playing) {
    const dt = Math.min(100, now - last);
    last = now;
    acc += dt;
    const step = 1000 / 30;
    while (acc >= step && frame < LAST) {
      frame += 1;
      acc -= step;
    }
    if (frame >= LAST) {
      playing = false;
      acc = 0;
    }
    paint();
  }
  requestAnimationFrame(loop);
}

playBtn.addEventListener("click", toggle);
scrub.addEventListener("input", () => {
  playing = false;
  seek(Number(scrub.value));
});

document.querySelectorAll("[data-jump]").forEach((btn) => {
  btn.addEventListener("click", () => {
    playing = false;
    seek(Number(btn.dataset.jump));
  });
});

document.addEventListener("keydown", (event) => {
  const tag = event.target && event.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (event.code === "Space") {
    event.preventDefault();
    toggle();
  } else if (event.code === "ArrowRight") {
    playing = false;
    seek(frame + (event.shiftKey ? 10 : 1));
  } else if (event.code === "ArrowLeft") {
    playing = false;
    seek(frame - (event.shiftKey ? 10 : 1));
  } else if (event.code === "Home") {
    playing = false;
    seek(0);
  } else if (event.code === "End") {
    playing = false;
    seek(LAST);
  } else if (event.code >= "Digit1" && event.code <= "Digit5") {
    playing = false;
    seek(CHAPTER_STARTS[Number(event.code.slice(5)) - 1]);
  }
});

if (reducedQuery) {
  reducedNote.hidden = false;
  playing = false;
} else if (!params.has("frame")) {
  playing = !shot;
  userPlayed = playing;
}

scrub.max = String(LAST);
scrub.min = "0";
paint();
last = performance.now();
requestAnimationFrame(loop);

window.__kg = { seek, paint, total: TOTAL };
