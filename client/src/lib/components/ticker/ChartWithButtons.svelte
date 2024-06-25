<script lang="ts">
	import { prefferedTimeframe } from '$lib/store';
	import { getTimeframe, prettifyDate } from '$lib/tickerModel';
	import Chart from './Chart.svelte';

	export let chartTitle: string;
	export let chartLabels: string[];
	export let chartValues: number[];

	export let data: any;

	function handleClick(time: number) {
		prefferedTimeframe.set(time);
	}

	let timeframeOptions = [5, 10, 30, 90, 180, 365, 730, 1095, 1825];
</script>

<div class="">
	<div class="flex gap-1 overflow-auto py-2">
		{#each timeframeOptions as option}
			{#if Number(option) < Number(data.price_history.length)}
				<button
					class={$prefferedTimeframe === option
						? 'btn btn-sm btn-primary'
						: 'btn btn-sm btn-outline'}
					on:click={() => handleClick(option)}>{getTimeframe(option)}</button
				>
			{/if}
		{/each}
	</div>

	<div>
		{#each timeframeOptions as option}
			{#if $prefferedTimeframe == option}
				<div class="h-60 sm:h-80">
					<Chart
						chartLabels={data.price_history.slice(-option).map((date: any) => prettifyDate(date['Date']))}
						chartValues={data.price_history.slice(-option).map((price: any) => price['Close'])}
						{chartTitle}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>
