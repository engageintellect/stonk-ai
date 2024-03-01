import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"bar", (number | [number, number])[], unknown>, "type"> & {
        chart?: ChartJS<"bar", (number | [number, number])[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BarProps = typeof __propDef.props;
export type BarEvents = typeof __propDef.events;
export type BarSlots = typeof __propDef.slots;
export default class Bar extends SvelteComponent<BarProps, BarEvents, BarSlots> {
}
export {};
//# sourceMappingURL=Bar.svelte.d.ts.map