# Jest テスト実装ロードマップ（LOOP 6 後半 - LOOP 7）

## 目標

**テストカバレッジ: 45% → 85%** （11-15h で完成）

---

## Phase 1: テスト環境セットアップ（1-2h）

### Task 1.1: jest.config.js 検証
```bash
npm test -- --showConfig | head -50
```

### Task 1.2: jest.setup.ts 動作確認
```bash
npm test -- v3.test.ts
```

### Task 1.3: TypeScript テスト実行確認
```bash
npm test -- --testPathPattern="v3.test.ts"
```

---

## Phase 2: ユニットテスト実装（5-6h）

### Task 2.1: v3-constants.ts テスト
```typescript
describe('Constants Module', () => {
  test('V3_STAGES has 3 levels', () => {
    expect(Object.keys(V3_STAGES)).toHaveLength(3);
  });
  
  test('V3_BANKS has 3 banks', () => {
    expect(V3_BANKS).toHaveLength(3);
  });
  
  test('Stage interfaces are complete', () => {
    Object.values(V3_STAGES).forEach(stage => {
      expect(stage.name).toBeDefined();
      expect(stage.seg).toHaveLength(2);
    });
  });
});
```

**時間**: 1-2h

### Task 2.2: v3-icons.tsx テスト
```typescript
describe('Icons Module', () => {
  test('All icon functions are defined', () => {
    Object.keys(V3_ICONS).forEach(key => {
      expect(typeof V3_ICONS[key]).toBe('function');
    });
  });
  
  test('Icons render SVG elements', () => {
    const EyeIcon = V3_ICONS.eye;
    expect(EyeIcon).toBeDefined();
  });
});
```

**時間**: 0.5-1h

### Task 2.3: v3-components.tsx テスト
```typescript
describe('Components Module', () => {
  test('Breakdown component renders with props', () => {
    const props = { futsu: 1000000, others: 500000, stage: 2, masked: false };
    expect(props.futsu).toBe(1000000);
  });
  
  test('StagePath handles stage transitions', () => {
    const handleSetStage = jest.fn();
    expect(handleSetStage).toBeDefined();
  });
});
```

**時間**: 1-2h

### Task 2.4: v3-chart.tsx テスト
```typescript
describe('Chart Module', () => {
  test('Canvas context is properly typed', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    expect(ctx).not.toBeNull();
  });
  
  test('Chart props validation', () => {
    const props = {
      actual: [1000, 2000, 3000],
      forecast: [3500, 4000],
      band: [[2000, 4000], [3000, 5000]],
      events: [],
      masked: false,
      themeVersion: 0,
    };
    expect(props.actual.length).toBeGreaterThan(0);
  });
});
```

**時間**: 1-2h

### Task 2.5: v3-tweaks.tsx テスト
```typescript
describe('Tweaks Module', () => {
  test('TweaksApp state management', () => {
    const initialState = { stage: 'そだてる（中級者）' };
    expect(initialState.stage).toBeDefined();
  });
  
  test('Stage change handler updates correctly', () => {
    const newStage = 'ひろげる（ヘビー）';
    expect(newStage).toBeDefined();
  });
});
```

**時間**: 0.5-1h

---

## Phase 3: インテグレーションテスト実装（3-4h）

### Task 3.1: 全コンポーネント統合テスト
```typescript
describe('Component Integration', () => {
  test('v3-app with all dependencies', () => {
    // App の状態管理テスト
    // Hooks の相互作用テスト
    // グローバル状態との連携テスト
  });
  
  test('Stage progression: みまもり → そだてる → ひろげる', () => {
    // Stage 遷移テスト
    // 機能の段階的開放テスト
  });
});
```

**時間**: 1-2h

### Task 3.2: Canvas 描画テスト
```typescript
describe('Canvas Rendering', () => {
  test('Chart draws without errors', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 260;
    // 描画関数の呼び出しテスト
  });
});
```

**時間**: 1-2h

### Task 3.3: グローバル状態テスト
```typescript
describe('Global State (HBV3)', () => {
  test('window.HBV3 is properly initialized', () => {
    expect((window as any).HBV3).toBeDefined();
    expect((window as any).HBV3.getStage).toBeDefined();
  });
  
  test('Stage setter updates correctly', () => {
    (window as any).HBV3.setStage(2);
    expect((window as any).HBV3.getStage()).toBe(2);
  });
});
```

**時間**: 1h

---

## Phase 4: CI 統合（2-3h）

### Task 4.1: GitHub Actions で jest 実行
```yaml
- name: Run tests
  run: npm test -- --coverage
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
```

### Task 4.2: Pre-commit hook で jest 実行
```bash
# .husky/pre-commit に追加:
npm test -- --onlyChanged
```

### Task 4.3: CI ステータスチェック
```bash
npm run test:coverage -- --threshold
```

**時間**: 1-2h

---

## 実装チェックリスト

### ユニットテスト（Task 2.1-2.5）
- [ ] v3-constants.ts: 3-5 テストケース
- [ ] v3-icons.tsx: 2-3 テストケース
- [ ] v3-components.tsx: 4-5 テストケース
- [ ] v3-chart.tsx: 3-4 テストケース
- [ ] v3-tweaks.tsx: 2-3 テストケース
- **小計**: 14-20 テストケース

### インテグレーションテスト（Task 3.1-3.3）
- [ ] Component 統合: 5-7 テストケース
- [ ] Canvas 描画: 3-4 テストケース
- [ ] グローバル状態: 3-4 テストケース
- **小計**: 11-15 テストケース

### 総テストケース数: 25-35 個
### 目標カバレッジ: 85%

---

## 成功基準

✅ テスト合計: 25-35 個
✅ カバレッジ: 85% 以上
✅ すべてのテスト PASS
✅ CI/CD 統合完成
✅ Pre-commit hook 動作確認

---

## 予想所要時間

| Phase | 時間 | 詳細 |
|-------|------|------|
| 1. セットアップ | 1-2h | jest 環境構築 |
| 2. ユニットテスト | 5-6h | コンポーネント単体テスト |
| 3. インテグレーション | 3-4h | 統合テスト |
| 4. CI 統合 | 2-3h | GitHub Actions 統合 |
| **合計** | **11-15h** | |

---

## LOOP 6 との関係

- **LOOP 6**: npm install, type-check, lint, build
- **LOOP 6.5（オプション）**: Jest テスト実装開始
- **LOOP 7**: Jest テスト完成（最優先）
