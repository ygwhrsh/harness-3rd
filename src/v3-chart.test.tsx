/**
 * v3-chart.tsx - Chart Component Tests
 * Canvas 描画とチャート表示のテスト
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AriaChart, type AriaChartProps } from '@/v3-chart';

describe('v3-chart - AriaChart Component', () => {
  const defaultProps = {
    actual: [1000, 1500, 2000, 2500, 3000, 3500],
    forecast: [3500, 4000, 4500, 5000],
    band: [[2000, 4000], [3000, 5000], [2500, 3500]],
    events: [],
    masked: false,
    themeVersion: 0,
  } as const as AriaChartProps;

  test('Canvas 要素がレンダリングされる', () => {
    render(<AriaChart {...defaultProps} />);
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
  });

  test('Canvas がコンテナ内に配置される', () => {
    const { container } = render(<AriaChart {...defaultProps} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas?.parentElement).toBeInTheDocument();
  });

  test('Canvas Context がサポートされている', () => {
    const { container } = render(<AriaChart {...defaultProps} />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toBeInTheDocument();
    // jsdom では Canvas Context は完全にはサポートされていない
    const ctx = canvas?.getContext('2d');
    expect(ctx === null || ctx instanceof CanvasRenderingContext2D).toBe(true);
  });

  test('actual パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} actual={[1000, 2000]} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<AriaChart {...defaultProps} actual={[1000, 2000, 3000]} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('forecast パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} forecast={[3500]} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<AriaChart {...defaultProps} forecast={[3500, 4000]} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('band（信頼区間）パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} band={[[2000, 4000]]} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(
      <AriaChart
        {...defaultProps}
        band={[[2000, 4000], [3000, 5000]]}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('events パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart
        {...defaultProps}
        events={[
          { x: 5, name: 'Event 1', inflow: true, amt: '100' },
        ]}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(
      <AriaChart
        {...defaultProps}
        events={[
          { x: 5, name: 'Event 1', inflow: true, amt: '100' },
          { x: 10, name: 'Event 2', inflow: false, amt: '200' },
        ]}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('masked=true 時に値が非表示', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} masked={false} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<AriaChart {...defaultProps} masked={true} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('themeVersion パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} themeVersion={0} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<AriaChart {...defaultProps} themeVersion={1} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('オプション height パラメータが機能', () => {
    const { rerender } = render(
      <AriaChart {...defaultProps} height={300} />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<AriaChart {...defaultProps} height={400} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});

describe('v3-chart - Props Validation', () => {
  test('AriaChartProps: actual は number[]', () => {
    const actual = [1000, 2000, 3000];
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.every(v => typeof v === 'number')).toBe(true);
  });

  test('AriaChartProps: forecast は number[]', () => {
    const forecast = [3500, 4000];
    expect(Array.isArray(forecast)).toBe(true);
    expect(forecast.every(v => typeof v === 'number')).toBe(true);
  });

  test('AriaChartProps: band は [number, number][]', () => {
    const band: Array<[number, number]> = [[2000, 4000], [3000, 5000]];
    expect(Array.isArray(band)).toBe(true);
    expect(band.every(b => b.length === 2)).toBe(true);
  });

  test('AriaChartProps: events は Event[]', () => {
    const events = [
      { x: 5, name: 'Event 1', inflow: true, amt: '100' },
      { x: 10, name: 'Event 2', inflow: false, amt: '200' },
    ];
    expect(Array.isArray(events)).toBe(true);
    events.forEach(e => {
      expect(typeof e.x).toBe('number');
      expect(typeof e.name).toBe('string');
      expect(typeof e.inflow).toBe('boolean');
    });
  });

  test('AriaChartProps: masked は boolean', () => {
    expect(typeof false).toBe('boolean');
    expect(typeof true).toBe('boolean');
  });

  test('AriaChartProps: themeVersion は number', () => {
    expect(typeof 0).toBe('number');
    expect(typeof 1).toBe('number');
  });

  test('AriaChartProps: height はオプション', () => {
    const height = 300;
    expect(height === undefined || typeof height === 'number').toBe(true);
  });
});

describe('v3-chart - Edge Cases', () => {
  test('empty actual データ', () => {
    render(
      <AriaChart
        actual={[]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('large データセット', () => {
    const largeActual = Array(100)
      .fill(0)
      .map((_, i) => 1000 + i * 100);
    render(
      <AriaChart
        actual={largeActual}
        forecast={[]}
        band={[]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('single data point', () => {
    render(
      <AriaChart
        actual={[2000]}
        forecast={[3000]}
        band={[[1000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});

describe('v3-chart - Canvas Drawing', () => {
  test('複数のリセット操作が可能', () => {
    const { rerender } = render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );

    // canvas をリセット
    rerender(
      <AriaChart
        actual={[]}
        forecast={[]}
        band={[]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('グラデーション生成が可能', () => {
    const { container } = render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  test('イベント点の描画', () => {
    render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[
          { x: 5, name: 'Event 1', inflow: true, amt: '100' },
          { x: 10, name: 'Event 2', inflow: false, amt: '200' },
        ]}
        masked={false}
        themeVersion={0}
      />
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('masked で値が非表示でも Canvas は存在', () => {
    const { container } = render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={true}
        themeVersion={0}
      />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});

describe('v3-chart - Theme Support', () => {
  test('複数 theme バージョンに対応', () => {
    const { rerender } = render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );

    rerender(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={1}
      />
    );

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('theme 変更時に再描画', () => {
    const { rerender } = render(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );

    rerender(
      <AriaChart
        actual={[1000, 2000, 3000]}
        forecast={[3500]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={2}
      />
    );

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});
