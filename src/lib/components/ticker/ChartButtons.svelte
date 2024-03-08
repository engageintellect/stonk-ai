<script lang="ts">
	import { prefferedTimeframe } from '$lib/store';
	import Chart from './Chart.svelte';

	export let chartTitle: string;
	export let chartLabels: string[];
	export let chartValues: number[];

	export let data: any;

	function handleClick(time: number) {
		prefferedTimeframe.set(time);
	}
</script>

<div class="">
	<div class="flex gap-1">
		<button class="btn btn-sm btn-outline" on:click={() => handleClick(10)}>10d</button>
		<button class="btn btn-sm btn-outline" on:click={() => handleClick(30)}>30d</button>
		<button class="btn btn-sm btn-outline" on:click={() => handleClick(60)}>60d</button>
		<button class="btn btn-sm btn-outline" on:click={() => handleClick(90)}>90d</button>
	</div>

	<div>
		{#if $prefferedTimeframe == 10}
			<div class="h-52 sm:h-80">
				<Chart
					chartLabels={data.price_history.slice(-10).map((date: any) => date.date)}
					chartValues={data.price_history.slice(-10).map((price: any) => price.price)}
					{chartTitle}
				/>
			</div>
		{/if}

		{#if $prefferedTimeframe == 30}
			<div class="h-52 sm:h-80">
				<Chart
					chartLabels={data.price_history.slice(-30).map((date: any) => date.date)}
					chartValues={data.price_history.slice(-30).map((price: any) => price.price)}
					{chartTitle}
				/>
			</div>
		{/if}

		{#if $prefferedTimeframe == 60}
			<div class="h-52 sm:h-80">
				<Chart
					chartLabels={data.price_history.slice(-60).map((date: any) => date.date)}
					chartValues={data.price_history.slice(-60).map((price: any) => price.price)}
					{chartTitle}
				/>
			</div>
		{/if}

		{#if $prefferedTimeframe == 90}
			<div class="h-52 sm:h-80">
				<Chart
					chartLabels={data.price_history.slice(-90).map((date: any) => date.date)}
					chartValues={data.price_history.slice(-90).map((price: any) => price.price)}
					{chartTitle}
				/>
			</div>
		{/if}
	</div>
</div>
