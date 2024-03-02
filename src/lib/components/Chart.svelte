<script lang="ts">
	import chartjs from 'chart.js/auto';
	let chartData;
	import { onMount } from 'svelte';

	export let chartTitle: string;
	export let chartValues: number[];
	export let chartLabels: string[];

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
						backgroundColor: 'rgb(255, 255, 255)',
						borderColor: 'rgb(255, 255, 255)',
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
