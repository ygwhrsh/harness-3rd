export interface Stage {
    name: string;
    tone: string;
    ai: string;
    crit: {
        title: string | null;
        items: Array<{
            t: string;
            ok: boolean;
            v: number;
            max: number;
            vl: string;
        }>;
    };
    seg: [number, number];
    sec: Array<[string, string]>;
    limit: {
        used: number;
        cap: number;
        note: string;
    } | null;
}
export interface Bank {
    id: string;
    name: string;
    kind: string;
    amt: number;
    color: string;
    initial: string;
    on: boolean;
    swept?: boolean;
}
export interface Balances {
    futsu: number;
    nisa: number;
    teiki: number;
}
export interface ChartData {
    actualBank: number[];
    othersMonthly: number[];
    forecastBank: number[];
    band: Array<[number, number]>;
}
export interface Event {
    x: number;
    name: string;
    amt: string;
    inflow?: boolean;
    s2?: boolean;
}
export interface Action {
    label: string;
    variant: "primary" | "secondary" | "outline";
    icon: string;
    need: number;
}
export declare const V3_STAGES: Record<number, Stage>;
export declare const V3_BANKS: Bank[];
export declare const V3_BALANCES: Balances;
export declare const V3_CHART_DATA: ChartData;
export declare const V3_EVENTS: Event[];
export declare const V3_ACTIONS: Action[];
//# sourceMappingURL=v3-constants.d.ts.map