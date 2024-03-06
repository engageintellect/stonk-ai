<script lang="ts">
	import ArrowUp from 'virtual:icons/material-symbols/arrow-upward';
	import ArrowDown from 'virtual:icons/material-symbols/arrow-downward';
	import Chart from '$lib/components/base/Chart.svelte';
	export let data: any;

	export let ticker: any;
</script>

<div class="flex flex-col">
	<div class="text-sm font-thin">
		{new Date().toLocaleDateString('en-US')}
	</div>

	<div class="flex items-start gap-2">
		<div class="flex items-center gap-5 text-5xl uppercase sm:text-7xl">
			<div>
				{ticker.info.symbol}
			</div>

			{#if ticker.performance.currentPrice > ticker.performance.yesterdaysClose}
				{#if ticker.info.currentPrice}
					<div
						class="badge badge-primary text-primary-content flex h-full items-center gap-1 px-4 py-2 text-lg font-semibold sm:text-3xl"
					>
						<div>
							{ticker.info.currentPrice}
						</div>

						<div>
							<ArrowUp class="text-primary-content h-5 w-5 sm:h-10 sm:w-10" />
						</div>
					</div>
				{/if}
			{:else if ticker.info.currentPrice}
				<div
					class="badge badge-error text-error-content flex h-full items-center gap-1 px-4 py-2 text-lg font-semibold sm:text-3xl"
				>
					{ticker.info.currentPrice}
					<ArrowDown class="text-error-content h-5 w-5 sm:h-10 sm:w-10" />
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
