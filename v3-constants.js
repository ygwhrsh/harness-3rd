/* V3 Constants — ステージ、銀行、イベント定義 */

const V3_STAGES = {
  1: {
    name: "みまもり", tone: "参照のみ",
    ai: "年金の入金を確認しました。今月の残りは約 ¥86,000。いつものペースです。",
    crit: { title: "そだてる", items: [
      { t: "明細の確認", ok: false, v: 8, max: 10, vl: "8 / 10回" },
      { t: "パスキー＋生体認証の登録", ok: true, v: 1, max: 1, vl: "完了" },
      { t: "詐欺対策ミニ講座（3分）", ok: true, v: 1, max: 1, vl: "完了" },
    ] },
    seg: [0.55, 0],
    sec: [["送金機能", "なし（被害0）"], ["ログイン", "パスキー＋顔"], ["不審ログイン検知", "24時間 AI"], ["家族への見守り通知", "ON"]],
    limit: null,
  },
  2: {
    name: "そだてる", tone: "資産形成",
    ai: "このペースなら 9月末に約 ¥237万。食費が先月より12%少なめなので、月末に約 ¥9,000 をつみたてに回せます。",
    crit: { title: "ひろげる", items: [
      { t: "振替・振込の実績", ok: false, v: 18, max: 20, vl: "18 / 20回" },
      { t: "6か月の継続利用", ok: true, v: 1, max: 1, vl: "完了" },
      { t: "登録デバイスの固定", ok: true, v: 1, max: 1, vl: "完了" },
    ] },
    seg: [1, 0.8],
    sec: [["振込わく", "¥50,000/日・自動ロック"], ["新しい振込先", "24時間の冷却期間"], ["ログイン", "パスキー＋顔"], ["不正検知", "24時間 AI"]],
    limit: { used: 12000, cap: 50000, note: "使わない日は自動で ¥0 にロック" },
  },
  3: {
    name: "ひろげる", tone: "すべて開放",
    ai: "他行に残っている残高をこちらに集めると、優遇金利（残高400万円〜）の対象になります。",
    crit: { title: null, items: [
      { t: "高額振込・振込予約", ok: true, v: 1, max: 1, vl: "利用可" },
      { t: "他行残高のワンタップ集約", ok: true, v: 1, max: 1, vl: "利用可" },
      { t: "専任コンシェルジュ", ok: true, v: 1, max: 1, vl: "利用可" },
    ] },
    seg: [1, 1],
    sec: [["高額振込", "生体＋登録デバイス"], ["行動認証", "操作のクセを常時照合"], ["他行連携", "読み取り専用トークン"], ["不正検知", "24時間 AI"]],
    limit: { used: 120000, cap: 3000000, note: "¥100,000 超は顔認証＋登録デバイスで確認" },
  },
};

const V3_BANKS = [
  { id: "aoba", name: "青葉銀行", kind: "普通 ・ ＊＊＊2841", amt: 640200, color: "#4a7fb5", initial: "青", on: true },
  { id: "cosmo", name: "コスモネット銀行", kind: "普通 ・ ＊＊＊7705", amt: 1205800, color: "#8a67b8", initial: "コ", on: true },
  { id: "hidamari", name: "ひだまり信用金庫", kind: "普通 ・ ＊＊＊0913", amt: 88400, color: "#c98a3d", initial: "ひ", on: false },
];

const V3_BALANCES = { futsu: 1284560, nisa: 412300, teiki: 500000 };

const V3_CHART_DATA = {
  actualBank: [1480000, 1523000, 1498000, 1581000, 1624000, 1688000, 1716000, 1779000, 1841000, 1925000, 2158660, 2196860],
  othersMonthly: [2050000, 2040000, 2030000, 2010000, 1998000, 1990000, 1985000, 1975000, 1962000, 1955000, 1942000, 1934400],
  forecastBank: [2249000, 2304000, 2371000],
  band: [[2212000, 2286000], [2248000, 2366000], [2295000, 2455000]],
};

const V3_EVENTS = [
  { x: 11.0, name: "給与 ミドリデンキ", amt: "+¥318,400", inflow: true },
  { x: 11.45, name: "つみたてNISA（自動）", amt: "−¥30,000" },
  { x: 11.55, name: "家賃の振込予約", amt: "−¥98,000", s2: true },
  { x: 12.0, name: "給与（定例）", amt: "+¥318,400", inflow: true },
  { x: 12.55, name: "カード引落し（AI予測）", amt: "−¥64,000 前後" },
  { x: 13.6, name: "ボーナスつみたて（AI提案）", amt: "+¥150,000 案", inflow: true },
];

const V3_ACTIONS = [
  { label: "送る", variant: "primary", icon: "send", need: 2 },
  { label: "受け取り", variant: "secondary", icon: "plus", need: 2 },
  { label: "振替", variant: "outline", icon: "arrows", need: 2 },
  { label: "明細", variant: "outline", icon: "receipt", need: 1 },
];
