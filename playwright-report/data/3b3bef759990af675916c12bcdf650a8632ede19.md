# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard - Stage Navigation >> ステージボタンが存在する
- Location: tests/dashboard.spec.ts:57:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active]:
  - application "Aria バンキングダッシュボード"
```

# Test source

```ts
  1   | /**
  2   |  * Dashboard E2E Tests
  3   |  * Playwright による実際のブラウザテスト
  4   |  */
  5   | 
  6   | import { test, expect } from '@playwright/test';
  7   | 
  8   | test.describe('Dashboard - Initial Load', () => {
  9   |   test('ダッシュボードが読み込まれる', async ({ page }) => {
  10  |     await page.goto('/ダッシュボード v3.html');
  11  | 
  12  |     // ページがロードされたことを確認
  13  |     await expect(page).toHaveTitle(/ホーム|Aria|Dashboard/i);
  14  |   });
  15  | 
  16  |   test('メインコンテンツが表示される', async ({ page }) => {
  17  |     await page.goto('/ダッシュボード v3.html');
  18  | 
  19  |     // メインコンテナを確認
  20  |     const main = page.locator('[role="main"]');
  21  |     await expect(main).toBeVisible();
  22  |   });
  23  | 
  24  |   test('ヘッダーが表示される', async ({ page }) => {
  25  |     await page.goto('/ダッシュボード v3.html');
  26  | 
  27  |     // ヘッダーを確認
  28  |     const header = page.locator('[role="banner"]');
  29  |     await expect(header).toBeVisible();
  30  |   });
  31  | 
  32  |   test('ページが正常にレンダリングされている', async ({ page }) => {
  33  |     await page.goto('/ダッシュボード v3.html');
  34  | 
  35  |     // ページが空でないことを確認
  36  |     const content = await page.content();
  37  |     expect(content.length).toBeGreaterThan(100);
  38  |   });
  39  | 
  40  |   test('JavaScript エラーが発生していない', async ({ page }) => {
  41  |     let errorCount = 0;
  42  |     page.on('console', msg => {
  43  |       if (msg.type() === 'error') {
  44  |         errorCount++;
  45  |       }
  46  |     });
  47  | 
  48  |     await page.goto('/ダッシュボード v3.html');
  49  |     await page.waitForLoadState('networkidle');
  50  | 
  51  |     // エラーが少ないことを確認（ゼロが理想だが、環境差を許容）
  52  |     expect(errorCount).toBeLessThan(3);
  53  |   });
  54  | });
  55  | 
  56  | test.describe('Dashboard - Stage Navigation', () => {
  57  |   test('ステージボタンが存在する', async ({ page }) => {
  58  |     await page.goto('/ダッシュボード v3.html');
  59  | 
  60  |     // ボタンを探す（段階系ボタン）
  61  |     const buttons = page.locator('button');
  62  |     const count = await buttons.count();
> 63  |     expect(count).toBeGreaterThan(0);
      |                   ^ Error: expect(received).toBeGreaterThan(expected)
  64  |   });
  65  | 
  66  |   test('ページ操作が可能', async ({ page }) => {
  67  |     await page.goto('/ダッシュボード v3.html');
  68  | 
  69  |     // ボタンがクリック可能
  70  |     const buttons = page.locator('button');
  71  |     if (await buttons.first().isVisible()) {
  72  |       await expect(buttons.first()).toBeEnabled();
  73  |     }
  74  |   });
  75  | 
  76  |   test('スクロールが機能する', async ({ page }) => {
  77  |     await page.goto('/ダッシュボード v3.html');
  78  | 
  79  |     // スクロール実行
  80  |     await page.evaluate(() => window.scrollBy(0, 100));
  81  |     const scrollY = await page.evaluate(() => window.scrollY);
  82  |     expect(scrollY).toBeGreaterThanOrEqual(0);
  83  |   });
  84  | 
  85  |   test('UI 要素が相互作用可能', async ({ page }) => {
  86  |     await page.goto('/ダッシュボード v3.html');
  87  | 
  88  |     // インタラクティブ要素を確認
  89  |     const interactive = page.locator('button, [role="button"], a');
  90  |     const count = await interactive.count();
  91  |     expect(count).toBeGreaterThan(0);
  92  |   });
  93  | });
  94  | 
  95  | test.describe('Dashboard - Canvas Rendering', () => {
  96  |   test('Canvas 要素が存在する', async ({ page }) => {
  97  |     await page.goto('/ダッシュボード v3.html');
  98  | 
  99  |     // Canvas を探す
  100 |     const canvas = page.locator('canvas');
  101 |     const count = await canvas.count();
  102 |     expect(count).toBeGreaterThanOrEqual(1);
  103 |   });
  104 | 
  105 |   test('Canvas が描画されている', async ({ page }) => {
  106 |     await page.goto('/ダッシュボード v3.html');
  107 | 
  108 |     const canvas = page.locator('canvas').first();
  109 | 
  110 |     if (await canvas.isVisible()) {
  111 |       // Canvas が表示されていることを確認
  112 |       const box = await canvas.boundingBox();
  113 |       expect(box).not.toBeNull();
  114 |       expect(box?.width).toBeGreaterThan(0);
  115 |       expect(box?.height).toBeGreaterThan(0);
  116 |     }
  117 |   });
  118 | 
  119 |   test('Canvas がコンテンツを持つ', async ({ page }) => {
  120 |     await page.goto('/ダッシュボード v3.html');
  121 | 
  122 |     const canvas = page.locator('canvas').first();
  123 | 
  124 |     if (await canvas.isVisible()) {
  125 |       // Canvas の 2D context を確認
  126 |       const hasContext = await canvas.evaluate((el: any) => {
  127 |         const ctx = el.getContext('2d');
  128 |         return ctx !== null;
  129 |       });
  130 | 
  131 |       // ブラウザ環境では getContext が利用可能
  132 |       expect([true, false]).toContain(hasContext);
  133 |     }
  134 |   });
  135 | });
  136 | 
  137 | test.describe('Dashboard - Responsive Layout', () => {
  138 |   test('デスクトップレイアウトで正常表示', async ({ page }) => {
  139 |     // デスクトップサイズ
  140 |     await page.setViewportSize({ width: 1200, height: 800 });
  141 |     await page.goto('/ダッシュボード v3.html');
  142 | 
  143 |     const main = page.locator('[role="main"]');
  144 |     await expect(main).toBeVisible();
  145 |   });
  146 | 
  147 |   test('タブレットレイアウトで正常表示', async ({ page }) => {
  148 |     // タブレットサイズ
  149 |     await page.setViewportSize({ width: 768, height: 1024 });
  150 |     await page.goto('/ダッシュボード v3.html');
  151 | 
  152 |     const main = page.locator('[role="main"]');
  153 |     await expect(main).toBeVisible();
  154 |   });
  155 | 
  156 |   test('モバイルレイアウトで正常表示', async ({ page }) => {
  157 |     // モバイルサイズ
  158 |     await page.setViewportSize({ width: 375, height: 667 });
  159 |     await page.goto('/ダッシュボード v3.html');
  160 | 
  161 |     const main = page.locator('[role="main"]');
  162 |     await expect(main).toBeVisible();
  163 |   });
```