<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { formatPercent, formatPrice } from '$lib/tickerModel';

	export let data: any;
	export let selectedDate: any;

	let optionDelta: number | null = null;

	let stuff: any;

	let currentStockPrice: number | null = null;
	let currentInterestRate: number | null = null;
	let isDataLoaded = false;

	export let option = {
		contractSymbol: 'AAPL220121C00100000',
		strike: 100,
		lastPrice: 0.5,
		bid: 0.49,
		ask: 0.51,
		change: 0,
		percentChange: 3.44,
		volume: 19,
		openInterest: 233,
		impliedVolatility: 0.44,
		inTheMoney: 'true',
		contractSize: 'REGULAR'
	};

	const getInterestRates = async () => {
		const res = await fetch('/api/getInterestRates');
		if (!res.ok) {
			throw new Error('Error fetching /api/interestRates from client.');
		}
		const interestRates = await res.json();
		return interestRates;
	};

	const calculateDelta = async () => {
		const interestRates = await getInterestRates();
		currentInterestRate = interestRates;
		currentStockPrice = data.price_history.slice(-1)[0]?.Close;
		isDataLoaded = true;

		if (isDataLoaded && selectedDate) {
			const currentDate = new Date();
			const expirationDate = new Date(selectedDate);
			const timeDifference = expirationDate.getTime() - currentDate.getTime();
			const millisecondsInDay = 1000 * 60 * 60 * 24;
			const daysToExpiration = timeDifference / millisecondsInDay;
			const daysInYear = 252; // Consider leap years
			const T = daysToExpiration / daysInYear;

			const optionData = {
				S: Number(currentStockPrice?.toFixed(2)) || 0,
				K: option.strike,
				T: T,
				r: Number(currentInterestRate?.toFixed(2)) / 100 || 0,
				sigma: option.impliedVolatility || 0

				// FOR DEBUG
				// S: 509.83,
				// K: 530,
				// T: 0.079365079365079,
				// r: 0.0524,
				// sigma: 0.53
			};

			stuff = optionData;

			const res = await fetch(
				`/api/getOptionDelta?S=${optionData.S}&K=${optionData.K}&T=${optionData.T}&r=${optionData.r}&sigma=${optionData.sigma}`
			);
			if (!res.ok) {
				throw new Error('Error fetching /api/optionsChain from client.');
			}
			const delta = await res.json();
			optionDelta = delta.option_delta.toFixed(2);
		}
	};

	onMount(calculateDelta);

	// Cleanup on component destruction
	onDestroy(() => {
		optionDelta = null;
	});
</script>

<div class="bg-base-300 card w-full">
	<div class=" relative">
		<div class="flex justify-between gap-5 p-6 pt-12">
			<div class="badge badge-lg badge-primary absolute left-0 top-0 rounded-bl-none font-semibold">
				Strike: {formatPrice(option.strike)}
			</div>
			{#if option.percentChange > 0}
				<div class="badge badge-success badge-lg absolute right-0 top-0 rounded-br-none">
					+{option.percentChange.toFixed(2)}%
				</div>
			{:else if option.percentChange < 0}
				<div class="badge badge-error badge-lg absolute right-0 top-0 rounded-br-none">
					{option.percentChange.toFixed(2)}%
				</div>
			{:else}
				<div class="badge badge-lg absolute right-0 top-0 rounded-br-none">
					{option.percentChange.toFixed(2)}%
				</div>
			{/if}

			<div>
				<div class="w-full">Last Price: {formatPrice(option.lastPrice)}</div>
				<div class="w-full">Bid: {formatPrice(option.bid)}</div>
				<div class="w-full">Ask: {formatPrice(option.ask)}</div>
				<div class="w-full">Volume: {option.volume || 0}</div>
			</div>

			<div>
				<div class="w-full">ITM: <span class="capitalize">{option.inTheMoney}</span></div>
				<div class="w-full">Open Interest: {option.openInterest}</div>
				<div class="w-full">IV: {formatPercent(option.impliedVolatility)}%</div>
				<div class="w-full">Delta: {optionDelta}</div>
			</div>
		</div>
	</div>
</div>
