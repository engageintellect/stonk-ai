<script lang="ts">
	import { formatPercent, formatPrice } from '$lib/tickerModel';

	export let option = {
		contractSymbol: 'AAPL220121C00100000',
		strike: 100,
		lastPrice: 0.01,
		bid: 0.01,
		ask: 0.01,
		change: 0,
		percentChange: 0,
		volume: 0,
		openInterest: 0,
		impliedVolatility: 0,
		inTheMoney: 'true',
		contractSize: 'REGULAR'
	};
</script>

<div class="bg-base-300 card w-full">
	<div class="card-body">
		<!-- <div class="w-full">{option.contractSymbol}</div> -->

		<div class="flex gap-5">
			<div>
				<div class="w-full">Strike: {formatPrice(option?.strike)}</div>
				<div class="w-full">% Change: {option?.percentChange.toFixed(2) + '%' || 0}</div>
				<div class="w-full">Last Price: {formatPrice(option?.lastPrice)}</div>
				<div class="w-full">Bid: {formatPrice(option?.bid)}</div>
				<div class="w-full">Ask: {formatPrice(option?.ask)}</div>
			</div>

			<div>
				<div class="w-full">ITM: <span class="capitalize">{option?.inTheMoney}</span></div>

				<div class="w-full">Volume: {option?.volume}</div>
				<div class="w-full">Open Interest: {option?.openInterest}</div>
				<div class="w-full">IV: {formatPercent(option?.impliedVolatility)}%</div>
				<div class="w-full">Size: {option?.contractSize}</div>
			</div>
		</div>
	</div>
</div>
