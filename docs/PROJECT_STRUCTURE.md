# プロジェクト構造ガイド

Aria Banking Dashboard v3 のディレクトリ構造と各フォルダの役割を説明します。

## ディレクトリツリー

```
harness-3rd/
├── src/                           # ソースコード & テスト
│   ├── v3-app.tsx                 # メインアプリケーションコンポーネント
│   ├── v3-app.test.tsx            # App コンポーネントテスト
│   ├── v3-chart.tsx               # Canvas チャートコンポーネント
│   ├── v3-chart.test.tsx          # チャートテスト
│   ├── v3-components.tsx          # UI コンポーネント (Breakdown, StagePath)
│   ├── v3-components.test.tsx     # UI コンポーネントテスト
│   ├── v3-constants.ts            # 定数定義 (V3_STAGES, V3_BANKS等)
│   ├── v3-icons.tsx               # SVG アイコン定義
│   ├── v3-tweaks.tsx              # デモ・設定パネル
│   ├── v3-tweaks.test.tsx         # 設定パネルテスト
│   ├── v3.test.ts                 # 統合テスト (110テスト以上)
│   └── v3.css                     # スタイルシート
│
├── docs/                          # ドキュメント
│   ├── PROJECT_STRUCTURE.md       # このファイル
│   ├── LIGHTHOUSE_OPTIMIZATION.md # パフォーマンス最適化
│   ├── LIGHTHOUSE_RESULTS.md      # Lighthouse 計測結果
│   ├── TYPESCRIPT_MIGRATION.md    # TypeScript マイグレーションガイド
│   ├── LOOP*.md                   # 実装ログ (LOOP 4-10)
│   └── (その他のドキュメント)
│
├── .github/                       # GitHub 設定
│   └── workflows/
│       ├── typescript-check.yml   # TypeScript & ESLint チェック
│       ├── test-pipeline.yml      # テスト実行パイプライン
│       └── deploy.yml             # GitHub Pages デプロイメント
│
├── tests/                         # E2E テスト (Playwright)
│   └── dashboard.spec.ts          # ダッシュボードの E2E テスト
│
├── node_modules/                 # npm パッケージ (git 除外)
├── dist/                          # ビルド成果物 (webpack 出力)
├── coverage/                      # テストカバレッジレポート (git 除外)
│
├── package.json                   # npm 設定・依存関係
├── package-lock.json              # npm ロックファイル
├── vitest.config.ts               # Vitest 設定
├── vitest.setup.ts                # Vitest セットアップ
├── playwright.config.ts           # Playwright E2E 設定
├── webpack.config.js              # Webpack ビルド設定
├── tsconfig.json                  # TypeScript 設定
├── tsconfig.build.json            # ビルド専用 TypeScript 設定
├── README.md                       # プロジェクト説明
└── ダッシュボード v3.html          # HTML エントリーポイント
```

## 各フォルダの役割

### `src/` - ソースコード & テスト

**ソースコード**
- `v3-*.tsx`: React コンポーネント (Vitest で検証済み)
- `v3-constants.ts`: グローバル定数・定義
- `v3.css`: 統一スタイルシート

**テストファイル**
- `v3-*.test.tsx`: ユニットテスト (各コンポーネント別)
- `v3.test.ts`: 統合テスト (110+ テストケース)

### `docs/` - ドキュメント

実装ガイド、パフォーマンス計測、マイグレーションログを保存。

- **LIGHTHOUSE_OPTIMIZATION.md**: パフォーマンス最適化手法
- **TYPESCRIPT_MIGRATION.md**: JavaScript → TypeScript マイグレーションガイド
- **LOOP*.md**: 実装ループの進捗・学習記録

### `.github/workflows/` - CI/CD パイプライン

**三つのワークフロー**
1. **typescript-check.yml**: TypeScript & ESLint 自動チェック
2. **test-pipeline.yml**: Unit + E2E テスト実行, Lighthouse 計測
3. **deploy.yml**: GitHub Pages への自動デプロイメント

### `tests/` - E2E テスト

**Playwright E2E テスト**
- `dashboard.spec.ts`: 69個のダッシュボード E2E テスト
- ブラウザ実環境でのテスト (Chrome, Firefox, WebKit)

## ファイル追加時のガイドライン

### 新規コンポーネントを追加する場合

```
src/
├── v3-new-component.tsx           # コンポーネント実装
├── v3-new-component.test.tsx      # ユニットテスト
```

**手順:**
1. `src/` に `v3-新規名.tsx` を作成
2. テストファイル `v3-新規名.test.tsx` を並行作成
3. `v3-constants.ts` に必要な定数を追加
4. `v3-app.tsx` にインポート＆ 使用

### 新規ドキュメントを追加する場合

```
docs/
├── 新規トピック.md
```

**手順:**
1. `docs/` に `トピック.md` を作成
2. `docs/PROJECT_STRUCTURE.md` の目次に追加
3. README.md にリンクを追加

### E2E テストを追加する場合

```
tests/
├── dashboard.spec.ts              # 既存ファイルに追加
```

**手順:**
1. `tests/dashboard.spec.ts` に新規テストを追加
2. `npm run test:e2e` で実行確認
3. 成功したら git に commit

## ビルド & デプロイフロー

```
ソースコード変更
    ↓
git push origin main
    ↓
GitHub Actions トリガー
    ├─ TypeScript & ESLint チェック
    ├─ Unit テスト実行 (Vitest)
    ├─ E2E テスト実行 (Playwright)
    ├─ ビルド実行 (webpack)
    ├─ Lighthouse 計測
    └─ GitHub Pages デプロイ (dist/)
    ↓
本番環境 (GitHub Pages) で稼働
```

## ファイルサイズ統計

| パス | ファイル数 | サイズ | 説明 |
|------|-----------|--------|------|
| src/ | 15 | 85KB | ソース & テスト |
| docs/ | 12 | 50KB | ドキュメント |
| tests/ | 1 | 25KB | E2E テスト |
| .github/workflows/ | 3 | 10KB | CI/CD |
| **合計** | **31** | **170KB** | コード + 設定 |

（node_modules/, dist/, coverage/ は除く）

## パフォーマンス

- **ビルド時間**: ~650ms (webpack)
- **テスト実行**: ~1.5s (Vitest 110テスト)
- **E2E テスト**: ~15s (Playwright 69テスト)
- **Lighthouse (ローカル)**: 54/100 (Python HTTP Server)
- **Lighthouse (本番)**: 期待値 85+/100 (GitHub Pages CDN)

## 便利なコマンド

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm test                 # Unit テスト
npm run test:e2e        # E2E テスト
npm run test:coverage   # カバレッジレポート

# ビルド
npm run build:prod      # プロダクションビルド

# コード品質
npm run type-check      # TypeScript 型チェック
npm run lint            # ESLint チェック
```

## 参考リンク

- [README.md](../README.md) - プロジェクト概要
- [GitHub Actions](../.github/workflows/) - CI/CD 設定
- [TypeScript マイグレーション](./TYPESCRIPT_MIGRATION.md)
- [Lighthouse 最適化](./LIGHTHOUSE_OPTIMIZATION.md)
