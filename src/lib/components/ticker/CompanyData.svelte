<script lang="ts">
	export let ticker: any;
	import { camelCaseToRegular, formatPrice } from '$lib/tickerModel';
</script>

{#if ticker.analysis.recommendation !== ''}
	<div
		id="company-data"
		class="flex snap-x snap-mandatory flex-nowrap gap-2 overflow-auto text-nowrap"
	>
		{#each Object.entries(ticker) as [key, value]}
			{#if key !== 'info' && key !== 'analysis' && value && Object.values(value).some((x) => x)}
				<div class="flex flex-col gap-2 rounded pb-5">
					<div class="snap-center pb-3 text-3xl font-semibold capitalize">{key}</div>
					{#each Object.entries(value) as [prop, propValue]}
						{#if propValue}
							<div class="card bg-primary text-primary-content">
								<div class="card-body p-5">
									<div class="flex w-full justify-between gap-5 bg-red-200">
										<div class="w-full whitespace-nowrap font-semibold capitalize">
											{prop === 'fiftyTwoWeekRange'
												? `${camelCaseToRegular(prop)}: ${propValue.percentage.toFixed(0)}%`
												: camelCaseToRegular(prop)}:
										</div>
										<div>{prop === 'fiftyTwoWeekRange' ? null : propValue}</div>
									</div>
								</div>
								{#if prop === 'fiftyTwoWeekRange'}
									<div class="flex items-center gap-1 p-5">
										<div class="text-xs">{formatPrice(propValue.low)}</div>
										<progress
											class="progress progress-accent border-accent h-5 w-full border"
											value={propValue.percentage}
											max="100"
										></progress>
										<div class="text-xs">{formatPrice(propValue.high)}</div>
									</div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
{/if}

<!-- {#if ticker.analysis.recommendation != ''}
	<div class="flex snap-x snap-mandatory flex-nowrap gap-2 overflow-auto text-nowrap">
		{#each Object.entries(ticker) as [key, value]}
			{#if key !== 'info' && key !== 'analysis'}
				{#if value && Object.values(value).some((x) => x)}
					<div class="flex flex-col gap-2 rounded pb-5">
						<div class="snap-center pb-3 text-3xl font-semibold capitalize">{key}</div>
						{#each Object.entries(value) as [prop, propValue]}
							{#if propValue}
								<div class=" bg-primary text-primary-content rounded p-2">
									<div class="flex gap-2">
										{#if prop === 'fiftyTwoWeekRange'}
											<div class="flex w-full flex-col justify-between gap-5">
												<div class="w-full text-nowrap font-semibold capitalize">
													<div class="flex w-full items-center justify-between gap-2">
														<div>
															{camelCaseToRegular(prop)}:
														</div>
														<div class="font-thin">{propValue.percentage.toFixed(0)}%</div>
													</div>
												</div>
												<div class="flex items-center gap-1">
													<div class="text-xs">{formatPrice(propValue.low)}</div>
													<progress
														class="progress progress-warning border-warning h-3 w-full min-w-32 border"
														value={propValue.percentage}
														max="100"
													></progress>
													<div class="text-xs">{formatPrice(propValue.high)}</div>
												</div>
											</div>
										{:else}
											<div class="flex w-full justify-between gap-5">
												<div class="w-full whitespace-nowrap font-semibold capitalize">
													{camelCaseToRegular(prop)}:
												</div>
												<div class="">{propValue}</div>
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			{/if}
		{/each}
	</div>
{/if} -->
