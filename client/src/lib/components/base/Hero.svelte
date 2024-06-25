<script lang="ts">
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	let inputValue = '';
	let isLoading = writable(false); // Initialize loading state as false

	async function handleSubmit(event: any) {
		event.preventDefault(); // Prevent default form submission behavior
		const searchQuery = inputValue.trim();
		if (searchQuery) {
			isLoading.set(true); // Activate loading state
			try {
				// Simulate a delay for demonstration purposes (replace with actual API request)
				await new Promise((resolve) => setTimeout(resolve, 2000));
				goto(`/ticker/${encodeURIComponent(searchQuery)}`);
			} catch (error) {
				console.error('Error:', error);
				// Handle error if necessary
			} finally {
			}
		}
	}
</script>

<div
	class="hero rounded"
	style="background-image: url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
>
	<div class="hero-overlay rounded bg-opacity-60"></div>
	<div class="hero-content text-neutral-content text-center">
		<div class="max-w-md">
			<div class="mx-auto flex w-full max-w-lg flex-col items-center justify-center">
				<div class="py-5 text-7xl">Stonk AI</div>
				<div class="font-thin">
					Labore id consectetur proident id ipsum magna consectetur ut sunt officia et non. Nostrud
					veniam
				</div>

				<form on:submit={handleSubmit} class="w-full">
					<label class="input input-bordered flex w-full items-center gap-2 py-5">
						<input type="text" class="w-full grow" placeholder="Search" bind:value={inputValue} />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="h-4 w-4 opacity-70"
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
							<span class="loading loading-infinity loading-lg"></span>
						{:else}
							<div>Search</div>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
