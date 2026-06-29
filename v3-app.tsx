/* V3 — Aria 準拠 認証後ダッシュボード（成長ステージ型、TypeScript版） */

import React, { useState, useEffect, useRef, useCallback, FC, ReactElement, memo } from 'react';
import {
  V3_STAGES,
  V3_BANKS,
  V3_BALANCES,
  V3_CHART_DATA,
  V3_EVENTS,
  Stage,
  Bank,
} from './v3-constants';
import { V3_ICONS, LockIcon } from './v3-icons';
import { Breakdown, StagePath } from './v3-components';

// グローバルエラーハンドリング
interface AppError {
  msg: string;
  url?: string;
  line?: number;
  col?: number;
  error?: string;
}

declare global {
  var appErrors: AppError[];
  var HBV3: {
    getStage: () => number;
    setStage: (n: number) => void;
  };
  var AriaBankingDesignSystem_341da1: any;
}

// UI Helpers
interface EyebrowProps {
  children: React.ReactNode;
}

const Eyebrow = memo<EyebrowProps>(({ children }) =>
  React.createElement('span', {
    style: {
      font: 'var(--text-2xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--muted-foreground)',
    },
  }, children)
);

interface ToastProps {
  msg: string;
}

const Toast = memo<ToastProps>(({ msg }) => {
  if (!msg) return null;
  return React.createElement('div', { className: 'v3-toast' },
    React.createElement(V3_ICONS.shieldCheck, { width: 17, height: 17, style: { color: 'var(--success)' } }),
    React.createElement('span', null, msg)
  );
});

