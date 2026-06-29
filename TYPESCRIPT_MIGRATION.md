# TypeScript 移行ガイド

## 現在の状態（LOOP 4 完了）

### ✅ 完成済み
- [x] tsconfig.json 設定
- [x] v3-constants.ts（6個の型定義）
- [x] v3-icons.tsx（React型対応）
- [x] jest.config.js（ts-jest設定）
- [x] jest.setup.ts（型安全モック）
- [x] webpack.config.js（ts-loader）
- [x] package.json（TypeScript依存更新）
- [x] v3.test.ts（TypeScript テスト）
- [x] .eslintrc.json（TypeScript ESLint）

### ⏳ 進行中
- [ ] v3-app.tsx（テンプレート準備済み）
- [ ] v3-components.tsx
- [ ] v3-chart.tsx
- [ ] v3-tweaks.tsx

## LOOP 5: ファイル移行タスク

### Phase 1: コアファイル移行（優先度: 最高）

#### Task 1: v3-app.tsx 変換
```bash
# テンプレートを元に実装
cp v3-app.tsx.template v3-app.tsx

# 既存v3-app.jsxを参考に実装
# 変更内容:
# - import/export 追加
# - 型注釈追加（State, Props, FC等）
# - useCallback/useState型推論有効化
```

**時間**: 3-4h
**型チェック**: `npm run type-check`

#### Task 2: v3-components.tsx 変換
```typescript
// before (JavaScript)
const Breakdown = ({ futsu, others, stage, masked }) => { ... };

// after (TypeScript)
interface BreakdownProps {
  futsu: number;
  others: number;
  stage: number;
  masked: boolean;
}

const Breakdown: FC<BreakdownProps> = ({ futsu, others, stage, masked }) => { ... };
```

**時間**: 1-2h

#### Task 3: v3-chart.tsx 変換
```typescript
// Canvas コンテキスト型安全化
interface ChartContext {
  clearRect(x: number, y: number, w: number, h: number): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  strokeStyle: string;
  // ...
}

const draw = (ctx: CanvasRenderingContext2D): void => {
  // 型安全な Canvas 操作
};
```

**時間**: 2-3h

#### Task 4: v3-tweaks.tsx 変換
```typescript
interface TweakState {
  value: unknown;
  onChange: (v: unknown) => void;
}
```

**時間**: 1h

### Phase 2: 検証（優先度: 高）

#### Task 5: 型チェック実行
```bash
npm run type-check

# 出力例:
# src/v3-app.tsx:45:20 - error TS2345: Argument of type...
# TS2339: Property 'xxx' does not exist on type...
```

**時間**: 1-2h（エラー修正含む）

#### Task 6: ESLint チェック
```bash
npm run lint

# 設定ルール:
# - no-floating-promises
# - explicit-function-return-types
# - no-misused-promises
```

**時間**: 1h

#### Task 7: Jest テスト実行
```bash
npm test

# カバレッジ目標: 85%
# 型安全性: 100%
```

**時間**: 2-3h

### Phase 3: ビルド検証（優先度: 中）

#### Task 8: 本番ビルド
```bash
npm run build:prod

# 出力:
# - dist/app.[hash].js
# - dist/app.[hash].js.map
```

**時間**: 1h

#### Task 9: Lighthouse 計測
```bash
npx lighthouse http://localhost:8080 --view

# 目標スコア: 95+
```

**時間**: 1-2h

## ファイル移行チェックリスト

### ファイル変換
- [ ] v3-app.tsx（3-4h）
- [ ] v3-components.tsx（1-2h）
- [ ] v3-chart.tsx（2-3h）
- [ ] v3-tweaks.tsx（1h）
- [ ] HTML スクリプトタグ更新

### 型チェック
- [ ] `npm run type-check` 実行
- [ ] エラー修正（1-2h）
- [ ] 全ファイル TS2000 以上なし

### Linting
- [ ] `npm run lint` 実行
- [ ] ESLint エラー修正
- [ ] コード スタイル統一

### テスト
- [ ] `npm test` 実行
- [ ] カバレッジ 85% 達成
- [ ] 全テスト PASS

### ビルド
- [ ] `npm run build:prod` 実行
- [ ] dist/ ファイル生成確認
- [ ] バンドルサイズ 15KB未満

### Lighthouse
- [ ] スコア 95+ 達成
- [ ] Core Web Vitals 合格

## 型定義リファレンス

### Stage インターフェース
```typescript
interface Stage {
  name: string;                    // "みまもり" | "そだてる" | "ひろげる"
  tone: string;                    // ステージのトーン
  ai: string;                      // AI アドバイス
  crit: {
    title: string | null;
    items: Array<{
      t: string;                   // 項目名
      ok: boolean;                 // 完了状態
      v: number;                   // 進捗値
      max: number;                 // 最大値
      vl: string;                  // 表示値（"8 / 10回" 等）
    }>;
  };
  seg: [number, number];           // セグメント [進捗1, 進捗2]
  sec: Array<[string, string]>;    // セキュリティ項目
  limit: { used: number; cap: number; note: string } | null;
}
```

### Bank インターフェース
```typescript
interface Bank {
  id: string;                      // "aoba" | "cosmo" | "hidamari"
  name: string;                    // 銀行名
  kind: string;                    // 口座種別
  amt: number;                     // 残高（円）
  color: string;                   // UI 色（#hex）
  initial: string;                 // 初文字
  on: boolean;                     // 選択状態
  swept?: boolean;                 // スイープ対象フラグ
}
```

## トラブルシューティング

### 型エラー: "Property 'xxx' does not exist"
**原因**: 型定義が不足している
**解決**: 
```typescript
// v3-constants.ts で型定義を追加
export interface MyType {
  xxx: string;
}
```

### エラー: "Cannot find module"
**原因**: import パス間違い
**解決**: 
```typescript
// 正: パスはファイル拡張子を含まない
import { V3_STAGES } from './v3-constants';

// 誤: .ts 拡張子を含む
import { V3_STAGES } from './v3-constants.ts';
```

### Webpack エラー: "Module parse failed"
**原因**: ts-loader が tsx を処理できない
**解決**: webpack.config.js を確認
```javascript
{
  test: /\.(ts|tsx)$/,  // tsx を含める
  use: 'ts-loader'
}
```

## 次ステップ（LOOP 6+）

1. **本番環境デプロイ**（LOOP 6）
   - CDN 最適化
   - service-worker 統合
   - キャッシュ戦略

2. **機能拡張**（LOOP 7+）
   - ダーク モード完全実装
   - i18n 多言語化
   - コンポーネント ライブラリ化

3. **パフォーマンス最適化**
   - Code splitting
   - Lazy loading
   - Image optimization
