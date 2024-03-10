<script lang="ts">
	import ArrowDown from 'virtual:icons/material-symbols/arrow-downward';
	import ArrowUp from 'virtual:icons/material-symbols/arrow-upward';
	export let predicted_prices: any = [];
	export let onlyPrices: any = [];
	export let onlyDates: any = [];
	import Chart from '$lib/components/ticker/Chart.svelte';
	import { fade } from 'svelte/transition';
	import { calculatePercentageChange } from '$lib/tickerModel';
	import AiForecaseIcon from 'virtual:icons/ph/calendar-duotone';
	import AiInsight from '$lib/components/ticker/AiInsight.svelte';
</script>

{#if predicted_prices.length > 0}
	<div in:fade={{ delay: 0, duration: 500 }}>
		<div class="flex items-center gap-2">
			<div class="text-2xl font-semibold">30 day AI Forecast</div>
			<!-- <AiForecaseIcon class="text-primary h-10 w-10" /> -->
		</div>

		<AiInsight />
		<div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each predicted_prices as price}
				<div class="bg-primary text-primary-content snap-center rounded p-6 text-center">
					<div class="flex flex-col items-center justify-center gap-2">
						<div class="w-full text-nowrap text-sm font-thin">
							{price.date}
						</div>
						<div class="text-xl font-semibold uppercase">{price.price}</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="pt-2">
			{#if parseFloat(predicted_prices[0].price.replace('$', '')) > parseFloat(predicted_prices[predicted_prices.length - 1].price.replace('$', ''))}
				<div class="badge badge-error text-error-content h-full px-4 py-2 text-sm font-bold">
					Bearish
					<ArrowDown class="text-error-content h-5 w-5" />
				</div>
			{:else}
				<div class="badge badge-success text-success-content h-full px-4 py-2 text-sm font-bold">
					Bullish
					<ArrowUp class="text-success-content h-5 w-5" />
				</div>
			{/if}

			{#if parseFloat(predicted_prices[0].price.replace('$', '')) > parseFloat(predicted_prices[predicted_prices.length - 1].price.replace('$', ''))}
				<div class="badge badge-error text-error-content h-full px-4 py-2 text-sm font-bold">
					{calculatePercentageChange(
						Number(predicted_prices[0].price.replace('$', '')),
						Number(predicted_prices[predicted_prices.length - 1].price.replace('$', ''))
					).toFixed(2) + '%'}
				</div>
			{:else}
				<div class="badge badge-success text-success-content h-full px-4 py-2 text-sm font-bold">
					{calculatePercentageChange(
						Number(predicted_prices[0].price.replace('$', '')),
						Number(predicted_prices[predicted_prices.length - 1].price.replace('$', ''))
					).toFixed(2) + '%'}
				</div>
			{/if}
			<div class="h-52 pt-2 sm:h-72">
				<Chart chartTitle="Projected Prices" chartValues={onlyPrices} chartLabels={onlyDates} />
			</div>
		</div>
	</div>
{:else}
	<div class="flex items-center gap-2">
		<div class=" animate-pulse text-2xl font-semibold">Generating AI Response</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}
