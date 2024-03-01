<script>import { Chart as ChartJS, BubbleController } from "chart.js";
import Chart from "./Chart.svelte";
import { useForwardEvents } from "./utils/index.js";
ChartJS.register(BubbleController);
export let chart = null;
let props;
let baseChartRef;
useForwardEvents(() => baseChartRef);
$:
  props = $$props;
</script>

<Chart bind:this={baseChartRef} bind:chart type="bubble" {...props} />
