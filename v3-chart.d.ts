import { FC } from 'react';
import { Event } from './v3-constants';
interface AriaChartProps {
    actual: number[];
    forecast: number[];
    band: Array<[number, number]>;
    sub?: number[] | null;
    events: Event[];
    masked: boolean;
    themeVersion: number;
    height?: number;
}
export declare const AriaChart: FC<AriaChartProps>;
export {};
//# sourceMappingURL=v3-chart.d.ts.map