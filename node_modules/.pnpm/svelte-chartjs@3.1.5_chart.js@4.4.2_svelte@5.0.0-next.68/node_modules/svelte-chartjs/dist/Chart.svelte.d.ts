import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: ChartBaseProps<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown> & {
        chart?: ChartJS<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ChartProps = typeof __propDef.props;
export type ChartEvents = typeof __propDef.events;
export type ChartSlots = typeof __propDef.slots;
export default class Chart extends SvelteComponent<ChartProps, ChartEvents, ChartSlots> {
}
export {};
//# sourceMappingURL=Chart.svelte.d.ts.map