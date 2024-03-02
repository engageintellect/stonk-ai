<script lang="ts">
	import colors from 'tailwindcss/colors';
	import chartjs from 'chart.js/auto';
	let chartData;
	import { onMount } from 'svelte';

	export let chartTitle: string;
	export let chartValues: number[];
	export let chartLabels: string[];

	export let someColor: any;

	let ctx;
	let chartCanvas: any;

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		var chart = new chartjs(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: chartTitle,
						backgroundColor: someColor,
						borderColor: someColor,

						data: chartValues
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: false
					}
				},
				scales: {
					x: {
						display: false
					},
					y: {
						display: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>
