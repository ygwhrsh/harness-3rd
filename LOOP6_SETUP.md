# LOOP 6: 本番環境セットアップガイド

## Phase 1: npm パッケージインストール（5-10 分）

### Step 1: 依存パッケージ確認
```bash
cat package.json | grep -A 20 "devDependencies"
```

### Step 2: インストール実行
```bash
npm install
# または
npm install --legacy-peer-deps  # peer dependency エラーの場合
```

**インストール対象**:
- typescript (^5.0.0)
- ts-jest (^29.0.0)
- ts-loader (^9.5.0)
- @typescript-eslint/eslint-plugin (^6.0.0)
- @typescript-eslint/parser (^6.0.0)
- jest (^29.0.0)
- webpack (^5.75.0)
- webpack-cli (^5.0.0)
- 他（lint-staged, husky, prettier）

---

## Phase 2: TypeScript 型チェック（5-10 分）

### Step 1: 型チェック実行
```bash
npm run type-check

# 出力例:
# v3-app.tsx:45:20 - error TS2304: Cannot find name 'xxx'
```

### Step 2: エラー修正
エラーが出た場合、以下の対応：

**ケース 1: 型定義不足**
```typescript
// 前:
const data = response.data;

// 後:
const data: MyType = response.data;
```

**ケース 2: インターフェース不足**
```typescript
// v3-constants.ts に追加:
export interface MyNewType {
  prop1: string;
  prop2: number;
}
```

**ケース 3: グローバル型不足**
```typescript
// v3-app.tsx に追加:
declare global {
  var MyGlobal: MyType;
}
```

**予想エラー数**: 0-5 個
**修正時間**: 0-1h

---

## Phase 3: ESLint チェック（5-10 分）

### Step 1: Lint 実行
```bash
npm run lint

# 出力例:
# v3-app.tsx:50:10 - error: Unexpected any. Specify a different type
# v3-components.tsx:20:5 - warning: @typescript-eslint/no-unused-vars
```

### Step 2: 自動修正
```bash
npm run lint:fix

# 修正内容:
# - インデント調整
# - セミコロン追加
# - 型注釈補完（一部）
```

### Step 3: 手動修正
自動修正で解決できないエラー対応

**よくあるエラー**:
- no-floating-promises: async/await の未対応
- no-misused-promises: Promise 型チェック不足
- explicit-function-return-types: 戻り値型不足

**予想エラー数**: 0-5 個
**修正時間**: 0-1h

---

## Phase 4: Jest テスト準備（10-20 分）

### Step 1: テスト実行
```bash
npm test

# 出力例:
# PASS  v3.test.ts
# ✓ V3_STAGES が 3 段階を定義 (XX ms)
# ...
# Tests:       8 passed, 8 total
```

### Step 2: カバレッジ計測
```bash
npm run test:coverage

# 出力:
# File               | % Stmts | % Branch | % Funcs | % Lines
# All files          |   45.2  |   40.1   |   50.3  |   45.5
```

**期待値**: 
- 初期: 45-50%（現存テストのみ）
- 目標: 85%（LOOP 6 後半）

---

## Phase 5: 本番ビルド検証（5-10 分）

### Step 1: 本番ビルド実行
```bash
npm run build:prod

# 出力例:
# dist/app.a1b2c3d4.js    12.5 KiB
# dist/app.a1b2c3d4.js.map 28.3 KiB
```

### Step 2: ビルド成果物確認
```bash
ls -lh dist/

# 期待ファイル:
# - app.[hash].js （< 20KB）
# - app.[hash].js.map （< 50KB）
```

### Step 3: サイズ確認
```bash
du -sh dist/

# 期待値: 18KB 以下（gzip圧縮後）
```

---

## Phase 6: Lighthouse 計測（10-15 分）

### Step 1: ローカルサーバー起動
```bash
npm run dev

# http://localhost:8080 でアクセス可能
```

### Step 2: Lighthouse 実行
```bash
npx lighthouse http://localhost:8080 --view

# 生成されるレポート:
# - Performance: 目標 95+
# - Accessibility: 目標 95+
# - Best Practices: 目標 90+
# - SEO: 目標 90+
```

### Step 3: Core Web Vitals チェック
```
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅
```

---

## チェックリスト

### 環境セットアップ
- [ ] npm install 実行完了
- [ ] package.json に全ツール記載確認

### 型チェック
- [ ] npm run type-check 実行
- [ ] エラー 0 個達成
- [ ] 型エラー修正完了

### Lint
- [ ] npm run lint 実行
- [ ] npm run lint:fix 実行
- [ ] 警告 < 5 個

### テスト
- [ ] npm test 実行
- [ ] すべてのテスト PASS
- [ ] カバレッジ計測完了

### ビルド
- [ ] npm run build:prod 実行
- [ ] dist/ ファイル生成確認
- [ ] バンドルサイズ < 20KB

### Lighthouse
- [ ] パフォーマンス 95+
- [ ] Accessibility 95+
- [ ] Core Web Vitals 合格

---

## トラブルシューティング

### npm install エラー
```bash
# peer dependency エラー時:
npm install --legacy-peer-deps

# node_modules 再構築:
rm -rf node_modules package-lock.json
npm install
```

### 型チェック失敗
```bash
# キャッシュクリア:
npm run type-check -- --noEmit --noCache

# tsconfig.json 再確認:
cat tsconfig.json | grep -E "strict|noImplicitAny|strictNullChecks"
```

### ビルド失敗
```bash
# webpack エラー確認:
npm run build:prod -- --display verbose

# ts-loader 確認:
npm list ts-loader
```

---

## 予想所要時間

| Phase | 時間 | 項目 |
|-------|------|------|
| 1. インストール | 5-10 分 | npm install |
| 2. 型チェック | 5-10 分 | npm run type-check |
| 3. Lint | 5-10 分 | npm run lint + 修正 |
| 4. テスト | 10-20 分 | npm test |
| 5. ビルド | 5-10 分 | npm run build:prod |
| 6. Lighthouse | 10-15 分 | 計測 + 確認 |
| **合計** | **40-75 分** | **全フェーズ完了** |

---

## 成功基準

✅ すべてのチェックリスト完了
✅ 型エラー 0 個
✅ ESLint 警告 < 5 個
✅ テスト PASS
✅ ビルド成功
✅ Lighthouse 95+

これらすべてが達成されたら LOOP 6 完成！
