<script lang="ts">
	import ArrowUp from 'virtual:icons/material-symbols/arrow-upward';
	import ArrowDown from 'virtual:icons/material-symbols/arrow-downward';
	import { calculatePercentageChange } from '$lib/tickerModel';
	import ChartButtons from './ChartButtons.svelte';
	import { prefferedTimeframe } from '$lib/store';
	import { get } from 'svelte/store';

	prefferedTimeframe.subscribe((value) => {
		$prefferedTimeframe = value;
	});

	export let data: any;
	export let ticker: any;

	let timeframes = [10, 30, 60, 90, 180];

	const isBullish = (previous: number, current: number) => {
		if (previous && current) {
			return Number(previous) < Number(current);
		}
	};
</script>

<div class="flex flex-col">
	<div class="text-xs font-thin sm:text-sm">
		{new Date().toLocaleDateString('en-US')}
	</div>

	<div class="pb-2">
		<div class="flex items-center gap-5">
			<div class="font-sans text-5xl font-thin sm:text-7xl">
				{ticker.info.symbol}
			</div>

			<div class="">
				{#each timeframes as timeframe}
					{#if timeframe == $prefferedTimeframe}
						{#if isBullish(data.price_history.slice(-timeframe)[0].price, data.price_history.slice(-timeframe)[timeframe - 1].price)}
							<div class="flex items-center gap-2">
								<div
									class="badge badge-primary text-primary-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-2xl"
								>
									<div>
										{ticker.info.currentPrice}
									</div>
								</div>

								<div
									class="badge badge-success text-success-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-2xl"
								>
									<div>
										<ArrowUp class="text-success-content h-5 w-5 animate-pulse sm:h-7 sm:w-7" />
									</div>

									<div>
										{calculatePercentageChange(
											Number(data.price_history.slice(-timeframe)[0].price),
											Number(data.price_history.slice(-timeframe)[timeframe - 1].price)
										).toFixed(2) + '%'}
									</div>
								</div>
							</div>
						{:else}
							<div class="flex items-center gap-2">
								<div
									class="badge badge-primary text-primary-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-2xl"
								>
									<div>
										{ticker.info.currentPrice}
									</div>
								</div>

								<div
									class="badge badge-error text-error-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-2xl"
								>
									<div>
										<ArrowDown class="text-error-content h-5 w-5 animate-pulse sm:h-7 sm:w-7" />
									</div>

									<div>
										{calculatePercentageChange(
											Number(data.price_history.slice(-timeframe)[0].price),
											Number(data.price_history.slice(-timeframe)[timeframe - 1].price)
										).toFixed(2) + '%'}
									</div>
								</div>
							</div>
						{/if}
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<div class="text-xl font-thin uppercase">{ticker.info.name}</div>

	<div class="flex flex-col gap-5 text-sm font-thin">
		<div class="">
			{#if ticker.info.website}
				<div>
					<span class="font-semibold">Website:</span>
					<a href={ticker.info.website} target="_blank">{ticker.info.website}</a>
				</div>
			{/if}

			{#if ticker.info.city}
				<div>
					<span class="font-semibold">Location:</span>
					{ticker.info.city}, {ticker.info.state}
				</div>
			{/if}

			{#if ticker.info.employees}
				<div>
					<span class="font-semibold">Employees:</span>
					{ticker.info.employees}
				</div>
			{/if}

			{#if ticker.info.sector}
				<div>
					<span class="font-semibold">Sector:</span>
					{ticker.info.sector}
				</div>
			{/if}
		</div>
	</div>

	<div class="mb-10 mt-2 h-52 sm:h-80">
		<ChartButtons
			chartTitle="Price History"
			chartLabels={data.price_history.map((date: any) => date.date)}
			chartValues={data.price_history.map((price: any) => price.price)}
			{data}
		/>
	</div>
</div>
