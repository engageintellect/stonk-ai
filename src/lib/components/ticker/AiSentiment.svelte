<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	// import { createEventDispatcher } from 'svelte';

	let error = false;

	let res: any;
	export let data: any;
	let loading = false;
	let query = `Using the following financial data and newsfeed headlines, give a brief analysis and sentiment of ${data.ticker_info.symbol} (${data.ticker_info.shortName}). Be sure to write the output in plain html (no colors). I am primarily interested in the overall sentiment of the stock, as well as any notable financial data, patterns, or trends that you notice. Be sure that your analysis is concise, and written like an article (in sentences/paragraphs), or human conversation. Only include your sentiment alaysis in your response. Your response should be 5-7 sentences, max. Here is the data:`;
	let aiResponse = {
		message: ''
	};

	// const dispatch = createEventDispatcher();

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
		let audio = new Audio('/sounds/bleepBlop.mp3');
		audio.volume = volume; // Set the volume
		audio.play();
	};

	const sendRequest = async () => {
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

		// timeout after 5 seconds of no response
		// setTimeout(() => {
		// 	if (loading) {
		// 		loading = false;
		// 		aiResponse = {
		// 			message: 'Sorry, I am taking too long to respond. Please try again later.'
		// 		};
		// 	}
		// }, 5000);

		if (!response.ok) {
			//TODO: this is bullshit... fix it
			loading = false;
			aiResponse = {
				message: `<div class="flex flex-col gap-2"><div">Sorry, I am having trouble analyzing ${data.ticker_info.symbol}, or am not confident with my analysis.</div><div>Please try again later.</div></div>`
			};
			playNotificationSound(0.5);
			throw new Error('Error fetching /api/chatAi from client!!!');
		} else {
			res = await response.json();
			loading = false;
			playNotificationSound(0.5);
			aiResponse = res.message;
		}
	};
</script>

<div>
	<div class="ai-sentiment-text text-3xl font-semibold">AI Sentiment</div>

	<div class="mx-auto w-full max-w-2xl py-5">
		<div class="chat chat-start">
			<div class="chat-image avatar">
				<div class="border-primary h-10 w-10 rounded-full border shadow sm:h-16 sm:w-16">
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

			{#if aiResponse.message !== '' && !loading}
				<div class="chat-bubble w-full">
					<div transition:slide={{ delay: 0, duration: 500 }}>
						<div transition:fade={{ delay: 500, duration: 100 }}>
							{#if aiResponse.message}
								{@html aiResponse.message}
							{:else}
								{@html aiResponse}
							{/if}
						</div>
					</div>
				</div>
				<div class="chat-footer opacity-50">Delivered</div>
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
