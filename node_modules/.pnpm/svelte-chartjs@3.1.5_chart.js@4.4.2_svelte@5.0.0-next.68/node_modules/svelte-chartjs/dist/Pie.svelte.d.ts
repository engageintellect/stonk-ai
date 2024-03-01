import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"pie", number[], unknown>, "type"> & {
        chart?: ChartJS<"pie", number[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PieProps = typeof __propDef.props;
export type PieEvents = typeof __propDef.events;
export type PieSlots = typeof __propDef.slots;
export default class Pie extends SvelteComponent<PieProps, PieEvents, PieSlots> {
}
export {};
//# sourceMappingURL=Pie.svelte.d.ts.map