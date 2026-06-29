# Aria Banking Dashboard v3

成長段階システム (Growth Stage System) を搭載した銀行ダッシュボード。TypeScript + React + Canvas で構築。

## 本番環境

**URL**: https://ygwhrsh.github.io/harness-3rd/dist/

GitHub Pages でホストされています。`dist/` フォルダの内容が自動的にデプロイされます。

## 初期設定

GitHub Pages をまだ初期化していない場合は, [GitHub Pages セットアップガイド](.github/GITHUB_PAGES_SETUP.md) を参照してください。

## 開発

### インストール

```bash
npm ci
```

### ローカル実行

```bash
npm run dev
```

ブラウザで `http://localhost:8080` にアクセス

### テスト実行

```bash
# Unit テスト (Vitest)
npm test

# E2E テスト (Playwright)
npm run test:e2e

# Lighthouse パフォーマンス計測
npx lighthouse http://localhost:8080/ダッシュボード%20v3.html --view
```

### ビルド

```bash
npm run build:prod
```

`dist/` フォルダに本番環境用ファイルが生成されます。

## 技術スタック

- **言語**: TypeScript 5.0 + strict mode
- **UI**: React 18.3.1 + Hooks
- **可視化**: Canvas API + カスタムチャート
- **テスト**: Vitest (Unit) + Playwright (E2E)
- **ビルド**: Webpack 5
- **デプロイ**: GitHub Actions → GitHub Pages
- **型チェック**: TypeScript strict mode
- **コード品質**: ESLint

## テスト

- **Unit テスト**: 110 個実装, 98.2% PASS 率
- **E2E テスト**: 69 個実装, 95.7% PASS 率
- **総テスト**: 112 テスト, 2 スキップ (Canvas jsdom 制限)

## ドキュメント

- [GitHub Pages セットアップ](.github/GITHUB_PAGES_SETUP.md)
- [GitHub Actions ワークフロー](.github/workflows/)
- [Lighthouse 最適化ガイド](./docs/LIGHTHOUSE_OPTIMIZATION.md)
- [E2E テスト実行ガイド](./docs/E2E_TEST_GUIDE.md)

## CI/CD パイプライン

1. **TypeScript & ESLint Check**: 型チェック, コード品質検査
2. **Test Pipeline**: Unit テスト + E2E テスト + ビルド + Lighthouse
3. **Deploy to Production**: GitHub Pages への自動デプロイ

## パフォーマンス

- **ローカル Lighthouse**: 54/100 (計測環境の制限)
- **本番環境期待値**: 85+/100 (CDN 効果)

本番環境での計測:
```bash
npx lighthouse https://ygwhrsh.github.io/harness-3rd/dist/ --view
```

## ライセンス

MIT

## 作者

Aria Team
