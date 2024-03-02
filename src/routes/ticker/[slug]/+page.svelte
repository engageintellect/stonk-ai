<script lang="ts">
	import type { PageData } from './$types';
	import ArrowDown from 'virtual:icons/material-symbols/arrow-downward';
	import ArrowUp from 'virtual:icons/material-symbols/arrow-upward';
	import Chart from '$lib/components/Chart.svelte';
	import { generateTicker, formatPrice } from '$lib/tickerModel';
	import CompanyOfficers from '$lib/components/CompanyOfficers.svelte';

	export let data: PageData;
	let ticker = generateTicker(data);

	let predicted_prices = data.predicted_prices.map((price: any) => {
		return {
			date: new Date(price.date).toLocaleDateString('en-US'),
			price: formatPrice(price.price)
		};
	});

	let onlyPrices = data.predicted_prices.map((price: any) => price.price);
	let onlyDates = predicted_prices.map((price: any) => price.date);

	let companyOfficers: any;
	if (data.ticker_info.companyOfficers) {
		companyOfficers = data.ticker_info.companyOfficers.map((officer: any) => {
			return {
				name: officer.name,
				title: officer.title,
				age: officer.age,
				fiscalYear: officer.fiscalYear,
				totalPay: officer.totalPay,
				exercisedValue: officer.exercisedValue,
				unexercisedValue: officer.unexercisedValue
			};
		});
	}
</script>

<div class="">
	{#if !data}
		<div>Loading...</div>
	{:else}
		<div class="flex flex-col gap-5">
			<div class="flex flex-col">
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

			<div class="">
				<div class="pb-2 font-semibold">Analysis Data</div>
				<div class="flex gap-2 overflow-auto">
					{#each Object.entries(ticker.analysis) as [key, value]}
						{#if value}
							<div class="bg-accent text-accent-content rounded p-6">
								<div class="flex flex-col items-center justify-center gap-2">
									<div class="font-thin capitalize">{key}:</div>
									<div class="text-xl font-semibold uppercase">{value}</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="">
				<div class="flex gap-2 overflow-auto">
					{#each Object.entries(ticker) as [key, value]}
						{#if key !== 'info' && key !== 'analysis'}
							{#if value && Object.values(value).some((x) => x)}
								<div class="flex flex-col gap-2 rounded">
									<div class="font-semibold capitalize">{key}</div>
									{#each Object.entries(value) as [prop, propValue]}
										{#if propValue}
											<div class=" bg-secondary text-secondary-content rounded p-2 text-sm">
												<div class="flex gap-2">
													<div class="font-semibold capitalize">{prop}:</div>
													<div class="">{propValue}</div>
												</div>
											</div>
										{/if}
									{/each}
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			</div>

			<div class="">
				<div class="pb-2 font-semibold">30 AI Day Forecast</div>
				<div class="flex gap-2 overflow-auto">
					{#each predicted_prices as price}
						<div class="bg-primary text-primary-content rounded p-6 text-center">
							<div class="flex flex-col items-center justify-center gap-2">
								<div class="w-full text-nowrap text-sm font-thin">
									{price.date}
								</div>
								<div class="text-xl font-semibold uppercase">{price.price}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if parseFloat(predicted_prices[0].price.replace('$', '')) > parseFloat(predicted_prices[predicted_prices.length - 1].price.replace('$', ''))}
				<div class="badge badge-error text-error-content h-full px-4 py-2 text-sm font-bold">
					Bearish
					<ArrowDown class="text-error-content h-5 w-5" />
				</div>
			{:else}
				<div class="badge badge-primary text-primary-content h-full px-4 py-2 text-sm font-bold">
					Bullish
					<ArrowUp class="text-primary-content h-5 w-5" />
				</div>
			{/if}

			<div class="h-52 sm:h-80">
				<Chart chartTitle="Projected Prices" chartValues={onlyPrices} chartLabels={onlyDates} />
			</div>

			{#if data.ticker_info.longBusinessSummary}
				<div>
					<div class="pb-2 font-semibold">Description:</div>
					<div>{data.ticker_info.longBusinessSummary}</div>
				</div>
			{/if}
		</div>
		<a class="btn btn-primary my-5" href={ticker.info.website} target="_blank">Learn More</a>

		{#if CompanyOfficers}
			<div class="pb-2 font-semibold">Company Officers</div>
			<div class="flex w-full gap-2 overflow-auto">
				{#each companyOfficers as officer}
					<CompanyOfficers companyOfficers={officer} />
				{/each}
			</div>
		{/if}

		<div class="my-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{#each predicted_prices as price}
				<div class="bg-base-300 w-full rounded p-2">
					<div class="w-full">{price.date}</div>
					<div class="w-full">{price.price}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
