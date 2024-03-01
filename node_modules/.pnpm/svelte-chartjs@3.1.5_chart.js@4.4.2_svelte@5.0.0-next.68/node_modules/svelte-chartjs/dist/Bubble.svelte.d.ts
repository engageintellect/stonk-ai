import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"bubble", import("chart.js").BubbleDataPoint[], unknown>, "type"> & {
        chart?: ChartJS<"bubble", import("chart.js").BubbleDataPoint[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BubbleProps = typeof __propDef.props;
export type BubbleEvents = typeof __propDef.events;
export type BubbleSlots = typeof __propDef.slots;
export default class Bubble extends SvelteComponent<BubbleProps, BubbleEvents, BubbleSlots> {
}
export {};
//# sourceMappingURL=Bubble.svelte.d.ts.map