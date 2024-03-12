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

	let timeframeOptions = [5, 10, 30, 60, 90, 180];
</script>

<div class="">
	<div class="flex gap-1">
		{#each timeframeOptions as option}
			<button
				class={$prefferedTimeframe === option ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline'}
				on:click={() => handleClick(option)}>{option}d</button
			>
		{/each}
	</div>

	<div>
		{#each timeframeOptions as option}
			{#if $prefferedTimeframe == option}
				<div class="h-60 sm:h-80">
					<Chart
						chartLabels={data.price_history.slice(-option).map((date: any) => date.date)}
						chartValues={data.price_history.slice(-option).map((price: any) => price.price)}
						{chartTitle}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>
