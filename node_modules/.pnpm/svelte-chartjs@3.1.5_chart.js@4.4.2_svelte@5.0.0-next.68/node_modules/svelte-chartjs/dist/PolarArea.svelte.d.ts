import { SvelteComponent } from "svelte";
import { Chart as ChartJS } from 'chart.js';
import type { ChartBaseProps } from './types/index.js';
declare const __propDef: {
    props: Omit<ChartBaseProps<"polarArea", number[], unknown>, "type"> & {
        chart?: ChartJS<"polarArea", number[], unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PolarAreaProps = typeof __propDef.props;
export type PolarAreaEvents = typeof __propDef.events;
export type PolarAreaSlots = typeof __propDef.slots;
export default class PolarArea extends SvelteComponent<PolarAreaProps, PolarAreaEvents, PolarAreaSlots> {
}
export {};
//# sourceMappingURL=PolarArea.svelte.d.ts.map