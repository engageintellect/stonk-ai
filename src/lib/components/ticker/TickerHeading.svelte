<script lang="ts">
	import ArrowUp from 'virtual:icons/material-symbols/arrow-upward';
	import ArrowDown from 'virtual:icons/material-symbols/arrow-downward';
	import Chart from '$lib/components/ticker/Chart.svelte';
	export let data: any;

	export let ticker: any;

	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col">
	<div class="text-xs font-thin">
		{new Date().toLocaleDateString('en-US')}
	</div>

	<div class="pb-2">
		<div class="flex items-center gap-5">
			<div class="text-5xl sm:text-7xl">
				{ticker.info.symbol}
			</div>

			{#if Number(ticker.performance.currentPrice.replace('$', '')) > Number(ticker.performance.yesterdaysClose.replace('$', ''))}
				{#if ticker.info.currentPrice}
					<div
						class="badge badge-success text-success-content flex h-full items-center gap-1 px-4 py-2 font-semibold sm:text-2xl"
					>
						<div>
							{ticker.info.currentPrice}
						</div>

						<div>
							<ArrowUp class="text-success-content h-5 w-5 animate-pulse sm:h-7 sm:w-7" />
						</div>
					</div>
				{/if}
			{:else if ticker.info.currentPrice}
				<div
					class="badge badge-error text-error-content flex h-full items-center gap-1 px-4 py-2 text-lg font-semibold sm:text-2xl"
				>
					{ticker.info.currentPrice}
					<ArrowDown class="text-error-content h-5 w-5 animate-pulse sm:h-7 sm:w-7" />
				</div>
			{/if}
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
</div>

<div class="h-52 sm:h-80">
	<Chart
		chartTitle="Price History"
		chartValues={data.price_history.map((price: any) => price.price)}
		chartLabels={data.price_history.map((date: any) => date.date)}
	/>
</div>
