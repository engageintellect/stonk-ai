<script lang="ts">
	import { fade } from 'svelte/transition';
	export let data: any;
	import OptionCard from './OptionCard.svelte';

	let options: any;
	let selectedDate: string = '';
	let selectedOption = '';

	const clearSelectedDate = () => {
		selectedDate = '';
	};

	// Function to handle selection change
	const handleSelectionChange = (value: string) => {
		selectedOption = value;
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
	<div id="options">
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-2">
				<div class="text-3xl font-semibold">Options Chain</div>
				<div class="badge badge-warning">Expiration Dates</div>
			</div>
		</div>

		{#if selectedDate}
			<div class="card bg-base-100 my-5 px-2 py-2">
				<div in:fade={{ delay: 0, duration: 200 }} class="flex items-center justify-between gap-2">
					<div class="flex items-center justify-center gap-2">
						<div class="text-xl font-semibold">{selectedDate}</div>
						{#if selectedOption == 'calls'}
							<div class="badge badge-success badge-lg uppercase">{selectedOption}</div>
						{:else if selectedOption == 'puts'}
							<div class="badge badge-error badge-lg uppercase">{selectedOption}</div>
						{/if}
					</div>
					<button
						in:fade={{ delay: 100, duration: 500 }}
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
			</div>

			{#if selectedOption == ''}
				<div class="badge badge-primary text-primary-content mb-5 w-full p-6 font-thin">
					Select calls or puts to view their options chain
				</div>
			{/if}
			<!-- CALL / PUT BUTTONS -->
			<div class="flex w-full gap-2">
				<div class="tet-white w-full">
					{#if selectedOption == 'calls'}
						<button
							class="btn btn-success w-full uppercase"
							on:click={() => handleSelectionChange('calls')}
						>
							Calls
						</button>
					{:else}
						<button
							class="btn btn-outline btn-success w-full uppercase"
							on:click={() => handleSelectionChange('calls')}
						>
							Calls
						</button>
					{/if}
				</div>

				<div class="w-full">
					{#if selectedOption == 'puts'}
						<button
							class="btn btn-error w-full uppercase"
							on:click={() => handleSelectionChange('puts')}
						>
							Puts
						</button>
					{:else}
						<button
							class="btn btn-outline btn-error w-full uppercase"
							on:click={() => handleSelectionChange('puts')}
						>
							Puts
						</button>
					{/if}
				</div>
			</div>

			{#if selectedOption == 'calls'}
				<div in:fade={{ delay: 0, duration: 300 }}>
					<div class="grid grid-cols-1 gap-2 py-5 sm:grid-cols-2">
						{#each options.options.calls as option}
							<OptionCard {option} {data} {selectedDate} />
						{/each}
					</div>
				</div>
			{/if}
			{#if selectedOption == 'puts'}
				<div in:fade={{ delay: 0, duration: 300 }}>
					<div class="grid grid-cols-1 gap-2 py-5 sm:grid-cols-2">
						{#each options.options.puts as option}
							<OptionCard {option} {data} {selectedDate} />
						{/each}
					</div>
				</div>
			{/if}
		{:else}
			<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">
				{#each data.options as strike_date}
					<button on:click={() => getOptionsChain(strike_date)} class="btn btn-primary">
						<div class="text-lg font-semibold">{strike_date}</div>
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
