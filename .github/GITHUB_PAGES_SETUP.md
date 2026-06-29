# GitHub Pages 初期設定ガイド

本ドキュメントは GitHub Pages のセットアップ手順を説明します。

## 概要

Aria Banking Dashboard v3 は GitHub Pages で本番環境をホストしています。
`dist/` フォルダの内容が自動的に本番環境にデプロイされます。

## 初期設定手順

### Step 1: Repository Settings > Pages を開く

1. ブラウザで以下の URL にアクセス:
   ```
   https://github.com/ygwhrsh/harness-3rd/settings/pages
   ```

2. GitHub にログインしていることを確認

### Step 2: Build and deployment セクションで Source を設定

1. **"Build and deployment"** セクションを探す

2. **"Source"** ドロップダウンで以下を選択:
   ```
   GitHub Actions
   ```

3. **Save** をクリック

### Step 3: デプロイメント完了を待機

- GitHub Pages の初期化には **5分程度** 要します
- 画面上部に緑色の通知 "✓ GitHub Pages is live" が表示されるまで待機

### Step 4: 本番 URL でアクセス確認

- 初期化完了後, 以下の URL で本番環境にアクセス:
  ```
  https://ygwhrsh.github.io/harness-3rd/dist/
  ```

- HTTP 200 OK が返ることを確認

## 自動デプロイメント

GitHub Pages の初期設定完了後:

1. **main ブランチに push** すると自動的にワークフローが実行
2. **TypeScript & ESLint Check** → **Test Pipeline** → **Deploy to Production** の順で実行
3. `dist/` フォルダの内容が自動的に本番環境にデプロイ

## Lighthouse 本番計測

GitHub Pages 稼働後, 本番環境のパフォーマンスを計測できます:

```bash
npx lighthouse https://ygwhrsh.github.io/harness-3rd/dist/ --view
```

期待スコア:
- **Performance**: 85+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 100

## トラブルシューティング

### "404 Not Found" が表示される

**原因**: GitHub Pages がまだ初期化されていない

**対応**:
1. Settings > Pages を再度確認
2. Source が "GitHub Actions" に設定されているか確認
3. 緑色の通知が表示されるまで待機 (通常 5分)

### デプロイメントが失敗する

**確認事項**:
1. Actions タブで最新のワークフロー実行を確認
2. エラーメッセージを確認
3. `npm ci` が成功しているか確認

## さらに詳しく

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [ワークフロー定義](.github/workflows/)
