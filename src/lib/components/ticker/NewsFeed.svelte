<script lang="ts">
	import NewsItem from '$lib/components/ticker/NewsItem.svelte';
	export let data: any;
	export let ticker: any;
</script>

{#if data.news}
	<div>
		<div class="text-lg font-semibold">{ticker.info.name} News</div>
		<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each data.news as newsItem}
				<div class="snap-center">
					<NewsItem {newsItem} />
				</div>
			{/each}
		</div>
	</div>
{/if}
