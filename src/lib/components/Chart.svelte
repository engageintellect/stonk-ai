<script lang="ts">
	import chartjs from 'chart.js/auto';
	import { onMount } from 'svelte';

	import daisyuiColors from 'daisyui/src/theming/themes';
	export let chartTitle: string;
	export let chartValues: number[];
	export let chartLabels: string[];

	import { selectedTheme } from '$lib/store';

	let currentTheme: unknown;
	// let someColor: any;

	// Subscribe to the selectedTheme store
	selectedTheme.subscribe((value) => {
		currentTheme = value;
	});

	// console.log('daisyuiColors:', daisyuiColors);

	// see if any of the keys in daisyuiColors match the currentTheme. if so, return the 'primary' prop of it
	let col: any;
	let someColor = Object.entries(daisyuiColors).map(([key, value]) => {
		if (key == currentTheme) {
			col = value.primary;
			console.log(key, currentTheme);
			console.log('yes');
			console.log('value:', value.primary);
			return value.primary;
		}
	});

	console.log('this is my color:', col);

	// see if any keys in daisyuiColors match the current theme. if so, return the 'primary' prop of it

	let ctx;
	let chartCanvas: any;

	console.log('someColor:', someColor);

	// someColor = [daisyuiColors.acid.primary];

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		var chart = new chartjs(ctx, {
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
