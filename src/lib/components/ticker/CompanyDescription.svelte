<script lang="ts">
	import DescriptionIcon from 'virtual:icons/mdi/text-box-outline';
	import LearnMore from 'virtual:icons/carbon/ibm-watson-machine-learning';
	export let data: any;
	export let ticker: any;
</script>

{#if data.ticker_info.longBusinessSummary}
	<div id="company-description">
		<div class="flex items-center gap-2">
			<div class="text-3xl font-semibold">Description</div>
			<!-- <DescriptionIcon class="text-primary h-10 w-10" /> -->
		</div>
		<div class="py-5">{data.ticker_info.longBusinessSummary}</div>
		<a class="btn btn-secondary" href={ticker.info.website} target="_blank">
			<div class="flex items-center gap-1">
				<div>Learn More About {data.ticker_info.symbol}</div>
				<LearnMore class=" h-7 w-7" />
			</div>
		</a>
	</div>
{/if}
