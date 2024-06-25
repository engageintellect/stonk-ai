<script lang="ts">
	import NewsItem from '$lib/components/ticker/NewsItem.svelte';
	import Icon from '@iconify/svelte';

	export let data: any;
	export let ticker: any;
</script>

{#if data.news}
	<div id="news">
		<div class="text-3xl font-semibold">
			<div class="flex items-center gap-2">
				<span class="uppercase">{ticker.info.symbol}</span> News
				<!-- <Icon icon="fluent:news-28-regular" class="text-primary h-10 w-10" /> -->
			</div>
		</div>
		<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each data.news as newsItem}
				<div class="snap-center">
					<NewsItem {newsItem} />
				</div>
			{/each}
		</div>
	</div>
{/if}
