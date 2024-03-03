<script lang="ts">
	import Roadmap from '$lib/components/Roadmap.svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import StockMarket from 'virtual:icons/icon-park-solid/stock-market';
	import Send from 'virtual:icons/bi/send-fill';
	let inputValue = '';
	let isLoading = writable(false); // Initialize loading state as false

	async function handleSubmit(event: any) {
		event.preventDefault(); // Prevent default form submission behavior
		const searchQuery = inputValue.trim();
		if (searchQuery) {
			isLoading.set(true); // Activate loading state
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				goto(`/ticker/${encodeURIComponent(searchQuery)}`);
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}
</script>

<div class="mx-auto flex w-full max-w-lg flex-col items-center justify-center py-5 sm:py-10">
	<div class="flex items-center gap-2 text-7xl">
		<StockMarket class="bg-primary text-primary-content h-20 w-20 rounded px-4 py-2" />
		<div class="my-5 font-thin">Stonk AI</div>
	</div>

	{#if $isLoading}
		<div class="animate-pulse font-thin">
			Searching <span class="uppercase">{inputValue}</span>...
		</div>
	{:else}
		<div class="font-thin">Find the latest stock information for any company</div>
	{/if}

	<form on:submit={handleSubmit} class="w-full">
		<label class="input input-bordered my-5 flex w-full items-center gap-2">
			<input
				autofocus
				type="text"
				class="w-full grow uppercase"
				placeholder="Search..."
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
		<button type="submit" class="btn btn-primary w-full">
			{#if $isLoading}
				<span class="loading loading-infinity loading-md scale-125"></span>
			{:else}
				<div class="flex items-center gap-2">
					<div class="uppercase">search</div>
					<div>
						<Send class="h-5 w-5" />
					</div>
				</div>
			{/if}
		</button>
	</form>
</div>

<!-- <Roadmap /> -->
