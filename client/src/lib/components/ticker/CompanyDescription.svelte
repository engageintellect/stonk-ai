<script lang="ts">
	import Icon from '@iconify/svelte';
	export let data: any;
	export let ticker: any;
</script>

{#if data.ticker_info.longBusinessSummary}
	<div id="company-description">
		<div class="flex items-center gap-2">
			<div class="text-3xl font-semibold">Description</div>
			<!-- <Icon icon="mdi:text-box-outline" class="text-primary h-10 w-10" /> -->
		</div>
		<div class="py-5">{data.ticker_info.longBusinessSummary}</div>
		<a class="btn btn-secondary" href={ticker.info.website} target="_blank">
			<div class="flex items-center gap-1">
				<div>Learn More About {data.ticker_info.symbol}</div>
				<Icon icon="carbon:ibm-watson-machine-learning" class=" h-7 w-7" />
			</div>
		</a>
	</div>
{/if}
