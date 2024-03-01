import type { Chart } from 'chart.js';
/**
 * Get dataset from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export declare function getDatasetAtEvent(chart: Chart, event: PointerEvent): import("chart.js").InteractionItem[];
/**
 * Get single dataset element from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export declare function getElementAtEvent(chart: Chart, event: PointerEvent): import("chart.js").InteractionItem[];
/**
 * Get all dataset elements from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export declare function getElementsAtEvent(chart: Chart, event: PointerEvent): import("chart.js").InteractionItem[];
//# sourceMappingURL=events.d.ts.map