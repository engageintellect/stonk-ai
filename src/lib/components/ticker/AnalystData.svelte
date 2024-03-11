<script lang="ts">
	export let ticker: any;
	import { camelCaseToRegular } from '$lib/tickerModel';
	import AnalysisIcon from 'virtual:icons/carbon/text-link-analysis';
</script>

{#if ticker.analysis.recommendation != ''}
	<div class="">
		<div class="flex items-center gap-2">
			<div class="text-2xl font-semibold">Analyst Data</div>
			<!-- <AnalysisIcon class="text-primary h-10 w-10" /> -->
		</div>
		<div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each Object.entries(ticker.analysis) as [key, value]}
				{#if value}
					<div class="bg-primary text-primary-content snap-center text-nowrap rounded">
						<div class="flex h-full w-full flex-col items-center justify-center gap-2 p-6">
							<div class="flex whitespace-nowrap font-thin capitalize">
								{camelCaseToRegular(key)}:
							</div>
							<div class="text-nowrap text-xl font-semibold uppercase">{value}</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
