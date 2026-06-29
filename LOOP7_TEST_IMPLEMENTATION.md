# LOOP 7: Jest テスト完全実装

## 現況
- **テストカバレッジ**: 1.94% （目標: 85%）
- **テスト数**: 16 個 PASS
- **実行時間**: 0.654 秒

## 実装対象ファイル

### Phase 1: ユニットテスト （5-6h）

#### 1. v3-app.tsx テスト（2-3h）
```typescript
describe('App Component', () => {
  test('初期状態が correct', () => {
    // stage = ACTUAL_STAGE (2)
    // masked = false
  });
  
  test('stage 変更が機能する', () => {
    // setStage(3) -> stage = 3
  });
  
  test('masked トグルが機能する', () => {
    // setMasked(true) -> masked = true
  });
  
  test('window.HBV3 が初期化される', () => {
    // window.HBV3.getStage() === 2
  });
});
```

**テストケース数**: 8-10 個

#### 2. v3-components.tsx テスト（1-1.5h）
```typescript
describe('Breakdown Component', () => {
  test('Props の型チェック', () => {
    const props: BreakdownProps = {
      futsu: 1000000,
      others: 500000,
      stage: 2,
      masked: false,
    };
    expect(props.futsu).toBeGreaterThan(0);
  });
});

describe('StagePath Component', () => {
  test('stage 遷移ハンドラが機能', () => {
    const mockSetStage = jest.fn();
    expect(mockSetStage).toBeDefined();
  });
});
```

**テストケース数**: 6-8 個

#### 3. v3-chart.tsx テスト（1-1.5h）
```typescript
describe('AriaChart Component', () => {
  test('Canvas ref が初期化される', () => {
    const canvas = document.createElement('canvas');
    expect(canvas.getContext('2d')).toBeDefined();
  });
});
```

**テストケース数**: 4-6 個

#### 4. v3-tweaks.tsx テスト（0.5-1h）
```typescript
describe('V3TweaksApp', () => {
  test('TweaksState が初期化される', () => {
    expect(V3_DEFAULTS.stage).toBeDefined();
  });
});
```

**テストケース数**: 3-4 個

### Phase 2: インテグレーションテスト （2-3h）

#### 5. 全コンポーネント統合テスト（1-1.5h）
```typescript
describe('Integration Tests', () => {
  test('App → Components → Chart フロー', () => {
    // stage 変更時に chart が更新される
  });
  
  test('グローバル状態と UI 同期', () => {
    // window.HBV3.setStage(3) → UI 更新
  });
});
```

**テストケース数**: 5-6 個

#### 6. エッジケーステスト（1-1.5h）
```typescript
describe('Edge Cases', () => {
  test('stage = 0 （境界値）', () => { });
  test('stage = 4 （上限超過）', () => { });
  test('masked = undefined （null safety）', () => { });
});
```

**テストケース数**: 6-8 個

---

## カバレッジ目標

| ファイル | 現状 | 目標 | 方法 |
|---------|------|------|------|
| v3-app.tsx | 0% | 85% | state 管理テスト |
| v3-components.tsx | 0% | 90% | Props バリデーション |
| v3-chart.tsx | 0% | 75% | Canvas Context テスト |
| v3-tweaks.tsx | 0% | 80% | State 同期テスト |
| v3-constants.ts | 100% | 100% | 維持 |

**全体目標**: 1.94% → 85%

---

## テスト実装の優先順位

1. **v3-constants.ts** （既に 100%）
2. **v3-components.tsx** （再利用性 高い）
3. **v3-tweaks.tsx** （ロジック シンプル）
4. **v3-chart.tsx** （Canvas は複雑）
5. **v3-app.tsx** （全体統合）

---

## 成功基準

✅ テストカバレッジ: 85% 以上
✅ テスト実行時間: < 5 秒
✅ すべてのテスト PASS
✅ エッジケース カバー

---

## 予想所要時間

- Phase 1: 5-6h
- Phase 2: 2-3h
- **合計: 7-9h**
