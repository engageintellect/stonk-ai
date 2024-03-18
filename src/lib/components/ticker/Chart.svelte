<script lang="ts">
	import chartjs from 'chart.js/auto';
	import daisyuiColors from 'daisyui/src/theming/themes';
	import { selectedTheme } from '$lib/store';
	import { onMount, afterUpdate } from 'svelte';

	export let chartTitle: string;
	export let chartValues: number[];
	export let chartLabels: any[];

	let currentTheme: string;
	let primary: string;
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
				primary = value.primary;
				if (chart) {
					chart.data.datasets[0].backgroundColor = primary;
					chart.data.datasets[0].pointBorderColor = primary;
					chart.data.datasets[0].pointBackgroundColor = primary;
					chart.data.datasets[0].borderColor = primary;
					chart.options.scales.y.ticks.color = primary;
					chart.options.scales.y.border.color = primary;

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
						backgroundColor: primary,
						pointBorderColor: primary,
						pointBackgroundColor: primary,
						borderColor: primary,
						data: chartValues
					}
				]
			},
			options: {
				elements: {
					point: {
						radius: 0
					}
				},
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
						ticks: {
							align: 'end',
							color: primary,
							callback: (value: any) => {
								return '$' + value.toFixed(2);
							}
						},
						display: true,
						position: 'right',
						grid: {
							display: false
						},
						border: {
							color: primary
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
