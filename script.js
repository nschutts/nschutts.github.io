// Footer year
document.querySelectorAll(".js-year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------------------
   Animated background: a circuit-board / wiring-harness style network.
   A lattice of nodes (jittered grid, so it reads as a schematic rather
   than noise) connected by traces. Small pulses of light travel the
   traces on a loop, like signal flow. Nodes near the pointer brighten,
   like a CAD viewport highlighting the nearest connection point. Falls
   back to a single static frame for prefers-reduced-motion.
------------------------------------------------------------------- */
(function () {
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var canvas = document.createElement("canvas");
  canvas.id = "bp-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  var ctx = canvas.getContext("2d");

  var w, h, dpr, nodes, edges;
  var CELL = 128;

  function buildGraph() {
    var cols = Math.ceil(w / CELL) + 1;
    var rows = Math.ceil(h / CELL) + 1;
    nodes = [];
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var jitter = CELL * 0.32;
        nodes.push({
          x: i * CELL + CELL / 2 + (Math.random() * 2 - 1) * jitter,
          y: j * CELL + CELL / 2 + (Math.random() * 2 - 1) * jitter,
        });
      }
    }
    edges = [];
    function idx(i, j) {
      return j * cols + i;
    }
    for (var j2 = 0; j2 < rows; j2++) {
      for (var i2 = 0; i2 < cols; i2++) {
        var a = idx(i2, j2);
        if (i2 + 1 < cols && Math.random() > 0.18) {
          edges.push([a, idx(i2 + 1, j2)]);
        }
        if (j2 + 1 < rows && Math.random() > 0.18) {
          edges.push([a, idx(i2, j2 + 1)]);
        }
      }
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGraph();
  }
  window.addEventListener("resize", resize);
  resize();

  var pointerX = w / 2,
    pointerY = h * 0.3;
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
  var pulses = [];
  var INK = "17,19,21";
  var TRACE = "92,116,145";
  var GLOW = "196,80,31";
  var PULSE = "240,137,90";

  function dist(ax, ay, bx, by) {
    var dx = ax - bx,
      dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function spawnPulse() {
    if (!edges.length) return;
    var e = edges[(Math.random() * edges.length) | 0];
    pulses.push({ edge: e, t: 0, speed: 0.006 + Math.random() * 0.01 });
  }

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

    // Traces
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(" + TRACE + ",0.16)";
    for (var e = 0; e < edges.length; e++) {
      var a = nodes[edges[e][0]],
        b = nodes[edges[e][1]];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Nodes (brighten near the glow point)
    for (var n = 0; n < nodes.length; n++) {
      var nd = nodes[n];
      var d = dist(nd.x, nd.y, glowX, glowY);
      var influence = Math.max(0, 1 - d / 230);
      var r = 1.4 + influence * 2;
      var alpha = 0.22 + influence * 0.55;
      ctx.beginPath();
      ctx.fillStyle =
        "rgba(" + (influence > 0.05 ? GLOW : TRACE) + "," + alpha + ")";
      ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pulses travelling along traces
    if (!reduceMotion && Math.random() < 0.045 && pulses.length < 22) {
      spawnPulse();
    }
    for (var p = pulses.length - 1; p >= 0; p--) {
      var pu = pulses[p];
      pu.t += pu.speed;
      if (pu.t > 1) {
        pulses.splice(p, 1);
        continue;
      }
      var pa = nodes[pu.edge[0]],
        pb = nodes[pu.edge[1]];
      var px = pa.x + (pb.x - pa.x) * pu.t;
      var py = pa.y + (pb.y - pa.y) * pu.t;
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + PULSE + ",0.9)";
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
})();

/* ---------------------------------------------------------------------
   Lightbox: click any .lightbox-img to view it full-screen.
------------------------------------------------------------------- */
(function () {
  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  var img = document.createElement("img");
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    overlay.classList.add("active");
  }
  function close() {
    overlay.classList.remove("active");
  }

  document.addEventListener("click", function (e) {
    var target = e.target.closest(".lightbox-img");
    if (target) {
      open(target.getAttribute("src"), target.getAttribute("alt"));
      return;
    }
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
