/* V3 — 資産チャート（Aria トークン準拠 canvas）。window.AriaChart に公開 */
(function () {
  const { useRef, useEffect } = React;

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // index 0..11 = 実績(2034/7〜2035/6), 12..14 = AI予測
  const NOW = 11, LAST = 14;
  const tickIdx = [0, 3, 6, 9, 12, 14];
  const tickLab = ["'34/7", "10", "'35/1", "4", "7", "9"];
  const MONTHS = ["'34/7", "'34/8", "'34/9", "'34/10", "'34/11", "'34/12", "'35/1", "'35/2", "'35/3", "'35/4", "'35/5", "'35/6", "'35/7", "'35/8", "'35/9"];

  function AriaChart({ actual, forecast, band, sub, events, masked, themeVersion, height = 260 }) {
    const wrapRef = useRef(null);
    const cvRef = useRef(null);
    const tipRef = useRef(null);
    const geo = useRef(null);

    function draw() {
      const wrap = wrapRef.current, cv = cvRef.current;
      if (!wrap || !cv) return;
      const W = wrap.clientWidth, H = wrap.clientHeight;
      if (!W || !H) return;
      const dpr = window.devicePixelRatio || 1;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      const ctx = cv.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const padL = 16, padR = 16, padT = 26, padB = 30;
      const brand = cssVar("--primary", "#5b6ef5");
      const pos = cssVar("--positive", "#3a9d6b");
      const mut = cssVar("--muted-foreground", "#8a8a92");
      const bordc = cssVar("--border", "rgba(0,0,0,.1)");
      const cardc = cssVar("--card", "#fff");
      const caut = cssVar("--caution", "#caa14a");

      const main = actual.concat(forecast);
      let lo = Infinity, hi = -Infinity;
      main.forEach((v) => { lo = Math.min(lo, v); hi = Math.max(hi, v); });
      if (sub) sub.forEach((v) => { lo = Math.min(lo, v); });
      band.forEach(([a, b]) => { lo = Math.min(lo, a); hi = Math.max(hi, b); });
      const span = hi - lo || 1;
      lo -= span * 0.16; hi += span * 0.14;

      const X = (i) => padL + (i / LAST) * (W - padL - padR);
      const Y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);

      function withAlpha(c, a) { return "color-mix(in oklch, " + c + " " + a + "%, transparent)"; }

      // future zone
      ctx.fillStyle = withAlpha(caut, 5);
      ctx.fillRect(X(NOW), 0, W - padR - X(NOW), H);

      // gridlines + y labels
      ctx.font = "600 10px var(--font-sans, sans-serif)";
      ctx.textAlign = "left";
      [0.22, 0.52, 0.82].forEach((p) => {
        const v = lo + (hi - lo) * p, y = Y(v);
        ctx.strokeStyle = withAlpha(mut, 14);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        ctx.fillStyle = mut;
        ctx.fillText("¥" + Math.round(v / 10000) + "万", padL + 2, y - 5);
      });

      // x ticks
      ctx.textAlign = "center";
      ctx.fillStyle = mut;
      tickIdx.forEach((ti, k) => ctx.fillText(tickLab[k], X(ti), H - 10));

      // confidence band
      ctx.beginPath();
      ctx.moveTo(X(NOW), Y(main[NOW]));
      band.forEach(([_, h2], i) => ctx.lineTo(X(NOW + 1 + i), Y(h2)));
      for (let i = band.length - 1; i >= 0; i--) ctx.lineTo(X(NOW + 1 + i), Y(band[i][0]));
      ctx.closePath();
      ctx.fillStyle = withAlpha(brand, 9);
      ctx.fill();

      // area under actual
      const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
      grad.addColorStop(0, withAlpha(brand, 26));
      grad.addColorStop(1, withAlpha(brand, 1));
      ctx.beginPath();
      ctx.moveTo(X(0), Y(main[0]));
      for (let i = 1; i <= NOW; i++) ctx.lineTo(X(i), Y(main[i]));
      ctx.lineTo(X(NOW), H - padB); ctx.lineTo(X(0), H - padB);
      ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();

      // sub line (dashed)
      if (sub) {
        ctx.strokeStyle = withAlpha(mut, 55);
        ctx.lineWidth = 1.5; ctx.setLineDash([2, 4]);
        ctx.beginPath();
        sub.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
        ctx.stroke(); ctx.setLineDash([]);
      }

      // main line glow + solid
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      [[7, withAlpha(brand, 16)], [2.5, brand]].forEach(([w, c]) => {
        ctx.strokeStyle = c; ctx.lineWidth = w;
        ctx.beginPath();
        for (let i = 0; i <= NOW; i++) (i ? ctx.lineTo(X(i), Y(main[i])) : ctx.moveTo(X(i), Y(main[i])));
        ctx.stroke();
      });

      // forecast dashed
      ctx.strokeStyle = withAlpha(brand, 80);
      ctx.lineWidth = 2; ctx.setLineDash([5, 6]);
      ctx.beginPath();
      for (let i = NOW; i <= LAST; i++) (i === NOW ? ctx.moveTo(X(i), Y(main[i])) : ctx.lineTo(X(i), Y(main[i])));
      ctx.stroke(); ctx.setLineDash([]);

      // now marker
      ctx.strokeStyle = withAlpha(brand, 40);
      ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(X(NOW), padT - 6); ctx.lineTo(X(NOW), H - padB); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "700 9.5px var(--font-sans, sans-serif)";
      ctx.textAlign = "center";
      ctx.fillStyle = brand; ctx.fillText("今", X(NOW), padT - 12);
      ctx.fillStyle = mut; ctx.fillText("AI よそく", (X(NOW) + W - padR) / 2, padT - 12);
      ctx.beginPath(); ctx.arc(X(NOW), Y(main[NOW]), 5, 0, 7); ctx.fillStyle = brand; ctx.fill();
      ctx.beginPath(); ctx.arc(X(NOW), Y(main[NOW]), 9, 0, 7);
      ctx.strokeStyle = withAlpha(brand, 45); ctx.lineWidth = 1.5; ctx.stroke();

      // events
      const evPts = [];
      (events || []).forEach((ev) => {
        const i = Math.floor(ev.x), f = ev.x - i;
        const v = i >= LAST ? main[LAST] : main[i] + (main[i + 1] - main[i]) * f;
        const cx = X(ev.x), cy = Y(v);
        evPts.push({ cx, cy, ev });
        ctx.beginPath(); ctx.arc(cx, cy, 3.6, 0, 7);
        ctx.fillStyle = ev.inflow ? pos : caut; ctx.fill();
        ctx.strokeStyle = cardc; ctx.lineWidth = 2; ctx.stroke();
      });
      geo.current = { X, Y, W, H, main, padL, padR, evPts };
    }

    useEffect(() => { draw(); }, [actual, forecast, band, sub, events, themeVersion]);
    useEffect(() => {
      if (!window.ResizeObserver || !wrapRef.current) return;
      const ro = new ResizeObserver(() => draw());
      ro.observe(wrapRef.current);
      return () => ro.disconnect();
    }, []);

    function onMove(e) {
      const g = geo.current, wrap = wrapRef.current, tip = tipRef.current;
      if (!g || !tip) return;
      const r = wrap.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      const near = g.evPts.find((p) => Math.hypot(p.cx - px, p.cy - py) < 12);
      if (near) {
        tip.innerHTML = '<span class="t-ev">' + near.ev.name + "</span><b>" + near.ev.amt + "</b>";
        tip.style.left = Math.min(Math.max(near.cx, 76), g.W - 76) + "px";
        tip.style.top = near.cy + "px";
        tip.classList.add("show");
        return;
      }
      let i = Math.round(((px - g.padL) / (g.W - g.padL - g.padR)) * LAST);
      i = Math.max(0, Math.min(LAST, i));
      tip.innerHTML = MONTHS[i] + (i > NOW ? "（AI予測）" : "") + "<b>" + (masked ? "¥ •••" : "¥" + g.main[i].toLocaleString("ja-JP")) + "</b>";
      tip.style.left = Math.min(Math.max(px, 70), g.W - 70) + "px";
      tip.style.top = g.Y(g.main[i]) + "px";
      tip.classList.add("show");
    }
    function onLeave() { tipRef.current && tipRef.current.classList.remove("show"); }

    return React.createElement("div", {
      ref: wrapRef, className: "v3-chart", style: { height: height + "px" },
      onPointerMove: onMove, onPointerLeave: onLeave,
    },
      React.createElement("canvas", { ref: cvRef }),
      React.createElement("div", { ref: tipRef, className: "v3-chart-tip" })
    );
  }

  window.AriaChart = AriaChart;
})();
