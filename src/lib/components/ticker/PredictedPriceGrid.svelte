<script lang="ts">
	export let predicted_prices: any;
</script>

<div class="my-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
	{#each predicted_prices as price}
		<div class="bg-base-300 w-full rounded p-2">
			<div class="w-full">{price.date}</div>
			<div class="w-full">{price.price}</div>
		</div>
	{/each}
</div>
