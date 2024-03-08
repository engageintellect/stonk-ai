<script lang="ts">
	import LearnMore from 'virtual:icons/carbon/ibm-watson-machine-learning';
	export let data: any;
	export let ticker: any;
</script>

{#if data.ticker_info.longBusinessSummary}
	<div>
		<div class="text-2xl font-semibold">Description</div>
		<div class="py-5">{data.ticker_info.longBusinessSummary}</div>
		<a class="btn btn-primary" href={ticker.info.website} target="_blank">
			<div class="flex items-center gap-1">
				<div>Learn More</div>
				<LearnMore class=" h-7 w-7" />
			</div>
		</a>
	</div>
{/if}
