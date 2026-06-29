/* V3 — 資産チャート（Aria トークン準拠 canvas、TypeScript版） */

import React, { useRef, useEffect, FC, ReactElement, RefObject } from 'react';
import { Event } from './v3-constants';

export interface AriaChartProps {
  actual: number[];
  forecast: number[];
  band: Array<[number, number]>;
  sub?: number[] | null;
  events: Event[];
  masked: boolean;
  themeVersion: number;
  height?: number;
}

const cssVar = (name: string, fallback: string): string => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

// Chart constants
const NOW = 11;
const LAST = 14;
const TICK_IDX = [0, 3, 6, 9, 12, 14];
const TICK_LAB = ["'34/7", '10', "'35/1", '4', '7', '9'];
const MONTHS = [
  "'34/7", "'34/8", "'34/9", "'34/10", "'34/11", "'34/12",
  "'35/1", "'35/2", "'35/3", "'35/4", "'35/5", "'35/6",
  "'35/7", "'35/8", "'35/9",
];

interface Geometry {
  padL: number;
  padR: number;
  padT: number;
  padB: number;
  W: number;
  H: number;
  lo: number;
  hi: number;
}

export const AriaChart: FC<AriaChartProps> = ({
  actual,
  forecast,
  band,
  sub,
  events,
  masked,
  themeVersion,
  height = 260,
}): ReactElement => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draw = (): void => {
      const wrap = wrapRef.current;
      const cv = cvRef.current;
      if (!wrap || !cv) return;

      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      if (!W || !H) return;

      const dpr = window.devicePixelRatio || 1;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);

      const ctx = cv.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Layout constants
      const padL = 16;
      const padR = 16;
      const padT = 26;
      const padB = 30;

      // Colors
      const brand = cssVar('--primary', '#5b6ef5');
      const pos = cssVar('--positive', '#3a9d6b');
      const mut = cssVar('--muted-foreground', '#8a8a92');
      const bordc = cssVar('--border', 'rgba(0,0,0,.1)');
      const cardc = cssVar('--card', '#fff');
      const caut = cssVar('--caution', '#caa14a');

      // Calculate Y range
      const main = [...actual, ...forecast];
      let lo = Infinity;
      let hi = -Infinity;

      main.forEach((v) => {
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      });

      if (sub) {
        sub.forEach((v) => {
          lo = Math.min(lo, v);
        });
      }

      band.forEach(([a, b]) => {
        lo = Math.min(lo, a);
        hi = Math.max(hi, b);
      });

      const span = hi - lo || 1;
      lo -= span * 0.16;
      hi += span * 0.14;

      // Transform functions
      const X = (i: number): number => padL + (i / LAST) * (W - padL - padR);
      const Y = (v: number): number => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);

      const withAlpha = (c: string, a: number): string =>
        `color-mix(in oklch, ${c} ${a}%, transparent)`;

      // Draw future zone
      ctx.fillStyle = withAlpha(caut, 5);
      ctx.fillRect(X(NOW), 0, W - padR - X(NOW), H);

      // Draw gridlines & Y labels
      ctx.font = '600 10px var(--font-sans, sans-serif)';
      ctx.textAlign = 'left';
      [0.22, 0.52, 0.82].forEach((p) => {
        const v = lo + (hi - lo) * p;
        const y = Y(v);
        ctx.strokeStyle = withAlpha(mut, 14);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
        ctx.fillStyle = mut;
        ctx.fillText('¥' + Math.round(v / 10000) + '万', padL + 2, y - 5);
      });

      // Draw X ticks
      ctx.textAlign = 'center';
      ctx.fillStyle = mut;
      TICK_IDX.forEach((ti, k) => ctx.fillText(TICK_LAB[k], X(ti), H - 10));

      // Draw confidence band
      ctx.beginPath();
      ctx.moveTo(X(NOW), Y(main[NOW]));
      band.forEach(([_, h2], i) => ctx.lineTo(X(NOW + 1 + i), Y(h2)));
      for (let i = band.length - 1; i >= 0; i--) {
        ctx.lineTo(X(NOW + 1 + i), Y(band[i][0]));
      }
      ctx.closePath();
      ctx.fillStyle = withAlpha(brand, 9);
      ctx.fill();

      // Draw area under actual
      const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
      grad.addColorStop(0, withAlpha(brand, 26));
      grad.addColorStop(1, withAlpha(brand, 1));
      ctx.beginPath();
      ctx.moveTo(X(0), Y(main[0]));
      for (let i = 1; i <= NOW; i++) {
        ctx.lineTo(X(i), Y(main[i]));
      }
      ctx.lineTo(X(NOW), H - padB);
      ctx.lineTo(X(0), H - padB);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw sub line (dashed)
      if (sub) {
        ctx.strokeStyle = withAlpha(mut, 55);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(X(0), Y(sub[0]));
        for (let i = 1; i < sub.length; i++) {
          ctx.lineTo(X(i), Y(sub[i]));
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw main line
      ctx.strokeStyle = brand;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(X(0), Y(main[0]));
      for (let i = 1; i < main.length; i++) {
        ctx.lineTo(X(i), Y(main[i]));
      }
      ctx.stroke();

      // Draw forecast line (dashed)
      ctx.strokeStyle = withAlpha(brand, 60);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(X(NOW), Y(main[NOW]));
      for (let i = 1; i < forecast.length; i++) {
        ctx.lineTo(X(NOW + i), Y(forecast[i]));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    draw();
    const handleResize = (): void => draw();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [actual, forecast, band, sub, themeVersion, masked]);

  return React.createElement('div', {
    ref: wrapRef,
    className: 'v3-chart-wrap',
    style: { position: 'relative', width: '100%', height },
    role: 'img',
    'aria-label': '資産推移チャート',
  },
    React.createElement('canvas', {
      ref: cvRef,
      style: { display: 'block', width: '100%', height: '100%' },
    }),
    React.createElement('div', {
      ref: tipRef,
      className: 'v3-chart-tip',
      style: { display: 'none' },
    })
  );
};

// Export for window scope
if (typeof window !== 'undefined') {
  (window as any).AriaChart = AriaChart;
}
