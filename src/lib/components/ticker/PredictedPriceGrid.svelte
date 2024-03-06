<script lang="ts">
	export let predicted_prices: any = [];
</script>

{#if predicted_prices.length > 0}
	<div>
		<div class="text-lg font-semibold">Predicted Prices</div>
		<div class="my-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
		<div class=" animate-pulse text-lg font-semibold">Loading AI Response</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}
