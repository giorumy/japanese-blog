const colour = "random";
const sparkles = 50;

let x = 400;
let ox = 400;
let y = 300;
let oy = 300;

let swide = 800;
let shigh = 600;
let sleft = 0;
let sdown = 0;

const tiny = [];
const star = [];
const starv = [];
const starx = [];
const stary = [];
const tinyx = [];
const tinyy = [];
const tinyv = [];

// Initialize the sparkle effect
function init() {
  if (!document.getElementById) return;

  for (let i = 0; i < sparkles; i++) {
    // Small sparkle after the main star disappears
    const tinySparkle = createDiv(3, 3);

    tinySparkle.style.visibility = "hidden";
    tinySparkle.style.zIndex = "999";

    document.body.appendChild(tinySparkle);

    tiny[i] = tinySparkle;
    tinyv[i] = 0;

    // Main sparkle/star
    const starSparkle = createDiv(10, 10);

    starSparkle.style.backgroundColor = "transparent";
    starSparkle.style.visibility = "hidden";
    starSparkle.style.zIndex = "999";

    const rlef = createDiv(1, 5);
    const rdow = createDiv(5, 1);

    starSparkle.appendChild(rlef);
    starSparkle.appendChild(rdow);

    rlef.style.top = "2px";
    rlef.style.left = "0px";

    rdow.style.top = "0px";
    rdow.style.left = "2px";

    document.body.appendChild(starSparkle);

    star[i] = starSparkle;
    starv[i] = 0;
  }

  setWidth();
  sparkle();
}

// Create new sparkles
function sparkle() {
  let c;

  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;

    for (c = 0; c < sparkles; c++) {
      if (!starv[c]) {
        star[c].style.left = `${(starx[c] = x)}px`;
        star[c].style.top = `${(stary[c] = y + 1)}px`;

        star[c].style.clip = "rect(0px, 5px, 5px, 0px)";

        const sparkleColour =
          colour === "random" ? newColour() : colour;

        star[c].childNodes[0].style.backgroundColor = sparkleColour;
        star[c].childNodes[1].style.backgroundColor = sparkleColour;

        star[c].style.visibility = "visible";
        starv[c] = 50;

        break;
      }
    }
  }

  for (c = 0; c < sparkles; c++) {
    if (starv[c]) {
      updateStar(c);
    }

    if (tinyv[c]) {
      updateTiny(c);
    }
  }

  setTimeout(sparkle, 40);
}

// Update the main sparkle
function updateStar(i) {
  starv[i]--;

  if (starv[i] === 25) {
    star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
  }

  if (starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    starx[i] += (i % 5 - 2) / 5;

    if (stary[i] < shigh + sdown) {
      star[i].style.top = `${stary[i]}px`;
      star[i].style.left = `${starx[i]}px`;
    } else {
      star[i].style.visibility = "hidden";
      starv[i] = 0;
    }
  } else {
    tinyv[i] = 50;

    tiny[i].style.top = `${(tinyy[i] = stary[i])}px`;
    tiny[i].style.left = `${(tinyx[i] = starx[i])}px`;

    tiny[i].style.width = "2px";
    tiny[i].style.height = "2px";

    tiny[i].style.backgroundColor =
      star[i].childNodes[0].style.backgroundColor;

    star[i].style.visibility = "hidden";
    tiny[i].style.visibility = "visible";
  }
}

// Update the tiny sparkle
function updateTiny(i) {
  tinyv[i]--;

  if (tinyv[i] === 25) {
    tiny[i].style.width = "1px";
    tiny[i].style.height = "1px";
  }

  if (tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    tinyx[i] += (i % 5 - 2) / 5;

    if (tinyy[i] < shigh + sdown) {
      tiny[i].style.top = `${tinyy[i]}px`;
      tiny[i].style.left = `${tinyx[i]}px`;
    } else {
      tiny[i].style.visibility = "hidden";
      tinyv[i] = 0;
    }
  } else {
    tiny[i].style.visibility = "hidden";
  }
}

// Track mouse position
function mouse(e) {
  y = e.pageY;
  x = e.pageX;
}

function setScroll() {
  if (typeof window.pageYOffset === "number") {
    sdown = window.pageYOffset;
    sleft = window.pageXOffset;
  } else if (
    document.body &&
    (document.body.scrollTop || document.body.scrollLeft)
  ) {
    sdown = document.body.scrollTop;
    sleft = document.body.scrollLeft;
  } else if (
    document.documentElement &&
    (document.documentElement.scrollTop ||
      document.documentElement.scrollLeft)
  ) {
    sleft = document.documentElement.scrollLeft;
    sdown = document.documentElement.scrollTop;
  } else {
    sdown = 0;
    sleft = 0;
  }
}

// Determine viewport size
function setWidth() {
  let swMin = 999999;
  let shMin = 999999;

  if (
    document.documentElement &&
    document.documentElement.clientWidth
  ) {
    if (document.documentElement.clientWidth > 0) {
      swMin = document.documentElement.clientWidth;
    }

    if (document.documentElement.clientHeight > 0) {
      shMin = document.documentElement.clientHeight;
    }
  }

  if (typeof window.innerWidth === "number") {
    if (window.innerWidth > 0 && window.innerWidth < swMin) {
      swMin = window.innerWidth;
    }

    if (window.innerHeight > 0 && window.innerHeight < shMin) {
      shMin = window.innerHeight;
    }
  }

  if (document.body.clientWidth) {
    if (document.body.clientWidth > 0 && document.body.clientWidth < swMin) {
      swMin = document.body.clientWidth;
    }

    if (document.body.clientHeight > 0 && document.body.clientHeight < shMin) {
      shMin = document.body.clientHeight;
    }
  }

  if (swMin === 999999 || shMin === 999999) {
    swMin = 800;
    shMin = 600;
  }

  swide = swMin;
  shigh = shMin;
}

// Create a sparkle element
function createDiv(height, width) {
  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.height = `${height}px`;
  div.style.width = `${width}px`;
  div.style.overflow = "hidden";
  div.style.pointerEvents = "none";

  return div;
}

// Generate random sparkle color
function newColour() {
  const c = [];

  c[0] = 255;
  c[1] = Math.floor(Math.random() * 256);
  c[2] = Math.floor(Math.random() * (256 - c[1] / 2));

  c.sort(() => 0.5 - Math.random());

  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

// Event listeners
document.addEventListener("mousemove", mouse);
window.addEventListener("scroll", setScroll);
window.addEventListener("resize", setWidth);

// Start the effect
init();