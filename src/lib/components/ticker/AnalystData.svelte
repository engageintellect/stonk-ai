<script lang="ts">
	export let ticker: any;
	import { camelCaseToRegular } from '$lib/tickerModel';
</script>

{#if ticker.analysis.recommendation != ''}
	<div class="text-2xl font-semibold">Analyst Data</div>
	<div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">
		{#each Object.entries(ticker.analysis) as [key, value]}
			{#if value}
				<div class="bg-primary text-primary-content snap-center text-nowrap rounded">
					<div class="flex h-full w-full flex-col items-center justify-center gap-2 p-6">
						<div class="flex whitespace-nowrap font-thin capitalize">
							{camelCaseToRegular(key)}:
						</div>
						<div class=" text-xl font-semibold uppercase">{value}</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
