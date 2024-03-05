<script lang="ts">
	import chartjs from 'chart.js/auto';
	import { onMount, afterUpdate } from 'svelte';

	import daisyuiColors from 'daisyui/src/theming/themes';
	import { selectedTheme } from '$lib/store';

	export let chartTitle: string;
	export let chartValues: number[];
	export let chartLabels: string[];

	let currentTheme: string;
	let col: string;
	let ctx: any;
	let chartCanvas: HTMLCanvasElement;
	let chart: any;

	selectedTheme.subscribe((value) => {
		currentTheme = value;
		updateChartColor();
	});

	function updateChartColor() {
		if (!currentTheme) return;
		Object.entries(daisyuiColors).forEach(([key, value]) => {
			if (key == currentTheme) {
				col = value.primary;
				if (chart) {
					chart.data.datasets[0].backgroundColor = col;
					chart.data.datasets[0].pointBorderColor = col;
					chart.data.datasets[0].pointBackgroundColor = col;
					chart.data.datasets[0].borderColor = col;
					chart.options.scales.y.ticks.color = col;
					chart.options.scales.y.border.color = col;

					chart.update();
				}
			}
		});
	}

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		chart = new chartjs(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: chartTitle,
						backgroundColor: col,
						pointBorderColor: col,
						pointBackgroundColor: col,
						borderColor: col,
						data: chartValues
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false },
					title: { display: false }
				},
				scales: {
					x: {
						display: false,
						grid: { display: false }
					},
					y: {
						display: true,
						grid: {
							display: false
						},
						border: {
							color: col
						},
						ticks: {
							color: col
						}
					}
				}
			}
		});
	});

	afterUpdate(() => {
		updateChartColor();
	});
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>
