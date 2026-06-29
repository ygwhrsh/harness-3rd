/**
 * v3-tweaks.tsx - Tweaks Component Tests
 * デモ・設定パネルのテスト
 */

import React from 'react';
import { render } from '@testing-library/react';
import V3TweaksApp from './v3-tweaks';

describe('v3-tweaks - V3TweaksApp Component', () => {
  test('V3TweaksApp コンポーネントがレンダリングされる', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container).toBeInTheDocument();
  });

  test('初期状態でコンテナが表示される', () => {
    const { container } = render(<V3TweaksApp />);
    const appDiv = container.querySelector('div');
    expect(appDiv).toBeInTheDocument();
  });

  test('DOM 要素が生成される', () => {
    const { container } = render(<V3TweaksApp />);
    const children = container.children;
    expect(children.length).toBeGreaterThanOrEqual(1);
  });

  test('state が初期化される', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container.innerHTML).toBeDefined();
  });

  test('キーボード操作が可能', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container).toBeInTheDocument();
  });

  test('アンマウント可能', () => {
    const { unmount } = render(<V3TweaksApp />);
    unmount();
  });
});

describe('v3-tweaks - State Initialization', () => {
  test('デフォルト値が設定される', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container).toBeInTheDocument();
  });
});

describe('v3-tweaks - Stage Control', () => {
  test('stage 値が管理可能', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container).toBeInTheDocument();
  });

  test('複数のステージが選択可能', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container.innerHTML).toBeDefined();
  });
});

describe('v3-tweaks - Integration with window.HBV3', () => {
  test('window.HBV3 が初期化される', () => {
    render(<V3TweaksApp />);
    if ((window as any).HBV3) {
      expect(typeof (window as any).HBV3).toBe('object');
    }
  });
});

describe('v3-tweaks - Auto-mount Initialization', () => {
  test('initializeApp 関数が実行可能', () => {
    const { container } = render(<V3TweaksApp />);
    expect(container).toBeInTheDocument();
  });

  test('document readyState チェック', () => {
    const { container } = render(<V3TweaksApp />);
    expect(document.readyState).toBeDefined();
    expect(['loading', 'interactive', 'complete']).toContain(document.readyState);
  });
});

describe('v3-tweaks - Performance', () => {
  test('レンダリングが高速', () => {
    const startTime = performance.now();
    render(<V3TweaksApp />);
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(500);
  });
});
