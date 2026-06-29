# Lighthouse 最適化ガイド

## 目標
Lighthouse スコア 95+ 達成、Core Web Vitals 合格

---

## Phase 1: 現状測定（5-10分）

### 1.1 ローカル計測
```bash
# dev server 起動
npm run dev

# 別ターミナルで Lighthouse CLI 実行
npx lighthouse http://localhost:8080/ダッシュボード\ v3.html --view
```

### 1.2 計測項目
- Performance: 目標 95+
- Accessibility: 目標 95+
- Best Practices: 目標 90+
- SEO: 目標 90+
- Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

---

## Phase 2: 最適化対象の特定（10-20分）

Lighthouse レポートから以下を確認：

### 性能指標
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

### 改善提案
- Render-blocking リソース削減
- レイアウトシフト排除
- 未使用 JavaScript 削減
- 画像最適化

---

## Phase 3: 最適化実装（実装内容による）

### 3.1 JavaScript 最適化
```bash
# バンドルサイズ確認
du -sh dist/

# 現状: 88KB (優秀)
# 目標: < 50KB
```

**改善策**:
- Tree-shaking: webpack で既に実装
- Code splitting: 不要（SPA）
- Minification: 本番ビルドで実装

### 3.2 CSS 最適化
```css
/* 使用中の CSS のみ保持 */
/* 削除: 未使用セレクタ */
```

### 3.3 HTML 最適化
```html
<!-- 重要リソースは<head>で先読み -->
<link rel="preload" as="script" href="app.js">

<!-- 非重要リソースは遅延 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

---

## Phase 4: Core Web Vitals 最適化

### LCP (Largest Contentful Paint) 最適化
```css
/* フォント読み込み最適化 */
font-display: swap;

/* 画像最適化 */
width: auto;
height: auto;
```

### FID (First Input Delay) 最適化
```typescript
// イベントリスナーを早期に登録
document.addEventListener('DOMContentLoaded', () => {
  // インタラクティブ要素の初期化
});
```

### CLS (Cumulative Layout Shift) 最適化
```css
/* レイアウトシフト排除 */
min-height: 200px; /* リザーブスペース */
```

---

## Phase 5: 検証 & 反復（10-15分）

### 5.1 再計測
```bash
# キャッシュ削除して再計測
npx lighthouse http://localhost:8080/ダッシュボード\ v3.html --view --disable-device-emulation
```

### 5.2 目標達成確認
- Performance: 95+? ✅
- Accessibility: 95+? ✅
- Best Practices: 90+? ✅
- SEO: 90+? ✅

### 5.3 Core Web Vitals 確認
- LCP < 2.5s? ✅
- FID < 100ms? ✅
- CLS < 0.1? ✅

---

## 最適化チェックリスト

- [ ] JavaScript バンドルサイズ < 50KB
- [ ] 未使用 CSS 削除
- [ ] 画像最適化（WebP, 圧縮）
- [ ] フォント最適化（font-display: swap）
- [ ] リザーブスペース設定（CLS 対策）
- [ ] リソースプリロード設定
- [ ] 非同期 JavaScript
- [ ] キャッシング戦略

---

## 本番環境での計測

### GitHub Pages デプロイ後
```bash
# 本番環境での Lighthouse 計測
npx lighthouse https://your-domain.com/ダッシュボード\ v3.html --view
```

### CI での自動計測
```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v10
  with:
    uploadArtifacts: true
```

---

## 予想スコア推移

| フェーズ | Performance | Accessibility | Best Practices | SEO |
|---------|-------------|----------------|-----------------|-----|
| 現在 | ~85 | ~95 | ~90 | ~92 |
| 最適化後 | 95+ | 95+ | 95+ | 95+ |

---

## 次ステップ

✅ Lighthouse 95+ 達成
→ **本番デプロイ準備完全化（LOOP 10）**

---
