<script lang="ts">
	import type { PageData } from './$types';
	import { generateTicker, formatPrice } from '$lib/tickerModel';
	import TickerHeading from '$lib/components/ticker/TickerHeading.svelte';
	import AnalystData from '$lib/components/ticker/AnalystData.svelte';
	import CompanyData from '$lib/components/ticker/CompanyData.svelte';
	import CompanyDescription from '$lib/components/ticker/CompanyDescription.svelte';
	import CompanyOfficers from '$lib/components/ticker/CompanyOfficers.svelte';
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

	// Ensure options are part of the data or extracted properly
	let options = data.options || {}; // Adjust according to your data structure
</script>

<div in:fade={{ delay: 0, duration: 936 }}>
	{#if data.price_history.length === 0}
		<Alert
			alertMsg={`No data found for ticker: "${data.ticker_info.symbol}", please try a different ticker.`}
			alertType="warning"
		/>
	{:else}
		<div class="flex flex-col gap-10">
			<TickerHeading {ticker} {data} />
			<ScrollerMenu />
			<AnalystData {ticker} />
			<NewsFeed {data} {ticker} />
			<AiSentiment {data} />
			<CompanyDescription {data} {ticker} />
			<CompanyData {ticker} />
			<CompanyOfficers {data} {companyOfficers} />
			<AiForecast {predicted_prices} {onlyPrices} {onlyDates} />
			<YouTubeFeed {ticker} />
			<OptionsChain {data} {options} />
			<!-- Pass the options prop -->
		</div>
	{/if}
</div>
