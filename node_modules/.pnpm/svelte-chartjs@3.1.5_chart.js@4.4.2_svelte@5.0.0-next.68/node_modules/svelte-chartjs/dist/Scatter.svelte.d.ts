import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"scatter", (number | import("chart.js").Point)[], unknown>, "type"> & {
        chart?: ChartJS<"scatter", (number | import("chart.js").Point)[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ScatterProps = typeof __propDef.props;
export type ScatterEvents = typeof __propDef.events;
export type ScatterSlots = typeof __propDef.slots;
export default class Scatter extends SvelteComponent<ScatterProps, ScatterEvents, ScatterSlots> {
}
export {};
//# sourceMappingURL=Scatter.svelte.d.ts.map