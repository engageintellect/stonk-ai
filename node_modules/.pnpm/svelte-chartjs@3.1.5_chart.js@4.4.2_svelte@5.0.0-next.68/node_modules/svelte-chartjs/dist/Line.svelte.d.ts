import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"line", (number | import("chart.js").Point)[], unknown>, "type"> & {
        chart?: ChartJS<"line", (number | import("chart.js").Point)[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LineProps = typeof __propDef.props;
export type LineEvents = typeof __propDef.events;
export type LineSlots = typeof __propDef.slots;
export default class Line extends SvelteComponent<LineProps, LineEvents, LineSlots> {
}
export {};
//# sourceMappingURL=Line.svelte.d.ts.map