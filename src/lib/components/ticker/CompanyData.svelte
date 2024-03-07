<script lang="ts">
	export let ticker: any;
	import { camelCaseToRegular, formatPrice } from '$lib/tickerModel';
	import { formatPercent } from '$lib/tickerModel';
</script>

<div class="">
	<div class="flex snap-x snap-mandatory gap-2 overflow-auto">
		{#each Object.entries(ticker) as [key, value]}
			{#if key !== 'info' && key !== 'analysis'}
				{#if value && Object.values(value).some((x) => x)}
					<div class="flex flex-col gap-2 rounded pb-5">
						<div class="snap-center pb-3 text-lg font-semibold capitalize">{key}</div>
						{#each Object.entries(value) as [prop, propValue]}
							{#if propValue}
								<div class=" bg-primary text-primary-content rounded p-2 text-sm">
									<div class="flex gap-2">
										{#if prop === 'fiftyTwoWeekRange'}
											<div class="flex flex-col gap-2">
												<div class="text-nowrap font-semibold capitalize">
													<div class="flex gap-2">
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
											<div class="text-nowrap font-semibold capitalize">
												{camelCaseToRegular(prop)}:
											</div>
											<div class="">{propValue}</div>
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
</div>
