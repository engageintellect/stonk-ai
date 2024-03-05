<script lang="ts">
	function convertDate(timestampInSeconds: number): string {
		const date = new Date(timestampInSeconds * 1000);
		return date.toLocaleString(); // This will format the date based on the user's locale
	}

	export let newsItem = {
		title: 'Title',
		publisher: 'Publisher',
		link: 'https://www.example.com',
		thumbnail: {
			resolutions: [
				{
					url: 'https://www.example.com/image.jpg'
				}
			]
		},
		relatedTickers: ['AAPL', 'GOOGL'],
		providerPublishTime: 191939393
	};
</script>

<div class="group h-72 w-full min-w-80 rounded">
	<a href={newsItem.link} class="bg-primary relative w-full">
		<img
			class="border-primary h-full w-full rounded border object-cover opacity-40 saturate-150 sm:group-hover:blur-sm"
			src={newsItem.thumbnail.resolutions[0].url}
			alt={newsItem.title}
		/>
		<div class="absolute bottom-0 flex w-80 flex-col p-6 drop-shadow">
			<div class="w-full text-lg font-semibold">{newsItem.title}</div>
			<div class="w-full font-thin">{newsItem.publisher}</div>
			<div class="w-full text-xs">{convertDate(newsItem.providerPublishTime)}</div>
			<div class="flex w-full flex-wrap gap-1 pt-2 text-xs">
				{#each newsItem.relatedTickers as tickerTag}
					<div class="badge badge-sm badge-primary flex-shrink-0 text-xs">{tickerTag}</div>
				{/each}
			</div>
		</div>
	</a>
</div>
