<script lang="ts">
	import { formatPrice, formatPercent } from '$lib/tickerModel';
	import { fade } from 'svelte/transition';
	import { prettifyDate } from '$lib/tickerModel';
	export let data: any;
	import OptionCard from './OptionCard.svelte';

	let options: any;
	let selectedDate: string = '';
	let selectedOption = ''; // Variable to store the selected option

	const clearSelectedDate = () => {
		selectedDate = '';
	};

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
		</div>

		{#if selectedDate}
			<div class="card bg-base-100 my-5 px-2 py-2">
				<div in:fade={{ delay: 0, duration: 300 }} class="flex items-center justify-between gap-2">
					<div class="flex items-center gap-2">
						<div class="text-xl font-semibold">{selectedDate}</div>
						{#if selectedOption}
							<div class="badge badge-primary badge-lg uppercase">{selectedOption}</div>
						{/if}
					</div>
					<button
						in:fade={{ delay: 100, duration: 300 }}
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

			<!-- CALL / PUT BUTTONS -->
			<div class="flex w-full gap-2">
				<div class="w-full">
					<input
						class="btn btn-outline w-full uppercase"
						type="radio"
						name="options"
						value="calls"
						bind:group={selectedOption}
						on:change={handleSelectionChange}
						aria-label="Calls"
					/>
				</div>

				<div class="w-full">
					<input
						class="btn btn-outline w-full uppercase"
						type="radio"
						name="options"
						value="puts"
						bind:group={selectedOption}
						on:change={handleSelectionChange}
						aria-label="Puts"
					/>
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
						<div class="">{prettifyDate(strike_date)}</div>
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