// Main App Component
const App: FC = (): ReactElement => {
  const ACTUAL_STAGE = 2;

  // ---- state ----
  const [stage, setStage] = useState<number>(ACTUAL_STAGE);
  const [masked, setMasked] = useState<boolean>(false);
  const [skinOpen, setSkinOpen] = useState<boolean>(false);
  const [scopeAll, setScopeAll] = useState<boolean>(true);
  const [banks, setBanks] = useState<Bank[]>(V3_BANKS.map(b => ({ ...b })));
  const [futsu, setFutsu] = useState<number>(V3_BALANCES.futsu);
  const [forecastBank, setForecastBank] = useState<number[]>(V3_CHART_DATA.forecastBank);
  const [band, setBand] = useState<Array<[number, number]>>(V3_CHART_DATA.band);
  const [toast, setToast] = useState<string>('');
  const [themeVersion, setThemeVersion] = useState<number>(0);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  // Helper functions
  const yen = (n: number): string => '¥' + Math.round(n).toLocaleString('ja-JP');

  const flash = useCallback((m: string): void => {
    setToast(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3600);
  }, []);

  const gatedClick = (need: number): boolean => {
    if (stage < need) {
      flash(`「${V3_STAGES[need].name}」で開放されます。実績がそろうと自動でご案内します。`);
      return true;
    }
    return false;
  };

  // Expose stage setter for tweaks
  useEffect(() => {
    window.HBV3 = {
      setStage: (n: number) => setStage(Math.min(3, Math.max(1, n))),
      getStage: () => stage,
    };
  }, [stage]);

  // Observe theme changes
  useEffect(() => {
    const mo = new MutationObserver(() => setThemeVersion((v) => v + 1));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => mo.disconnect();
  }, []);

  // ---- derived state ----
  const S: Stage = V3_STAGES[stage];
  const bankTotal = futsu + V3_BALANCES.nisa + V3_BALANCES.teiki;
  const othersOn = banks.filter((b) => b.on).reduce((s, b) => s + b.amt, 0);
  const heroBalance = stage === 3 && scopeAll ? bankTotal + othersOn : bankTotal;
  const heroDelta = 38200;

  // Chart series
  const actual = stage === 3 && scopeAll
    ? V3_CHART_DATA.actualBank.map((v, i) => v + V3_CHART_DATA.othersMonthly[i])
    : V3_CHART_DATA.actualBank.slice();
  const forecast = stage === 3 && scopeAll
    ? forecastBank.map((v) => v + othersOn)
    : forecastBank;
  const chartBand = stage === 3 && scopeAll
    ? band.map(([l, h]) => [l + othersOn, h + othersOn])
    : band;
  const events = V3_EVENTS.filter((e) => !(e.s2 && stage < 2));

  // ---- render ----
  return React.createElement(
    'div',
    { className: 'v3-page', role: 'main', 'aria-label': 'ダッシュボード' },

    // Header
    React.createElement(
      'header',
      { role: 'banner', className: 'v3-head' },
      React.createElement('div', { className: 'v3-brand' },
        React.createElement('span', { 'aria-label': 'Aria ロゴ' }, '◆'),
        React.createElement('span', null, 'Aria Banking')
      ),
      React.createElement('button', {
        className: 'v3-iconbtn',
        onClick: () => setMasked(!masked),
        'aria-pressed': masked,
        'aria-label': masked ? '金額を表示' : '金額を非表示',
        type: 'button',
      },
        React.createElement(masked ? V3_ICONS.eyeOff : V3_ICONS.eye)
      )
    ),

    // Main Content
    React.createElement(
      'main',
      { className: 'v3-main' },

      // Greeting & Stage
      React.createElement('div', { className: 'v3-greet', role: 'region', 'aria-label': 'ウェルカムメッセージ' },
        React.createElement('div', null,
          React.createElement('h1', { className: 'v3-greet__hi' }, 'おはようございます、田中さん'),
          React.createElement('p', { className: 'v3-greet__sub' }, S.ai)
        ),
        React.createElement(StagePath, {
          stage,
          setStage,
          actual: 2,
          seg: S.seg,
        })
      ),

      // Chart
      React.createElement('div', { className: 'v3-hero' },
        React.createElement('div', { className: 'v3-chart' },
          React.createElement('canvas', { id: 'chart-canvas', style: { width: '100%', height: '200px' } })
        )
      ),

      // Breakdown
      React.createElement(Breakdown, {
        futsu,
        others: othersOn,
        stage,
        masked,
      }),

      // Actions
      React.createElement('div', { className: 'v3-quick', role: 'toolbar', 'aria-label': 'クイックアクション' },
        [
          { label: '送る', variant: 'primary', need: 2 },
          { label: '受け取り', variant: 'secondary', need: 2 },
          { label: '振替', variant: 'outline', need: 2 },
          { label: '明細', variant: 'outline', need: 1 },
        ].map((a) =>
          React.createElement('button', {
            key: a.label,
            className: `v3-btn v3-btn--${a.variant}`,
            disabled: stage < a.need,
            'aria-disabled': stage < a.need,
            onClick: () => { if (gatedClick(a.need)) return; flash(a.label); },
            type: 'button',
          }, a.label)
        )
      ),

      // Toast
      React.createElement(Toast, { msg: toast })
    )
  );
};

// ---- Initialization ----
const initializeApp = (): void => {
  const DS = (window as any).AriaBankingDesignSystem_341da1;
  const root = document.getElementById('root');

  if (!DS || !root) {
    if (root) {
      root.innerHTML = `
        <div style="padding: 20px; color: #d32f2f; font-family: sans-serif;">
          <h2>⚠️ エラーが発生しました</h2>
          <p>デザインシステムの読み込みに失敗しました。</p>
          <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">再度読み込む</button>
        </div>
      `;
    }
    return;
  }

  const ReactDOM = (window as any).ReactDOM;
  ReactDOM.createRoot(root).render(React.createElement(App));
};

// Global Error Handlers
if (typeof window !== 'undefined') {
  window.appErrors = [];
  window.onerror = (msg, url, line, col, error) => {
    window.appErrors.push({ msg: String(msg), url, line, col, error: error?.stack });
    console.error('[App Error]', msg, url, line);
    return false;
  };
  window.addEventListener('unhandledrejection', (e) => {
    window.appErrors.push({ msg: 'Unhandled Promise Rejection', error: String(e.reason) });
    console.error('[Unhandled Rejection]', e.reason);
  });
  window.addEventListener('DOMContentLoaded', initializeApp);
  // Also initialize if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
}

export default App;
