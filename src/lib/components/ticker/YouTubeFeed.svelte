<script lang="ts">
	let YOUTUBE_API_KEY = 'AIzaSyDXquVBOHplIeDlF-vEoVWaA1_2wgWREls';
	let max_result = '25';
	let response;
	let data: any;
	let term = 'palantir';
	import { onMount } from 'svelte';
	import NewsItem from './NewsItem.svelte';

	onMount(() => {
		const getData = async () => {
			const res = await fetch(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&type=video&key=${YOUTUBE_API_KEY}&maxResults=${max_result}&order=date`
			);
			response = await res.json();
			console.log(response);
			data = response;
		};
		getData();
	});
</script>

{#if data}
	<div class="">
		<div class="text-lg font-semibold">Related Videos</div>
		<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-2">
			{#each data.items as item}
				<div
					class="bg-primary text-primary-content flex w-full min-w-80 snap-center flex-col rounded p-2"
				>
					<a
						href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
						target="_blank"
						rel="noreferrer"
						class="flex h-full w-full flex-col"
					>
						<img
							src={item.snippet.thumbnails.high.url}
							alt=""
							class="h-40 w-full rounded object-cover"
						/>

						<div class="flex-grow font-thin capitalize">
							{item.snippet.title}:
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}
