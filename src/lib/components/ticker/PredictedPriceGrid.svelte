<script lang="ts">
	export let predicted_prices: any = [];
	import BrainIcon from 'virtual:icons/lucide/brain';
</script>

{#if predicted_prices.length > 0}
	<div>
		<div class="flex items-center gap-2">
			<div class="text-3xl font-semibold">Predicted Prices</div>
			<!-- <BrainIcon class="text-primary h-10 w-10" /> -->
		</div>
		<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">
			{#each predicted_prices as price}
				<div class="bg-base-300 w-full rounded p-2">
					<div class="w-full">{price.date}</div>
					<div class="w-full">{price.price}</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex items-center gap-2">
		<div class=" animate-pulse text-lg font-semibold">Generating AI Response</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}
