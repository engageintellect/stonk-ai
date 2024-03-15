<script lang="ts">
	import { convertDate } from '$lib/tickerModel';

	export let newsItem = {
		title: 'Title',
		publisher: 'Publisher',
		link: 'https://www.example.com',
		thumbnail: {
			resolutions: [
				{
					url: 'https://www.example.com/image.jpg'
				},
				{
					url: 'https://www.example.com/image.jpg'
				}
			]
		},
		relatedTickers: ['AAPL', 'GOOGL'],
		providerPublishTime: 191939393
	};
</script>

<div class="group relative h-72 w-full min-w-80 rounded">
	<a href={newsItem.link} target="_blank" class="bg-primary group w-full">
		<div class="relative h-72 w-full">
			{#if newsItem.thumbnail?.resolutions[0].url}
				<img
					class="border-primary h-full w-full rounded border object-cover opacity-100 saturate-150"
					src={newsItem.thumbnail.resolutions[0].url}
					alt={newsItem.title}
				/>
			{/if}

			<!-- OVERLAY START -->
			<div
				class="bg-primary absolute left-0 top-0 h-full w-full rounded opacity-70 transition-all duration-300 sm:group-hover:opacity-80"
			></div>
			<!-- OVERLAY END -->
			<div class="text-secondary-content absolute bottom-0 z-20 flex w-80 flex-col p-6 drop-shadow">
				<div class="line-clamp-5 h-full w-full text-3xl font-semibold">
					{newsItem.title}
				</div>
				<div class="w-full font-thin">{newsItem.publisher}</div>
				<div class="w-full text-xs">{convertDate(newsItem.providerPublishTime)}</div>
				<div class="flex w-full flex-wrap gap-1 pt-2 text-xs">
					{#each newsItem.relatedTickers as tickerTag}
						<div class="badge badge-sm badge-primary flex-shrink-0 text-xs shadow">{tickerTag}</div>
					{/each}
				</div>
			</div>
		</div>
	</a>
</div>
