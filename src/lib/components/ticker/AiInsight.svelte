<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	let res: any;
	export let data: any;
	let loading = false;
	let query = `Using the financial data and newsfeed headlines, give me a brief analysis and sentiment of the stock. make sure to write the output in html. I am primarily interested in the overall sentiment of the stock, as well as any notable financial data, patterns, or trends. Make sure that your analysis is concise, and written like an article (in sentences/paragraphs), or human conversation. Only include your sentiment alaysis in your response. Your response should be 5-7 sentences, max.`;
	let aiResponse = {
		message: ''
	};

	onMount(async () => {
		await sendRequest();
	});

	async function sendRequest() {
		loading = true;
		query = `${String(query)} ${JSON.stringify(data)}`;
		console.log('searchString', query);
		const response = await fetch('/api/chatAi', {
			method: 'POST',
			body: JSON.stringify({ query }),
			headers: {
				'content-type': 'application/json'
			}
		});

		res = await response.json();
		loading = false;
		aiResponse = res.message;
	}
</script>

<div>
	<div class="text-2xl font-semibold">AI Insights</div>

	<div class="py-5">
		{#if loading}
			<div transition:fade={{ delay: 200, duration: 500 }}>Loading...</div>
		{/if}

		<!-- {#if data} -->
		<!-- {JSON.stringify(data.ticker_info)} -->
		<!-- {/if} -->

		{#if aiResponse.message !== ''}
			<div class="chat chat-start">
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS chat bubble component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</div>
				</div>
				<div class="chat-header">
					StonksBot
					<time class="text-xs opacity-50">
						{new Date().toLocaleTimeString()}
					</time>
				</div>
				<div class="chat-bubble">
					<div transition:fade={{ delay: 200, duration: 500 }} class="p-2">
						{@html aiResponse}
					</div>
				</div>
				<div class="chat-footer opacity-50">Delivered</div>
			</div>
			<!-- <div class="chat chat-end">
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS chat bubble component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</div>
				</div>
				<div class="chat-header">
					Anakin
					<time class="text-xs opacity-50">12:46</time>
				</div>
				<div class="chat-bubble">I hate you!</div>
				<div class="chat-footer opacity-50">Seen at 12:46</div>
			</div> -->
		{/if}

		<!-- <div class="flex w-full gap-2"> -->
		<!-- <input type="string" class="input input-primary w-full" bind:value={query} /> -->

		<!-- <button class="btn btn-primary" on:click={sendRequest}>submit</button> -->
		<!-- </div> -->
	</div>
</div>
