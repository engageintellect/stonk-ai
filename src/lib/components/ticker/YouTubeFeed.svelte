<script lang="ts">
	let response;
	let data: any;
	export let ticker: any;
	import { onMount } from 'svelte';
	import { prettifyDate } from '$lib/tickerModel';
	import Alert from '$lib/components/base/Alert.svelte';
	import YouTubeIcon from 'virtual:icons/tabler/brand-youtube-filled';
	import Toast from '$lib/components/base/Toast.svelte';

	onMount(async () => {
		const res = await fetch(`/api/queryYouTube/?value=${ticker.info.symbol}`);
		if (!res.ok) {
			throw new Error('Error fetching /api/queryYouTube from client.');
		}
		response = await res.json();
		data = response;
	});
</script>

<div>
	<div class="text-3xl font-semibold">{ticker.info.symbol} Videos</div>
	{#if data}
		<div class="">
			<div class="flex items-center gap-2">
				<!-- <YouTubeIcon class="text-primary h-10 w-10" /> -->
			</div>
			<div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">
				{#each data.items as item}
					<div
						class="bg-primary text-primary-content group flex w-full min-w-72 max-w-80 snap-center flex-col rounded"
					>
						<a
							href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
							target="_blank"
							rel="noreferrer"
							class="border-primary flex h-full w-full flex-col rounded border"
						>
							<div class="flex flex-col overflow-hidden">
								<div class="p-2">
									<div
										class="badge badge-outline flex-grow rounded p-2 text-sm font-thin capitalize"
									>
										{prettifyDate(item.snippet.publishTime)}
									</div>
								</div>

								<div class="relative h-full max-h-40 overflow-hidden">
									<img
										src={item.snippet.thumbnails.high.url}
										alt=""
										class="h-40 w-full scale-105 object-cover saturate-150 transition-all duration-300 sm:group-hover:scale-[107%]"
									/>

									<div
										class="bg-primary absolute left-0 top-0 h-40 w-full opacity-0 transition-all duration-300 sm:opacity-40 sm:group-hover:opacity-20"
									></div>
								</div>

								<div class="flex-grow p-2 text-lg font-semibold capitalize">
									{item.snippet.title}
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- <Toast /> -->
		<div class="py-5">
			<Alert alertMsg="Video API may be tired..." alertType="warning" />
		</div>

		<!-- <div class="">
		<div class="flex items-center gap-2">
			<span class="animate-pulse">Video API may be tired...</span>
			<span class="		loading loading-ring text-primary"></span>
		</div>
	</div> -->
	{/if}
</div>
