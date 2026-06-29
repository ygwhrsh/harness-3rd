import { FC } from 'react';
interface BreakdownProps {
    futsu: number;
    others: number;
    stage: number;
    masked: boolean;
}
export declare const Breakdown: FC<BreakdownProps>;
interface StagePathProps {
    stage: number;
    setStage: (n: number) => void;
    actual: number;
    seg: [number, number];
}
export declare const StagePath: FC<StagePathProps>;
export {};
//# sourceMappingURL=v3-components.d.ts.map