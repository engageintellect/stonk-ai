<script lang="ts">
	import { formatPrice } from '$lib/tickerModel';
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { useChat } from 'ai/svelte';

	let msgStatus = 'Typing...';

	const { input, handleSubmit, messages } = useChat({
		api: '/api/chat',
		onFinish() {
			msgStatus = 'Delivered.';
			playNotificationSound(0.3);
		}
	});

	const getHistoryLength = (data: any) => {
		if (data.price_history) {
			return data.price_history.length;
		} else {
			return 0;
		}
	};

	export let data: any;
	let loading = false;
	let query = `Using the following financial data and newsfeed headlines, give a brief analysis and sentiment of ${data.ticker_info.symbol} (${data.ticker_info.shortName}). Be sure to write the output in plain html (no colors). I am primarily interested in the overall sentiment of the stock, as well as any notable financial data, patterns, or trends that you notice. Be sure that your analysis is concise, and written like an article (in sentences/paragraphs), or human conversation. Only include your sentiment alaysis in your response. Your response should be 5-8 sentences, max. Here are the closing prices for the last ${String(getHistoryLength(data))} days (oldest to newest): ${JSON.stringify(data.price_history.slice(-getHistoryLength(data)).map((item: any) => formatPrice(item['Close'])))} Here is the recent newsfeed: ${JSON.stringify(data.news.map((item: any) => ({ date: item['providerPublishTime'], title: item['title'] })))}. Here is all the company and financial data: ${JSON.stringify(data.ticker_info)}.`;

	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					sendRequest();
					observer.unobserve(entry.target);
				}
			});
		});

		const targetElement = document.querySelector('.chat-header');
		if (targetElement) {
			observer.observe(targetElement);
		}
	});

	const playNotificationSound = (volume: number) => {
		let audio = new Audio('/sounds/softBleep.mp3');
		audio.volume = volume;
		audio.play();
	};

	const sendRequest = async () => {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		input.set(query);
		const syntheticEvent = {
			preventDefault() {}, // Shorthand notation for defining a function
			stopPropagation() {}, // Shorthand notation for defining a function
			target: {
				value: $input // Access the value of the writable store directly using the $ prefix
			}
		} as Event & { target: { value: string } }; // Type assertion

		console.log('Sending request to AI...');
		handleSubmit(syntheticEvent); // Pass the synthetic event object to handleSubmit
		loading = false;
	};
</script>

<div id="ai-sentiment">
	<div class="text-3xl font-semibold">AI Sentiment</div>

	<div class="mx-auto w-full max-w-2xl py-5">
		<div class="chat chat-start">
			<div class="chat-image avatar">
				<div class="border-primary h-10 w-10 rounded-full border-2 shadow sm:h-16 sm:w-16">
					<img
						alt="Tailwind CSS chat bubble component"
						src="/images/robotAvatar.png"
						class="scale-x-[-1]"
						in:fade={{ delay: 0, duration: 500 }}
					/>
				</div>
			</div>
			<div class="chat-header flex items-center gap-2">
				<div>StonkBot</div>
				<div>
					<time class="text-xs opacity-50">
						{new Date().toLocaleTimeString()}
					</time>
				</div>
			</div>

			{#if loading}
				<div class="chat-bubble w-full">
					<div class="flex place-items-end p-2">
						<span class="loading loading-dots loading-sm"></span>
					</div>
				</div>
				<div class="chat-footer opacity-50">Typing...</div>
			{/if}

			{#if $messages.length > 0 && !loading}
				<div class="chat-bubble w-full">
					<div transition:slide={{ delay: 0, duration: 500 }}>
						<div transition:fade={{ delay: 0, duration: 100 }}>
							{#each $messages as message}
								{#if message.role === 'assistant'}
									{@html message.content}
								{/if}
							{/each}
						</div>
					</div>
				</div>
				<div class="chat-footer opacity-50">{msgStatus}</div>
			{/if}
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

		<!-- <div class="flex w-full gap-2"> -->
		<!-- <input type="string" class="input input-primary w-full" bind:value={query} /> -->

		<!-- <button class="btn btn-primary" on:click={sendRequest}>submit</button> -->
		<!-- </div> -->
	</div>
</div>

<style>
	.chat-bubble {
		width: 100%;
	}
</style>
