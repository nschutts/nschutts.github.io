// Footer year
document.querySelectorAll(".js-year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Interactive blueprint-grid background.
// Draws a dot grid on a fixed full-viewport canvas that sits behind the
// page. Dots near the pointer glow, like a CAD viewport's snap grid.
// When the pointer has been idle for a while, the glow drifts on its own.
(function () {
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var canvas = document.createElement("canvas");
  canvas.id = "bp-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  var ctx = canvas.getContext("2d");

  var w, h, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  var SPACING = 34;
  var pointerX = w / 2,
    pointerY = h * 0.32;
  var glowX = pointerX,
    glowY = pointerY;
  var pointerActive = false;
  var idleTimer = null;

  function setPointer(x, y) {
    pointerX = x;
    pointerY = y;
    pointerActive = true;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      pointerActive = false;
    }, 2600);
  }

  window.addEventListener(
    "pointermove",
    function (e) {
      setPointer(e.clientX, e.clientY);
    },
    { passive: true }
  );
  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches && e.touches[0]) {
        setPointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  var autoT = 0;
  var INK = "17,19,21";
  var DOT = "92,116,145";
  var GLOW = "196,80,31";

  function frame() {
    ctx.fillStyle = "rgb(" + INK + ")";
    ctx.fillRect(0, 0, w, h);

    if (!reduceMotion) {
      autoT += 0.0016;
    }
    var autoX = w * 0.5 + Math.sin(autoT) * w * 0.28;
    var autoY = h * 0.28 + Math.cos(autoT * 0.85) * h * 0.16;

    var targetX = pointerActive ? pointerX : autoX;
    var targetY = pointerActive ? pointerY : autoY;
    glowX += (targetX - glowX) * (reduceMotion ? 1 : 0.05);
    glowY += (targetY - glowY) * (reduceMotion ? 1 : 0.05);

    var cols = Math.ceil(w / SPACING) + 1;
    var rows = Math.ceil(h / SPACING) + 1;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * SPACING;
        var y = j * SPACING;
        var dx = x - glowX,
          dy = y - glowY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var influence = Math.max(0, 1 - dist / 260);
        var radius = 1 + influence * 1.7;
        var alpha = 0.14 + influence * 0.6;
        ctx.beginPath();
        ctx.fillStyle =
          "rgba(" + (influence > 0.06 ? GLOW : DOT) + "," + alpha + ")";
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!reduceMotion) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
  if (reduceMotion) {
    // Draw a second static frame once glow has settled near center.
    setTimeout(frame, 50);
  }
})();
