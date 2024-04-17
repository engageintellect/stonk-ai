<script lang="ts">
	import { formatPrice } from '$lib/tickerModel';
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { useChat } from 'ai/svelte';
	import OpenAiIcon from 'virtual:icons/simple-icons/openai';
	import robotImage from '$lib/assets/robot14-nobg.png';

	let msgStatus = 'Typing...';

	let triggerGenerate = false;

	const { input, handleSubmit, messages } = useChat({
		api: '/api/chatAiStream',
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

	let query = `Using the provided financial data and recent news headlines, analyze the data and provide a brief analysis and sentiment of ${data.ticker_info.symbol} (${data.ticker_info.shortName}). Present your analysis in HTML format without color emphasis. Focus on assessing the overall sentiment of the stock and highlight any significant financial data, patterns, or trends observed. Keep your analysis concise, resembling an article or human conversation, spanning 5-8 sentences at most. Closing prices for the last ${String(getHistoryLength(data))} days (from oldest to newest): ${JSON.stringify(data.price_history.slice(-getHistoryLength(data)).map((item: any) => formatPrice(item['Close'])))} Recent newsfeed: ${JSON.stringify(data.news.map((item: any) => ({ date: item['providerPublishTime'], title: item['title'] })))}
    Company and financial data overview: ${JSON.stringify(data.ticker_info)}.`;

	let observer: IntersectionObserver;

	const playNotificationSound = (volume: number) => {
		let audio = new Audio('/sounds/softBleep.mp3');
		audio.volume = volume;
		audio.play();
	};

	const sendRequest = async () => {
		triggerGenerate = true;
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
		console.log('Request sent.');
		loading = false;
	};
</script>

<div id="ai-sentiment">
	<div class="text-3xl font-semibold">AI Sentiment</div>

	{#if !triggerGenerate}
		<div class="flex flex-col items-center gap-2 py-5 sm:flex-row">
			<button class="btn btn-lg btn-accent w-full sm:flex-1" on:click={sendRequest}>
				<div class="flex items-center gap-2">
					<div class="">Get AI Sentiment</div>
					<div>
						<OpenAiIcon class="h-7 w-7" />
					</div>
				</div>
			</button>

			<a href="https://stonkai-chat.vercel.app" class="btn btn-lg btn-accent w-full sm:flex-1">
				<div class="flex items-center gap-2">
					<div class="">Chat with StonkAI</div>
					<div>
						<!-- <OpenAiIcon class="h-5 w-5" /> -->
						<img
							src={robotImage}
							class="bg-primary border-primary h-7 w-7 rounded-full border shadow"
							alt="robot"
						/>
					</div>
				</div>
			</a>
		</div>
	{:else}
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
						{#each $messages as message}
							{#if message.role === 'assistant'}
								<div class="message-content">
									{@html message.content
										.replace(/<p>/g, '<p class="py-2">')
										.replace(/<h2>/g, '<h2 class="text-primary py-2 text-lg font-semibold">')
										.replace(/<h3>/g, '<h3 class="text-primary py-2 font-semibold">')}
								</div>
							{/if}
						{/each}
					</div>
					<div class="chat-footer opacity-50">{msgStatus}</div>
				{/if}
			</div>

			{#if msgStatus === 'Delivered.'}
				<a
					in:fade={{ delay: 0, duration: 500 }}
					href="https://stonkai-chat.vercel.app"
					class="btn btn-lg btn-accent mt-5 w-full"
				>
					<div class="flex items-center gap-2">
						<div class="">Chat with StonkAI</div>
						<div>
							<!-- <OpenAiIcon class="h-5 w-5" /> -->
							<img
								src={robotImage}
								class="bg-primary border-primary h-7 w-7 rounded-full border"
								alt="robot"
							/>
						</div>
					</div>
				</a>
			{/if}
		</div>
	{/if}
</div>
