# LOOP 8: Playwright E2E テスト実行ガイド

## 概要

Playwright E2E テストを実際に実行し、ブラウザレベルの統合テストを検証します。

---

## ローカル実行方法

### 方法 1: npm scripts（推奨）

```bash
# ターミナル A: Dev server 起動
npm run dev

# ターミナル B: E2E テスト実行
npm run test:e2e
```

**実行内容**:
- Chromium, Firefox, WebKit で各テストを実行
- HTML レポート生成
- スクリーンショット保存（失敗時）

### 方法 2: UI モード（開発時推奨）

```bash
npm run test:e2e:ui
```

**機能**:
- インタラクティブなテスト実行
- Step-by-step デバッグ
- Video 録画

### 方法 3: デバッグモード

```bash
npm run test:e2e:debug
```

**機能**:
- Playwright Inspector 起動
- Step 実行可能
- Console アクセス

---

## テストスイート詳細

### 1. Initial Load（5テスト）
```
✓ ダッシュボードが読み込まれる
✓ メインコンテンツが表示される
✓ ヘッダーが表示される
✓ ページが正常にレンダリングされている
✓ JavaScript エラーが発生していない
```

**確認項目**: ページロード、HTML 構造、エラー状況

### 2. Stage Navigation（4テスト）
```
✓ ステージボタンが存在する
✓ ページ操作が可能
✓ スクロールが機能する
✓ UI 要素が相互作用可能
```

**確認項目**: ボタン操作、ナビゲーション、インタラクション

### 3. Canvas Rendering（4テスト）
```
✓ Canvas 要素が存在する
✓ Canvas が描画されている
✓ Canvas がコンテンツを持つ
✓ Canvas が表示されている
```

**確認項目**: Canvas 存在、サイズ、コンテンツ

### 4. Responsive Layout（5テスト）
```
✓ デスクトップレイアウトで正常表示
✓ タブレットレイアウトで正常表示
✓ モバイルレイアウトで正常表示
✓ リサイズ時にレイアウトが調整される
```

**確認項目**: 各ブレークポイント、レイアウト変更

### 5. Accessibility（4テスト）
```
✓ キーボードナビゲーションが可能
✓ ARIA ロール定義
✓ コントラストが十分
✓ lang 属性が設定されている
```

**確認項目**: a11y 要件、キーボード操作

### 6. Performance（3テスト）
```
✓ ページロード時間が高速
✓ JavaScript が非同期に読み込まれている
✓ メモリリークなし
```

**確認項目**: パフォーマンス、メモリ使用量

---

## CI 環境での実行

### GitHub Actions

CI パイプラインで自動実行されます：

```bash
# .github/workflows/test-pipeline.yml
- name: Run E2E tests
  run: npm run test:e2e
```

**実行環境**: Ubuntu Latest
**ブラウザ**: Chromium（Firefox, WebKit はローカルのみ）
**レポート**: Artifacts に upload

### 実行結果確認

1. GitHub Actions → test-pipeline → e2e-tests job
2. Artifacts → playwright-report をダウンロード
3. index.html をブラウザで開く

---

## トラブルシューティング

### Issue 1: "Browser is not installed"

```bash
# ブラウザをインストール
npx playwright install
```

### Issue 2: "Port 8080 already in use"

```bash
# プロセスを確認
lsof -i :8080

# プロセス kill
kill -9 <PID>
```

### Issue 3: "Timeout waiting for element"

- page.goto の待機時間を増加
- waitForLoadState('networkidle') を追加
- 要素 selector を確認

### Issue 4: "Canvas context is null"

- Canvas は jsdom で完全対応されていない
- E2E テストでは getContext 検証のみ
- 実際の Canvas 動作は手動確認

---

## テスト実行時間目安

| 環境 | 時間 |
|------|------|
| ローカル（Chromium のみ） | 30-60秒 |
| ローカル（3ブラウザ） | 90-120秒 |
| CI（Chromium） | 2-3分 |

---

## レポート確認

### HTML レポート

```bash
# 自動生成位置
playwright-report/index.html
```

**含まれる情報**:
- テスト結果サマリー
- 各テストの詳細
- スクリーンショット
- Video（失敗時）
- Trace（デバッグ情報）

### Trace ファイル

```bash
# Trace を開く
npx playwright show-trace trace.zip
```

---

## 成功基準

✅ すべてのテスト PASS
✅ エラーなし（コンソール警告 < 3）
✅ レスポンシブ対応確認
✅ a11y チェック完了
✅ パフォーマンス計測完了

---

## LOOP 9 への準備

E2E テスト実行が確認されたら、次は：

1. Lighthouse スコア 95+ 達成
2. v3-app.tsx, v3-chart.tsx カバレッジ向上
3. 本番環境デプロイ準備

---
