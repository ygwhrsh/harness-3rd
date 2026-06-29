/* @ds-bundle: {"format":3,"namespace":"AriaBankingDesignSystem_341da1","components":[{"name":"BalanceCard","sourcePath":"components/banking/BalanceCard.jsx"},{"name":"ModeToggle","sourcePath":"components/banking/ModeToggle.jsx"},{"name":"PilotThemeSwitcher","sourcePath":"components/banking/PilotThemeSwitcher.jsx"},{"name":"TransactionRow","sourcePath":"components/banking/TransactionRow.jsx"},{"name":"PILOTS","sourcePath":"components/banking/pilots.js"},{"name":"DEFAULT_PILOT","sourcePath":"components/banking/pilots.js"},{"name":"STORAGE_KEY","sourcePath":"components/banking/pilots.js"},{"name":"MODE_KEY","sourcePath":"components/banking/pilots.js"},{"name":"Alert","sourcePath":"components/core/Alert.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Label","sourcePath":"components/core/Input.jsx"},{"name":"Progress","sourcePath":"components/core/Progress.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Separator","sourcePath":"components/core/Separator.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"}],"sourceHashes":{"components/banking/BalanceCard.jsx":"3ddc04ba770f","components/banking/ModeToggle.jsx":"69337bbe7563","components/banking/PilotThemeSwitcher.jsx":"2027f8886ce6","components/banking/TransactionRow.jsx":"5ff44acb9c23","components/banking/pilots.js":"662d5cd40ce9","components/core/Alert.jsx":"e57177eb7541","components/core/Avatar.jsx":"66eaba441f4c","components/core/Badge.jsx":"8c37c08289f9","components/core/Button.jsx":"5b23cccca095","components/core/Card.jsx":"7401d4bcd519","components/core/Checkbox.jsx":"0d0dbac72984","components/core/Input.jsx":"9cbc4054c64c","components/core/Progress.jsx":"3325c0128d1b","components/core/Select.jsx":"2278cda63782","components/core/Separator.jsx":"bfb816981e8a","components/core/Switch.jsx":"af25a97e799a","components/core/Tabs.jsx":"6016fa90398a","components/core/internal.js":"9c512185e25a","ui_kits/aria-app/AriaApp.jsx":"4c66b852bee9","ui_kits/aria-app/data.js":"4fd1490beda2","ui_kits/aria-app/icons.jsx":"bfa56a94ed46"},"inlinedExternals":[],"unexposedExports":[{"name":"applyMode","sourcePath":"components/banking/pilots.js"},{"name":"applyPilot","sourcePath":"components/banking/pilots.js"},{"name":"cx","sourcePath":"components/core/internal.js"},{"name":"injectOnce","sourcePath":"components/core/internal.js"}]} */

