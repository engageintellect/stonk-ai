<script>import { Chart as ChartJS, DoughnutController } from "chart.js";
import Chart from "./Chart.svelte";
import { useForwardEvents } from "./utils/index.js";
ChartJS.register(DoughnutController);
export let chart = null;
let props;
let baseChartRef;
useForwardEvents(() => baseChartRef);
$:
  props = $$props;
</script>

<Chart bind:this={baseChartRef} bind:chart type="doughnut" {...props} />
