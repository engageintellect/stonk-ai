<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { formatPercent, formatPrice } from '$lib/tickerModel';

	export let data: any;
	export let selectedDate: any;

	let optionDelta: number | null = null;
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
		if (!res.ok) throw new Error('Error fetching /api/interestRates from client.');
		return res.json();
	};

	const calculateDelta = async () => {
		const interestRates = await getInterestRates();
		currentInterestRate = interestRates;
		currentStockPrice = data.price_history.slice(-1)[0]?.Close;
		isDataLoaded = true;

		if (isDataLoaded && selectedDate) {
			const currentDate = new Date();
			const expirationDate = new Date(selectedDate);
			const daysToExpiration =
				(expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
			const T = daysToExpiration / 252;

			const optionData = {
				S: Number(currentStockPrice?.toFixed(2)) || 0,
				K: option.strike,
				T,
				r: Number(currentInterestRate?.toFixed(2)) / 100 || 0,
				sigma: option.impliedVolatility || 0
			};

			const res = await fetch(
				`/api/getOptionDelta?S=${optionData.S}&K=${optionData.K}&T=${optionData.T}&r=${optionData.r}&sigma=${optionData.sigma}`
			);
			if (!res.ok) throw new Error('Error fetching /api/optionsChain from client.');
			const delta = await res.json();
			optionDelta = delta.option_delta.toFixed(2);
		}
	};

	onMount(calculateDelta);
	onDestroy(() => {
		optionDelta = null;
	});
</script>

<div class="bg-base-300 card w-full">
	<div class="relative">
		<div class="2-full flex gap-5 p-6 pt-12">
			<div
				class="badge badge-lg badge-primary absolute left-0 top-0 rounded-bl-none text-lg font-semibold"
			>
				Strike: {formatPrice(option.strike)}
			</div>
			<div
				class={`badge badge-lg absolute right-0 top-0 rounded-br-none ${option.percentChange > 0 ? 'badge-success' : option.percentChange < 0 ? 'badge-error' : ''}`}
			>
				Change: {option.percentChange > 0 ? '+' : ''}{option.percentChange.toFixed(2)}%
			</div>

			<div class="flex w-full flex-col gap-2">
				<div class="flex w-full gap-2">
					<div>Value:</div>
					<div class="font-semibold">{formatPrice(option.lastPrice * 100)}</div>
				</div>

				<div class="flex w-full gap-2">
					<div>Bid:</div>
					<div class="font-semibold">{formatPrice(option.bid) || 0}</div>
				</div>

				<div class="flex w-full gap-2">
					<div>Ask:</div>
					<div class="font-semibold">{formatPrice(option.ask) || 0}</div>
				</div>

				<div class="flex w-full gap-2">
					<div>Volume:</div>
					<div class="font-semibold">{option.volume || 0}</div>
				</div>
			</div>

			<div class="flex w-full flex-col gap-2">
				<div class="flex w-full gap-2">
					<div>ITM:</div>
					<div class="font-semibold capitalize">{option.inTheMoney}</div>
				</div>

				<div class="flex w-full gap-2">
					<div>Open Interest:</div>
					<div class="font-semibold">{option.openInterest}</div>
				</div>

				<div class="flex w-full gap-2">
					<div>IV:</div>
					<div class="font-semibold">{formatPercent(option.impliedVolatility)}%</div>
				</div>

				<div class="flex w-full gap-2">
					<div>Delta:</div>
					<div class="font-semibold">
						{#if optionDelta === null}
							<span class="loading loading-spinner loading-xs"></span>
						{:else}
							{optionDelta}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