(() => {

const __ds_ns = (window.AriaBankingDesignSystem_341da1 = window.AriaBankingDesignSystem_341da1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/banking/pilots.js
try { (() => {
// Aria Banking — pilot "skin" registry (着せ替え)
// Each skin maps to a [data-theme] scope in tokens/colors.css.
// Colour associations are original interpretations inspired by each
// pilot's signature mobile suit; no franchise artwork is used.

const PILOTS = [{
  id: "amuro",
  name: "Amuro Ray",
  nameJa: "アムロ・レイ",
  suit: "RX-93 ν Gundam",
  hue: "Federation Blue",
  swatch: "oklch(0.550 0.205 262)"
}, {
  id: "quattro",
  name: "Quattro Bajeena",
  nameJa: "クワトロ・バジーナ",
  suit: "MSN-00100 Hyaku Shiki",
  hue: "Hyaku Shiki Gold",
  swatch: "oklch(0.625 0.110 80)"
}, {
  id: "kamille",
  name: "Kamille Bidan",
  nameJa: "カミーユ・ビダン",
  suit: "MSZ-006 Zeta Gundam",
  hue: "Zeta Teal",
  swatch: "oklch(0.600 0.108 183)"
}, {
  id: "haman",
  name: "Haman Karn",
  nameJa: "ハマーン・カーン",
  suit: "AMX-004 Qubeley",
  hue: "Qubeley Violet",
  swatch: "oklch(0.555 0.190 300)"
}];
const DEFAULT_PILOT = "amuro";
const STORAGE_KEY = "aria-pilot";
const MODE_KEY = "aria-mode";

/** Apply a pilot skin to a root element (default <html>). */
function applyPilot(id, root) {
  const el = root || (typeof document !== "undefined" ? document.documentElement : null);
  if (el) el.setAttribute("data-theme", id);
}

/** Apply light/dark/system mode by toggling `.dark` on a root element. */
function applyMode(mode, root) {
  const el = root || (typeof document !== "undefined" ? document.documentElement : null);
  if (!el) return;
  const dark = mode === "dark" || mode === "system" && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
  el.classList.toggle("dark", dark);
}
Object.assign(__ds_scope, { PILOTS, DEFAULT_PILOT, STORAGE_KEY, MODE_KEY, applyPilot, applyMode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banking/pilots.js", error: String((e && e.message) || e) }); }

// components/core/internal.js
try { (() => {
// Shared component internals. Pure JS so the bundler picks it up as a helper.
const _injected = new Set();
function injectOnce(id, css) {
  if (typeof document === "undefined") return;
  if (_injected.has(id)) return;
  _injected.add(id);
  const el = document.createElement("style");
  el.setAttribute("data-aria", id);
  el.textContent = css;
  document.head.appendChild(el);
}
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
Object.assign(__ds_scope, { injectOnce, cx });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/internal.js", error: String((e && e.message) || e) }); }

// components/banking/BalanceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-balance{
  position:relative; overflow:hidden; container-type:inline-size;
  border-radius:var(--radius-card); padding:var(--space-5);
  color:#fff; isolation:isolate;
  background:
    radial-gradient(120% 140% at 85% -10%, color-mix(in oklch, var(--brand-400) 85%, white 10%), transparent 60%),
    linear-gradient(150deg, var(--brand-600), color-mix(in oklch, var(--brand-700) 80%, black 12%));
  box-shadow:var(--shadow-lg);
}
.aria-balance::after{
  content:""; position:absolute; inset:0; z-index:-1; opacity:.5;
  background:radial-gradient(80% 120% at 110% 120%, color-mix(in oklch, var(--brand-400) 60%, transparent), transparent 55%);
}
.aria-balance__top{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.aria-balance__name{ font:var(--text-label); opacity:.92; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.aria-balance__num{ font-family:var(--font-mono); font-size:var(--text-xs); letter-spacing:.08em; opacity:.78; white-space:nowrap; }
.aria-balance__chip{ font:var(--weight-semibold) var(--text-2xs)/1 var(--font-sans); letter-spacing:.05em; text-transform:uppercase; padding:5px 9px; border-radius:999px; background:rgba(255,255,255,.16); backdrop-filter:blur(4px); }
.aria-balance__label{ margin-top:var(--space-5); font:var(--text-caption); opacity:.8; }
.aria-balance__amount{ display:flex; align-items:baseline; gap:6px; margin-top:4px; font-family:var(--font-mono); font-variant-numeric:tabular-nums; font-weight:600; line-height:1; white-space:nowrap; }
.aria-balance__cur{ font-size:clamp(1rem, 5cqi, var(--text-xl)); opacity:.85; }
.aria-balance__int{ font-size:clamp(1.9rem, 13cqi, var(--text-5xl)); letter-spacing:-.02em; transition:filter var(--duration-base) var(--ease-standard); }
.aria-balance__dec{ font-size:clamp(1.1rem, 6cqi, var(--text-2xl)); opacity:.75; transition:filter var(--duration-base) var(--ease-standard); }
.aria-balance__foot{ display:flex; align-items:center; gap:8px; margin-top:var(--space-5); font:var(--text-caption); }
.aria-balance__delta{ display:inline-flex; align-items:center; gap:4px; font-family:var(--font-mono); padding:3px 8px; border-radius:999px; background:rgba(255,255,255,.16); }
.aria-balance__delta svg{ width:13px; height:13px; }
.aria-balance__delta--down svg{ transform:rotate(180deg); }
`;
function splitAmount(n, currency, locale) {
  const parts = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).formatToParts(Math.abs(n));
  let int = "",
    dec = "";
  for (const p of parts) {
    if (p.type === "fraction") dec = p.value;else if (p.type !== "decimal") int += p.value;
  }
  return {
    int,
    dec
  };
}
function BalanceCard({
  account = "Everyday account",
  number = "•••• 4821",
  type = "Main",
  balance = 0,
  currency = "¥",
  locale = "en-US",
  delta,
  deltaLabel = "this month",
  masked = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("balance", CSS);
  const {
    int,
    dec
  } = splitAmount(balance, currency, locale);
  const down = typeof delta === "number" && delta < 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-balance", className)
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__name"
  }, account), /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__num"
  }, number)), type && /*#__PURE__*/React.createElement("span", {
    className: "aria-balance__chip"
  }, type)), /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__label"
  }, "Available balance"), /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "aria-balance__cur"
  }, currency), /*#__PURE__*/React.createElement("span", {
    className: "aria-balance__int",
    style: masked ? {
      filter: "blur(11px)",
      userSelect: "none"
    } : undefined
  }, int), /*#__PURE__*/React.createElement("span", {
    className: "aria-balance__dec",
    style: masked ? {
      filter: "blur(8px)",
      userSelect: "none"
    } : undefined
  }, ".", dec)), delta != null && /*#__PURE__*/React.createElement("div", {
    className: "aria-balance__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: __ds_scope.cx("aria-balance__delta", down && "aria-balance__delta--down")
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5M5 12l7-7 7 7"
  })), /*#__PURE__*/React.createElement("span", {
    style: masked ? {
      filter: "blur(6px)",
      userSelect: "none"
    } : undefined
  }, currency, new Intl.NumberFormat(locale).format(Math.abs(delta)))), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.8
    }
  }, deltaLabel)));
}
Object.assign(__ds_scope, { BalanceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banking/BalanceCard.jsx", error: String((e && e.message) || e) }); }

// components/banking/ModeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-mode{ display:inline-flex; gap:2px; padding:3px; background:var(--muted); border-radius:var(--radius-md); }
.aria-mode__btn{ display:inline-flex; align-items:center; justify-content:center; gap:6px; height:32px; padding:0 12px; border:none; background:transparent; cursor:pointer; color:var(--muted-foreground); font:var(--weight-medium) var(--text-xs)/1 var(--font-sans); border-radius:calc(var(--radius-md) - 3px); transition:var(--transition-colors), box-shadow var(--duration-fast); }
.aria-mode__btn svg{ width:15px; height:15px; }
.aria-mode__btn:hover{ color:var(--foreground); }
.aria-mode__btn[aria-pressed="true"]{ background:var(--card); color:var(--foreground); box-shadow:var(--shadow-sm); }
.aria-mode--icon .aria-mode__btn{ padding:0 9px; }
`;
const ICONS = {
  light: /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }),
  lightRays: /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
  }),
  dark: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
  }),
  system: /*#__PURE__*/React.createElement("path", {
    d: "M2 4h20v12H2zM8 20h8M12 16v4"
  })
};
const OPTIONS = [{
  id: "light",
  label: "Light"
}, {
  id: "dark",
  label: "Dark"
}, {
  id: "system",
  label: "Auto"
}];
function ModeToggle({
  value,
  defaultValue = "system",
  onChange,
  iconsOnly = false,
  persist = true,
  applyToRoot = true,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("mode", CSS);
  const [internal, setInternal] = React.useState(() => {
    if (value) return value;
    if (persist && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(__ds_scope.MODE_KEY);
      if (saved) return saved;
    }
    return defaultValue;
  });
  const active = value ?? internal;
  React.useEffect(() => {
    if (applyToRoot) __ds_scope.applyMode(active);
    if (active === "system" && applyToRoot && typeof matchMedia !== "undefined") {
      const mq = matchMedia("(prefers-color-scheme: dark)");
      const handler = () => __ds_scope.applyMode("system");
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, [active, applyToRoot]);
  const select = id => {
    if (value === undefined) setInternal(id);
    if (persist && typeof localStorage !== "undefined") localStorage.setItem(__ds_scope.MODE_KEY, id);
    onChange?.(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-mode", iconsOnly && "aria-mode--icon", className),
    role: "group",
    "aria-label": "Colour mode"
  }, rest), OPTIONS.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    type: "button",
    "aria-pressed": active === o.id,
    "aria-label": o.label,
    className: "aria-mode__btn",
    onClick: () => select(o.id)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, o.id === "light" && ICONS.lightRays, ICONS[o.id]), !iconsOnly && o.label)));
}
Object.assign(__ds_scope, { ModeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banking/ModeToggle.jsx", error: String((e && e.message) || e) }); }

// components/banking/PilotThemeSwitcher.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-pilots{ display:grid; gap:10px; }
.aria-pilots--row{ grid-auto-flow:column; grid-auto-columns:1fr; }
.aria-pilots--grid{ grid-template-columns:repeat(2,1fr); }
.aria-pilot{
  position:relative; display:flex; align-items:center; gap:11px; text-align:left; min-width:0;
  padding:11px 12px; border-radius:var(--radius-md); cursor:pointer;
  background:var(--card); border:1.5px solid var(--border); color:var(--foreground);
  transition:var(--transition-colors), box-shadow var(--duration-fast), transform var(--duration-fast) var(--ease-out);
}
.aria-pilot:hover{ background:var(--muted); }
.aria-pilot:active{ transform:scale(.99); }
.aria-pilot[aria-pressed="true"]{ border-color:var(--_sw); box-shadow:0 0 0 3px color-mix(in oklch, var(--_sw) 22%, transparent); }
.aria-pilot__swatch{ width:30px; height:30px; flex:none; border-radius:var(--radius-full); background:var(--_sw); box-shadow:inset 0 0 0 2px rgba(255,255,255,.35), var(--shadow-xs); display:grid; place-items:center; color:#fff; }
.aria-pilot__swatch svg{ width:15px; height:15px; opacity:0; transform:scale(.5); transition:opacity var(--duration-fast), transform var(--duration-fast) var(--ease-spring); }
.aria-pilot[aria-pressed="true"] .aria-pilot__swatch svg{ opacity:1; transform:scale(1); }
.aria-pilot__txt{ display:flex; flex-direction:column; gap:1px; min-width:0; }
.aria-pilot__ja{ font:var(--weight-semibold) var(--text-sm)/1.15 var(--font-sans); color:var(--foreground); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.aria-pilot__suit{ font:var(--text-2xs)/1.2 var(--font-mono); color:var(--muted-foreground); letter-spacing:.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.aria-pilot--compact{ flex-direction:column; gap:7px; align-items:flex-start; padding:10px; }
`;
const Check = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 6 9 17l-5-5"
}));
function PilotThemeSwitcher({
  value,
  defaultValue = __ds_scope.DEFAULT_PILOT,
  onChange,
  layout = "grid",
  showSuit = true,
  persist = true,
  applyToRoot = true,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("pilots", CSS);
  const [internal, setInternal] = React.useState(() => {
    if (value) return value;
    if (persist && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(__ds_scope.STORAGE_KEY);
      if (saved) return saved;
    }
    return defaultValue;
  });
  const active = value ?? internal;
  React.useEffect(() => {
    if (applyToRoot) __ds_scope.applyPilot(active);
  }, [active, applyToRoot]);
  const select = id => {
    if (value === undefined) setInternal(id);
    if (persist && typeof localStorage !== "undefined") localStorage.setItem(__ds_scope.STORAGE_KEY, id);
    onChange?.(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-pilots", layout === "row" ? "aria-pilots--row" : "aria-pilots--grid", className),
    role: "group",
    "aria-label": "Pilot theme"
  }, rest), __ds_scope.PILOTS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    type: "button",
    "aria-pressed": active === p.id,
    className: __ds_scope.cx("aria-pilot", layout === "row" && "aria-pilot--compact"),
    style: {
      "--_sw": p.swatch
    },
    onClick: () => select(p.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "aria-pilot__swatch"
  }, /*#__PURE__*/React.createElement(Check, null)), /*#__PURE__*/React.createElement("span", {
    className: "aria-pilot__txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "aria-pilot__ja"
  }, p.nameJa), showSuit && /*#__PURE__*/React.createElement("span", {
    className: "aria-pilot__suit"
  }, p.suit)))));
}
Object.assign(__ds_scope, { PilotThemeSwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banking/PilotThemeSwitcher.jsx", error: String((e && e.message) || e) }); }

// components/banking/TransactionRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-txn{ display:flex; align-items:center; gap:12px; padding:12px 4px; width:100%; text-align:left; background:none; border:none; cursor:pointer; transition:background-color var(--duration-fast); border-radius:var(--radius-sm); }
.aria-txn:hover{ background:var(--muted); }
.aria-txn__icon{ width:40px; height:40px; flex:none; border-radius:var(--radius-full); display:grid; place-items:center; background:var(--accent); color:var(--accent-foreground); font:var(--weight-semibold) var(--text-sm)/1 var(--font-sans); overflow:hidden; }
.aria-txn__icon svg{ width:18px; height:18px; }
.aria-txn__icon img{ width:100%; height:100%; object-fit:cover; }
.aria-txn__main{ flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.aria-txn__merchant{ font:var(--text-label); color:var(--foreground); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.aria-txn__meta{ display:flex; align-items:center; gap:7px; font:var(--text-caption); color:var(--muted-foreground); }
.aria-txn__dot{ width:3px; height:3px; border-radius:999px; background:currentColor; opacity:.5; }
.aria-txn__right{ display:flex; flex-direction:column; align-items:flex-end; gap:3px; flex:none; }
.aria-txn__amt{ font-family:var(--font-mono); font-variant-numeric:tabular-nums; font-weight:600; font-size:var(--text-sm); color:var(--foreground); letter-spacing:-.01em; transition:filter var(--duration-base) var(--ease-standard); }
.aria-txn__amt--in{ color:var(--success); }
.aria-txn__amt--pending{ opacity:.6; }
.aria-txn__status{ font:var(--weight-medium) var(--text-2xs)/1 var(--font-sans); color:var(--muted-foreground); }
`;
const STATUS = {
  completed: null,
  pending: "Pending",
  failed: "Failed",
  scheduled: "Scheduled"
};
function TransactionRow({
  merchant = "Merchant",
  category,
  date,
  amount = 0,
  currency = "¥",
  locale = "en-US",
  status = "completed",
  icon,
  logo,
  masked = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("txn", CSS);
  const incoming = amount > 0;
  const formatted = `${incoming ? "+" : "−"}${currency}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0
  }).format(Math.abs(amount))}`;
  const statusLabel = STATUS[status];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: __ds_scope.cx("aria-txn", className)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__icon"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: ""
  }) : icon || merchant.slice(0, 1).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__merchant"
  }, merchant), /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__meta"
  }, category && /*#__PURE__*/React.createElement("span", null, category), category && date && /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__dot"
  }), date && /*#__PURE__*/React.createElement("span", null, date))), /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__right"
  }, /*#__PURE__*/React.createElement("span", {
    className: __ds_scope.cx("aria-txn__amt", incoming && "aria-txn__amt--in", status !== "completed" && "aria-txn__amt--pending"),
    style: masked ? {
      filter: "blur(6px)",
      userSelect: "none"
    } : undefined
  }, formatted), statusLabel && /*#__PURE__*/React.createElement("span", {
    className: "aria-txn__status"
  }, statusLabel)));
}
Object.assign(__ds_scope, { TransactionRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banking/TransactionRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-alert{
  display:flex; gap:12px; padding:14px 16px; border-radius:var(--radius-md);
  border:1px solid var(--border); background:var(--card); color:var(--card-foreground);
}
.aria-alert__icon{ flex:none; width:20px; height:20px; margin-top:1px; color:var(--muted-foreground); }
.aria-alert__icon svg{ width:100%; height:100%; }
.aria-alert__body{ display:flex; flex-direction:column; gap:2px; min-width:0; }
.aria-alert__title{ font:var(--text-label); color:var(--foreground); }
.aria-alert__desc{ font:var(--text-caption); color:var(--muted-foreground); }
.aria-alert--info{ border-color:color-mix(in oklch, var(--info) 30%, var(--border)); background:color-mix(in oklch, var(--info) 8%, var(--card)); }
.aria-alert--info .aria-alert__icon{ color:var(--info); }
.aria-alert--success{ border-color:color-mix(in oklch, var(--success) 32%, var(--border)); background:color-mix(in oklch, var(--success) 9%, var(--card)); }
.aria-alert--success .aria-alert__icon{ color:var(--success); }
.aria-alert--warning{ border-color:color-mix(in oklch, var(--warning) 38%, var(--border)); background:color-mix(in oklch, var(--warning) 12%, var(--card)); }
.aria-alert--warning .aria-alert__icon{ color:color-mix(in oklch, var(--warning) 70%, var(--foreground)); }
.aria-alert--danger{ border-color:color-mix(in oklch, var(--destructive) 32%, var(--border)); background:color-mix(in oklch, var(--destructive) 8%, var(--card)); }
.aria-alert--danger .aria-alert__icon{ color:var(--destructive); }
`;
const ICONS = {
  info: /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
  }),
  success: /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"
  }),
  warning: /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01"
  }),
  danger: /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
  })
};
function Alert({
  tone = "info",
  title,
  icon,
  className,
  children,
  ...rest
}) {
  __ds_scope.injectOnce("alert", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "alert",
    className: __ds_scope.cx("aria-alert", `aria-alert--${tone}`, className)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "aria-alert__icon"
  }, icon ?? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, ICONS[tone])), /*#__PURE__*/React.createElement("div", {
    className: "aria-alert__body"
  }, title && /*#__PURE__*/React.createElement("span", {
    className: "aria-alert__title"
  }, title), children && /*#__PURE__*/React.createElement("span", {
    className: "aria-alert__desc"
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Alert.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-avatar{
  position:relative; display:inline-flex; align-items:center; justify-content:center;
  width:var(--_s,40px); height:var(--_s,40px); flex:none;
  border-radius:var(--radius-full); overflow:hidden;
  background:var(--muted); color:var(--muted-foreground);
  font:var(--weight-semibold) var(--text-sm)/1 var(--font-sans); user-select:none;
}
.aria-avatar--xs{ --_s:24px; font-size:var(--text-2xs); }
.aria-avatar--sm{ --_s:32px; font-size:var(--text-xs); }
.aria-avatar--lg{ --_s:56px; font-size:var(--text-lg); }
.aria-avatar--xl{ --_s:80px; font-size:var(--text-2xl); }
.aria-avatar--ring{ box-shadow:0 0 0 2px var(--background), 0 0 0 4px var(--primary); }
.aria-avatar img{ width:100%; height:100%; object-fit:cover; }
.aria-avatar__status{
  position:absolute; right:0; bottom:0; width:30%; height:30%;
  border-radius:999px; border:2px solid var(--card); background:var(--success);
}
`;
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
function Avatar({
  src,
  name,
  size = "md",
  ring = false,
  status = false,
  className,
  children,
  ...rest
}) {
  __ds_scope.injectOnce("avatar", CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: __ds_scope.cx("aria-avatar", size !== "md" && `aria-avatar--${size}`, ring && "aria-avatar--ring", className)
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ""
  }) : children || initials(name), status && /*#__PURE__*/React.createElement("span", {
    className: "aria-avatar__status"
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-badge{
  display:inline-flex; align-items:center; gap:5px;
  height:22px; padding:0 9px; border-radius:var(--radius-pill);
  font:var(--weight-medium) var(--text-2xs)/1 var(--font-sans);
  letter-spacing:.01em; white-space:nowrap; border:1px solid transparent;
}
.aria-badge--solid{ background:var(--primary); color:var(--primary-foreground); }
.aria-badge--soft{ background:var(--accent); color:var(--accent-foreground); }
.aria-badge--outline{ background:transparent; color:var(--foreground); border-color:var(--border); }
.aria-badge--neutral{ background:var(--muted); color:var(--muted-foreground); }
.aria-badge--success{ background:color-mix(in oklch, var(--success) 16%, transparent); color:var(--success); }
.aria-badge--warning{ background:color-mix(in oklch, var(--warning) 20%, transparent); color:color-mix(in oklch, var(--warning) 72%, var(--foreground)); }
.aria-badge--danger{ background:color-mix(in oklch, var(--destructive) 15%, transparent); color:var(--destructive); }
.aria-badge__dot{ width:6px; height:6px; border-radius:999px; background:currentColor; }
`;
function Badge({
  variant = "soft",
  dot = false,
  className,
  children,
  ...rest
}) {
  __ds_scope.injectOnce("badge", CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: __ds_scope.cx("aria-badge", `aria-badge--${variant}`, className)
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "aria-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-btn{
  --_h:40px; --_px:16px; --_fs:var(--text-sm);
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  height:var(--_h); padding:0 var(--_px); font-size:var(--_fs);
  font-family:var(--font-sans); font-weight:var(--weight-medium);
  line-height:1; white-space:nowrap; border-radius:var(--radius-control);
  border:1px solid transparent; cursor:pointer; user-select:none;
  transition:var(--transition-colors), box-shadow var(--duration-fast) var(--ease-standard),
             transform var(--duration-fast) var(--ease-out);
}
.aria-btn:focus-visible{ outline:none; box-shadow:var(--focus-ring); }
.aria-btn:disabled{ opacity:.5; pointer-events:none; }
.aria-btn:active{ transform:translateY(.5px) scale(.985); }
.aria-btn svg{ width:1.05em; height:1.05em; flex:none; }

.aria-btn--sm{ --_h:32px; --_px:12px; --_fs:var(--text-xs); border-radius:var(--radius-sm); }
.aria-btn--lg{ --_h:48px; --_px:22px; --_fs:var(--text-base); }
.aria-btn--icon{ --_px:0; width:var(--_h); }
.aria-btn--block{ display:flex; width:100%; }

.aria-btn--primary{ background:var(--primary); color:var(--primary-foreground); box-shadow:var(--shadow-brand); }
.aria-btn--primary:hover{ background:color-mix(in oklch, var(--primary) 88%, black); }
.aria-btn--secondary{ background:var(--secondary); color:var(--secondary-foreground); }
.aria-btn--secondary:hover{ background:color-mix(in oklch, var(--secondary) 84%, var(--foreground) 8%); }
.aria-btn--outline{ background:transparent; color:var(--foreground); border-color:var(--border); }
.aria-btn--outline:hover{ background:var(--muted); }
.aria-btn--ghost{ background:transparent; color:var(--foreground); }
.aria-btn--ghost:hover{ background:var(--muted); }
.aria-btn--destructive{ background:var(--destructive); color:var(--destructive-foreground); }
.aria-btn--destructive:hover{ background:color-mix(in oklch, var(--destructive) 88%, black); }
.aria-btn--link{ background:transparent; color:var(--primary); height:auto; padding:0; border-radius:0; }
.aria-btn--link:hover{ text-decoration:underline; text-underline-offset:3px; }
`;
function Button({
  variant = "primary",
  size = "md",
  block = false,
  className,
  type = "button",
  children,
  ...rest
}) {
  __ds_scope.injectOnce("button", CSS);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: __ds_scope.cx("aria-btn", `aria-btn--${variant}`, size !== "md" && `aria-btn--${size}`, block && "aria-btn--block", className)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-card{
  background:var(--card); color:var(--card-foreground);
  border:1px solid var(--border); border-radius:var(--radius-card);
  box-shadow:var(--shadow-sm); overflow:clip;
}
.aria-card--flat{ box-shadow:none; }
.aria-card--ghost{ background:transparent; border-color:transparent; box-shadow:none; }
.aria-card--interactive{ cursor:pointer; transition:box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-out); }
.aria-card--interactive:hover{ box-shadow:var(--shadow-md); transform:translateY(-1px); }
.aria-card__header{ display:flex; flex-direction:column; gap:4px; padding:var(--space-5) var(--space-5) 0; }
.aria-card__title{ font:var(--text-heading); color:var(--card-foreground); }
.aria-card__desc{ font:var(--text-caption); color:var(--muted-foreground); }
.aria-card__content{ padding:var(--space-5); }
.aria-card__footer{ display:flex; align-items:center; gap:var(--space-3); padding:0 var(--space-5) var(--space-5); }
`;
function Card({
  variant = "default",
  interactive = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-card", variant !== "default" && `aria-card--${variant}`, interactive && "aria-card--interactive", className)
  }, rest));
}
function CardHeader({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-card__header", className)
  }, rest));
}
function CardTitle({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("h3", _extends({
    className: __ds_scope.cx("aria-card__title", className)
  }, rest));
}
function CardDescription({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("p", _extends({
    className: __ds_scope.cx("aria-card__desc", className)
  }, rest));
}
function CardContent({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-card__content", className)
  }, rest));
}
function CardFooter({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("card", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-card__footer", className)
  }, rest));
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-check{ display:inline-flex; align-items:flex-start; gap:10px; cursor:pointer; font:var(--text-sm); color:var(--foreground); user-select:none; }
.aria-check input{ position:absolute; opacity:0; width:0; height:0; }
.aria-check__box{
  width:18px; height:18px; flex:none; margin-top:1px;
  border:1.5px solid var(--input); border-radius:6px; background:var(--card);
  display:grid; place-items:center; color:var(--primary-foreground);
  transition:var(--transition-colors), box-shadow var(--duration-fast) var(--ease-standard);
}
.aria-check__box svg{ width:13px; height:13px; opacity:0; transform:scale(.6); transition:opacity var(--duration-fast), transform var(--duration-fast) var(--ease-spring); }
.aria-check input:checked + .aria-check__box{ background:var(--primary); border-color:var(--primary); }
.aria-check input:checked + .aria-check__box svg{ opacity:1; transform:scale(1); }
.aria-check input:focus-visible + .aria-check__box{ box-shadow:0 0 0 3px color-mix(in oklch, var(--ring) 24%, transparent); }
.aria-check input:disabled + .aria-check__box{ opacity:.5; }
.aria-check--disabled{ cursor:not-allowed; opacity:.7; }
.aria-check__label{ line-height:1.35; }
.aria-check__desc{ font:var(--text-caption); color:var(--muted-foreground); margin-top:2px; }
`;
function Checkbox({
  label,
  description,
  className,
  disabled,
  id,
  children,
  ...rest
}) {
  __ds_scope.injectOnce("checkbox", CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: __ds_scope.cx("aria-check", disabled && "aria-check--disabled", className)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: id,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "aria-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), (label || children || description) && /*#__PURE__*/React.createElement("span", {
    className: "aria-check__label"
  }, label || children, description && /*#__PURE__*/React.createElement("span", {
    className: "aria-check__desc"
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-field{ display:flex; flex-direction:column; gap:6px; }
.aria-input-wrap{ position:relative; display:flex; align-items:center; }
.aria-input{
  width:100%; height:40px; padding:0 12px;
  font:var(--text-sm); font-family:var(--font-sans); color:var(--foreground);
  background:var(--card); border:1px solid var(--input); border-radius:var(--radius-control);
  transition:var(--transition-colors), box-shadow var(--duration-fast) var(--ease-standard);
}
.aria-input::placeholder{ color:var(--muted-foreground); }
.aria-input:hover{ border-color:color-mix(in oklch, var(--input) 60%, var(--foreground) 18%); }
.aria-input:focus{ outline:none; border-color:var(--ring); box-shadow:0 0 0 3px color-mix(in oklch, var(--ring) 22%, transparent); }
.aria-input:disabled{ opacity:.55; cursor:not-allowed; background:var(--muted); }
.aria-input--sm{ height:32px; font-size:var(--text-xs); }
.aria-input--lg{ height:48px; font-size:var(--text-base); }
.aria-input--invalid{ border-color:var(--destructive); }
.aria-input--invalid:focus{ box-shadow:0 0 0 3px color-mix(in oklch, var(--destructive) 22%, transparent); }
.aria-input--has-lead{ padding-left:38px; }
.aria-input--has-trail{ padding-right:38px; }
.aria-input__adorn{ position:absolute; display:flex; align-items:center; color:var(--muted-foreground); pointer-events:none; }
.aria-input__adorn svg{ width:18px; height:18px; }
.aria-input__adorn--lead{ left:12px; }
.aria-input__adorn--trail{ right:12px; }
.aria-input__hint{ font:var(--text-caption); color:var(--muted-foreground); }
.aria-input__hint--err{ color:var(--destructive); }
`;
function Input({
  size = "md",
  invalid = false,
  leading,
  trailing,
  hint,
  error,
  label,
  id,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("input", CSS);
  const inputEl = /*#__PURE__*/React.createElement("div", {
    className: "aria-input-wrap"
  }, leading && /*#__PURE__*/React.createElement("span", {
    className: "aria-input__adorn aria-input__adorn--lead"
  }, leading), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    "aria-invalid": invalid || !!error || undefined,
    className: __ds_scope.cx("aria-input", size !== "md" && `aria-input--${size}`, (invalid || error) && "aria-input--invalid", leading && "aria-input--has-lead", trailing && "aria-input--has-trail", className)
  }, rest)), trailing && /*#__PURE__*/React.createElement("span", {
    className: "aria-input__adorn aria-input__adorn--trail"
  }, trailing));
  if (!label && !hint && !error) return inputEl;
  return /*#__PURE__*/React.createElement("div", {
    className: "aria-field"
  }, label && /*#__PURE__*/React.createElement(Label, {
    htmlFor: id
  }, label), inputEl, (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: __ds_scope.cx("aria-input__hint", error && "aria-input__hint--err")
  }, error || hint));
}
function Label({
  className,
  ...rest
}) {
  __ds_scope.injectOnce("label", `.aria-label{ font:var(--text-label); color:var(--foreground); display:inline-flex; gap:4px; align-items:center; }`);
  return /*#__PURE__*/React.createElement("label", _extends({
    className: __ds_scope.cx("aria-label", className)
  }, rest));
}
Object.assign(__ds_scope, { Input, Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Progress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-progress{ width:100%; }
.aria-progress__track{ height:8px; border-radius:999px; background:var(--muted); overflow:hidden; }
.aria-progress__bar{ height:100%; border-radius:999px; background:var(--primary); transition:width var(--duration-slow) var(--ease-out); }
.aria-progress--success .aria-progress__bar{ background:var(--success); }
.aria-progress--warning .aria-progress__bar{ background:var(--warning); }
.aria-progress--danger .aria-progress__bar{ background:var(--destructive); }
.aria-progress__head{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
.aria-progress__label{ font:var(--text-label); color:var(--foreground); }
.aria-progress__value{ font-family:var(--font-mono); font-variant-numeric:tabular-nums; font-size:var(--text-xs); color:var(--muted-foreground); }
`;
function Progress({
  value = 0,
  max = 100,
  tone = "brand",
  label,
  valueLabel,
  showValue = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("progress", CSS);
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: __ds_scope.cx("aria-progress", tone !== "brand" && `aria-progress--${tone}`, className)
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "aria-progress__head"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "aria-progress__label"
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    className: "aria-progress__value"
  }, valueLabel ?? `${Math.round(pct)}%`)), /*#__PURE__*/React.createElement("div", {
    className: "aria-progress__track",
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max
  }, /*#__PURE__*/React.createElement("div", {
    className: "aria-progress__bar",
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Progress.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-select-wrap{ position:relative; display:flex; align-items:center; }
.aria-select{
  -webkit-appearance:none; appearance:none; width:100%; height:40px;
  padding:0 38px 0 12px; font:var(--text-sm); font-family:var(--font-sans);
  color:var(--foreground); background:var(--card);
  border:1px solid var(--input); border-radius:var(--radius-control);
  cursor:pointer; transition:var(--transition-colors), box-shadow var(--duration-fast) var(--ease-standard);
}
.aria-select:hover{ border-color:color-mix(in oklch, var(--input) 60%, var(--foreground) 18%); }
.aria-select:focus{ outline:none; border-color:var(--ring); box-shadow:0 0 0 3px color-mix(in oklch, var(--ring) 22%, transparent); }
.aria-select:disabled{ opacity:.55; cursor:not-allowed; background:var(--muted); }
.aria-select--sm{ height:32px; font-size:var(--text-xs); }
.aria-select--lg{ height:48px; }
.aria-select__chev{ position:absolute; right:12px; pointer-events:none; color:var(--muted-foreground); display:flex; }
`;
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  className: "aria-select__chev",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
function Select({
  size = "md",
  className,
  children,
  options,
  placeholder,
  ...rest
}) {
  __ds_scope.injectOnce("select", CSS);
  return /*#__PURE__*/React.createElement("div", {
    className: "aria-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: __ds_scope.cx("aria-select", size !== "md" && `aria-select--${size}`, className)
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options ? options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  }) : children), /*#__PURE__*/React.createElement(Chevron, null));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Separator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-sep{ border:none; background:var(--border); flex:none; }
.aria-sep--h{ width:100%; height:1px; margin:0; }
.aria-sep--v{ width:1px; align-self:stretch; min-height:1em; margin:0; }
.aria-sep--inset{ width:auto; margin-left:var(--space-5); margin-right:var(--space-5); }
`;
function Separator({
  orientation = "horizontal",
  inset = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("separator", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": orientation,
    className: __ds_scope.cx("aria-sep", orientation === "vertical" ? "aria-sep--v" : "aria-sep--h", inset && "aria-sep--inset", className)
  }, rest));
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Separator.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-switch{ display:inline-flex; align-items:center; gap:10px; cursor:pointer; font:var(--text-sm); color:var(--foreground); user-select:none; }
.aria-switch input{ position:absolute; opacity:0; width:0; height:0; }
.aria-switch__track{
  position:relative; width:38px; height:22px; flex:none; border-radius:999px;
  background:var(--input); transition:background-color var(--duration-base) var(--ease-standard);
}
.aria-switch__thumb{
  position:absolute; top:2px; left:2px; width:18px; height:18px; border-radius:999px;
  background:#fff; box-shadow:var(--shadow-sm);
  transition:transform var(--duration-base) var(--ease-spring);
}
.aria-switch input:checked + .aria-switch__track{ background:var(--primary); }
.aria-switch input:checked + .aria-switch__track .aria-switch__thumb{ transform:translateX(16px); }
.aria-switch input:focus-visible + .aria-switch__track{ box-shadow:0 0 0 3px color-mix(in oklch, var(--ring) 24%, transparent); }
.aria-switch input:disabled + .aria-switch__track{ opacity:.5; }
.aria-switch--disabled{ cursor:not-allowed; }
`;
function Switch({
  label,
  className,
  disabled,
  id,
  ...rest
}) {
  __ds_scope.injectOnce("switch", CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: __ds_scope.cx("aria-switch", disabled && "aria-switch--disabled", className)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    id: id,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "aria-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "aria-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.aria-tabs{ display:inline-flex; gap:2px; padding:4px; background:var(--muted); border-radius:var(--radius-md); }
.aria-tabs--full{ display:flex; width:100%; }
.aria-tabs--full .aria-tab{ flex:1; justify-content:center; }
.aria-tab{
  display:inline-flex; align-items:center; justify-content:center; gap:7px;
  height:32px; padding:0 14px; border:none; background:transparent; cursor:pointer;
  font:var(--weight-medium) var(--text-sm)/1 var(--font-sans); color:var(--muted-foreground);
  border-radius:calc(var(--radius-md) - 3px); white-space:nowrap;
  transition:var(--transition-colors), box-shadow var(--duration-fast);
}
.aria-tab:hover{ color:var(--foreground); }
.aria-tab[aria-selected="true"]{ background:var(--card); color:var(--foreground); box-shadow:var(--shadow-sm); }
.aria-tab:focus-visible{ outline:none; box-shadow:0 0 0 2px var(--ring); }
.aria-tab__count{ font:var(--weight-semibold) var(--text-2xs)/1 var(--font-mono); padding:2px 5px; border-radius:999px; background:var(--accent); color:var(--accent-foreground); }

.aria-tabs--underline{ background:transparent; padding:0; gap:0; border-bottom:1px solid var(--border); border-radius:0; }
.aria-tabs--underline .aria-tab{ border-radius:0; height:40px; position:relative; }
.aria-tabs--underline .aria-tab[aria-selected="true"]{ background:transparent; box-shadow:none; color:var(--primary); }
.aria-tabs--underline .aria-tab[aria-selected="true"]::after{ content:""; position:absolute; left:10px; right:10px; bottom:-1px; height:2px; background:var(--primary); border-radius:2px; }
`;
function Tabs({
  items = [],
  value,
  defaultValue,
  onValueChange,
  variant = "segmented",
  fullWidth = false,
  className,
  ...rest
}) {
  __ds_scope.injectOnce("tabs", CSS);
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value ?? internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: __ds_scope.cx("aria-tabs", variant === "underline" && "aria-tabs--underline", fullWidth && "aria-tabs--full", className)
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    role: "tab",
    type: "button",
    "aria-selected": active === it.value,
    className: "aria-tab",
    onClick: () => select(it.value)
  }, it.icon, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "aria-tab__count"
  }, it.count))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aria-app/AriaApp.jsx
try { (() => {
/* Aria Banking — responsive app UI kit.
   Composes published DS components; layout adapts via container queries
   so the SAME screen serves Smartphone / Tablet / Desktop. */
(function () {
  const DS = window.AriaBankingDesignSystem_341da1;
  const {
    Icon
  } = window.AriaIcons;
  const D = window.ARIA_DATA;
  const {
    Button,
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Avatar,
    Tabs,
    Progress,
    Alert,
    Separator,
    Input,
    BalanceCard,
    TransactionRow,
    PilotThemeSwitcher,
    ModeToggle
  } = DS;
  const yen = n => "¥" + new Intl.NumberFormat("en-US").format(Math.abs(n));
  const CSS = `
  .aria-app{ container-type:inline-size; background:var(--background); color:var(--foreground); height:100%; overflow:hidden; font-family:var(--font-sans); }
  .aria-app__grid{ display:grid; grid-template-columns:224px minmax(0,1fr) 332px; height:100%; }
  .aria-app__main{ min-width:0; overflow:auto; padding:22px 26px 26px; }
  .aria-app__rail{ border-left:1px solid var(--border); background:var(--card); overflow:auto; padding:22px; display:flex; flex-direction:column; gap:18px; }

  /* —— side nav —— */
  .aria-nav{ border-right:1px solid var(--border); background:var(--card); display:flex; flex-direction:column; gap:6px; padding:18px 14px; }
  .aria-nav__logo{ display:flex; align-items:center; gap:10px; padding:6px 8px 16px; }
  .aria-nav__mark{ width:34px; height:34px; border-radius:10px; background:var(--primary); display:grid; place-items:center; flex:none; }
  .aria-nav__word{ font:var(--weight-bold) 19px/1 var(--font-sans); letter-spacing:-.02em; }
  .aria-nav__item{ display:flex; align-items:center; gap:11px; padding:9px 11px; border-radius:var(--radius-md); border:none; background:none; cursor:pointer; color:var(--muted-foreground); font:var(--weight-medium) var(--text-sm)/1 var(--font-sans); width:100%; text-align:left; transition:var(--transition-colors); }
  .aria-nav__item:hover{ background:var(--muted); color:var(--foreground); }
  .aria-nav__item[aria-current="true"]{ background:var(--accent); color:var(--accent-foreground); }
  .aria-nav__spacer{ flex:1; }
  .aria-nav__me{ display:flex; align-items:center; gap:10px; padding:8px; border-radius:var(--radius-md); }
  .aria-nav__me-txt{ display:flex; flex-direction:column; gap:1px; min-width:0; }
  .aria-nav__me-name{ font:var(--weight-semibold) var(--text-sm)/1.1 var(--font-sans); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .aria-nav__me-h{ font:var(--text-2xs)/1 var(--font-mono); color:var(--muted-foreground); }

  /* —— top bar —— */
  .aria-top{ display:flex; align-items:center; gap:14px; margin-bottom:20px; }
  .aria-top__greet{ display:flex; flex-direction:column; gap:2px; }
  .aria-top__hi{ font:var(--weight-semibold) var(--text-xl)/1.1 var(--font-sans); letter-spacing:-.01em; }
  .aria-top__sub{ font:var(--text-caption); color:var(--muted-foreground); }
  .aria-top__spacer{ flex:1; }
  .aria-top__search{ position:relative; width:230px; }
  .aria-top__search .ic{ position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--muted-foreground); display:flex; }
  .aria-iconbtn{ width:40px; height:40px; flex:none; border-radius:var(--radius-md); border:1px solid var(--border); background:var(--card); display:grid; place-items:center; cursor:pointer; color:var(--foreground); position:relative; transition:var(--transition-colors); }
  .aria-iconbtn:hover{ background:var(--muted); }
  .aria-iconbtn .badge-dot{ position:absolute; top:8px; right:9px; width:7px; height:7px; border-radius:999px; background:var(--destructive); border:2px solid var(--card); }

  /* —— main content —— */
  .aria-hero{ display:grid; grid-template-columns:1.15fr 1fr; gap:18px; margin-bottom:18px; }
  .aria-actions{ display:grid; grid-template-columns:repeat(2,1fr); gap:10px; align-content:center; }
  .aria-action{ display:flex; align-items:center; gap:11px; padding:13px 14px; border-radius:var(--radius-card); border:1px solid var(--border); background:var(--card); cursor:pointer; font:var(--weight-medium) var(--text-sm)/1 var(--font-sans); color:var(--foreground); box-shadow:var(--shadow-xs); transition:var(--transition-colors), transform var(--duration-fast) var(--ease-out); }
  .aria-action:hover{ background:var(--muted); transform:translateY(-1px); }
  .aria-action__ic{ width:34px; height:34px; border-radius:var(--radius-full); background:var(--accent); color:var(--accent-foreground); display:grid; place-items:center; flex:none; }

  .aria-sec{ margin-top:20px; }
  .aria-sec__head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .aria-sec__title{ font:var(--text-heading); }
  .aria-list{ background:var(--card); border:1px solid var(--border); border-radius:var(--radius-card); padding:4px 14px; box-shadow:var(--shadow-sm); }

  .aria-accounts{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .aria-acct{ padding:14px; cursor:pointer; }
  .aria-acct__top{ display:flex; align-items:center; justify-content:space-between; }
  .aria-acct__name{ font:var(--text-label); }
  .aria-acct__num{ font:var(--text-2xs)/1 var(--font-mono); color:var(--muted-foreground); margin-top:4px; }
  .aria-acct__bal{ font-family:var(--font-mono); font-variant-numeric:tabular-nums; font-weight:600; font-size:var(--text-lg); margin-top:12px; letter-spacing:-.01em; }
  .aria-acct__delta{ font:var(--text-2xs)/1 var(--font-mono); margin-top:4px; }

  .aria-insight{ background:linear-gradient(150deg, color-mix(in oklch, var(--primary) 12%, var(--card)), var(--card)); border:1px solid color-mix(in oklch, var(--primary) 26%, var(--border)); border-radius:var(--radius-card); padding:16px; }
  .aria-insight__tag{ display:inline-flex; align-items:center; gap:6px; font:var(--weight-semibold) var(--text-2xs)/1 var(--font-sans); letter-spacing:.05em; text-transform:uppercase; color:var(--primary); margin-bottom:9px; }
  .aria-insight__txt{ font:var(--text-sm)/1.5 var(--font-sans); }
  .aria-insight__txt b{ font-weight:600; }

  .aria-rail__title{ font:var(--weight-semibold) var(--text-2xs)/1 var(--font-sans); letter-spacing:.06em; text-transform:uppercase; color:var(--muted-foreground); }

  /* —— bottom nav (mobile) —— */
  .aria-bottom{ display:none; }

  /* ============ TABLET ============ */
  @container (max-width: 1040px){
    .aria-app__grid{ grid-template-columns:76px minmax(0,1fr); }
    .aria-nav{ align-items:stretch; }
    .aria-nav__word, .aria-nav__item span, .aria-nav__me-txt{ display:none; }
    .aria-nav__item{ justify-content:center; padding:11px 0; }
    .aria-nav__logo{ justify-content:center; padding:6px 0 16px; }
    .aria-nav__me{ justify-content:center; }
    .aria-app__rail{ grid-column:1 / -1; border-left:none; border-top:1px solid var(--border); flex-direction:row; flex-wrap:wrap; align-items:flex-start; }
    .aria-app__rail > *{ flex:1 1 240px; }
  }

  /* ============ SMARTPHONE ============ */
  @container (max-width: 680px){
    .aria-app__grid{ grid-template-columns:1fr; }
    .aria-nav{ display:none; }
    .aria-app__main{ padding:16px 16px 84px; }
    .aria-hero{ grid-template-columns:1fr; }
    .aria-accounts{ grid-template-columns:1fr; }
    .aria-top__search{ display:none; }
    .aria-top__hi{ font-size:var(--text-lg); }
    .aria-app__rail{ flex-direction:column; padding:16px; }
    .aria-app__rail > *{ flex:none; }
    .aria-bottom{ display:flex; position:absolute; left:0; right:0; bottom:0; height:var(--tabbar-h); background:var(--glass-bg); backdrop-filter:var(--blur-sheet); border-top:1px solid var(--border); align-items:center; justify-content:space-around; padding:0 6px; }
    .aria-bottom__item{ display:flex; flex-direction:column; align-items:center; gap:3px; border:none; background:none; cursor:pointer; color:var(--muted-foreground); font:var(--weight-medium) 10px/1 var(--font-sans); padding:6px 10px; }
    .aria-bottom__item[aria-current="true"]{ color:var(--primary); }
  }

  /* ===== Deterministic device overrides (used by the line-up; robust to
     container-query dpr quirks). Fluid embeds without data-device still use
     the @container rules above. ===== */
  .aria-app[data-device="tablet"] .aria-app__grid{ grid-template-columns:76px minmax(0,1fr); }
  .aria-app[data-device="tablet"] .aria-nav__word,
  .aria-app[data-device="tablet"] .aria-nav__item span,
  .aria-app[data-device="tablet"] .aria-nav__me-txt{ display:none; }
  .aria-app[data-device="tablet"] .aria-nav__item{ justify-content:center; padding:11px 0; }
  .aria-app[data-device="tablet"] .aria-nav__logo{ justify-content:center; padding:6px 0 16px; }
  .aria-app[data-device="tablet"] .aria-nav__me{ justify-content:center; }
  .aria-app[data-device="tablet"] .aria-app__rail{ grid-column:1 / -1; border-left:none; border-top:1px solid var(--border); flex-direction:row; flex-wrap:wrap; align-items:flex-start; }
  .aria-app[data-device="tablet"] .aria-app__rail > *{ flex:1 1 240px; }

  .aria-app[data-device="phone"] .aria-app__grid{ grid-template-columns:1fr; }
  .aria-app[data-device="phone"] .aria-nav{ display:none; }
  .aria-app[data-device="phone"] .aria-app__main{ padding:16px 16px 84px; }
  .aria-app[data-device="phone"] .aria-hero{ grid-template-columns:1fr; }
  .aria-app[data-device="phone"] .aria-accounts{ grid-template-columns:1fr; }
  .aria-app[data-device="phone"] .aria-top__search{ display:none; }
  .aria-app[data-device="phone"] .aria-top__hi{ font-size:var(--text-lg); }
  .aria-app[data-device="phone"] .aria-app__rail{ flex-direction:column; padding:16px; }
  .aria-app[data-device="phone"] .aria-app__rail > *{ flex:none; }
  .aria-app[data-device="phone"] .aria-bottom{ display:flex; position:absolute; left:0; right:0; bottom:0; height:var(--tabbar-h); background:var(--glass-bg); backdrop-filter:var(--blur-sheet); border-top:1px solid var(--border); align-items:center; justify-content:space-around; padding:0 6px; }
  `;
  function mountCSS() {
    if (document.getElementById("aria-app-css")) return;
    const el = document.createElement("style");
    el.id = "aria-app-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }
  function Mark() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 32 18",
      fill: "none",
      style: {
        width: 19,
        height: 19
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M16 1 28 26h-5l-2.2-4.8h-7L9 26H4L16 1Zm0 9.6-2.5 5.4h5L16 10.6Z",
      fill: "#fff",
      transform: "translate(0 -4) scale(1 0.78)"
    }));
  }
  function NavRail({
    active,
    setActive
  }) {
    return /*#__PURE__*/React.createElement("nav", {
      className: "aria-nav"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-nav__logo"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-nav__mark"
    }, /*#__PURE__*/React.createElement(Mark, null)), /*#__PURE__*/React.createElement("span", {
      className: "aria-nav__word"
    }, "Aria")), D.nav.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "aria-nav__item",
      "aria-current": active === n.id,
      onClick: () => setActive(n.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 20
    }), /*#__PURE__*/React.createElement("span", null, n.label))), /*#__PURE__*/React.createElement("div", {
      className: "aria-nav__spacer"
    }), /*#__PURE__*/React.createElement("div", {
      className: "aria-nav__me"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: D.user.name,
      ring: true,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "aria-nav__me-txt"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-nav__me-name"
    }, D.user.name), /*#__PURE__*/React.createElement("span", {
      className: "aria-nav__me-h"
    }, D.user.handle))));
  }
  function TopBar() {
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-top__greet"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-top__hi"
    }, "Good morning, Amuro"), /*#__PURE__*/React.createElement("span", {
      className: "aria-top__sub"
    }, "Here's your money on Friday, 13 June")), /*#__PURE__*/React.createElement("div", {
      className: "aria-top__spacer"
    }), /*#__PURE__*/React.createElement("div", {
      className: "aria-top__search"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })), /*#__PURE__*/React.createElement(Input, {
      placeholder: "Search",
      style: {
        paddingLeft: 34
      }
    })), /*#__PURE__*/React.createElement("button", {
      className: "aria-iconbtn",
      "aria-label": "Notifications"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      className: "badge-dot"
    })));
  }
  function QuickActions() {
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-actions"
    }, D.actions.map(a => /*#__PURE__*/React.createElement("button", {
      key: a.id,
      className: "aria-action"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-action__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 17
    })), a.label)));
  }
  function AccountCard({
    a
  }) {
    const up = a.delta >= 0;
    return /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      className: "aria-acct"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-acct__top"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "aria-acct__name"
    }, a.name), /*#__PURE__*/React.createElement("div", {
      className: "aria-acct__num"
    }, a.number)), /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral"
    }, a.type)), /*#__PURE__*/React.createElement("div", {
      className: "aria-acct__bal"
    }, yen(a.balance)), /*#__PURE__*/React.createElement("div", {
      className: "aria-acct__delta",
      style: {
        color: up ? "var(--success)" : "var(--muted-foreground)"
      }
    }, up ? "+" : "−", yen(a.delta), " this month"));
  }
  function TransactionsCard() {
    const [tab, setTab] = React.useState("all");
    const rows = D.transactions.filter(t => tab === "all" ? true : tab === "in" ? t.amount > 0 : t.amount < 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-sec__head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-sec__title"
    }, "Activity"), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onValueChange: setTab,
      items: [{
        value: "all",
        label: "All"
      }, {
        value: "in",
        label: "In"
      }, {
        value: "out",
        label: "Out"
      }]
    })), /*#__PURE__*/React.createElement("div", {
      className: "aria-list"
    }, rows.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement(Separator, {
      inset: true
    }), /*#__PURE__*/React.createElement(TransactionRow, t)))));
  }
  function InsightCard() {
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-insight"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-insight__tag"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "spark",
      size: 14
    }), " Aria AI"), /*#__PURE__*/React.createElement("p", {
      className: "aria-insight__txt"
    }, "You're on track to save ", /*#__PURE__*/React.createElement("b", null, "\xA5212,000"), " this month \u2014 about ", /*#__PURE__*/React.createElement("b", null, "18% more"), " than usual. Want me to move the surplus into ", /*#__PURE__*/React.createElement("b", null, "Savings"), " automatically?"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 13
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Set it up"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost"
    }, "Not now")));
  }
  function GoalCard() {
    const g = D.goal;
    const pct = Math.round(g.saved / g.target * 100);
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-rail__title"
    }, "Goal \xB7 ", g.name), /*#__PURE__*/React.createElement(Badge, {
      variant: "soft"
    }, pct, "%")), /*#__PURE__*/React.createElement(Progress, {
      value: g.saved,
      max: g.target,
      showValue: true,
      valueLabel: `${yen(g.saved)} / ${yen(g.target)}`
    })));
  }
  function Rail() {
    return /*#__PURE__*/React.createElement("aside", {
      className: "aria-app__rail"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "aria-rail__title",
      style: {
        marginBottom: 10
      }
    }, "\u7740\u305B\u66FF\u3048 \xB7 Pilot skin"), /*#__PURE__*/React.createElement(PilotThemeSwitcher, {
      defaultValue: "amuro"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "aria-rail__title",
      style: {
        marginBottom: 10
      }
    }, "Appearance"), /*#__PURE__*/React.createElement(ModeToggle, {
      defaultValue: "light",
      applyToRoot: false
    })), /*#__PURE__*/React.createElement(GoalCard, null), /*#__PURE__*/React.createElement(Alert, {
      tone: "info",
      title: "Tip"
    }, "Lock your card instantly from Cards if it goes missing."));
  }
  function BottomNav({
    active,
    setActive
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-bottom"
    }, D.nav.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "aria-bottom__item",
      "aria-current": active === n.id,
      onClick: () => setActive(n.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 20
    }), n.label)));
  }
  function Dashboard({
    device
  }) {
    mountCSS();
    const [active, setActive] = React.useState("home");
    const hero = D.accounts[0];
    return /*#__PURE__*/React.createElement("div", {
      className: "aria-app",
      "data-device": device
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-app__grid"
    }, /*#__PURE__*/React.createElement(NavRail, {
      active: active,
      setActive: setActive
    }), /*#__PURE__*/React.createElement("main", {
      className: "aria-app__main"
    }, /*#__PURE__*/React.createElement(TopBar, null), /*#__PURE__*/React.createElement("div", {
      className: "aria-hero"
    }, /*#__PURE__*/React.createElement(BalanceCard, {
      account: "Everyday",
      number: hero.number,
      type: "Main",
      balance: hero.balance,
      currency: "\xA5",
      delta: hero.delta
    }), /*#__PURE__*/React.createElement(QuickActions, null)), /*#__PURE__*/React.createElement("div", {
      className: "aria-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aria-sec__head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "aria-sec__title"
    }, "Accounts")), /*#__PURE__*/React.createElement("div", {
      className: "aria-accounts"
    }, D.accounts.map(a => /*#__PURE__*/React.createElement(AccountCard, {
      key: a.id,
      a: a
    })))), /*#__PURE__*/React.createElement("div", {
      className: "aria-sec"
    }, /*#__PURE__*/React.createElement(InsightCard, null)), /*#__PURE__*/React.createElement(TransactionsCard, null)), /*#__PURE__*/React.createElement(Rail, null)), /*#__PURE__*/React.createElement(BottomNav, {
      active: active,
      setActive: setActive
    }));
  }
  window.AriaApp = {
    Dashboard
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aria-app/AriaApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aria-app/data.js
try { (() => {
// Aria Banking — demo data for the UI kit (fake, illustrative).
window.ARIA_DATA = {
  user: {
    name: "Amuro Ray",
    handle: "@amuro",
    initials: "AR"
  },
  accounts: [{
    id: "everyday",
    name: "Everyday",
    number: "•••• 4821",
    type: "Main",
    balance: 1284500,
    delta: 62400
  }, {
    id: "savings",
    name: "Savings",
    number: "•••• 7702",
    type: "Goal",
    balance: 3960000,
    delta: 120000
  }, {
    id: "joint",
    name: "Joint",
    number: "•••• 1188",
    type: "Shared",
    balance: 412800,
    delta: -18400
  }],
  transactions: [{
    merchant: "Aria Salary",
    category: "Income",
    date: "Today, 09:00",
    amount: 420000,
    status: "completed",
    logo: null
  }, {
    merchant: "FamilyMart",
    category: "Groceries",
    date: "Today, 08:12",
    amount: -1280,
    status: "completed"
  }, {
    merchant: "Suica Recharge",
    category: "Transit",
    date: "Yesterday",
    amount: -3000,
    status: "pending"
  }, {
    merchant: "Anaheim Electronics",
    category: "Shopping",
    date: "Yesterday",
    amount: -52400,
    status: "completed"
  }, {
    merchant: "Rent — Zeon Estates",
    category: "Housing",
    date: "May 1",
    amount: -128000,
    status: "scheduled"
  }, {
    merchant: "Refund — Lalah Cafe",
    category: "Dining",
    date: "Apr 28",
    amount: 1840,
    status: "completed"
  }],
  goal: {
    name: "Trip to Side 7",
    saved: 388000,
    target: 600000
  },
  nav: [{
    id: "home",
    label: "Home",
    icon: "home"
  }, {
    id: "cards",
    label: "Cards",
    icon: "card"
  }, {
    id: "move",
    label: "Move",
    icon: "send"
  }, {
    id: "insights",
    label: "Insights",
    icon: "spark"
  }, {
    id: "settings",
    label: "Settings",
    icon: "cog"
  }],
  actions: [{
    id: "send",
    label: "Send",
    icon: "send"
  }, {
    id: "request",
    label: "Request",
    icon: "request"
  }, {
    id: "pay",
    label: "Pay bill",
    icon: "bill"
  }, {
    id: "topup",
    label: "Top up",
    icon: "plus"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aria-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/aria-app/icons.jsx
try { (() => {
/* Aria UI kit icons — Lucide (ISC) outline paths, inlined.
   stroke-based, 24×24, currentColor. Attached to window.AriaIcons. */
(function () {
  const P = {
    home: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1V9.5Z",
    card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 4h18M7 15h4",
    send: "M14.5 4 21 12l-6.5 8M4 12h16",
    spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4",
    cog: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm8.4 3a8.4 8.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a8 8 0 0 0-2.2-1.3L15.2 2H8.8l-.4 2.5a8 8 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a8.4 8.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 2.2 1.3l.4 2.5h6.4l.4-2.5a8 8 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.07-.43.1-.86.1-1.3Z",
    request: "M3.5 19.5 20 4M9 4h11v11",
    bill: "M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 6h6M9 12h6",
    plus: "M12 5v14M5 12h14",
    bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
    search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-3.5-3.5",
    eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    shield: "M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-1.5 9 1.2 1.5L15 9.5",
    chevron: "M9 6l6 6-6 6",
    arrowUp: "M12 19V5M5 12l7-7 7 7"
  };
  function Icon({
    name,
    size = 22,
    stroke = 2,
    style,
    ...rest
  }) {
    const d = P[name];
    return React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style,
      ...rest
    }, React.createElement("path", {
      d
    }));
  }
  window.AriaIcons = {
    Icon,
    names: Object.keys(P)
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aria-app/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BalanceCard = __ds_scope.BalanceCard;

__ds_ns.ModeToggle = __ds_scope.ModeToggle;

__ds_ns.PilotThemeSwitcher = __ds_scope.PilotThemeSwitcher;

__ds_ns.TransactionRow = __ds_scope.TransactionRow;

__ds_ns.PILOTS = __ds_scope.PILOTS;

__ds_ns.DEFAULT_PILOT = __ds_scope.DEFAULT_PILOT;

__ds_ns.STORAGE_KEY = __ds_scope.STORAGE_KEY;

__ds_ns.MODE_KEY = __ds_scope.MODE_KEY;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
