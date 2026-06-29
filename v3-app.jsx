/* V3 — Aria 準拠 認証後ダッシュボード（成長ステージ型） */
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const DS = window.AriaBankingDesignSystem_341da1;

  // Fallback handler if Design System doesn't load
  if (!DS) {
    ReactDOM.createRoot(document.getElementById("root")).render(
      React.createElement("div", { style: { padding: "20px", fontFamily: "sans-serif", color: "#d32f2f" } },
        React.createElement("h2", null, "⚠️ エラーが発生しました"),
        React.createElement("p", null, "デザインシステムの読み込みに失敗しました。"),
        React.createElement("p", null, "ページを再度読み込んでください。"),
        React.createElement("button", { onClick: () => location.reload(), style: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" } }, "再度読み込む")
      )
    );
    return;
  }
  const { Button, Card, CardHeader, CardTitle, CardContent, Badge, Progress, Switch,
    Checkbox, Separator, Alert, BalanceCard, TransactionRow, PilotThemeSwitcher, ModeToggle } = DS;

  const yen = (n) => "¥" + Math.round(n).toLocaleString("ja-JP");
  const ACTUAL_STAGE = 2;

  // ---- icons (external) ----
  const Ic = V3_ICONS;
  const Lock = LockIcon;

  // ---- data (external) ----
  const STAGES = V3_STAGES;
  const BANKS0 = V3_BANKS;
  const bal0 = V3_BALANCES;
  const { actualBank, othersMonthly, forecastBank: forecastBank0, band: band0 } = V3_CHART_DATA;
  const EVENTS_BASE = V3_EVENTS;

  // ===== small UI helpers =====
  const Eyebrow = React.memo(({ children }) =>
    React.createElement("span", { style: { font: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--muted-foreground)" } }, children)
  );

  const Toast = React.memo(({ msg }) => {
    if (!msg) return null;
    return React.createElement("div", { className: "v3-toast" },
      React.createElement(Ic.shieldCheck, { width: 17, height: 17, style: { color: "var(--success)" } }),
      React.createElement("span", null, msg));
  });

  // ===== App =====
  function App() {
    const [stage, setStage] = useState(ACTUAL_STAGE);
    const [masked, setMasked] = useState(false);
    const [skinOpen, setSkinOpen] = useState(false);
    const [scopeAll, setScopeAll] = useState(true);
    const [banks, setBanks] = useState(BANKS0);
    const [futsu, setFutsu] = useState(bal0.futsu);
    const [forecastBank, setForecastBank] = useState(forecastBank0);
    const [band, setBand] = useState(band0);
    const [toast, setToast] = useState("");
    const [themeVersion, setThemeVersion] = useState(0);
    const toastTimer = useRef(null);

    // expose stage setter for tweaks
    useEffect(() => {
      window.HBV3 = { setStage: (n) => setStage(Math.min(3, Math.max(1, n))), getStage: () => stage };
    }, [stage]);

    // observe theme changes (pilot/mode) to redraw chart
    useEffect(() => {
      const mo = new MutationObserver(() => setThemeVersion((v) => v + 1));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
      return () => mo.disconnect();
    }, []);

    const flash = useCallback((m) => {
      setToast(m);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(""), 3600);
    }, []);

    const S = STAGES[stage];
    const bankTotal = futsu + bal0.nisa + bal0.teiki;
    const othersOn = banks.filter((b) => b.on).reduce((s, b) => s + b.amt, 0);
    const heroBalance = stage === 3 && scopeAll ? bankTotal + othersOn : bankTotal;
    const heroDelta = 38200;

    // chart series
    const actual = stage === 3 && scopeAll
      ? actualBank.map((v, i) => v + othersMonthly[i])
      : actualBank.slice();
    const forecast = stage === 3 && scopeAll ? forecastBank.map((v) => v + othersOn) : forecastBank;
    const chartBand = stage === 3 && scopeAll ? band.map(([l, h]) => [l + othersOn, h + othersOn]) : band;
    const sub = stage === 3 && scopeAll ? actualBank.concat(forecastBank) : null;
    const events = EVENTS_BASE.filter((e) => !(e.s2 && stage < 2));

    // ----- actions -----
    function gatedClick(need, label) {
      if (stage < need) { flash("「" + STAGES[need].name + "」で開放されます。実績がそろうと自動でご案内します。"); return true; }
      return false;
    }
    function sweep() {
      const sel = banks.filter((b) => b.on);
      if (!sel.length) return;
      const moved = sel.reduce((s, b) => s + b.amt, 0);
      setBanks((bs) => bs.map((b) => (b.on ? { ...b, on: false, swept: true } : b)));
      setFutsu((f) => f + moved);
      setForecastBank((fc) => fc.map((v) => v + moved));
      setBand((bd) => bd.map(([l, h]) => [l + moved, h + moved]));
      flash("生体認証を確認しました。" + yen(moved) + " をこの口座に移動しました（リアルタイム着金）");
    }

    const sweepSel = banks.filter((b) => b.on).reduce((s, b) => s + b.amt, 0);

    // ----- quick actions config -----
    const actions = [
      { label: "送る", variant: "primary", icon: Ic.send, need: 2 },
      { label: "受け取り", variant: "secondary", icon: Ic.plus, need: 2 },
      { label: "振替", variant: "outline", icon: Ic.arrows, need: 2 },
      { label: "明細", variant: "outline", icon: Ic.receipt, need: 1 },
    ];

    return React.createElement("div", { className: "v3-page", role: "main" },
      // ===== header =====
      React.createElement("header", { className: "v3-head", role: "banner" },
        React.createElement("div", { className: "v3-brand" },
          React.createElement("span", { className: "v3-mark", "aria-label": "Aria ロゴ" }, React.createElement(AriaMark)),
          React.createElement("span", { className: "v3-word" }, "Aria")),
        React.createElement("div", { style: { flex: 1 } }),
        React.createElement("button", { className: "v3-iconbtn", onClick: () => setMasked((m) => !m), title: "残高の表示／非表示", "aria-label": "残高の表示切替", "aria-pressed": masked },
          React.createElement(masked ? Ic.eyeOff : Ic.eye, { width: 18, height: 18 })),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("button", { className: "v3-iconbtn v3-iconbtn--brand", onClick: () => setSkinOpen((o) => !o), title: "着せ替え", "aria-label": "着せ替え" },
            React.createElement(Ic.sparkle, { width: 18, height: 18 })),
          skinOpen && React.createElement("div", { className: "v3-skin" },
            React.createElement("div", { className: "v3-skin__row" },
              React.createElement(Eyebrow, null, "着せ替え · Pilot skin"),
              React.createElement("button", { className: "v3-x", onClick: () => setSkinOpen(false), "aria-label": "閉じる" }, "✕")),
            React.createElement(PilotThemeSwitcher, null),
            React.createElement(Eyebrow, null, "表示モード"),
            React.createElement(ModeToggle, { defaultValue: "light" }))),
        React.createElement(Avatar2)),

      // ===== greeting + stage =====
      React.createElement("div", { className: "v3-greet", role: "region", "aria-label": "ウェルカムメッセージ" },
        React.createElement("div", null,
          React.createElement("h1", { className: "v3-greet__hi" }, "おはようございます、田中さん"),
          React.createElement("div", { className: "v3-greet__sub" }, "2035年6月11日（水）のあなたのお金です")),
        React.createElement("div", { style: { flex: 1 } }),
        stage !== ACTUAL_STAGE && React.createElement(Button, { variant: "ghost", size: "sm", onClick: () => setStage(ACTUAL_STAGE) }, "自分のステージに戻る"),
        React.createElement(Badge, { variant: stage === 3 ? "warning" : "success", dot: true }, S.name + "ステージ")),

      stage !== ACTUAL_STAGE && React.createElement("div", { style: { marginTop: -4 } },
        React.createElement(Alert, { tone: "info", title: "プレビュー中" },
          "「" + S.name + "」ステージの画面を見ています。" + (stage > ACTUAL_STAGE ? "実績がそろうと自動でこの画面になります。" : ""))),

      // ===== hero grid =====
      React.createElement("div", { className: "v3-herogrid" },
        React.createElement("div", { className: "v3-herocol" },
          React.createElement(BalanceCard, {
            account: "メイン口座", number: "•••• 4821",
            type: stage === 3 && scopeAll ? "すべての銀行" : "当行",
            balance: heroBalance, currency: "¥", delta: heroDelta, deltaLabel: "先月末から",
            masked: masked, style: { width: "100%" } }),
          stage === 3 && React.createElement("div", { className: "v3-scope" },
            React.createElement(Button, { variant: scopeAll ? "secondary" : "ghost", size: "sm", onClick: () => setScopeAll(true) }, "すべての銀行"),
            React.createElement(Button, { variant: !scopeAll ? "secondary" : "ghost", size: "sm", onClick: () => setScopeAll(false) }, "当行のみ")),
          React.createElement("div", { className: "v3-quick", role: "toolbar", "aria-label": "クイックアクション" },
            actions.map((a) => React.createElement(Button, {
              key: a.label, variant: a.variant, block: true,
              disabled: stage < a.need,
              onClick: () => { if (!gatedClick(a.need)) flash(a.label + "（デモ）"); },
              "aria-disabled": stage < a.need,
            },
              React.createElement(a.icon, { width: 16, height: 16, style: { marginRight: 7 } }),
              a.label,
              stage < a.need && React.createElement(Lock, { style: { marginLeft: 6, opacity: .7 } }))))),

        // AI + chart card
        React.createElement(Card, { className: "v3-chartcard" },
          React.createElement("div", { className: "v3-ai" },
            React.createElement("span", { className: "v3-ai__orb" }, React.createElement(Ic.sparkle, { width: 15, height: 15 })),
            React.createElement("span", null, React.createElement("b", null, "Aria のきづき　"), S.ai)),
          React.createElement(window.AriaChart, {
            actual, forecast, band: chartBand, sub, events, masked, themeVersion, height: 244 }),
          React.createElement(Separator, null),
          React.createElement(Breakdown, { futsu, others: othersOn, stage, masked }))),

      // ===== stage-specific row =====
      stage === 1 && React.createElement(Alert, { tone: "success", title: "送金機能そのものが、ありません — 不正送金リスク 0" },
        "この契約は参照専用です。振込・振替が存在しないため、IDやパスワードが盗まれてもお金は1円も動かせません。送金が必要になったら、実績にあわせて「そだてる」が自然に開きます。"),

      React.createElement("div", { className: "v3-deck" },
        // stage journey
        React.createElement(Card, { className: "v3-card" },
          React.createElement(CardHeader, null,
            React.createElement(CardTitle, null,
              React.createElement(Ic.sprout, { width: 17, height: 17, style: { marginRight: 8, verticalAlign: "-3px", color: "var(--primary)" } }),
              "バンキング・ステージ")),
          React.createElement(CardContent, null,
            React.createElement(StagePath, { stage, setStage, actual: ACTUAL_STAGE, seg: S.seg }),
            React.createElement("div", { className: "v3-crit" },
              S.crit.title
                ? React.createElement("div", { className: "v3-crit__t" }, "次の「", React.createElement("b", null, S.crit.title), "」まで、あとすこし")
                : React.createElement("div", { className: "v3-crit__t" }, "最上位ステージ。すべての機能がひらいています"),
              S.crit.items.map((it) => React.createElement("div", { key: it.t, className: "v3-critem" },
                React.createElement("span", { className: "v3-ck" + (it.ok ? " on" : "") }, it.ok ? "✓" : ""),
                React.createElement("span", { className: "v3-critem__t" }, it.t),
                React.createElement("span", { className: "v3-critem__m" }, it.vl)))))),

        // security
        React.createElement(Card, { className: "v3-card" },
          React.createElement(CardHeader, null,
            React.createElement(CardTitle, null,
              React.createElement(Ic.shieldCheck, { width: 17, height: 17, style: { marginRight: 8, verticalAlign: "-3px", color: "var(--primary)" } }),
              "いまの守られ方")),
          React.createElement(CardContent, null,
            React.createElement("div", { className: "v3-sec" },
              S.sec.map((r) => React.createElement("div", { key: r[0], className: "v3-secrow" },
                React.createElement("span", { className: "v3-ok" }, "✓"),
                React.createElement("span", null, r[0]),
                React.createElement("span", { className: "v3-secrow__v" }, r[1])))))),

        // limit (s2/s3) or zero badge (s1)
        stage === 1
          ? React.createElement(Card, { className: "v3-card v3-zero" },
            React.createElement(CardContent, null,
              React.createElement(Eyebrow, null, "不正送金の被害可能性"),
              React.createElement("div", { className: "v3-zero__big" }, "0", React.createElement("small", null, "%")),
              React.createElement("p", { className: "v3-zero__p" }, "参照専用の契約なので、構造的に被害が起こりえません。")))
          : React.createElement(Card, { className: "v3-card" },
            React.createElement(CardHeader, null,
              React.createElement(CardTitle, null,
                React.createElement(Ic.clock, { width: 17, height: 17, style: { marginRight: 8, verticalAlign: "-3px", color: "var(--primary)" } }),
                "きょうの振込わく")),
            React.createElement(CardContent, null,
              React.createElement(Progress, {
                label: "本日の利用", value: S.limit.used, max: S.limit.cap, showValue: true,
                valueLabel: yen(S.limit.used) + " / " + yen(S.limit.cap),
                tone: S.limit.used / S.limit.cap > 0.85 ? "warning" : undefined }),
              React.createElement("p", { className: "v3-note" }, S.limit.note),
              React.createElement("a", { className: "v3-link", href: "振込限度額の設定.html" }, "限度額の設定",
                React.createElement(Ic.chevron, { width: 13, height: 13, style: { verticalAlign: "-2px" } }))))),

      // ===== aggregation (s3 / teaser s2) =====
      stage !== 1 && React.createElement(Aggregation, {
        banks, setBanks, sweep, sweepSel, locked: stage < 3, masked, yen, homeAmt: bankTotal }),

      // ===== activity =====
      React.createElement("div", null,
        React.createElement("div", { className: "v3-sectitle" }, "最近の入出金",
          stage === 3 && React.createElement(Badge, { variant: "neutral" }, "他行もまとめて表示")),
        React.createElement(Card, { className: "v3-txcard" },
          txnsFor(stage).map((t, i) => React.createElement(React.Fragment, { key: i },
            i > 0 && React.createElement(Separator, null),
            React.createElement(TransactionRow, {
              merchant: t.merchant, category: t.category, date: t.date,
              amount: t.amount, status: t.status, currency: "¥", masked: masked }))))),

      React.createElement(Toast, { msg: toast })
    );
  }

  function Avatar2() {
    return React.createElement("div", { className: "v3-avatar" }, "田");
  }

  function Breakdown({ futsu, others, stage, masked }) {
    const items = [
      { lab: "普通預金", v: futsu, c: "var(--chart-1)" },
      stage >= 2 && { lab: "つみたてNISA", v: 412300, c: "var(--chart-2)" },
      { lab: "定期", v: 500000, c: "var(--chart-4)" },
      stage >= 3 && { lab: "他行のこり", v: others, c: "var(--chart-3)" },
    ].filter(Boolean);
    const total = items.reduce((s, x) => s + x.v, 0);
    return React.createElement("div", { className: "v3-bd" },
      React.createElement("div", { className: "v3-bd__bar" },
        items.map((x) => React.createElement("i", { key: x.lab, style: { flex: x.v, background: x.c } }))),
      React.createElement("div", { className: "v3-bd__legend" },
        items.map((x) => React.createElement("span", { key: x.lab },
          React.createElement("i", { style: { background: x.c } }),
          x.lab, " ",
          React.createElement("b", null, masked ? "¥ •••" : "¥" + x.v.toLocaleString("ja-JP"))))));
  }

  function StagePath({ stage, setStage, actual, seg }) {
    const nodes = [
      { n: 1, name: "みまもり", icon: Ic.eye },
      { n: 2, name: "そだてる", icon: Ic.sprout },
      { n: 3, name: "ひろげる", icon: Ic.target },
    ];
    return React.createElement("div", { className: "v3-path" },
      nodes.map((nd, i) => React.createElement(React.Fragment, { key: nd.n },
        i > 0 && React.createElement("div", { className: "v3-seg" },
          React.createElement("span", { className: "v3-seg__f", style: { transform: "scaleX(" + seg[i - 1] + ")" } })),
        React.createElement("button", {
          className: "v3-node" + (nd.n < actual ? " done" : "") + (nd.n === actual ? " now" : "") + (nd.n === stage && stage !== actual ? " view" : ""),
          onClick: () => setStage(nd.n), type: "button",
        },
          React.createElement("span", { className: "v3-node__dot" }, React.createElement(nd.icon, { width: 15, height: 15 })),
          React.createElement("span", { className: "v3-node__n" }, nd.name)))));
  }

  function Aggregation({ banks, setBanks, sweep, sweepSel, locked, masked, yen, homeAmt }) {
    return React.createElement(Card, { className: "v3-agg" + (locked ? " locked" : "") },
      React.createElement(CardHeader, null,
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
          React.createElement(CardTitle, null,
            React.createElement(Ic.grid, { width: 18, height: 18, style: { marginRight: 8, verticalAlign: "-4px", color: "var(--primary)" } }),
            "ぜんぶの銀行を、ここにひとつに。"),
          React.createElement("div", { style: { flex: 1 } }),
          React.createElement(Badge, { variant: "neutral" }, "銀行API連携・暗号化")),
        React.createElement("p", { className: "v3-agg__sub" }, "つないだ他行の残高をワンタップで集約。手数料無料・原則リアルタイム着金。集めると優遇金利（残高400万円〜）の対象になります。")),
      React.createElement(CardContent, null,
        React.createElement("div", { className: "v3-agg__grid" },
          React.createElement("div", { className: "v3-agg__banks" },
            banks.map((b) => React.createElement("label", { key: b.id, className: "v3-obank" + (b.swept ? " swept" : "") },
              React.createElement(Checkbox, { checked: !!b.on, disabled: b.swept,
                onChange: (e) => { const v = e && e.target ? e.target.checked : !b.on; setBanks((bs) => bs.map((x) => x.id === b.id ? { ...x, on: v } : x)); } }),
              React.createElement("span", { className: "v3-obank__logo", style: { background: b.color } }, b.initial),
              React.createElement("span", { className: "v3-obank__name" },
                React.createElement("b", null, b.name),
                React.createElement("span", null, b.kind)),
              React.createElement("span", { className: "v3-obank__amt" }, masked ? "¥ •••" : yen(b.amt))))),
          React.createElement("div", { className: "v3-agg__home" },
            React.createElement("div", { className: "v3-orbit" },
              React.createElement("span", null, "Aria"),
              React.createElement("b", null, masked ? "¥ •••" : yen(homeAmt)),
              React.createElement("span", null, "メイン口座")),
            React.createElement("div", { className: "v3-agg__sum" }, "選択中の合計　", React.createElement("b", null, masked ? "¥ •••" : yen(sweepSel))),
            React.createElement(Button, { variant: "primary", disabled: sweepSel === 0, onClick: sweep },
              React.createElement(Ic.send, { width: 16, height: 16, style: { marginRight: 8 } }), "この口座に集める"))),
        React.createElement("p", { className: "v3-note", style: { marginTop: 14 } },
          React.createElement(Ic.shieldCheck, { width: 13, height: 13, style: { verticalAlign: "-2px", marginRight: 5, color: "var(--success)" } }),
          "移動できるのは「ご本人名義」の口座だけ。実行前に生体認証で確認します。")),
      locked && React.createElement("div", { className: "v3-agg__lock" },
        React.createElement("span", { className: "v3-agg__lockic" }, React.createElement(Lock, { width: 18, height: 18 })),
        React.createElement("b", null, "「ひろげる」ステージで開放されます"),
        React.createElement("span", null, "他行の残高をひとつにまとめる機能です。実績がそろうと自動でご案内します。")));
  }

  function txnsFor(stage) {
    const base = [
      { merchant: "給与 ミドリデンキ", category: "収入", date: "今日 09:00", amount: 318400, status: "completed" },
      stage >= 3 && { merchant: "クレジットカード", category: "コスモネット銀行", date: "昨日", amount: -64180, status: "completed" },
      { merchant: "つみたてNISA", category: "自動振替", date: "6/25 予定", amount: -30000, status: "scheduled" },
      { merchant: "ミドリ電力", category: "電気料金", date: "6/6", amount: -7820, status: "completed" },
      stage >= 3 && { merchant: "利息", category: "青葉銀行", date: "6/5", amount: 214, status: "completed" },
    ].filter(Boolean);
    return base;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
