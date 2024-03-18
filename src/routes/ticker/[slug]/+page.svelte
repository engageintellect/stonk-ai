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
	import { onMount } from 'svelte';
	import YouTubeFeed from '$lib/components/ticker/YouTubeFeed.svelte';
	import { fade } from 'svelte/transition';
	import Alert from '$lib/components/base/Alert.svelte';
	import AiSentiment from '$lib/components/ticker/AiSentiment.svelte';
	import OptionsChain from '$lib/components/ticker/OptionsChain.svelte';
	import ScrollerMenu from '$lib/components/ticker/ScrollerMenu.svelte';

	export let data: PageData;

	let ticker = generateTicker(data);

	let onlyPrices: number[];
	let onlyDates: string[];
	let predicted_prices: any;

	onMount(async () => {
		const res = await fetch(`/api/predictPrice/?ticker=${ticker.info.symbol}`);
		if (!res.ok) {
			throw new Error('Error fetching /api/predictPrice from client.');
		}
		predicted_prices = await res.json();
		onlyPrices = predicted_prices.predicted_prices.map((price: any) => price.price);
		onlyDates = predicted_prices.predicted_prices.map((price: any) => price.date);
		predicted_prices = predicted_prices.predicted_prices.map((price: any) => {
			return {
				date: new Date(price.date).toLocaleDateString('en-US'),
				price: formatPrice(price.price)
			};
		});

		// console.log('map', predicted_prices);
		// console.log('prices', onlyPrices);
		// console.log('dates', onlyDates);
	});

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

<div class="" in:fade={{ delay: 0, duration: 936 }}>
	{#if data.price_history.length === 0}
		<div class="">
			<Alert
				alertMsg={`No data found for ticker: "${data.ticker_info.symbol}"`}
				alertType="warning"
			/>
		</div>
	{:else}
		<div class="flex flex-col gap-10">
			<TickerHeading {ticker} {data} />
			<ScrollerMenu />
			<AnalystData {ticker} />
			<AiSentiment {data} />
			<CompanyData {ticker} />
			<AiForecast {predicted_prices} {onlyPrices} {onlyDates} />
			<NewsFeed {data} {ticker} />
			<YouTubeFeed {ticker} />
			<CompanyDescription {data} {ticker} />
			<CompanyOfficers {data} {companyOfficers} />
			<OptionsChain {data} />
			<!-- <PredictedPriceGrid {predicted_prices} /> -->
		</div>
	{/if}
</div>
