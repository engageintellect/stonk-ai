<script lang="ts">
	export let ticker: any;
	import { camelCaseToRegular } from '$lib/tickerModel';
	import Icon from '@iconify/svelte';
</script>

{#if ticker.analysis.recommendation !== ''}
	<div id="analyst-data">
		<div class="flex items-center gap-2">
			<div class="text-3xl font-semibold">Analyst Data</div>
			<!-- <Icon icon="carbon:text-link-analysis" class="text-primary h-10 w-10" /> -->
		</div>
		<div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each Object.entries(ticker.analysis) as [key, value]}
				{#if value}
					<div class="card bg-primary text-primary-content snap-center text-nowrap">
						<div class="card-body flex h-full w-full flex-col items-start justify-start gap-2 p-6">
							<div class="whitespace-nowrap font-thin capitalize">{camelCaseToRegular(key)}:</div>
							<div class="text-nowrap text-xl font-semibold uppercase">{value}</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
