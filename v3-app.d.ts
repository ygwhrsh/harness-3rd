import { FC } from 'react';
interface AppError {
    msg: string;
    url?: string;
    line?: number;
    col?: number;
    error?: string;
}
declare global {
    var appErrors: AppError[];
    var HBV3: {
        getStage: () => number;
        setStage: (n: number) => void;
    };
    var AriaBankingDesignSystem_341da1: any;
}
declare const App: FC;
export default App;
//# sourceMappingURL=v3-app.d.ts.map