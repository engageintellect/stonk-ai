<script lang="ts">
	import type { PageData } from './$types';
	import { generateTicker, formatPrice } from '$lib/tickerModel';
	import TickerHeading from '$lib/components/ticker/TickerHeading.svelte';
	import AnalystData from '$lib/components/ticker/AnalystData.svelte';
	import CompanyData from '$lib/components/ticker/CompanyData.svelte';
	import CompanyDescription from '$lib/components/ticker/CompanyDescription.svelte';
	import CompanyOfficers from '$lib/components/ticker/CompanyOfficers.svelte';
	import PredictedPriceGrid from '$lib/components/ticker/PredictedPriceGrid.svelte';
	import AiForecast from '$lib/components/ticker/AiForecast.svelte';
	import NewsFeed from '$lib/components/ticker/NewsFeed.svelte';

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
		<div class="flex flex-col gap-10">
			<TickerHeading {ticker} {data} />
			<AnalystData {ticker} />
			<CompanyData {ticker} />
			<AiForecast {predicted_prices} {onlyPrices} {onlyDates} />
			<CompanyDescription {data} {ticker} />
			<CompanyOfficers {data} {companyOfficers} />
			<NewsFeed {data} {ticker} />
			<PredictedPriceGrid {predicted_prices} />
		</div>
	{/if}
</div>
