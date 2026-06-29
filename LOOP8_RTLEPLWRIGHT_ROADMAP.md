# LOOP 8: React Testing Library & Playwright 統合

## 目標
- Jest + RTL で React コンポーネント実行テスト（75%+ カバレッジ）
- Playwright で E2E テスト（ブラウザレベル検証）
- カバレッジ: 1.94% → 85%+ 達成

---

## Phase 1: React Testing Library 統合（7-10h）

### セットアップ
```bash
npm install --save-dev @testing-library/react @testing-library/user-event jsdom
```

### テスト実装対象

#### 1. v3-components.tsx テスト（2-3h）
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breakdown, StagePath } from './v3-components';

describe('Breakdown Component', () => {
  test('資産構成を表示', () => {
    render(<Breakdown futsu={1000000} others={500000} stage={2} masked={false} />);
    expect(screen.getByText(/普通預金/)).toBeInTheDocument();
  });

  test('masked 時に ¥ ••• を表示', () => {
    render(<Breakdown futsu={1000000} others={500000} stage={2} masked={true} />);
    expect(screen.getByText(/¥ •••/)).toBeInTheDocument();
  });
});

describe('StagePath Component', () => {
  test('stage 遷移ハンドラが呼ばれる', async () => {
    const handleSetStage = jest.fn();
    render(<StagePath stage={2} setStage={handleSetStage} actual={2} seg={[1, 0.8]} />);
    
    const button = screen.getByLabelText(/そだてるステージ/);
    await userEvent.click(button);
    
    expect(handleSetStage).toHaveBeenCalledWith(2);
  });
});
```

**テストケース数**: 6-8個

#### 2. v3-app.tsx テスト（3-4h）
```typescript
describe('App Component', () => {
  test('初期レンダリング', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('stage 変更時に画面が更新', async () => {
    render(<App />);
    const stageButton = screen.getByLabelText(/ステージ選択/);
    await userEvent.click(stageButton);
    expect(screen.getByText(/そだてる/)).toBeInTheDocument();
  });
});
```

**テストケース数**: 8-10個

#### 3. v3-chart.tsx テスト（2-3h）
```typescript
describe('AriaChart Component', () => {
  test('Canvas が描画される', () => {
    render(
      <AriaChart
        actual={[1000, 2000]}
        forecast={[3000]}
        band={[[2000, 4000]]}
        events={[]}
        masked={false}
        themeVersion={0}
      />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
```

**テストケース数**: 4-6個

---

## Phase 2: Playwright E2E テスト（5-8h）

### セットアップ
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### テスト実装

#### tests/dashboard.spec.ts
```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/ダッシュボード v3.html');
  });

  test('初期画面が表示される', async ({ page }) => {
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('div[role="main"]')).toBeVisible();
  });

  test('stage 遷移が動作する', async ({ page }) => {
    const stageButton = page.locator('button:has-text("そだてる")');
    await stageButton.click();
    await expect(page.locator('text=そだてる')).toBeVisible();
  });

  test('masked トグルが動作する', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="金額"]');
    await toggleButton.click();
    await expect(page.locator('text=¥ •••')).toBeVisible();
  });

  test('チャートが描画される', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    // Canvas は 2d context を持つ
    const hasContext = await canvas.evaluate((el: any) => 
      el.getContext('2d') !== null
    );
    expect(hasContext).toBe(true);
  });
});
```

**テストケース数**: 8-10個

---

## Phase 3: Coverage 設定 & CI 統合（3-4h）

### .github/workflows/test.yml
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## チェックリスト

### Jest + RTL
- [ ] @testing-library/react インストール
- [ ] v3-components.tsx テスト実装（6-8個）
- [ ] v3-app.tsx テスト実装（8-10個）
- [ ] v3-chart.tsx テスト実装（4-6個）
- [ ] npm test PASS（すべてのテスト）
- [ ] カバレッジ計測（75%+ 目標）

### Playwright
- [ ] @playwright/test インストール
- [ ] tests/dashboard.spec.ts 作成
- [ ] E2E テスト実装（8-10個）
- [ ] npx playwright test 実行
- [ ] すべてのテスト PASS

### CI 統合
- [ ] .github/workflows/test.yml 作成
- [ ] CI パイプライン実行確認
- [ ] カバレッジレポート生成
- [ ] Code coverage badge 追加

---

## 予想所要時間

| Phase | 時間 | 詳細 |
|-------|------|------|
| 1. RTL 統合 | 7-10h | コンポーネント実行テスト |
| 2. E2E テスト | 5-8h | Playwright 統合 |
| 3. CI 設定 | 3-4h | GitHub Actions 統合 |
| **合計** | **15-22h** | |

---

## 成功基準

✅ Jest カバレッジ: 75%+ 達成
✅ E2E テスト: 8-10個 実装
✅ CI テスト: 自動実行 確認
✅ 全テスト PASS
