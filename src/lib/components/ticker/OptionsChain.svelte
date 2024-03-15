<script lang="ts">
	import { fade } from 'svelte/transition';
	import { get } from 'svelte/store';
	export let data: any;
	let calls: any;
	let options: any;

	let selectedDate: string = '';

	const clearSelectedDate = () => {
		selectedDate = '';
	};

	let selectedOption = ''; // Variable to store the selected option

	// Function to handle selection change
	const handleSelectionChange = (event: any) => {
		selectedOption = event.target.value;
	};

	const getOptionsChain = async (date: string) => {
		selectedDate = date;
		const res = await fetch(
			`/api/getOptionsChain/?ticker=${data.ticker_info.symbol}/&date=${date}`
		);
		if (!res.ok) {
			throw new Error('Error fetching /api/optionsChain from client.');
		}
		options = await res.json();
		return options;
	};
</script>

{#if data.options.length > 0}
	<div>
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-2">
				<div class="text-3xl font-semibold">Options Chain</div>
				<div class="badge badge-warning">Expiry Dates</div>
			</div>
			<!-- <BrainIcon class="text-primary h-10 w-10" /> -->
		</div>

		{#if selectedDate != ''}
			<div in:fade={{ delay: 0, duration: 300 }} class="my-5 flex items-center gap-2">
				<div class="text-3xl font-semibold">{selectedDate}</div>
				<div class="badge badge-primary badge-lg uppercase">{selectedOption}s</div>
				<!-- <button on:click={clearSelectedDate}>clear</button> -->
				<button
					in:fade={{ delay: 300, duration: 500 }}
					on:click={clearSelectedDate}
					class="btn btn-circle"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
				</button>
			</div>

			<div class="w-full">
				<div class="flex gap-2">
					<input
						class="btn btn-success w-1/2"
						type="radio"
						name="options"
						value="call"
						bind:group={selectedOption}
						on:change={handleSelectionChange}
						aria-label="Call"
					/>
					<input
						class="btn btn-error active:btn-info w-1/2"
						type="radio"
						name="options"
						value="put"
						bind:group={selectedOption}
						on:change={handleSelectionChange}
						aria-label="Put"
					/>
				</div>
			</div>

			<p>Selected Option: {selectedOption}</p>
			<!-- Display the selected option -->

			{#if selectedOption == 'call'}
				<div in:fade={{ delay: 0, duration: 300 }}>
					<div class="grid grid-cols-1 gap-2">
						{#each options.options.calls as call}
							<div class="bg-base-300 card w-full p-2">
								<div class="w-full">{call.strike}</div>
								<div class="w-full">{call.lastPrice}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			{#if selectedOption == 'put'}
				<div in:fade={{ delay: 0, duration: 300 }}>
					<div class="grid grid-cols-1 gap-2">
						{#each options.options.puts as put}
							<div class="bg-base-300 card w-full p-2">
								<div class="w-full">{put.strike}</div>
								<div class="w-full">{put.lastPrice}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{:else}
			<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">
				{#each data.options as strike_date}
					<button on:click={() => getOptionsChain(strike_date)} class="btn btn-primary">
						<div class="">{strike_date}</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="flex items-center gap-2">
		<div class=" animate-pulse text-3xl font-semibold">Fetching Options Chain...</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}
