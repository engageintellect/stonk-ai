<script lang="ts">
	export let ticker: any;
</script>

{#if ticker.analysis.recommendation != ''}
	<div class="">
		<div class="text-lg font-semibold">Analyst Data</div>
		<div class="flex gap-2 overflow-auto py-5">
			{#each Object.entries(ticker.analysis) as [key, value]}
				{#if value}
					<div class="bg-accent text-accent-content rounded p-6">
						<div class="flex flex-col items-center justify-center gap-2">
							<div class="font-thin capitalize">{key}:</div>
							<div class=" text-xl font-semibold uppercase">{value}</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
