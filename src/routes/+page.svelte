<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { searchTicker } from '$lib/store';
	let inputValue = '';
	let isLoading = writable(false);

	async function handleSubmit(event: any) {
		event.preventDefault();
		const searchQuery = inputValue.trim();
		searchTicker.set(searchQuery);
		if (searchQuery) {
			isLoading.set(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				goto(`/ticker/${encodeURIComponent(searchQuery)}`);
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}

	export let option = {
		contractSymbol: 'AAPL220121C00100000',
		strike: 100,
		lastPrice: 0.01,
		bid: 0.01,
		ask: 0.01,
		change: 0,
		percentChange: 0,
		volume: 0,
		openInterest: 0,
		impliedVolatility: 0,
		inTheMoney: 'true',
		contractSize: 'REGULAR'
	};
</script>

<div
	class="mx-auto flex w-full flex-col items-center justify-center gap-3 py-5 transition-all duration-300 sm:py-20"
>
	<div class="flex items-center gap-2">
		<div class="">
			{#if $isLoading}
				<div
					in:fade={{ delay: 0, duration: 200 }}
					class="bg-primary flex h-20 w-20 items-center justify-center rounded-full shadow transition-all duration-500 sm:h-24 sm:w-24"
				>
					<span class="loading loading-ring loading-lg text-primary-content"></span>
				</div>
			{:else}
				<Icon
					icon="icon-park-twotone:stock-market"
					class="text-primary-content btn btn-primary h-20 w-20 sm:h-24 sm:w-24"
				/>
			{/if}
		</div>
		<div class="align-middle text-7xl font-thin sm:text-8xl">stonk ai</div>
	</div>

	{#if $isLoading}
		<div class="flex items-end gap-1 font-thin" transition:fade={{ delay: 0, duration: 500 }}>
			<div>
				Searching <span class=" uppercase">{inputValue}</span>
			</div>

			<div>...</div>
		</div>
	{:else}
		<div class="font-thin">AI enhanced financial sentiment & analysis engine.</div>
	{/if}

	<form on:submit={handleSubmit} class="flex w-full max-w-sm flex-col gap-3">
		<div class="w-full">
			<label class="input input-bordered flex w-full items-center gap-2 focus-within:outline-none">
				<input
					autofocus
					type="text"
					class="grow uppercase"
					placeholder="Enter a stock ticker..."
					bind:value={inputValue}
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-7 w-7 opacity-70"
				>
					<path
						fill-rule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clip-rule="evenodd"
					/>
				</svg>
			</label>

			<div class="flex w-full max-w-lg items-center gap-2 pt-5">
				<div class="w-full">
					<button type="submit" class="btn btn-primary w-full">
						{#if $isLoading}
							<span class="loading loading-infinity loading-md scale-125"></span>
						{:else}
							<div class="flex items-center gap-2">
								<div class="uppercase">search</div>
								<div>
									<Icon icon="bi:send-fill" class="h-5 w-5" />
								</div>
							</div>
						{/if}
					</button>
				</div>

				<div class="w-full">
					<a href="/about" class="btn btn-outline w-full">
						<div class="flex items-center gap-2">
							<div class="uppercase">Learn More</div>
							<div>
								<Icon icon="carbon:machine-learning-model" class="h-5 w-5" />
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</form>
</div>
