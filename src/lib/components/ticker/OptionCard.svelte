<script lang="ts">
	import { formatPercent, formatPrice } from '$lib/tickerModel';
	import { onMount } from 'svelte';
	import jstat from 'jstat';

	export let data: any;
	export let selectedDate: any;
	let d: any;
	let cdate: any;
	let edate: any;
	let ttime: any;

	let currentStockPrice: number | null = null; // Initialize with null
	let currentInterestRate: number | null = null;
	let optionDelta: number | null = null; // Initialize with null
	let isDataLoaded = false; // Flag to track if data is loaded

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
		const interestRates = res.json();
		return interestRates;
	};

	interface OptionData {
		S: number; // Current price of the underlying asset
		K: number; // Strike price of the option
		T: number; // Time to expiration in years
		r: number; // Risk-free interest rate
		sigma: number; // Volatility of the underlying asset
	}

	// function calculateDelta(option: OptionData): number {
	// 	const d1: number =
	// 		(Math.log(option.S / option.K) + (option.r + option.sigma ** 2 / 2) * option.T) /
	// 		(option.sigma * Math.sqrt(option.T));

	// 	const N_d1: number = jstat.normal.cdf(d1, 0, 1);

	// 	return N_d1;
	// }

	function calculateDelta(option: OptionData): number {
		const d1: number =
			(Math.log(option.S / option.K) + (option.r + option.sigma ** 2 / 2) * option.T) /
			(option.sigma * Math.sqrt(option.T));

		const N_d1: number = jstat.normal.cdf(d1, 0, 1);
		console.log('d1:', d1);
		console.log('N_d1:', N_d1);

		return N_d1;
	}

	onMount(async () => {
		const interestRates = await getInterestRates();
		currentInterestRate = interestRates;
		console.log('Current Interest Rate:', interestRates);

		currentStockPrice = data.price_history.slice(-1)[0]['Close'];
		isDataLoaded = true; // Set data loaded flag to true
	});

	// Calculate the time to expiration in years
	$: if (isDataLoaded && selectedDate) {
		const currentDate = new Date();
		const expirationDate = new Date(selectedDate);
		cdate = currentDate;
		edate = expirationDate;

		// Calculate the time difference in milliseconds
		const timeDifference = expirationDate.getTime() - currentDate.getTime();
		ttime = timeDifference;

		// Convert milliseconds to days and then to years
		const millisecondsInDay = 1000 * 60 * 60 * 24;
		const daysToExpiration = timeDifference / millisecondsInDay;
		const daysInYear = 252; // Considering leap years
		const T = daysToExpiration / daysInYear;

		const optionData: OptionData = {
			// S: Number(currentStockPrice?.toFixed(2)) || 0, // Default to 0 if currentStockPrice is null
			// K: option.strike,
			// T: T,
			// r: Number(currentInterestRate?.toFixed(2)) || 0, // Default to 0 if currentInterestRate is null
			// sigma: option.impliedVolatility

			S: 509.83,
			K: 510,
			T: 0.079365079365079,
			r: 0.0524,
			sigma: 0.53
		};

		// Calculate optionDelta once all data is available
		optionDelta = calculateDelta(optionData);
		d = optionData;
		console.log('Delta =', optionDelta);
	}
</script>

<!-- Option Data: {JSON.stringify(optionData)} -->
<!-- <div>delta: {optionDelta}</div> -->
<!-- <div>current price: {currentStockPrice}</div> -->
<!-- <div>current interest rate: {currentInterestRate}</div> -->
<!-- <div>Optiondata {JSON.stringify(optionData, null, 2)}</div> -->

<!-- {JSON.stringify(option)} -->
{JSON.stringify(optionDelta)}

{JSON.stringify(d)}
{JSON.stringify(cdate)}
{JSON.stringify(edate)}
{JSON.stringify(ttime)}

<div class="bg-base-300 card w-full">
	<div class=" relative">
		<div class="flex justify-between gap-5 p-6 pt-12">
			<div class="badge badge-lg badge-primary absolute left-0 top-0 rounded-bl-none font-semibold">
				Strike: {formatPrice(option?.strike)}
			</div>
			{#if option?.percentChange > 0}
				<div class="badge badge-success badge-lg absolute right-0 top-0 rounded-br-none">
					+{option?.percentChange.toFixed(2) + '%' || 0}
				</div>
			{:else if option?.percentChange < 0}
				<div class="badge badge-error badge-lg absolute right-0 top-0 rounded-br-none">
					{option?.percentChange.toFixed(2) + '%' || 0}
				</div>
			{:else}
				<div class="badge badge-lg absolute right-0 top-0 rounded-br-none">
					{option?.percentChange.toFixed(2) + '%' || 0}
				</div>
			{/if}

			<div>
				<div class="w-full">Last Price: {formatPrice(option?.lastPrice)}</div>
				<div class="w-full">Bid: {formatPrice(option?.bid)}</div>
				<div class="w-full">Ask: {formatPrice(option?.ask)}</div>
				<div class="w-full">Volume: {option?.volume || 0}</div>
			</div>

			<div>
				<div class="w-full">ITM: <span class="capitalize">{option?.inTheMoney}</span></div>
				<div class="w-full">Open Interest: {option?.openInterest}</div>
				<div class="w-full">IV: {formatPercent(option?.impliedVolatility)}%</div>
				<div class="w-full">Size: {option?.contractSize}</div>
			</div>
		</div>
	</div>
</div>
