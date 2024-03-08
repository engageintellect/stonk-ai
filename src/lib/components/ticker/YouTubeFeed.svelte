<script lang="ts">
	let YOUTUBE_API_KEY = 'AIzaSyDyOcVMZnI_jBCE9_w88gtugswbGwvwMKE';
	let max_result = '25';
	let response;
	let data: any;
	export let ticker: any;
	let term = `${ticker.info.name} stock news`;
	import { onMount } from 'svelte';
	import { prettifyDate } from '$lib/tickerModel';

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
		<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">
			{#each data.items as item}
				<div
					class="bg-primary text-primary-content group flex w-full min-w-80 snap-center flex-col rounded"
				>
					<a
						href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
						target="_blank"
						rel="noreferrer"
						class="flex h-full w-full flex-col"
					>
						<div class="flex flex-col overflow-hidden">
							<div class="p-2">
								<div class="badge badge-outline flex-grow rounded p-2 text-sm font-thin capitalize">
									{prettifyDate(item.snippet.publishTime)}
								</div>
							</div>

							<img
								src={item.snippet.thumbnails.high.url}
								alt=""
								class="h-40 w-full object-cover opacity-70 saturate-150 transition-opacity duration-300 hover:scale-105 sm:group-hover:opacity-80"
							/>

							<div class="flex-grow p-2 font-thin capitalize">
								{item.snippet.title}
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}
