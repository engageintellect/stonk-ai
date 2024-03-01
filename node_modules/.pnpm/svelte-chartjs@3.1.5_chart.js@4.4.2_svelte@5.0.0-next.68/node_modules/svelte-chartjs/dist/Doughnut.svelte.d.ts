import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"doughnut", number[], unknown>, "type"> & {
        chart?: ChartJS<"doughnut", number[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DoughnutProps = typeof __propDef.props;
export type DoughnutEvents = typeof __propDef.events;
export type DoughnutSlots = typeof __propDef.slots;
export default class Doughnut extends SvelteComponent<DoughnutProps, DoughnutEvents, DoughnutSlots> {
}
export {};
//# sourceMappingURL=Doughnut.svelte.d.ts.map