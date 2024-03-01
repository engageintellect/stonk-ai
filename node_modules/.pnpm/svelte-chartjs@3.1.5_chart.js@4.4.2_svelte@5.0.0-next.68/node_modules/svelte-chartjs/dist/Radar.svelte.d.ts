import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"radar", number[], unknown>, "type"> & {
        chart?: ChartJS<"radar", number[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RadarProps = typeof __propDef.props;
export type RadarEvents = typeof __propDef.events;
export type RadarSlots = typeof __propDef.slots;
export default class Radar extends SvelteComponent<RadarProps, RadarEvents, RadarSlots> {
}
export {};
//# sourceMappingURL=Radar.svelte.d.ts.map