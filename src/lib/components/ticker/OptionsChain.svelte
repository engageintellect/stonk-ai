<script lang="ts">
	import { get } from 'svelte/store';
	export let data: any;
	let options: any;

	const getOptionsChain = async (date: string) => {
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
		<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">
			{#each data.options as strike_date}
				<button on:click={() => getOptionsChain(strike_date)} class="btn btn-primary">
					<div class="">{strike_date}</div>
				</button>
			{/each}
		</div>
	</div>
	{JSON.stringify(options)}
{:else}
	<div class="flex items-center gap-2">
		<div class=" animate-pulse text-3xl font-semibold">Fetching Options Chain...</div>
		<span class="loading loading-spinner text-primary"></span>
	</div>
{/if}
